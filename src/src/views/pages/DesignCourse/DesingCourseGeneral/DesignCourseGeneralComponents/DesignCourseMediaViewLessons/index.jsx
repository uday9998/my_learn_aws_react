import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import { SliceAndConnectText } from 'utils/getSplitedText';
import LessonSortableList from 'components/modules/reorderLessons/LessonSortableList';
import Icon from 'components/elements/Icon';
import Router from 'routes/router';
import ChooseStatusWithDrip from 'components/elements/designCourse/ChooseStatusWithDrip';
import IToolTIpText from 'components/elements/IToolTIpText';
import IconButton from 'components/elements/buttons/IconButton';

const DesignCourseMediaViewLessons = ({
   currentSection, addLesson, onReorder, goTo, onSelectLessonSettings, deleteLesson,
   handleSaveLesson, course,
}) => {
   return (
      <div className='design__course__media__lessons'>
         <div className='design__course__media__lessons__top'>
            <Text
               inner='Lessons'
               size={ sizes.xxlarge }
               type={ types.regularDefault }
               miniText={ `${ currentSection.lessons.length }` }
            />
            {!!currentSection.lessons.length && (
               <div role='presentation' onClick={ () => addLesson(currentSection.id) }>
                  <TextWithIcon
                     iconName='plusSectionProgramM'
                     inner='Add Lesson'
                     type={ types.regularDefaultSmall }
                     size={ sizes.small }
                     style={ { color: '#24554E' } }
                  />
               </div>
            )}
         </div>
         <LessonSortableList lessons={ currentSection.lessons } onChange={ onReorder }>
            {(provided, snapshot, lesson, getItemStyle) => {
               return (
                  <div
                     ref={ provided.innerRef }
                     { ...provided.draggableProps }
                     className='design__course__media__lesson'
                     style={ {
                        ...getItemStyle(
                           snapshot.isDragging,
                           provided.draggableProps.style
                        ),
                     } }
                     onClick={
                        () => goTo(Router.route('ADMIN_LESSON_CREATE').getCompiledPath(
                           {
                              id: currentSection.course_id, sectionId: currentSection.id, lessons: 'lessons', lessonId: lesson.id, 
                           })) }
                     role='presentation'
                  >
                     <div className='left'>
                        <div className='lesson__dragHandle'>
                           <span
                              className='dragHandleIcon'
                              { ...provided.dragHandleProps }
                           >
                              <Icon name='Dragdrop' />
                           </span>
                        </div>
                        <IconNew name='FileSectionProgramM' />
                        <div
                           className='lesson__name'
                           onClick={
                              () => goTo(Router.route('ADMIN_LESSON_CREATE').getCompiledPath(
                                 {
                                    id: currentSection.course_id, sectionId: currentSection.id, lessons: 'lessons', lessonId: lesson.id, 
                                 })) }
                           role='presentation'
                        >
                           <Text
                              inner={ SliceAndConnectText(lesson.name, 30) }
                              type={ types.regularDefault }
                              size={ sizes.small }
                           />
                        </div>
                     </div>
                     <div className='right'>
                        <div
                           role='presentation'
                           onClick={ (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              deleteLesson(currentSection.id, lesson.id);
                           } }
                           className='lesson__settings__icon'
                        >
                           <IconNew name='DeleteSectionProgramM' />
                        </div>
                        <div
                           role='presentation'
                           onClick={ (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onSelectLessonSettings(lesson);
                           } }
                           className='lesson__settings__icon'
                        >
                           <IconNew name='SectionSettingsM' />
                        </div>
                        <div className='right__comments'>
                           <IconNew name='CommentsProgramS' />
                           <Text
                              inner={ `${ lesson.comments_count || 0 }` }
                              type={ types.medium150 }
                              size={ sizes.xsmall }
                           />
                        </div>
                        <IconButton
                           name='eyeM'
                           onClick={ () => window.open(`/programs/${ course.url }?lesson=${ lesson.id }&preview=success`, '_blank') }
                        />
                        {!!lesson.is_free_lesson && <IToolTIpText title='F' tooltip='Free lesson' />}
                        {!!lesson.prerequisite && <IToolTIpText title='P' tooltip='Prerequisite' />}
                        {!!lesson.is_inactive_prerequisite && !lesson.prerequisite
                        && <IToolTIpText title='R' tooltip='Removed from Prerequisite' />}
                        <ChooseStatusWithDrip
                           isPublished={ lesson.is_published }
                           onChangeStatus={ (data) => handleSaveLesson(true, data, lesson, currentSection.id) }
                           // openModal={ () => setOpenDateModal(true) }
                           publishDate={ lesson.drip_date }
                           lesson={ lesson }
                           publishTime=''
                           onlyIcon={ true }
                        />
                     </div>
                  </div>
               );
            }}
         </LessonSortableList>
         {!currentSection.lessons.length && (
            <div className='design__course__media__lessons__empty'>
               <Button
                  text='Create Lesson'
                  onClick={ () => addLesson(currentSection.id) }
               />
            </div>

         )}

      </div>
   );
};

DesignCourseMediaViewLessons.propTypes = {
   currentSection: PropTypes.object,
   addLesson: PropTypes.func,
   onReorder: PropTypes.func,
   onSelectLessonSettings: PropTypes.func,
   goTo: PropTypes.func,
   deleteLesson: PropTypes.func,
   handleSaveLesson: PropTypes.func,
   course: PropTypes.object,
};

export default DesignCourseMediaViewLessons;
