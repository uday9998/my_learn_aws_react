import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import { connect } from 'react-redux';
import * as operations from 'state/modules/community/operations';
import * as selectors from 'state/modules/community/selectors';
import ComponentProgress from 'components/modules/ComponentProgress';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory, useLocation } from 'react-router-dom';
import CommunityMessenger from 'views/pages/community/Messenger';
import socketIOClient from 'socket.io-client';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import generateServerDate from 'utils/generateDate';
import { updateMessagesSocket, updateUnreadMesssagesCount } from 'state/modules/community/actions';
import { apiUrl, getMessengerGroupChat, userMuteUnmuteMessenger } from 'api';
import { toast } from 'react-toastify';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { searchWordInMessage } from 'utils/searchMessage';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import CommunityMenuFooter from 'containers/pages/admin/community/menuFooter';
import { CommunityMessengerContext } from './context';

const CommunityMessengar = ({
   progress, getCommunity, match, user, messages, messagesLoading,
   // eslint-disable-next-line no-unused-vars
   messagesInitialCount, filterMessenger, uuid, messagesHistory, getMemberMessages, role,
   goToMemberProfile, updateMessages, community, updateUnreadMessagesCount,
}) => {
   const { isMobile } = useWindowSizeChange();
   const location = useLocation();

   // states
   const [searchMessages, setSearchMessages] = useState('');
   const socket = React.useRef(null);
   const [message, setMessage] = React.useState('');
   const [selectedConverstation, setSelectedConverstation] = React.useState(null);
   const chatRoomID = React.useRef();
   const [typingData, setTypingData] = React.useState(null);
   const isHaveTypingTymeOut = React.useRef(false);
   const selectedConversationRef = React.useRef();
   const selectedUserRole = React.useRef();
   const loginedUserRole = React.useRef();
   const messagesRef = React.useRef(messages);
   const onlineUsersIds = React.useRef([]);
   const [onlineUsers, setOnlineUsers] = React.useState([]);
   const [socketConnected, setSocketConnected] = React.useState(false);
   const history = useHistory();
   const [groupChat, setGroupChat] = React.useState();
   const groupChatRef = React.useRef();
   const [getGroupMessages] = useSubmitForm(getMessengerGroupChat);
   const [mute] = useSubmitForm(userMuteUnmuteMessenger);
   const initialUnreadMessagesRef = React.useRef();
   const [isSearchActive, setIsSearchActive] = React.useState(false);
   const [search, setSearch] = React.useState('');
   // end states


   // events handler
   const addMessageToMembersList = (userInfo, messageData, isOnMessage, chatRoomId) => {
      try {
         if (chatRoomId === groupChatRef.current.id) {
            groupChatRef.current.last_message = messageData;
            if (isOnMessage) {
               groupChatRef.current = {
                  ...groupChatRef.current,
                  unread_messages_count: groupChatRef.current.unread_messages_count + 1,
               };
               initialUnreadMessagesRef.current += 1;
               updateUnreadMessagesCount(initialUnreadMessagesRef.current);
            }
            setGroupChat(groupChatRef.current);
         }
         const newMessages = messagesRef.current.map((e) => {
            if (e.member.uuid === userInfo.uuid && e.chat_room_id === chatRoomId) {
               const newMemberMessages = e;
               newMemberMessages.last_message = messageData;
               if (isOnMessage) {
                  newMemberMessages.unread_messages_count += 1;
                  newMemberMessages.unread_messages_count_of_second_participant += 1;
                  initialUnreadMessagesRef.current += 1;
                  updateUnreadMessagesCount(initialUnreadMessagesRef.current);
               }
               return newMemberMessages;
            }
            return e;
         });
         updateMessages(newMessages);
      } catch (error) {
      }
   };
   const muteUnmuteEvent = (mutedSince, memberuuId) => {
      if (selectedConversationRef.current && !selectedConversationRef.current.isGroup) {
         selectedConversationRef.current = {
            ...selectedConversationRef.current,
            member: {
               ...selectedConversationRef.current.member,
               member: {
                  ...selectedConversationRef.current.member.member,
                  muted_since: mutedSince,
               },
            },
         };
         setSelectedConverstation(selectedConversationRef.current);
      }
      const newMessages = messagesRef.current.map((e) => {
         if (e.member.uuid === memberuuId) {
            const newMemberMessages = e;
            newMemberMessages.member.muted_since = mutedSince;
            return newMemberMessages;
         }
         return e;
      });
      updateMessages(newMessages);
   };

   const clearConversationCallBack = (id) => {
      if (selectedConversationRef.current && id === selectedConversationRef.current[loginedUserRole.current].chat_room_id) {
      // clear selected conversation messages
         selectedConversationRef.current = {
            ...selectedConversationRef.current,
            [loginedUserRole.current]: {
               ...selectedConversationRef.current[loginedUserRole.current],
               chat_room: {
                  ...selectedConversationRef.current[loginedUserRole.current].chat_room || {},
                  messages: [],
               },
            },
         };
         setSelectedConverstation(selectedConversationRef.current);
      }
      try {
         const newMessages = messagesRef.current.map((e) => {
            if (e.chat_room_id === id) {
               const newMemberMessages = e;
               newMemberMessages.last_message = {};
               newMemberMessages.unread_messages_count = 0;
               newMemberMessages.unread_messages_count_of_second_participant = 0;
               return newMemberMessages;
            }
            return e;
         });
         updateMessages(newMessages);
      } catch (error) {
      }
   };

   const onConversationSeen = ({ conversationId }) => {
      try {
         if (selectedConversationRef.current.isGroup) {
            groupChatRef.current.unread_messages_count = 0;
            initialUnreadMessagesRef.current -= groupChatRef.current.unread_messages_count;
            updateUnreadMessagesCount(initialUnreadMessagesRef.current);
            setGroupChat(groupChatRef.current);
         }
         const newMessages = messagesRef.current.map((e) => {
            if (e.chat_room_id === conversationId) {
               const newMemberMessages = e;
               initialUnreadMessagesRef.current -= newMemberMessages.unread_messages_count;
               updateUnreadMessagesCount(initialUnreadMessagesRef.current);
               newMemberMessages.unread_messages_count = 0;
               newMemberMessages.unread_messages_count_of_second_participant = 0;
               return newMemberMessages;
            }
            return e;
         });
         updateMessages(newMessages);
      } catch (error) {
      }
   };

   const addMessageToConversation = (messageData, conversationId) => {
      if (
         selectedConversationRef.current
         && selectedConversationRef.current[loginedUserRole.current].chat_room_id === conversationId
      ) {
         selectedConversationRef.current = {
            ...selectedConversationRef.current,
            [loginedUserRole.current]: {
               ...selectedConversationRef.current[loginedUserRole.current],
               chat_room: {
                  ...selectedConversationRef.current[loginedUserRole.current].chat_room || {},
                  messages: [
                     ...selectedConversationRef.current[loginedUserRole.current].chat_room?.messages || [],
                     {
                        ...messageData,
                        ...messageData.user,
                        member_uuid: messageData.user.uuid,
                     },
                  ],
               },
            },
         };
         setSelectedConverstation(selectedConversationRef.current);
         setTypingData(null);
         const element = document.querySelector('.messenger__content');
         element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
      }
   };

   const onMessage = (data) => {
      const {
         message: messageInfo, conversationId, user: userInfo,
      } = data;
      const messageData = {
         ...messageInfo,
         user: userInfo,
         parent: messageInfo.parentMessage,
         sent_at: messageInfo.sentAt,
         created_at: messageInfo.sentAt,
         isLocalTime: true,
         unlock_details: messageInfo.unlockDetails,
      };
      addMessageToMembersList(userInfo, messageData, true, conversationId);
      addMessageToConversation(messageData, conversationId);
   };
   const onTypingListener = (data) => {
      setTypingData(data);
      if (!isHaveTypingTymeOut.current) {
         setTimeout(() => {
            setTypingData(null);
            isHaveTypingTymeOut.current = false;
         }, 3000);
      }
   };
   const onOnlineUsers = (data) => {
      onlineUsersIds.current = [...onlineUsersIds.current, ...data.map((e) => e.uuid)];
      setOnlineUsers(onlineUsersIds.current);
   };
   const onOnlineUser = (data) => {
      onlineUsersIds.current = [...onlineUsersIds.current, data.uuid];
      setOnlineUsers(onlineUsersIds.current);
   };

   const offlineUser = (data) => {
      onlineUsersIds.current = onlineUsersIds.current.filter((e) => e !== data.uuid);
      setOnlineUsers(onlineUsersIds.current);
   };

   const onMessageDelete = (data) => {
      const { conversationId, messageId, last_message: lastMessage } = data;
      if (
         selectedConversationRef.current
         && conversationId === selectedConversationRef.current[loginedUserRole.current].chat_room_id
      ) {
         selectedConversationRef.current = {
            ...selectedConversationRef.current,
            [loginedUserRole.current]: {
               ...selectedConversationRef.current[loginedUserRole.current],
               chat_room: {
                  ...selectedConversationRef.current[loginedUserRole.current].chat_room,
                  messages: selectedConversationRef.current[loginedUserRole.current].chat_room?.messages?.filter(e => {
                     return e.id !== messageId;
                  }) || [],
               },
            },
         };
         setSelectedConverstation(selectedConversationRef.current);
      }
      if (
         selectedConversationRef.current
         && conversationId === groupChatRef.current.id && selectedConversationRef.current.isGroup
      ) {
         // eslint-disable-next-line max-len
         groupChatRef.current.last_message = (selectedConversationRef.current[loginedUserRole.current].chat_room?.messages || []).at(-1) || {};
         setGroupChat(groupChatRef.current);
      }
      const newMessages = messagesRef.current.map((e) => {
         if (e.chat_room_id === conversationId) {
            const newMemberMessages = {
               ...e,
               last_message: lastMessage,
            };
            return newMemberMessages;
         }
         return e;
      });
      updateMessages(newMessages);
   };

   const onFocusInput = (currentRole = role || 'admin') => {
      socket.current.emit('conversation:read', {
         conversationId: selectedConversationRef.current[currentRole].chat_room_id,
      });
      onConversationSeen({ conversationId: selectedConversationRef.current[currentRole].chat_room_id });
   };

   const getMemberMessagesHandler = (memberUuid, selectedRole) => {
      getMemberMessages(match.params.id, memberUuid, (item) => {
         setSelectedConverstation(item);
         selectedConversationRef.current = item;
         selectedUserRole.current = selectedRole;
         setMessage('');
         const element = document.querySelector('trix-editor');
         if (element) {
            element.focus();
         }
         chatRoomID.current = item.chat_room_id;

         onFocusInput(selectedRole);
         history.replace({ ...location, state: { uuid: memberUuid, role: selectedRole } });
      });
   };

   const getGroupMessagesHandler = (chatRoomId) => {
      getGroupMessages(match.params.id, (result) => {
         selectedConversationRef.current = {
            chat_room_id: chatRoomId,
            // enableGroupMessage : result
            member: {
               chat_room_id: chatRoomId,
               member: user,
               chat_room: {
                  messages: result,
               },
            },
            admin: {
               chat_room_id: chatRoomId,
               member: user,
               chat_room: {
                  messages: result,
               },
            },
            isGroup: true,
         };
         selectedUserRole.current = loginedUserRole.current;
         setSelectedConverstation(selectedConversationRef.current);
         setMessage('');
         const element = document.querySelector('trix-editor');
         if (element) {
            element.focus();
         }
         onFocusInput();
         history.replace({ ...location, state: { chatRoomId } });
      });
   };

   // end handlers

   // effects
   useEffect(() => {
      getCommunity(match.params.id, user.id, true);
      const { uuid: memberUuid, role: selectedRole, chatRoomId } = location.state || {};

      if (chatRoomId) return;

      if (memberUuid && selectedRole) {
         getMemberMessagesHandler(memberUuid, selectedRole);
      }
   }, []);
   useEffect(() => {
      if (community && community.id && community.chat_room && community.isMessenger) {
         if (!groupChatRef.current) {
            const groupRoom = community.chat_room.find((e) => e.type === 'public');
            groupChatRef.current = {
               ...groupRoom,
               unread_messages_count: community.unread_count,
               unread_messages_count_of_second_participant: 0,
               last_message: {
                  ...community.group_last_message,
                  isLocaltime: true,
               },
            };
            const { chatRoomId } = location.state || {};

            if (chatRoomId) getGroupMessagesHandler(chatRoomId);
            setGroupChat(groupChatRef.current);
         }
         initialUnreadMessagesRef.current = community.count_unread_messages;
      }
   }, [community]);
   useEffect(() => {
      messagesRef.current = messages;
   }, [messages]);
   useEffect(() => {
      loginedUserRole.current = role;
   }, [role]);
   useEffect(() => {
      const socketUrl = `${ apiUrl }/chat`;
      socket.current = socketIOClient(socketUrl, {
         autoConnect: true,
         path: '/websocket',
         transports: ['websocket', 'polling'],
         forceNew: true,
         reconnectionDelay: 50,
         auth: (cb) => {
            cb({
               token: `${ localStorage.getItem('authToken') }:${ uuid }`,
               communityId: match.params.id,
            });
         },
      });
      socket.current.connect();
      socket.current.removeAllListeners('connect_error');
      socket.current.removeAllListeners('disconnect');
      socket.current.removeAllListeners('connect');
      socket.current.removeAllListeners('ready');
      socket.current.removeAllListeners('users:online');
      socket.current.removeAllListeners('user:online');
      socket.current.removeAllListeners('user:offline');
      socket.current.removeAllListeners('typing');
      socket.current.removeAllListeners('message:like');
      socket.current.removeAllListeners('message:delete');
      socket.current.removeAllListeners('message:send');

      socket.current.removeAllListeners('message:update');
      socket.current.removeAllListeners('conversation:read');
      socket.current.removeAllListeners('user:mute');
      socket.current.removeAllListeners('user:unmute');
      socket.current.removeAllListeners('conversation:seen');

      socket.current.on('connect', () => {
         socket.current.emit('online');
         setSocketConnected(true);
      });

      socket.current.on('disconnect', () => {
         setSocketConnected(false);
      });


      socket.current.on('users:online', onOnlineUsers);
      socket.current.on('user:online', onOnlineUser);
      socket.current.on('user:offline', offlineUser);

      socket.current.on('message:delete', onMessageDelete);

      socket.current.on('connect_error', () => {
         setSocketConnected(false);
      });

      socket.current.on('typing', onTypingListener);
      socket.current.on('user:mute', (data) => {
         muteUnmuteEvent(data.muteInfo.muted_since, data.userUuid);
      });
      socket.current.on('user:unmute', (data) => {
         muteUnmuteEvent(null, data.userUuid);
      });
      socket.current.on('message:send', onMessage);
      socket.current.on('chat:delete', (data) => {
         clearConversationCallBack(data.conversationId);
      });
      // socket.current.on('conversation:seen', onConversationSeen);
      return () => {
         socket.current.disconnect();
      };
   }, []);

   // end effects

   // socket

   const updateConverstationsAfterMessageSend = (data, sendMessageData) => {
      if (data.error) {
         switch (data.error) {
            case 'message_is_too_long':
               toast.error('Message must be 20000 characters or less');
               break;
            case 'conversation_is_not_active':

               break;
            case 'incorrect_payload':
               break;

            case 'internal_server_error':
               break;

            case 'access_denied':
               break;

            default:
               break;
         }
         return;
      }
      const { messageId, message: newMessage } = data.data;
      const messageData = {
         ...sendMessageData,
         id: messageId,
         member_uuid: user.uuid,
         user: {
            uuid: user.uuid,
            username: user.name,
         },
         created_at: newMessage.sentAt,
         isLocalTime: true,
      };

      let roomId = selectedConversationRef.current[role].chat_room_id;
      if (sendMessageData.conversationId !== undefined) {
         roomId = sendMessageData.conversationId;
      }

      addMessageToMembersList(selectedConversationRef.current[selectedUserRole.current].member, messageData, false, roomId);
      addMessageToConversation(messageData, roomId);
   };

   const onSendMessage = (text) => {
      const roomId = selectedConversationRef.current[role].chat_room_id;

      const sendMessageData = {
         'type': selectedConversationRef.current.isGroup ? 'text_message' : 'text_message',
         'text': text || message,
         'sentAt': Date.now(),
         conversationId: roomId,
      };
      setMessage('');
      socket.current.emit('message:send', sendMessageData, (data) => {
         updateConverstationsAfterMessageSend(data, sendMessageData);
      });
   };

   const onSendFile = (file, name, type) => {
      const sendMessageData = {
         'type': 'file_unlock',
         'text': message,
         'sentAt': Date.now(),
         created_at: generateServerDate(),
         conversationId: selectedConverstation[role].chat_room_id,
         'resources': [file, name],
         'resourceType': type,
         'isUnlocked': 1,
         'unlockPrice': 1,
      };
      socket.current.emit('message:send', sendMessageData, (data) => updateConverstationsAfterMessageSend(data, {
         ...sendMessageData,
         unlock_details: JSON.stringify({
            name,
            src: file,
            extension: type,
         }),
      }));
   };

   const messageDelete = (messageId) => {
      socket.current.emit('message:delete', {
         conversationId: selectedConverstation[role].chat_room_id,
         messageId,
      });
      onMessageDelete({
         conversationId: selectedConverstation[role].chat_room_id,
         messageId,
         last_message: (selectedConversationRef.current[loginedUserRole.current].chat_room?.messages || []).at(-2),
      });
   };

   const onTyping = (value) => {
      if (value.length) {
         socket.current.emit('typing', {
            text: value,
            conversationId: selectedConversationRef.current[role].chat_room_id,
         });
      }
      setMessage(value);
   };

   const handleSelectMember = (data, isGroup, messagesNotificationsCount = 0) => {
      // const memberId = data.member.id;
      // const isInited = messagesHistory.find((e) => e.admin.member.id === memberId);
      // if (isInited) {
      //    selectedConversationRef.current = isInited;
      //    setSelectedConverstation(isInited);
      //    chatRoomID.current = isInited.chat_room_id;
      //    return;
      // }
      updateUnreadMessagesCount(initialUnreadMessagesRef.current - messagesNotificationsCount);
      if (isSearchActive || search) {
         setIsSearchActive(false);
         setSearch('');
      }

      if (isGroup) {
         getGroupMessagesHandler(data);
         return;
      }

      const selectedRole = data.member.role ? 'admin' : 'member';
      if (
         selectedConversationRef.current?.[selectedRole]
         && data.member.uuid === selectedConversationRef.current[selectedRole].member.uuid
      ) {
         return;
      }

      getMemberMessagesHandler(data.member.uuid, selectedRole);
   };

   const handleMuteUser = (memberuuId, conversationId, isMuted) => {
      mute({
         communityId: match.params.id,
         memberuuId,
         conversationId,
         isMuted,
      });
   };

   // end socket
   const handleSearch = (text) => {
      filterMessenger(match.params.id, text, user.id);
      setSearchMessages(text);
   };

   const deleteChat = (id) => {
      socket.current.emit('chat:delete', {
         conversationId: id,
      });
      clearConversationCallBack(id);
      // clearConversation(match.params.id, id, clearConversationCallBack);
   };

   const filterMessages = (currentMessages = [], searhcArray) => {
      return currentMessages.filter((e) => {
         if (e.type === 'file_unlock') {
            const name = JSON.parse(e.unlock_details).name;
            return searchWordInMessage(name, searhcArray);
         }

         return searchWordInMessage(e.text, searhcArray);
      });
   };

   const handleSearchMessage = (value) => {
      const searchWords = value.trim().split(' ');
      filterMessages(selectedConversationRef.current[loginedUserRole.current].chat_room?.messages, searchWords);
      setSearch(value);
   };

   const getFilteredMessages = () => {
      return filterMessages(selectedConversationRef.current[loginedUserRole.current].chat_room?.messages, search.trim().split(' '));
   };

   const isMainPage = (isShow) => {
      if (isMobile) {
         if (isShow) {
            return window.location.pathname === Router.route('ADMIN_COMMUNITY').getCompiledPath({ id: match.params.id }) && window.location.hash === '';
         } 
         return !(window.location.pathname === Router.route('ADMIN_COMMUNITY').getCompiledPath({ id: match.params.id }) && window.location.hash === '');
      }
      return true;
   };

   return (
      <ComponentProgress loading={ progress || messagesLoading }>
         <div className='community'>
            <HeaderTypeFirst
               title='Messenger'
               goBack={ () => history.goBack() }
            />
            <div className='community__bottom community__sidebar__mobile__other' style={ { height: 'auto' } }>
               {!isMobile && <CommunitySideBar user={ user } />}
               <CommunityMessengerContext.Provider
                  value={ {
                     searchMessages,
                     setSearchMessages: handleSearch,
                     initialLength: messagesInitialCount,
                     messages,
                     message,
                     onSendMessage,
                     groupChat,
                     onTyping,
                     selectedConverstation: selectedConversationRef.current,
                     community,
                     handleSelectMember,
                     role,
                     selectedUserRole: selectedUserRole.current,
                     userUuid: user.uuid,
                     openMember: (id) => goToMemberProfile(match.params.id, id),
                     typingData,
                     onlineUsersIds: onlineUsers,
                     socketConnected,
                     messageDelete,
                     onSendFile,
                     onFocusInput,
                     deleteChat,
                     handleMuteUser,
                     isSearchActive,
                     setIsSearchActive,
                     search,
                     handleSearchMessage,
                     getFilteredMessages,
                  } }
               >
                  <CommunityMessenger />
               </CommunityMessengerContext.Provider>
            </div>
            {isMobile && (
               <CommunityMenuFooter
                  user={ user }
                  role={ role }
                  community={ community }
                  isMobile={ isMobile }
                  isMessenger={ true }
                  goToMemberProfile={ (memberId) => goToMemberProfile(match.params.id, memberId) }
               />
            )}
         </div>
      </ComponentProgress>
   );
};

