import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LessonMedal from 'components/elements/studentsRoom/LessonMedal';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import NotFoundImg from 'assets/images/mobile/main-hub/artwork.png';
import { useTranslate } from 'react-polyglot';

const LessonsMedals = ({
   badgeColorless, lessonBadge, primaryTheme, darkMode,
}) => {
   const t = useTranslate();
   if (!lessonBadge) {
      return (
         <div className='NotFoundLessonItem'>
            <Text
               inner={ t('no_badge_found') }
               color='#8a94a2'
               type={ TextType.bold }
               size={ TextSize.large }
               style={ { fontFamily: primaryTheme } }
            />
            <img src={ NotFoundImg } alt='not found' className='notFoundImg' />
         </div>
      );
   }

   return (
      <div className='lessonsMedals'>
         <div className='finishedLesson'>
            {lessonBadge && (
               <>
                  <div className='lesson_medal'>
                     <LessonMedal
                        level={ lessonBadge.badge_src }
                        finished
                     />
                  </div>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.large }
                     inner={ t('congrats_completing_lesson') }
                     style={ { fontFamily: primaryTheme } }
                     color={ darkMode ? '#fff' : '' }
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
   primaryTheme: PropTypes.string,
   darkMode: PropTypes.bool,
};

LessonsMedals.defaultProps = {
   badgeColorless: [],
   lessonBadge: {},
};

export default LessonsMedals;
