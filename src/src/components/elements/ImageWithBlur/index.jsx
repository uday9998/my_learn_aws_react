import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Icon from '../Icon';

const ImageWithBlur = ({
   src,
   wrapperStyle,
   lesson,
   onError,
}) => {
   return (
      <div
         className='image__with__blur'
         style={ { ...wrapperStyle } }
      >
         <div
            className='image__with__blur__blur'
            style={ { backgroundImage: `url(${ src })` } }
         />
         <img
            src={ src }
            alt='blured_image'
            className='image__with__blur__image'
            onError={ onError }
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

ImageWithBlur.propTypes = {
   src: PropTypes.string,
   wrapperStyle: PropTypes.object,
   lesson: PropTypes.object,
   onError: PropTypes.object,
};

export default ImageWithBlur;
