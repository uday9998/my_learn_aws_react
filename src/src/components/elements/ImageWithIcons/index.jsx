import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Icon from '../Icon';
const defaultImage = 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png';

const ImageWithIcons = ({
   src,
   wrapperStyle,
   lesson,
}) => {
   const [imageSrc, setImageSrc] = useState(src || defaultImage);
   const [hasError, setHasError] = useState(false);

   const handleImageError = () => {
      if (!hasError) {
         setHasError(true);
         setImageSrc(defaultImage);
      }
   };

   const handleImageLoad = () => {
      setHasError(false);
   };

   return (
      <div
         className='image__with__icons'
         style={ { ...wrapperStyle } }
      >
         <div
            className='image__with__icons__blur'
            // style={ { backgroundImage: `url(${ imageSrc })` } }
         />
         <img
            src={ imageSrc }
            alt='lesson image'
            className='image__with__icons__image'
            onError={ handleImageError }
            onLoad={ handleImageLoad }
         />
         {!!lesson && (
            <div className='lock__or__free'>
               {
                  lesson?.is_free_lesson ? <Icon name='Free' color='#fff' /> : <Icon name='Lock' color='#fff' />
               }
               <span>{ lesson?.is_free_lesson ? 'Free' : 'Locked' }</span>
            </div>
         )}
      </div>
   );
};

ImageWithIcons.propTypes = {
   src: PropTypes.string,
   wrapperStyle: PropTypes.object,
   lesson: PropTypes.object,
};

export default ImageWithIcons;