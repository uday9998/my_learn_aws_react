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

export const colorSwitch = (colorPallete) => ({
   type: types.COLOR_SWITCH,
   payload: {
      colorPallete,
   },
});

export const getSettingsStart = () => ({
   type: types.GET_SETTINGS_START,
});
export const getSettingsCompleted = (key, data) => ({
   type: types.GET_SETTINGS_COMPLETED,
   payload: {
      key,
      data,
   },
});
export const getSettingsFailed = (errors) => ({
   type: types.GET_SETTINGS_FAILED,
   payload: {
      errors,
   },
});

export const getVideosStart = () => ({
   type: types.GET_VIDEOS_START,
});
export const getVideosCompleted = (key, data) => ({
   type: types.GET_VIDEOS_COMPLETED,
   payload: {
      key,
      data,
   },
});
export const getVideosFailed = (errors) => ({
   type: types.GET_VIDEOS_FAILED,
   payload: {
      errors,
   },
});

export const getVideosbyDateStart = () => ({
   type: types.GET_VIDEOSBYDATE_START,
});
export const getVideosbyDateCompleted = (key, data) => ({
   type: types.GET_VIDEOSBYDATE_COMPLETED,
   payload: {
      key,
      data,
   },
});
export const getVideosbyDateFailed = (errors) => ({
   type: types.GET_VIDEOSBYDATE_FAILED,
   payload: {
      errors,
   },
});


export const getSingleVideoStart = () => ({
   type: types.GET_VIDEO_START,
});
export const getSingleVideoCompleted = (data) => ({
   type: types.GET_VIDEO_COMPLETED,
   payload: {
      data,
   },
});
export const getSingleVideoFailed = (errors) => ({
   type: types.GET_VIDEO_FAILED,
   payload: {
      errors,
   },
});

export const putSettingsStart = () => ({
   type: types.PUT_SETTINGS_START,
});

export const putSettingsCompleted = (data) => ({
   type: types.PUT_SETTINGS_COPMLATED,
   payload: {
      data,
   },
});

export const putSettingsFailed = (errors) => ({
   type: types.PUT_SETTINGS_FAILED,
   payload: {
      errors,
   },
});

export const createCustomLinkStart = () => ({
   type: types.CREATE_CUSTOMLINK_START,
});

export const createCustomLinkCompleted = (data) => ({
   type: types.CREATE_CUSTOMLINK_COMPLETED,
   payload: {
      data,
   },
});

export const createCustomLinkFailed = (errors) => ({
   type: types.CREATE_CUSTOMLINK_FAILED,
   payload: {
      errors,
   },
});

export const setCreateModalOpenAction = (data) => ({
   type: types.CREATE_CUSTOMLINK_OPEN_MODAL,
   payload: {
      data,
   },
});

export const updateCustomLinkStart = () => ({
   type: types.UPDATE_CUSTOMLINK_START,
});

export const updateCustomLinkCompleted = (id, inputs) => ({
   type: types.UPDATE_CUSTOMLINK_COMPLETED,
   payload: {
      id,
      inputs,
   },
});

export const updateCustomLinkFailed = (errors) => ({
   type: types.UPDATE_CUSTOMLINK_FAILED,
   payload: {
      errors,
   },
});

export const deleteCustomLinkStart = () => ({
   type: types.DELETE_CUSTOMLINK_START,
});

export const deleteCustomLinkCompleted = (id) => ({
   type: types.DELETE_CUSTOMLINK_COMPLETED,
   payload: {
      id,
   },
});

