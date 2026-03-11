/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import 'trix/dist/trix.css';
import IconNew from 'components/elements/iconsSize';
import { sortBy } from 'lodash';
import PropTypes from 'prop-types';
import findTheDifference from 'utils/textDifference';
import EmojiPicker from 'emoji-picker-react';
import { Popover } from '@material-ui/core';
import Trix from 'trix';
import IconButton from 'components/elements/buttons/IconButton';
import ModalNew from 'components/elements/ModalNew';
import UploadWithMedia from 'components/elements/UploadWithMedia';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import MessengerTyping from 'views/pages/community/Messenger/components/MessengerTyping';

Trix.config.blockAttributes.default.tagName = 'p';
const MessageEditor = ({
   onChange, value = '', onSendFile, logginedUserRole, onFocusInput, onSendMessage, role, community,
}) => {
   const [isOpenEmojiBlock, setIsOpenEmojiBlock] = useState(false);
   const [archorRef, setArchorRef] = useState(null);
   const [isOpenUploadModal, setIsOpenUploadModal] = React.useState(false);
   const trixRef = useRef(null);
   const [isOpenMentionModal, setIsOpenMentionModal] = useState(false);
   const { current: mention } = useRef({
      mention: '',
      stringValue: '',
      value: '',
      isOpen: false,
      oldMention: '',
      start: 0,
      end: 2,
      isIcon: false,
   });
   useEffect(() => {
      if (trixRef.current) {
         const element = document.querySelector('trix-editor');
         trixRef.current.addEventListener('focus', () => {
            onFocusInput();
         });

         const keyDownEventHandler = event => {
            if (event.key === 'Enter' && !event.shiftKey) {
               event.preventDefault();
               onSendMessage(element.editor.getDocument().toString());
            }
         };

         element.addEventListener('keydown', keyDownEventHandler);

         trixRef.current.addEventListener('trix-change', (event) => {
            const allText = element.editor.getDocument().toString();
            onChange('value', event.target.innerHTML);
            const deff = findTheDifference(allText, mention.stringValue)[0];
            if (deff.trim() === '@' && mention.isOpen) {
               setIsOpenMentionModal(false);
               mention.isOpen = false;
               mention.stringValue = allText;
               return;
            }
            if (mention.isOpen) {
               mention.end = sortBy(element.editor.getSelectedRange())[1];
               const defMention = allText.slice(mention.start, mention.end <= 1 ? 2 : mention.end);
               mention.mention = defMention;
            }
            if ((deff === '@' || allText.trim() === '@') && !isOpenMentionModal) {
               setIsOpenMentionModal(!isOpenMentionModal);
               mention.isOpen = true;
               mention.oldMention = allText;
               if (mention.isIcon) {
                  mention.start = sortBy(element.editor.getSelectedRange())[0];
                  mention.isIcon = false;
               } else {
                  mention.start = sortBy(element.editor.getSelectedRange())[0] - 1;
               }
            } else if (isOpenMentionModal || deff === ' ' || deff === '￿') {
               setIsOpenMentionModal(false);
               mention.isOpen = false;
               mention.mention = '';
            }
            mention.stringValue = allText;
         });
         trixRef.current.addEventListener('trix-selection-change', () => {
            const selectedRange = sortBy(element.editor.getSelectedRange());
            if (selectedRange[1] - selectedRange[0] > 0) {
               mention.oldMention = '';
               mention.mention = '';
               setIsOpenMentionModal(false);
            }
         });

         return () => {
            element.removeEventListener('keydown', keyDownEventHandler);
         };
      }
   }, []);

   useEffect(() => {
      if (value.length === 0) {
         const element = document.querySelector('trix-editor');
         element.value = '';
      }
   }, [value]);

   const handleAddEmoji = (emoji) => {
      const element = document.querySelector('trix-editor');
      element.editor.insertString(emoji);
   };


   return (
      <div className='message-editor'>
         <div className='message-editor-toolbar'>
            {isOpenUploadModal && (
               <ModalNew onCloseModal={ () => {
                  setIsOpenUploadModal(false);
               } }
               >
                  <div className='trix-custom-editor-file'>
                     <Text
                        inner='Add Attached File'
                        type={ types.medium160 }
                        size={ sizes.xlarge }
                     />
                     <UploadWithMedia
                        isHaveFileIcon={ true }
                        generalButtonProps={ {
                           theme: themes.primary,
                           text: 'Upload Files',
                        } }
                        uploadProps={ {
                           fileLessonFormat: 'media',
                           isAmazonFile: true,
                           onChange: (...params) => {
                              setIsOpenUploadModal(false);
                              onSendFile(params[0], params[1], params[2].type);
                           },
                        } }
                        bottomText='You can upload files with the extensions:
                     webm, pdf, pptx, mp3, ogg, tiff, doc, docx, xlsx, csv'
                     />
                  </div>
               </ModalNew>
            )}

            {/* {isOpenEmojiBlock && (
               <ClickOutside onClick={ () => setIsOpenEmojiBlock(false) }>
                  <div className='message-editor-toolbar-emojis'>
                     <EmojiPicker onEmojiClick={ emoji => {
                        handleAddEmoji(emoji.emoji);
                     } }
                     />
                  </div>
               </ClickOutside>
            )} */}
            {isOpenEmojiBlock && (
               <Popover
                  open={ true }
                  anchorEl={ archorRef }
                  onClose={ () => {
                     setArchorRef(null);
                     setIsOpenEmojiBlock(false);
                  } }
                  className='custom-popover'
                  elevation={ 24 }
                  anchorOrigin={ {
                     vertical: 'top',
                     horizontal: 'center',
                  } }
                  transformOrigin={ {
                     vertical: 'bottom',
                     horizontal: 'center',
                  } }
               >
                  <EmojiPicker
                     lazyLoadEmojis={ true }
                     onEmojiClick={ emoji => {
                        handleAddEmoji(emoji.emoji);
                     } }
                  />
               </Popover>
            )}
            {logginedUserRole !== 'member' && !community.userSuspended && (
               <IconButton
                  className={ isOpenUploadModal ? 'buttonIcon__active' : '' }
                  name='CommunityMessengerAttachFileM'
                  onClick={ () => {
                     setIsOpenUploadModal(true);
                  } }
               />
            )}
            {
               !community.userSuspended 
               && (
                  <IconButton
                     className={ isOpenEmojiBlock ? 'buttonIcon__active' : '' }
                     name='CommunityMessengerEmojiM'
                     onClick={ (e) => {
                        setIsOpenEmojiBlock(true);
                        setArchorRef(e.currentTarget);
                     } }
                  />
               )
            }
         </div>
         <div className='messenger__text__editor'>
            <MessengerTyping />
            <input
               type='hidden'
               id='messanger'
               value={ value }
               onChange={ (val) => onChange('value', val) }
            />
            <trix-editor
               class='trix-content-message scroll'
               input='messanger'
               onF
               placeholder='Type something here...'
               ref={ trixRef }
               contenteditable={ !community.userSuspended }
            />
         </div>

      </div>
   );
};

MessageEditor.propTypes = {
   onChange: PropTypes.func,
   value: PropTypes.any,
   onSendFile: PropTypes.func,
   logginedUserRole: PropTypes.string,
   onFocusInput: PropTypes.func,
   onSendMessage: PropTypes.func,
   role: PropTypes.string,
   community: PropTypes.object,
};

export default MessageEditor;
