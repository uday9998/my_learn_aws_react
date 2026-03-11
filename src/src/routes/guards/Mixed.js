import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { siteDetailsInitOperation } from 'state/modules/common/operations';
import { authUserSelector, isSiteInitedSelector, siteInfoSelector } from 'state/modules/common/selectors';
import ReactPixel from 'react-facebook-pixel';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { userMaven } from 'utils/userMaven';
import SocketLayout from 'views/layout/Socket';
import ap3cCheckAndInit from 'utils/ap3cCheckAndInit';
import { portalId } from 'utils/constants';

class Mixed extends Component {
   static propTypes = {
      authUser: PropTypes.object,
      isSiteInited: PropTypes.bool.isRequired,
      component: PropTypes.any,
      init: PropTypes.func.isRequired,
      siteInfo: PropTypes.object,
      location: PropTypes.object,
      goToMemberArea: PropTypes.func,
   };

   componentDidMount() {
      const {
         init,
         isSiteInited,
         authUser,
         siteInfo,
      } = this.props;
      if (!isSiteInited) {
         init();
      }
      ap3cCheckAndInit();
   }

   componentDidUpdate() {
      const {
         authUser, siteInfo, location, goToMemberArea, isSiteInited,
      } = this.props;
      // if (isSiteInited && authUser && authUser.is_affiliate) {
      //    window.location = '/affiliate/dashboard';
      // }
      if (location.pathname === Router.route('BLOG_LISTING').getMask()
      || (location.pathname && location.pathname.split('/') && location.pathname.split('/')[1] === 'blog')) {
         if ((!authUser || (authUser && authUser.role === 0)) && siteInfo.blog_page_status && (siteInfo.blog_page_status === 'off' || siteInfo.blogs_count === 0 || (siteInfo.blogs_count === 0 && siteInfo.blog_page_status === 'on_default'))) {
            if (!window.blog) {
               goToMemberArea();
            }
         }
      }
      if (authUser && authUser.uuid) {
         userMaven(authUser);
      }
      ap3cCheckAndInit();
   }

   render() {
      const {
         component: ChildComponent, isSiteInited, siteInfo, ...rest
      } = this.props;
      if (!isSiteInited) {
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
      goToMemberArea: () => {
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mixed);
