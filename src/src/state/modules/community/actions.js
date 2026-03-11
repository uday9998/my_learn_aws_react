import * as types from './types';

export const getCommunityStart = () => ({
   type: types.GET_COMMUNITY_START,
});

export const getCommunityCompleted = (data, userId) => ({
   type: types.GET_COMMUNITY_COMPLETED,
   payload: {
      data, userId,
   },
});

export const getCommunityFailed = () => ({
   type: types.GET_COMMUNITY_END,
});

export const createRoomStart = () => ({
   type: types.CREATE_ROOM_START,
});

export const createRoomEnd = () => ({
   type: types.CREATE_ROOM_END,
});

export const createRoomCompleted = () => ({
   type: types.CREATE_ROOM_COMPLETED,
});

export const createEventStart = () => {
   return {
      type: types.CREATE_EVENT_START,
   };
};

export const createEventFailed = () => ({
   type: types.CREATE_EVENT_END,
});

export const createEventCompleted = (data, roomId) => ({
   type: types.CREATE_EVENT_COMPLETED,
   payload: { data, roomId },
});

export const eventChangesStart = () => ({
   type: types.EVENT_CHANGES_START,
});

export const eventChangesEnd = () => ({
   type: types.EVENT_CHANGES_END,
});

export const EventUnPinCompleted = (eventId, num) => ({
   type: types.EVENT_PIN_OR_UNPIN_COMPLETED,
   payload: {
      eventId, num,
   },
});

export const postChangesStart = () => ({
   type: types.POST_CHANGES_START,
});

export const postChangesEnd = () => ({
   type: types.POST_CHANGES_END,
});

export const postUnPinCompleted = (postId, num) => ({
   type: types.POST_PIN_OR_UNPIN_COMPLETED,
   payload: {
      postId, num,
   },
});

export const archiveEventsCompleted = (ids) => ({
   type: types.ARCHIVE_EVENT_COMPLETED,
   payload: ids,
});

export const getRoomStart = () => ({
   type: types.GET_ROOM_START,
});

export const getRoomCompleted = (data) => ({
   type: types.GET_ROOM_COMPLETED,
   payload: data,
});

export const getRoomFailed = () => ({
   type: types.GET_ROOM_FAILED,
});

export const changeSortOptions = (options) => ({
   type: types.CHANGE_SORT_OPTIONS,
   payload: options,
});

export const selectEventAction = (event) => ({
   type: types.SELECT_EVENT_VIEW,
   payload: event,
});

export const filterRoomStart = () => ({
   type: types.FILTER_ROOM_START,
});

export const filterRoomCompleted = (data) => ({
   type: types.FILTER_ROOM_COMPLETED,
   payload: data,
});

export const filterRoomFailed = () => ({
   type: types.FILTER_ROOM_FAILED,
});

export const eventSettingsGetStart = () => ({
   type: types.EVENT_SETTINGS_GET_START,
});

export const eventSettingsGetFailed = () => ({
   type: types.EVENT_SETTINGS_GET_FAILED,
});

export const eventSettingsGetCompleted = (data) => ({
   type: types.EVENT_SETTINGS_GET_COMPLETED,
   payload: data,
});

export const eventSettingsPutStart = () => ({
   type: types.EVENT_SETTINGS_PUT_START,
});

export const eventSettingsPutCompleted = (data) => ({
   type: types.EVENT_SETTINGS_PUT_COMPLETED,
   payload: data,
});

export const evventSettingsPutFailed = () => ({
   type: types.EVENT_SETTINGS_PUT_FAILED,
});

export const deleteRoomStart = () => {
   return {
      type: types.DELETE_ROOM_START,
   };
};

export const deleteRoomFailed = () => ({
   type: types.DELETE_ROOM_FAILED,
});

export const deleteRoomCompleted = (roomId) => ({
   type: types.DELETE_ROOM_COMPLETED,
   payload: roomId,
});

export const postCreateStart = () => ({
   type: types.CREATE_POST_START,
});

export const postCreateCompleted = () => ({
   type: types.CREATE_POST_COMPLETED,
});

export const postCreateFailed = () => ({
   type: types.CREATE_POST_FAILED,
});

export const inviteMemberStart = () => ({
   type: types.INVITE_MEMBER_START,
});

export const inviteMemberCompleted = () => ({
   type: types.INVITE_MEMBER_COMPLETED,
});

export const inviteMemberFailed = () => ({
   type: types.INVITE_MEMBER_FAILED,
});

export const postDeleteCompleted = (communityId, groupId, roomId, postId) => ({
   type: types.POST_DELETE_COMPLETED,
   payload: {
      communityId, groupId, roomId, postId,
   },
});

export const postCommentCompleted = (postId, comment) => ({
   type: types.POST_COMMENT_COMPLETED,
   payload: {
      postId, comment,
   },
});

export const eventCommentCompleted = (eventId, comment) => ({
   type: types.EVENT_COMMENT_COMPLETED,
   payload: { eventId, comment },
});

export const eventCommentLikeCompleted = (eventId, commentId, parentId) => ({
   type: types.EVENT_COMMENT_LIKE_COMPLETED,
   payload: {
      eventId, commentId, parentId,
   },
});

