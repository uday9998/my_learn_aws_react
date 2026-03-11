import PropTypes from 'prop-types';
import VideoPlayer from 'components/modules/videoPlayer';
import { onDownload } from 'utils/mediaLibrary';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import classNames from 'classnames';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { deleteContinueWatchingVideo, sendVideoData } from 'api';

import './index.scss';

const VideoView = ({
   lesson, onAddNoCompletedVideoView, onAddCompletedVideoView, isVideoProgram, course, playlistData, authUser,
}) => {
   const [deleteVideo] = useSubmitForm(deleteContinueWatchingVideo);
   const [sendVideoWatchingData] = useSubmitForm(sendVideoData);
   
   const defaultPosterImage = 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png';
   
   const playlist = {
      file: lesson.videos && lesson.videos[0] && lesson.videos[0].src,
   };
   
   if (!playlist.file) {
      if (lesson && lesson.description) {
         return (
            <div
               className='iframeLessonDesc'
               dangerouslySetInnerHTML={ { __html: lesson.description } }
            />
         );
      }
      return (
         <div className='LessonVideo' style={{ position: 'relative', background: '#f0f0f0', minHeight: '300px' }}>
            <img 
               src={defaultPosterImage} 
               alt="Lesson placeholder"
               style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block'
               }}
            />
         </div>
      );
   }
   
   const handleDeleteVideo = (id) => {
      deleteVideo({ id });
   };

   const handleSendVideoData = (duration, videoId) => {
      if (!authUser || !course?.is_published) {
         return;
      }
      
      if (Math.ceil(duration) >= lesson.videos[0].duration && Number(course.is_published) === 1) {
         handleDeleteVideo(videoId);
      } else if (Number(course.is_published) === 1) {
         sendVideoWatchingData({
            duration,
            courseUrl: course.course_url,
            videoId: lesson.videos[0].id,
            category_id: getCategoryId(),
            lessonId: playlistData?.categories ? playlistData.id : lesson.pivot.lesson_id,
         });
      }
   };

   const getCategoryId = () => {
      if (playlistData?.categories) {
         const defaultCategory = playlistData.categories.find(category => category.is_default === 1);
         if (defaultCategory?.pivot?.category_id) {
            return defaultCategory.pivot.category_id;
         }
         if (playlistData.categories.length > 0 && playlistData.categories[0]?.pivot?.category_id) {
            return playlistData.categories[0].pivot.category_id;
         }
      }
      return course.catId;
   };

   const getPosterImage = () => {
      if (lesson.css_attributes && lesson.css_attributes.image_src) {
         return lesson.css_attributes.image_src;
      }
      
      if (lesson.videos && lesson.videos[0] && lesson.videos[0].poster) {
         return lesson.videos[0].poster;
      }
      
      return defaultPosterImage;
   };

   const shouldLockVideo = () => {
      if (authUser) {
         return false;
      }
      
      return lesson.is_free_lesson !== 1;
   };

   const videoJsOptions = {
      autoplay: false,
      controls: true,
      loop: !!(lesson.css_attributes && lesson.css_attributes.loop),
      poster: getPosterImage(),
      sources: [{
         src: lesson.videos && lesson.videos[0] && lesson.videos[0].src,
         type: 'video/mp4',
      }],
      controlBar: {
         liveDisplay: false,
         pictureInPictureToggle: false,
         fullscreenToggle: true,
      },
   };

   let videoStyle = {};

   if (lesson && lesson.css_attributes && lesson.css_attributes.width) {
      if (lesson.css_attributes && lesson.css_attributes.width === 1) {
         videoStyle = { maxWidth: '420px' };
      } else if (lesson.css_attributes && lesson.css_attributes.width === 0) {
         videoStyle = { maxWidth: '100%' };
      } else if (lesson.css_attributes && lesson.css_attributes.width === 2) {
         videoStyle = { maxWidth: '640px' };
      }
   }

   return (
      <div
         className={
            classNames(
               'LessonVideo',
               {
                  'LessonVideoShowPlaybar': lesson.css_attributes && !lesson.css_attributes.show_playbar,
                  'LessonVideoSmallButton': lesson.css_attributes && !!lesson.css_attributes.show_small_play_button,
                  'LessonVideoLocked': shouldLockVideo(),
               })
         }
         style={ { ...videoStyle, position: 'relative' } }
      >
         {!isVideoProgram && lesson.css_attributes && !!lesson.css_attributes.downloadable
            && (
               <div className='LessonVideo__download'>
                  <Button
                     text='Download'
                     theme={ themes.secondary }
                     size='medium'
                     iconName='Bulk'
                     isIconRight={ true }
                     onClick={ () => onDownload(lesson.videos && lesson.videos[0] && lesson.videos[0].src) }
                  />
               </div>
            )
         }

         {/* {shouldLockVideo() && (
            <div 
               style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  zIndex: 1000,
                  fontSize: '18px'
               }}
            >
               🔒 This video requires authentication
               <br />
               <small>Please log in to watch this content</small>
            </div>
         )} */}

         <VideoPlayer
            videoJsOptions={ videoJsOptions }
            onFirstPlay={ authUser ? onAddNoCompletedVideoView : () => {} }
            onEnded={ authUser ? onAddCompletedVideoView : () => {} }
            handleSendVideoData={ authUser ? handleSendVideoData : () => {} }
            ids={ authUser ? {
               categoryId: getCategoryId(),
               courseId: course?.id,
               lessonId: playlistData?.categories ? playlistData.id : lesson.pivot?.lesson_id,
               videoId: lesson?.videos?.[0]?.id,
            } : {} }
         />
      </div>
   );
};

VideoView.propTypes = {
   lesson: PropTypes.object,
   course: PropTypes.object,
   authUser: PropTypes.object,
   playlistData: PropTypes.object,
   onAddNoCompletedVideoView: PropTypes.func,
   onAddCompletedVideoView: PropTypes.func,
   isVideoProgram: PropTypes.bool,
};

VideoView.defaultProps = {
   lesson: {},
};

export default VideoView;