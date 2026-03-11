import React, { useState } from 'react';
import './index.scss';
import DropTriggle from 'components/elements/newDropTriggle';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';
import DeleteModal from 'components/elements/DeleteModal';
import IconButton from 'components/elements/buttons/IconButton';
import Input from 'components/elements/inputNew';
import moment from 'moment';
import { formatLastActiveTime } from 'utils/formatLastActiveTime';
import MessengerUserProfile from '../../../UserProfile';

const MessengerRightTop = () => {
   const {
      selectedConverstation, openMember, onlineUsersIds, role, deleteChat, handleMuteUser, search, setIsSearchActive,
      isSearchActive, handleSearchMessage, selectedUserRole
   } = React.useContext(CommunityMessengerContext);
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

   const userOptions = [
      {
         trash: false,
         iconName: 'CommunityMessengerUserM',
         name: 'Go To Profile',
         onClick: () => openMember(selectedConverstation.admin.member.id),
      },
   ];
   if (isSearchActive) {
      return (
         <div className='messenger__right__top'>
            <Input
               type='search'
               onClearSearchValue={ () => setIsSearchActive(false) }
               value={ search }
               onChange={ (name, value) => handleSearchMessage(value) }
               placeholder='Search message'
            />
         </div>
      );
   }
   if (selectedConverstation.isGroup) {
      return (
         <div className='messenger__right__top'>
            <MessengerUserProfile
               text=''
               name='Group Chat'
            />
            <div className='messenger__right__top__right'>
               <IconButton
                  name='CommunityMessengerSearchL'
                  onClick={ () => setIsSearchActive(true) }
               />

            </div>
         </div>
      );
   }
   if (role === 'admin') {
      userOptions.push({
         trash: false,
         iconName: 'CommunitySettingsMemberMuteM',
         name: selectedConverstation.member.member.muted_since ? 'Unlock Member' : 'Lock Member',
         onClick: () => handleMuteUser(
            selectedConverstation[selectedUserRole].member.uuid,
            selectedConverstation[selectedUserRole].chat_room_id,
            selectedConverstation.member.member.muted_since
         ),
      }, {
         trash: true,
         iconName: 'deleteCommunityM',
         name: 'Delete Chat',
         onClick: () => {
            setIsOpenDeleteModal(true);
         },
      });
   }

   const selectedData = selectedConverstation[selectedUserRole] || {};
   const {
      uuid, name, last_login_at: lastLoginAt, picture_full_src: pictureFullSrc
   } = selectedData.member || {};

   return (
      <div className='messenger__right__top'>
         {isOpenDeleteModal && (
            <DeleteModal
               title={ ` Permanently delete the chat with ${ name }?` }
               deleteText='Delete'
               onCancel={ () => setIsOpenDeleteModal(false) }
               onDelete={ () => {
                  deleteChat(selectedData.chat_room_id);
                  setIsOpenDeleteModal(false);
               } }
               maxWidth={ 414 }
            />
         )}
         <MessengerUserProfile
            text={ `${formatLastActiveTime(Date.now(), lastLoginAt)} (${moment(lastLoginAt).isValid() ? `${ (moment(lastLoginAt)).format('HH:mm') } am` : ''})`}
            isOnline={ onlineUsersIds.includes(uuid) }
            name={ name }
            image={ pictureFullSrc }
            hideTime
            keepTextLength
         />
         <div className='messenger__right__top__right'>
            <IconButton
               name='CommunityMessengerSearchL'
               onClick={ () => setIsSearchActive(true) }
            />
            <DropTriggle
               options={ userOptions }
            />
         </div>
      </div>
   );
};

export default MessengerRightTop;
