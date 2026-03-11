import * as types from './types';


export const getCommentsStart = () => ({
   type: types.COMMENTS_GET_START,
});

export const getCommentsFailed = () => ({
   type: types.COMMENTS_GET_FAILED,
});

export const getCommentsCompleted = (data, newSortVersion) => ({
   type: types.COMMENTS_GET_COMPLETED,
   payload: {
      data,
      newSortVersion,
   },
});

export const searchCommentsStart = () => ({
   type: types.COMMENTS_SEARCH_START,
});

export const searchCommentsFailed = () => ({
   type: types.COMMENTS_SEARCH_FAILED,
});

export const searchCommentsCompleted = (data) => ({
   type: types.COMMENTS_SEARCH_COMPLETED,
   payload: data,
});

export const commentChangesStart = () => ({
   type: types.COMMENTS_CHANGES_START,
});

export const commentChangesCompleted = () => ({
   type: types.COMMENTS_CHANGES_COMPLETED,
});

export const commentChangesFailed = () => ({
   type: types.COMMENTS_CHANGES_FAILED,
});

export const getCommentStart = () => ({
   type: types.GET_REPLY_START,
});

export const getCommentCompleted = (data) => ({
   type: types.GET_REPLY_COMPLETED,
   payload: data,
});

export const getCommentFailed = () => ({
   type: types.GET_REPLY_FAILED,
});

export const replyCommentStart = () => ({
   type: types.REPLY_COMMENT_START,
});
export const replyCommentFailed = () => ({
   type: types.REPLY_COMMENT_FAILED,
});
export const replyCommentCompleted = (data) => ({
   type: types.REPLY_COMMENT_COMPLETED,
   payload: data,
});

export const socketAddComment = (data, isFromFeed) => ({
   type: types.SOCKET_ADD_COMMENT,
   payload: {
      comment: data,
      isFromFeed,
   },
});
