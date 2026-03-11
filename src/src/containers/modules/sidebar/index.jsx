import React, { Component } from 'react';
import SideBar from 'components/modules/Sidebar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currentLocationPathSelector, locationSelector } from 'state/modules/router/selectors';
// import Router from 'admin/routes/router';
import { push } from 'connected-react-router';
import { resetCommonDetails } from 'state/modules/common/actions';
import {
   authUserSelector, appSelector, mainAppSelector, authMetasSelector,
} from 'state/modules/common/selectors';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import * as selectors from 'state/modules/settings/selectors';
import { getFileSizeInfoOperation } from 'state/modules/settings/operations';
import { customLogout } from 'utils/userMaven';
import isPageBuilder from 'utils/isPageBuilder';
import { portalId } from 'utils/constants';

class SidebarContainer extends Component {
   static propTypes = {
      goTo: PropTypes.func.isRequired,
      locationPath: PropTypes.string.isRequired,
      location: PropTypes.object,
      logout: PropTypes.func,
      authUser: PropTypes.object,
      accountSettings: PropTypes.object,
      userChangedData: PropTypes.object,
      fileSizeInfo: PropTypes.object,
      getUploadsInfo: PropTypes.func,
      app: PropTypes.object,
      mainApp: PropTypes.object,
      metas: PropTypes.object,
      openAIAssistantModal: PropTypes.func,
   };

   componentDidMount() {
      const { getUploadsInfo } = this.props;
      getUploadsInfo();
   }

   handleLogout = () => {
      const { logout, authUser } = this.props;
      customLogout(authUser);
      logout();
   }

   goToMyAccount = () => {
      const { goTo } = this.props;
      goTo({
         pathname: Router.route('ADMIN_ACCOUNT').getMask(),
         hash: 'billing',
      });
   }


   render() {
      const {
         goTo, locationPath, location, authUser, accountSettings, userChangedData, fileSizeInfo, app, mainApp,
         metas, openAIAssistantModal
      } = this.props;
      const currentPage = location.pathname.split('/');
      return (
         <SideBar
            goTo={ goTo }
            locationPath={ locationPath }
            isPageBuilder={ isPageBuilder() }
            isBarSmall={ currentPage[4] === 'edit' && currentPage[2] === 'automations' }
            handleLogout={ this.handleLogout }
            goToMyAccount={ this.goToMyAccount }
            authUser={ authUser }
            app={ app }
            mainApp={ mainApp }
            metas={ metas }
            accountSettings={ accountSettings }
            userChangedData={ userChangedData }
            fileSizeInfo={ fileSizeInfo }
            openAIAssistantModal={openAIAssistantModal}
         />
      );
   }
}


const mapStateToProps = (state) => {
   return {
      locationPath: currentLocationPathSelector(state),
      location: locationSelector(state),
      authUser: authUserSelector(state),
      accountSettings: selectors.accountSettingsSelector(state),
      userChangedData: selectors.userChangedDataSelector(state),
      fileSizeInfo: selectors.getFileSizeSelector(state),
      mainApp: mainAppSelector(state),
      metas: authMetasSelector(state),
      app: appSelector(state),
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      goTo: (location, disabled) => {
         if (!disabled) dispatch(push(location));
      },
      getUploadsInfo: () => {
         dispatch(getFileSizeInfoOperation());
      },
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
