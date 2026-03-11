import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import VideoPlayer from 'components/modules/videoPlayer';

const VideoItem = ({
   src, type, isLoading, autoplay, posterImgSrc, videoElementAutoPlay, isDashboardVideo, block, videoType,
}) => {
   const [update, setUpdate] = useState(false);
   const [posterImgSrcNew, setPosterImgSrcNew] = useState(posterImgSrc);
   const isFirstRender = useRef(true);
   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false;
      } else {
         setUpdate(true);
         setTimeout(() => setUpdate(false), 100);
      }
      setPosterImgSrcNew(posterImgSrc);
   }, [src, posterImgSrc]);
   if (isLoading || update) {
      return null;
   }

   const videoJsOptions = {
      // muted: videoElementAutoPlay,
      autoplay: videoElementAutoPlay,
      isDashboardVideo,
      controls: true,
      poster: posterImgSrcNew || '',
      sources: [{
         src,
         type: videoType || 'video/mp4',
      }],
      controlBar: { liveDisplay: false, pictureInPictureToggle: true },
   };
   return (
      <div className={ classnames('VideoItem', {
         'embed-container': type === 'youtube' || type === 'vimeo' || type === 'wistia',
      }) }
      >

         {
            {
               video: (
                  <VideoPlayer videoJsOptions={ videoJsOptions } block={ block } />

               ),
               youtube: <iframe
                  width='100%'
                  height='460'
                  src={ `https://www.youtube.com/embed/${ src }` }
                  frameBorder='0'
                  allowFullScreen
                  title={ src }
                  allow={ autoplay ? 'autoplay' : '' }
               />,
               vimeo: <iframe
                  src={ `https://player.vimeo.com/video/${ src }` }
                  allow={ autoplay ? 'autoplay' : '' }
                  title={ src }
                  allowFullScreen
               />,
               wistia: <iframe
                  src={ `//fast.wistia.net/embed/iframe/${ src }` }
                  width='500'
                  height='400'
                  title={ src }
                  frameBorder='0'
                  scrolling='no'
                  className='wistia_embed'
                  name='wistia_embed'
                  allow={ autoplay ? 'autoplay' : '' }
                  allowFullScreen
               />,

            }[type]
         }
      </div>
   );
};

VideoItem.defaultProps = {
   videoElementAutoPlay: false,
};

VideoItem.propTypes = {
   src: PropTypes.string,
   type: PropTypes.string,
   isLoading: PropTypes.bool,
   autoplay: PropTypes.any,
   posterImgSrc: PropTypes.string,
   videoElementAutoPlay: PropTypes.bool,
   isDashboardVideo: PropTypes.bool,
   block: PropTypes.object,
   videoType: PropTypes.string,
};

export default VideoItem;
