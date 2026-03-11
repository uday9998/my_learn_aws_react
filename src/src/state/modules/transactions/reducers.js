/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.GET_TRANSACTIONS_START]: (state) => {
      return {
         ...state,
         getTransactionsInProgress: true,
      };
   },
   [types.GET_TRANSACTIONS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         transactions: data,
         total: data.total,
         getTransactionsInProgress: false,
      };
   },
   [types.GET_TRANSACTIONS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getTransactionsInProgress: false,
      };
   },

   [types.SEARCH_TRANSACTIONS_START]: (state) => {
      return {
         ...state,
         getTransactionsInProgress: true,
      };
   },
   [types.SEARCH_TRANSACTIONS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         transactions: data,
         total: data.total,
         getTransactionsInProgress: false,
      };
   },
   [types.SEARCH_TRANSACTIONS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getTransactionsInProgress: false,
      };
   },

   [types.GET_TRANSACTIONS_PAGINATION_START]: (state) => {
      return {
         ...state,
         getTransactionsPaginationInProgress: true,
      };
   },
   [types.GET_TRANSACTIONS_PAGINATION_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         transactions: data.data,
         getTransactionsPaginationInProgress: false,
      };
   },
   [types.GET_TRANSACTIONS_PAGINATION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getTransactionsPaginationInProgress: false,
      };
   },

};

export default createReducer(initialState)(reducersMap);
