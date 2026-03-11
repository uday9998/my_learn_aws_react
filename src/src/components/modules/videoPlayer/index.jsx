/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import videojs from 'video.js';
import { getVideoDuration } from 'api';
import PropTypes from 'prop-types';
import 'videojs-hotkeys';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
import 'video.js/dist/video-js.css';
import { connect } from 'react-redux';
import { siteInfoSelector, authUserSelector } from 'state/modules/common/selectors';
import '@videojs/themes/dist/forest/index.css';
import './style.scss';

require('@silvermine/videojs-airplay')(videojs);

class VideoPlayer extends React.Component {
   static propTypes = {
      videoJsOptions: PropTypes.object,
      block: PropTypes.object,
      siteInfo: PropTypes.object,
      authUser: PropTypes.object,
      handleSendVideoData: PropTypes.func,
      ids: PropTypes.object,
      videoId: PropTypes.number,
   };

   componentDidMount() {
      const {
         videoJsOptions, block, siteInfo, authUser, ids,
      } = this.props;
      let sources = [...videoJsOptions.sources];
      const { REACT_APP_AWS_BUCKET_URL } = process.env;
      if (block && block.videos && block.videos[0]
         && block.videos[0].optimization_status
          && block.videos[0].optimization_status === 'completed' && block.videos[0].poster) {
         const poster = block.videos[0].poster;
         const folderName = poster.split('.')[0];
         const src = `${ REACT_APP_AWS_BUCKET_URL }/videos/${ folderName }/outputs/hls/${ folderName }.m3u8`;
         sources = [
            {
               src,
               type: 'application/x-mpegURL',
            },
         ];
      }
      let tracks = [];
      if (block && block.videos && block.videos[0]
         && block.videos[0].transcription_url
          && block.videos[0].transcription_url[1]) {
         tracks = [
            {
               src: block.videos[0].transcription_url[1],
               kind: 'subtitles',
               srclang: 'en',
               label: 'English',
               default: true,
            },
         ];
      }
      this.player = videojs(this.videoNode,
         {
            ...videoJsOptions,
            sources,
            addButtonToControlBar: true,
            tracks,
            plugins: {
               hotkeys: {
                  alwaysCaptureHotkeys: true,
                  seekStep: 5,
                  enableVolumeScroll: false,
               },
            },
         }, () => {
            if (videoJsOptions.isDashboardVideo) {
               this.player.play();
            }
         });

      this.player.hlsQualitySelector({
         displayCurrentQuality: true,
      });

      // eslint-disable-next-line react/prop-types
      const { onFirstPlay, onEnded } = this.props;
      if (onFirstPlay) {
         this.player.one('play', (e) => { onFirstPlay(e); });
      }

      let lastWatchedPositionValue = `lastWatchedPosition_${ siteInfo.site_uuid }`;
      if (block && block.id && authUser && authUser.id && block.videos && block.videos[0] && block.videos[0].id) {
         lastWatchedPositionValue = `lastWatchedPosition_${ siteInfo.site_uuid }_${ authUser.id }_${ block.id }_${ block.videos[0].id }`;
      }

      const lastWatchedPosition = localStorage.getItem(lastWatchedPositionValue);
      if (ids?.videoId && ids?.lessonId) {
         const getDurationData = async () => {
            try {
               const { data } = await getVideoDuration(ids);
               VideoPlayer.videoId = data.id;
               if (data.duration) {
                  this.player.currentTime(data.duration);
               } else {
                  this.player.currentTime(lastWatchedPosition);
               }
            } catch (err) {
            }
         };

         getDurationData();
      }
      this.player.on('pause', this.saveProgress);

      this.player.on('ended', (e) => {
         onEnded(e); this.saveProgress();
      });
      window.addEventListener('beforeunload', this.handleBeforeUnload);
   }

   componentWillUnmount() {
      window.removeEventListener('beforeunload', this.handleBeforeUnload);
      if (this.player) {
         this.saveProgress();
         this.player.dispose();
      }
   }

   saveProgress = () => {
      const {
         siteInfo, authUser, block, handleSendVideoData,
      } = this.props;
      let lastWatchedPositionKey = `lastWatchedPosition_${ siteInfo.site_uuid }`;
      if (block && block.id && authUser && authUser.id && block.videos && block.videos[0] && block.videos[0].id) {
         lastWatchedPositionKey = `lastWatchedPosition_${ siteInfo.site_uuid }_${ authUser.id }_${ block.id }_${ block.videos[0].id }`;
      }
      if (handleSendVideoData) {
         handleSendVideoData(this.player.currentTime(), VideoPlayer.videoId);
      }
      localStorage.setItem(lastWatchedPositionKey, this.player.currentTime());
   };

    handleBeforeUnload = () => {
       this.saveProgress();
    };

    handleError = () => {
       const {
          videoJsOptions,
       } = this.props;
       if (videoJsOptions.sources[0].src.includes('s3.us-west-2.amazonaws.com')
       || videoJsOptions.sources[0].src.includes('cloudfront')) {
          this.player.src({ src: videoJsOptions.sources[0].src, type: 'video/mp4' });
       }
    };

    render() {
       return (
          <div>
             <div data-vjs-player style={ { height: '100%', width: '100%' } }>
                <video
                   ref={ node => this.videoNode = node }
                   className='video-js  vjs-theme-forest'
                   data-setup='{ "playbackRates": [0.5, 1, 1.5, 2] }'
                   onError={ this.handleError }
                />
             </div>
          </div>
       );
    }
}

const mapStateToProps = (state) => ({
   siteInfo: siteInfoSelector(state),
   authUser: authUserSelector(state),
});

export default connect(mapStateToProps)(VideoPlayer);
