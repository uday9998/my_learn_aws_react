import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import Input from 'components/elements/inputNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import { communityButtonColors, communitySecondaryButtonColors } from 'utils/communityButtonColors';
import MentionModal from 'components/elements/MentionModal';
import { sortBy } from 'lodash';
import { isLocalhost } from 'utils/Helpers';
import mentionHtml from 'components/modules/PostEditor/PostEditorHtmls/mention';
import Trix from 'trix';

import './index.scss';

const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

export const PostArrowIcon = ({ isOpen, onClick, text }) => {
   return (
      <div
         role='presentation'
         onClick={ () => onClick() }
         className='post__leave__comment__top__leave'
      >
         <Text
            inner={ text }
            type={ types.regularDefaultSmall }
            size={ sizes.small }
            //  style={ { color: '#24554E' } }
         />
         <div
            className='post__leave__comment__top__leave__icon'
            style={ { transform: `rotate(${ isOpen ? '-90deg' : '0deg' })` } }
         >
            <IconNew name='PostLeaveArrow' />
         </div>
      </div>
   );
};

export const PostLeaveComment = ({ user, onPost, community }) => {
   const trixRef = useRef(null);
   const modalRef = useRef(null);
   const [modalPosition, setModalPosition] = useState(null);
   const [isOpen, setIsOpen] = useState(false);
   const [value, setValue] = useState('');
   const [commentData, setCommentData] = useState(null);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const handleAddComment = () => {
      if (!commentData) {
         onPost({
            content: trixRef.current.innerHTML,
            mentions: [],
         });
      } else {
         onPost(commentData);
      }

      setIsOpen(false);
   };

   useEffect(() => {
      const trixEditor = trixRef.current;

      if (trixEditor) {
         trixEditor.addEventListener('trix-change', event => {
            const allText = trixEditor.editor.getDocument().toString();
            const selectedRange = sortBy(trixEditor.editor.getSelectedRange());
            setValue(allText);

            if (allText.includes('@') && !isMobile) {
               setModalPosition(prevState => {
                  return {
                     ...prevState,
                     x: trixEditor.editor.getClientRectAtPosition(selectedRange[1])?.x,
                     y: trixEditor.editor.getClientRectAtPosition(selectedRange[1])?.y,
                  };
               });  
            } else if (isMobile && allText.includes('@')) {
               setModalPosition(true);
            } else {
               setModalPosition(null);
            }
         });
      }
   }, [isOpen]);

   const handleMention = (name, id) => {
      const trixElement = trixRef.current;
      
      if (trixElement) {
         const editor = trixElement.editor;
         const allText = editor.getDocument().toString();
         const cursorPosition = sortBy(editor.getSelectedRange())[0];
         const atIndex = allText.lastIndexOf('@', cursorPosition);
   
         if (atIndex !== -1) {
            editor.setSelectedRange([atIndex, cursorPosition]);
            editor.deleteInDirection('forward');
         }
   
         const attachment = new Trix.Attachment({
            content: mentionHtml(apiUrl, name, id, community.id),
         });

         const updatedCursorPosition = sortBy(editor.getSelectedRange())[0];
         editor.insertAttachment(attachment);
         editor.setSelectedRange([updatedCursorPosition + 1, updatedCursorPosition + 1]);
      }

      setCommentData(prevState => {
         return {
            ...prevState,
            text: trixRef.current.innerHTML,
            mentions: prevState?.mentions ? [...prevState.mentions, id] : [id],
         };
      });
      setModalPosition(null);
      setValue('');
   };

   return (
      <div className='post__leave__comment'>
         <div className='post__leave__comment__top'>
            <img src={ user.picture_src || user.picture_full_src } alt='' />
            <PostArrowIcon
               isOpen={ isOpen }
               text='Leave a comment'
               onClick={ () => setIsOpen(!isOpen) }
            />
         </div>
         {isOpen && (
            <div className='post__leave__comment__bottom'>
               <div
                  style={ {
                     position: isMobile && 'relative',
                  } }
                  className='comment__wrapper'>
                  {
                     modalPosition && (
                        <MentionModal 
                           modalRef={ modalRef }
                           modalPosition={ modalPosition }
                           communityId={ community.id }
                           value={ value }
                           handleMention={ handleMention }
                           hiddenScrollElementName='community__bottom__with__banner'
                           isMobile={ isMobile }
                        />
                     )
                  }
                  <trix-editor
                     class='trix-content'
                     input='trix'
                     placeholder='Write your comment...'
                     ref={ trixRef }
                  />
                  {/* <Input
                     type='textarea'
                     value={ value }
                     onChange={ handleAddComment }
                     placeholder='Write your comment...'
                  /> */}
               </div>
               <div className='post__leave__comment__bottom__buttons'>
                  <Button
                     text='Cancel'
                     theme={ themes.secondary }
                     onClick={ () => {
                        setValue('');
                        setIsOpen(false);
                     } }
                     style={ communitySecondaryButtonColors(community) }
                  />
                  <Button
                     text='Post Comment'
                     onClick={ () => {
                        // onPost(value);
                        // setIsOpen(false);
                        // setValue('');
                        handleAddComment();
                     } }
                     // disabled={ !value.trim() }
                     style={ communityButtonColors(community) }
                  />
               </div>
            </div>
         )}
      </div>
   );
};

PostLeaveComment.propTypes = {
   user: PropTypes.object,
   onPost: PropTypes.func,
   community: PropTypes.object,
};
PostArrowIcon.propTypes = {
   isOpen: PropTypes.bool,
   text: PropTypes.string,
   onClick: PropTypes.func,
};
