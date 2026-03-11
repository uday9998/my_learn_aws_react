import React, { useState } from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import img1 from 'assets/images/cats.png';
import PropTypes from 'prop-types';
import memberDefImg from 'assets/images/profile-photo.png';
import useS3Upload from 'components/modules/S3Upload';
import { fileToDataUrl } from 'utils/mediaLibrary';

const UploadImg = ({
   img: image, title, width, height, onChange, crop,
}) => {
   const [imageDataUrl, setImageDataUrl] = useState('');
   const { progressEL, uploadButton } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Upload Now',
         theme: btnTheme.blueBordered,
         size: btnSize.full,
      },
      onChange: async (src, _, file) => {
         const dataUrl = await fileToDataUrl(file);
         setImageDataUrl(dataUrl);
         onChange(src);
      },
      fileLessonFormat: 'image',
      cropRatio: crop,
   });
   const img = imageDataUrl || image;

   return (
      <div
         className='uploadImg__container'
      >
         <div className='uploadImg__title'>
            <Text
               type={ TextType.normal }
               size={ TextSize.extraSmall }
               inner={ title }
            />
         </div>
         <div
            className='uploadImg'
            style={ { width, height } }
         >
            <img src={ !img ? memberDefImg : img } alt='' />
         </div>
         {progressEL}
         {uploadButton}
         <div className='m-t-m'>
            <BaseButton
               theme={ btnTheme.grey }
               size={ btnSize.full }
               text='Remove Page Image'
               onClick={ () => { setImageDataUrl(null); onChange(''); } }
            />
         </div>
      </div>
   );
};

UploadImg.propTypes = {
   img: PropTypes.string,
   title: PropTypes.string,
   onChange: PropTypes.func,
   width: PropTypes.string,
   height: PropTypes.string,
   crop: PropTypes.string,
};

UploadImg.defaultProps = {
   crop: '',
   img: img1,
};

export default UploadImg;
