import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import VideoLibrary from 'views/pages/VideoLibrary';
import Container from 'views/layout/AdminContainer';
import SiteHeader from 'views/layout/SiteHeader';
import * as selectors from 'state/modules/videolibrary/selectors';
import * as operations from 'state/modules/videolibrary/operations';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Modal from 'components/elements/Modal';
import DeleteModalContent from 'views/pages/VideoLibrary/DeleteModalContent';
// import * as actions from 'state/modules/plans/actions';
import withLoading from 'utils/withLoading';
import { portalId } from 'utils/constants';

const VideoLibraryLoading = withLoading(VideoLibrary);
class VideoLibraryContainer extends Component {
   static propTypes = {
      fetchData: PropTypes.func,
      isFetchingData: PropTypes.bool,
      isFetchingDataByFilter: PropTypes.bool,
      changeVideosPage: PropTypes.func,
      deleteVideo: PropTypes.func,
      goToBackDashboard: PropTypes.func,
      data: PropTypes.object,
   };

   state={
      delModalOpen: false,
      deleteItemId: null,
   }

   componentDidMount = () => {
      const { fetchData } = this.props;
      fetchData();
   }

   onChangeVideosPage = (data) => {
      const { changeVideosPage } = this.props;
      changeVideosPage({ page: data.currentPage, count: 20 });
   }

   handleSearch = (data) => {
      const { changeVideosPage } = this.props;
      changeVideosPage(data);
   }

   goToBack = () => {
      const { goToBackDashboard } = this.props;
      goToBackDashboard();
   }

   handleDeleteModalOpen = (bool, id) => {
      this.setState({
         deleteItemId: id,
         delModalOpen: bool,
      });
   }

   render() {
      const {
         data,
         isFetchingData,
         deleteVideo,
         isFetchingDataByFilter,
      } = this.props;
      const { delModalOpen, deleteItemId } = this.state;
      return (
         <Container>
            <Container.Header>
               <SiteHeader title='Video Library' tooltip='This is where your videos are organized and available to manage.' />
               <SiteHeaderMobile
                  title='Video Library'
                  goToBack={ () => this.goToBack() }
                  goBack
                  isLeftAction
                  tooltip='This is where your videos are organized and available to manage.'
               />
            </Container.Header>
            <Container.Content>

               <VideoLibraryLoading
                  isLoading={ isFetchingData }
                  total={ data.total }
                  data={ data.data }
                  deleteVideo={ (id) => this.handleDeleteModalOpen(true, id) }
                  onChangeVideosPage={ this.onChangeVideosPage }
                  isFetching={ isFetchingDataByFilter }
                  handleSearch={ this.handleSearch }
               />

               {
                  delModalOpen && (
                     <Modal
                        blurColor='rgba(63, 79, 101, 0.6)'
                        contentBgColor='#fff'
                        contentPosition='center'
                        closeOnClickOutside={ true }
                        contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                        onClose={ () => this.handleDeleteModalOpen(false, null) }
                     >
                        <div>
                           <DeleteModalContent
                              onCancel={ () => this.handleDeleteModalOpen(false, null) }
                              // eslint-disable-next-line max-len
                              onApprove={ () => { deleteVideo(deleteItemId); this.handleDeleteModalOpen(false, null); } }
                              title='Delete video'
                              content='Are you sure you want to delete this video?'
                           />
                        </div>
                     </Modal>
                  )
               }
            </Container.Content>
         </Container>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      data: selectors.videosSelector(state),
      isFetchingData: selectors.isFetchingDataSelector(state),
      isFetchingDataByFilter: selectors.isFetchingDataByFilterSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      fetchData: () => dispatch(operations.getVideosOperation()),
      deleteVideo: (id) => dispatch(operations.deleteVideoOperation(id)),
      changeVideosPage: (data) => dispatch(operations.onVideosByFilterOperation(data)),
      goToBackDashboard: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoLibraryContainer);
