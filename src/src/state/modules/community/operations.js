import {
   createEvent, createRoom, getCommunity, PinOrUnPinEvent, bulkArchvieEvent, multiDuplicateEvents, getRoom,
   getEventSettings,
   updateEventSettings,
   bulkDeleteEvent,
   deleteRoom,
   postCreate,
   inviteMember,
   postComment,
   postReplyComment,
   postLike,
   postCommentLike,
   addExternalLink,
   deleteExternalLink,
   updateRoom,
   saveCommunitySettings,
   userVote,
   getCommunityMember,
   communityMemberSubscribe,
   communityMemberRemove,
   filterCommunityMember,
   getCommunityMembers,
   MembersFollowUnfollow,
   MemberDeleteList,
   MemberListReport,
   markAsRead,
   getMembersForChat,
   getConversationMessages,
   deleteConversationMessages,
   getMessengerGroupChat,
   eventComment,
   eventCommentLike,
   eventReplyComment,
   postDelete,
   postCommentDelete,
   eventCommentDelete,
   communityBannerImage,
   createBridge,
   pinCommunityPost,
   unreadGroupChatCount,
} from 'api';
import { toast } from 'react-toastify';
import { ErrorPrinter } from 'utils/error';
import QueryParams from 'utils/QueryParams';
import filterMessengerMembers from 'utils/filterMessengerMember';
import isPrint from '../designCourse/edit/Error';
import * as actions from './actions';

export const initMessenger = (communityId, userId) => {
   return async (dispatch) => {
      try {
         dispatch(actions.initMessengerStart());
         const { data } = await getMembersForChat(communityId);
         dispatch(actions.initMessengerCompleted(filterMessengerMembers(data, userId)));
      } catch (error) {
         dispatch(actions.initMessengerFailed());
      }
   };
};

export const filterMessenger = (communityId, searchText, userId) => {
   return async (dispatch) => {
      try {
         const { data } = await getMembersForChat(communityId, searchText);
         dispatch(actions.filtersMessengerCompleted(filterMessengerMembers(data, userId)));
      } catch (error) {
      }
   };
};

export const getCommunityOperation = (id, userId, isMessenger, redirectFunc) => {
   return async dispatch => {
      dispatch(actions.getCommunityStart());
      try {
         const { data } = await getCommunity(id);
         const communityMember = data?.community_member?.find((e) => e.id === userId);
         if (!data.joined && !communityMember) {
            redirectFunc(data);
         }
         let group = {};
         let unreadCount;
         if (isMessenger) {
            group = await getMessengerGroupChat(id);
            initMessenger(id, userId)(dispatch);
         }
         if (data.joined || communityMember) {
            unreadCount = await unreadGroupChatCount(id);
            dispatch(
               actions.getCommunityCompleted(
                  {
                     ...data,
                     unread_count: unreadCount?.data?.unread_count || 0,
                     isMessenger,
                     group_last_message: group.data
                     && Array.isArray(group.data) ? group.data.at(-1) : {}, 
                  }, userId
               )
            );
         }
      } catch (error) {
         if (error && error.response && error.response.data) {
            window.location.replace('/portal/community');
         } else if (error && error.response && error.response.data && error.response.data.errors) {
            if (isPrint(error.response.data.errors)) {
               toast.error(error.response.data.errors);
               window.location.replace('/portal/community');
            }
            ErrorPrinter(error.response);
         }
         dispatch(actions.getCommunityFailed());
      }
   };
};


