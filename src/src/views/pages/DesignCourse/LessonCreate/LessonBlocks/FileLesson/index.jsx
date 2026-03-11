import React, { useState, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import TextInput from 'components/elements/inputNew';
// import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { iframeValidation, urlValidation } from 'utils/validations';
import ChangeButton from 'components/elements/buttons/ChangeButton';
import FileLoading from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew/FileLoading';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import IconNew from 'components/elements/iconsSize';

const FileLesson = ({
   block, onChange, openSettings,
}) => {
   const [isHidenUpload, setIsHidenUpload] = useState(!!block.src);

   const changeLesson = (name, value) => {
      onChange(name, value, true);
   };


   const handleFilterAndSave = (name, value) => {
      if ((urlValidation(value) && !iframeValidation(value)) && ((value.includes('youtube') && value.includes('embed')) || !value.includes('youtube'))) {
         changeLesson(name, value);
         setIsHidenUpload(true);
      } else if (isPrint('URL must be a valid URL.')) {
         onChange(name, '', true);
         toast.error('URL must be a valid URL.');
      }
   };


   const wrapperRef = useRef(null);
   useOutsideClickDetector(wrapperRef, block.src ? () => setIsHidenUpload(true) : () => {});


   return (
      !isHidenUpload
         ? (
            <div className='multimedia__lesson'>
               <div className='multimedia__icon'>
                  <IconNew name='multimediaM' />
               </div>
               <div className='multimedia__url' ref={ wrapperRef }>
                  <TextInput
                     placeholder='Multimedia URL'
                     label=''
                     id='fileSrc'
                     name='src'
                     value={ block.src }
                     onChange={ (name, value) => handleFilterAndSave('src', value) }
                  />
               </div>
               <div className='multimedia__desc'>
                  <Text
                     type={ textType.regularDefaultGrey }
                     size={ textSize.small }
                     inner={ [
                        'Please note that the Multimedia lesson type uses an iframe to embed the content into your product, so in order for something to work as a Multimedia lesson it must be ‘’frameable’’.',
                        <br />,
                        'You can also use',
                        <a href='http://www.tinywebgallery.com/blog/advanced-iframe/free-iframe-checker' rel='noopener noreferrer' target='_blank'> <span className='upload__link'> this free tool </span></a>,
                        'to confirm whether or not the content is iframeable.',
                        <br />,
                        'Please use a URL with the HTTPS protocol, otherwise, the iframe will not work.',
                     ] }
                     color='#8a94a2'
                     bold
                  />
               </div>
            </div>
         )
         : (
            <div className='upload__media__file__view__change '>
               {!openSettings && (
                  <div className='upload__media__file__view__button'>
                     <ChangeButton
                        text='Change Multimedia'
                        iconName='ChangeImageM'
                        onClick={ () => setIsHidenUpload(false) }
                        withText={ true }
                     />
                  </div>
               )}

               <div className='multimedia__lesson__view embed-container'>
                  <FileLoading src={ block.src } type='multimedia' />
               </div>
            </div>

         )
   );
};

FileLesson.propTypes = {
   src: PropTypes.string,
   block: PropTypes.object,
   onChange: PropTypes.func,
   openSettings: PropTypes.any,
};

export default FileLesson;
