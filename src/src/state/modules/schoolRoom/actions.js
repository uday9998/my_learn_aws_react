import * as types from './types';

export const getPortalTemplateFilesStart = () => ({
   type: types.GET_PORTAL_TEMPLATE_FILES_START,
});

export const getPortalTemplateFilesCompleted = (data) => ({
   type: types.GET_PORTAL_TEMPLATE_FILES_COMPLETED,
   payload: data,
});

export const getPortalTemplateFilesFailed = () => ({
   type: types.GET_PORTAL_TEMPLATE_FILES_FAILED,
});

export const updatePortalTemplateFileStart = () => ({
   type: types.UPDATE_PORTAL_TEMPLATE_FILE_START,
});

export const updatePortalTemplateFileFailed = () => ({
   type: types.UPDATE_PORTAL_TEMPLATE_FILE_FAILED,
});

export const updatePortalCssVariablesFileCompleted = (body) => ({
   type: types.UPDATE_PORTAL_CSS_VARIABLES_FILE_COMPLETED,
   payload: body,
});

export const changePortalThemesState = (data) => {
   return {
      type: types.CHANGE_PORTAL_THEMES_STATE,
      payload: data,
   };
};