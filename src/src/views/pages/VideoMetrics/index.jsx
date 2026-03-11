import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ReportsContainer from 'views/newLayout/reports';
import ReportsHeader from 'components/modules/reportsHeader';
import PagePagination from 'components/elements/designCourse/PagePagination';
import { isLocalhost } from 'utils/Helpers';
import EmptyPage from 'components/modules/emptyPageNew';
import VideoMetricsTable from './VideoMetricsComponent/VideoMetricsTable';

const VideoMetricsView = ({
   videoMetricsData, changeVideoPage, loadingByPage, totalVideos,
}) => {
   const apiUrl = (isLocalhost() || window.location.hostname === 'areg.miestro.loc') ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;
   const handleExport = () => {
      const hiddenElement = document.createElement('a');
      hiddenElement.href = `${ apiUrl }/api/v1/reports/videos/csv-export-new`;
      hiddenElement.click();
   };

   return (
      <div className='video__metric'>
         <ReportsContainer>
            <ReportsHeader
               title='Video Metrics'
               printList={ () => {} }
               exportCSV={ () => handleExport() }
            />
            {videoMetricsData.length > 0 && (
               <div className='video__metric__view__table'>
                  <VideoMetricsTable data={ videoMetricsData } />
               </div>
            )}
            {videoMetricsData.length === 0 && (
               <EmptyPage
                  subtitle=''
                  title="You don't have videos yet"
                  buttonName=''
                  iconName='productEmptyL'
               />
            )}
         </ReportsContainer>
         {videoMetricsData.length > 0 && (
            <div className='flex justify-center m-t-exl m-b-exl p-t-exs course-pagination'>
               <PagePagination
                  isLoading={ loadingByPage }
                  changePage={ changeVideoPage }
                  total={ totalVideos }
                  isVideoMetrics={ true }
               />
            </div>
         )}

      </div>
   );
};

VideoMetricsView.propTypes = {
   videoMetricsData: PropTypes.array,
   changeVideoPage: PropTypes.func,
   loadingByPage: PropTypes.bool,
   totalVideos: PropTypes.number,
};

export default VideoMetricsView;
