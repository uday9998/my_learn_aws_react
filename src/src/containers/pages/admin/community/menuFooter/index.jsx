import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Auth from 'utils/Auth';
import { Popover } from '@material-ui/core';
import { authUserSelector } from 'state/modules/common/selectors';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import IconNew from 'components/elements/iconsSize';
import Router from 'routes/router';
import { useSelector } from 'react-redux';
import { communityButtonIconColor, communityButtonTransparentColor } from 'utils/communityButtonColors';
import CommunityTopNotifications from 'views/pages/community/communityCommponents/CommunityTop/CommunityTopNotifications';
import CommunityEventNotifications from 'views/pages/community/communityCommponents/CommunityTop/CommunityEventNotifications';
import './index.scss';

const CommunityMenuFooter = ({
   community, role, permissions, setPopupTitle, setShowPopup, 
   room, markAsRead, goToMemberProfile, isMessenger, isMainPage, notificationsCount,

}) => {
   const [isOpenNotifications, setIsOpenNotifications] = useState(false);
   const [isOpenPersonMenu, setIsOpenPersonMenu] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [isOpen, setIsOpen] = useState(true);
   const init = useSelector(authUserSelector);

   const isActiveNotification = room && room.notifications?.some((e) => e.status === '0');

   const onOpenPersonMenu = (e) => {
      if (isOpenPersonMenu === true) {
         setIsOpenPersonMenu(false);
         setIsOpen(!isOpen);
         setAnchorEl(null);
      } else {
         setIsOpenPersonMenu(true);
         setIsOpen(!isOpen);
         setAnchorEl(e.currentTarget);
      }
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

   const goToCommunity = () => {
      setIsOpenNotifications(false);
      setAnchorEl(null);
      onClosePersonMenu();
      history.push(Router.route('ADMIN_COMMUNITY').getCompiledPath({
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

   const onOpenNotifications = (e) => {
      setIsOpenNotifications(!isOpenNotifications);
      if (isOpenNotifications === true) {
         setAnchorEl(null);
      } else {
         setAnchorEl(e.currentTarget);
      }
   };


   const onCloseNotifications = () => {
      setIsOpenNotifications(false);
   };


   return (
      <div className='CommunityMenuFooter'>
         <TextWithIcon 
            iconName={ isMainPage ? 'HomeFilledL' : 'HomeL' }
            inner='Home'
            iconColor={ isMainPage ? communityButtonIconColor(community) : '#24554E' }
            type={ types.regularDefaultSmall }
            size={ sizes.small14 }
            iconGap={ 4 }
            className='community_message_with_icon'
            onClick={ () => goToCommunity(community.id) }
            style={ isMainPage ? { ...communityButtonTransparentColor(community) } : {} }
            generalStyles={ {
               cursor: 'pointer',
            } }
         />
         {((room && room.admin_profile && !window.location.pathname.includes('calendar')) || (community.event_notifications?.length > 0 && window.location.pathname.includes('calendar'))) && (
            <>
               <div
                  onClick={ onOpenNotifications }
                  role='presentation'
                  className='community_notif_with_icon__mobile'
               >
                  {isActiveNotification && (
                     <div className='community__top__action__circle' style={ { backgroundColor: communityButtonIconColor(community) } } />
                  )}
      
                  <TextWithIcon 
                     iconName={ isOpenNotifications ? 'NotifFilledL' : 'NotifL' } 
                     inner='Notifications'
                     iconColor={ isOpenNotifications ? communityButtonIconColor(community) : '#24554E' }
                     type={ types.regularDefaultSmall }
                     size={ sizes.small14 }
                     iconGap={ 4 }
                     onClick={ onOpenNotifications }
                     style={ isOpenNotifications ? { ...communityButtonTransparentColor(community) } : {} }
                     generalStyles={ {
                        cursor: 'pointer',
                     } }
                  />
               </div>
            </>
         )}   
         <div className='community__top__action__messanger community_message_with_icon__mobile'>
            <TextWithIcon 
               iconName={ isMessenger ? 'MessengerFilledL' : 'messengerCommunitySidebarS' }
               inner='Messenger'
               iconColor={ isMessenger ? communityButtonIconColor(community) : '#24554E' }
               type={ types.regularDefaultSmall }
               size={ sizes.small14 }
               iconGap={ 4 }
               onClick={ () => handleGoToMessenger(community.id) }
               style={ isMessenger ? { ...communityButtonTransparentColor(community) } : {} }
               generalStyles={ {
                  cursor: 'pointer',
               } }
            />
            {
               notificationsCount > 0 && <span className='notification__count'>{notificationsCount}</span>
            }
         </div>
         <div className='community_person' onClick={ onOpenPersonMenu } role='presentation'>  
            <img src={ init.picture_full_src } alt='avatar' />
            <span
               className='community_person_name' 
               // style={ { ...communityButtonTransparentColor(community) } }
            >Profile
            </span>
         </div>
         {((room && room.admin_profile && !window.location.pathname.includes('calendar')) || (community.event_notifications?.length > 0 && window.location.pathname.includes('calendar'))) && (
            <Popover
               open={ isOpenNotifications }
               anchorEl={ anchorEl }
               onClose={ onCloseNotifications }
               className='notification-popover-mob'
               elevation={ 24 }
               anchorReference='anchorPosition'
               anchorPosition={ {} }
               anchorOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'center',
               } }
               transformOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'center',
               } }
               PaperProps={ {
                  style: {
                     width: '100%', height: 'calc(100dvh - 144px)', bottom: '73px', maxWidth: '100%', left: '0', 
                  },
               } }
               transitionDuration={ 0 }
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
            className='notification-popover-mob'
            elevation={ 24 }
            anchorReference='anchorPosition'
            anchorPosition={ {} }
            anchorOrigin={ {
               vertical: 'bottom',
               horizontal: 'center',
            } }
            transformOrigin={ {
               vertical: 'bottom',
               horizontal: 'center',
            } }
            PaperProps={ {
               style: {
                  width: '100%', height: 'calc(100vh - 144px)', bottom: '73px', maxWidth: '100%', left: '0', 
               },
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
   );
};

CommunityMenuFooter.propTypes = {
   community: PropTypes.object,
   role: PropTypes.string,
   permissions: PropTypes.object,
   setPopupTitle: PropTypes.func,
   setShowPopup: PropTypes.func,
   room: PropTypes.object,
   markAsRead: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   isMessenger: PropTypes.bool,
   isMainPage: PropTypes.bool,
   notificationsCount: PropTypes.number,
};

export default CommunityMenuFooter;