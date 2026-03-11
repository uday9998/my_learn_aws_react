import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import Container from 'views/layout/AdminContainer';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { authUserSelector } from 'state/modules/common/selectors';
import CreatePost from './CreatePost';
import './CreatePost.scss';

class CreatePostContainer extends Component {
  static propTypes = {
    authUser: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
  };

  navigateToCommunityDashboard = () => {
    const { goTo } = this.props;
    if (goTo) {
      goTo('ADMIN_COMMUNITY_AI');
    }
  };

  render() {
    return (
      <>
        <MobileHeader>
          <SiteHeader
            isLeftAction
            goToBack={() => {}} 
            title="Create Post"
          />
        </MobileHeader>
        <Container>
          <Container.Content>
          
              <CreatePost goBack={this.navigateToCommunityDashboard} />
            
          </Container.Content>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: authUserSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goTo: (routeName, hash) => {
      dispatch(push({
        pathname: Router.route(routeName).getMask(),
        hash
      }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostContainer);