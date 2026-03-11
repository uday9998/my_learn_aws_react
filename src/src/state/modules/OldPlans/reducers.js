/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {

   [types.GET_PLANS_START]: (state) => {
      return {
         ...state,
         getPlansInProgress: true,
      };
   },

   [types.GET_PLANS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      // eslint-disable-next-line camelcase
      const {
         subscriptions, currentSubscription, plans_info, refunded,
      } = data;
      // const s = {
      //    trial_start: '2019-10-17 13:57:18',
      //    next_billing_at: '2019-11-17 13:57:18',
      //    price: '1.00',
      //    status: 0,
      //    id: 213243,
      //    plan_id: 16729,
      //    plan_name: 'miestro-starter-plan-monthly',
      //    customer_secret_id: 'safdf',
      //    invoice_id: 'safdf',
      // };
      return {
         ...state,
         getPlansInProgress: false,
         plans: plans_info,
         refunded,
         subscription: { history: subscriptions, current: currentSubscription },
      };
   },

   [types.GET_PLANS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getPlansInProgress: false,
         errors,
      };
   },

   [types.CANCEL_PLAN]: (state) => {
      return {
         ...state,
         subscription: { ...state.subscription, current: [] },
      };
   },

   [types.SET_PLANS_MODAL_STATE_START]: (state) => {
      return {
         ...state,
         plansModalStateInProgress: true,
      };
   },


   [types.SET_PLANS_MODAL_STATE]: (state, { payload }) => {
      return {
         ...state,
         plansModalStateInProgress: false,
         plansModalIsOpened: payload.state,
      };
   },


   [types.SET_PLANS_MODAL_STATE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         plansModalStateInProgress: false,
         plansModalIsOpened: false,
         changePlanErrors: errors,
      };
   },

   [types.SET_CARD_MODAL_STATE]: (state, { payload }) => {
      return {
         ...state,
         cardModalIsOpened: payload.state,
      };
   },

   [types.SET_CARD_UPTAE_MODAL_STATE]: (state, { payload }) => {
      return {
         ...state,
         cardUpdateModalIsInProgress: payload.state,
      };
   },


};


export default createReducer(initialState)(reducersMap);
