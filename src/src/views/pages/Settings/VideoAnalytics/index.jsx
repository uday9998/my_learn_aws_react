import React from 'react';
import VideosTableCard from 'components/modules/videoAnalytics/VideosTableCard';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';

const VideoAnalytics = (props) => {
   const {
      videoAnalytics, handleVideoAnalyticsEdit, changeVideosPage, viewVideoChange, handleVideosSelectChange,
   } = props;
   return (
      <ItemWrapper>
         <VideosTableCard
            videoAnalytics={ videoAnalytics }
            handleVideoAnalyticsEdit={ handleVideoAnalyticsEdit }
            changeVideosPage={ changeVideosPage }
            viewVideoChange={ viewVideoChange }
            handleVideosSelectChange={ handleVideosSelectChange }
         />
      </ItemWrapper>
   );
};

VideoAnalytics.propTypes = {
   videoAnalytics: PropTypes.object,
   handleVideoAnalyticsEdit: PropTypes.func,
   changeVideosPage: PropTypes.func,
   viewVideoChange: PropTypes.number,
   handleVideosSelectChange: PropTypes.func,
};

export default VideoAnalytics;
