/* eslint-disable camelcase */
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import SidebarGroup from 'components/elements/sidebar/SidebarGroup';
import SidebarLink from 'components/elements/sidebar/SidebarLink';
import Navigation from 'components/elements/Navigation';
import Router from 'routes/router';
import LogOut from 'components/modules/logOutPopup';
import ProgressBar from 'components/modules/progressBar';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PricingPopup from 'components/elements/PricingPopup';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AdminSidebar = ({
   sidebarProps,
}) => {
   const {
      goTo, locationPath, setShowMenu, handleLogout, authUser, goToMyAccount,
      userChangedData, status, isOneTimeUser, openLogOutPopup, logoutPopupIsOpen,
      gbDefaultSize, gbSize, progresPercent, app, mainApp, openAIAssistantModal
   } = sidebarProps;
   
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const history = useHistory();
   
   const { permissions } = useSelector(siteInfoSelector);
   
   const handleClosePopup = () => {
      setShowPopup(false);
   };
   
   const handleShowPopup = (title) => {
      if (!Array.isArray(permissions)) {
         if (permissions.affiliate_program && title === 'affiliate' && 
            !authUser.plan_name.includes('starter') && 
            !authUser.plan_name.includes('essential')) {
            goTo(Router.route('ADMIN_AFFILIATE').getCompiledPath());
         } else if (permissions.automations && title === 'automations' && 
            !authUser.plan_name.includes('starter') && 
            !authUser.plan_name.includes('essential')) {
            goTo(Router.route('ADMIN_AUTOMATIONS').getCompiledPath());
         } else if (title === 'ai_assistant' && 
            !authUser.plan_name.includes('starter')) {
            if (typeof openAIAssistantModal === 'function') {
               openAIAssistantModal();
            }
         } else {
            setPopupTitle(title);
            setShowPopup(true);
         }
      } else if (title === 'affiliate' && 
         !authUser.plan_name.includes('starter') && 
         !authUser.plan_name.includes('essential')) {
         goTo(Router.route('ADMIN_AFFILIATE').getCompiledPath());
      } else if (title === 'automations' && 
         !authUser.plan_name.includes('starter') && 
         !authUser.plan_name.includes('essential')) {
         goTo(Router.route('ADMIN_AUTOMATIONS').getCompiledPath());
      } else if (title === 'ai_assistant' && 
         !authUser.plan_name.includes('starter')) {
         if (typeof openAIAssistantModal === 'function') {
            openAIAssistantModal();
         }
      } else {
         setPopupTitle(title);
         setShowPopup(true);
      }
   };
   
   const handleNavigateEmails = () => {
      if (!Array.isArray(permissions)) {
         if (!permissions.email_marketing) {
            setPopupTitle('Email Marketing');
            setShowPopup(true);
         } else {
            goTo(`${ Router.route('ADMIN_EMAILS').getCompiledPath() }#single_emails`);
         }
      } else {
         goTo(`${ Router.route('ADMIN_EMAILS').getCompiledPath() }#single_emails`);
      }
   };
   
   return (
      <>
         {showPopup && createPortal(
            <PricingPopup
               handleClosePopup={handleClosePopup}
               popupTitle={popupTitle}
            />, 
            document.body
         )}
         <Navigation>
            <SidebarLink
               icon='DashboardMob'
               title='Dashboard'
               to={Router.route('ADMIN_DASHBOARD').getCompiledPath()}
               onClick={() => goTo(Router.route('ADMIN_DASHBOARD').getCompiledPath())}
               active={Router.route('ADMIN_DASHBOARD').match(locationPath)}
               goTo={goTo}
               globalStatus={status}
            />
            <SidebarGroup
               icon='Classes'
               title='Products'
            >
               <SidebarLink
                  title='My Products'
                  subMenu
                  to={Router.route('ADMIN_COURSES').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_COURSES').getCompiledPath())}
                  active={Router.route('ADMIN_COURSES').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Media Library'
                  subMenu
                  to={Router.route('MEDIA_LIBRARY').getCompiledPath()}
                  onClick={() => goTo(Router.route('MEDIA_LIBRARY').getCompiledPath())}
                  active={Router.route('MEDIA_LIBRARY').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Other Pages'
                  subMenu
                  to={Router.route('ADMIN_OTHER_PAGES').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_OTHER_PAGES').getCompiledPath())}
                  active={Router.route('ADMIN_OTHER_PAGES').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Landing Pages'
                  subMenu
                  to={Router.route('ADMIN_LANDING_PAGES').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_LANDING_PAGES').getCompiledPath())}
                  active={Router.route('ADMIN_LANDING_PAGES').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Portal Themes'
                  subMenu
                  to={Router.route('ADMIN_SCHOOL_ROOM').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_SCHOOL_ROOM').getCompiledPath())}
                  active={Router.route('ADMIN_SCHOOL_ROOM').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
                  isPortal={true}
               />
               <SidebarLink
                  title='Quizzes'
                  subMenu
                  to={Router.route('ADMIN_QUIZZES').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_QUIZZES').getCompiledPath())}
                  active={Router.route('ADMIN_QUIZZES').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
            </SidebarGroup>
            <SidebarLink
               icon='MemberMob'
               title='Members'
               to={Router.route('ADMIN_MEMBERS').getCompiledPath()}
               onClick={() => goTo(Router.route('ADMIN_MEMBERS').getCompiledPath())}
               active={Router.route('ADMIN_MEMBERS').match(locationPath)}
               goTo={goTo}
               globalStatus={status}
            />
            <SidebarGroup
               icon='ReportMob'
               title='Analytics'
            >
               <SidebarLink
                  title='Dashboard'
                  subMenu
                  to={Router.route('ADMIN_REPORTS_DASHBOARD').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_REPORTS_DASHBOARD').getCompiledPath())}
                  active={Router.route('ADMIN_REPORTS_DASHBOARD').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Subscription Metrics'
                  subMenu
                  to={Router.route('ADMIN_SUBSCRIPTION_METRICS').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_SUBSCRIPTION_METRICS').getCompiledPath())}
                  active={Router.route('ADMIN_SUBSCRIPTION_METRICS').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Net Revenue'
                  subMenu
                  to={Router.route('ADMIN_NET_REVENUE').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_NET_REVENUE').getCompiledPath())}
                  active={Router.route('ADMIN_NET_REVENUE').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Page Views'
                  subMenu
                  to={Router.route('ADMIN_PAGE_VIEWS').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_PAGE_VIEWS').getCompiledPath())}
                  active={Router.route('ADMIN_PAGE_VIEWS').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Product Progress'
                  subMenu
                  to={Router.route('ADMIN_CLASS_PROGRESS').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_CLASS_PROGRESS').getCompiledPath())}
                  active={Router.route('ADMIN_CLASS_PROGRESS').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Transactions'
                  subMenu
                  to={Router.route('ADMIN_TRANSACTIONS').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_TRANSACTIONS').getCompiledPath())}
                  active={Router.route('ADMIN_TRANSACTIONS').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Refunds'
                  subMenu
                  to={Router.route('ADMIN_REFOUNDS').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_REFOUNDS').getCompiledPath())}
                  active={Router.route('ADMIN_REFOUNDS').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Video Metrics'
                  subMenu
                  to={Router.route('ADMIN_VIDEO_METRICS').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_VIDEO_METRICS').getCompiledPath())}
                  active={Router.route('ADMIN_VIDEO_METRICS').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
            </SidebarGroup>
            <SidebarGroup
               icon='SalesNewMob'
               title='Sales'
               onClick={() => goTo(Router.route('ADMIN_COURSES').getCompiledPath())}
            >
               <SidebarLink
                  title='Membership'
                  subMenu
                  to={Router.route('ADMIN_MEMBERSHIP_CREATE').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_MEMBERSHIP_CREATE').getCompiledPath())}
                  active={Router.route('ADMIN_MEMBERSHIP_CREATE').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Bundles'
                  subMenu
                  to={Router.route('ADMIN_PLANS').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_PLANS').getCompiledPath())}
                  active={Router.route('ADMIN_PLANS').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Coupons'
                  subMenu
                  to={Router.route('ADMIN_COUPONS').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_COUPONS').getCompiledPath())}
                  active={Router.route('ADMIN_COUPONS').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Affiliate Program'
                  subMenu
                  to={Router.route('ADMIN_AFFILIATE').getCompiledPath()}
                  onClick={() => handleShowPopup('affiliate')}
                  active={Router.route('ADMIN_AFFILIATE').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
            </SidebarGroup>
            <SidebarGroup
               icon='PromotionMob'
               title='Promotions'
            >
               <SidebarLink
                  title='Emails'
                  subMenu
                  to={`${Router.route('ADMIN_EMAILS').getCompiledPath()}#single_emails`}
                  onClick={() => handleNavigateEmails()}
                  active={Router.route('ADMIN_EMAILS').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Blog'
                  subMenu
                  to={Router.route('ADMIN_BLOG').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_BLOG').getCompiledPath())}
                  active={Router.route('ADMIN_BLOG').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
               <SidebarLink
                  title='Certificates'
                  subMenu
                  to={Router.route('ADMIN_CERTIFICATES').getCompiledPath()}
                  onClick={() => goTo(Router.route('ADMIN_CERTIFICATES').getCompiledPath())}
                  active={Router.route('ADMIN_CERTIFICATES').match(locationPath)}
                  goTo={goTo}
                  globalStatus={status}
               />
            </SidebarGroup>
            <SidebarLink
               title='Automations'
               icon='Automation'
               to={Router.route('ADMIN_AUTOMATIONS').getCompiledPath()}
               onClick={() => handleShowPopup('automations')}
               active={Router.route('ADMIN_AUTOMATIONS').match(locationPath)}
               goTo={goTo}
               globalStatus={status}
            />
            <SidebarLink
               title='App Builder'
               icon='SideBarMenuPhone'
               to={Router.route('ADMIN_APP_BUILDER').getCompiledPath()}
               onClick={() => goTo(Router.route('ADMIN_APP_BUILDER').getCompiledPath())}
               active={Router.route('ADMIN_APP_BUILDER').match(locationPath)}
               goTo={goTo}
               globalStatus={status}
            />
             <SidebarLink
               icon='RobotAi' 
               title='AI Assistant'
               to={ Router.route('ADMIN_AI_ASSISTANT').getCompiledPath() }
               onClick={ () => goTo(Router.route('ADMIN_AI_ASSISTANT').getCompiledPath()) }
               globalStatus={status}
               active={ Router.route('ADMIN_AI_ASSISTANT').match(locationPath) }
              
               goTo={ goTo }
       
            />

            <SidebarLink
               icon='HelpMob'
               title='Help'
               style={{
                  marginTop: '0px',
                  borderTop: '1px solid #E7E9E9',
               }}
               blank
               to='https://support.miestro.com'
            />
            <SidebarLink
               icon='ChangeLogMob'
               title='Updates'
               id='mob-changeLog'
               globalStatus={true}
               onClick={() => {
                  document.getElementById('loopedinSelector').click();
                  const loopedinSideBar = document.getElementById('loopedin-sidebar');
                  loopedinSideBar.classList.add('loopedin-sidebar-show');
                  loopedinSideBar.addEventListener('click', () => {
                     loopedinSideBar.classList.remove('loopedin-sidebar-show');
                  });
               }}
            />
            <SidebarLink
               icon='SettingMob'
               title='Settings'
               style={{
                  marginTop: '0px',
                  borderBottom: '1px solid #E7E9E9',
               }}
               to={Router.route('ADMIN_SETTINGS').getCompiledPath()}
               onClick={() => goTo(Router.route('ADMIN_SETTINGS').getCompiledPath())}
               active={Router.route('ADMIN_SETTINGS').match(locationPath)}
               goTo={goTo}
               globalStatus={status}
            />
            <LogOut
               handleLogout={handleLogout}
               goToMyAccount={goToMyAccount}
               setShowMenu={setShowMenu}
               goTo={goTo}
               globalStatus={status}
               openLogOutPopup={openLogOutPopup}
               logoutPopupIsOpen={logoutPopupIsOpen}
            >
               <SidebarGroup
                  user={true}
                  userImage={userChangedData.picture_src ? userChangedData.picture_src : authUser.picture_full_src}
                  title={userChangedData.name ? userChangedData.name : authUser.name}
               />
            </LogOut>
            {isOneTimeUser && !app.unlimited_storage && !mainApp.unlimited_storage ? (
               <div style={{ textAlign: 'right' }}>
                  <Text
                     type={TextType.normal}
                     size={TextSize.small}
                     inner={`${(gbDefaultSize - gbSize).toFixed(2)} of ${gbDefaultSize}GB`}
                     className='planPriceValue'
                     style={{ padding: '0 12px', fontSize: '14px' }}
                  />
                  <ProgressBar
                     bgcolor='#7cb740'
                     completed={progresPercent}
                  />
               </div>
            ) : <></>
            }
         </Navigation>
      </>
   );
};

AdminSidebar.propTypes = {
   sidebarProps: PropTypes.object,
};

export default AdminSidebar;