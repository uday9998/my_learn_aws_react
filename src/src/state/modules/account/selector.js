import { createSelector } from 'reselect';

const innerStateSelector = state => state.account;
const accountStateSelector = state => state.common;

export const getAccountInfo = createSelector(
   innerStateSelector,
   (state) => (state.account)
);

export const getFullAccountInfo = createSelector(
   accountStateSelector,
   (state) => (state.authUser)
);

export const getProgress = createSelector(
   innerStateSelector,
   (state) => (state.inProgress)
);

export const getPlans = createSelector(
   innerStateSelector,
   (state) => (state.plans)
);

export const getPlansProgress = createSelector(
   innerStateSelector,
   (state) => (state.inProgressPlansFetching)
);

export const getBillingProgress = createSelector(
   innerStateSelector,
   (state) => (state.isProgressBilling)
);

export const getProgressPlanConnect = createSelector(
   innerStateSelector,
   (state) => (state.inProgressPlanConnect)
);
