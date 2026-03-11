/* eslint-disable max-len */
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

const SubAdminSidebar = ({
   sidebarProps,
}) => {
   const {
      goTo, locationPath, isPageBuilder, handleLogout, authUser, goToMyAccount,
      userChangedData, status, isOneTimeUser, openLogOutPopup, logoutPopupIsOpen,
      gbDefaultSize, gbSize, progresPercent, app, mainApp, isBarSmall,
   } = sidebarProps;
   return (
      <ul className='sidebar__menu'>
         <Navigation
            isPageBuilder={ isPageBuilder }
         >
            <SidebarLink
               icon='Dashboard'
               title='Dashboard'
               to={ Router.route('ADMIN_DASHBOARD').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_DASHBOARD').getCompiledPath()) }
               active={ Router.route('ADMIN_DASHBOARD').match(locationPath) }
               isPageBuilder={ (isPageBuilder || isBarSmall) }
               goTo={ goTo }
               globalStatus={ status }
            />
            <SidebarGroup
               icon='Classes'
               title='Products'
               isPageBuilder={ (isPageBuilder || isBarSmall) }
               onClick={ (isPageBuilder || isBarSmall) ? () => goTo(Router.route('ADMIN_COURSES').getCompiledPath()) : () => { } }
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
                  isPageBuilder={ (isPageBuilder || isBarSmall) }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <SidebarLink
                  title='Landing Pages'
                  subMenu
                  to={ Router.route('ADMIN_LANDING_PAGES').getCompiledPath() }
                  onClick={ () => goTo(Router.route('ADMIN_LANDING_PAGES').getCompiledPath()) }
                  active={ Router.route('ADMIN_LANDING_PAGES').match(locationPath) }
                  isPageBuilder={ isPageBuilder }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <SidebarLink
                  title='Portal Themes'
                  subMenu
                  to={ Router.route('ADMIN_SCHOOL_ROOM').getCompiledPath() }
                  onClick={ () => goTo(Router.route('ADMIN_SCHOOL_ROOM').getCompiledPath()) }
                  active={ Router.route('ADMIN_SCHOOL_ROOM').match(locationPath) }
                  isPageBuilder={ isPageBuilder || isBarSmall }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <SidebarLink
                  title='Quizzes'
                  subMenu
                  to={ Router.route('ADMIN_QUIZZES').getCompiledPath() }
                  onClick={ () => goTo(Router.route('ADMIN_QUIZZES').getCompiledPath()) }
                  active={ Router.route('ADMIN_QUIZZES').match(locationPath) }
                  isPageBuilder={ isPageBuilder || isBarSmall }
                  goTo={ goTo }
                  globalStatus={ status }
               />
            </SidebarGroup>
            <SidebarLink
               icon='Member'
               title='Members'
               to={ Router.route('ADMIN_MEMBERS').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_MEMBERS').getCompiledPath()) }
               active={ Router.route('ADMIN_MEMBERS').match(locationPath) }
               isPageBuilder={ (isPageBuilder || isBarSmall) }
               goTo={ goTo }
               globalStatus={ status }
            />
            <SidebarGroup
               icon='Report'
               title='Analytics'
               isPageBuilder={ (isPageBuilder || isBarSmall) }
               onClick={ (isPageBuilder || isBarSmall) ? () => goTo(Router.route('ADMIN_TRANSACTIONS').getCompiledPath()) : () => { } }
            >
               <SidebarLink
                  title='Transactions'
                  subMenu
                  to={ Router.route('ADMIN_TRANSACTIONS').getCompiledPath() }
                  onClick={ () => goTo(Router.route('ADMIN_TRANSACTIONS').getCompiledPath()) }
                  active={ Router.route('ADMIN_TRANSACTIONS').match(locationPath) }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <SidebarLink
                  title='Class Report'
                  subMenu
                  to={ Router.route('ADMIN_REPORTS').getCompiledPath() }
                  onClick={ () => goTo(Router.route('ADMIN_REPORTS').getCompiledPath()) }
                  active={ Router.route('ADMIN_REPORTS').match(locationPath) }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <SidebarLink
                  title='Revenue Report'
                  subMenu
                  to={ Router.route('ADMIN_REVENUE_REPORTS').getCompiledPath() }
                  onClick={ () => goTo(Router.route('ADMIN_REVENUE_REPORTS').getCompiledPath()) }
                  active={ Router.route('ADMIN_REVENUE_REPORTS').match(locationPath) }
                  goTo={ goTo }
                  globalStatus={ status }
               />
            </SidebarGroup>
            <SidebarGroup
               icon='Promotion'
               title='Promotions'
               isPageBuilder={ (isPageBuilder || isBarSmall) }
               onClick={ (isPageBuilder || isBarSmall) ? () => goTo(Router.route('ADMIN_BLOG').getCompiledPath()) : () => { } }
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
                  isPageBuilder={ (isPageBuilder || isBarSmall) }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <SidebarLink
                  title='Certificates'
                  subMenu
                  to={ Router.route('ADMIN_CERTIFICATES').getCompiledPath() }
                  onClick={ () => goTo(Router.route('ADMIN_CERTIFICATES').getCompiledPath()) }
                  active={ Router.route('ADMIN_CERTIFICATES').match(locationPath) }
                  isPageBuilder={ (isPageBuilder || isBarSmall) }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               {/* <SidebarLink
                  title='Gamification'
                  subMenu
                  to={ Router.route('ADMIN_GAMIFICATION').getCompiledPath() }
                  onClick={ () => goTo(Router.route('ADMIN_GAMIFICATION').getCompiledPath()) }
                  active={ Router.route('ADMIN_GAMIFICATION').match(locationPath) }
                  isPageBuilder={ (isPageBuilder || isBarSmall) }
                  goTo={ goTo }
                  globalStatus={ status }
               /> */}
               {/* <SidebarLink
                  title='Affiliate'
                  subMenu
                  onClick={ () => window.open('https://miestro.firstpromoter.com', '_blank') }
                  isPageBuilder={ (isPageBuilder || isBarSmall) }
                  goTo={ goTo }
                  globalStatus={ status }
               /> */}
            </SidebarGroup>
            <SidebarLink
               icon='Help'
               title='Help'
               blank
               className='settings__margin'
               to='https://support.miestro.com'
               isPageBuilder={ isPageBuilder }
               goTo={ goTo }
               globalStatus={ status }
            />
            <SidebarLink
               icon='ChangeLog'
               title='Updates'
               id='changeLog'
               isPageBuilder={ isPageBuilder }
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
            <SidebarLink
               icon='Setting'
               title='Settings'
               style={ {
                  borderBottom: '1px solid #c2cedb',
               } }
               to={ Router.route('ADMIN_SETTINGS').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_SETTINGS').getCompiledPath()) }
               active={ Router.route('ADMIN_SETTINGS').match(locationPath) }
               isPageBuilder={ (isPageBuilder || isBarSmall) }
               goTo={ goTo }
               globalStatus={ status }
            />
            <SidebarLink
               icon='Help'
               title='Help'
               blank
               to='https://support.miestro.com'
               isPageBuilder={ isPageBuilder }
               goTo={ goTo }
               globalStatus={ status }
            />
            <div style={ { position: 'relative' } }>
               {isOneTimeUser && !isPageBuilder && !isBarSmall && !app.unlimited_storage && !mainApp.unlimited_storage ? (
                  <div style={ { textAlign: 'right' } }>
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.small }
                        inner={ `${ (gbDefaultSize - gbSize).toFixed(2) } of ${ gbDefaultSize }GB` }
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
               <LogOut
                  handleLogout={ handleLogout }
                  goToMyAccount={ goToMyAccount }
                  goTo={ goTo }
                  globalStatus={ status }
                  openLogOutPopup={ openLogOutPopup }
                  logoutPopupIsOpen={ logoutPopupIsOpen }
               >
                  <SidebarGroup
                     user={ true }
                     userImage={ userChangedData.picture_src ? userChangedData.picture_src : authUser.picture_full_src }
                     title={ userChangedData.name ? userChangedData.name : authUser.name }
                     isPageBuilder={ isPageBuilder }


                  />
               </LogOut>
            </div>
         </Navigation>
      </ul>
   );
};

SubAdminSidebar.propTypes = {
   sidebarProps: PropTypes.object,
};

export default SubAdminSidebar;
