import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { BreadCrumb } from 'components/modules/breadcrumbs';
import Info from 'components/elements/messages/info';
import CouponEditBottomTop from './components/CouponEditTop';
import CouponInfo from './components/CouponInfo';
import CouponPlans from './components/CouponPlans';

const CouponEditPage = ({
   coupon,
   goToList,
   onDelete,
   onDetach,
   offers,
   onConnectPlan,
   isMobile,
}) => {
   return (
      <div className='coupon__edit'>
         {
            !isMobile && (
               <BreadCrumb
                  links={ [
                     { text: 'Coupon List', goTo: () => goToList() },
                     { text: coupon.coupon_code, goTo: () => {} },
                  ] }
               />
            )
         }
         <div className='coupon__edit__bottom'>
            <CouponEditBottomTop
               code={ coupon.coupon_code }
               onDelete={ onDelete }
               isMobile={ isMobile }
            />
            {coupon.plans.length === 0 && (
               <Info
                  title='You cannot edit the created coupons, because customers can already use it and after changing it, it will not work'
                  isHaveCancel={ false }
               />
            )}
            <div className='coupon__edit__bottom__general'>
               <CouponPlans
                  couponName={ coupon.coupon_code }
                  offers={ offers }
                  plans={ coupon.plans }
                  onConnectPlan={ onConnectPlan }
                  onDisconnectPlan={ onDetach }
               />
               <CouponInfo
                  coupon={ coupon }
               />
            </div>
         </div>
      </div>
   );
};

CouponEditPage.propTypes = {
   coupon: PropTypes.object,
   goToList: PropTypes.func,
   onDelete: PropTypes.func,
   offers: PropTypes.array,
   onDetach: PropTypes.func,
   onConnectPlan: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default CouponEditPage;
