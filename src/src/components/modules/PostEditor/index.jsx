import React, { useState, useRef, useEffect } from 'react';
import Trix from 'trix';
import './index.scss';
import 'trix/dist/trix.css';
import IconNew from 'components/elements/iconsSize';
import UploadWithMedia from 'components/elements/UploadWithMedia';
import ModalNew from 'components/elements/ModalNew';
import Input from 'components/elements/inputNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import Text, {
   TYPES as types,
   SIZES as sizes,
} from 'components/elements/TextNew';
import { sortBy } from 'lodash';
import UploadVideoWithMedia from 'components/elements/UploadMediaViews/UploadVideo';
import PropTypes from 'prop-types';
import findTheDifference from 'utils/textDifference';
import EmojiPicker from 'emoji-picker-react';
import SliceAndConnectText from 'utils/getSplitedText';
import { isLocalhost } from 'utils/Helpers';
import { Popover } from '@material-ui/core';
import FileHtml from './PostEditorHtmls/file';
import VideoHtml from './PostEditorHtmls/video';
import PostEditorInlineEdtior from './PostEditorComponents/postEditorInlineEditor';
import IframeHtml from './PostEditorHtmls/iframe';
import imageHtml from './PostEditorHtmls/image';
import PostMentionUsers from './PostEditorComponents/postMentionUsers';
import mentionHtml from './PostEditorHtmls/mention';
import PostEditorPoll from './PostEditorComponents/postEditorPoll';
import {
   videoIcon, imageIcon, audioIcon, applicationIcon,
} from './PostEditorHtmls/svgs';

