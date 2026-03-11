import * as types from './types';

export const getPlansStart = () => ({
   type: types.GET_PLANS_START,
});

export const getPlansCompleted = (data, isPagination) => ({
   type: types.GET_PLANS_COMPLETED,
   payload: { data, isPagination },
});

export const getPlansFailed = () => ({
   type: types.GET_PLANS_FAILED,
});

export const filterPlansStart = () => ({
   type: types.FILTER_PLANS_START,
});

export const filterPlansFailed = () => ({
   type: types.FILTER_PLANS_FAILED,
});
export const filterPLansCompleted = (data) => ({
   type: types.FILTER_PLANS_COMPLETED,
   payload: data,
});

export const deletePlansCompleted = (ids) => ({
   type: types.DELETE_PLANS_COMPLETED,
   payload: ids,
});

export const getPlanStart = () => ({
   type: types.PLAN_GET_START,
});

export const getPLanFailed = () => ({
   type: types.PLAN_GET_FAILED,
});

export const getPLanCompleted = (data) => ({
   type: types.PLAN_GET_COMPLETED,
   payload: data,
});

export const planInputChange = (name, value) => ({
   type: types.PLAN_INPUT_CHANGE,
   payload: {
      name, value,
   },
});

export const planIntegrationStart = () => ({
   type: types.PLAN_INTEGRATION_START,
});

export const planIntegrationFailed = () => ({
   type: types.PLAN_INTEGRATION_FAILED,
});

export const planIntegrationCompleted = (data) => ({
   type: types.PLAN_INTEGRATION_COMPLETED,
   payload: data,
});

export const planSaveStart = () => ({
   type: types.PLAN_SAVE_START,
});

export const planSaveFailed = () => ({
   type: types.PLAN_SAVE_FAILED,
});

export const planSaveCompleted = () => ({
   type: types.PLAN_SAVE_COMPLETED,
});

export const tagAddCompleted = (data) => ({
   type: types.PLAN_ADD_TAG_COMPLETED,
   payload: data,
});

export const deleteOrderBumpCompleted = (id) => ({
   type: types.PLAN_ORDER_BUMP_DELETE_COMPLETED,
   payload: id,
});

export const addCustomFieldCompleted = (data) => ({
   type: types.PLAN_CUSTOM_FIELDS_ADD_COMPLETED,
   payload: data,
});

export const deleteCustomFieldCompleted = (id) => ({
   type: types.PLAN_CUSTOM_FIELD_DELETE_COMPLETED,
   payload: id,
});

export const getAuthoresponderOptionsListStart = () => ({
   type: types.AUTHORESPONDER_OPTIONS_LIST_START,
});

export const getAuthoresponderOptionsListCompleted = (data) => ({
   type: types.AUTHORESPONDER_OPTIONS_LIST_COMPLETED,
   payload: data,
});

export const getAuthoresponderOptionsListFailed = () => ({
   type: types.AUTHORESPONDER_OPTIONS_LIST_FAILED,
});

export const deleteUpsellCompleted = (id) => ({
   type: types.DELETE_UPSELL_COMPLETED,
   payload: id,
});

export const makeActiveLandingCompleted = (activeLandingId) => ({
   type: types.MAKE_ACTIVE_LANDING_COMPLETED,
   payload: activeLandingId,
});

export const deleteDownsellCompleted = (id) => ({
   type: types.DELETE_DOWNSELL_COMPLETED,
   payload: {
      downsellId: id,
   },
});

export const changeDownsellStatusCompleted = (id) => ({
   type: types.DOWNSEL_STATUS_CHANGE,
   payload: {
      downsellId: id,
   },
});

export const getPlansNextPageStart = () => ({
   type: types.GET_PLANS_NEXT_PAGE_START,
});

export const getPlansNextPageCompleted = (data) => ({
   type: types.GET_PLANS_NEXT_PAGE_COMPLETED,
   payload: data,
});
export const getPlansNextPageFailed = () => ({
   type: types.GET_PLANS_NEXT_PAGE_FAILED,
});

export const resetStateToInitialAction = () => ({
   type: types.RESET_STATE_TO_INITIAL,
});