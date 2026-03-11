/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import moment from 'moment';
import CouponItem from '../Item';
import CouponMobileItem from '../mobile-item';

const CouponsList = ({
   data, onDelete, isMultiSelect, checkedIds, onCheck, searchValue,
   goToEditPage, isMobile,
}) => {
   const items = ['Status', 'Coupon Name', 'Number of Offers', 'Amount Off', 'Duration', 'Expiration Date'];

   const IsCouponOnGoing = (item) => {
      let status = 0;
      switch (item.coupon_duration) {
         case 0:
            status = moment().isAfter(item.expire_time) ? 0 : 1;
            break;

         case 1:
            status = moment().isAfter(item.expire_time) ? 0 : 1;
            break;

         case 2:
            if (moment().isAfter(item.start_time) && moment().isBefore(item.end_time)) {
               status = 1;
            }
            break;
         default:
            status = 1;
      }
      return status;
   };

   const getExpirationDate = (item) => {
      let date = '';
      if (item.coupon_duration === 3) {
         date = 'No Expiration Date';
      }
      if (item.coupon_duration === 2) {
         date = moment(item.end_time).format('MMM D,YYYY LT');
      }
      if ((item.coupon_duration === 1 || item.coupon_duration === 0)) {
         if (item.expire_time) {
            date = moment(item.expire_time).format('MMM D,YYYY LT');
         } else {
            date = 'No Expiration Date';
         }
      }
      return date;
   };

   if (isMobile) {
      return (
         <div
            className='coupons__mobile__data'
         >
            {
               data.map(item => (
                  <CouponMobileItem
                     key={ item.id }
                     isMultiSelect={ isMultiSelect }
                     onDelete={ onDelete }
                     searchValue={ searchValue }
                     onEdit={ () => goToEditPage(item.id) }
                     item={ item }
                     onCheck={ onCheck }
                     isChecked={ checkedIds.includes(item.id) }
                     date={ getExpirationDate(item) }
                     status={ IsCouponOnGoing(item) }
                  />
               ))
            }
         </div>
      );
   }
   return (
      <div className='coupons__data'>
         <table>
            <thead>
               <tr>
                  {isMultiSelect && <th />}
                  {items.map((e, index) => {
                     return (
                        <th
                           className={ (index !== 0 && index !== 1) ? 'coupons__data__tr__start' : '' }
                           key={ index }
                        >
                           <Text
                              inner={ e }
                              type={ types.mediumLarge }
                              size={ sizes.small }
                           />
                        </th>
                     );
                  })}
                  <th />
               </tr>
            </thead>
            <tbody>
               {data.map((e, index) => {
                  return (
                     <CouponItem
                        key={ index }
                        isMultiSelect={ isMultiSelect }
                        onDelete={ onDelete }
                        searchValue={ searchValue }
                        onEdit={ () => goToEditPage(e.id) }
                        item={ e }
                        onCheck={ onCheck }
                        isChecked={ checkedIds.includes(e.id) }
                        date={ getExpirationDate(e) }
                        status={ IsCouponOnGoing(e) }
                     />
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

CouponsList.propTypes = {
   data: PropTypes.array,
   isMultiSelect: PropTypes.bool,
   checkedIds: PropTypes.array,
   goToEditPage: PropTypes.func,
   onCheck: PropTypes.func,
   onDelete: PropTypes.func,
   searchValue: PropTypes.string,
   isMobile: PropTypes.bool,
};

export default CouponsList;
