/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import Line from 'components/elements/Line';
import circles from 'assets/images/circles.png';
import moment from 'moment';
import Info from 'components/elements/messages/info';
import { parseFloatNew } from 'utils/numberParseFloat';
import './index.scss';

const CouponCreateRight = ({ inputs, offers }) => {
   const getDate = () => {
      if (inputs.expiration_date) {
         return ` The expiration date is ${ moment(inputs.expiration_date).format('MMMM DD, YYYY') }`;
      }
      return ' The expiration date has not been added yet';
   };

   const getCouponText = () => {
      let text = `${ inputs.code || '' } - `;
      if (inputs.type === 0) {
         text += `${ inputs.percent || 0 }% OFF `;
      } else {
         text += `${ parseFloatNew(inputs.amount || 0) } OFF `;
      }
      if (inputs.offer) {
         text += `and is connected to ${ inputs.offer_name.length === 2 ? inputs.offer_name.join(' and ') : inputs.offer_name.join(', ') } plan`;
      }
      text += '. Duration - ';
      switch (inputs.duration_type) {
         case 0:
            text += `Once. ${ inputs.expiration_type === 0 ? getDate() : 'No Expiration Date' }`;
            break;
         default:
            text += `Repeating ${ inputs.repetitions || 0 } times. ${ inputs.expiration_type === 0 ? getDate() : 'No Expiration Date' }`;
            break;
      }
      return text;
   };

   return (
      <div className='coupon__create__view__right'>
         <Text
            inner='Preview'
            type={ types.medium150 }
            size={ sizes.medium }
         />
         <div className='coupon__create__view__right__preview'>
            <div className='coupon__create__view__right__preview__top'>
               <div className='left'>
                  <Text
                     inner='Coupon Discount'
                     type={ types.regular148 }
                     size={ sizes.medium }
                  />
                  <Text
                     inner={ inputs.code || '-' }
                     type={ types.medium }
                     size={ sizes.xlarge }
                  />
                  {inputs.offer.length !== 0 && (
                     <>
                        {inputs.offer.length === offers.length ? (
                           <SimpleStatus
                              color='black'
                              text='All Plans Connected'
                           />
                        ) : (
                           <div className='coupon__plans__list'>
                              {inputs.offer_name.map((e, index) => {
                                 return (
                                    <SimpleStatus
                                       key={ index }
                                       color='navy'
                                       text={ `${ e } Plan` }
                                    />
                                 );
                              })}
                           </div>
                        )}

                     </>
                  )}
               </div>
               <div className='right' style={ { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } }>
                  <Text
                     inner={ inputs.type === 0 ? `${ inputs.percent || 0 }%` : `${ parseFloatNew(inputs.amount || 0) }` }
                     type={ types.bold100 }
                     style={ { fontSize: '28px', color: '#24554E', whiteSpace: 'nowrap' } }
                  />
                  <Text
                     inner='OFF'
                     type={ types.bold100 }
                     style={ { fontSize: '28px', color: '#24554E', whiteSpace: 'nowrap' } }
                  />
               </div>
            </div>
            <Line />
            <div className='coupon__create__view__right__preview__expiration'>
               <Text
                  inner='Expiration Date'
                  type={ types.mediumLarge }
                  size={ sizes.small }
               />
               <div className='coupon__create__view__right__preview__expiration__right'>
                  {inputs.expiration_type === 1 && (
                     <Text
                        inner='No Expiration Date'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  )}
                  {inputs.expiration_type === 0 && (
                     <Text
                        inner={ inputs.expiration_date ? moment(inputs.expiration_date).format('MMMM DD, YYYY') : '-' }
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  )}
               </div>
            </div>
            <Line />
            <img src={ circles } alt='' />
            <div className='coupon__create__view__right__preview__bottom'>
               <Info
                  isHaveCancel={ false }
                  title={ getCouponText() }
               />
            </div>
         </div>
      </div>
   );
};

CouponCreateRight.propTypes = {
   inputs: PropTypes.object,
   offers: PropTypes.array,
};

export default CouponCreateRight;
