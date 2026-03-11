import * as types from './types';
import { createReducer } from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;
      return {
         ...state,
         webHook: {
            ...state.webHook,
            [key]: value,
         },
      };
   },

   [types.RESET_WEBHOOK]: (state) => {
      return {
         ...state,
         webHook: { metas: {} },
      };
   },

   [types.GET_WEBHOOKS_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.GET_WEBHOOKS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         webHooks: data,
         isFetchingData: false,
      };
   },

   [types.GET_WEBHOOKS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

   [types.GET_WEBHOOKBYID_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },


   [types.GET_WEBHOOKBYID_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         webHook: data,
         isFetchingData: false,
      };
   },

   [types.GET_WEBHOOKBYID_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

   [types.GET_WEBHOOKLOGS_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.GET_WEBHOOKLOGS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         webHookLogs: data,
         isFetchingData: false,
      };
   },

   [types.GET_WEBHOOKLOGS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

   [types.CREATE_WEBHOOKS_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },
   [types.CREATE_WEBHOOKS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const webHooks = [...state.webHooks, data];
      return {
         ...state,
         isFetchingData: false,
         webHooks,
      };
   },
   [types.CREATE_WEBHOOKS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

   [types.DELETE_WEBHOOK_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.DELETE_WEBHOOK_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      let webHooks = [...state.webHooks];
      webHooks = webHooks.filter(webHook => webHook.id !== id);
      return {
         ...state,
         isFetchingData: false,
         webHooks,
      };
   },

   [types.DELETE_WEBHOOK_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

   [types.UPDATE_WEBHOOK_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.UPDATE_WEBHOOK_COMPLETED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },

   [types.UPDATE_WEBHOOK_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

};

export default createReducer(initialState)(reducersMap);
