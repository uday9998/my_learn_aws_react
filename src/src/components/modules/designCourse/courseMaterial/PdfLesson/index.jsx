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
import LoaderSpinner from 'components/elements/LoaderSpiner';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const PdfLesson = ({
   title, src, handleSave, description, setActiveName, openSelectVideoModal,
}) => {
   const [pdfTitle, setPdfTitle] = useState(title);
   const [pdfSrc, setPdfSrc] = useState(src);
   const [pdfData, setPdfData] = useState(src);
   const [pdfDescription, setPdfDescription] = useState(description);
   const [charectersLimit, setCharectersLimit] = useState(9);
   const [isLoaded, setIsLoaded] = useState(false);
   const [isCancel, setIsCancel] = useState(false);

   const getCharectersLength = (l) => setCharectersLimit(l);

   useEffect(() => {
      setPdfTitle(title);
      setActiveName(title);
      setPdfSrc(src);
   }, [title, src]);

   const inputRef = useRef(null);
   const onClick = () => {
      if (inputRef && inputRef.current) {
         setPdfDescription(inputRef.current.initialValue);
         inputRef.current.reload();
      }
   };

   const storageManager = pdfSrc && pdfSrc.substring(
      pdfSrc.lastIndexOf('//') + 1,
      pdfSrc.lastIndexOf('.com')
   );


   const saveLesson = () => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = pdfDescription;
      }
      if (pdfSrc) {
         handleSave({
            type: 'pdf',
            pdf_name: pdfTitle,
            pdf_src: pdfSrc,
            description: pdfDescription,
            mime_type: pdfData.mimeType,
            original_name: pdfData.name,
         });
      } else if (!pdfSrc) {
         handleSave({
            name: pdfTitle || 'PDF Title',
            description: pdfDescription || '<p></p>',
            draft: true,
            lesson_visiblity: 1,
         });
      }
   };

   const autoSaveLesson = pdf => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = pdfDescription;
      }
      if (pdf.cdnUrl) {
         handleSave({
            type: 'pdf',
            pdf_name: pdfTitle,
            pdf_src: pdf.cdnUrl,
            description: pdfDescription,
            mime_type: pdf.mimeType,
            original_name: pdf.name,
         });
      }
   };

   const { progressEL, uploadButton, uploadInProgress } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Upload PDF',
         theme: buttonTheme.lightGreen,
         size: buttonSizes.large,
      },
      onChange: (fileSrc, name, file) => {
         const info = {
            cdnUrl: fileSrc,
            mimeType: file.type,
            name,
         };
         setPdfSrc(info.cdnUrl);
         setPdfData(info);
         autoSaveLesson(info);
      },
      fileLessonFormat: 'pdf',
   });

   return (
      <ItemWrapper>
         <div className='pdfLesson'>
            <div className='pdfLesson__fields'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ pdfTitle }
                  style={ { marginBottom: '36px' } }
               />
               <div className='pdf-title'>
                  <TextInput
                     placeholder='PDF Title'
                     label='Lesson Title'
                     rightLabel={ `${ charectersLimit }/150` }
                     id='pdfTitle'
                     name='pdfTitle'
                     value={ pdfTitle }
                     onChange={ (name, value) => {
                        if (value.length < 151) {
                           setPdfTitle(value);
                           setActiveName(value);
                           getCharectersLength(value.length);
                        } else if (isPrint('You have reached the character limitation')) {
                           toast.error('You have reached the character limitation');
                        }
                     } }
                  />

               </div>
               {
                  (pdfSrc)
                   && (

                      <div className='pdfLesson__show'>
                         {!isLoaded && (
                            <div className='pdgLesson__loader'>
                               <LoaderSpinner />
                            </div>
                         )}
                         <iframe
                            onLoad={ () => {
                               setIsLoaded(true);
                            } }
                            src={ storageManager === '/ucarecdn' ? `${ pdfSrc }-/inline/yes/` : pdfSrc }
                            frameBorder='0'
                            title={ pdfSrc }
                            allowFullScreen
                         />
                      </div>
                   )
               }
               <DynamicWrapper
                  isOpen={ false }
                  title={ ['PDF Content', <span style={ { color: '#a3a3a3', paddingLeft: '5px', fontStyle: 'italic' } }> optional  </span>] }
                  borderColor='#cddaf1'
                  style={ { marginTop: '24px' } }
               >
                  <div className='pdfContent'>
                     <EditorConvertToHTML
                        data={ pdfDescription || '' }
                        description={ pdfDescription }
                        isCancel={ isCancel }
                        initial={ description }
                        ref={ inputRef }
                        onChange={ (data) => {
                           setPdfDescription(data);
                        } }
                     />

                  </div>
               </DynamicWrapper>
               { !(pdfSrc && !uploadInProgress)
                        && (
                           <Text
                              type={ textType.regular }
                              size={ textSize.small }
                              inner='You can upload PDF file'
                              color='#8a94a2'
                              style={ { marginTop: '24px' } }
                              bold
                           />
                        )
               }
            </div>
            {progressEL}
            <div className='pdfLesson__buttons'>
               <div className='m-r-m'>
                  {((((pdfDescription && pdfDescription.replace(/(\r\n|\n|\r)/gm, '')) === description) || !pdfDescription) && pdfTitle === title && pdfSrc === src) ? null : (
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.large }
                        text='Cancel'
                        onClick={ () => {
                           setPdfTitle(title);
                           setIsCancel(!isCancel);
                           setPdfSrc(src);
                           setPdfDescription(description);
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
                  className='save-lesson'
                  onClick={ () => saveLesson() }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

PdfLesson.propTypes = {
   title: PropTypes.string,
   src: PropTypes.string,
   openSelectVideoModal: PropTypes.func,
   handleSave: PropTypes.func,
   description: PropTypes.string,
   setActiveName: PropTypes.func,
};

export default PdfLesson;
