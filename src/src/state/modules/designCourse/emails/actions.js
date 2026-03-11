import * as types from './types';

export const setInput = (key, value) => {
   return {
      type: types.SET_INPUT,
      payload: {
         key,
         value,
      },
   };
};

export const resetInput = () => {
   return {
      type: types.RESET_INPUT,
   };
};


export const emailSendStart = () => ({
   type: types.EMAIL_SEND_START,
});

export const emailSendCompleted = (data) => ({
   type: types.EMAIL_SEND_COMPLETED,
   payload: {
      data,
   },
});

export const emailSendFailed = (errors) => ({
   type: types.EMAIL_SEND_FAILED,
   payload: {
      errors,
   },
});

export const editEmailStatusStart = () => ({
   type: types.EDIT_EMAILSTATUS_START,
});

export const editEmailStatusCompleted = (data) => ({
   type: types.EDIT_EMAILSTATUS_COMPLETED,
   payload: {
      data,
   },
});

export const editEmailStatusFailed = (errors) => ({
   type: types.EDIT_EMAILSTATUS_FAILED,
   payload: {
      errors,
   },
});


export const getAllUsersEmailsAction = (data) => {
   return {
      type: types.GET_ALLUSERS_EMAILS,
      payload: {
         data,
      },
   };
};

export const getAdminsEmailsAction = (data) => {
   return {
      type: types.GET_ADMINS_EMAILS,
      payload: {
         data,
      },
   };
};

export const setFilterEmails = filterEmails => ({
   type: types.FILTER_EMAILS,
   payload: { filterEmails },
});

export const addFilterOption = (option, emails) => ({
   type: types.ADD_FILTER_OPTION,
   payload: { option, emails },
});

export const removeFilterOption = (option) => ({
   type: types.REMOVE_FILTER_OPTION,
   payload: { option },
});


export const getAdminsEmailsActionStart = () => ({
   type: types.GET_ADMINS_EMAILS_START,
});

export const getAllUsersEmailsActionStart = () => ({
   type: types.GET_ALLUSERS_EMAILS_START,
});

export const setFilterOptionsStart = () => ({
   type: types.SET_FILTER_OPTIONS_START,
});


export const setFilterOptions = options => ({
   type: types.SET_FILTER_OPTIONS,
   payload: { options },
});


export const addTagFilterOption = option => ({
   type: types.ADD_TAGFILTER_OPTION,
   payload: { option },
});

export const removeTagFilterOption = option => ({
   type: types.REMOVE_TAGFILTER_OPTION,
   payload: { option },
});

export const setTagFilterOptions = options => ({
   type: types.SET_TAGFILTER_OPTIONS,
   payload: { options },
});

export const getSettingsEmailStart = () => ({
   type: types.GET_SETTINGSEMAIL_START,
});
export const getSettingsEmailCompleted = (data) => ({
   type: types.GET_SETTINGSEMAIL_COMPLETED,
   payload: {
      data,
   },
});
export const getSettingsEmailFailed = (errors) => ({
   type: types.GET_SETTINGSEMAIL_FAILED,
   payload: {
      errors,
   },
});


export const getEmailStatusesStart = () => ({
   type: types.GET_EMAILSTATUSES_START,
});

export const getEmailStatusesCompleted = (data) => ({
   type: types.GET_EMAILSTATUSES_COMPLETED,
   payload: {
      data,
   },
});

export const getEmailStatusesFailed = (errors) => ({
   type: types.GET_EMAILSTATUSES_FAILED,
   payload: {
      errors,
   },
});

export const changeEmailStatusStart = () => ({
   type: types.CHANGE_EMAILSTATUSES_START,
});

export const changeEmailStatusCompleted = (data) => ({
   type: types.CHANGE_EMAILSTATUSES_COMPLETED,
   payload: {
      data,
   },
});

export const changeEmailStatusFailed = (errors) => ({
   type: types.CHANGE_EMAILSTATUSES_FAILED,
   payload: {
      errors,
   },
});


export const deleteEmailStatusStart = () => ({
   type: types.DELETE_EMAILSTATUS_START,
});

export const deleteEmailStatusCompleted = (id) => ({
   type: types.DELETE_EMAILSTATUS_COMPLETED,
   payload: {
      id,
   },
});

export const deleteEmailStatusFailed = (errors) => ({
   type: types.DELETE_EMAILSTATUS_FAILED,
   payload: {
      errors,
   },
});

export const updateEmailsAction = (data) => {
   return {
      type: types.EMAILSTATUSES_UPDATE,
      payload: {
         data,
      },
   };
};

export const filterEmailStart = () => {
   return {
      type: types.FILTER_EMAILS_START,
   };
};

export const filterEmailCompleted = (data) => {
   return {
      type: types.FILTER_EMAILS_COMPLETED,
      payload: data,
   };
};

export const filterEmailFailed = () => {
   return {
      type: types.FILTER_EMAILS_FAILED,
   };
};

export const actionEmailsStart = () => ({
   type: types.ACTION_EMAILS_START,
});

export const multiDleteEmailsCompleted = (ids) => ({
   type: types.MULTI_DELETE_EMAILS_COMPLETED,
   payload: ids,
});

export const actionEmailsFailed = () => ({
   type: types.ACTION_EMAILS_FAILED,
});

export const duplicateEmailCompleted = (data) => ({
   type: types.DUPLICATE_EMAIL_COMPLETED,
   payload: data,
});
