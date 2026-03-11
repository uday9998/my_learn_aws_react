import React, { Component } from 'react';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authUserSelector, appSelector, mainAppSelector } from 'state/modules/common/selectors';
import { currentLocationPathSelector } from 'state/modules/router/selectors';
// import Router from 'admin/routes/router';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { portalId } from 'utils/constants';
import { resetCommonDetails } from 'state/modules/common/actions';
import * as selectors from 'state/modules/settings/selectors';
// import PricingPlans from 'components/modules/designCourse/plan/PricingPlans/index.mob';
import * as operations from 'state/modules/settings/operations';

class SidebarContainer extends Component {
   static propTypes = {
      isLeftAction: PropTypes.bool,
      locationPath: PropTypes.string,
      goToBack: PropTypes.func,
      goTo: PropTypes.func.isRequired,
      title: PropTypes.string,
      bottomContent: PropTypes.any,
      hasMenu: PropTypes.bool,
      logout: PropTypes.func,
      authUser: PropTypes.object,
      primaryTheme: PropTypes.string,
      isStudentRoom: PropTypes.bool,
      tooltip: PropTypes.string,
      userChangedData: PropTypes.object,
      getSettings: PropTypes.func,
      globalStatus: PropTypes.any,
      fileSizeInfo: PropTypes.object,
      getUploadsInfo: PropTypes.func,
      curseButtons: PropTypes.any,
      courseLogo: PropTypes.string,
      siteInfoTitle: PropTypes.string,
      app: PropTypes.object,
      mainApp: PropTypes.object,
      subTitle: PropTypes.string,
      setIsOpenMobSearch: PropTypes.func,
      previewPlaylist: PropTypes.func,
      handleSaveAndContinue: PropTypes.func,
      isMobSearchOpen: PropTypes.bool,
      isPlaylist: PropTypes.bool, 
   };

   componentDidMount() {
      const { getUploadsInfo, authUser } = this.props;
      if (authUser.role !== 0) {
         getUploadsInfo();
      }
   }

   handleLogout = () => {
      const { logout } = this.props;
      logout();
   }

   goToMyAccount = () => {
      const { goTo, getSettings } = this.props;
      goTo({
         pathname: Router.route('ADMIN_ACCOUNT').getMask(),
         hash: 'personal',
      });

      if (document.querySelector('#account')) {
         document.querySelector('#account').click();
      } else {
         getSettings('account');
      }
   }

   render() {
      const {
         isLeftAction,
         locationPath,
         title,
         goToBack,
         goTo,
         bottomContent,
         hasMenu,
         authUser,
         primaryTheme,
         isStudentRoom,
         tooltip,
         userChangedData,
         globalStatus,
         fileSizeInfo,
         curseButtons,
         courseLogo,
         siteInfoTitle,
         app,
         mainApp,
         subTitle,
         setIsOpenMobSearch,
         isMobSearchOpen,
         isPlaylist,
         previewPlaylist,
         handleSaveAndContinue,
      } = this.props;

      return (
         <SiteHeader
            goToBack={ goToBack }
            title={ title }
            goBack={ isLeftAction }
            locationPath={ locationPath }
            goTo={ goTo }
            hasMenu={ hasMenu }
            bottomContent={ bottomContent }
            handleLogout={ this.handleLogout }
            memberAccountPath={ Router.route('MEMBER_ACCOUNT').getMask() }
            authUser={ authUser }
            primaryTheme={ primaryTheme }
            isStudentRoom={ isStudentRoom }
            tooltip={ tooltip }
            goToMyAccount={ this.goToMyAccount }
            userChangedData={ userChangedData }
            globalStatus={ globalStatus }
            fileSizeInfo={ fileSizeInfo }
            curseButtons={ curseButtons }
            courseLogo={ courseLogo }
            siteInfoTitle={ siteInfoTitle }
            app={ app }
            mainApp={ mainApp }
            subTitle={ subTitle }
            setIsOpenMobSearch={ setIsOpenMobSearch }
            isMobSearchOpen={ isMobSearchOpen }
            isPlaylist={ isPlaylist }
            previewPlaylist={ previewPlaylist }
            handleSaveAndContinue={ handleSaveAndContinue }
         />
      );
   }
}


const mapStateToProps = (state) => {
   return {
      locationPath: currentLocationPathSelector(state),
      authUser: authUserSelector(state),
      userChangedData: selectors.userChangedDataSelector(state),
      fileSizeInfo: selectors.getFileSizeSelector(state),
      mainApp: mainAppSelector(state),
      app: appSelector(state),
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => {
         dispatch(push(location));
      },
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('COURSES').getCompiledPath(portalId)));
      },
      getSettings: async (key) => {
         await dispatch(operations.settingsGetOperation(key));
      },
      getUploadsInfo: () => {
         dispatch(operations.getFileSizeInfoOperation());
      },
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
