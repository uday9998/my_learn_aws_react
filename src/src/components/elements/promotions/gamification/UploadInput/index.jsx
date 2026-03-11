/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import defImg from 'assets/images/promotions/default.png';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import { isLocalhost } from 'utils/Helpers';
import useS3Upload from 'components/modules/S3Upload';
import { fileToDataUrl } from 'utils/mediaLibrary';

const DefaultImg = () => {
   return (
      <div className='defaultImg'>
         <img src={ defImg } alt='default' />
      </div>
   );
};

const apiUrl = isLocalhost() ? process.env.REACT_APP_MAIN_LOCAL_ENDPOINT : process.env.REACT_APP_MAIN_DOMAIN_LIVE;

const UploadInput = ({
   img, defaultImg, color, style, onChange,
}) => {
   const imgSrc = /^(http|https):/.test(img) ? img : `${ apiUrl }${ img }`;
   const widget = useRef();
   const [uploadImg, setUploadImg] = useState(imgSrc);
   const [imageDataUrl, setImageDataUrl] = useState('');
   const uploadedImage = imageDataUrl || uploadImg;

   function onWidgetMount(widgetFunctions) {
      widget.current = widgetFunctions;
   }

   const handleChange = src => {
      onChange('badge_src', src);
      setUploadImg(src);
   };

   const { progressEL, uploadButton } = useS3Upload(null, {

      onChange: async (src, _, file) => {
         const dataUrl = await fileToDataUrl(file);
         handleChange(src);
         setImageDataUrl(dataUrl);
      },
      fileLessonFormat: 'image',
      cropRatio: '100x100',
   }, onWidgetMount);


   return (
      <div className='uploadInput' style={ { style } }>
         {(uploadImg && (
            <div className='uploadImgContainer'>
               <img src={ uploadImg === apiUrl ? defImg : uploadedImage } alt='upload-imsg' />
            </div>
         )) || (defaultImg ? (
            <div className='uploadImgContainer'>
               <img src={ defaultImg } alt='upload-imdg' />
            </div>
         ) : <DefaultImg />)}
         {progressEL}
         <div className='upload__btn' onClick={ () => { widget.current.openWidget(); } } role='presentation'>
            <Text
               type={ TextType.normal }
               size={ TextSize.extraSmall }
               inner={ (uploadImg && 'Change') || 'Upload' }
               color={ color }
            />
         </div>
         <div className='uploadcare_widget' style={ { display: 'none' } }>
            {uploadButton}
         </div>
      </div>
   );
};

UploadInput.propTypes = {
   img: PropTypes.string,
   color: PropTypes.string,
   defaultImg: PropTypes.string,
   style: PropTypes.object,
   onChange: PropTypes.func,
};

UploadInput.defaultProps = {
   color: '#006dff',
};
export default UploadInput;
