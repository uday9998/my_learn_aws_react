import { createSelector } from 'reselect';

const innerStateSelector = state => state.coupon;

export const initalCouponsCountSelector = createSelector(
   innerStateSelector,
   state => state.initialCoupons
);

export const CouponsCountSelector = createSelector(
   innerStateSelector,
   state => state.coupons
);

export const ProgressSelector = createSelector(
   innerStateSelector,
   state => state.progress
);

export const filterProgressSelector = createSelector(
   innerStateSelector,
   state => state.filterProgress
);
