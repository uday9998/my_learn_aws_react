import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import useS3Upload from 'components/modules/S3Upload';


const UploadImg = ({
   title, size, width, height, onChange, isFavicon, isSchoolLogo, isThumbnail,
   isMemberPic, crop, setFileLoading, disabled, autoSaveVideoLessonImg, setPosterImgSrc, img,
}) => {
   const { uploadButton } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Upload',
         theme: btnTheme.lightGreen,
         size: btnSize.medium,
      },
      onChange: (fileSrc) => {
         onChange(fileSrc);
      },
      onLoadingStart: () => setFileLoading(true),
      onLoadingEnd: () => setFileLoading(false),
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
            {/* <img src={ !img ? mainhubDefaultImg : img } alt='' /> */}
         </div>

         {!disabled && (
            <div className='video_thumbnail'>
               <div>
                  <div>
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.medium }
                        inner='Video thumbnail'
                     />
                  </div>
                  <div>
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.extraSmall }
                        inner='Formats supported: JPG, JPEG, PNG'
                        color='#8a94a2'
                     />
                  </div>
                  <div>
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.extraSmall }
                        inner=' Recommended dimensions: 1920x1080px'
                        color='#8a94a2'
                     />
                  </div>
               </div>
               <div>
                  <div>
                     {uploadButton}
                  </div>
                  {img && (
                     <div className='delete_btn'>
                        <BaseButton
                           theme={ btnTheme.grey }
                           size={ btnSize.medium }
                           text='Delete'
                           onClick={ () => {
                              setFileLoading(true);
                              autoSaveVideoLessonImg(null); setPosterImgSrc(null);
                              setTimeout(() => {
                                 setFileLoading(false);
                              });
                           } }
                           disabled={ !!disabled }
                        />
                     </div>
                  )}

               </div>

            </div>

         )}

      </div>
   );
};

UploadImg.propTypes = {
   title: PropTypes.string,
   size: PropTypes.string,
   onChange: PropTypes.func,
   width: PropTypes.string,
   height: PropTypes.string,
   crop: PropTypes.string,
   isSchoolLogo: PropTypes.bool,
   isFavicon: PropTypes.bool,
   isThumbnail: PropTypes.bool,
   isMemberPic: PropTypes.bool,
   setFileLoading: PropTypes.func,
   disabled: PropTypes.bool,
   autoSaveVideoLessonImg: PropTypes.func,
   setPosterImgSrc: PropTypes.func,
   img: PropTypes.string,
};

UploadImg.defaultProps = {
   size: '',
   crop: '',
   isSchoolLogo: false,
   isFavicon: false,
   isThumbnail: false,
   isMemberPic: false,
};

export default UploadImg;