export const postReplyCommentCompleted = (postId, commentId, replyComment) => ({
   type: types.POST_REPLY_COMMENT_COMPLETED,
   payload: {
      commentId, replyComment, postId,
   },
});

export const eventReplyCommentCompleted = (eventId, commentId, replyComment) => ({
   type: types.EVENT_REPLY_COMMENT_COMPLETED,
   payload: {
      commentId, replyComment, eventId,
   },
});

export const postLikeCompleted = (postId, data) => {
   return {
      type: types.POST_LIKE_COMPLETED,
      payload: { data, postId },
   };
};

export const postCommentLikeCompleted = (postId, commentId, parentId) => {
   return {
      type: types.POST_COMMENT_LIKE_COMPLETED,
      payload: {
         postId, commentId, parentId,
      },
   };
};

export const createExternalLinkCompleted = (data) => {
   return {
      type: types.POST_EXTERNAL_LINK_CREATE_COMPLETED,
      payload: data,
   };
};

export const deleteExternalLinkCompleted = (id) => {
   return {
      type: types.POST_EXTERNAL_LINK_DELETE_COMPLETED,
      payload: id,
   };
};

export const notificationsChangeCompleted = (data) => {
   return {
      type: types.EMAIL_NOTIFICATIONS_CHANGES_COMPLETED,
      payload: data,
   };
};

export const communitySettingsCompleted = (parentKey, inputs, courses) => {
   return {
      type: types.COMMUNITY_SETTINGS_COMPLETED,
      payload: {
         parentKey, inputs, courses,
      },
   };
};

export const userVoteCompleted = (ids) => {
   return {
      type: types.USER_VOTE_COMPLETED,
      payload: ids,
   };
};

export const userGetStart = () => {
   return {
      type: types.USER_GET_START,
   };
};

export const userGetCompleted = (data) => {
   return {
      type: types.USER_GET_COMPLETED,
      payload: data,
   };
};

export const userSubscribeCompleted = (data) => {
   return {
      type: types.USER_SUBSCRIBE_COMPLETED,
      payload: data,
   };
};

export const getMembersInformationStart = () => {
   return {
      type: types.GET_MEMBERS_PAGE_INFORMATION_START,
   };
};

export const getMembersInformationCompleted = (data) => {
   return {
      type: types.GET_MEMBERS_PAGE_INFORMATION_COMPLETED,
      payload: data,
   };
};

export const membersListSubscribeCompleted = (data) => {
   return {
      type: types.MEMBERS_LIST_SUBSCRIBE_COMPLETED,
      payload: data,
   };
};

export const membersListDeleteCompleted = (id) => {
   return {
      type: types.MEMBERS_LIST_DELETE_COMPLETED,
      payload: id,
   };
};
export const markAsReadCompleted = (ids) => ({
   type: types.NOTIFICATION_MARK_READ,
   payload: ids,
});

export const initMessengerStart = () => ({
   type: types.GET_MESSAGES_START,
});

export const initMessengerFailed = () => ({
   type: types.GET_MESSAGES_FAILED,
});

export const initMessengerCompleted = (data) => ({
   type: types.GET_MESSAGES_COMPLETED,
   payload: data,
});

export const filtersMessengerCompleted = (data) => ({
   type: types.FILTER_MESSAGES_COMPLETED,
   payload: data,
});

export const getMessagesCompleted = (data) => ({
   type: types.GET_MESSAGES_WITH_MEMBER_COMPLETED,
   payload: data,
});

export const updateMessagesSocket = (newMessages) => ({
   type: types.UPDATE_MESSAGES_BY_SOCKET,
   payload: newMessages,
});

export const clearConversationCompleted = (conversationId) => ({
   type: types.MESSENGER_CLEAR_CONVERSATION_COMPLETED,
   payload: conversationId,
});

export const updateUnreadMesssagesCount = (count) => ({
   type: types.UPDATE_UNREAD_MESSAGES_COUNT,
   payload: count,
});

export const updateSearchInput = (value) => ({
   type: types.UPDATE_SEARCH_INPUTS,
   payload: value,
});

export const postCommentDeleteCompleted = (postId, commentId, isReplay) => ({
   type: types.POST_COMMENT_DELETE_COMPLETED,
   payload: {
      postId, commentId, isReplay,
   },
});

export const eventCommentDeleteCompleted = (eventId, commentId, isReplay) => ({
   type: types.EVENT_COMMENT_DELETE_COMPLETED,
   payload: {
      eventId, commentId, isReplay,
   },
});

export const resetSelectedRoomAction = () => ({
   type: types.RESET_SELECTED_ROOM,
});


export const changeCommunityBannerImageFailed = () => ({
   type: types.UPDATE_BANNER_FAILED,
});

export const changeCommunityBannerImageCompleted = (bannerImage) => ({
   type: types.UPDATE_BANNER_COMPLETED,
   payload: { bannerImage },
});

export const changeCommunityBannerImageStart = () => ({
   type: types.UPDATE_BANNER_START,
});

export const createBridgeStart = () => ({
   type: types.CREATE_BRIDGE_START,
});

export const createBridgeComplete = (data) => ({
   type: types.CREATE_BRIDGE_COMPLETED,
   payload: {
      data,
   },
});

export const createBridgeFailed = () => ({
   type: types.CREATE_BRIDGE_FAILED,
});