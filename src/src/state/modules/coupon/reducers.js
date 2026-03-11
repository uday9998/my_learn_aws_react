/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {
   [types.GET_COUPONS_START]: (state) => {
      return {
         ...state,
         progress: true,
      };
   },
   [types.GET_COUPONS_FAILED]: (state) => {
      return {
         ...state,
         progress: false,
      };
   },
   [types.GET_COUPONS_COMPLETED]: (state, action) => {
      return {
         ...state,
         progress: false,
         coupons: action.payload,
         initialCoupons: action.payload.data.length,
      };
   },
   [types.DELETE_COUPONS_COMPLETED]: (state, action) => {
      return {
         ...state,
         coupons: {
            ...state.coupons,
            data: state.coupons.data.filter((e) => {
               return !action.payload.includes(e.id);
            }),
         },
         initialCoupons: state.initialCoupons - 1,
      };
   },
   [types.FILTER_COUPONS_START]: (state) => {
      return {
         ...state,
         filterProgress: true,
      };
   },
   [types.FILTER_COUPONS_FAILED]: (state) => {
      return {
         ...state,
         filterProgress: false,
      };
   },
   [types.FILTER_COUPONS_COMPLETED]: (state, action) => {
      return {
         ...state,
         coupons: action.payload,
         filterProgress: false,
      };
   },
};

export default createReducer(initialState)(reducersMap);
