import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import { getMemberForMention } from 'api';
import { getUsersFromTags, swapPrintTags, swapTags } from 'utils/mentions';
import Input from 'components/elements/inputNew';
import { communityButtonColors, communitySecondaryButtonColors } from 'utils/communityButtonColors';
import MentionEditor from '../mentionInput';

const ReplyComment = ({
   image, onReply, onCancel, courseId, isCommunity, community,
}) => {
   const users = useRef(null);
   const [isLoading, setIsLoading] = useState(true);
   const [content, setContent] = useState('');
   const getUsers = async () => {
      if (window.location.pathname.includes('my-account')) {
         users.current = [];
         setIsLoading(false);
         return;
      }
      try {
         const { data } = await getMemberForMention(courseId);
         users.current = (data.map((d) => {
            return {
               display: d.name,
               id: `${ d.id }`,
            };
         }));
         setIsLoading(false);
      } catch (error) {
         users.current = [];
         setIsLoading(false);
      }
   };
   const handleAdd = (text) => {
      onReply({
         convert: swapTags(text), text: swapPrintTags(text), ids: getUsersFromTags(text).map((i) => i.id),
      });
      setContent(false);
   };
   useEffect(() => {
      getUsers();
   }, []);
   return (
      <div className='reply__comment'>
         <div className='reply__comment__left'>
            <img src={ image } alt='' />
         </div>
         <div className='reply__comment__right'>

            {isCommunity ? (
               <Input
                  value={ content }
                  type='textarea'
                  onChange={ (name, value) => setContent(value) }
                  placeholder='Write your reply...'
               />
            ) : (
               <>
                  {!isLoading && (
                     <MentionEditor
                        text={ content }
                        courseId={ courseId }
                        users={ users.current }
                        onChange={ (v) => {
                           setContent(v);
                        } }
                     />
                  )}
               </>
            )}
            <div className='reply__comment__right__button'>
               {onCancel && (
                  <Button
                     text='Cancel'
                     theme={ themes.secondary }
                     onClick={ () => {
                        setContent('');
                        onCancel();
                     } }
                     style={ community ? communitySecondaryButtonColors(community) : {} }
                  />
               )}
               <Button
                  text='Post Comment'
                  disabled={ content && !content.trim() }
                  onClick={ () => handleAdd(content && content.trim())
                  }
                  style={ community ? communityButtonColors(community) : {} }
               />
            </div>
         </div>
      </div>
   );
};

ReplyComment.propTypes = {
   image: PropTypes.string,
   onReply: PropTypes.func,
   courseId: PropTypes.number,
   onCancel: PropTypes.func,
   isCommunity: PropTypes.func,
   community: PropTypes.object,
};

export default ReplyComment;
