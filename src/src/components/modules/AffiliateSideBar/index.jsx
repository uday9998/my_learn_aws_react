import React, { useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { siteInfoSelector } from 'state/modules/common/selectors';
import IconNew from 'components/elements/iconsSize';
import Navigation from 'components/elements/Navigation';
import Router from 'routes/router';
import SidebarGroup from 'components/elements/sidebar/SidebarGroup';
import SidebarLink from 'components/elements/sidebar/SidebarLink';
import LogOut from '../logOutPopup';
import logo from '../../../assets/images/miestrologo.svg'

const Sidebar = ({
   goTo, locationPath, isPageBuilder, handleLogout, authUser,
   userChangedData, isBarSmall, mainApp,
}) => {
   const siteInfo = useSelector(siteInfoSelector);

   const [logoutPopupIsOpen, setLogoutPopupIsOpen] = useState(false);
   const { status } = mainApp;
   // useEffect(() => {
   //    if (window.innerWidth > 1023) { window.initChangelog('changeLog', '1581641103736x656598169981288400'); }
   // }, []);

   function openLogOutPopup() {
      setLogoutPopupIsOpen(!logoutPopupIsOpen);
   }

   function closeLogOutPopup() {
      setLogoutPopupIsOpen(false);
   }

   return (
      <div
         className={ `sidebar ${ isBarSmall ? 'small_sidebar_w' : 'sidebar_w' }` }
         onClick={ closeLogOutPopup }
         role='presentation'
      >
         <div className='sidebar__top'>
            {/* {siteInfo.school_logo ? (
               <img src={ siteInfo.school_logo } alt='' />
            ) : (
               <IconNew name='AffiliateSideBarLogo' />
            )} */}
            <img src={logo} alt='' />
         </div>
         <div className='sidebar__content'>
            <Navigation>
               <SidebarLink
                  icon='Dashboard'
                  title='Dashboard'
                  to={ Router.route('AFFILIATE_DASHBOARD').getCompiledPath() }
                  onClick={ () => goTo(Router.route('AFFILIATE_DASHBOARD').getCompiledPath()) }
                  active={ Router.route('AFFILIATE_DASHBOARD').match(locationPath) }
                  isPageBuilder={ isPageBuilder || isBarSmall }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <SidebarLink
                  title='Product Offers'
                  icon='Classes'
                  to={ Router.route('AFFILIATE_FRONT_PRODUCTS').getCompiledPath() }
                  onClick={ () => goTo(Router.route('AFFILIATE_FRONT_PRODUCTS').getCompiledPath()) }
                  active={ Router.route('AFFILIATE_FRONT_PRODUCTS').match(locationPath) }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <SidebarLink
                  icon='Help'
                  title='Help'
                  className='settings__margin__auto'
                  blank
                  to='https://support.miestro.com'
                  isPageBuilder={ isPageBuilder || isBarSmall }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <SidebarLink
                  icon='ChangeLog'
                  title='Updates'
                  id='changeLog'
                  isPageBuilder={ isPageBuilder || isBarSmall }
                  globalStatus={ true }
                  onClick={ () => document.getElementById('loopedinSelector').click() }
               />
               <SidebarLink
                  icon='ProfileSettings'
                  title='Profile Settings'
                  to={ Router.route('AFFILIATE_FRONT_PROFILE_SETTINGS').getCompiledPath() }
                  onClick={ () => goTo(Router.route('AFFILIATE_FRONT_PROFILE_SETTINGS').getCompiledPath()) }
                  active={ Router.route('AFFILIATE_FRONT_PROFILE_SETTINGS').match(locationPath) }
                  isPageBuilder={ isPageBuilder || isBarSmall }
                  goTo={ goTo }
                  globalStatus={ status }
               />
               <div style={ { position: 'relative' } }>
                  <div
                     style={ {
                        position: 'absolute',
                        width: '100%',
                        height: '1px',
                        background: '#E7E9E9',
                     } }
                  />
                  <LogOut
                     handleLogout={ handleLogout }
                     goTo={ goTo }
                     globalStatus={ status }
                     openLogOutPopup={ openLogOutPopup }
                     logoutPopupIsOpen={ logoutPopupIsOpen }
                  >
                     <SidebarGroup
                        user={ true }
                        style={ {
                           marginTop: '2px',
                        } }
                        userImage={
                           userChangedData.picture_src ? userChangedData.picture_src : authUser.picture_full_src }
                        title={ userChangedData.name ? userChangedData.name : authUser.name }
                        isPageBuilder={ isPageBuilder || isBarSmall }
                     />
                  </LogOut>
               </div>
            </Navigation>
         </div>
      </div>
   );
};

Sidebar.propTypes = {
   goTo: PropTypes.func,
   locationPath: PropTypes.string,
   isPageBuilder: PropTypes.bool,
   handleLogout: PropTypes.func,
   authUser: PropTypes.object,
   userChangedData: PropTypes.object,
   isBarSmall: PropTypes.bool,
   mainApp: PropTypes.object,
};

export default Sidebar;
