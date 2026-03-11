/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.GET_EMAIL_TRACKING_START]: (state) => {
      return {
         ...state,
         isLoading: true,
      };
   },
   [types.GET_EMAIL_TRACKING_FAILED]: (state) => {
      return {
         ...state,
         isLoading: false,
      };
   },
   [types.GET_EMAIL_TRACKING_COMPLETED]: (state, action) => {
      return {
         ...state,
         data: action.payload,
         isLoading: false,
      };
   },
   [types.FILTER_EMAIL_TRACKING_START]: (state) => {
      return {
         ...state,
         isLoading: true,
      };
   },
   [types.FILTER_EMAIL_TRACKING_FAILED]: (state) => {
      return {
         ...state,
         isLoading: false,
      };
   },
   [types.FILTER_EMAIL_TRACKING_COMPLETED]: (state, action) => {
      return {
         ...state,
         isLoading: false,
         data: {
            ...state.data,
            ...action.payload,
         },
      };
   },
   [types.SOCKET_ADD_ITEM]: (state, action) => {
      return {
         ...state,
         data: {
            ...state.data,
            ...action.payload,
         },
      };
   },
};

export default createReducer(initialState)(reducersMap);
