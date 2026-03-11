import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import moment from 'moment';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import '../Course/index';
import { uniqueId } from 'lodash';
import SectionModule from '../Module/Modul';
import LessonModule from '../Lesson';

const getStatus = (statusCode) => {
   switch (statusCode) {
      case 1:
         return 'Active';
      default:
         return 'Paused';
   }
};


const CourseModules = ({
   course, goBack, onPause, onDelete,
}) => {
   const [isOpenTriangle, setIsOpenTriangle] = useState('');
   const [selectedModule, setSelectedModule] = useState({});
   const selectModule = (module) => {
      setSelectedModule(module);
   };
   const { progress_percentage: prsentage } = course;
   const { status } = course.pivot;
   return (
      <div className='course__modules'>
         <div className='course__modules__top'>
            <div className='course__modules__top__back' role='presentation' onClick={ () => goBack() }>
               <Icon name='ArrowLeftLarge' />
            </div>
            <div className='course__modules__top__text'>
               <Text
                  inner={ course.name }
                  type={ txtTypes.mediumLarge }
                  size={ txtSizes.xlarge }
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
         <div className='course__modules__content'>
            <div className='course__modules__content__top'>
               <Text
                  inner='Overall progress'
                  type={ txtTypes.regular160 }
                  size={ txtSizes.xlarge }
               />
               <div className='course__modules__content__top__right'>
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
                              <div
                                 className='popup__status'
                                 role='presentation'
                                 onClick={ () => {
                                    onPause();
                                    setIsOpenTriangle(false);
                                 } }
                              >
                                 <Icon name={ getStatus(status) === 'Active' ? 'PauseNew' : 'StartNew' } />
                                 <Text inner={ getStatus(status) === 'Active' ? 'Pause' : 'Active' } size={ txtSizes.small } type={ txtTypes.regularDefault } />
                              </div>
                              <div className='popup__delete popup__status' role='presentation' onClick={ () => onDelete() }>
                                 <Icon name='TrashMember' />
                                 <Text inner='Delete' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                              </div>
                           </ClickOutside>
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <div className='course__modules__content__flex'>
               <div className='course__modules__sections'>
                  <div className='course__modules__sections__title'>
                     <Text
                        inner='Modules'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.large }
                     />
                     <Text
                        inner={ course.sections ? course.sections.length : 0 }
                        type={ txtTypes.medium }
                        size={ txtSizes.xsmall }
                        className='course__modules__sections__title__qount'
                     />
                  </div>
                  <div className='course__modules__sections__flex'>
                     {course.sections && course.sections.map((section) => {
                        return (
                           <SectionModule
                              isSelected={ selectedModule.id === section.id }
                              onSelect={ selectModule }
                              section={ section }
                              key={ uniqueId() }
                           />
                        );
                     })}
                  </div>
               </div>
               {selectedModule.id && (
                  <div className='course__modules__sections'>
                     <div className='course__modules__sections__title'>
                        <Text
                           inner='Lessons'
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.large }
                        />
                        <Text
                           inner={ selectedModule.lessons.length }
                           type={ txtTypes.medium }
                           size={ txtSizes.xsmall }
                           className='course__modules__sections__title__qount'
                        />
                     </div>
                     <div className='course__modules__sections__flex'>
                        {selectedModule && selectedModule.lessons.map((lesson) => {
                           return (
                              <LessonModule lesson={ lesson } key={ uniqueId() } />
                           );
                        })}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

CourseModules.propTypes = {
   goBack: PropTypes.func,
   onPause: PropTypes.func,
   course: PropTypes.array,
   onDelete: PropTypes.func,
};

export default CourseModules;
