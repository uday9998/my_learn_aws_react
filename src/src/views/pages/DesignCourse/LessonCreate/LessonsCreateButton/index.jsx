import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
// import Router from 'routes/router';
import './index.scss';

const LessonsCreateButton = ({
   createLesson, currentSection, currentLesson, goTo, openLessons, setOpenLessons, course,
}) => {
   const popupRef = useRef(null);

   useOutsideClickDetector(popupRef, () => setOpenLessons(false));
   return (
      <div className='lessons__create__button' ref={ popupRef }>
         {openLessons && (
            <div className='lessons__list'>
               {currentSection
                && currentSection.lessons && currentSection.lessons.length && currentSection.lessons.map(lesson => {
                  if (lesson.id === currentLesson.id) {
                     return (
                        <div className='lessons__list__item__active' key={ lesson.id }>
                           <Text
                              inner={ currentLesson.name }
                              size={ TextSize.small }
                              type={ TextType.regularDefault }
                              style={ { color: '#24554E' } }
                           />
                        </div>
                     );
                  }
                  return (
                     <div
                        className='lessons__list__item'
                        key={ lesson.id }
                        onClick={
                           () => { goTo(lesson.id); setOpenLessons(false); } }
                        role='presentation'
                     >
                        <Text
                           inner={ lesson.name }
                           size={ TextSize.small }
                           type={ TextType.regularDefault }
                           style={ { color: '#24554E' } }
                        />
                     </div>
                  );
               })}

               {currentSection
               && currentSection.lessons && currentSection.lessons.length < 2 && (
                  <div className='lessons__list__item__empty'>
                     <div>
                        <Text
                           inner={ course && course.type === '1' ? 'There are no other videos yet.' : 'There are no other lessons yet.' }
                           size={ TextSize.small }
                           type={ TextType.mediumLarge }
                        />
                     </div>
                     <div>
                        <Text
                           inner={ course && course.type === '1' ? 'To see the videos in this list, you must have at least one more saved videos' : 'To see the lessons in this list, you must have at least one more saved lesson' }
                           size={ TextSize.small }
                           type={ TextType.regularDefault }
                        />
                     </div>
                  </div>
               )}
               <div className='add__new__lesson'>
                  <BaseButton
                     theme={ btnTheme.secondary }
                     size={ btnSizes.xsmall }
                     isIconRight={ true }
                     iconName='PlusSupportM'
                     text='Add New'
                     onClick={ () => { createLesson(); setOpenLessons(false); } }
                  />
               </div>
            </div>
         )}
         <div className='lessons__create__button_with_text' onClick={ () => setOpenLessons(!openLessons) } role='presentation'>
            <div className={ openLessons ? 'lesson__create__button__green' : 'lesson__create__button' }>
               <IconNew name={ openLessons ? 'CloseL' : 'CourseL' } />
            </div>
            <div>
               <Text
                  inner={ course && course.type === '1' ? 'Videos' : 'Lessons' }
                  size={ TextSize.small }
                  type={ TextType.regularDefault }
               />
            </div>
         </div>
      </div>
   );
};

LessonsCreateButton.propTypes = {
   createLesson: PropTypes.func,
   currentSection: PropTypes.object,
   currentLesson: PropTypes.object,
   goTo: PropTypes.func,
   openLessons: PropTypes.bool,
   setOpenLessons: PropTypes.func,
   course: PropTypes.object,
};

export default LessonsCreateButton;
