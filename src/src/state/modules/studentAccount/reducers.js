/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.SET_INIT_DATA_START]: (state) => {
      return {
         ...state,
         dataIsFetching: true,
      };
   },
   [types.SET_INIT_DATA_COMPLETED]: (state, action) => {
      const { payload: { key, data } } = action;

      return {
         ...state,
         [key]: {
            ...data,
         },
         dataIsFetching: false,
      };
   },
   [types.SET_INIT_DATA_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         dataIsFetching: false,
      };
   },

   [types.GET_ACCOUNT_START]: (state) => {
      return {
         ...state,
         getAccountInProgress: true,
      };
   },
   [types.GET_ACCOUNT_COMPLETED]: (state, action) => {
      const { payload: { key, data } } = action;

      return {
         ...state,
         [key]: {
            ...data,
         },
         getAccountInProgress: false,
      };
   },
   [types.GET_ACCOUNT_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getAccountInProgress: false,
      };
   },

   [types.RESET_COURSE_START]: (state) => {
      return {
         ...state,
         getResetCourseInProgress: true,
      };
   },
   [types.RESET_COURSE_COMPLETED]: (state) => {
      return {
         ...state,
         getResetCourseInProgress: false,
      };
   },
   [types.RESET_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getResetCourseInProgress: false,
      };
   },

   [types.SET_INPUT]: (state, action) => {
      const { payload: { target, key, value } } = action;

      return {
         ...state,
         [target]: {
            ...state[target],
            [key]: value,
         },
      };
   },

   [types.UPDATE_ACCOUNT_START]: (state) => {
      return {
         ...state,
         updateAccountInProgress: true,
      };
   },

   [types.UPDATE_ACCOUNT_COPMLATED]: (state, action) => {
      const { payload: { inputs } } = action;
      let accountImgChanged = '';
      if (inputs.picture_src) {
         accountImgChanged = inputs.picture_src;
      }
      return {
         ...state,
         updateAccountInProgress: false,
         account: inputs,
         accountImgChanged,
      };
   },

   [types.UPDATE_ACCOUNT_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         updateAccountInProgress: false,
         errors,
      };
   },

   [types.CANCEL_CHANGES]: (state, action) => {
      const { payload: { initialFields, currentTab } } = action;

      return {
         ...state,
         [currentTab]: {
            ...state[currentTab],
            ...initialFields,
         },
      };
   },

   [types.CANCEL_SUBSCRIPTION_START]: (state) => {
      return {
         ...state,
         updateAccountInProgress: true,
      };
   },

   [types.CANCEL_SUBSCRIPTION_COMPLETED]: (state, action) => {
      const { payload: { subId } } = action;
      const payments = [...state.orders.payments];
      const currentPayment = payments.filter(payment => payment.subscription_id === subId)[0];
      currentPayment.status = 'canceled';
      return {
         ...state,
         orders: {
            ...state.orders,
            payments,
         },
         updateAccountInProgress: false,
      };
   },

   [types.CANCEL_SUBSCRIPTION_FAILED]: (state) => {
      return {
         ...state,
         updateAccountInProgress: false,
      };
   },

};

export default createReducer(initialState)(reducersMap);
