import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import { CommentsBarItem } from '../CommentsBar';
import './index.scss';

const CommenstLessonBar = ({ lessons, onSelectLesson, selectedLesson }) => {
   return (
      <div className='comments__lessons__bar'>
         <div className='comments__lessons__bar__top'>
            <Text
               inner='Lessons'
               miniText={ lessons.length }
               size={ sizes.xlarge }
               type={ types.regular160 }
            />
         </div>
         <div className='comments__lessons__bar__bottom'>
            {lessons.map((lesson) => {
               return (
                  <CommentsBarItem
                     key={ uniqueId() }
                     title={ lesson.name }
                     isActive={ selectedLesson && selectedLesson.id === lesson.id }
                     onSelect={ () => onSelectLesson(lesson) }
                     commentsCount={ lesson.comments_count }
                  />
               );
            })}
         </div>
      </div>
   );
};

CommenstLessonBar.propTypes = {
   lessons: PropTypes.array,
   onSelectLesson: PropTypes.func,
   selectedLesson: PropTypes.object,
};

export default CommenstLessonBar;
