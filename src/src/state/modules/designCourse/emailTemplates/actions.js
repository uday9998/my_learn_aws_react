import * as types from './types';

export const getEmailTemplatesStart = () => ({
   type: types.GET_EMAILTEMPLATES_START,
});

export const getEmailTemplatesCompleted = (data, emailTemplateFirst) => ({
   type: types.GET_EMAILTEMPLATES_COMPLETED,
   payload: {
      data,
      emailTemplateFirst,
   },
});

export const getAutoEmailTemplatesStart = () => ({
   type: types.GET_AUTO_EMAILTEMPLATES_START,
});

export const getAutoEmailTemplatesCompleted = (data) => ({
   type: types.GET_AUTO_EMAILTEMPLATES_COMPLETED,
   data,
});

export const getAutoEmailTemplatesFailed = (errors) => ({
   type: types.GET_AUTO_EMAILTEMPLATES_FAILED,
   payload: {
      errors,
   },
});

export const updateAutoEmailTemplatesStart = () => ({
   type: types.UPDATE_AUTO_EMAILTEMPLATES_START,
});

export const updateAutoEmailTemplatesCompleted = (data) => ({
   type: types.UPDATE_AUTO_EMAILTEMPLATES_COMPLETED,
   data,
});

export const updateAutoEmailTemplatesFailed = (errors) => ({
   type: types.UPDATE_AUTO_EMAILTEMPLATES_FAILED,
   payload: {
      errors,
   },
});

export const revertAutoEmailTemplateStart = () => ({
   type: types.REVERT_AUTO_EMAILTEMPLATE_START,
});

export const revertAutoEmailTemplateCompleted = (data) => ({
   type: types.REVERT_AUTO_EMAILTEMPLATE_COMPLETED,
   data,
});

export const revertAutoEmailTemplateFailed = (errors) => ({
   type: types.REVERT_AUTO_EMAILTEMPLATE_FAILED,
   payload: {
      errors,
   },
});

export const getEmailTemplatesFailed = (errors) => ({
   type: types.GET_EMAILTEMPLATES_FAILED,
   payload: {
      errors,
   },
});

export const getEmailTemplateStart = () => ({
   type: types.GET_EMAILTEMPLATE_START,
});

export const getEmailTemplateCompleted = (data) => ({
   type: types.GET_EMAILTEMPLATE_COMPLETED,
   payload: {
      data,
   },
});

export const getEmailTemplateFailed = (errors) => ({
   type: types.GET_EMAILTEMPLATE_FAILED,
   payload: {
      errors,
   },
});


export const updateEmailTemplateStart = () => ({
   type: types.UPDATE_EMAILTEMPLATE_START,
});

export const updateEmailTemplateCompleted = (data) => ({
   type: types.UPDATE_EMAILTEMPLATE_COMPLETED,
   payload: {
      data,
   },
});

export const updateEmailTemplateFailed = (errors) => ({
   type: types.UPDATE_EMAILTEMPLATE_FAILED,
   payload: {
      errors,
   },
});

export const updateEmailNotificationsCompleted = (key, value) => ({
   type: types.UPDATE_EMAILNOTIFICATIONS_COMPLETED,
   payload: {
      key,
      value,
   },
});

export const setInput = (key, value) => ({
   type: types.SET_INPUT,
   payload: {
      key,
      value,
   },
});

export const setAutoEmailInput = (key, value) => ({
   type: types.SET_AUTO_EMAIL_INPUT,
   payload: {
      key,
      value,
   },
});

export const setCheckbox = (key, value) => ({
   type: types.SET_CHECKBOX,
   payload: {
      key,
      value,
   },
});
