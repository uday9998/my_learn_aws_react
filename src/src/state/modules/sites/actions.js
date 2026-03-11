import * as types from './types';


export const getSitesStart = () => ({
   type: types.GET_SITES_START,
});

export const getSitesCompleted = (data) => ({
   type: types.GET_SITES_COMPLETED,
   payload: {
      data,
   },
});

export const addSiteStart = () => ({
   type: types.ADD_SITE_START,
});

export const addSiteCompleted = (data) => ({
   type: types.ADD_SITE_COMPLETED,
   payload: {
      data,
   },
});

export const addSiteFailed = (errors) => ({
   type: types.ADD_SITE_FAILED,
   payload: {
      errors,
   },
});

export const deleteSiteStart = () => ({
   type: types.DELETE_SITE_START,
});

export const deleteSiteCompleted = (id) => ({
   type: types.DELETE_SITE_COMPLETED,
   payload: {
      id,
   },
});

export const deleteSiteFailed = (errors) => ({
   type: types.DELETE_SITE_FAILED,
   payload: {
      errors,
   },
});


export const updateSiteStart = () => ({
   type: types.UPDATE_SITE_START,
});

export const updateSiteCompleted = (id, inputs) => ({
   type: types.UPDATE_SITE_COMPLETED,
   payload: {
      id,
      inputs,
   },
});

export const updateSiteFailed = (errors) => ({
   type: types.UPDATE_SITE_FAILED,
   payload: {
      errors,
   },
});

export const setInputAction = (key, value) => ({
   type: types.SET_INPUT,
   payload: {
      key,
      value,
   },
});


export const setResetAction = () => ({
   type: types.SET_RESET,
});


export const chooseSiteAction = (id) => {
   return {
      type: types.CHOOSE_SITE,
      payload: {
         id,
      },
   };
};


export const loginSiteStart = () => ({
   type: types.LOGIN_SITE_START,
});

export const loginSiteCompleted = (id, data) => ({
   type: types.LOGIN_SITE_COMPLETED,
   payload: {
      id,
      data,
   },
});
