/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import {
   Td, Th, Tr, Theader, Tbody,
} from 'components/elements/Table';
import getCurrencySumbol from 'utils/getCurrencySymbol';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const headings = [
   'Plan',
   'Code',
   'Class Price',
   'Coupon Type',
   'Expiry Date',
   '',
];

const CouponsTable = ({ coupons, deleteCoupon }) => {
   const renderTableHeader = () => {
      return headings.map((key, index) => {
         return (
            <Th key={ index }>
               {key}
            </Th>
         );
      });
   };

   const renderTableData = () => {
      return coupons && coupons.map((pricing) => {
         return pricing.coupons && pricing.coupons.map((coupon) => {
            const {
               id: couponId, coupon_code: code, coupon_type: couponType,
               coupon_duration: couponDuration, expire_time: expiryDate,
               coupon_percentage: couponPercentage, coupon_amount: couponAmount,
            } = coupon;
            const {
               id: pricingId, name, price, currency,
            } = pricing;
            let currentCouponType;
            switch (couponType) {
               case 'percentage':
                  currentCouponType = `${ couponPercentage } %`;
                  break;
               case 'flate_rate':
                  currentCouponType = `${ getCurrencySumbol(currency) } ${ couponAmount }`;
                  break;
               default:
                  currentCouponType = '-';
            }
            return (
               <Tr key={ couponId }>
                  <Td>{name}</Td>
                  <Td>{code}</Td>
                  <Td>{`${ getCurrencySumbol(currency) } ${ price || '-' }`}</Td>
                  <Td>{currentCouponType || '-' }</Td>
                  <Td>{expiryDate || '-'}</Td>
                  <Td noText>
                     <BaseButton
                        size={ btnSize.medium }
                        text='DELETE'
                        onClick={ () => deleteCoupon(pricingId, couponId) }
                        style={ { backgroundColor: 'red' } }
                     />
                  </Td>
               </Tr>
            );
         });
      });
   };

   return (
      <div className='couponsTable'>
         {
            window.innerWidth >= 1024 && (

               <table id='coupons' className='coupons w-full desctop-tab '>
                  <Theader>
                     <Tr>
                        {renderTableHeader()}
                     </Tr>
                  </Theader>
                  <Tbody>
                     {renderTableData()}
                  </Tbody>
               </table>
            )}
         {
            window.innerWidth < 1024 && (

               coupons && coupons.map((pricing) => {
                  return pricing.coupons && pricing.coupons.map((coupon) => {
                     const {
                        id: couponId, coupon_code: code, coupon_type: couponType,
                        coupon_duration: couponDuration, expire_time: expiryDate,
                        coupon_percentage: couponPercentage, coupon_amount: couponAmount,
                     } = coupon;
                     const {
                        id: pricingId, name, price, currency,
                     } = pricing;
                     let currentCouponType;
                     switch (couponType) {
                        case 'percentage':
                           currentCouponType = `${ couponPercentage } %`;
                           break;
                        case 'flate_rate':
                           currentCouponType = `${ getCurrencySumbol(currency) } ${ couponAmount } `;
                           break;
                        default:
                           currentCouponType = '-';
                     }
                     return (
                        <div
                           key={ couponId }
                           className='mob-plans-tabel'
                        >
                           <div className='mob-plans-tabel-row'>
                              <span className='header'> Plan </span>
                              <span className='plans-value'> { name } </span>
                           </div>
                           <div className='mob-plans-tabel-row'>
                              <span className='header'> Code </span>
                              <span className='plans-value'> {code } </span>
                           </div>
                           <div className='mob-plans-tabel-row'>
                              <span className='header'> Class Price </span>
                              <span className='plans-value'> { `${ getCurrencySumbol(currency) } ${ price || '-' }`} </span>
                           </div>
                           <div className='mob-plans-tabel-row'>
                              <span className='header'> Coupon Type </span>
                              <span className='plans-value'> { currentCouponType || '-'} </span>
                           </div>
                           <div className='mob-plans-tabel-row'>
                              <span className='header'> Expiry Date </span>
                              <span className='plans-value'>  {expiryDate || '-'} </span>
                           </div>
                           <div className='mob-plans-tabel-bottom'>
                              <BaseButton
                                 size={ btnSize.medium }
                                 text='DELETE'
                                 onClick={ () => deleteCoupon(pricingId, couponId) }
                                 style={ { backgroundColor: 'red' } }
                              />
                           </div>
                        </div>
                     );
                  });
               })
            )}

      </div>
   );
};

CouponsTable.propTypes = {
   coupons: PropTypes.array,
   deleteCoupon: PropTypes.func,
};

export default CouponsTable;
