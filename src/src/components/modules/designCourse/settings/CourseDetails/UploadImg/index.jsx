import React, { useState } from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import img1 from 'assets/images/cats.png';
import PropTypes from 'prop-types';
import useS3Upload from 'components/modules/S3Upload';

import Tooltip from 'components/elements/members/Tooltip';
import { fileToDataUrl } from 'utils/mediaLibrary';

const UploadImg = ({
   img: image, title, size, width, height, onChange, removeLogo,
   isCoursePic, hasTooltip,
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
      cropRatio: size,
   });
   const img = imageDataUrl || image;


   return (
      <div
         className='uploadImgCourse__container'
      >
         <div className='m-b-exs flex'>
            <Text
               type={ TextType.normal }
               size={ TextSize.medium }
               inner={ title }
            />
            {hasTooltip && (
               <Tooltip
                  hintText='This logo appears on the Watch Room.'
                  style={ { top: '-3px' } }
               />
            )}
         </div>
         {size
         && (
            <div className='m-b-exs'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner={ `Recommended Size ${ size }` }
                  color='#8a94a2'
               />
            </div>
         )}
         <div
            className='uploadImg'
            style={ { width, height } }
         >

            { isCoursePic
               && <img src={ img } alt='Class-logo' />
            }


         </div>

         {progressEL}
         {uploadButton}
         {removeLogo && (
            <div className='m-t-m'>
               <BaseButton
                  theme={ btnTheme.grey }
                  size={ btnSize.full }
                  text='Remove Class Logo'
                  onClick={ () => { onChange(null); setImageDataUrl(null); } }
               />
            </div>
         )}

      </div>
   );
};

UploadImg.propTypes = {
   img: PropTypes.string,
   title: PropTypes.string,
   size: PropTypes.string,
   onChange: PropTypes.func,
   width: PropTypes.string,
   height: PropTypes.string,
   isCoursePic: PropTypes.bool,
   removeLogo: PropTypes.bool,
   hasTooltip: PropTypes.bool,
};

UploadImg.defaultProps = {
   size: '',
   img: img1,
   isCoursePic: false,
   removeLogo: false,
   hasTooltip: false,

};

export default UploadImg;
