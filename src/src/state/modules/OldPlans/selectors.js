import { createSelector } from 'reselect';

const innerStateSelector = state => state.plans;

export const getPlansInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getPlansInProgress)
);

export const subscriptionSelector = createSelector(
   innerStateSelector,
   (state) => (state.subscription)
);

export const plansSelector = createSelector(
   innerStateSelector,
   (state) => (state.plans)
);
export const plansModalIsOpenedSelector = createSelector(
   innerStateSelector,
   (state) => (state.plansModalIsOpened)
);
export const cardModalIsOpenedSelector = createSelector(
   innerStateSelector,
   (state) => (state.cardModalIsOpened)
);

export const plansModalStateInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.plansModalStateInProgress)
);

export const changePlanErrorsSelector = createSelector(
   innerStateSelector,
   (state) => (state.changePlanErrors)
);

export const refundedSelector = createSelector(
   innerStateSelector,
   (state) => (state.refunded)
);
export const cardUpdateModalIsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.cardUpdateModalIsInProgress)
);
