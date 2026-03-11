import React, { useState } from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import moment from 'moment';
import { getMediaIconByMimeType } from 'utils/mediaLibrary';

const SelectVideoModal = ({
   onCancel, data, handleSave, format,
   currentLesson,
}) => {
   const [activeVideo, setActiveVideo] = useState({});

   function saveAudio() {
      handleSave({
         type: 'audio',
         audio_name: currentLesson.name,
         audio_src: activeVideo.src,
         description: currentLesson.description,
         mime_type: activeVideo.mime_type,
         original_name: activeVideo.name,
      });
   }

   function saveImage() {
      handleSave({
         type: 'image',
         image_name: currentLesson.name,
         image_src: activeVideo.src,
         description: currentLesson.description,
         mime_type: activeVideo.mime_type,
         original_name: activeVideo.name,
      });
   }

   function savePPT() {
      handleSave({
         type: 'ppt',
         ppt_name: currentLesson.name,
         ppt_src: activeVideo.src,
         description: currentLesson.description,
         mime_type: activeVideo.mime_type,
         original_name: activeVideo.name,
      });
   }

   function savePDF() {
      handleSave({
         type: 'pdf',
         pdf_name: currentLesson.name,
         pdf_src: activeVideo.src,
         description: currentLesson.description,
         mime_type: activeVideo.mime_type,
         original_name: activeVideo.name,
      });
   }

   function saveVideo() {
      handleSave({
         type: 'video',
         video_name: activeVideo.video_name || 'Video Name',
         video_src: activeVideo.src,
         video_length: activeVideo.video_length || 0,
         description: activeVideo.description || '',
      });
   }

   const saveLesson = () => {
      switch (format) {
         case 'video': saveVideo();
            break;
         case 'audio': saveAudio();
            break;
         case 'image': saveImage();
            break;
         case 'ppt': savePPT();
            break;
         case 'pdf': savePDF();
            break;
         default:
      }
   };

   return (
      <div className='selectVideoModal'>
         <div className='flex modal-header'>
            <div
               role='presentation'
               className='closeX'
               onClick={ () => {
                  setActiveVideo({});
                  onCancel();
               }
               }
               title='close'
            >
               <Icon name='CloseXNew' />
            </div>
         </div>
         <div className='field__2' style={ { textTransform: 'capitalize' } }>
            <Text
               type={ TextType.normal }
               size={ TextSize.large }
               inner={ `select ${ format }` }
            />
         </div>
         <div className='flex flex-col select-video'>
            {
               data && data.map((video, index) => {
                  return (
                     <SelectVideoModalItem
                        key={ video.id }
                        video={ video }
                        format={ format }
                        isActive={ video.id === activeVideo.id }
                        selectVideo={ () => setActiveVideo(video) }
                        isLastItem={ index === data.length - 1 }
                     />
                  );
               })
            }
         </div>
         <div className='modal__btns'>
            <div className='cancel__btn'>
               <BaseButton
                  size={ btnSize.medium }
                  theme={ btnTheme.lightGreen }
                  text='Cancel'
                  onClick={ () => {
                     setActiveVideo({});
                     onCancel();
                  } }
               />

            </div>

            <div>
               <BaseButton
                  size={ btnSize.medium }
                  text='Select'
                  onClick={ () => saveLesson() }
               />
            </div>
         </div>
      </div>
   );
};
const SelectVideoModalItem = ({
   video, selectVideo, isActive, isLastItem, format,
}) => {
   const date = moment(video.created_at).format('dddd, YYYY h:mm');
   const icon = getMediaIconByMimeType(video.type ? video.type : video.extension, format);
   return (
      <div
         style={ isLastItem ? { border: 'none' } : {} }
         role='presentation'
         onClick={ selectVideo }
         className='flex select-video-content'
      >
         {
            isActive && (
               <div className='isSelected'>
                  <Icon name='Check' />
               </div>
            )
         }
         <div className='content__video'>
            <Icon name={ icon } />
         </div>
         <div className='flex flex-col'>
            <div className='content__title'>
               <Text
                  type={ TextType.medium }
                  size={ TextSize.extraSmall }
                  inner={ video.title ? video.title : video.name }
                  color='#3f4f65'
               />
            </div>
            <div className='content__time'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner={ date }
                  color='#3f4f65'
               />
            </div>
         </div>
      </div>
   );
};

SelectVideoModal.propTypes = {
   onCancel: PropTypes.func,
   handleSave: PropTypes.func,
   data: PropTypes.object,
   currentLesson: PropTypes.object,
   format: PropTypes.string,
};
SelectVideoModalItem.propTypes = {
   video: PropTypes.object,
   selectVideo: PropTypes.func,
   isActive: PropTypes.bool,
   isLastItem: PropTypes.bool,
   format: PropTypes.string,
};

SelectVideoModal.defaultProps = {
   onCancel: () => {},
};
SelectVideoModalItem.defaultProps = {
   video: {},
   selectVideo: () => {},
};


export default SelectVideoModal;
