import * as types from './types';

// GET COMMENTS
export const getCommentsStart = () => ({
   type: types.GET_COMMENTS_START,
});

export const getCommentsCompleted = (data) => ({
   type: types.GET_COMMENTS_COMPLETED,
   payload: data,
});

export const getCommentsFailed = (error) => ({
   type: types.GET_COMMENTS_FAILED,
   payload: error,
});

// GET NEW COMMENTS
export const getNewCommentsStart = () => ({
   type: types.GET_NEW_COMMENTS_START,
});

export const getNewCommentsCompleted = (data) => ({
   type: types.GET_NEW_COMMENTS_COMPLETED,
   payload: data,
});

export const getNewCommentsFailed = (error) => ({
   type: types.GET_NEW_COMMENTS_FAILED,
   payload: error,
});

// CREATE NEW COMMENT
export const createCommentStart = () => ({
   type: types.CREATE_COMMENT_START,
});

export const createCommentCompleted = (data) => ({
   type: types.CREATE_COMMENT_COMPLETED,
   payload: data,
});

export const createCommentFailed = (error) => ({
   type: types.CREATE_COMMENT_FAILED,
   payload: error,
});

// DELETE COMMENT
export const deleteCommentStart = () => ({
   type: types.DELETE_COMMENT_START,
});
export const deleteCommentCompleted = (id, parentId = null) => ({
   type: types.DELETE_COMMENT_COMPLETED,
   payload: {
      id, parentId,
   },
});
export const deleteCommentFailed = (error) => ({
   type: types.DELETE_COMMENT_FAILED,
   payload: error,
});

// TOGGLE LIKE COMMENT
export const toggleLikeCommentStart = () => ({
   type: types.TOGGLE_LIKE_COMMENT_START,
});
export const toggleLikeCommentCompleted = (id, parentId = null) => ({
   type: types.TOGGLE_LIKE_COMMENT_COMPLETED,
   payload: {
      id, parentId,
   },
});
export const toggleLikeCommentFailed = (error) => ({
   type: types.TOGGLE_LIKE_COMMENT_FAILED,
   payload: error,
});

// SOCKET ACTIONS
export const sendCommentAction = (comment) => ({
   type: types.SEND_COMMENT,
   payload: comment,
});

export const deleteCommentAction = (id, parentId = null) => ({
   type: types.DELETE_COMMENT,
   payload: {
      id, parentId,
   },
});

export const likeCommentAction = (id, likesCount, parentId = null) => ({
   type: types.LIKE_COMMENT,
   payload: {
      id, likesCount, parentId,
   },
});

// RESET
export const resetCommentsNewFieldAction = () => ({
   type: types.RESET_COMMENTS_NEW_FIELD,
});

export const setDeletedStatusAction = (id) => ({
   type: types.SET_DELETED_STATUS,
   payload: id,
});
