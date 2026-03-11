/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.GET_CHECKOUT_START]: (state) => {
      return {
         ...state,
         getCheckoutInProgress: true,
      };
   },
   [types.GET_CHECKOUT_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         checkoutCourse: data.checkout,
         testimonials: data.testimonials,
         offers: data.offers,
         getCheckoutInProgress: false,
      };
   },
   [types.GET_CHECKOUT_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getCheckoutInProgress: false,
      };
   },

};

export default createReducer(initialState)(reducersMap);
