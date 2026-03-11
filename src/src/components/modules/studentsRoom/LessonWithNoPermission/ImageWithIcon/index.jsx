import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Icon from 'components/elements/Icon';

const ImageWithIcon = ({
   src,
   wrapperStyle,
   lesson,
   isSmall,
}) => {
   return (
      <div
         className={ isSmall ? 'image__with__icon image__with__icon__small' : 'image__with__icon' }
         style={ { ...wrapperStyle } }
      >
         <div
            className='image__with__icon__icon'
            //  style={ { backgroundImage: `url(${ src })` } }
         />
         <img
            src={ src }
            alt='iconed_image'
            className='image__with__icon__image'
         />
         {!!lesson && !lesson.is_free_lesson && (
            <div className={ isSmall ? 'lock__or__free__small' : 'lock__or__free' }>
               {
                  lesson?.is_free_lesson ? <Icon name='Free' color='#fff' /> : <Icon name='LockL' color='#fff' />
               }
               <span>{ lesson?.is_free_lesson ? 'Free' : 'Locked' }</span>
            </div>
         )}
      </div>
   );
};

ImageWithIcon.propTypes = {
   src: PropTypes.string,
   wrapperStyle: PropTypes.object,
   lesson: PropTypes.object,
   isSmall: PropTypes.bool,
};

export default ImageWithIcon;
