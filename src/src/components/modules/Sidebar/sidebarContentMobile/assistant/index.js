/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import SidebarGroup from 'components/elements/sidebar/SidebarGroup';
import SidebarLink from 'components/elements/sidebar/SidebarLink';
import Navigation from 'components/elements/Navigation';
import Router from 'routes/router';
import LogOut from 'components/modules/logOutPopup';
import ProgressBar from 'components/modules/progressBar';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const AssistantSidebar = ({
   sidebarProps,
}) => {
   const {
      goTo, locationPath, setShowMenu, handleLogout, authUser, goToMyAccount,
      userChangedData, status, isOneTimeUser, openLogOutPopup, logoutPopupIsOpen,
      gbDefaultSize, gbSize, progresPercent, app, mainApp,
   } = sidebarProps;
   return (
      <Navigation>
         <SidebarLink
            icon='DashboardMob'
            title='Dashboard'
            to={ Router.route('ADMIN_DASHBOARD').getCompiledPath() }
            onClick={ () => goTo(Router.route('ADMIN_DASHBOARD').getCompiledPath()) }
            active={ Router.route('ADMIN_DASHBOARD').match(locationPath) }
            goTo={ goTo }
            globalStatus={ status }
         />
         <SidebarGroup
            icon='ReportMob'
            title='Products'
         >
            <SidebarLink
               title='My Products'
               subMenu
               to={ Router.route('ADMIN_COURSES').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_COURSES').getCompiledPath()) }
               active={ Router.route('ADMIN_COURSES').match(locationPath) }
               goTo={ goTo }
               globalStatus={ status }
            />
            {/* <SidebarLink
               title='Email Notifications'
               subMenu
               to={ Router.route('ADMIN_TEMPLATES').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_TEMPLATES').getCompiledPath()) }
               active={ Router.route('ADMIN_TEMPLATES').match(locationPath) }
               goTo={ goTo }
               globalStatus={ status }
            /> */}
            <SidebarLink
               title='Media Library'
               subMenu
               to={ Router.route('MEDIA_LIBRARY').getCompiledPath() }
               onClick={ () => goTo(Router.route('MEDIA_LIBRARY').getCompiledPath()) }
               active={ Router.route('MEDIA_LIBRARY').match(locationPath) }
               goTo={ goTo }
               globalStatus={ status }
            />
         </SidebarGroup>
         <SidebarLink
            icon='MemberMob'
            title='Members'
            to={ Router.route('ADMIN_MEMBERS').getCompiledPath() }
            onClick={ () => goTo(Router.route('ADMIN_MEMBERS').getCompiledPath()) }
            active={ Router.route('ADMIN_MEMBERS').match(locationPath) }
            goTo={ goTo }
            globalStatus={ status }
         />
         <SidebarGroup
            icon='PromotionMob'
            title='Promotions'
         >
            <SidebarLink
               title='Emails'
               subMenu
               to={ Router.route('ADMIN_EMAILS').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_EMAILS').getCompiledPath()) }
               active={ Router.route('ADMIN_EMAILS').match(locationPath) }
               goTo={ goTo }
               globalStatus={ status }
            />
            <SidebarLink
               title='Blog'
               subMenu
               to={ Router.route('ADMIN_BLOG').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_BLOG').getCompiledPath()) }
               active={ Router.route('ADMIN_BLOG').match(locationPath) }
               goTo={ goTo }
               globalStatus={ status }
            />
            {/* <SidebarLink
               title='Certificates'
               subMenu
               to={ Router.route('ADMIN_CERTIFICATES').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_CERTIFICATES').getCompiledPath()) }
               active={ Router.route('ADMIN_CERTIFICATES').match(locationPath) }
               goTo={ goTo }
               globalStatus={ status }
            /> */}
            {/* <SidebarLink
               title='Gamification'
               subMenu
               to={ Router.route('ADMIN_GAMIFICATION').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_GAMIFICATION').getCompiledPath()) }
               active={ Router.route('ADMIN_GAMIFICATION').match(locationPath) }
               goTo={ goTo }
               globalStatus={ status }
            /> */}
            {/* <SidebarLink
               title='Affiliate'
               subMenu
               onClick={ () => window.open('https://miestro.firstpromoter.com', '_blank') }
               goTo={ goTo }
               globalStatus={ status }
            /> */}
         </SidebarGroup>
         <SidebarLink
            icon='SettingMob'
            title='Settings'
            style={ {
               marginTop: '0px',
               borderBottom: '1px solid #c2cedb',
            } }
            to={ Router.route('ADMIN_SETTINGS').getCompiledPath() }
            onClick={ () => goTo(Router.route('ADMIN_SETTINGS').getCompiledPath()) }
            active={ Router.route('ADMIN_SETTINGS').match(locationPath) }
            goTo={ goTo }
            globalStatus={ status }
         />
         <LogOut
            handleLogout={ handleLogout }
            goToMyAccount={ goToMyAccount }
            setShowMenu={ setShowMenu }
            goTo={ goTo }
            globalStatus={ status }
            openLogOutPopup={ openLogOutPopup }
            logoutPopupIsOpen={ logoutPopupIsOpen }
         >
            <SidebarGroup
               user={ true }
               userImage={ userChangedData.picture_src ? userChangedData.picture_src : authUser.picture_full_src }
               title={ userChangedData.name ? userChangedData.name : authUser.name }
            />
         </LogOut>
         <SidebarLink
            icon='HelpMob'
            title='Help'
            blank
            to='https://support.miestro.com'
         />
         <SidebarLink
            icon='ChangeLogMob'
            title='Updates'
            id='mob-changeLog'
            globalStatus={ true }
            onClick={ () => {
               document.getElementById('loopedinSelector').click();
               const loopedinSideBar = document.getElementById('loopedin-sidebar');
               loopedinSideBar.classList.add('loopedin-sidebar-show');
               loopedinSideBar.addEventListener('click', () => {
                  loopedinSideBar.classList.remove('loopedin-sidebar-show');
               });
            } }
         />
         { isOneTimeUser && !app.unlimited_storage && !mainApp.unlimited_storage ? (
            <div style={ { textAlign: 'right' } }>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ `${(gbDefaultSize - gbSize).toFixed(2)} of ${gbDefaultSize}GB` }
                  className='planPriceValue'
                  style={ { padding: '0 12px', fontSize: '14px' } }
               />
               <ProgressBar
                  bgcolor='#7cb740'
                  completed={ progresPercent }
               />
            </div>
         ) : <></>
         }
      </Navigation>
   );
};

AssistantSidebar.propTypes = {
   sidebarProps: PropTypes.object,
};

export default AssistantSidebar;
