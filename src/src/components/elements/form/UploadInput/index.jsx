/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import defImg from 'assets/images/promotions/default.png';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const DefaultImg = () => {
   return (
      <div className='defaultImg'>
         <img src={ defImg } alt='default' />
      </div>
   );
};

const UploadInput = ({
   img, defaultImg, backColor, color, style, onUpload,
}) => {
   const [uploadImg, setUploadImg] = useState(img);

   const handleChange = (event) => {
      const files = event.target.files;
      if (files.length) {
         const reader = new FileReader();
         reader.onload = (e) => setUploadImg(e.target.result);
         reader.readAsDataURL(files[0]);
      }
   };

   return (
      <div className='uploadInput' style={ { style } }>
         {(uploadImg && (
            <div className='uploadImgContainer'>
               <img src={ uploadImg } alt='upload-img' />
            </div>
         )) || (defaultImg ? (
            <div className='uploadImgContainer'>
               <img src={ defaultImg } alt='upload-img' />
            </div>
         ) : <DefaultImg />)}
         { !onUpload && <input type='file' id='uploadImg' accept='image/*' onChange={ handleChange } />}
         <label htmlFor='uploadImg' style={ { background: backColor } }>
            <Text
               type={ TextType.normal }
               size={ TextSize.extraSmall }
               inner={ (uploadImg && 'Change') || 'Upload' }
               color={ color }
               onClick={ onUpload }
            />
         </label>
      </div>
   );
};

UploadInput.propTypes = {
   img: PropTypes.string,
   backColor: PropTypes.string,
   color: PropTypes.string,
   defaultImg: PropTypes.string,
   style: PropTypes.object,
};

UploadInput.defaultProps = {
   color: '#006dff',
};
export default UploadInput;
