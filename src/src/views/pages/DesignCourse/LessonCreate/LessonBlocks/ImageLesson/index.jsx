import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import useS3Upload from 'components/modules/S3Upload';
import { fileToDataUrl } from 'utils/mediaLibrary';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';

const ImageLesson = ({
   title,
   src,
   handleSave,
   description,
   setActiveName,
   openSelectVideoModal,
   openSettings,
   block,
   onChange,
}) => {
   const [imageTitle, setImageTitle] = useState(title);
   const [imageSrc, setImageSrc] = useState(src);
   const [imageDataUrl, setImageDataUrl] = useState('');
   const [imageDescription, setImageDescription] = useState(description);
   const [charectersLimit, setCharectersLimit] = useState(11);
   const [isCancel, setIsCancel] = useState(false);
   const getCharectersLength = (l) => setCharectersLimit(l);

   const inputRef = useRef(null);
   useEffect(() => {
      setActiveName(title);
      setImageTitle(title);
      setImageSrc(src);
   }, [title, src]);

   const onClick = () => {
      if (inputRef && inputRef.current) {
         setImageDescription(inputRef.current.initialValue);
         inputRef.current.reload();
      }
   };


   const saveLesson = () => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = imageDescription;
      }
      if (imageSrc) {
         handleSave({
            type: 'image',
            image_name: imageTitle,
            image_src: imageSrc,
            description: imageDescription,
         });
      } else if (!imageSrc) {
         handleSave({
            name: imageTitle || 'Image title',
            description: imageDescription || '<p></p>',
            draft: true,
            lesson_visiblity: 1,
         });
      }
   };

   const autoSaveLesson = async (img, originalName, file) => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = imageDescription;
      }
      const dataUrl = await fileToDataUrl(file);
      setImageDataUrl(dataUrl);
      handleSave({
         type: 'image',
         image_name: imageTitle,
         image_src: img,
         description: imageDescription,
         mime_type: file.type,
         original_name: originalName,
      });
   };

   const { progressEL, uploadButton, uploadInProgress } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Upload Image',
         theme: buttonTheme.lightGreen,
         size: buttonSizes.large,
      },
      onChange: autoSaveLesson,
      fileLessonFormat: 'image',
      cropRatio: true,
   });

   const changeLesson = (name, value, originalName, file = {}, options = {}) => {
      onChange(name, value, true, originalName, file.type, options);
   };

   return (
      <div className='image__lesson'>
         <UploadMediaView
            src={ block.image_src }
            style={ block.css_attributes || {} }
            type='image'
            buttonText='Image'
            iconName='ImageM'
            bottomText='You can upload image files with the extensions: png, jpg, jpeg, tiff'
            openSettings={ openSettings }
            isHaveRecomenededText={ true }
            uploadProps={ {
               fileLessonFormat: 'image',
               isAmazonFile: true,
               cropRatio: 'free',
               onChange: (value, originalName, file, options = {}) => {
                  changeLesson('image_src', value, originalName, file, options);
               },
            } }

         />

      </div>
      // <ItemWrapper>
      //    <div className='imageLesson'>

   //       <div className='imageLesson__fields'>
   //          <Text
   //             type={ textType.bold }
   //             size={ textSize.medium }
   //             inner={ title }
   //             style={ { marginBottom: '36px' } }
   //          />
   //          <div className='image-title'>
   //             <TextInput
   //                placeholder='Image Title'
   //                label='Lesson Title'
   //                rightLabel={ `${ charectersLimit }/150` }
   //                id='imageTitle'
   //                name='imageTitle'
   //                value={ imageTitle }
   //                onChange={ (name, value) => {
   //                   if (value.length < 151) {
   //                      setImageTitle(value);
   //                      setActiveName(value);
   //                      getCharectersLength(value.length);
   //                   } else if (isPrint('You have reached the character limitation')) {
   //                      toast.error('You have reached the character limitation');
   //                   }
   //                } }
   //             />
   //          </div>
   //          {
   //             (imageSrc)
   //                   && (
   //                      <div className='imageLesson__image'>
   //                         <img src={ imageDataUrl || imageSrc } alt='cover' />
   //                      </div>
   //                   )
   //          }
   //          <DynamicWrapper
   //             isOpen={ false }
   //             title={ ['Image Content', <span style={ { color: '#a3a3a3', paddingLeft: '5px', fontStyle: 'italic' } }> optional  </span>] }
   //             borderColor='#cddaf1'
   //             style={ { marginTop: '24px' } }
   //          >
   //             <div className='image_fieldsDescription'>
   //                <EditorConvertToHTML
   //                   ref={ inputRef }
   //                   onClick={ () => onClick() }
   //                   isCancel={ isCancel }
   //                   initial={ description }
   //                   description={ imageDescription }
   //                   data={ imageDescription || '' }
   //                   onChange={ (data) => {
   //                      setImageDescription(data);
   //                   } }
   //                />
   //             </div>
   //          </DynamicWrapper>
   //          {
   //             !(imageSrc && !uploadInProgress)
   //                   && (
   //                      <Text
   //                         type={ textType.regular }
   //                         size={ textSize.small }
   //                         inner='You can upload image file with the extensions: png, jpg, jpeg, tiff'
   //                         color='#8a94a2'
   //                         style={ { marginTop: '24px' } }
   //                         bold
   //                      />
   //                   )


   //          }
   //       </div>
   //       <div className='m-t-m'>
   //          {progressEL}
   //       </div>


   //       <div className='imageLesson__buttons'>
   //          <div className='m-r-m'>
   //             {((((imageDescription && imageDescription.replace(/(\r\n|\n|\r)/gm, '')) === description) || !imageDescription) && imageTitle === title && imageSrc === src) ? null : (
   //                <BaseButton
   //                   theme={ buttonTheme.grey }
   //                   size={ buttonSizes.large }
   //                   text='Cancel'
   //                   onClick={ () => {
   //                      setImageTitle(title);
   //                      setIsCancel(!isCancel);
   //                      setImageSrc(src);
   //                      setImageDescription(description);
   //                      onClick();
   //                      //  setisValid(!!src);
   //                   } }
   //                />
   //             )}
   //          </div>
   //          {uploadButton}
   //          <div className='m-r-m m-l-m'>
   //             <BaseButton
   //                theme={ buttonTheme.lightGreen }
   //                size={ buttonSizes.large }
   //                text='Library'
   //                onClick={ () => {
   //                   openSelectVideoModal();
   //                } }
   //             />
   //          </div>

   //          <div className='m-l-m'>
   //             <BaseButton
   //                theme={ buttonTheme.darkGreen }
   //                size={ buttonSizes.large }
   //                text='Save'
   //                className='save-lesson'
   //                onClick={ () => saveLesson() }
   //             />
   //          </div>
   //       </div>
   //    </div>
   // </ItemWrapper>
   );
};

ImageLesson.propTypes = {
   title: PropTypes.string,
   src: PropTypes.string,
   handleSave: PropTypes.func,
   openSelectVideoModal: PropTypes.func,
   description: PropTypes.string,
   setActiveName: PropTypes.func,
   block: PropTypes.object,
   openSettings: PropTypes.bool,
   onChange: PropTypes.func,
};

export default ImageLesson;
