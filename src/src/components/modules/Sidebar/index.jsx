/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Router from 'routes/router';
import './index.scss';
import { Link } from 'react-router-dom';
import { getProgressBarData } from 'utils/storage';
import AdminSidebar from './sidebarContent/admin';
import SubAdminSidebar from './sidebarContent/subAdmin';
import SupportSidebar from './sidebarContent/support';
import AssistantSidebar from './sidebarContent/assistant';
import logo from '../../../assets/images/miestrologo.svg';


const Sidebar = ({
   goTo, locationPath, isPageBuilder, handleLogout, authUser, goToMyAccount,
   userChangedData, fileSizeInfo, isBarSmall, app, mainApp, metas, openAIAssistantModal
}) => {
   const { status } = mainApp;
   const [logoutPopupIsOpen, setLogoutPopupIsOpen] = useState(false);
 
   
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
      isPageBuilder,
      isBarSmall,
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
      metas,
      mainApp,
      openAIAssistantModal,
    
   };

   const sidebarContent = {
      1: <AdminSidebar sidebarProps={ sidebarProps } />,
      2: <SubAdminSidebar sidebarProps={ sidebarProps } />,
      3: <AssistantSidebar sidebarProps={ sidebarProps } />,
      4: <SupportSidebar sidebarProps={ sidebarProps } />,
   };

   return (
      <div
         className={ `sidebar ${ isPageBuilder || isBarSmall ? 'small_sidebar_w' : 'sidebar_w' }` }
         onClick={ closeLogOutPopup }
         role='presentation'
      >
         { window.location.pathname.includes('suspended') ? (
            <div className='logo'>
               {/* <Icon name='Logo' /> */}
               <img src={logo} alt="logo" />
            </div>
         ) : (
            <Link to={ Router.route('ADMIN_DASHBOARD').getCompiledPath() }>
               <div className='logo'>
               <img src={logo} alt="logo" />
               </div>
            </Link>
         )}
         {sidebarContent[authUser.role]}

        
      </div>
   );
};

Sidebar.propTypes = {
   goTo: PropTypes.func,
   locationPath: PropTypes.string,
   isPageBuilder: PropTypes.bool,
   handleLogout: PropTypes.func,
   authUser: PropTypes.object,
   goToMyAccount: PropTypes.func,
   userChangedData: PropTypes.object,
   fileSizeInfo: PropTypes.object,
   isBarSmall: PropTypes.bool,
   app: PropTypes.object,
   mainApp: PropTypes.object,
   metas: PropTypes.object,
   openAIAssistantModal: PropTypes.func,
};

export default Sidebar;