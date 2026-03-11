import React from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import CourseSectionModule from 'components/modules/designCourse/courseMaterial/CourseSection';

const CourseSection = ({
   lessons, addLesson, selectedLessons, deleteLesson,
}) => {
   return (
      <div className='mob-courseSection'>
         <CourseSectionModule
            lessons={ lessons }
            addLesson={ addLesson }
            selectedLessons={ selectedLessons }
            deleteLesson={ deleteLesson }
         />
      </div>
   );
};

export default CourseSection;

CourseSection.propTypes = {
   lessons: PropTypes.array,
   addLesson: PropTypes.func,
   deleteLesson: PropTypes.func,
   selectedLessons: PropTypes.array,
};