CommunityMessengar.propTypes = {
   match: PropTypes.object,
   progress: PropTypes.bool,
   user: PropTypes.object,
   getCommunity: PropTypes.func,
   role: PropTypes.string,
   messages: PropTypes.array,
   messagesLoading: PropTypes.bool,
   messagesInitialCount: PropTypes.number,
   uuid: PropTypes.string,
   filterMessenger: PropTypes.func,
   getMemberMessages: PropTypes.func,
   goToMemberProfile: PropTypes.func,
   messagesHistory: PropTypes.array,
   updateMessages: PropTypes.func,
   community: PropTypes.object,
   updateUnreadMessagesCount: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      progress: selectors.communityProgressSelector(state),
      community: selectors.communitySelector(state),
      user: state.common.authUser,
      role: selectors.selectLoginedUserRole(state),
      messages: selectors.messagesSelector(state),
      messagesLoading: selectors.messagesLoadingSelector(state),
      uuid: state.common.authUser.uuid,
      messagesInitialCount: selectors.messagesInitialCountSelector(state),
      messagesHistory: selectors.messagesHistorySelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCommunity: (id, userId, isMessenger) => {
         dispatch(operations.getCommunityOperation(id, userId, isMessenger));
      },
      filterMessenger: (id, text, userId) => {
         dispatch(operations.filterMessenger(id, text, userId));
      },
      getMemberMessages: (communityId, uuid, callBack) => {
         dispatch(operations.getConversationsByUuid(communityId, uuid, callBack));
      },
      goToMemberProfile: (id, memberId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_MEMBER_PROFILE').getCompiledPath({
                  id,
                  memberId,
               })
            )
         );
      },
      updateMessages: (data) => {
         dispatch(updateMessagesSocket(data));
      },
      updateUnreadMessagesCount: (count) => {
         dispatch(updateUnreadMesssagesCount(count));
      },
      // clearConversation: (communityId, conversationId, callBack) => {
      //    dispatch(operations.clearConversation(communityId, conversationId, callBack));
      // },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityMessengar);
