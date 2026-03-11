import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LessonMenuItem from 'components/elements/designCourse/courseMaterial/LessonMenuItem';

const LessonMenu = ({ lessons, addLesson }) => {
   const lessonsArray = lessons.map((lesson, i) => {
      return (
         <LessonMenuItem
            icon={ lesson.icon }
            text={ lesson.name }
            onClick={ () => addLesson(lesson.value) }
            key={ i.toString() }
         />
      );
   });

   return (
      <div className='lesson-menu'>
         {lessonsArray}
      </div>
   );
};

export default LessonMenu;

LessonMenu.propTypes = {
   lessons: PropTypes.array,
   addLesson: PropTypes.func,
};
