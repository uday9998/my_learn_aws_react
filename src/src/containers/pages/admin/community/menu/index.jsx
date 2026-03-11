import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Auth from 'utils/Auth';
import { Popover } from '@material-ui/core';
import { authUserSelector } from 'state/modules/common/selectors';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import IconNew from 'components/elements/iconsSize';
import Router from 'routes/router';
import { useSelector } from 'react-redux';
import Tabs from 'components/elements/tabs';
import Input from 'components/elements/inputNew';
import { communityButtonTransparentColors, communityButtonIconColor, communityButtonTransparentColor } from 'utils/communityButtonColors';
import CommunityTopNotifications from 'views/pages/community/communityCommponents/CommunityTop/CommunityTopNotifications';
import CommunityEventNotifications from 'views/pages/community/communityCommponents/CommunityTop/CommunityEventNotifications';
import communityLogo from 'assets/images/community/communityLogo.png';
// import CalendarModal from '../CalendarModal';
import './index.scss';

const CommunityMenu = ({
   community, role, permissions, setPopupTitle, setShowPopup, 
   siteInfo, isMember, room, markAsRead, tabValue, goToMemberProfile,
   searchInput, initialCount, setSearchInput, showSearch, isMobile, notificationsCount,
}) => {
   const [isOpenNotifications, setIsOpenNotifications] = useState(false);
   const [isOpenMenu, setIsOpenMenu] = useState(false);
   const [isOpenSearch, setIsOpenSearch] = useState(false);
   const [isOpenPersonMenu, setIsOpenPersonMenu] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [anchorMenuEl, setAnchorMenuEl] = useState(null);
   const [anchorSeacrhEl, setAnchorSearchEl] = useState(null);
   const [tab, setTab] = useState(isMember ? 2 : tabValue);
   const [isOpen, setIsOpen] = useState(true);
   const init = useSelector(authUserSelector);
   const [isOpenModal, setIsOpenModal] = useState(false);
   let isActiveNotification = room && room.notifications?.some((e) => e.status === '0');
   if (window.location.pathname.includes('calendar')) {
      isActiveNotification = community && community.event_notifications?.some((e) => e.status === '0');
   }


   useEffect(() => {
      setTab(tabValue);
   }, [tabValue]);

   const onOpenPersonMenu = (e) => {
      setIsOpenPersonMenu(true);
      setIsOpen(!isOpen);
      setAnchorEl(e.currentTarget);
   };
  
   const onClosePersonMenu = () => {
      setIsOpen(!isOpen);
      setIsOpenPersonMenu(false);
   };
  
   const history = useHistory();
  
  
   const goToMyAccount = () => {
      // window.open(role === 'admin' ? '/admin/settings#general' : '/my-account#settings', '_blank');
      goToMemberProfile(init.id);
   };
  
   const goToPricings = (id, communityPlanId) => {
      history.push(`/admin/community/${ id } /pricing/${ communityPlanId }`);
   };
  
   const goToCreatePricing = (id, courseId) => {
      history.push(`/admin/community/${ id }/pricing/${ courseId }/create`);
   };
     
   const goToGeneralSettings = (id) => {
      history.push(`/admin/community/${ id }/settings#general`);
   };
  
   const accountClick = () => {
      Auth.logout();
      history.push('/admin/suspended');
   };

   const goToMessenger = () => {
      history.push(Router.route('ADMIN_COMMUNITY_MESSENGAR').getCompiledPath({
         id: community.id,
      }));
   };

   const handleGoToMessenger = (id) => {
      if (Array.isArray(permissions)) {
         goToMessenger(id);
      } else if (!permissions.commmunities.direct_messaging) {
         setShowPopup(true);
         setPopupTitle('Messaging');
      } else {
         goToMessenger(id);
      }
   };

   const goToMembers = () => {
      history.push(Router.route('ADMIN_COMMUNITY_MEMBERS').getCompiledPath({
         id: community.id,
      }));
   };

   const goToHome = () => {
      setTab(0);
      history.push(Router.route('ADMIN_COMMUNITY').getCompiledPath({
         id: community.id,
      }));
   };

   const goToProducts = () => {
      history.push(Router.route('ADMIN_COMMUNITY_PORTAL').getCompiledPath({
         id: community.id,
      }));
   };

   const goToBridge = () => {
      history.push(`/admin/community/${ community.id }/bridge`);
   };

   let tabs = [
      { value: 0, key: 'Community', iconName: 'CommunityM' }, 
      { value: 1, key: 'Portal', iconName: 'PortalCommunityM' },
      { value: 2, key: 'Members', iconName: 'UsersCommunityM' },
     
   ];

   tabs = [...tabs, { value: 4, key: 'Calendar', iconName: 'DateM' }];

   if (role === 'admin' && window.location.pathname.includes('admin')) {
      tabs = [...tabs, 
         { value: 3, key: 'Bridge', iconName: 'BridgeM' },
      ];
   }


   const openCalendar = () => {
      // setIsOpenModal(true);
      history.push(Router.route('ADMIN_COMMUNITY_CALENDAR').getCompiledPath({
         id: community.id,
      }));
      // history.push(`/admin/community/${ community.id }/calendar`);
   };
 

   const setTabAndChangeMenu = (value) => {
      setTab(value);
      if (value === 2) {
         goToMembers();
      } else if (value === 0) {
         goToHome();
      } else if (value === 1) {
         goToProducts();
      } else if (value === 3) {
         goToBridge();
      } else if (value === 4) {
         openCalendar();
      }
      setIsOpenMenu(false);                              
   };


   const onOpenNotifications = (e) => {
      setIsOpenNotifications(true);
      setAnchorEl(e.currentTarget);
   };

   const onCloseMenu = () => {
      setIsOpenMenu(false);
   };

   const onOpenMenu = (e) => {
      setIsOpenMenu(true);
      setAnchorMenuEl(e.currentTarget);
   };

   const onCloseNotifications = () => {
      setIsOpenNotifications(false);
   };

   const onCloseSearch = () => {
      setIsOpenSearch(false);
   };

   const onOpenSearch = (e) => {
      setIsOpenSearch(true);
      setAnchorSearchEl(e.currentTarget);
   };

   return (
      <div className='communityMenu'>
         {/* <CalendarModal isOpenModal={ isOpenModal } setIsOpenModal={ setIsOpenModal } /> */}
         {isMobile && (
            <div className='communityMenu__left__mobile'>
               {(community.community_settings?.branding?.logo || communityLogo) && (
                  <div
                     className='communityMenu__left' 
                  >
                     <img
                        src={ community.community_settings?.branding?.logo || communityLogo }
                        alt='logo'
                        onClick={ () => goToHome() }
                        role='presentation' />
               
                  </div>
               )}
               <div className='community__top__actions community__top__actions__menu__mobile'>
                  <div className='community__white__background'>
                     <div>
                        {/* {showSearch && (
                           <div
                              onClick={ (e) => onOpenSearch(e) } 
                              role='presentation'
                              className='community__white__background__search'> 
                              <IconNew name='SearchM' />
                           </div>
                        )} */}
                        <Popover
                           open={ isOpenSearch }
                           anchorEl={ anchorSeacrhEl }
                           onClose={ onCloseSearch }
                           className='notification-popover'
                           elevation={ 24 }
                           anchorOrigin={ {
                              vertical: 'bottom',
                              horizontal: 'center',
                           } }
                           transformOrigin={ {
                              vertical: 'top',
                              horizontal: 'center',
                           } }
                           PaperProps={ {
                              style: { width: '335px' },
                           } }
                  
                        >
                           <div>
                              <Input
                                 placeholder='Search'
                                 name='search'
                                 type='search'
                                 value={ searchInput }
                                 onClearSearchValue={ onCloseSearch }
                                 onChange={ (name, value) => setSearchInput(value) }
                              />
                           </div>
                        </Popover>
                     </div>
                     <div className='community__top__actions__box community__top__actions__box__menu'>
                        {room && room.admin_profile && (
                           <>
                              <div
                                 className={ `community__top__action${ isOpenNotifications ? ' community__top__action__active' : '' }` }
                                 onClick={ onOpenNotifications }
                                 role='presentation'
                                 style={ communityButtonTransparentColors(community) }
                              >
                                 {isActiveNotification && (
                                    <div className='community__top__action__circle' style={ { backgroundColor: communityButtonIconColor(community) } } />
                                 )}
      
                                 <TextWithIcon 
                                    iconName='notificationCommunityM'
                                    inner=''
                                    iconColor={ communityButtonIconColor(community) || '#24554E' }
                                    type={ types.regularDefaultSmall }
                                    size={ sizes.small }
                                    className='community_message_with_icon'
                                    onClick={ onOpenNotifications }
                                    style={ { color: '#36796f', fontSize: '12px', ...communityButtonTransparentColor(community) } }
                                    generalStyles={ {
                                       cursor: 'pointer',
                                    } }
                                 />
                              </div>
                              {/* <div className='verticalLine' /> */}
                           </>
                        )}   
                        <div className='community__top__action community__top__action__messanger' style={ communityButtonTransparentColors(community) }>
                           <TextWithIcon 
                              iconName='messengerCommunitySidebarS'
                              inner=''
                              iconColor={ communityButtonIconColor(community) || '#24554E' }
                              type={ types.regularDefaultSmall }
                              size={ sizes.small }
                              className='community_message_with_icon'
                              onClick={ () => handleGoToMessenger(community.id) }
                              style={ { color: '#36796f', fontSize: '12px', ...communityButtonTransparentColor(community) } }
                              generalStyles={ {
                                 cursor: 'pointer',
                              } }
                           />
                        </div>
                     </div>
                     {/* <div className='community_person community__top__action community__top__action__author' onClick={ onOpenPersonMenu } role='presentation'>
              
                        <img src={ init.picture_full_src } alt='avatar' />
                        <span className='community_person_name'>{init.name}</span>
                        <div style={ { transform: `rotate(${ isOpen ? '180deg' : '0deg' })` } }>
                           <IconNew name='ArrowSelectorS' />
                        </div>
                     </div> */}
                  </div>
               </div>
            </div>
         )}

         {(!isMobile && (community.community_settings?.branding?.logo || communityLogo)) && (
            <div
               className='communityMenu__left'
            >
               <img
                  src={ community.community_settings?.branding?.logo || communityLogo }
                  alt='logo'
                  onClick={ () => goToHome() }
                  role='presentation' />
               
            </div>
         )}
         
         <div className='communityMenu__right'>
            <div className='communityMenu__right__desktop'>
               <Tabs
                  variants={ tabs }
                  selectedVariant={ tab }
                  hasIcon={ true }
                  onSelect={ (value) => setTabAndChangeMenu(value) }
                  isCommunity={ true }
                  community={ community }
               />
            </div>
            {/* <div className='communityMenu__right__mobile'>
               <div 
                  onClick={ (e) => onOpenMenu(e) }
                  className='communityMenu__right__mobile__icon'
                  role='presentation'>
                  <IconNew name='CommunityMenu' />
               </div>
               <Popover
                  open={ isOpenMenu }
                  anchorEl={ anchorMenuEl }
                  onClose={ onCloseMenu }
                  className='notification-popover'
                  elevation={ 24 }
                  anchorOrigin={ {
                     vertical: 'bottom',
                     horizontal: 'center',
                  } }
                  transformOrigin={ {
                     vertical: 'top',
                     horizontal: 'center',
                  } }
                  PaperProps={ {
                     style: { width: '335px' },
                  } }

               >
                  <div>
                     <div className='menu-mobile-tabs'>
                        <Tabs
                           variants={ tabs }
                           selectedVariant={ tab }
                           hasIcon={ true }
                           onSelect={ (value) => setTabAndChangeMenu(value) }
                        />
                     </div>
                  </div>
               </Popover>
            </div> */}
            <div className='community__top__actions community__top__actions__menu'>
               <div className='community__white__background'>
                  <div>
                     {showSearch && (
                        <div
                           onClick={ (e) => onOpenSearch(e) } 
                           role='presentation'
                           className='community__white__background__search'> 
                           <IconNew name='SearchM' />
                        </div>
                     )}
                     <Popover
                        open={ isOpenSearch }
                        anchorEl={ anchorSeacrhEl }
                        onClose={ onCloseSearch }
                        className='notification-popover'
                        elevation={ 24 }
                        anchorOrigin={ {
                           vertical: 'bottom',
                           horizontal: 'center',
                        } }
                        transformOrigin={ {
                           vertical: 'top',
                           horizontal: 'center',
                        } }
                        PaperProps={ {
                           style: { width: '335px' },
                        } }
                  
                     >
                        <div>
                           <Input
                              placeholder='Search'
                              name='search'
                              type='search'
                              value={ searchInput }
                              onClearSearchValue={ onCloseSearch }
                              onChange={ (name, value) => setSearchInput(value) }
                           />
                        </div>
                     </Popover>
                  </div>
                  <div className='community__top__actions__box community__top__actions__box__menu'>
                     {((room && room.admin_profile && !window.location.pathname.includes('calendar')) 
                     || (community.event_notifications?.length > 0 && window.location.pathname.includes('calendar'))) && (
                        <>
                           <div
                              className={ `community__top__action${ isOpenNotifications ? ' community__top__action__active' : '' }` }
                              onClick={ onOpenNotifications }
                              role='presentation'
                              style={ communityButtonTransparentColors(community) }
                           >
                              {isActiveNotification && (
                                 <div className='community__top__action__circle' style={ { backgroundColor: communityButtonIconColor(community) } } />
                              )}
      
                              <TextWithIcon 
                                 iconName='notificationCommunityM'
                                 inner=''
                                 iconColor={ communityButtonIconColor(community) || '#24554E' }
                                 type={ types.regularDefaultSmall }
                                 size={ sizes.small }
                                 className='community_message_with_icon'
                                 onClick={ onOpenNotifications }
                                 style={ { color: '#36796f', fontSize: '12px', ...communityButtonTransparentColor(community) } }
                                 generalStyles={ {
                                    cursor: 'pointer',
                                 } }
                              />
                           </div>
                           <div className='verticalLine' />
                        </>
                     )}   
                     <div className='community__top__action community__top__action__messanger' style={ communityButtonTransparentColors(community) }>
                        <TextWithIcon 
                           iconName='messengerCommunitySidebarS'
                           inner=''
                           iconColor={ communityButtonIconColor(community) || '#24554E' }
                           type={ types.regularDefaultSmall }
                           size={ sizes.small }
                           className='community_message_with_icon'
                           onClick={ () => handleGoToMessenger(community.id) }
                           style={ { color: '#36796f', fontSize: '12px', ...communityButtonTransparentColor(community) } }
                           generalStyles={ {
                              cursor: 'pointer',
                           } }
                        />
                        {
                           notificationsCount > 0 && <span className='notification__count'>{notificationsCount}</span>
                        }
                     </div>
                  </div>
                  <div className='community_person community__top__action community__top__action__author' onClick={ onOpenPersonMenu } role='presentation'>
              
                     <img src={ init.picture_full_src } alt='avatar' />
                     <span className='community_person_name'>{init.name}</span>
                     <div style={ { transform: `rotate(${ isOpen ? '180deg' : '0deg' })` } }>
                        <IconNew name='ArrowSelectorS' />
                     </div>
                  </div>
                  {((room && room.admin_profile && !window.location.pathname.includes('calendar')) 
                     || (community.event_notifications?.length > 0 && window.location.pathname.includes('calendar'))) && (
                     <Popover
                        open={ isOpenNotifications }
                        anchorEl={ anchorEl }
                        onClose={ onCloseNotifications }
                        className='notification-popover'
                        elevation={ 24 }
                        anchorOrigin={ {
                           vertical: 'bottom',
                           horizontal: 'center',
                        } }
                        transformOrigin={ {
                           vertical: 'top',
                           horizontal: 'center',
                        } }
                        PaperProps={ {
                           style: { width: '335px' },
                        } }

                     >
                        <div className='community__notifications__content'>
                           {!window.location.pathname.includes('calendar') && room && room.admin_profile && (
                              <CommunityTopNotifications
                                 communityOwnerId={ room && room.admin_profile.id }
                                 room={ room }
                                 markAsRead={ (ids) => markAsRead(ids) }
                              />
                           )}
                           {window.location.pathname.includes('calendar') && (
                              <CommunityEventNotifications
                                 ommunityOwnerId={ community.user_id }
                                 user={ community.admin }
                                 notifications={ community.event_notifications }
                                 markAsRead={ (ids) => markAsRead(ids) }
                              />
                           )}
                        </div>
                     </Popover>
                  )}
                  <Popover
                     open={ isOpenPersonMenu }
                     anchorEl={ anchorEl }
                     onClose={ onClosePersonMenu }
                     className={ isMobile ? 'notification-popover-mob' : 'notification-popover' }
                     elevation={ 24 }
                     anchorReference={ isMobile ? 'anchorPosition' : '' }
                     anchorPosition={ {} }
                     anchorOrigin={ {
                        vertical: 'bottom',
                        horizontal: 'center',
                     } }
                     transformOrigin={ {
                        vertical: 'top',
                        horizontal: 'center',
                     } }
                     PaperProps={ {
                        style: isMobile ? {
                           width: '100%', height: 'calc(100vh - 209px)', bottom: '73px', maxWidth: '100%', left: '0', 
                        } : { width: '237px', left: '1266px !important' },
                     } }
                     transitionDuration={ 0 }
                  >
                     <TextWithIcon 
                        iconName='PersonalTabM'
                        inner='My Profile'
                        iconColor={ false }
                        type={ types.regularDefaultSmall }
                        size={ sizes.small }
                        onClick={ () => goToMyAccount() }
                        style={ { color: '#444C4B' } }
                        generalStyles={ {
                           cursor: 'pointer',
                        } }
                     />
                     {role === 'admin' && (
                        <TextWithIcon 
                           iconName='PricingPLanM'
                           inner='Billing'
                           iconColor={ false }
                           type={ types.regularDefaultSmall }
                           size={ sizes.small }
                           onClick={ () => {
                              if (community.plan_id) {
                                 goToPricings(community.id, community.plan_id);
                                 onClosePersonMenu();
                              } else {
                                 goToCreatePricing(community.id, community.owner_course?.id);
                                 onClosePersonMenu();
                              }
                           } }
                           style={ { color: '#444C4B' } }
                           generalStyles={ {
                              cursor: 'pointer',
                           } }
                        />
                     )}
                     {role === 'admin' && (
                        <TextWithIcon 
                           iconName='settingsCommunitySidebarS'
                           inner='Account Settings'
                           iconColor={ false }
                           type={ types.regularDefaultSmall }
                           size={ sizes.small }
                           onClick={ () => {
                              goToGeneralSettings(community.id);
                              onClosePersonMenu();
                           } }
                           style={ { color: '#444C4B' } }
                           generalStyles={ {
                              cursor: 'pointer',
                           } }
                        />
                     )}
                     <div className='verticalGreyLine' />
                     <TextWithIcon 
                        iconName='AdminPopup'
                        inner='Log out'
                        iconColor='#D12D36'
                        type={ types.regularDefaultSmall }
                        size={ sizes.small }
                        onClick={ () => {
                           accountClick();
                        } }
                        style={ { color: '#D12D36' } }
                        generalStyles={ {
                           cursor: 'pointer',
                        } }
                     />
                  </Popover>
               </div>
            </div>
         </div>
      </div>
   );
};

CommunityMenu.propTypes = {
   community: PropTypes.object,
   role: PropTypes.string,
   notificationsCount: PropTypes.number,
   permissions: PropTypes.object,
   setPopupTitle: PropTypes.func,
   setShowPopup: PropTypes.func,
   siteInfo: PropTypes.object,
   isMember: PropTypes.bool,
   room: PropTypes.object,
   markAsRead: PropTypes.func,
   tabValue: PropTypes.number,
   goToMemberProfile: PropTypes.func,
   searchInput: PropTypes.string,
   setSearchInput: PropTypes.func,
   initialCount: PropTypes.number,
   showSearch: PropTypes.bool,
   isMobile: PropTypes.bool,
};

export default CommunityMenu;