const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;
const PostEditor = ({
   onChange, value = '', handleMention, communityId, handdleRemoveMention,
   handleAddPoll, addFileToState,
}) => {
   const [isOpenAttachFile, setIsOpenAttachFile] = useState(false);
   const [isOpenInserLink, setIsOpenInserLink] = useState(false);
   const [isOpenUploadVideo, setIsOpenUploadVideo] = useState(false);
   const [isOpenUploadImage, setIsOpenUploadImage] = useState(false);
   const [isOpenEmojiBlock, setIsOpenEmojiBlock] = useState(false);
   const [linkContent, setLinkContent] = useState({
      title: '',
      url: '',
   });
   const [archorRef, setArchorRef] = useState(null);
   const trixRef = useRef(null);
   const [isOpenMentionModal, setIsOpenMentionModal] = useState(false);
   const [positionElement, setPositionElement] = useState(null);
   const [mentionPos, setMentionPos] = useState(null);
   const [isOpenTierModal, setIsOpenTierModal] = useState(false);
   const [mentionValue, setMentionValue] = useState('');
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
         const modalElement = document.querySelector('.communityPostsModalWidth');
         trixRef.current.addEventListener('trix-change', (event) => {
            const allText = element.editor.getDocument().toString();
            onChange('value', event.target.innerHTML);
            const selectedRange = sortBy(element.editor.getSelectedRange());
            if (modalElement) {
               const rect = modalElement.getBoundingClientRect();
               const x = rect.left; 
               const y = rect.top; 
               setMentionPos({
                  ...element.editor.getClientRectAtPosition(selectedRange[1]), 
                  x: element.editor.getClientRectAtPosition(selectedRange[1])?.x - x, 
                  y: element.editor.getClientRectAtPosition(selectedRange[1])?.y - y, 
               });
            } else {
               setMentionPos(element.editor.getClientRectAtPosition(selectedRange[1]));
            }
            
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
               setMentionValue(mention.mention);
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
               setMentionValue('');
            }
            mention.stringValue = allText;
         });
         trixRef.current.addEventListener('trix-selection-change', () => {
            const selectedRange = sortBy(element.editor.getSelectedRange());
            if (selectedRange[1] - selectedRange[0] > 0) {
               mention.oldMention = '';
               mention.mention = '';
               setIsOpenMentionModal(false);

               setPositionElement(element.editor.getClientRectAtPosition(selectedRange[1]));
               return;
            }
            setPositionElement(null);
         });
         trixRef.current.addEventListener('trix-attachment-remove', (event) => {
            try {
               const attachment = event.attachment.attachment.attributes.values.content;
               if (attachment.includes("<a class='mention-user'")) {
                  const id = attachment.split('id=')[1].split("'")[1];
                  handdleRemoveMention(Number.parseFloat(id));
               }
            } catch (error) {
            }
         });
      }
   }, []);

   const handleAddMentionIcon = () => {
      const element = document.querySelector('trix-editor');
      mention.isIcon = true;
      element.editor.insertHTML('@');
      mention.isOpen = true;
   };

   const image = url => {
      const element = document.querySelector('trix-editor');
      const attachment = new Trix.Attachment({
         content: imageHtml(url),
      });
      element.editor.insertAttachment(attachment);
   };

   const file = (fileName, iconHtml, url) => {
      const element = document.querySelector('trix-editor');
      const { editor } = element;

      const initialPosition = editor.getSelectedRange();

      editor.setSelectedRange(editor.getDocument().toString().length - 1);

      editor.insertString('\n');

      const attachment = new Trix.Attachment({ content: FileHtml(fileName, iconHtml, url) });
      editor.insertAttachment(attachment);

      editor.setSelectedRange(initialPosition);
   };

   const video = url => {
      const element = document.querySelector('trix-editor');
      const attachment = new Trix.Attachment({ content: VideoHtml(url) });
      element.editor.insertAttachment(attachment);
   };

   const iframe = code => {
      const element = document.querySelector('trix-editor');
      const attachment = new Trix.Attachment({ content: code });
      element.editor.insertAttachment(attachment);
   };

   const handleAddFile = (url, name, options) => {
      let icon = '';
      let type = '';
      const typeOrExtension = options.type || options.extension || 'application';
      const toViewName = SliceAndConnectText(name, 20);
      const videoExtensions = ['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm', '3gp', 'mxf', 'mts', 'm2ts', 'vob', 'dv', 'video'];
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'ico', 'svg', 'image'];
      const audioExtensions = ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a', 'wma', 'aiff', 'amr', 'audio'];
      if (videoExtensions.some(ext => typeOrExtension.includes(ext))) {
         type = 'video';
         icon = videoIcon(typeOrExtension);
      } else if (imageExtensions.some(ext => typeOrExtension.includes(ext))) {
         type = 'image';
         icon = imageIcon(typeOrExtension);
      } else if (audioExtensions.some(ext => typeOrExtension.includes(ext))) {
         type = 'audio';
         icon = audioIcon(typeOrExtension);
      } else if (typeOrExtension?.includes('application')) {
         type = 'aplication';
         icon = applicationIcon(options.name.split('.').at(-1));
      }
      addFileToState({
         src: url,
         'post-format': type,
         name: options.name,
      });
      file(toViewName, icon, url);
      setIsOpenAttachFile(false);
   };

   const handleAddVideo = (url, name) => {
      video(url);
      addFileToState({
         src: url,
         'post-format': 'video',
         name,
      });
      setIsOpenUploadVideo(false);
   };

   const handleInsertLink = () => {
      setIsOpenInserLink(false);
      const element = document.querySelector('trix-editor');
      setLinkContent({
         title: '',
         url: '',
      });
      element.editor.insertHTML(`<a target="_blank" style="color: #24554E;" href="${
         linkContent.url
      }">${ linkContent.title }</a>`);
   };

   const handleAddEmoji = (emoji) => {
      const element = document.querySelector('trix-editor');
      setIsOpenEmojiBlock(false);
      element.editor.insertString(emoji);
   };
   const linkTextInputChange = (name, content) => {
      setLinkContent({
         ...linkContent,
         [name]: content,
      });
   };


   const iframeVideo = (code) => {
      iframe(code);
      setIsOpenUploadVideo(false);
   };

   const iframeHtml = (url) => {
      const element = document.querySelector('trix-editor');
      const attachment = new Trix.Attachment({ content: IframeHtml(url) });
      element.editor.insertAttachment(attachment);
      setIsOpenUploadVideo(false);
   };

   const clearMention = () => {
      setIsOpenMentionModal(false);
      mention.oldMention = '';
      mention.isOpen = false;
   };

   const onMention = (name, id) => {
      const element = document.querySelector('trix-editor');
      const pos = [mention.start, mentionValue ? mention.start + mentionValue.length : mention.start + 1];
      element.editor.setSelectedRange(pos);
      const attachment = new Trix.Attachment({ content: mentionHtml(apiUrl, name, id, communityId) });
      element.editor.insertAttachment(attachment);
      clearMention();
      setMentionValue('');
      handleMention(name, id);
   };

   const handleAddPollFunc = (title, subTitle, options) => {
      setIsOpenTierModal(false);
      handleAddPoll({
         title, subTitle, options,
      });
   };

   return (
      <div className='trix-custom-editor'>
         {isOpenTierModal && (
            <ModalNew
               onCloseModal={ () => setIsOpenTierModal(false) }
            >
               <PostEditorPoll handleAddPoll={ handleAddPollFunc } />
            </ModalNew>
         )}
         {isOpenAttachFile && (
            <ModalNew onCloseModal={ () => {
               setIsOpenAttachFile(false);
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
                     type='all'
                     generalButtonProps={ {
                        theme: themes.primary,
                        text: 'Upload Files',
                     } }
                     uploadProps={ {
                        fileLessonFormat: 'media',
                        isAmazonFile: true,
                        onChange: handleAddFile,
                     } }
                     bottomText='You can upload files with the extensions:
                     webm, pdf, pptx, mp3, ogg, tiff, doc, docx, xlsx, csv'
                  />
               </div>
            </ModalNew>
         )}
         {positionElement && (
            <PostEditorInlineEdtior setPositionElement={ setPositionElement } positionElement={ positionElement } />
         )}
         {isOpenMentionModal && mentionPos && (
            <PostMentionUsers
               onMention={ onMention }
               communityId={ communityId }
               value={ mentionValue }
               clearMention={ clearMention }
               position={ mentionPos }
            />
         )}
         {isOpenInserLink && (
            <ModalNew
               onCloseModal={ () => {
                  setIsOpenInserLink(false);
                  setLinkContent({
                     title: '',
                     url: '',
                  });
               } }
            >
               <div className='trix__add__link'>
                  <div className='trix__add__link__top'>
                     <Text
                        inner='Add Link'
                        type={ types.medium160 }
                        size={ sizes.xlarge }
                     />
                     <Input
                        label='Link Text'
                        name='title'
                        value={ linkContent.title }
                        onChange={ linkTextInputChange }
                        placeholder='Please add a text'
                     />
                     <Input
                        label='Link'
                        name='url'
                        value={ linkContent.url }
                        onChange={ linkTextInputChange }
                        placeholder='Please add a link'
                     />
                  </div>
                  <div className='trix__add__link__button'>
                     <Button
                        onClick={ () => handleInsertLink() }
                        text='Apply'
                        disabled={
                           !linkContent.url.length || !linkContent.title.length
                        }
                     />
                  </div>
               </div>
            </ModalNew>
         )}
         {isOpenUploadVideo && (
            <ModalNew onCloseModal={ () => setIsOpenUploadVideo(false) }>
               <div className='trix-custom-editor-file'>
                  <Text
                     inner='Add Video'
                     type={ types.medium160 }
                     size={ sizes.xlarge }
                  />
                  <UploadVideoWithMedia
                     onChange={ handleAddVideo }
                     onSaveIframeUrl={ (url) => iframeHtml(url) }
                     onSaveEmbed={ (code) => iframeVideo(code) }
                  />
               </div>
            </ModalNew>
         )}
         {isOpenUploadImage && (
            <ModalNew onCloseModal={ () => setIsOpenUploadImage(false) }>
               <div className='trix-custom-editor-file'>
                  <Text
                     inner='Add Image'
                     type={ types.medium160 }
                     size={ sizes.xlarge }
                  />
                  <UploadWithMedia
                     type='image'
                     onFinish={ () => {} }
                     buttonText='Image'
                     isHaveFileIcon={ true }
                     uploadProps={ {
                        fileLessonFormat: 'image',
                        isAmazonFile: true,
                        onChange: (src, name) => {
                           image(src);
                           addFileToState({
                              src,
                              name,
                              'post-format': 'image',
                           });
                           setIsOpenUploadImage(false);
                        },
                     } }
                  />
               </div>
            </ModalNew>
         )}
         <input type='hidden' id='trix' value={ value } onChange={ (val) => onChange('value', val) } />
         <trix-editor
            class='trix-content'
            input='trix'
            placeholder='Write text...'
            ref={ trixRef }
         />
         <div className='trix-custom-editor-toolbar'>
            <div
               className='trix-custom-editor-toolbar-item'
               role='presentation'
               onClick={ () => setIsOpenAttachFile(true) }
            >
               <IconNew name='TrixAttachFile' />
            </div>
            <div
               className='trix-custom-editor-toolbar-item'
               role='presentation'
               onClick={ () => setIsOpenInserLink(true) }
            >
               <IconNew name='TrixLink' />
            </div>
            <div
               className='trix-custom-editor-toolbar-item'
               role='presentation'
               onClick={ () => setIsOpenUploadVideo(true) }
            >
               <IconNew name='TrixVideo' />
            </div>
            <div
               className='trix-custom-editor-toolbar-item'
               role='presentation'
               onClick={ () => setIsOpenUploadImage(true) }
            >
               <IconNew name='trixImage' />
            </div>
            <div
               className='trix-custom-editor-toolbar-item'
               role='presentation'
               onClick={ () => {
                  handleAddMentionIcon();
               } }
            >
               <IconNew name='trixMention' />
            </div>
            <div
               className='trix-custom-editor-toolbar-item'
               role='presentation'
               onClick={ () => {
                  setIsOpenTierModal(true);
               } }
            >
               <IconNew name='trixTier' />
            </div>
            {/* {isOpenEmojiBlock && (
               <ClickOutside onClick={ () => setIsOpenEmojiBlock(false) }>
                  <div className='trix-custom-editor-toolbar-emojis'>
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
                  onClose={ () => setIsOpenEmojiBlock(false) }
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
            <div
               className='trix-custom-editor-toolbar-item'
               role='presentation'
               onClick={ (e) => {
                  setIsOpenEmojiBlock(true);
                  setArchorRef(e.currentTarget);
               } }
            >
               <IconNew name='trixEmoji' />
            </div>
         </div>
      </div>
   );
};

PostEditor.propTypes = {
   onChange: PropTypes.func,
   communityId: PropTypes.any,
   value: PropTypes.any,
   handleMention: PropTypes.func,
   handdleRemoveMention: PropTypes.func,
   handleAddPoll: PropTypes.func,
   addFileToState: PropTypes.func,
};

export default PostEditor;
