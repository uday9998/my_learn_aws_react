import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';
import Input from 'components/elements/inputNew';
import SliceAndConnectText from 'utils/getSplitedText';
import IconNew from 'components/elements/iconsSize';
import MessengerLeftUser from '../MessengerLeftUser';
import CommunityMessengerLeftGroup from '../CommunityMessengerLeftGroup';

const CommunityMessengerLeft = () => {
   const {
      searchMessages, setSearchMessages, initialLength, messages, handleSelectMember, selectedConverstation,
      onlineUsersIds, role, deleteChat, groupChat, handleMuteUser, community, selectedUserRole
   } = React.useContext(CommunityMessengerContext);

   const [isOpen, setIsOpen] = useState(true);

   const handleNewMember = (e) => {
      handleSelectMember(e, undefined, e.unread_messages_count);
   };

   return (
      <div
         className={ `community__messenger__left ${ isOpen ? 'opened' : 'closed' }` }
      >
         <div
            className='community__messenger_switcher'
            role='presentation'
            onClick={ () => setIsOpen(!isOpen) }
         >
            <IconNew name='ChevronLeftL' style={ !isOpen ? { transform: 'rotate(180deg)' } : {} } />
         </div>
         <div className='community__messenger__left__top'>
            <Text
               inner='Members'
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
            <Input
               value={ searchMessages }
               type='search'
               placeholder='Start typing name'
               onChange={ (name, value) => setSearchMessages(value) }
            />
         </div>
         {!initialLength ? (
            <div className='community__messenger__left__empty'>
               <Text
                  inner='No messages yet'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#444C4B' } }
               />
            </div>
         ) : (
            <div className='community__messenger__left__users'>
               {groupChat && (
                  <CommunityMessengerLeftGroup
                     id={ groupChat.id }
                     lastMessage={ 
                        groupChat.last_message && groupChat.last_message?.type 
                           ? groupChat.last_message : (community.group_last_message || {}) 
                     }
                     isLocaltime={ groupChat.last_message ? groupChat.last_message.isLocaltime : null }
                     isActive={ selectedConverstation && selectedConverstation.isGroup }
                     messagesNotificationsCount={ groupChat.unread_messages_count || 0 }
                     time={ groupChat.last_message ? groupChat.last_message.created_at : '' }
                     setIsOpenLeft={ setIsOpen }
                  />
               )}
               {messages.sort((a, b) => b.unread_messages_count - a.unread_messages_count).map((e) => {
                  return (
                     <MessengerLeftUser
                        key={ e.member.id }
                        handleMuteUser={ () => handleMuteUser(e.member.uuid, e.chat_room_id, !!e.member.muted_since) }
                        id={ e.member.id }
                        isMuted={ e.member.muted_since }
                        isAdmin={ !!e.member.role }
                        isHidenDeleteActions={ role === 'member' }
                        deleteChat={ () => {
                           if (e.member && e.chat_room_id) {
                              deleteChat(e.chat_room_id);
                           }
                        } }
                        chatRoomId={ e.chat_room_id }
                        isOnline={ onlineUsersIds.includes(e.member.uuid) }
                        time={ e.last_message ? e.last_message.created_at : '' }
                        isActive={ selectedConverstation
                           && !selectedConverstation.isGroup
                           && selectedConverstation[selectedUserRole]
                           && e.member.id === selectedConverstation[selectedUserRole].member.id
                        }
                        lastMessage={ e.last_message }
                        // messagesNotificationsCount={ role === 'member' ? e.unread_messages_count_of_second_participant : e.unread_messages_count }
                        messagesNotificationsCount={ e.unread_messages_count }
                        image={ e.member.picture_full_src }
                        onClick={ () => {
                           setIsOpen(false);
                           handleNewMember(e);
                        } }
                        name={ SliceAndConnectText(e.member.name, 15) }
                     />
                  );
               })}
            </div>
         )}
      </div>
   );
};

export default CommunityMessengerLeft;
