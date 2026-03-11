import * as types from './types';

export const getCouponsStart = () => ({
   type: types.GET_COUPONS_START,
});

export const getCouponsCompleted = (data) => ({
   type: types.GET_COUPONS_COMPLETED,
   payload: data,
});

export const getCouponsFailed = () => ({
   type: types.GET_COUPONS_FAILED,
});

export const deleteCouponsCompleted = (ids) => ({
   type: types.DELETE_COUPONS_COMPLETED,
   payload: ids,
});

export const filterCouponsStart = () => ({
   type: types.FILTER_COUPONS_START,
});

export const filterCouponsFailed = () => ({
   type: types.FILTER_COUPONS_FAILED,
});

export const filterCouponsCompleted = (data) => ({
   type: types.FILTER_COUPONS_COMPLETED,
   payload: data,
});
