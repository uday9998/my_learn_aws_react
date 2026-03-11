/* eslint-disable no-unused-vars */
import * as actions from 'state/modules/coupon/actions';
import { toast } from 'react-toastify';
import { deleteCoupon, deleteCoupons, getCoupons } from 'api';
import { ErrorPrinter } from 'utils/error';
import isPrint from '../designCourse/edit/Error';

export const initCouponsOperation = () => {
   return async dispatch => {
      try {
         dispatch(actions.getCouponsStart());
         const { data } = await getCoupons('?count=10&sort_by=ongoing');
         dispatch(actions.getCouponsCompleted(data));
      } catch (error) {
         dispatch(actions.getCouponsFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const CouponDeleteOperation = (ids, callBack) => {
   return async dispatch => {
      try {
         await deleteCoupons(ids);
         dispatch(actions.deleteCouponsCompleted(ids));
         if (isPrint('Coupon deleted successfully.')) {
            toast.success('Coupon deleted successfully.');
         }
         callBack();
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const CouponDataFilter = (filter) => {
   return async dispatch => {
      try {
         dispatch(actions.filterCouponsStart());
         const { data } = await getCoupons(filter);
         dispatch(actions.filterCouponsCompleted(data));
      } catch (error) {
         dispatch(actions.filterCouponsFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};
