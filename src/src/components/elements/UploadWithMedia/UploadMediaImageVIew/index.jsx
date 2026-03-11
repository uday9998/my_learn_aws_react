import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UploadWithMedia from 'components/elements/UploadWithMedia';
import './index.scss';
import ChangeButton from 'components/elements/buttons/ChangeButton';
import ImageLoading from 'components/elements/imageLoading';

const UploadMediaImageView = ({ src, ...rest }) => {
   const [isHidenUpload, setIsHidenUpload] = useState(false);
   useEffect(() => {
      setIsHidenUpload(!!src);
   }, [src]);
   return (
      <div className='upload__media__image__view'>
         {isHidenUpload ? (
            <div className='upload__media__image__view__change'>
               <ImageLoading src={ src }>
                  <div className='upload__media__image__view__button'>
                     <ChangeButton
                        text='Change Image'
                        iconName='ChangeImageM'
                        onClick={ () => setIsHidenUpload(false) }
                     />
                  </div>
               </ImageLoading>
            </div>
         ) : (
            <UploadWithMedia
               { ...rest }
               onFinish={ () => setIsHidenUpload(true) }
            />
         )}
      </div>
   );
};

UploadMediaImageView.propTypes = {
   src: PropTypes.string,
   rest: PropTypes.object,
};

export default UploadMediaImageView;
