import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import { Popover } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';
import DeleteModal from 'components/elements/DeleteModal';
import MessengerUserProfile from '../UserProfile';

const MessengerLeftUser = ({
   image, name, lastMessage, time, isActive, isOnline, messagesNotificationsCount = 0, onClick, id,
   deleteChat, isHidenDeleteActions, chatRoomId, handleMuteUser, isMuted, isAdmin
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpenMenu, setIsOpenMenu] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const { openMember } = React.useContext(CommunityMessengerContext);
   const userOptions = [
      {
         trash: false,
         iconName: 'CommunityMessengerUserM',
         name: 'Go To Profile',
         onClick: () => openMember(id),
      },


   ];
   if (!isHidenDeleteActions) {
      userOptions.push({
         trash: false,
         iconName: 'CommunitySettingsMemberMuteM',
         name: isMuted ? 'Unlock Member' : 'Lock member',
         onClick: () => handleMuteUser(),
      }, {
         trash: true,
         iconName: 'deleteCommunityM',
         name: 'Delete Chat',
         onClick: () => {
            setIsOpenDeleteModal(true);
         },
      });
   }
   const lastMessageText = lastMessage && lastMessage.type === 'file_unlock' ? 'File' : lastMessage.text;
   return (
      <div
         className='messenger__user'
         role='presentation'
         onContextMenu={ (e) => {
            e.preventDefault();
            setAnchorEl(e.currentTarget);
            setIsOpenMenu(true);
         } }
         onClick={ () => onClick() }
         style={ { background: isActive ? '#24554E' : '#fff' } }
      >
         {isOpenDeleteModal && (
            <DeleteModal
               title={ ` Permanently delete the chat with ${ name }?` }
               deleteText='Delete'
               onCancel={ (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpenDeleteModal(false);
               } }
               onDelete={ (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteChat();
                  setIsOpenDeleteModal(false);
               } }
               maxWidth={ 414 }
            />
         )}
         <Popover
            open={ isOpenMenu }
            anchorEl={ anchorEl }
            onClose={ () => setIsOpenMenu(false) }
            className='custom-popover'
            elevation={ 24 }
            style={ {
               marginTop: '40px',
               marginLeft: '150px',
            } }
            anchorOrigin={ {
               vertical: 'top',
               horizontal: 'right',
            } }
            transformOrigin={ {
               vertical: 'top',
               horizontal: 'right',
            } }
         >
            <div className='triggle__popover'>
               <div className='triggle__popover__flex'>
                  {userOptions.map((option) => {
                     return (
                        <div
                           onClick={ (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              option.onClick(e); setIsOpenMenu(false);
                           } }
                           role='presentation'
                           key={ uuidv4() }
                           style={ option.style || {} }
                           className={ `triggle__popover__item ${ option.trash && userOptions.length > 1 && 'triggle__popover__item__border' }${ option.trash ? ' triggle__popover__item__trash' : ` triggle__popover__item__${ option.iconName }` }` }
                        >
                           <IconNew name={ option.iconName } />
                           <Text
                              inner={ option.name }
                              type={ types.regularDefault }
                              size={ sizes.small }
                              style={ { ...(option.textOptions || {}) } }
                           />
                        </div>
                     );
                  })}
               </div>
            </div>
         </Popover>
         <MessengerUserProfile
            text={ lastMessageText || 'No message yet' }
            name={ name }
            isOnline={ isOnline }
            chatRoomId={ chatRoomId }
            isActive={ isActive }
            isAdmin={ isAdmin }
            image={ image }
            time={ time }
            messagesNotificationsCount={ messagesNotificationsCount }
         />
         {/* <div className='messenger__right__left__wrapper'>
            <MessengerUserProfile
               text={ lastMessageText || 'No message yet' }
               name={ name }
               isOnline={ isOnline }
               chatRoomId={ chatRoomId }
               isActive={ isActive }
               image={ image }
               time={ time }
            />
            {messagesNotificationsCount !== 0 && (
               <div className='messenger__user__right__messages'>
                  <Text
                     inner={ messagesNotificationsCount }
                     type={ types.medium150 }
                     size={ sizes.xsmall }
                     style={ { color: '#fff' } }
                  />
               </div>
            )}
         </div> */}
      </div>
   );
};

MessengerLeftUser.propTypes = {
   image: PropTypes.string,
   name: PropTypes.string,
   lastMessage: PropTypes.object,
   time: PropTypes.string,
   isActive: PropTypes.bool,
   isOnline: PropTypes.bool,
   onClick: PropTypes.func,
   messagesNotificationsCount: PropTypes.number,
   id: PropTypes.number,
   deleteChat: PropTypes.func,
   isHidenDeleteActions: PropTypes.bool,
   chatRoomId: PropTypes.number,
   handleMuteUser: PropTypes.func,
   isMuted: PropTypes.string,
   isAdmin: PropTypes.bool,
};

export default MessengerLeftUser;
