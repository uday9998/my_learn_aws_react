/* eslint-disable array-callback-return */
import React from 'react';
import CourseCommentsContainer from 'containers/pages/member/studentsRoom/courseComments';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import commentImg from 'assets/images/schoolRoom/comment.png';
import PropTypes from 'prop-types';
import './index.scss';

const Comments = ({
   commentsData, lesson, textColor, primaryTheme, darkMode, defaultColor, commentsCount,
}) => {
   return (
      <div className='lessonComments'>
         <div className='lessonCommentsHeader'>
            <div>
               <Text
                  inner='Comments'
                  type={ TextType.medium }
                  size={ TextSize.xxlarge }
               />
            </div>
         </div>
         {!commentsCount && (
            <div className='lessonComments__empty'>
               <div>
                  <img src={ commentImg } alt='note' />
               </div>
               <div>
                  <Text
                     inner='Currently, there are no comments.'
                     type={ TextType.regularDefault }
                     size={ TextSize.small }
                     style={ { color: 'rgba(114, 121, 120, 1)' } }
                  />
               </div>
            </div>
         )}
         <CourseCommentsContainer
            { ...commentsData }
            showCommentsView={ !!lesson.comment_status }
            textColor={ textColor }
            primaryTheme={ primaryTheme }
            darkMode={ darkMode }
            defaultColor={ defaultColor }
            commentStatus={ lesson.comment_status }
         />
      </div>
   );
};

Comments.propTypes = {
   commentsData: PropTypes.object,
   commentsCount: PropTypes.any,
   lesson: PropTypes.object,
   textColor: PropTypes.string,
   primaryTheme: PropTypes.string,
   darkMode: PropTypes.bool,
   defaultColor: PropTypes.string,
};

Comments.defaultProps = {

};
export default Comments;
