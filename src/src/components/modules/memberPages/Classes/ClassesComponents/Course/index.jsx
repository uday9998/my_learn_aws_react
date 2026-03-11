import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import moment from 'moment';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import Icon from 'components/elements/Icon';

const getStatus = (statusCode) => {
   switch (statusCode) {
      case 1:
         return 'Active';
      default:
         return 'Paused';
   }
};

const ClassesCourseComponents = ({
   course, onSelect, onDelete, onPause, memberId,
}) => {
   const { status } = course.pivot;
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);
   const { progress_percentage: prsentage } = course;

   return (
      <div className='class__course'>
         <div className='class__course__left'>
            <img src={ course.picture_src } alt='' />
            <div className='class__course__left__info'>
               <Text
                  inner={ course.name }
                  type={ txtTypes.regularDefault }
                  style={ { textDecoration: 'underline', cursor: 'pointer' } }
                  size={ txtSizes.small }
                  onClick={ () => onSelect(course) }
               />
               <div className='course__start'>
                  <Text
                     inner='Member since '
                     type={ txtTypes.regularDefault }
                     style={ { color: '#727978' } }
                     size={ txtSizes.small }
                  />
                  <Text
                     inner={ moment(course.created_at).format('D MMM YYYY') }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
            </div>
         </div>
         <div className='class__course__right'>
            <div className='class__course__prsent'>
               <Text
                  inner={ `${ prsentage || 0 }%` }
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
                  style={ { color: '#24554E' } }
               />
               <div className='prcent__line'>
                  <div className='prsent' style={ { width: `${ prsentage }px` } } />
               </div>
            </div>
            <div className='class__course__right__edit'>
               <div className={ `status status__${ prsentage === 100 ? 'Finished' : 'Active' }` }>
                  <Text
                     inner={ prsentage === 100 ? 'Finished' : getStatus(status) }
                     type={ txtTypes.regularLarge }
                     size={ txtSizes.xsmall }
                     style={ { color: '#fff' } }
                  />
               </div>
               <div className='class__course__right__triangle'>
                  <div className='class__course__right__triangle__icon' role='presentation' onClick={ () => setIsOpenTriangle(true) }>
                     <Icon name='Triangle' />
                  </div>
                  {isOpenTriangle && (
                     <div className='showPopup__content'>
                        <ClickOutside onClick={ () => setIsOpenTriangle(false) }>
                           {/* <div
                              className='popup__status'
                              role='presentation'
                              onClick={ () => {
                                 onPause(memberId, course.id);
                                 setIsOpenTriangle(false);
                              } }
                           >
                              <Icon name={ getStatus(status) === 'Active' ? 'PauseNew' : 'StartNew' } />
                              <Text inner={ getStatus(status) === 'Active' ? 'Pause' : 'Active' } size={ txtSizes.small } type={ txtTypes.regularDefault } />
                           </div> */}
                           <div className='popup__delete popup__status' role='presentation' style={ { border: 'none', background: 'none' } } onClick={ () => onDelete(memberId, course.id) }>
                              <Icon name='TrashMember' />
                              <Text inner='Delete' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                           </div>
                        </ClickOutside>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

ClassesCourseComponents.propTypes = {
   course: PropTypes.object,
   onSelect: PropTypes.func,
   onDelete: PropTypes.func,
   memberId: PropTypes.any,
   onPause: PropTypes.func,
};

export default ClassesCourseComponents;
