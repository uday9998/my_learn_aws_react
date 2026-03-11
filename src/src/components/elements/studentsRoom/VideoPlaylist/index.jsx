import React, { useContext } from 'react';
import './index.scss';
import PlaylistItem from 'components/elements/studentsRoom/PlaylistItem';
import LessonCommonDataContext from 'containers/pages/member/studentsRoom/LessonCommonDataContext';
import PropTypes from 'prop-types';


const VideoPlaylist = ({
   lessons, changeLesson, activeLesson, textColor, primaryTheme, sectionIndex,
   darkMode, joinedStatus, sections, primaryButton, setOpenNavBar, isMobile,
}) => {
   const { prerequisiteLessonIndex } = useContext(LessonCommonDataContext);
   return (
      <div className='video-playlist'>
         {
            lessons.map((item, index) => {
               let itemPosition = 'last';
               let prewLessonStatus = false;
               if (index === 0 && sectionIndex === 0) {
                  itemPosition = 'first';
               }
               if (sectionIndex !== 0 && index !== 0 && index === lessons.length - 1) {
                  itemPosition = 'last';
               }
               if (index !== 0) {
                  prewLessonStatus = lessons[index - 1].completed_status;
               }

               return (
                  <PlaylistItem
                     textColor={ textColor }
                     primaryTheme={ primaryTheme }
                     itemPosition={ itemPosition }
                     isDripLesson={ item.is_driplesson }
                     item={ item }
                     isDripTurnedOn={ item.is_drip_turned_on }
                     key={ item.id }
                     title={ item.title }
                     duration={ item.duration }
                     active={ item.id === activeLesson }
                     viewed={ item.viewed }
                     isDisabled={ item.lesson_format !== 'zoom' && !item.is_inactive_prerequisite && typeof prerequisiteLessonIndex === 'number' && item.lessonIndex > prerequisiteLessonIndex }
                     prewLessonStatus={ prewLessonStatus }
                     completedStatus={ item.completed_status }
                     lessonFormat={
                        (item.lesson_format === 'vimeo' || item.lesson_format === 'wistia'
                        || item.lesson_format === 'youtube') ? 'video' : item.lesson_format }
                     changeLesson={ () => {
                        changeLesson(item.id, item.lesson_format,
                           item.is_driplesson, item, sections);
                        if (isMobile) { setOpenNavBar(false); }
                     } }
                     darkMode={ darkMode }
                     isFreeLesson={ item.isFreeLesson }
                     joinedStatus={ joinedStatus }
                     sections={ sections }
                     primaryButton={ primaryButton }
                  />
               );
            })
         }
      </div>
   );
};

VideoPlaylist.propTypes = {
   lessons: PropTypes.array,
   changeLesson: PropTypes.func,
   activeLesson: PropTypes.number,
   sectionIndex: PropTypes.number,
   textColor: PropTypes.string,
   primaryTheme: PropTypes.string,
   darkMode: PropTypes.bool,
   joinedStatus: PropTypes.number,
   sections: PropTypes.object,
   primaryButton: PropTypes.object,
   setOpenNavBar: PropTypes.func,
   isMobile: PropTypes.bool,
};

VideoPlaylist.defaultProps = {
   lessons: [],
   activeLesson: 4,
   changeLesson: () => {},
};

export default VideoPlaylist;
