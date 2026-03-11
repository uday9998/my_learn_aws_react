import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import VideosTable from 'components/modules/videoAnalytics/VideosTable';
import PagePagination from 'components/elements/videoAnalytics/PagePagination';
import VideoListHeader from 'components/elements/videoAnalytics/VideoListHeader';


const VideosTableCard = ({
   videoAnalytics, handleVideoAnalyticsEdit, changeVideosPage, viewVideoChange, handleVideosSelectChange,
}) => {
   return (
      <div className='videosTableCard'>
         <div className='videosTableCard__header'>
            <VideoListHeader
               handleVideosSelectChange={ handleVideosSelectChange }
               viewVideoChange={ viewVideoChange }
               total={ videoAnalytics.total }
            />
         </div>
         <div className='videosTableCard__table'>
            <VideosTable videoAnalytics={ videoAnalytics } handleVideoAnalyticsEdit={ handleVideoAnalyticsEdit } />
         </div>
         <div className='flex justify-center m-t-exl p-t-exs'>
            <PagePagination changeVideosPage={ changeVideosPage } videoAnalytics={ videoAnalytics } />
         </div>
      </div>
   );
};

VideosTableCard.propTypes = {
   videoAnalytics: PropTypes.object,
   handleVideoAnalyticsEdit: PropTypes.func,
   changeVideosPage: PropTypes.func,
   viewVideoChange: PropTypes.number,
   handleVideosSelectChange: PropTypes.func,
};


export default VideosTableCard;
