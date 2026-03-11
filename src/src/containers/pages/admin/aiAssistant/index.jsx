import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import Container from 'views/layout/AdminContainer';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import AIAssistant from './AIAssistant';
import { authUserSelector } from 'state/modules/common/selectors';
import './AIAssistant.scss';

class AIAssistantContainer extends Component {
   static propTypes = {
      authUser: PropTypes.object,
      location: PropTypes.object,
      goTo: PropTypes.func,
   };

   navigateToContentAI = (action) => {
      const { goTo } = this.props;
      goTo('ADMIN_CONTENT_AI', action ? `action=${action}` : '');
   };

   navigateToCommunityAI = (action) => {
      const { goTo } = this.props;
      goTo('ADMIN_COMMUNITY_AI', action ? `action=${action}` : '');
   };

   render() {
      return (
         <>
            <MobileHeader>
               <SiteHeader
                  hasMenu
                  title="AI Assistant"
               />
            </MobileHeader>
            <Container>
               <Container.Content>
                  <AIAssistant 
                     onContentAction={this.navigateToContentAI}
                     onCommunityAction={this.navigateToCommunityAI}
                  />
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

export default connect(mapStateToProps, mapDispatchToProps)(AIAssistantContainer);