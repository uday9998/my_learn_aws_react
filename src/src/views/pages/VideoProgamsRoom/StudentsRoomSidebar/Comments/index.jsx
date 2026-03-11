/* eslint-disable array-callback-return */
import React from 'react';
import CourseCommentsContainer from 'containers/pages/member/studentsRoom/courseComments';
import PropTypes from 'prop-types';
import './index.scss';

const Comments = ({
   commentsData, lesson, textColor, primaryTheme, darkMode, defaultColor,
}) => {
   return (
      <div className='lessonComments'>
         <CourseCommentsContainer
            { ...commentsData }
            showCommentsView={ !!lesson.comment_status }
            textColor={ textColor }
            primaryTheme={ primaryTheme }
            darkMode={ darkMode }
            defaultColor={ defaultColor }
            commentStatus={ lesson.comment_status }
            isVideoProgram={ true }
         />
      </div>
   );
};

Comments.propTypes = {
   commentsData: PropTypes.object,
   lesson: PropTypes.object,
   textColor: PropTypes.string,
   primaryTheme: PropTypes.string,
   darkMode: PropTypes.bool,
   defaultColor: PropTypes.string,
};

Comments.defaultProps = {

};
export default Comments;
