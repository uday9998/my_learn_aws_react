/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Text, { TextWithIcon, SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import VideoPlaylist from 'components/elements/studentsRoom/VideoPlaylist';
import classNames from 'classnames';
import IconNew from 'components/elements/iconsSize';
import { useTranslate } from 'react-polyglot';
import TextWithSeeMore from 'components/modules/TextWithSeeMore';

const DropdownCard = ({
   lessons, sections, style, down, changeLesson, activeLesson, textColor, primaryTheme, sectionIndex,
   darkMode, joinedStatus, primaryButton, setOpenNavBar, isMobile,
}) => {
   const t = useTranslate();
   const [toggledDown, setToggledDown] = useState(down);
   let completedLessons = 0;
   const isAllViewed = () => {
      const viewedPlaylist = lessons.filter(item => {
         return item.viewed;
      });
      completedLessons = viewedPlaylist.length;
      return viewedPlaylist.length === lessons.length;
   };

   return (
      <div
         className={
            classNames(
               'dropdown-card',
               {
                  [`type_viewed-${ isAllViewed() }`]: isAllViewed(),
                  darkMode,
               }
            ) }
         style={ {
            ...style,
         } }
      >
         <div
            className={
               classNames(
                  'dropdown-card__header header-drop-2',
                  {
                     [`background-white_${ !toggledDown }`]: !toggledDown,
                     'dropdown_card_header_dark': darkMode,
                  }
               ) }

         >
            <div className='dropdown-card_iconTitel'>
               <div className='dropdown-card__title'>
                  <div>
                     <Text
                        size={ textSize.small }
                        type={ textType.medium150 }
                        inner={ sections.title }
                        className='onlineCourseDropTitle'
                     />
                     {sections && sections.description && (
                        <div>
                           <TextWithSeeMore text={ sections.description } maxLength={ 100 } />
                        </div>
                     )}
                  </div>
                  <div>
                     <TextWithIcon
                        iconName='LessonS'
                        iconGap='7px'
                        iconColor='var(--textColor)'
                        size={ textSize.xsmall }
                        type={ textType.regular148 }
                        inner={ `${ completedLessons }/${ lessons.length } ${ lessons.length > 1 ? t('lessons') : t('lesson') } completed` }
                     />
                  </div>

               </div>
            </div>
            <div style={ { width: '24px' } } onClick={ () => setToggledDown(!toggledDown) } role='presentation'>
               <IconNew
                  name='ChevronupL'
                  style={ { transform: toggledDown && 'rotate(-180deg)' } }
                  color='var(--textColor)'
               />
            </div>
         </div>
         <div className='dropdown-card__content'>
            {toggledDown && (
               <VideoPlaylist
                  lessons={ lessons }
                  setOpenNavBar={ setOpenNavBar }
                  isMobile={ isMobile }
                  changeLesson={ changeLesson }
                  activeLesson={ activeLesson }
                  sections={ sections }
                  textColor={ textColor }
                  primaryTheme={ primaryTheme }
                  sectionIndex={ sectionIndex }
                  darkMode={ darkMode }
                  primaryButton={ primaryButton }
                  joinedStatus={ joinedStatus }
               />
            )}
         </div>
      </div>
   );
};

DropdownCard.propTypes = {
   lessons: PropTypes.array,
   sections: PropTypes.object,
   style: PropTypes.object,
   down: PropTypes.bool,
   darkMode: PropTypes.bool,
   changeLesson: PropTypes.func,
   activeLesson: PropTypes.number,
   sectionIndex: PropTypes.number,
   textColor: PropTypes.string,
   primaryTheme: PropTypes.string,
   joinedStatus: PropTypes.number,
   primaryButton: PropTypes.object,
   setOpenNavBar: PropTypes.func,
   isMobile: PropTypes.bool,
};

DropdownCard.defaultProps = {
   lessons: [],
   sections: {},
   textColor: '#7cb740',
   down: true,
   activeLesson: 4,
   changeLesson: () => {},
};

export default DropdownCard;
