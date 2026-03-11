import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Auth from 'utils/Auth';
import { siteDetailsInitOperation } from 'state/modules/common/operations';
import { resetCommonDetails } from 'state/modules/common/actions';
import { authUserSelector, isSiteInitedSelector, siteInfoSelector } from 'state/modules/common/selectors';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import ReactPixel from 'react-facebook-pixel';
import { userMaven } from 'utils/userMaven';
import SocketLayout from 'views/layout/Socket';
import ap3cCheckAndInit from 'utils/ap3cCheckAndInit';
import { portalId } from 'utils/constants';

class Member extends Component {
   static propTypes = {
      authUser: PropTypes.object,
      isSiteInited: PropTypes.bool.isRequired,
      component: PropTypes.any,
      init: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      siteInfo: PropTypes.object,
   };

   componentDidMount() {
      const {
         init, authUser, isSiteInited, logout,
      } = this.props;
      if (Auth.isTokenExists()) {
         if (!authUser && !isSiteInited) {
            init();
         }
      } else {
         logout();
      }
      ap3cCheckAndInit();
   }

   componentDidUpdate() {
      const {
         authUser, isSiteInited, logout,
      } = this.props;
      // if (isSiteInited && authUser && authUser.is_affiliate) {
      //    window.location = '/affiliate/dashboard';
      // }
      if (!isSiteInited && !authUser) {
         logout();
      }
      if (authUser && authUser.uuid) {
         userMaven(authUser);
      }
      ap3cCheckAndInit();
   }

   render() {
      const {
         component: ChildComponent, authUser, siteInfo, ...rest
      } = this.props;
      if (!authUser) {
         return null;
      }
      // eslint-disable-next-line no-empty
      if (siteInfo && siteInfo.google_analytics_id) {
         window.ga('create', siteInfo.google_analytics_id, 'auto');
      }
      if (siteInfo && siteInfo.facebook_pixel_code) {
         ReactPixel.init(siteInfo.facebook_pixel_code);
      }

      return (
         <SocketLayout>
            <Route
               { ...rest }
               render={ (matchProps) => {
                  return <ChildComponent { ...matchProps } />;
               } }
            />
         </SocketLayout>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
      isSiteInited: isSiteInitedSelector(state),
      siteInfo: siteInfoSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      init: () => {
         dispatch(siteDetailsInitOperation());
      },
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('COURSES').getCompiledPath(portalId)));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
