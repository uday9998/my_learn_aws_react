import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   addBookmark as addBookmarkAction,
} from 'api/AuthApi';
import VideoAuthor from 'views/pages/VideoProgamsRoom/VideoAuthor';
import VideoSidebar from '../StudentsRoomSidebar';
import VideoView from '../VideoView';
import RelatedVideos from '../RelatedVideos';

const VideoLesson = ({
   lesson, authUser, commentsCount, commentsData,
   active, activeLesson, courseComplatePercent,
   author,
   getLessonInProgress,
   textColor,
   course,
   sections,
   isUnreadComments,
   LessonAuthor,
   onJoin,
   changeLesson,
   isFreeCourse,
   playlistData,
}) => {
   const [addBookmarkFunc, { loading: loadingBookmark }] = useSubmitForm(addBookmarkAction, {
      successMessage: 'Video has been added to bookmarks.',
   });

   const [removeBookmarkFunc, { loading: loadingBookmarkRemove }] = useSubmitForm(addBookmarkAction, {
      successMessage: 'Video has been deleted from bookmarks.',
   });

   const [isBookmarked, setIsBookmarked] = useState(lesson && lesson.is_bookmarked_count);
   const [bookmarks, setBookmarks] = useState([]);

   const addBookmark = (id, lessonn) => {
      setIsBookmarked(!isBookmarked);
      if (!isBookmarked) {
         addBookmarkFunc({ courseId: course.id, id }, () => {
            setBookmarks([
               ...bookmarks, lessonn,
            ]);
         });
      } else {
         removeBookmarkFunc({ courseId: course.id, id }, () => {
            const bookmarksNew = bookmarks.filter(bookmarkSingle => bookmarkSingle.id !== id);
            setBookmarks(bookmarksNew);
         });
      }
   };

   const removeBookmark = (id) => {
      removeBookmarkFunc({ courseId: course.id, id }, () => {
         const bookmarksNew = bookmarks.filter(bookmarkSingle => bookmarkSingle.id !== id);
         setBookmarks(bookmarksNew);
         if (lesson.id === id) {
            setIsBookmarked(false);
         }
      });
   };

   return (
      <>
         <VideoView
            commentsCount={ commentsCount }
            isFreeCourse={ isFreeCourse }
            course={ course }
            activeLesson={ activeLesson }
            courseComplatePercent={ courseComplatePercent }
            active={ active }
            sections={ sections }
            lesson={ lesson }
            author={ author }
            onJoin={ onJoin }
            isBookmarked={ isBookmarked }
            addBookmark={ addBookmark }
            getLessonInProgress={ getLessonInProgress }
            textColor={ textColor }
            commentsData={ {
               courseId: course.id,
               courseName: course.url,
               sectionId: lesson.section_id,
               lessonId: lesson.id,
            } }
            authUser={ authUser }
            playlistData={ playlistData }
         />
         {course && ((course.lessons && course.lessons.length < 2) || (course.is_playlist !== 1))
         && (
            <VideoAuthor LessonAuthor={ LessonAuthor } />
         )}
         <div className='grey_line' />
         <RelatedVideos user={ authUser } course={ course } />

         {lesson.status !== 3 && !!authUser && (
            <VideoSidebar
               authUser={ authUser }
               lesson={ lesson }
               course={ course }
               sections={ sections }
               activeLesson={ activeLesson }
               courseComplatePercent={ courseComplatePercent }
               textColor={ textColor }
               author={ author }
               getLessonInProgress={ getLessonInProgress }
               bookmarks={ bookmarks }
               setBookmarks={ setBookmarks }
               removeBookmark={ removeBookmark }
               loadingBookmark={ loadingBookmark || loadingBookmarkRemove }
               commentsData={ commentsData }
               commentsCount={ commentsCount }
               active={ active }
               isUnreadComments={ isUnreadComments }
               addBookmark={ addBookmark }
               changeLesson={ changeLesson }
            />
         )}
      </>
   );
};


VideoLesson.propTypes = {
   lesson: PropTypes.object,
   author: PropTypes.object,
   active: PropTypes.number,
   course: PropTypes.object,
   activeLesson: PropTypes.number,
   courseComplatePercent: PropTypes.number,
   getLessonInProgress: PropTypes.bool,
   textColor: PropTypes.string,
   authUser: PropTypes.object,
   commentsCount: PropTypes.any,
   commentsData: PropTypes.object,
   sections: PropTypes.array,
   isUnreadComments: PropTypes.bool,
   LessonAuthor: PropTypes.object,
   playlistData: PropTypes.object,
   onJoin: PropTypes.func,
   changeLesson: PropTypes.func,
   isFreeCourse: PropTypes.func,
};

VideoLesson.defaultProps = {
   // darkMode: false,

};

export default VideoLesson;
