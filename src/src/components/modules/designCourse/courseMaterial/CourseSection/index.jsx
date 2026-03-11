/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import './index.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import LessonMenu from 'components/modules/designCourse/courseMaterial/LessonMenu';
import LessonItem from 'components/elements/designCourse/courseMaterial/LessonItem';
import {
   sortableContainer,
   sortableElement,
   sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Icon from 'components/elements/Icon';

const DragHandle = sortableHandle(() => (
   <Icon name='Dragdrop' />
));


const SortableList = sortableElement(({
   name,
   draft,
   format,
   active,
   sectionId,
   deleteLesson,
   selectLesson,
   id,
   activeName,
   isFreeLesson,
   isDisabled,
}) => {
   return (
      <LessonItem
         index={ id }
         name={ name }
         draft={ draft }
         isFreeLesson={ isFreeLesson }
         format={ format }
         active={ active }
         sectionId={ sectionId }
         deleteLesson={ deleteLesson }
         selectLesson={ selectLesson }
         activeName={ activeName }
         isDisabled={ isDisabled }
      />
   );
});

const SortableContainer = sortableContainer(({ children }) => {
   return <>{children}</>;
});
const CourseSection = ({
   lessons, addLesson, deleteLesson, selectLesson, title, active,
   selectSection, currentLesson, onReorderLessons,
   sectionId, lastSectionId, activeName,
}) => {
   const [showMenu, setShowMenu] = useState(false);

   function onClickOutSide(event) {
      const elem = document.querySelector(`#section${ sectionId }`);
      if (!elem.contains(event.target)) {
         setShowMenu(false);
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', onClickOutSide);
      return () => {
         document.removeEventListener('mousedown', onClickOutSide);
      };
   });

   const defaultLessons = [
      {
         name: 'Audio',
         icon: 'Audio',
         value: 'audio',
      },
      {
         name: 'Video',
         icon: 'Video',
         value: 'video',
      },
      {
         name: 'Text',
         icon: 'Text',
         value: 'text',
      },
      {
         name: 'PDF',
         icon: 'File',
         value: 'pdf',
      },
      {
         name: 'PowerPoint',
         icon: 'Presentation',
         value: 'ppt',
      },
      {
         name: 'Image',
         icon: 'Image',
         value: 'image',
      },
      {
         name: 'Quiz',
         icon: 'Quiz',
         value: 'quiz',
      },
      {
         name: 'Multimedia',
         icon: 'Multimedia',
         value: 'multimedia',
      },
   ];
   function onSortEnd({ oldIndex, newIndex }) {
      selectLesson(sectionId, lessons[oldIndex].id);
      if (oldIndex !== newIndex) {
         const newData = arrayMove(lessons, oldIndex, newIndex);
         onReorderLessons(newData);
      }
   }

   return (
      <>
         <ItemWrapper
            border={ active }
         >

            <div
               className='courseSection'
               role='presentation'
               onClick={ (e) => {
                  e.stopPropagation();
                  selectSection();
               } }
            >
               <div className='section__dragHandle'>
                  <DragHandle />
               </div>

               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ title }
                  bold={ true }
               />
               { lessons.length !== 0 ? (
                  <SortableContainer onSortEnd={ onSortEnd } helperClass='sortableHelper' useDragHandle>
                     <div
                        onClick={ (e) => e.stopPropagation() }
                        role='presentation'
                        className='addedLessons'
                     >
                        {
                           lessons.map(({
                              id, name, lesson_format, section_id, draft, prerequisite, is_free_lesson: isFreeLesson,
                           }, index) => (
                              <SortableList
                                 index={ index }
                                 name={ name }
                                 draft={ draft }
                                 format={ lesson_format }
                                 key={ id }
                                 id={ id }
                                 active={ currentLesson && currentLesson.id === id }
                                 sectionId={ section_id }
                                 deleteLesson={ () => deleteLesson(section_id, id) }
                                 selectLesson={ selectLesson }
                                 activeName={ activeName }
                                 isFreeLesson={ isFreeLesson }
                                 isDisabled={ !!prerequisite }
                              />
                           ))
                        }
                     </div>
                  </SortableContainer>
               ) : null }
               <div
                  onClick={ (e) => {
                     const diff = e.target.parentNode.getBoundingClientRect().y;
                     const elementScroll = document.querySelector('#course_left_content_scroll');
                     const parentNode = e.target.parentNode.parentNode;
                     e.preventDefault();
                     const element = document.querySelector('#course_left_content');
                     if (e.target.parentNode && e.target.parentNode.parentNode) {
                        if (!showMenu && (e.target.id === `addLesson${ lastSectionId }`) && element) {
                           element.scroll(0, elementScroll.clientHeight);
                        } else if (!showMenu && parentNode.getBoundingClientRect().y > 100 && element) {
                           element.scroll(0, diff - elementScroll.getBoundingClientRect().top);
                        } else if (!showMenu && parentNode.getBoundingClientRect().y < 20) {
                           element.scroll(0, diff - elementScroll.getBoundingClientRect().top - 322);
                        }
                     }
                     e.stopPropagation();
                  } }
                  role='presentation'
                  id={ `section${ sectionId }` }
                  className={ cx(
                     'selectBtn-wrapper',
                     {
                        'selectBtn_active': showMenu,
                     })
                  }
               >
                  <BaseButton
                     theme={ btnType.darkGreen }
                     size={ btnSize.large }
                     text='Add Lesson'
                     onClick={ () => { setShowMenu(!showMenu); } }
                     id={ `addLesson${ sectionId }` }
                  />
                  { showMenu ? (
                     <LessonMenu
                        lessons={ defaultLessons }
                        addLesson={ (arg) => {
                           addLesson(arg);
                           setShowMenu(!showMenu);
                        } }
                     />
                  ) : null }
               </div>
            </div>
         </ItemWrapper>
      </>
   );
};

CourseSection.propTypes = {
   lessons: PropTypes.array,
   addLesson: PropTypes.func,
   selectLesson: PropTypes.func,
   deleteLesson: PropTypes.func,
   title: PropTypes.string,
   selectSection: PropTypes.func,
   onReorderLessons: PropTypes.func,
   active: PropTypes.bool,
   currentLesson: PropTypes.any,
   sectionId: PropTypes.any,
   lastSectionId: PropTypes.number,
   activeName: PropTypes.string,
};

export default CourseSection;
