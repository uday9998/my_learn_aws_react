/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import { getProgressBarData } from 'utils/storage';

import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import AdminSidebar from './sidebarContentMobile/admin';
import SubAdminSidebar from './sidebarContent/subAdmin';
import SupportSidebar from './sidebarContentMobile/support';
import AssistantSidebar from './sidebarContentMobile/assistant';


const Sidebar = ({
   goTo, locationPath, authUser, goToMyAccount, userChangedData, handleLogout, setShowMenu,
   fileSizeInfo, app, mainApp, metas, previewPlaylist, handleSaveAndContinue, goToBack, isPlaylist,
}) => {
   const { status } = mainApp;
   const [logoutPopupIsOpen, setLogoutPopupIsOpen] = useState(false);

   // useEffect(() => {
   //    window.initChangelog('mob-changeLog', '1581641103736x656598169981288400');
   // }, []);

   function openLogOutPopup() {
      setLogoutPopupIsOpen(!logoutPopupIsOpen);
   }

   function closeLogOutPopup() {
      setLogoutPopupIsOpen(false);
   }

   const isOneTimeUser = (mainApp.plan_name === 'Life Time Launch Codes' || mainApp.plan_name === 'Premium Plan Lifetime Code' || mainApp.plan_name === 'Growth Plan Lifetime Codes');
   const { progresPercent, gbDefaultSize, gbSize } = getProgressBarData(app, fileSizeInfo, mainApp);


   const sidebarProps = {
      goTo,
      locationPath,
      handleLogout,
      authUser,
      goToMyAccount,
      userChangedData,
      fileSizeInfo,
      status,
      app,
      isOneTimeUser,
      openLogOutPopup,
      logoutPopupIsOpen,
      gbDefaultSize,
      gbSize,
      progresPercent,
      setShowMenu,
      metas,
      mainApp,
   };

   const sidebarContent = {
      1: <AdminSidebar sidebarProps={ sidebarProps } />,
      2: <SubAdminSidebar sidebarProps={ sidebarProps } />,
      3: <AssistantSidebar sidebarProps={ sidebarProps } />,
      4: <SupportSidebar sidebarProps={ sidebarProps } />,
   };

   const handleSaveClose = () => {
      handleSaveAndContinue();
      goToBack();
   };

   return (
      <div
         className='mob-sidebar scroll'
         onClick={ closeLogOutPopup }
         role='presentation'
      >
         <div className='mob-sidebar__menu'>
            {
               isPlaylist && (
                  <div className='menu__buttons'>
                     <Button
                        iconName='CheckoutActiveEyeM'
                        isIconRight={ true }
                        text='Preview'
                        theme={ themes.secondary }
                        size={ btnSizes.small }
                        style={ { maxHeight: '44px' } }
                        onClick={ previewPlaylist }
                     />
                     <Button
                        text='Save'
                        size={ btnSizes.large }
                        // { ...buttonProps }
                        onClick={ handleSaveAndContinue }
                     />
                     <Button
                        text='Save & Close'
                        size={ btnSizes.large }
                        // { ...buttonProps }
                        onClick={ handleSaveClose }
                     />
                  </div>
               )
            }
            {sidebarContent[authUser.role]}
         </div>
      </div>
   );
};
Sidebar.propTypes = {
   goTo: PropTypes.func,
   previewPlaylist: PropTypes.func,
   goToBack: PropTypes.func,
   handleSaveAndContinue: PropTypes.func,
   locationPath: PropTypes.string,
   authUser: PropTypes.object,
   handleLogout: PropTypes.func,
   goToMyAccount: PropTypes.func,
   userChangedData: PropTypes.object,
   setShowMenu: PropTypes.func,
   fileSizeInfo: PropTypes.object,
   metas: PropTypes.object,
   app: PropTypes.object,
   mainApp: PropTypes.object,
   isPlaylist: PropTypes.bool,
};
Sidebar.defaultProps = {
   authUser: {},
   app: {},
   mainApp: {},
};
export default Sidebar;
