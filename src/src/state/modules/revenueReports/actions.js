import * as types from './types';

export const getRevenueStatisticStart = () => ({
   type: types.GET_REVENUE_STATISTIC_START,
});

export const getRevenueFilterStatisticStart = () => ({
   type: types.GET_REVENUE_FILTER_STATISTIC_START,
});

export const getRevenueStatisticCompleted = (data) => ({
   type: types.GET_REVENUE_STATISTIC_COMPLETED,
   payload: {
      data,
   },
});

export const getRevenueStatisticFailed = (errors) => ({
   type: types.GET_REVENUE_STATISTIC_FAILED,
   payload: {
      errors,
   },
});

export const getGhostStart = () => ({
   type: types.GET_GHOST_START,
});

export const getGhostCompleted = (data) => ({
   type: types.GET_GHOST_COMPLETED,
   payload: data,
});

export const getGhostFailed = (errors) => ({
   type: types.GET_GHOST_FAILED,
   payload: {
      errors,
   },
});
export const getStepsStart = () => ({
   type: types.GET_STEPS_START,
});

export const getStepsCompleted = (data) => ({
   type: types.GET_STEPS_COMPLETED,
   payload: data,
});

export const getStepsFailed = (errors) => ({
   type: types.GET_STEPS_FAILED,
   payload: {
      errors,
   },
});
