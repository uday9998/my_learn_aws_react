/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.AFFILIATE_INIT_START]: (state) => {
      return {
         ...state,
         loading: true,
      };
   },
   [types.AFFILIATE_INIT_END]: (state, action) => {
      return {
         ...state,
         loading: false,
         data: action.payload,
      };
   },
   // CREATE PAGE
   [types.AFFILIATE_OFFERS_START]: (state) => {
      return {
         ...state,
         offersLoading: true,
      };
   },
   [types.AFFILIATE_OFFERS_FINISHED]: (state, action) => {
      return {
         ...state,
         offersLoading: false,
         offers: action.payload,
      };
   },
   [types.AFFILIATE_CREATE_START]: (state) => {
      return {
         ...state,
         createLoading: true,
      };
   },
   [types.AFFILIATE_CREATE_COMPLETED]: (state) => {
      return {
         ...state,
         createLoading: false,
      };
   },
   [types.AFFILIATE_CREATE_FAILED]: (state) => {
      return {
         ...state,
         createLoading: false,
      };
   },
   // END CREATE PAGE
   [types.AFFILIATE_MAIN_INIT_START]: (state) => {
      return {
         ...state,
         mainLoading: true,
      };
   },
   [types.AFFILIATE_MAIN_INIT_END]: (state, action) => {
      return {
         ...state,
         mainLoading: false,
         mainInfo: action.payload,
      };
   },
   [types.AFFILIATE_FILTER_OVERVIEW]: (state, action) => {
      return {
         ...state,
         mainInfo: {
            ...state.mainInfo,
            overview: action.payload,
         },
      };
   },
   [types.AFFILIATE_DELETE_COMPLETED]: (state, action) => {
      return {
         ...state,
         data: state.data.filter((e) => e.id !== action.payload),
      };
   },
   [types.AFFILIATE_MARK_AS_PAID]: (state, action) => {
      return {
         ...state,
         mainInfo: {
            ...state.mainInfo,
            transactions: action.payload,
         },
      };
   },
   [types.AFFILIATE_USER_INFO_START]: (state) => {
      return {
         ...state,
         userPageLoading: true,
      };
   },
   [types.AFFILIATE_USER_INFO_END]: (state, action) => {
      return {
         ...state,
         userPageLoading: false,
         user: action.payload,
      };
   },
   [types.AFFILIATE_GET_SETTINGS_START]: (state) => {
      return {
         ...state,
         settingsLoading: true,
      };
   },
   [types.AFFILIATE_GET_SETTINGS_END]: (state, action) => {
      return {
         ...state,
         settings: action.payload || {},
         settingsLoading: !action.payload,
      };
   },
   [types.AFFILIATE_INPUTS_START]: (state) => {
      return {
         ...state,
         editLoader: true,
      };
   },
   [types.AFFILIATE_INPUTS_END]: (state, action) => {
      return {
         ...state,
         editLoader: false,
         inputs: action.payload,
      };
   },
   [types.AFFILIATE_UPDATE_START]: (state) => {
      return {
         ...state,
         updateLoading: true,
      };
   },
   [types.AFFILIATE_UPDATE_COMPLETED]: (state) => {
      return {
         ...state,
         updateLoading: false,
      };
   },
   [types.AFFILIATE_UPDATE_FAILED]: (state) => {
      return {
         ...state,
         updateLoading: false,
      };
   },
};

export default createReducer(initialState)(reducersMap);
