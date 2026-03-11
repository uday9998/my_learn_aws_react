import React from 'react';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from 'components/elements/Icon';
import IconNew from 'components/elements/iconsSize';
import { style } from 'd3-selection';

const PlaylistItem = ({
   title,
   active,
   viewed, changeLesson,
   lessonFormat, itemPosition,
   textColor,
   primaryTheme,
   isDisabled,
   completedStatus,
   prewLessonStatus,
   darkMode,
   isDripLesson,
   isDripTurnedOn,
   isFreeLesson,
   joinedStatus,
   sections,
}) => {
   const iconsInfo = {
      zoom: {
         name: 'Zoom',
         color: '#8A94A2',
      },
      text: {
         name: 'TextStudent',
         color: '#8A94A2',
      },
      video: {
         name: 'VideoStudent',
         color: '#8A94A2',
      },
      'video-embed': {
         name: 'VideoStudent',
         color: '#8A94A2',
      },
      ppt: {
         name: 'PowerPointStudent',
         color: '#8A94A2',
      },
      audio: {
         name: 'AudioStudent',
         color: '#8A94A2',
      },
      quiz: {
         name: 'QuizStudent',
         color: '#8A94A2',
      },
      image: {
         name: 'ImageStudent',
         color: '#8A94A2',
      },
      multimedia: {
         name: 'MultimediaStudent',
         color: '#8A94A2',
      },
      pdf: {
         name: 'PdfStudent',
         color: '#8A94A2',
      },
   };

   const iconDefaultColor = darkMode ? '#fff' : '#c2cedb';
   const txtDefaultColor = 'inherit';
   const isItemDisabled = isDisabled && !!(completedStatus === 0) && !prewLessonStatus && itemPosition !== 'first';
   let currentLessonIcon = {};
   if (iconsInfo[lessonFormat]) {
      currentLessonIcon = iconsInfo[lessonFormat];
   }
   if (viewed || active) {
      currentLessonIcon = {
         ...currentLessonIcon,
         color: textColor,
      };
   }
   
   const color = active || viewed ? 'rgba(234, 232, 242, 1)' : txtDefaultColor;
   const iconColor = active || viewed ? textColor : iconDefaultColor;

   const getBackgroundColor = () => {
      if (active || viewed) {
         return '#d0d2d2';
      }
      return 'var(--mainBgColorTransparent)';
   };

   return (
      <>
         <div
            className={
               classNames(
                  'playlist__item',
                  {
                     'playlist__item_dark': darkMode,
                  }
               )
            }
            role='presentation'
            style={{ backgroundColor: getBackgroundColor() }}
            onClick={ (itemPosition === 'first' || prewLessonStatus || !(completedStatus === 0) || !isDisabled || joinedStatus === 3) && changeLesson }
         >
            {
               active && (
                  <div className='bg-list' />
               )
            }
            <div className='playlist__label'>
               <Text
                 style={
                  ((isDripLesson && isDripTurnedOn && joinedStatus !== 3 && isFreeLesson !== 1) || 
                  (!!sections.is_dripSection && joinedStatus !== 3))
                    ? { fontFamily: primaryTheme, fontStyle: 'italic', opacity: '0.9' }
                    : active 
                      ? { fontFamily: primaryTheme, color: '#fff' }
                      : { fontFamily: primaryTheme }
                }
                  type={ TextType.regularDefault }
                  className='title-wrap'
                  size={ TextSize.small }
                  inner={ `${ title }` }
                  color={ color }
                  line21
               />
               <div className='lesson_icons'>
                  {
                     isFreeLesson === 1
                   && (
                      <div className='eyeIcon' title='Free lesson'>
                         <Icon
                            name='EyeSlashShow'
                            color='#ddd'
                         />
                      </div>
                   )
                  }
                  {viewed
                  && <div className='check__purple'><IconNew name='CheckM' color='#fff' /></div>
                  }
                  {
                     isItemDisabled && isFreeLesson !== 1 && joinedStatus !== 3 && (
                        <div className='eyeIcon'>
                           <Icon
                              name='Lock'
                              color={ iconDefaultColor }
                           />
                        </div>
                     )
                  }
               </div>
            </div>
         </div>
      </>
   );
};

PlaylistItem.propTypes = {
   title: PropTypes.string,
   active: PropTypes.bool,
   viewed: PropTypes.bool,
   changeLesson: PropTypes.func,
   lessonFormat: PropTypes.string,
   textColor: PropTypes.string,
   itemPosition: PropTypes.string,
   primaryTheme: PropTypes.string,
   isFreeLesson: PropTypes.any,
   darkMode: PropTypes.string,
   isDisabled: PropTypes.bool,
   completedStatus: PropTypes.bool,
   prewLessonStatus: PropTypes.bool,
   isDripLesson: PropTypes.number,
   isDripTurnedOn: PropTypes.bool,
   joinedStatus: PropTypes.number,
   sections: PropTypes.object,
};

PlaylistItem.defaultProps = {
   title: 'Title',
   lessonFormat: 'video',
   textColor: '#7cb740',
   active: false,
   viewed: false,
   changeLesson: () => {},
   isDripLesson: 0,
   isDripTurnedOn: false,
};

export default PlaylistItem;