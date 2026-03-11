import * as types from './types';

export const getCourseCheckoutStart = () => ({
   type: types.GET_CHECKOUT_START,
});
export const getCourseCheckoutCompleted = (data) => ({
   type: types.GET_CHECKOUT_COMPLETED,
   payload: {
      data,
   },
});
export const getCourseCheckoutFailed = (errors) => ({
   type: types.GET_CHECKOUT_FAILED,
   payload: {
      errors,
   },
});
