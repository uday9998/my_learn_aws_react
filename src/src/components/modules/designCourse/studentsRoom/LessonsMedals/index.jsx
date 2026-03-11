import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LessonMedal from 'components/elements/studentsRoom/LessonMedal';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const LessonsMedals = ({ badgeColorless, lessonBadge }) => {
   return (
      <div className='lessonsMedals'>
         <div className='finishedLesson'>
            {lessonBadge && (
               <><LessonMedal
                  level={ lessonBadge.badge_src }
                  finished
               />
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.large }
                     inner='Congrats completing lesson'
                  />
               </>
            )}

         </div>
         <div className='unfinishedLessons'>
            {badgeColorless.map((badgeImg, j) => {
               const i = j;
               return (badgeImg
                  && <LessonMedal level={ badgeImg } key={ i } />
               );
            })
            }
         </div>
      </div>
   );
};

LessonsMedals.propTypes = {
   badgeColorless: PropTypes.array,
   lessonBadge: PropTypes.object,
};

LessonsMedals.defaultProps = {
   badgeColorless: [],
   lessonBadge: {},
};

export default LessonsMedals;
