import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Line from 'components/elements/Line';
import moment from 'moment';

const CouponInfo = ({ coupon }) => {
   const durations = ['Once', 'Repeating', 'Between Dates', 'No Expiration Date'];
   return (
      <div className='coupon__edit__bottom__general__right'>
         <Text
            inner='Coupon Details'
            type={ types.mediumLarge }
            size={ sizes.small }
         />
         <Line />
         <div className='coupon__edit__bottom__general__right__block'>
            <Text
               inner='Coupon Code'
               size={ sizes.small }
               type={ types.regularDefault }
            />
            <Text
               inner={ coupon.coupon_code }
               size={ sizes.small }
               type={ types.regularDefault }
            />
         </div>
         <Line />
         <div className='coupon__edit__bottom__general__right__block'>
            <Text
               inner='Discount Type'
               size={ sizes.small }
               type={ types.regularDefault }
            />
            <Text
               inner={ coupon.coupon_type === 'percentage' ? 'Percent Off' : 'Amount Off' }
               size={ sizes.small }
               type={ types.regularDefault }
            />
         </div>
         <Line />
         <div className='coupon__edit__bottom__general__right__block'>
            <Text
               inner={ coupon.coupon_type === 'percentage' ? 'Percent Off' : 'Amount Off' }
               size={ sizes.small }
               type={ types.regularDefault }
            />
            <Text
               inner={ coupon.coupon_type === 'percentage' ? `${ coupon.coupon_percentage }%` : `${ coupon.coupon_amount }$` }
               size={ sizes.small }
               type={ types.regularDefault }
            />
         </div>
         <Line />
         <div className='coupon__edit__bottom__general__right__block'>
            <Text
               inner='Duration'
               size={ sizes.small }
               type={ types.regularDefault }
            />
            <Text
               inner={ durations[coupon.coupon_duration] }
               size={ sizes.small }
               type={ types.regularDefault }
            />
         </div>
         {coupon.coupon_duration !== 3 && (
            <>
               <Line />
               <div className='coupon__edit__bottom__general__right__block'>
                  <Text
                     inner='Expiration Date'
                     size={ sizes.small }
                     type={ types.regularDefault }
                  />
                  <Text
                     inner={ coupon.expire_time ? moment(coupon.expire_time).format('MMMM D, YYYY LT') : 'No Expiration Date' }
                     size={ sizes.small }
                     type={ types.regularDefault }
                  />
               </div>
            </>
         )}
      </div>
   );
};

CouponInfo.propTypes = {
   coupon: PropTypes.object,
};

export default CouponInfo;
