import * as types from './types';

export const getEmailDataStart = () => ({
   type: types.GET_EMAIL_TRACKING_START,
});

export const getEmailDataFailed = () => ({
   type: types.GET_EMAIL_TRACKING_FAILED,
});

export const getEmailDataCompleted = (data) => ({
   type: types.GET_EMAIL_TRACKING_COMPLETED,
   payload: data,
});

export const filterStart = () => ({
   type: types.FILTER_EMAIL_TRACKING_START,
});

export const filterCompleted = (data) => ({
   type: types.FILTER_EMAIL_TRACKING_COMPLETED,
   payload: data,
});

export const filterFailed = () => ({
   type: types.FILTER_EMAIL_TRACKING_FAILED,
});

export const socketAddItem = (item) => ({
   type: types.SOCKET_ADD_ITEM,
   payload: item,
});
