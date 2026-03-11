import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import IconNew from 'components/elements/iconsSize';

const LessonBlock = ({
   lesson,
   course,
}) => {
   if (lesson.is_published === '0' || lesson.is_published === '2') {
      return null;
   }

   return (
      <div
         style={ {
            border: '1px solid #E7E9E9',
         } }
         className='offer__lesson__block'
      >
         <div className='offer__lesson__block__top'>
            <div className='offer__lesson__block__left'>
               <div className='offer__lesson__block__left__img'>
                  <IconNew name='CourseXL' />
               </div>
               <div className='offer__lesson__block__left__text'>
                  <div>
                     <Text
                        inner={ lesson.name }
                        type={ types.medium153 }
                        size={ sizes.large }
                        // style={ { color: 'var(--textColor)' } }
                     />
                  </div>
                  {
                     (
                        (lesson.author && lesson.author.name)
                        || (course.authors && course.authors[0] && course.authors[0].name)
                     ) && (
                        <div className='offer__lesson__block__left__instructor'>
                           <Text
                              inner='Instructor:'
                              type={ types.mediumLarge }
                              size={ sizes.small }
                              style={ { color: '#727978' } }
                           />
                           <Text
                              inner={ (lesson.author && lesson.author.name)
                              || (course.authors && course.authors[0] && course.authors[0].name) }
                              type={ types.mediumLarge }
                              size={ sizes.small }
                              // style={ { color: 'var(--textColor)' } }
                           />
                        </div>
                     )
                  }
               </div>
            </div>
         </div>
      </div>
   );
};

LessonBlock.propTypes = {
   lesson: PropTypes.object,
   // textColor: PropTypes.string,
   course: PropTypes.object,
};

export default LessonBlock;
