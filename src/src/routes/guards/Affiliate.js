import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Auth from 'utils/Auth';
import { siteDetailsInitOperation } from 'state/modules/common/operations';
import { resetCommonDetails } from 'state/modules/common/actions';
import {
   authUserRoleSelector, authUserSelector, isSiteInitedSelector, siteInfoSelector, appSelector, mainAppSelector,
   authMetasSelector,
} from 'state/modules/common/selectors';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import Layout from 'views/layout/AdminLayout';
import { Route } from 'react-router';
import AffiliateSideBar from 'containers/modules/affiliateSideBar';
import ap3cCheckAndInit from 'utils/ap3cCheckAndInit';
import { portalId } from 'utils/constants';

class Affiliate extends Component {
   callPerformed = false;

   static propTypes = {
      authUser: PropTypes.object,
      siteInfo: PropTypes.object,
      authUserRole: PropTypes.any,
      isSiteInited: PropTypes.bool.isRequired,
      goToOffers: PropTypes.func,
      goToDashboard: PropTypes.func.isRequired,
      component: PropTypes.any,
      init: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      app: PropTypes.object,
      metas: PropTypes.object,
      goToLoginPage: PropTypes.func,
   };


   componentDidMount() {
      const {
         init,
      } = this.props;
      init();
      window.rightClickIsOn = true;
      ap3cCheckAndInit();
   }

   componentDidUpdate() {
      const {
         authUser, isSiteInited,
         goToDashboard, siteInfo, goToLoginPage, logout,
      } = this.props;
      if (isSiteInited && authUser && !authUser.is_affiliate && !window.location.pathname.includes('affiliate')) {
         window.location = '/portal/membership';
      }
      if (isSiteInited && !authUser) {
         if (siteInfo.affiliate.affiliate_program.id) {
            if (window.location.pathname !== '/affiliate/login' && window.location.pathname !== '/affiliate/register' && window.location.pathname !== '/affiliate/password/reset') {
               goToLoginPage();
            }
         } else {
            logout(siteInfo.status ? 'OFFERS' : 'LOGIN');
         }
      } else if ((isSiteInited && authUser.is_affiliate)) {
         if (window.location.pathname === '/affiliate/login' || window.location.pathname === '/affiliate/register' || window.location.pathname === '/affiliate') {
            goToDashboard();
         }
      } else if (window.location === '/affiliate' && !authUser) {
         window.location = '/affiliate/login';
      }
      // if (isSiteInited && !authUser) {
      //    // eslint-disable-next-line react/prop-types
      //    if (siteInfo.affiliate) {
      //       goToLoginPage();
      //       return;
      //    }
      //    logout(siteInfo.status ? 'OFFERS' : 'LOGIN');
      // } else if (isSiteInited && authUser && authUser.is_affiliate) {
      //    goToDashboard();
      // } else {
      //    goToOffers();
      // }
      ap3cCheckAndInit();
   }

   // eslint-disable-next-line react/sort-comp
   componentWillMount() {
      window.rightClickIsOn = false;
   }


   render() {
      const {
         component: ChildComponent,
         authUser,
         app,
         isSiteInited,
         metas,
         ...rest
      } = this.props;
      if (isSiteInited && authUser && authUser.is_affiliate) {
         return (
            <Layout>
               <Layout.LeftBar>
                  <AffiliateSideBar />
               </Layout.LeftBar>
               <Route
                  { ...rest }
                  render={ (matchProps) => {
                     return <ChildComponent { ...matchProps } />;
                  } }
               />
            </Layout>

         );
      }
      return (
         <Layout>
            <Route
               { ...rest }
               render={ (matchProps) => {
                  const isVisible = matchProps.location.pathname === '/affiliate/login'
                     || matchProps.location.pathname === '/affiliate/register'
                     || matchProps.location.pathname === '/affiliate/password/reset';

                  if (isVisible) {
                     return <ChildComponent { ...matchProps } />;
                  }
                  return null;
               } }
            />
         </Layout>

      );
   }
}

const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
      app: appSelector(state),
      metas: authMetasSelector(state),
      authUserRole: authUserRoleSelector(state),
      isSiteInited: isSiteInitedSelector(state),
      siteInfo: siteInfoSelector(state),
      mainApp: mainAppSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      init: () => {
         dispatch(siteDetailsInitOperation());
      },
      goToDashboard: () => {
         dispatch(push(Router.route('AFFILIATE_DASHBOARD').getMask()));
      },
      goToOffers: () => {
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      logout: (route) => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route(route).getMask()));
      },
      goToLoginPage: () => {
         dispatch(push(Router.route('AFFILIATE_FRONT_LOGIN').getMask()));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Affiliate);
