import * as types from './types';


export const getAccountInfoStart = () => {
   return {
      type: types.GET_USER_START,
   };
};


export const getAccountInfoFailed = () => {
   return {
      type: types.GET_USER_FAILED,
   };
};


export const getAccountInfoCompleted = (data) => {
   return {
      type: types.GET_USER_COMPLETED,
      payload: data,
   };
};

export const setAccountInfoStart = () => {
   return {
      type: types.SET_USER_START,
   };
};

export const setAccountInfoFinish = () => {
   return {
      type: types.SET_USER_COMPLETED,
   };
};

export const getPlanStart = () => {
   return {
      type: types.GET_PLAN_START,
   };
};

export const getPlanCompleted = (payload) => {
   return {
      type: types.GET_PLAN_COMPLETED,
      payload,
   };
};

export const getPlanFailed = () => {
   return {
      type: types.GET_PLAN_FAILED,
   };
};

export const cancelAccountStart = () => {
   return {
      type: types.CANCEL_PLAN_START,
   };
};

export const cancelACcountEnd = () => {
   return {
      type: types.CANCEL_PLAN_END,
   };
};

export const reactivateAccountStart = () => {
   return {
      type: types.REACTIVATE_PLAN_START,
   };
};

export const reactivateAccountEnd = () => {
   return {
      type: types.REACTIVATE_PLAN_END,
   };
};

export const updateCardStart = () => {
   return {
      type: types.UPDATE_CARD_START,
   };
};


export const updateCardEnd = () => {
   return {
      type: types.UPDATE_CARD_END,
   };
};

export const changePlanStart = () => {
   return {
      type: types.CHANGE_PLAN_START,
   };
};

export const changePlanEnd = () => {
   return {
      type: types.CHANGE_PLAN_END,
   };
};

export const saveBillingDataStart = () => {
   return {
      type: types.SAVE_ADDRESS_START,
   };
};

export const saveBillingDataEnd = (data) => {
   return {
      type: types.SAVE_ADDRESS_FINISH,
      payload: data,
   };
};


export const saveBillingDataFailed = () => {
   return {
      type: types.SAVE_ADDRESS_FINISH,
   };
};

export const connectToPlanStart = () => ({
   type: types.CONNECT_PLAN_START,
});

export const connectToPlanCompleted = (data) => ({
   type: types.CONNECT_PLAN,
   payload: {
      data,
   },
});

export const connectToPlanFailed = () => ({
   type: types.CONNECT_PLAN_FAILED,
});
