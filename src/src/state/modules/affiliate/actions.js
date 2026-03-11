import * as types from './types';

export const affiliateInitStart = () => ({
   type: types.AFFILIATE_INIT_START,
});

export const affiliateInitEnd = (data) => ({
   type: types.AFFILIATE_INIT_END,
   payload: data,
});
// CREATE PAGE
export const affiliateOffersGetStart = () => ({
   type: types.AFFILIATE_OFFERS_START,
});

export const affiliateOffersGetFinished = (data) => ({
   type: types.AFFILIATE_OFFERS_FINISHED,
   payload: data,
});

export const affiliateCreateStart = () => ({
   type: types.AFFILIATE_CREATE_START,
});

export const affiliateCreateCompleted = (preview) => ({
   type: types.AFFILIATE_CREATE_COMPLETED,
   payload: preview,
});

export const affiliateCreateFailed = () => ({
   type: types.AFFILIATE_CREATE_FAILED,
});
// END CREATE PAGE

export const affiliateMainGetStart = () => {
   return {
      type: types.AFFILIATE_MAIN_INIT_START,
   };
};

export const affiliateMainGetEnd = (payload) => {
   return {
      type: types.AFFILIATE_MAIN_INIT_END,
      payload,
   };
};

export const affiliateFilterOverview = (data) => {
   return {
      type: types.AFFILIATE_FILTER_OVERVIEW,
      payload: data,
   };
};

export const deleteAffiliateProgram = (id) => {
   return {
      type: types.AFFILIATE_DELETE_COMPLETED,
      payload: id,
   };
};

export const markAsPaidAction = (newTransactions) => {
   return {
      type: types.AFFILIATE_MARK_AS_PAID,
      payload: newTransactions,
   };
};

export const AffiliateGetUserStart = () => {
   return {
      type: types.AFFILIATE_USER_INFO_START,
   };
};

export const AffiliateGetUserEnd = (data) => {
   return {
      type: types.AFFILIATE_USER_INFO_END,
      payload: data,
   };
};

export const AffiliateGetSettingsStart = () => {
   return {
      type: types.AFFILIATE_GET_SETTINGS_START,
   };
};

export const AffiliateGetSettingsEnd = (data) => {
   return {
      type: types.AFFILIATE_GET_SETTINGS_END,
      payload: data,
   };
};


export const AffiliateInputsGetStart = () => {
   return {
      type: types.AFFILIATE_INPUTS_START,
   };
};

export const AffiliateInputsGetEnd = (data) => {
   return {
      type: types.AFFILIATE_INPUTS_END,
      payload: data,
   };
};

export const AffiliateUpdateStart = () => {
   return {
      type: types.AFFILIATE_UPDATE_START,
   };
};

export const AffiliateUpdateFailed = () => {
   return {
      type: types.AFFILIATE_UPDATE_FAILED,
   };
};

export const AffiliateUpdateCompleted = () => {
   return {
      type: types.AFFILIATE_UPDATE_COMPLETED,
   };
};
