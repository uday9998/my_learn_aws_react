import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Input from 'components/elements/inputNew';
import IconNew from 'components/elements/iconsSize';
import { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import DeleteModal from 'components/elements/DeleteModal';
import { Popover } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
import Auth from 'utils/Auth';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import CommunityTopNotifications from './CommunityTopNotifications';

const CommunityTop = ({
   searchValue, handleInputChange, onInviteMember, handleDeleteRoom, room,
   openSettings, markAsRead, user, role, community, goToMessenger,
}) => {
   const [isOpenNotifications, setIsOpenNotifications] = useState(false);
   const [isOpenPersonMenu, setIsOpenPersonMenu] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');

   const [isOpen, setIsOpen] = useState(true);
   const init = useSelector(authUserSelector);

   const onOpenNotifications = (e) => {
      setIsOpenNotifications(true);
      setAnchorEl(e.currentTarget);
   };
   const onOpenPersonMenu = (e) => {
      setIsOpenPersonMenu(true);
      setAnchorEl(e.currentTarget);
   };

   const onCloseNotifications = () => {
      setIsOpenNotifications(false);
   };
   const onClosePersonMenu = () => {
      setIsOpenPersonMenu(false);
   };
   const isActiveNotification = room.notifications.some((e) => e.status === '0');
   const isOpenActions = room.author ? room.author ? (room.author ? room.author.id : null) : user.id === null || role === 'admin' : true;

   const history = useHistory();

   const goToMyAccount = () => {
      window.open(role === 'admin' ? '/admin/settings#general' : '/my-account#settings', '_blank');
   };

   const comId = history.location.pathname.split('/').slice(-1)[0];

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

   const handleNavigateMessanger = (comId) => {
      if (Array.isArray(permissions)) {
         goToMessenger(comId);
      } else if (permissions.direct_messaging) {
         goToMessenger(comId);
      } else {
         setShowPopup(true);
         setPopupTitle('Messaging');
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   const goToBridge = (id) => {
      history.push(`/admin/community/${ id }/bridge`);
   };

   return (
      <div className='community__top'>
         {
            showPopup && createPortal(<PricingPopup
               handleClosePopup={ handleClosePopup }
               popupTitle={ popupTitle }
            />, document.body)
         }
         <Input
            value={ searchValue || '' }
            onChange={ handleInputChange }
            name='search'
            type='search'
            placeholder='Search'
            isCloseHidenOnEmpty={ true }
         />
         {isOpenDeletePopup && (
            <DeleteModal
               onDelete={ () => handleDeleteRoom(room.id)
               }
               onCancel={ () => setIsOpenDeletePopup(null) }
               deleteText='Delete'
               title='Are you sure you want to delete this room?'
            />
         )}
         {isOpenActions && (
            <div className='community__top__actions'>
               <div className='community__top__actions__box'>
                  <div
                     className={ `community__top__action${ isOpenNotifications ? ' community__top__action__active' : '' }` }
                     onClick={ onOpenNotifications }
                     role='presentation'
                  >
                     {isActiveNotification && (
                        <div className='community__top__action__circle' />
                     )}
                     <IconNew name='notificationCommunityM' />
                     <span>Notifications</span>
                  </div>
                  <div className='verticalLine' />
                  <div className='community__top__action'>
                     <TextWithIcon 
                        iconName='messengerCommunitySidebarS'
                        inner='Messenger'
                        iconColor='#24554E'
                        type={ types.regularDefaultSmall }
                        size={ sizes.small }
                        className='community_message_with_icon'
                        onClick={ () => handleNavigateMessanger(comId) }
                        style={ { color: '#36796f', fontSize: '12px' } }
                        generalStyles={ {
                           cursor: 'pointer',
                        } }
                     />
                  </div>
               </div>
               <div className='community_person community__top__action' onClick={ onOpenPersonMenu } role='presentation'>
                  <img src={ init.picture_full_src } alt='avatar' />
                  <span className='community_person_name'>{init.name}</span>
                  <div style={ { transform: `rotate(${ isOpen ? '180deg' : '0deg' })` } }>
                     <IconNew name='ArrowSelectorS' />
                  </div>
               </div>
               {/* {role === 'admin' && (
                  <div className='community__top__action' role='presentation' onClick={ () => onInviteMember() }>
                     <IconNew name='addMemberCommunityS' />
                  </div>
               )} */}
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
                     <CommunityTopNotifications
                        communityOwnerId={ room.admin_profile.id }
                        room={ room }
                        markAsRead={ (ids) => markAsRead(ids) }
                     />
                  </div>
               </Popover>
               <Popover
                  open={ isOpenPersonMenu }
                  anchorEl={ anchorEl }
                  onClose={ onClosePersonMenu }
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
                     style: { width: '237px', left: '1266px !important' },
                  } }
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
                           } else {
                              goToCreatePricing(community.id, community.owner_course?.id);
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
                        iconName='BridgeM'
                        inner='Connect'
                        iconColor={ false }
                        type={ types.regularDefaultSmall }
                        size={ sizes.small }
                        onClick={ () => {
                           goToBridge(community.id);
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
                        } }
                        style={ { color: '#444C4B' } }
                        generalStyles={ {
                           cursor: 'pointer',
                        } }
                     />
                  )}
                  <TextWithIcon 
                     iconName='AdminPopup'
                     inner='Log out'
                     iconColor={ false }
                     type={ types.regularDefaultSmall }
                     size={ sizes.small }
                     onClick={ () => {
                        accountClick();
                     } }
                     style={ { color: '#444C4B' } }
                     generalStyles={ {
                        cursor: 'pointer',
                     } }
                  />
               </Popover>
               {/* <div className='community__top__action'>
                  <IconNew name='thirdCommunityM' />
               </div> 
               {role !== 'member' && (
                  <div
                     className='community__top__action'
                     role='presentation'
                     onClick={ () => openSettings() }
                  >
                     <IconNew name='settingsCommunityM' />
                  </div>
               )}
               {role !== 'member' && (
                  <div
                     className='community__top__action community__top__action__delete'
                     role='presentation'
                     onClick={ () => setIsOpenDeletePopup(true) }
                  >
                     <IconNew name='deleteCommunityM' />
                  </div>
               )} */}
            </div>
         )}
      </div>
   );
};

CommunityTop.propTypes = {
   searchValue: PropTypes.string,
   onInviteMember: PropTypes.func,
   handleInputChange: PropTypes.func,
   markAsRead: PropTypes.func,
   openSettings: PropTypes.func,
   handleDeleteRoom: PropTypes.func,
   room: PropTypes.object,
   user: PropTypes.object,
   community: PropTypes.object,
   role: PropTypes.string,
   goToMessenger: PropTypes.func,
};

export default CommunityTop;