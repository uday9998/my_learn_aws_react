import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import img1 from 'assets/images/cats.png';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import mainhubDefaultImg from 'assets/images/mainhub.png';
import favicon from 'assets/images/favicon.ico';
import memberDefImg from 'assets/images/profile-photo.png';
import useS3Upload from 'components/modules/S3Upload';

const UploadImg = ({
   img, title, size, width, height, removeFile, onChange, isFavicon, isSchoolLogo, isThumbnail,
   isMemberPic, crop, style, imgSize,
}) => {
   const { progressEL, uploadButton } = useS3Upload(BaseButton, {
      buttonProps: {
         text: isMemberPic ? 'Upload' : 'Upload Now',
         theme: isMemberPic ? btnTheme.lightBlue : btnTheme.blueBordered,
         size: isMemberPic ? btnSize.medium : btnSize.full,
         style,

      },
      onChange: (src) => {
         onChange(src);
      },
      fileLessonFormat: 'image',
      cropRatio: crop,
   });

   return (
      <div
         className='uploadImg__container'
         style={ isMemberPic ? { width: '100px' } : {} }

      >
         <div className='m-b-exs'>
            <Text
               type={ TextType.normal }
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
               && (img ? <img src={ img } alt='' /> : <Icon name='Logo' className='LogoIcon' />)
            }

            { isMemberPic
               && <img src={ !img ? memberDefImg : img } alt='' />
            }


         </div>
         {progressEL}
         {uploadButton}

      </div>
   );
};

UploadImg.propTypes = {
   img: PropTypes.string,
   title: PropTypes.string,
   size: PropTypes.string,
   removeFile: PropTypes.func,
   onChange: PropTypes.func,
   width: PropTypes.string,
   height: PropTypes.string,
   crop: PropTypes.string,
   isSchoolLogo: PropTypes.bool,
   isFavicon: PropTypes.bool,
   isThumbnail: PropTypes.bool,
   isMemberPic: PropTypes.bool,
   style: PropTypes.object,
};

UploadImg.defaultProps = {
   size: '',
   crop: '',
   img: img1,
   isSchoolLogo: false,
   isFavicon: false,
   isThumbnail: false,
   isMemberPic: false,
};

export default UploadImg;
