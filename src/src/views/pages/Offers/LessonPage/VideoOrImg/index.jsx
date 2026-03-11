import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import VideoPlayer from 'components/modules/videoPlayer';

const VideoOrImg = ({
   image, video, isVideo, isSmall, 
}) => {
   const videoJsOptions = {
      autoplay: false,
      controls: true,
      poster: '',
      sources: [{
         src: video,
         type: 'video/mp4',
      }],
      controlBar: { liveDisplay: false, pictureInPictureToggle: true },
   };
   return (
      <div className={ isSmall ? 'bridgeImgVideoSmall' : 'bridgeImgVideo' }>
         {image && !isVideo && <img src={ image } alt='bridge' />}
         {video && !!isVideo && (
            <VideoPlayer
               videoJsOptions={ videoJsOptions }
            // onFirstPlay={ onAddNoCompletedVideoView }
            // onEnded={ onAddCompletedVideoView }
            />
         )}
      </div>

   );
};

VideoOrImg.propTypes = {
   image: PropTypes.string,
   video: PropTypes.string,
   isVideo: PropTypes.number,
   isSmall: PropTypes.bool,
};

export default VideoOrImg;
