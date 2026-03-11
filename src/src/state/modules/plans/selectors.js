import { createSelector } from 'reselect';

const innerStateSelector = state => state.plans;

export const getPlansInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getPlansInProgress)
);

export const plansSelector = createSelector(
   innerStateSelector,
   (state) => (state.plans)
);

export const filterInProgressSelector = createSelector(
   innerStateSelector,
   state => state.filterInProgress
);

export const planSelector = createSelector(
   innerStateSelector,
   state => state.plan
);

export const planProgressSelector = createSelector(
   innerStateSelector,
   state => state.planProgress
);

export const initalPlanSelector = createSelector(
   innerStateSelector,
   state => state.initial
);

export const planLoadingSelector = createSelector(
   innerStateSelector,
   state => state.planLoading
);

export const authoresponderListOptionsSelector = createSelector(
   innerStateSelector,
   state => state.authoresponderListOptions
);

export const authoresponderListOptionsInProgressSelector = createSelector(
   innerStateSelector,
   state => state.authoresponderListOptionsInProgress
);

export const lastPageSelector = createSelector(
   innerStateSelector,
   state => state.lastPage
);

export const isFetchingNextPageSelector = createSelector(
   innerStateSelector,
   state => state.isFetchingNextPage
);
