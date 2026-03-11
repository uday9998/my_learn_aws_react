import React from 'react';
// import PropTypes from 'prop-types';
import VideoMetricsView from 'views/pages/VideoMetrics';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getVideoMetrix, getVideoMetrixbyPage,
} from 'api';
import withLoading from 'utils/withLoading';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Container from 'views/layout/AdminContainer';

const VideoMetricsViewLoading = withLoading(VideoMetricsView);

const VideoMetrics = () => {
   const {
      data: videoMetrix, loading, setData: setVideoMetrix,
   } = useApiQuery(getVideoMetrix);

   const [getVideoMetrixbyPageFunc, { loading: loadingByPage }] = useSubmitForm(getVideoMetrixbyPage, {
      successMessage: '',
   });

   const changeVideoPage = (data) => {
      getVideoMetrixbyPageFunc({ currentPage: data.currentPage }, (res) => {
         setVideoMetrix(res);
      });
   };

   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <Container>
            <VideoMetricsViewLoading
               isLoading={ loading }
               videoMetricsData={ videoMetrix && videoMetrix.data }
               changeVideoPage={ changeVideoPage }
               loadingByPage={ loadingByPage }
               totalVideos={ videoMetrix && videoMetrix.total }
            />
         </Container>
      </>
   );
};

VideoMetrics.propTypes = {

};

export default VideoMetrics;
