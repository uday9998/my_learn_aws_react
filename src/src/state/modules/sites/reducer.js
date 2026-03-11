/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import site from 'containers/pages/admin/site';
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';


const reducersMap = {
   [types.GET_SITES_START]: (state) => {
      return {
         ...state,
         getSitesInProgress: true,
      };
   },

   [types.GET_SITES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         getSitesInProgress: false,
         sites: data,
         totalSites: data.total,
      };
   },

   [types.ADD_SITE_START]: (state) => {
      return {
         ...state,
         getSitesInProgress: true,
      };
   },

   [types.ADD_SITE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         sites: [
            ...state.sites,
            data,
         ],
         getSitesInProgress: false,
         errors: {},
      };
   },

   [types.ADD_SITE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getSitesInProgress: false,
      };
   },

   [types.DELETE_SITE_START]: (state) => {
      return {
         ...state,
         getSitesInProgress: true,
      };
   },

   [types.DELETE_SITE_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      const { sites } = state;
      const newSites = sites.filter(newsite => newsite.uuid !== id);
      return {
         ...state,
         sites: newSites,
         getSitesInProgress: false,
      };
   },

   [types.LOGIN_SITE_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.LOGIN_SITE_COMPLETED]: (state, action) => {
      const { payload: { id, data } } = action;
      return {
         ...state,
         token: data.token,
      };
   },

   [types.UPDATE_SITE_START]: (state) => {
      return {
         ...state,
         getSitesInProgress: true,
      };
   },

   [types.UPDATE_SITE_COMPLETED]: (state, action) => {
      const { payload: { id, inputs } } = action;
      const sites = [...state.sites];
      const updateSite = sites.find(currentSite => currentSite.uuid === id);
      if (inputs.name) {
         updateSite.name = inputs.name;
      }
      if (inputs.subdomain) {
         updateSite.subdomain = inputs.subdomain;
      }


      return {
         ...state,
         sites,
         getSitesInProgress: false,
         errors: {},
      };
   },

   [types.UPDATE_SITE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getSitesInProgress: false,
      };
   },

   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;

      return {
         ...state,
         currentSite: {
            ...state.currentSite,
            [key]: value,
         },
      };
   },

   [types.SET_RESET]: (state) => {
      return {
         ...state,
         currentSite: {},
      };
   },

   [types.CHOOSE_SITE]: (state, action) => {
      const { payload: { id } } = action;
      const currentSite = state.sites.find(newsite => newsite.uuid === id);

      return {
         ...state,
         currentSite,
      };
   },

};


export default createReducer(initialState)(reducersMap);
