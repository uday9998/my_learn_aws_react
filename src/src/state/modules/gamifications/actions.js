import * as types from './types';


export const setInput = (key, value) => ({
   type: types.SET_INPUT,
   payload: {
      key,
      value,
   },
});

export const getGamificationsActionStart = () => ({
   type: types.GET_GAMIFICATIONS_START,
});

export const getGamificationsActionCompleted = (data) => ({
   type: types.GET_GAMIFICATIONS_COMPLETED,
   payload: {
      data,
   },
});

export const getGamificationsActionFailed = (errors) => ({
   type: types.GET_GAMIFICATIONS_FAILED,
   payload: {
      errors,
   },
});

export const switchAddingBadge = () => ({
   type: types.SWITCH_ADD_BADGE,
});

export const chooseBadgeStart = () => ({
   type: types.CHOOSE_BADGE_START,
});

export const chooseBadgeCompleted = (badgeId) => ({
   type: types.CHOOSE_BADGE_COMPLETED,
   payload: {
      badgeId,
   },
});

export const createGamificationsActionStart = () => ({
   type: types.CREATE_GAMIFICATIONS_START,
});

export const createGamificationsActionCompleted = (data) => ({
   type: types.CREATE_GAMIFICATIONS_COMPLETED,
   payload: {
      data,
   },
});

export const createGamificationsActionFailed = (errors) => ({
   type: types.CREATE_GAMIFICATIONS_FAILED,
   payload: {
      errors,
   },
});

export const deleteGamificationsActionStart = () => ({
   type: types.DELETE_GAMIFICATIONS_START,
});

export const deleteGamificationsActionCompleted = (id, gamificationInputs) => ({
   type: types.DELETE_GAMIFICATIONS_COMPLETED,
   payload: {
      id,
      gamificationInputs,
   },
});

export const deleteGamificationsActionFailed = (errors) => ({
   type: types.DELETE_GAMIFICATIONS_FAILED,
   payload: {
      errors,
   },
});


export const updateGamificationsStart = () => ({
   type: types.UPDATE_GAMIFICATIONS_START,
});

export const updateGamificationsCompleted = (id, data) => ({
   type: types.UPDATE_GAMIFICATIONS_COMPLETED,
   payload: {
      id,
      data,
   },
});

export const updateGamificationsFailed = (errors) => ({
   type: types.UPDATE_GAMIFICATIONS_FAILED,
   payload: {
      errors,
   },
});
export const updateMobileStateCompleted = (data) => ({
   type: types.UPDATE_MOBILE_STATE_COMPLETED,
   payload: data,
});
export const resetStateChangeCompleted = (data) => ({
   type: types.RESET_STATE_CHANGE_COMPLETED,
   payload: data,
});
