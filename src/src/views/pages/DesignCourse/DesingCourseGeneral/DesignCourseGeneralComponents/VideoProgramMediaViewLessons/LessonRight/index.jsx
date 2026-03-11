import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import IconNew from 'components/elements/iconsSize';
import ChooseStatusWithDrip from 'components/elements/designCourse/ChooseStatusWithDrip';
import IToolTIpText from 'components/elements/IToolTIpText';
import IconButton from 'components/elements/buttons/IconButton';


const LessonRight = ({
   currentSection, onSelectLessonSettings, deleteLesson,
   handleSaveLesson, course, lesson, category,
}) => {
   return (
      <div className='lessonRight'>
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
         <div className='lessonRight__comments'>
            <IconNew name='CommentsProgramS' />
            <Text
               inner={ `${ (course.type === '1' ? lesson.lesson_comments_count : lesson.comments_count) || 0 }` }
               type={ types.medium150 }
               size={ sizes.xsmall }
            />
         </div>
         <IconButton
            name='eyeM'
            onClick={
               (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(`/programs/${ course.url }/${ category.link }?video=${ lesson.id }&preview=success`, '_blank');
               }
            }
         />
         {!!lesson.is_free_lesson && <IToolTIpText title='F' tooltip='Free lesson' />}
         {!!lesson.prerequisite && <IToolTIpText title='P' tooltip='Prerequisite' />}
         {!!lesson.is_inactive_prerequisite && !lesson.prerequisite
                        && <IToolTIpText title='R' tooltip='Removed from Prerequisite' />}
         {/* <ChooseStatusWithDrip
            isPublished={ lesson.is_published }
            onChangeStatus={ (data) => handleSaveLesson(true, data, lesson, currentSection.id) }
            // openModal={ () => setOpenDateModal(true) }
            publishDate={ lesson.drip_date }
            publishTime=''
            onlyIcon={ true }
            lesson={ lesson }
         /> */}
      </div>

   );
};

LessonRight.propTypes = {
   currentSection: PropTypes.object,
   onSelectLessonSettings: PropTypes.func,
   deleteLesson: PropTypes.func,
   handleSaveLesson: PropTypes.func,
   course: PropTypes.func,
   lesson: PropTypes.object,
   category: PropTypes.object,
};

export default LessonRight;
