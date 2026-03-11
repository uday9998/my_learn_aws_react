import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as txtType, SIZES as txtSizes } from 'components/elements/Text';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import CouponsTable from 'components/elements/designCourse/plan/CouponsTable';

const SavedCoupons = ({ coupons, deleteCoupon }) => {
   let couponsLength = 0;
   if (Array.isArray(coupons)) {
      coupons.forEach(element => {
         if (element.coupons) {
            couponsLength += element.coupons.length;
         }
      });
   }
   if (couponsLength === 0) {
      return null;
   }
   return (
      <ItemWrapper>
         <div className='savedCoupons'>
            <div className='w-full flex justify-start'>
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.normal }
                  inner='SAVED COUPONS'
               />
            </div>
            <div className='w-full m-t-m'>
               <CouponsTable
                  coupons={ coupons }
                  deleteCoupon={ (pricingId, couponId) => deleteCoupon(pricingId, couponId) }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

SavedCoupons.propTypes = {
   coupons: PropTypes.array,
   deleteCoupon: PropTypes.func,
};

export default SavedCoupons;
