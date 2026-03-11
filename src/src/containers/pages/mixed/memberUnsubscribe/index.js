import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import MemberUnsubscribeEmail from 'views/pages/memberUnsubscribe';
import { authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
import * as member from 'state/modules/members/selectors';
import { unsubscribeMemberEmailOperation } from 'state/modules/members/operations';
import { customLogout } from 'utils/userMaven';
import { portalId } from 'utils/constants';

class MemberUnsubscribeEmailContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,
      siteInfo: PropTypes.object.isRequired,
      authUser: PropTypes.object,
      unsubscribeMemberEmail: PropTypes.func,
      match: PropTypes.object,
      isUnsubscribeEmail: PropTypes.bool,
      goToMainHub: PropTypes.func,
   };

   componentDidMount() {
      const {
         unsubscribeMemberEmail,
         match: { params },
      } = this.props;
      unsubscribeMemberEmail(params.uuid, params.member_id);
   }

   handleLogout = () => {
      const { logout, authUser } = this.props;
      customLogout(authUser);
      logout();
   }

   render() {
      const {
         siteInfo,
         authUser,
         isUnsubscribeEmail,
         goToMainHub,
      } = this.props;
      return (
         <MemberUnsubscribeEmail
            siteInfo={ siteInfo }
            loggedIn={ !!authUser }
            handleLogout={ this.handleLogout }
            isUnsubscribeEmail={ isUnsubscribeEmail }
            goToMainHub={ goToMainHub }
            authUser={ authUser }
         />
      );
   }
}

const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
      siteInfo: siteInfoSelector(state),
      isUnsubscribeEmail: member.isUnsubscribeEmailSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      goToMainHub: () => dispatch(push(Router.route('OFFERS').getCompiledPath(portalId))),
      unsubscribeMemberEmail: (uuid, memberId) => {
         dispatch(unsubscribeMemberEmailOperation(uuid, memberId));
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(MemberUnsubscribeEmailContainer);
