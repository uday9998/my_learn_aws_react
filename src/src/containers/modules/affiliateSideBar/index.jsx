import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'components/modules/AffiliateSideBar';
import * as selectors from 'state/modules/settings/selectors';
import { push } from 'connected-react-router';
import { currentLocationPathSelector, locationSelector } from 'state/modules/router/selectors';
import {
   authUserSelector, appSelector, mainAppSelector, authMetasSelector,
} from 'state/modules/common/selectors';
import Auth from 'utils/Auth';
import { getFileSizeInfoOperation } from 'state/modules/settings/operations';
import { resetCommonDetails } from 'state/modules/common/actions';
import { connect } from 'react-redux';
import { customLogout } from 'utils/userMaven';

const AffiliateSideBar = ({
   app, goTo, locationPath, authUser, accountSettings, userChangedData, fileSizeInfo, mainApp,
   metas, logout,
}) => {
   const handleLogout = () => {
      customLogout(authUser);
      logout();
   };
   return (
      <Sidebar
         goTo={ goTo }
         locationPath={ locationPath }
         handleLogout={ handleLogout }
         authUser={ authUser }
         app={ app }
         mainApp={ mainApp }
         metas={ metas }
         accountSettings={ accountSettings }
         userChangedData={ userChangedData }
         fileSizeInfo={ fileSizeInfo }
      />
   );
};

AffiliateSideBar.propTypes = {
   goTo: PropTypes.func.isRequired,
   locationPath: PropTypes.string.isRequired,
   authUser: PropTypes.object,
   accountSettings: PropTypes.object,
   userChangedData: PropTypes.object,
   fileSizeInfo: PropTypes.object,
   app: PropTypes.object,
   mainApp: PropTypes.object,
   metas: PropTypes.object,
   logout: PropTypes.func,
};

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
         window.location = '/affiliate/login';
      },
      goTo: (location, disabled) => {
         if (!disabled) dispatch(push(location));
      },
      getUploadsInfo: () => {
         dispatch(getFileSizeInfoOperation());
      },
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(AffiliateSideBar);