export const createBridgeOperation = (data) => {
   return async (dispatch) => {
      dispatch(actions.createBridgeStart());
      try {
         await createBridge(data);
         dispatch(actions.createBridgeComplete(data));
         if (isPrint('Bridge page saved successfuly.')) {
            toast.success('Bridge page saved successfuly.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(actions.createBridgeFailed(error.response.data));
         }
         if (error.response && error.response.status !== 401) {
            if (error.response && error.response.data && error.response.data) {
               if (isPrint(error.response.data)) {
                  toast.error(error.response.data);
               }
            } else if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const createRoomCommunity = (data, communityId, groupId, callBack) => {
   return async dispatch => {
      dispatch(actions.createRoomStart());
      try {
         const room = await createRoom(communityId, groupId, data);
         dispatch(actions.createRoomCompleted(room));
         if (isPrint('Room created successfully.')) {
            toast.success('Room created successfully.');
         }
         callBack(room.data);
      } catch (error) {
         dispatch(actions.createRoomEnd());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const deleteRoomCommunity = (communityId, groupId, roomId) => {
   return async (dispatch) => {
      dispatch(actions.deleteRoomStart());
      try {
         await deleteRoom(communityId, groupId, roomId);
         dispatch(actions.deleteRoomCompleted(roomId));
         QueryParams.setHash('');
         if (isPrint('Room deleted successfully.')) {
            toast.success('Room deleted successfully.');
         }
      } catch (error) {
         dispatch(actions.createRoomEnd());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const createEventOperation = (communityId, roomId, groupId, inputs, callback) => {
   return async dispatch => {
      dispatch(actions.createEventStart());
      try {
         const { data } = await createEvent(communityId, roomId, groupId, inputs);
         if (isPrint('Event created successfully.')) {
            toast.success('Event created successfully.');
         }
         callback();
         dispatch(actions.createEventCompleted(data, roomId));
      } catch (error) {
         dispatch(actions.createEventFailed());

         if (error && error.response && error.response.data) {
            if (error.response.data.errors) {
               if (isPrint(error.response.data.errors)) {
                  toast.error(error.response.data.errors);
               }
            }
            ErrorPrinter(error.response);
         }
      }
   };
};

export const eventPinUnpinOperation = (communityId, roomId, groupId, eventId, num) => {
   return async dispatch => {
      dispatch(actions.eventChangesStart());
      try {
         await PinOrUnPinEvent(communityId, roomId, groupId, eventId, num);
         const message = `Event ${ num === 1 ? 'pinned' : 'unpinned' } successfully.`;
         dispatch(actions.EventUnPinCompleted(eventId, num));
         if (isPrint(message)) {
            toast.success(message);
         }
      } catch (error) {
         dispatch(actions.eventChangesEnd());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const postPinUnpinOperation = (communityId, roomId, groupId, postId, num) => {
   return async dispatch => {
      dispatch(actions.postChangesStart());
      try {
         await pinCommunityPost(communityId, roomId, groupId, postId, num);
         const message = `Post ${ num === 1 ? 'pinned' : 'unpinned' } successfully.`;
         dispatch(actions.postUnPinCompleted(postId, num));
         if (isPrint(message)) {
            toast.success(message);
         }
      } catch (error) {
         dispatch(actions.postChangesEnd());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};


export const archiveEventsOperation = (communityId, roomId, groupId, ids, callBack) => {
   return async dispatch => {
      dispatch(actions.eventChangesStart());
      try {
         await bulkArchvieEvent(communityId, roomId, groupId, ids.join(','));
         dispatch(actions.archiveEventsCompleted(ids));
         callBack();
      } catch (error) {
         dispatch(actions.eventChangesEnd());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const deleteEventOperation = (communityId, ids, callBack) => {
   return async dispatch => {
      dispatch(actions.eventChangesStart());
      try {
         await bulkDeleteEvent(communityId, ids.join(','));
         dispatch(actions.archiveEventsCompleted(ids));
         callBack();
      } catch (error) {
         dispatch(actions.eventChangesEnd());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const commentEventOperation = (communityId, groupId, roomId, eventId, text) => {
   return async dispatch => {
      try {
         const { data } = await eventComment(communityId, groupId, roomId, eventId, text);
         dispatch(actions.eventCommentCompleted(eventId, data));
         if (isPrint('Your comment has been posted.')) {
            toast.success('Your comment has been posted.');
         }
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const eventCommentLikeOperation = (communityId, groupId, roomId, eventId, commentId, parentId) => {
   return async dispatch => {
      try {
         await eventCommentLike(communityId, groupId, roomId, eventId, commentId);
         dispatch(actions.eventCommentLikeCompleted(eventId, commentId, parentId));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const eventReplyCommentOperation = (communityId, groupId, roomId, eventId, commentId, text) => {
   return async dispatch => {
      try {
         const { data } = await eventReplyComment(communityId, groupId, roomId, eventId, commentId, text);
         dispatch(actions.eventReplyCommentCompleted(eventId, commentId, data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const getRoomAndFilterOperation = (communityId, roomId, groupId, query) => {
   return async dispatch => {
      dispatch(actions.getRoomStart());
      try {
         if (roomId === 'welcome') {
            dispatch(actions.getRoomFailed());
            return;
         }
         const { data } = await getRoom(communityId, roomId, groupId, query || '');
         QueryParams.setCommunityHash(`${ roomId }-${ groupId }-${ data.rooms.type }`, communityId);
         dispatch(actions.getRoomCompleted(data));
      } catch (error) {
         dispatch(actions.getRoomFailed());
         if (error && error.response && error.response.data && error.response.data.error) {
            if (isPrint(error.response.data.error)) {
               toast.error(error.response.data.error);
            }
         } else if (error && error.response && error.response.data && error.response.data.errors) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const filterRoomOperation = (communityId, roomId, groupId, query) => {
   return async dispatch => {
      dispatch(actions.filterRoomStart());
      try {
         const { data } = await getRoom(communityId, roomId, groupId, query || '');
         dispatch(actions.filterRoomCompleted(data));
      } catch (error) {
         dispatch(actions.filterRoomFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const multiDuplicateOperation = (communityId, roomId, groupId, ids, callBack) => {
   return async dispatch => {
      dispatch(actions.eventChangesStart());
      try {
         await multiDuplicateEvents(communityId, roomId, groupId, ids.join(','));
         callBack();
         dispatch(actions.eventChangesEnd());
      } catch (error) {
         dispatch(actions.eventChangesEnd());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};


export const handleSelectEventOperation = (event) => {
   return async dispatch => {
      dispatch(actions.selectEventAction(event));
   };
};

export const getEventSettingsOperation = (communityId, groupId, roomId, eventId) => {
   return async dispatch => {
      dispatch(actions.eventSettingsGetStart());
      try {
         const { data } = await getEventSettings(communityId, groupId, roomId, eventId);
         dispatch(actions.eventSettingsGetCompleted(data));
      } catch (error) {
         dispatch(actions.eventSettingsGetFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const putEventSettingsOperation = (communityId, eventId, data, callBack) => {
   return async dispatch => {
      dispatch(actions.eventSettingsPutStart());
      try {
         await updateEventSettings(communityId, eventId, data);
         dispatch(actions.eventSettingsPutCompleted({ ...data, id: eventId }));
         if (isPrint('Changes saved successfully.')) {
            toast.success('Changes saved successfully.');
         }
         callBack();
      } catch (error) {
         dispatch(actions.evventSettingsPutFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const createPostOperation = (communityId, groupId, roomId, inputs, callBack, postId) => {
   return async (dispatch) => {
      dispatch(actions.postCreateStart());
      try {
         await postCreate(communityId, groupId, roomId, inputs, postId);
         dispatch(actions.postCreateCompleted());
         if (postId) {
            if (isPrint('Post updated successfully.')) {
               toast.success('Post updated successfully.');
            }
         } else if (isPrint('Post created successfully.')) {
            toast.success('Post created successfully.');
         }

         callBack();
      } catch (error) {
         dispatch(actions.postCreateFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const inviteMemberOperation = (communityId, groupId, inputs, callBack) => {
   return async (dispatch) => {
      dispatch(actions.inviteMemberStart());
      try {
         await inviteMember(communityId, groupId, inputs);
         dispatch(actions.inviteMemberCompleted());
         if (isPrint('Member invited successfully.')) {
            toast.success('Member invited successfully.');
         }
         callBack();
      } catch (error) {
         dispatch(actions.inviteMemberFailed());
         if (error && error.response && error.response.data && error.response.data.message) {
            if (isPrint(error.response.data.message)) {
               toast.error(error.response.data.message);
            }
         } else if (error && error.response && error.response.data && error.response.data.errors) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const postCommentOperation = (communityId, groupId, roomId, postId, text) => {
   return async dispatch => {
      try {
         const { data } = await postComment(communityId, groupId, roomId, postId, text);
         dispatch(actions.postCommentCompleted(postId, data));
         if (isPrint('Your comment has been posted.')) {
            toast.success('Your comment has been posted.');
         }
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const postCommentDeleteOperation = (communityId, groupId, roomId, postId, commentId, isReplay) => {
   return async dispatch => {
      try {
         await postCommentDelete([communityId, groupId, roomId, postId, commentId]);
         dispatch(actions.postCommentDeleteCompleted(postId, commentId, isReplay));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const eventCommentDeleteOperation = (communityId, groupId, roomId, eventId, commentId, isReplay) => {
   return async dispatch => {
      try {
         await eventCommentDelete([communityId, groupId, roomId, eventId, commentId]);
         dispatch(actions.eventCommentDeleteCompleted(eventId, commentId, isReplay));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const postDeleteOperation = (communityId, groupId, roomId, postId) => {
   return async dispatch => {
      try {
         await postDelete(communityId, groupId, roomId, postId);
         dispatch(actions.postDeleteCompleted(communityId, groupId, roomId, postId));
         if (isPrint('Post has been deleted.')) {
            toast.success('Post has been deleted.');
         }
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const postReplyCommenOperation = (communityId, groupId, roomId, postId, commentId, text) => {
   return async dispatch => {
      try {
         const { data } = await postReplyComment(communityId, groupId, roomId, postId, commentId, text);
         dispatch(actions.postReplyCommentCompleted(postId, commentId, data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const postLikeOperation = (communityId, groupId, roomId, postId) => {
   return async dispatch => {
      try {
         const { data } = await postLike(communityId, groupId, roomId, postId);
         dispatch(actions.postLikeCompleted(postId, data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const postCommentLikeOperation = (communityId, groupId, roomId, postId, commentId, parentId) => {
   return async dispatch => {
      try {
         await postCommentLike(communityId, groupId, roomId, postId, commentId);
         dispatch(actions.postCommentLikeCompleted(postId, commentId, parentId));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const createExternalLinkOperation = (communityId, groupId, inputs, callBack, onError = ErrorPrinter) => {
   return async dispatch => {
      try {
         const { data } = await addExternalLink(communityId, groupId, inputs);
         if (isPrint('Link added successfully.')) {
            toast.success('Link added successfully.');
         }
         callBack();
         dispatch(actions.createExternalLinkCompleted(data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            onError(error.response);
         }
      }
   };
};

export const deleteExternalLinkOperation = (communityId, groupId, id, callBack) => {
   return async dispatch => {
      try {
         await deleteExternalLink(communityId, groupId, id);
         if (isPrint('Link deleted successfully.')) {
            toast.success('Link deleted successfully.');
         }
         callBack();
         dispatch(actions.deleteExternalLinkCompleted(id));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const notificationsChangesOperation = (communityId, groupId, roomId, inputs) => {
   return async dispatch => {
      try {
         await updateRoom(communityId, groupId, roomId, inputs);
         dispatch(actions.notificationsChangeCompleted(inputs));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const saveCommunitySettingsOperation = (communityId, slag, inputs, parentKey, courses) => {
   return async dispatch => {
      try {
         await saveCommunitySettings(communityId, slag, inputs);
         if (isPrint('Changes saved successfully.')) {
            toast.success('Changes saved successfully.');
         }
         dispatch(actions.communitySettingsCompleted(parentKey, inputs, courses));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const userVoteOperation = (communityId, groupId, roomId, postId, pollId, optionId) => {
   return async dispatch => {
      try {
         const { data } = await userVote(communityId, groupId, roomId, pollId, optionId);
         dispatch(actions.userVoteCompleted({ postId, pollId, data }));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const updateRoomSettingsOperation = (communityId, groupId, roomId, inputs, callBack, onError = ErrorPrinter) => {
   return async () => {
      try {
         await updateRoom(communityId, groupId, roomId, inputs);
         callBack();
      } catch (error) {
         if (error && error.response && error.response.data) {
            onError(error.response);
         }
      }
   };
};

export const userGetOperation = (id) => {
   return async (dispatch) => {
      try {
         dispatch(actions.userGetStart());
         const { data } = await getCommunityMember(id);
         dispatch(actions.userGetCompleted(data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const userSubscribeOperation = (id) => {
   return async (dispatch) => {
      try {
         const { data } = await communityMemberSubscribe(id);
         dispatch(actions.userSubscribeCompleted(data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const communityMemberRemoveOperation = (id, communityId, callBack) => {
   return async () => {
      try {
         await communityMemberRemove(id, communityId);
         callBack();
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const filterMemberOperation = (id, type, tab, callBack) => {
   return async (dispatch) => {
      try {
         const { data } = await filterCommunityMember(id, type, tab);
         dispatch(actions.userGetCompleted(data));
         callBack();
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};


export const getMembersPageInformation = (communityId, roomId, groupId, type) => {
   return async (dispatch) => {
      try {
         dispatch(actions.getMembersInformationStart());
         const { data: community } = await getCommunity(communityId);
         const { data: room } = await getRoom(communityId, roomId, groupId, `?type=${ type }`);
         const { data: members } = await getCommunityMembers(communityId, 1, '&sort=newest', roomId, groupId);
         dispatch(actions.getMembersInformationCompleted({
            community, room: room.rooms, members, initialMembersCount: members.data.length,
         }));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};


export const filterMembersPage = (communityId, paramsFilter, page, roomId, groupId) => {
   return async (dispatch) => {
      try {
         const { data: members } = await getCommunityMembers(communityId, page, paramsFilter, roomId, groupId);
         dispatch(actions.getMembersInformationCompleted({
            members,
         }));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const subscribeUserOperation = (communityId, userId, roomId, groupId) => {
   return async (dispatch) => {
      try {
         const { data } = await MembersFollowUnfollow(communityId, userId, roomId, groupId);
         dispatch(actions.membersListSubscribeCompleted(data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const deleteMemberOperation = (communityId, memberId, roomId, groupId) => {
   return async (dispatch) => {
      try {
         await MemberDeleteList(communityId, memberId, roomId, groupId);
         dispatch(actions.membersListDeleteCompleted(memberId));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const ReportMembersOperation = (communityId, memberId, text, roomId, groupId) => {
   return async () => {
      try {
         await MemberListReport(communityId, memberId, text, roomId, groupId);
         if (isPrint('Report sended successfully.')) {
            toast.success('Report sended successfully.');
         }
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const markAsReadOperation = (ids) => {
   return async dispatch => {
      try {
         await markAsRead(ids);
         dispatch(actions.markAsReadCompleted(ids));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const getConversationsByUuid = (communityId, uuid, callBack) => {
   return async (dispatch) => {
      try {
         const { data } = await getConversationMessages(communityId, uuid);
         dispatch(actions.getMessagesCompleted(data));
         callBack(data);
      } catch (error) {
      }
   };
};

export const clearConversation = (communityId, conversationId, callBack) => {
   return async (dispatch) => {
      try {
         await deleteConversationMessages(communityId, conversationId);
         dispatch(actions.clearConversationCompleted(conversationId));
         callBack();
      } catch (error) {
      }
   };
}; 

export const changeCommunityBannerImage = (communityId, bannerImage) => {
   return async dispatch => {
      dispatch(actions.changeCommunityBannerImageStart());
      try {
         await communityBannerImage(communityId, bannerImage);
         dispatch(actions.changeCommunityBannerImageCompleted(bannerImage));
      } catch (error) {
         dispatch(actions.changeCommunityBannerImageFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};