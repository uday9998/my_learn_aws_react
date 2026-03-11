import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import AudioItem from 'components/elements/designCourse/courseMaterial/AudioItem';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import EditorConvertToHTML from 'components/modules/editor';
import useS3Upload from 'components/modules/S3Upload';
import { mimeTypeToExtension } from 'utils/mediaLibrary';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';


const AudioLesson = ({
   title, src, handleSave, description, autoplay, setActiveName,
   openSelectVideoModal, lessonContent,
}) => {
   const [audioTitle, setAudioTitle] = useState(title);
   const [audioSrc, setAudioSrc] = useState(src);
   const [audioDescription, setVideoDescription] = useState(description);
   const [charectersLimit, setCharectersLimit] = useState(11);
   const [isCancel, setIsCancel] = useState(false);

   const getCharectersLength = (l) => setCharectersLimit(l);

   useEffect(() => {
      setAudioTitle(title);
      setActiveName(title);
   }, [title, src]);

   const inputRef = useRef(null);

   const onClick = () => {
      if (inputRef && inputRef.current) {
         setVideoDescription(inputRef.current.initialValue);
         inputRef.current.reload();
      }
   };

   const saveLesson = () => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = audioDescription;
      }
      const { src: fileSrc, extension, name } = lessonContent || {};
      if (fileSrc) {
         handleSave({
            type: 'audio',
            audio_name: audioTitle,
            description: audioDescription,
            audio_src: fileSrc,
            format: mimeTypeToExtension(extension),
            mime_type: extension,
            original_name: name,
         });
      } else {
         handleSave({
            name: audioTitle || 'Audio title',
            description: audioDescription || '<p></p>',
            draft: true,
            lesson_visiblity: 1,
         });
      }
   };

   const autoSaveLesson = audio => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = audioDescription;
      }
      if (audio.cdnUrl) {
         handleSave({
            type: 'audio',
            audio_name: audioTitle,
            audio_src: audio.cdnUrl,
            format: audio.format,
            description: audioDescription,
            mime_type: audio.mimeType,
            original_name: audio.name,
         });
      } else if (!audio.cdnUrl) {
         handleSave({
            name: audioTitle || 'Audio title',
            description: audioDescription || '<p></p>',
            draft: true,
            lesson_visiblity: 1,
         });
      }
   };

   const { progressEL, uploadButton, uploadInProgress } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Upload Audio',
         theme: buttonTheme.lightGreen,
         size: buttonSizes.large,
      },
      onChange: (fileSrc, name, file) => {
         const info = {
            cdnUrl: fileSrc,
            mimeType: file.type,
            format: mimeTypeToExtension(file.type),
            name,
         };
         setAudioSrc(info);
         autoSaveLesson(info);
      },
      fileLessonFormat: 'audio',
   });

   return (
      <ItemWrapper>
         <div className='audioLesson'>
            <div className='audioLesson__fields'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ audioTitle }
                  style={ { marginBottom: '36px' } }
               />
               <div className='audio-title'>
                  <TextInput
                     placeholder='Audio Title'
                     label='Lesson Title'
                     rightLabel={ `${ charectersLimit }/150` }
                     id='audioTitle'
                     name='audionTitle'
                     value={ audioTitle }
                     onChange={ (name, value) => {
                        if (value.length < 151) {
                           setAudioTitle(value);
                           setActiveName(value);
                           getCharectersLength(value.length);
                        } else if (isPrint('You have reached the character limitation')) {
                           toast.error('You have reached the character limitation');
                        }
                     } }
                  />
               </div>

               {
                  audioSrc
                           && (
                              <div style={ { height: '172px' } } className='m-t-exl'>
                                 <AudioItem
                                    file={ audioSrc }
                                    autoplay={ autoplay }
                                 />

                              </div>
                           )
               }
               <DynamicWrapper
                  isOpen={ false }
                  title={ ['Audio Content', <span style={ { color: '#a3a3a3', paddingLeft: '5px', fontStyle: 'italic' } }> optional  </span>] }
                  borderColor='#cddaf1'
                  style={ { marginTop: '24px' } }
               >
                  <div className='audio_fieldsDescription'>
                     <EditorConvertToHTML
                        onClick={ () => onClick() }
                        ref={ inputRef }
                        description={ description }
                        data={ audioDescription || '' }
                        isCancel={ isCancel }
                        initial={ description }
                        onChange={ (data) => {
                           setVideoDescription(data);
                        } }
                     />
                  </div>
               </DynamicWrapper>
               { !(audioSrc && !uploadInProgress)
                           && (
                              <div className='m-t-exl'>
                                 <Text
                                    type={ textType.regular }
                                    size={ textSize.small }
                                    inner='You can upload audio file with the extensions: .mp3, .ogg'
                                    color='#8a94a2'
                                    bold
                                 />
                              </div>
                           )

               }
            </div>
            {progressEL}
            <div className='audioLesson__buttons'>
               <div className='m-r-m cancel__btn'>
                  {((((audioDescription && audioDescription.replace(/(\r\n|\n|\r)/gm, '')) === description) || !audioDescription) && audioTitle === title && audioSrc === src) ? null : (
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.large }
                        text='Cancel'
                        onClick={ () => {
                           setAudioTitle(title);
                           setAudioSrc(src);
                           setIsCancel(!isCancel);
                           onClick();
                        } }
                     />
                  )}

               </div>
               {uploadButton}
               <div className='m-r-m'> </div>
               <div className='m-r-m m-l-m'>
                  <BaseButton
                     theme={ buttonTheme.lightGreen }
                     size={ buttonSizes.large }
                     text='Library'
                     onClick={ () => {
                        openSelectVideoModal();
                     } }
                  />
               </div>

               <div className='save__cancel__btns'>
                  <div className='m-r-m cancel__btn__small'>
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.large }
                        text='Cancel'
                        onClick={ () => {
                           setAudioTitle(title);
                           setAudioSrc(src);
                        } }
                     />
                  </div>
                  <BaseButton
                     theme={ buttonTheme.darkGreen }
                     size={ buttonSizes.large }
                     // disabled={ uploadedProgress !== 1 }
                     text='Save'
                     className='save-lesson'
                     onClick={ () => saveLesson() }
                  />
               </div>
            </div>
         </div>
      </ItemWrapper>
   );
};

AudioLesson.propTypes = {
   title: PropTypes.string,
   src: PropTypes.string,
   handleSave: PropTypes.func,
   openSelectVideoModal: PropTypes.func,
   lessonContent: PropTypes.object,
   description: PropTypes.string,
   autoplay: PropTypes.any,
   setActiveName: PropTypes.func,
};

export default AudioLesson;