export const deleteCustomLinkFailed = (errors) => ({
   type: types.DELETE_CUSTOMLINK_FAILED,
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

export const connectIntegrationCompleted = integration => ({
   type: types.CONNECT_INTEGRATION_COMPLETED,
   payload: integration,
});

export const deleteAccountDomainStart = () => ({
   type: types.DELETE_DOMAIN_START,
});

export const deleteAccountDomainCompleted = () => ({
   type: types.DELETE_DOMAIN_COMPLETED,
});

export const deleteAccountDomainFailed = (errors) => ({
   type: types.DELETE_DOMAIN_FAILED,
   payload: {
      errors,
   },
});


export const customLinksReorderCompleted = (newCustomLinks) => {
   return {
      type: types.CUSTOMLINK_ORDER_COMPLETED,
      payload: {
         newCustomLinks,
      },
   };
};
export const customLinksReorderStart = () => {
   return {
      type: types.CUSTOMLINK_ORDER_START,
   };
};
export const customLinksReorderFailed = () => {
   return {
      type: types.CUSTOMLINK_ORDER_FAILED,
   };
};
export const getFileSizeInfoStart = () => ({
   type: types.GET_FILE_SIZE_START,
});

export const getFileSizeInfoCompleted = (data) => ({
   type: types.GET_FILE_SIZE_COMPLETED,
   payload: {
      data,
   },
});

export const getFileSizeInfoFailed = () => ({
   type: types.GET_FILE_SIZE_FAILED,
});


export const createApikeyStart = () => ({
   type: types.CREATE_APIKEY_START,
});
export const createApikeyCompleted = (data) => ({
   type: types.CREATE_APIKEY_COMPLETED,
   payload: {
      data,
   },
});
export const createApikeyFailed = (errors) => ({
   type: types.CREATE_APIKEY_FAILED,
   payload: {
      errors,
   },
});

export const getApikeyStart = () => ({
   type: types.GET_APIKEY_START,
});
export const getApikeyCompleted = (data) => ({
   type: types.GET_APIKEY_COMPLETED,
   payload: {
      data,
   },
});
export const getApikeyFailed = (errors) => ({
   type: types.GET_APIKEY_FAILED,
   payload: {
      errors,
   },
});

export const getAllCoursesCompleted = (data) => ({
   type: types.GET_ALL_COURSES_COMPLETED,
   payload: {
      data,
   },
});

export const updateClassDataCompleted = (classData) => ({
   type: types.UPDATE_CLASS_DATA_COMPLETED,
   payload: {
      classData,
   },
});

export const getFromEmailStart = () => ({
   type: types.GET_FROM_EMAIL_START,
});

export const getFromEmailCompleted = (data) => ({
   type: types.GET_FROM_EMAIL_COMPLETED,
   payload: { data },
});

export const setDnsSettingsState = (state) => ({
   type: types.SET_DNS_SETTINGS_STATE,
   payload: { dnsSettingsOpen: state },
});
export const createScriptStart = () => ({
   type: types.CREATE_SCRIPT_START,
});
export const createScriptCompleted = (data) => ({
   type: types.CREATE_SCRIPT_COMPLETED,
   payload: {
      data,
   },
});
export const createScriptFailed = (errors) => ({
   type: types.CREATE_SCRIPT_FAILED,
   payload: {
      errors,
   },
});

export const getScriptsStart = () => ({
   type: types.GET_SCRIPTS_START,
});

export const getScriptsCompleted = (data) => ({
   type: types.GET_SCRIPTS_COMPLETED,
   payload: {
      data,
   },
});

export const getScriptsFailed = (errors) => ({
   type: types.GET_SCRIPTS_FAILED,
   payload: {
      errors,
   },
});

export const setScriptInput = (key, value) => ({
   type: types.SET_SCRIPT_INPUT,
   payload: {
      key,
      value,
   },
});

export const chooseScript = (id) => {
   return {
      type: types.CHOOSE_SCRIPT,
      payload: {
         id,
      },
   };
};

export const emptyScript = () => {
   return {
      type: types.EMPTY_SCRIPT,
   };
};

export const deleteScriptStart = () => ({
   type: types.DELETE_SCRIPT_START,
});

export const deleteScriptCompleted = (id) => ({
   type: types.DELETE_SCRIPT_COMPLETED,
   payload: {
      id,
   },
});

export const deleteScriptFailed = (errors) => ({
   type: types.DELETE_SCRIPT_FAILED,
   payload: {
      errors,
   },
});

export const updateScriptStart = () => ({
   type: types.UPDATE_SCRIPT_START,
});
export const updateScriptCompleted = (data) => ({
   type: types.UPDATE_SCRIPT_COMPLETED,
   payload: {
      data,
   },
});
export const updateScriptFailed = (errors) => ({
   type: types.UPDATE_SCRIPT_FAILED,
   payload: {
      errors,
   },
});

export const disableDisconnectIntegration = () => ({
   type: types.DISABLE_DISCONNECT_INTEGRATION,
});

export const enableIntegration = () => ({
   type: types.ENABLE_DISCONNECT_INTEGRATION,
});

export const getNotificationsStart = () => ({
   type: types.GET_NOTIFICATIONS_START,
});

export const getNotificationsComplected = (notifications) => ({
   type: types.GET_NOTIFICATIONS_COMPLECTED,
   payload: notifications,
});

export const getNotificationsFailed = () => ({
   type: types.GET_NOTIFICATIONS_FAILED,
});

export const changeNotify = (key, name, value) => ({
   type: types.CHANGE_NOTIFY,
   payload: {
      key,
      name,
      value,
   },
});

export const saveNotificationStart = () => ({
   type: types.SAVE_NOTIFICATIONS_DATA_START,
});

export const saveNotificationCompleted = (data) => ({
   type: types.SAVE_NOTIFICATIONS_DATA_START,
   payload: data,
});

export const saveNotificationFailed = () => ({
   type: types.SAVE_NOTIFICATIONS_DATA_START,
});

export const saveSchoolCodesStart = () => ({
   type: types.SAVE_CODES_SETTINGS_START,
});

export const saveSchoolCodesCompleted = (data) => ({
   type: types.SAVE_CODES_SETTINGS_COMPLETED,
   payload: data,
});

export const saveSchoolCodesFailed = () => ({
   type: types.SAVE_CODES_SETTINGS_FAILED,
});


export const getSchoolCodesStart = () => ({
   type: types.GET_CODES_SETTINGS_START,
});

export const getSchoolCodesCompleted = (data) => ({
   type: types.GET_CODES_SETTINGS_COMPLETED,
   payload: data,
});

export const getSchoolCodesFailed = () => ({
   type: types.GET_CODES_SETTINGS_FAILED,
});
