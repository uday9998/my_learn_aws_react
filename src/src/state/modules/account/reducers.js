import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.GET_USER_START]: (state) => {
      return {
         ...state,
         inProgress: true,
      };
   },
   [types.GET_USER_FAILED]: (state) => {
      return {
         ...state,
         inProgress: false,
      };
   },
   [types.GET_USER_COMPLETED]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         inProgress: false,
         account: payload,
      };
   },
   [types.SET_USER_START]: (state) => {
      return {
         ...state,
         inProgress: true,
      };
   },
   [types.SET_USER_COMPLETED]: (state) => {
      return {
         ...state,
         inProgress: false,
      };
   },
   [types.GET_PLAN_START]: (state) => {
      return {
         ...state,
         inProgressPlansFetching: true,
      };
   },
   [types.GET_PLAN_COMPLETED]: (state, action) => {
      return {
         ...state,
         plans: action.payload,
         inProgressPlansFetching: false,
      };
   },
   [types.GET_PLAN_FAILED]: (state) => {
      return {
         ...state,
         inProgressPlansFetching: false,
      };
   },
   [types.CANCEL_PLAN_START]: (state) => {
      return {
         ...state,
         inProgress: true,
      };
   },
   [types.CANCEL_PLAN_END]: (state) => {
      return {
         ...state,
         inProgress: false,
      };
   },
   [types.REACTIVATE_PLAN_START]: (state) => {
      return {
         ...state,
         inProgress: true,
      };
   },
   [types.REACTIVATE_PLAN_END]: (state) => {
      return {
         ...state,
         inProgress: false,
      };
   },
   [types.UPDATE_CARD_START]: (state) => {
      return {
         ...state,
         inProgress: true,
      };
   },
   [types.UPDATE_CARD_END]: (state) => {
      return {
         ...state,
         inProgress: false,
      };
   },
   [types.CHANGE_PLAN_START]: (state) => {
      return {
         ...state,
         inProgress: true,
      };
   },
   [types.CHANGE_PLAN_END]: (state) => {
      return {
         ...state,
         inProgress: false,
      };
   },
   [types.SAVE_ADDRESS_START]: (state) => {
      return {
         ...state,
         isProgressBilling: true,
      };
   },
   [types.SAVE_ADDRESS_FINISH]: (state, action) => {
      return {
         ...state,
         isProgressBilling: false,
         account: {
            ...state.account,
            ...action.payload,
         },
      };
   },
   [types.SAVE_ADDRESS_FAILED]: (state) => {
      return {
         ...state,
         isProgressBilling: false,
      };
   },
   [types.CONNECT_PLAN_START]: (state) => {
      return {
         ...state,
         inProgressPlanConnect: true,
      };
   },
   [types.CONNECT_PLAN_FAILED]: (state) => {
      return {
         ...state,
         inProgressPlanConnect: false,
      };
   },
};

export default createReducer(initialState)(reducersMap);
