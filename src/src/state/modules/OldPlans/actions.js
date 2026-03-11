import * as types from './types';

export const getPlansStart = () => ({
   type: types.GET_PLANS_START,
});

export const getPlansCompleted = (data) => ({
   type: types.GET_PLANS_COMPLETED,
   payload: {
      data,
   },
});

export const getPlansFailed = (errors) => ({
   type: types.GET_PLANS_FAILED,
   payload: {
      errors,
   },
});

export const connectToPlanCompleted = (data) => ({
   type: types.CONNECT_PLAN,
   payload: {
      data,
   },
});

export const cancelPlan = () => ({
   type: types.CANCEL_PLAN,
});

export const setPlansModalState = (state) => ({
   type: types.SET_PLANS_MODAL_STATE,
   payload: { state },
});

export const setPlansModalStateStart = () => ({
   type: types.SET_PLANS_MODAL_STATE_START,
});

export const setPlansModalStateFailed = (errors) => ({
   type: types.SET_PLANS_MODAL_STATE_FAILED,
   payload: {
      errors,
   },
});


export const setCardModalState = (state) => ({
   type: types.SET_CARD_MODAL_STATE,
   payload: { state },
});


export const setCardUpdateModalState = (state) => ({
   type: types.SET_CARD_UPTAE_MODAL_STATE,
   payload: { state },
});
