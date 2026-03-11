import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import EditorConvertToHTML from 'components/modules/editor';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import useS3Upload from 'components/modules/S3Upload';
import LoaderSpinner from 'components/modules/designCourse/settings/LoaderSpiner';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const PptLesson = ({
   title, src, handleSave, description, setActiveName,
   openSelectVideoModal,
}) => {
   const [pptTitle, setPptTitle] = useState(title);
   const [pptSrc, setPptSrc] = useState(src);
   const [pptData, setPptData] = useState(src);
   const [pptDescription, setPptDescription] = useState(description);
   const [charectersLimit, setCharectersLimit] = useState(16);
   const [isLoaded, setIsLoaded] = useState(false);
   const [isCancel, setIsCancel] = useState(false);

   const getCharectersLength = (l) => setCharectersLimit(l);

   useEffect(() => {
      setPptTitle(title);
      setActiveName(title);
      setPptSrc(src);
   }, [title, src]);

   const inputRef = useRef(null);
   const onClick = () => {
      if (inputRef && inputRef.current) {
         setPptDescription(inputRef.current.initialValue);
         inputRef.current.reload();
      }
   };

   const storageManager = pptSrc && pptSrc.substring(
      pptSrc.lastIndexOf('//') + 1,
      pptSrc.lastIndexOf('.com')
   );

   const saveLesson = () => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = pptDescription;
      }
      if (pptSrc) {
         handleSave({
            type: 'ppt',
            ppt_name: pptTitle,
            ppt_src: pptSrc,
            description: pptDescription,
            mime_type: pptData.mimeType,
            original_name: pptData.name,
         });
      } else if (!pptSrc) {
         handleSave({
            name: pptTitle || 'PPT Title',
            description: pptDescription || '<p></p>',
            draft: true,
            lesson_visiblity: 1,
         });
      }
   };

   const autoSaveLesson = ppt => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = pptDescription;
      }
      if (ppt.cdnUrl) {
         handleSave({
            type: 'ppt',
            ppt_name: pptTitle,
            ppt_src: ppt.cdnUrl,
            description: pptDescription,
            mime_type: ppt.mimeType,
            original_name: ppt.name,
         });
      }
   };

   const { progressEL, uploadButton, uploadInProgress } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Upload PPT',
         theme: buttonTheme.lightGreen,
         size: buttonSizes.large,
      },
      onChange: (fileSrc, name, file) => {
         const info = {
            cdnUrl: fileSrc,
            mimeType: file.type,
            name,
         };
         setPptSrc(info.cdnUrl);
         setPptData(info);
         autoSaveLesson(info);
      },
      fileLessonFormat: 'ppt',
   });

   return (
      <ItemWrapper>
         <div className='pptLesson'>
            <div className='pptLesson__fields'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ pptTitle }
                  style={ { marginBottom: '36px' } }
               />
               <div className='ppt-title'>
                  <TextInput
                     placeholder='PPT Title'
                     rightLabel={ `${ charectersLimit }/150` }
                     label='Lesson Title'
                     id='pptTitle'
                     name='pptTitle'
                     value={ pptTitle }
                     onChange={ (name, value) => {
                        if (value.length < 151) {
                           setPptTitle(value);
                           setActiveName(value);
                           getCharectersLength(value.length);
                        } else if (isPrint('You have reached the character limitation')) {
                           toast.error('You have reached the character limitation');
                        }
                     } }
                  />
               </div>
               {

                  pptSrc
                        && (
                           <div className='pdfLesson__show m-t-m'>
                              {!isLoaded && (
                                 <div className='pdfLesson__loader'>
                                    <LoaderSpinner />
                                 </div>
                              )}
                              <iframe
                                 onLoad={ () => {
                                    setIsLoaded(true);
                                 } }
                                 style={ { display: isLoaded ? '' : 'none' } }
                                 src={ storageManager === '/ucarecdn' || storageManager.split(/\s+|\./).includes('amazonaws') || pptSrc.includes('cloudfront') ? `https://docs.google.com/gview?url=${ pptSrc }&embedded=true` : pptSrc }
                                 frameBorder='0'
                                 title={ pptSrc }
                                 allowFullScreen
                              />
                           </div>
                        )
               }
               <DynamicWrapper
                  isOpen={ false }
                  title={ ['PPT Content', <span style={ { color: '#a3a3a3', paddingLeft: '5px', fontStyle: 'italic' } }> optional  </span>] }
                  borderColor='#cddaf1'
                  style={ { marginTop: '24px' } }
               >
                  <div className='pptContent'>
                     <EditorConvertToHTML
                        ref={ inputRef }
                        description={ description }
                        onClick={ () => onClick() }
                        isCancel={ isCancel }
                        initial={ description }
                        data={ pptDescription || '' }
                        onChange={ (data) => {
                           setPptDescription(data);
                        } }
                     />

                  </div>
               </DynamicWrapper>
               { !(pptSrc && !uploadInProgress)
                        && (
                           <Text
                              type={ textType.regular }
                              size={ textSize.small }
                              inner='You can upload PowerPoint file'
                              color='#8a94a2'
                              style={ { marginTop: '24px' } }
                              bold
                           />
                        )
               }
            </div>
            {progressEL}
            <div className='pptLesson__buttons'>
               <div className='m-r-m'>
                  {((((pptDescription && pptDescription.replace(/(\r\n|\n|\r)/gm, '')) === description) || !pptDescription) && pptTitle === title && pptSrc === src) ? null : (
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.large }
                        text='Cancel'
                        onClick={ () => {
                           setPptTitle(title);
                           setPptSrc(src);
                           setIsCancel(!isCancel);
                           setPptDescription(description);
                           onClick();
                        } }
                     />
                  )}

               </div>
               <div className='m-r-m'>
                  {uploadButton}
               </div>
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

               <BaseButton
                  theme={ buttonTheme.darkGreen }
                  size={ buttonSizes.large }
                  text='Save'
                  // disabled={ !isValid }
                  className='save-lesson'
                  onClick={ () => saveLesson() }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

PptLesson.propTypes = {
   title: PropTypes.string,
   src: PropTypes.string,
   description: PropTypes.string,
   openSelectVideoModal: PropTypes.func,
   handleSave: PropTypes.func,
   setActiveName: PropTypes.func,
};


export default PptLesson;
