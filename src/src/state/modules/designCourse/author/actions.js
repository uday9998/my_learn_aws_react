import * as types from './types';

export const getAuthorsDataStart = () => ({
   type: types.GET_AUTHORS_START,
});

export const getAuthorsDataComplete = (data) => ({
   type: types.GET_AUTHORS_COMPLETE,
   payload: {
      data,
   },
});

export const getAuthorsDataFailed = () => ({
   type: types.GET_AUTHORS_FAILED,
});


export const createAuthorStart = () => ({
   type: types.CREATE_AUTHOR_START,
});

export const createAuthorComplete = (data) => ({
   type: types.CREATE_AUTHOR_COMPLETE,
   payload: {
      data,
   },
});

export const createAuthorFailed = () => ({
   type: types.CREATE_AUTHOR_FAILED,
});

export const saveAuthorStart = () => ({
   type: types.SAVE_AUTHOR_START,
});

export const saveAuthorComplete = (courseId, authorId, data) => ({
   type: types.SAVE_AUTHOR_COMPLETE,
   payload: {
      courseId, authorId, data,
   },
});

export const saveAuthorFailed = () => ({
   type: types.SAVE_AUTHOR_FAILED,
});

export const deleteAuthorStart = () => ({
   type: types.DELETE_AUTHOR_START,
});

export const deleteAuthorComplete = (id) => ({
   type: types.DELETE_AUTHOR_COMPLETE,
   payload: {
      id,
   },
});

export const deleteAuthorFailed = () => ({
   type: types.DELETE_AUTHOR_FAILED,
});

export const setOpenAuthorPopupAction = (data) => ({
   type: types.OPEN_AUTHOR_POPUP,
   payload: {
      data,
   },
});

export const setOpenDeleteAuthorPopupAction = (data) => ({
   type: types.OPEN_DELETE_AUTHOR_POPUP,
   payload: {
      data,
   },
});
