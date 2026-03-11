import * as types from './types';

export const setInitDataStart = () => ({
   type: types.SET_INIT_DATA_START,
});
export const setInitDataCompleted = (key, data) => ({
   type: types.SET_INIT_DATA_COMPLETED,
   payload: {
      key,
      data,
   },
});
export const setInitDataFailed = (errors) => ({
   type: types.SET_INIT_DATA_FAILED,
   payload: {
      errors,
   },
});

export const setInput = (target, key, value) => ({
   type: types.SET_INPUT,
   payload: {
      target,
      key,
      value,
   },
});

export const getAccountStart = () => ({
   type: types.GET_ACCOUNT_START,
});
export const getAccountCompleted = (key, data) => ({
   type: types.GET_ACCOUNT_COMPLETED,
   payload: {
      key,
      data,
   },
});
export const getAccountFailed = (errors) => ({
   type: types.GET_ACCOUNT_FAILED,
   payload: {
      errors,
   },
});

export const resetAccountCourseStart = () => ({
   type: types.RESET_COURSE_START,
});
export const resetAccountCourseCompleted = (data) => ({
   type: types.RESET_COURSE_COMPLETED,
   payload: {
      data,
   },
});
export const resetAccountCourseFailed = (errors) => ({
   type: types.RESET_COURSE_FAILED,
   payload: {
      errors,
   },
});


export const updateAccountStart = () => ({
   type: types.UPDATE_ACCOUNT_START,
});

export const updateAccountCompleted = (inputs) => ({
   type: types.UPDATE_ACCOUNT_COPMLATED,
   payload: {
      inputs,
   },
});

export const updateAccountFailed = (errors) => ({
   type: types.UPDATE_ACCOUNT_FAILED,
   payload: {
      errors,
   },
});

export const cancelChanges = (initialFields, currentTab) => ({
   type: types.CANCEL_CHANGES,
   payload: {
      initialFields,
      currentTab,
   },
});

export const cancelSubscriptionStart = () => ({
   type: types.CANCEL_SUBSCRIPTION_START,
});

export const cancelSubscriptionCompleted = (subId) => ({
   type: types.CANCEL_SUBSCRIPTION_COMPLETED,
   payload: {
      subId,
   },
});

export const cancelSubscriptionFailed = () => ({
   type: types.CANCEL_SUBSCRIPTION_FAILED,
});
