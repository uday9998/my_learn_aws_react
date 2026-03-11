import React, { useState } from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import mainhubDefaultImg from 'assets/images/mainhub.png';
import favicon from 'assets/images/favicon.ico';
import memberDefImg from 'assets/images/profile-photo.png';
import useS3Upload from 'components/modules/S3Upload';
import { fileToDataUrl } from 'utils/mediaLibrary';

const UploadImg = ({
   img: image, title, size, width, height, onChange, isFavicon, isSchoolLogo, isThumbnail,
   isMemberPic, crop, style, imgSize, hideTitle, labelFont, removLogo, removeTitle,
}) => {
   const [imageDataUrl, setImageDataUrl] = useState('');
   const { progressEL, uploadButton } = useS3Upload(BaseButton, {
      buttonProps: {
         text: isMemberPic ? 'Upload' : 'Upload Now',
         theme: isMemberPic ? btnTheme.lightBlue : btnTheme.blueBordered,
         size: isMemberPic ? btnSize.medium : btnSize.full,
         style,

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
         style={ isMemberPic ? { width: '100px' } : {} }

      >
         {!hideTitle && (
         <>
            <div className='m-b-exs'>
               <Text
                  type={ TextType[labelFont || 'normal'] }
                  size={ (isThumbnail || isFavicon || isSchoolLogo) ? TextSize.extraSmall : TextSize.medium }
                  inner={ title }
               />
            </div>
            {size
         && (
            <div className='m-b-exs' style={ isFavicon ? { visibility: 'hidden' } : {} }>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner={ `Recommended Size ${ size }` }
                  color='#8a94a2'
               />
            </div>
         )}
         </>

         )}
         <div
            className='uploadImg'
            style={ { width, height } }
         >

            { isFavicon
               && <img src={ !img ? favicon : img } alt='' style={ { width: '60px' } } />
            }

            { isThumbnail
               && <img src={ !img ? mainhubDefaultImg : img } alt='' style={ imgSize ? { width: '80px' } : {} } />
            }

            { isSchoolLogo
               && (img ? <img src={ img } alt='' style={ { width: '125px', height: 'auto' } } /> : <Icon name='Logo' className='LogoIcon' style={ { width: '125px', height: 'auto' } } />)
            }

            { isMemberPic
               && <img src={ !img ? memberDefImg : img } alt='' />
            }


         </div>
         {progressEL}
         {uploadButton}
         <div className='m-t-m'>
            <BaseButton
               theme={ btnTheme.grey }
               size={ btnSize.full }
               text={ removeTitle }
               onClick={ () => {
                  onChange(null);
                  setImageDataUrl(null);
               } }
               style={ style }
            />
         </div>

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
   labelFont: PropTypes.string,
   crop: PropTypes.string,
   isSchoolLogo: PropTypes.bool,
   isFavicon: PropTypes.bool,
   isThumbnail: PropTypes.bool,
   isMemberPic: PropTypes.bool,
   hideTitle: PropTypes.bool,
   style: PropTypes.object,
   imgSize: PropTypes.any,
   removLogo: PropTypes.bool,
   removeTitle: PropTypes.string,
};

UploadImg.defaultProps = {
   size: '',
   crop: '',
   isSchoolLogo: false,
   isFavicon: false,
   isThumbnail: false,
   isMemberPic: false,
   removLogo: false,
   removeTitle: '',
};

export default UploadImg;
