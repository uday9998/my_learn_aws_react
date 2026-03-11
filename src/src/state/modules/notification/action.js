import * as types from './types';

export const updateCurrentNotifyCompleted = (data, metaDataDefault) => ({
   type: types.UPDATE_CURRENT_COMPLETED,
   payload: {
      data,
      metaDataDefault,
   },
});

export const updateCurrentNotifyFailed = () => ({
   type: types.UPDATE_CURRENT_FAILED,
});

export const updateCurrentNotifyStart = () => ({
   type: types.UPDATE_CURRENT_START,
});

export const saveNotificationCompleted = (data) => ({
   type: types.SAVE_CURRENT_COMPLETED,
   payload: {
      data,
   },
});

export const saveNotificationStart = () => ({
   type: types.SAVE_CURRENT_START,
});

export const saveNotificationFailed = () => ({
   type: types.SAVE_CURRENT_FAILED,
});
