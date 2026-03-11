import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';

const colors = ['green', 'lightGreen', 'orange', 'yellow', 'lightYellow', 'red', 'pink', 'navy',
   'blue', 'grey', 'black', 'purple', 'lightPurple', 'lightPink', 'test', 'follow', 'new'];
const CertificateCardCourses = ({ courses, isInfinityView }) => {
   const ref = useRef(null);
   const [isOpen, setIsOpen] = useState(false);
   const getItemColor = (index) => {
      if (index < 17) {
         return colors[index];
      }
      const random = Math.floor(Math.random() * 16);
      return colors[random];
   };

   const onClickButton = () => {
      setIsOpen(true);
   };

   const onClose = () => {
      setIsOpen(false);
   };

   return (
      <div className={ `certificate__card__courses${ isInfinityView ? ' certificate__card__courses__infinity' : '' }` } ref={ ref }>
         {(isInfinityView ? courses : courses.slice(0, 3)).map((e, index) => {
            return (
               <SimpleStatus
                  color={ getItemColor(index) }
                  text={ e.name }
               />
            );
         })}
         {isOpen && (
            <ClickOutside onClick={ onClose }>
               <div className='certificate__card__courses__content'>
                  {courses.slice(3).map((e) => {
                     return (
                        <SimpleStatus
                           color={ getItemColor() }
                           text={ e.name }
                        />
                     );
                  })}
               </div>
            </ClickOutside>
         )}
         {!isInfinityView && courses.length - 3 > 0 && (
            <div className='certificate__card__courses__button' role='presentation' onClick={ onClickButton }>
               <Text
                  inner={ `+${ courses.length - 3 }` }
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#36796F' } }
               />
            </div>
         )}
      </div>
   );
};

CertificateCardCourses.propTypes = {
   courses: PropTypes.array,
   isInfinityView: PropTypes.bool,
};

export default CertificateCardCourses;
