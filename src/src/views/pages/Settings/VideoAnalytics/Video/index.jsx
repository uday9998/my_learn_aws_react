import React from 'react';
import './index.scss';
import VideoStatisticsCard from 'components/modules/videoAnalytics/VideoStatisticsCard';
import PropTypes from 'prop-types';

const Video = ({ video }) => {
   return (
      <div className='video__content'>
         <VideoStatisticsCard video={ video } />
      </div>
   );
};

Video.propTypes = {
   video: PropTypes.object,
};

export default Video;
