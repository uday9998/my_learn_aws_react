import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import VideoPlayer from 'components/modules/videoPlayer';
import { onDownload } from 'utils/mediaLibrary';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import classNames from 'classnames';

const VideoView = ({
   lesson, onAddNoCompletedVideoView, onAddCompletedVideoView,
}) => {
   const playlist = {
      file: lesson.videos && lesson.videos[0] && lesson.videos[0].src,
   };
   if (!playlist.file) {
      if (lesson && lesson.description) {
         return (
            <div
               // eslint-disable-next-line react/no-danger
               className='iframeLessonDesc'
               dangerouslySetInnerHTML={ { __html: lesson.description } }
               //  style={ { fontFamily: primaryTheme } }
            />
         );
      }
      return null;
   }
   const videoJsOptions = {
      autoplay: !!(lesson.css_attributes && lesson.css_attributes.autoplay),
      controls: true,
      loop: !!(lesson.css_attributes && lesson.css_attributes.loop),
      poster: (lesson.css_attributes && lesson.css_attributes.image_src) || null,
      sources: [{
         src: lesson.videos && lesson.videos[0] && lesson.videos[0].src,
         type: 'video/mp4',
      }],
      controlBar: {
         liveDisplay: false,
         pictureInPictureToggle: true,
         fullscreenToggle: true,
         //  fullscreenToggle: !!(lesson.css_attributes && lesson.css_attributes.allow_full_screen),
      },
      // bigPlayButton: !!(lesson.css_attributes && lesson.css_attributes.play)
      //  || !!(lesson.css_attributes && lesson.css_attributes.show_small_play_button),
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
               })
         }
         style={ videoStyle }
      >
         {lesson.css_attributes && !!lesson.css_attributes.downloadable
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


         <VideoPlayer
            videoJsOptions={ videoJsOptions }
            onFirstPlay={ onAddNoCompletedVideoView }
            onEnded={ onAddCompletedVideoView }
            block={ lesson }
         />
         {/* {
            lesson && lesson.description && (
               <div
                  // eslint-disable-next-line react/no-danger
                  className='iframeLessonDesc'
                  dangerouslySetInnerHTML={ { __html: lesson.description } }
                  style={ { fontFamily: primaryTheme } }
               />
            )
         } */}
      </div>
   );
};
VideoView.propTypes = {
   lesson: PropTypes.object,
   onAddNoCompletedVideoView: PropTypes.func,
   onAddCompletedVideoView: PropTypes.func,
};

VideoView.defaultProps = {
   lesson: {},
   onAddNoCompletedVideoView: () => {},
   onAddCompletedVideoView: () => {},
};

export default VideoView;
