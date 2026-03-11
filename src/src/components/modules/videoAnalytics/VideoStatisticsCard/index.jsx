import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import TotalReport from 'components/elements/dashboard/TotalReport';
import TotalXReport from 'components/elements/dashboard/TotalXReport';
import PropTypes from 'prop-types';
import VideoPlayer from 'components/modules/videoPlayer';

const VideoStatisticsCard = ({ video }) => {
   let singleVideoView;
   const videoJsOptions = {
      autoplay: !!video.autoplay,
      controls: true,
      sources: [{
         src: video.src,
         type: 'video/mp4',
      }],
      controlBar: { liveDisplay: false, pictureInPictureToggle: true },
   };
   switch (video.lesson_format) {
      case 'video': singleVideoView = (
         <VideoPlayer videoJsOptions={ videoJsOptions } />
      ); break;
      case 'youtube': singleVideoView = (
         <div className='embed-container'>
            <iframe src={ `https://www.youtube.com/embed/${ video.src }` } width='500' height='400' frameBorder='0' allowFullScreen title={ video.video_name } />
         </div>

      ); break;
      case 'vimeo': singleVideoView = (
         <div className='embed-container'>
            <iframe src={ `https://player.vimeo.com/video/${ video.src }` } width='500' height='400' frameBorder='0' allowFullScreen title={ video.video_name } />
         </div>

      ); break;
      case 'wistia': singleVideoView = (
         // eslint-disable-next-line jsx-a11y/iframe-has-title
         <div className='embed-container'>
            <iframe
               src={ `//fast.wistia.net/embed/iframe/${ video.src }` }
               width='500'
               height='400'
               allowTransparency='false'
               frameBorder='0'
               scrolling='no'
               className='wistia_embed'
               name='wistia_embed'
               allowFullScreen
               title={ video.video_name }
            />
         </div>

      ); break;
      default: singleVideoView = (
         <div>
            default
         </div>
      );
   }
   return (
      <>
         <ItemWrapper secondShadow>
            <div className='videoStatisticsCard'>
               {singleVideoView}
               <div className='videoStatisticsCard__statistics'>
                  <div className='m-r-exl'>
                     <TotalXReport
                        title={ `${ video.total_plays } Total Plays` }
                        data={ [
                           { first: `${ video.unique_view_count }`, second: 'Unique Plays' },
                           { first: `${ video.completed }`, second: 'Completed Plays' },
                        ] }
                        icon='Book'
                     />
                  </div>
                  <div>
                     <TotalReport
                        bold={ `${ video.ave_engagement }%` }
                        regular='Ave. Engagement'
                        icon='Complitions'
                     />
                  </div>
               </div>
            </div>
         </ItemWrapper>
         <div className='videoMargin' />
      </>
   );
};

VideoStatisticsCard.propTypes = {
   video: PropTypes.object,
};


export default VideoStatisticsCard;
