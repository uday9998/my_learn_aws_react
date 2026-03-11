/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import Container from 'views/layout/AdminContainer';
import SiteHeader from 'views/layout/SiteHeader';
import * as selectors from 'state/modules/settings/selectors';
import * as operations from 'state/modules/settings/operations';
import Video from 'views/pages/Settings/VideoAnalytics/Video';
import { portalId } from 'utils/constants';

class SettingsVideoContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,
      match: PropTypes.object,
      getSingleVideo: PropTypes.func,
      getVideoInProgress: PropTypes.bool,
   };

   componentDidMount() {
      const { match, getSingleVideo } = this.props;
      const videoId = match.params.id;
      getSingleVideo(videoId);
   }

   handleLogout = () => {
      const { logout } = this.props;
      logout();
   }


   render() {
      const { getVideoInProgress, video } = this.props;
      return (
         !getVideoInProgress && (
            <Container>
               <Container.Header>
                  {/* eslint-disable-next-line react/prop-types */ }
                  <SiteHeader title={ video.video_name } hasArrow />
               </Container.Header>
               <Container.Content>
                  <Video video={ video } />
               </Container.Content>
            </Container>
         )
      );
   }
}

const mapStateToProps = (state) => {
   return {
      video: selectors.videoSelector(state),
      getVideoInProgress: selectors.getVideoInProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      getSingleVideo: (id) => {
         dispatch(operations.getSingleVideoOperation(id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsVideoContainer);
