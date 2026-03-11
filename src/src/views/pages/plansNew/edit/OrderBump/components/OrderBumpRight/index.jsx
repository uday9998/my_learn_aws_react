/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/switchNew';
import Line from 'components/elements/Line';
import image from 'assets/images/plan/default.png';
import getCurrencySumbol from 'utils/getCurrencySymbol';

const OrderBumpRight = ({
   inputs, onChange, selectedOffer, selectedPricing,
}) => {
   const oldPrice = selectedPricing ? selectedPricing.price || 'FREE' : 0;
   const savePrice = selectedPricing ? (selectedPricing.pricing_type === 0 ? '0' : null) : null;
   const getBumpPrice = () => {
      if (!savePrice) {
         if (inputs.type === 1) {
            return `${ selectedPricing.price - (inputs.price || 0) }$`;
         }
         return `${ selectedPricing.price - ((selectedPricing.price / 100) * (inputs.percent || 0)) }$`;
      }
      return `${ oldPrice }${ oldPrice === 'FREE' ? '' : '$' }`;
   };
   return (
      <div className='plan__order__bump__view__right'>
         <Text
            inner='Preview'
            type={ types.medium150 }
            size={ sizes.medium }
         />
         <div className='plan__order__bump__view__right__section'>
            <div className='plan__order__bump__view__right__section__order'>
               <Text
                  inner='Upgrade My Order'
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
               <Switch
                  value={ inputs.order }
                  onChange={ (value) => onChange('order', value ? 1 : 0) }
                  size='medium'
               />
            </div>
            <Line />
            {!inputs.offer ? (
               <div className='plan__order__bump__view__right__section__empty'>
                  <Text
                     inner='So far there are no products in this order bump'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#444C4B' } }
                  />
               </div>
            ) : (
               <div className='plan__order__bump__view__right__section__offer'>
                  <img src={ selectedOffer.pitcure_src || image } alt='' />
                  <Text
                     inner={ selectedOffer.name }
                     type={ types.mediumLarge }
                     size={ sizes.small }
                  />
               </div>
            )}
            <Line />
            <div className='plan__order__bump__view__right__section__view'>
               <Text
                  inner={ inputs.headline || 'Headline' }
                  type={ types.mediumLarge }
                  size={ sizes.small }
               />
               <Text
                  inner={ inputs.description || 'Describe your product in the best way...' }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
            {selectedPricing && (
               <>
                  <Line />
                  <div className='plan__order__bump__view__right__section__prices'>
                     <div className='block'>
                        <Text
                           inner='Old Price:'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                        <Text
                           inner={ oldPrice }
                           type={ types.medium160 }
                           size={ sizes.small }
                           style={ { color: '#D12D36' } }
                        />
                     </div>
                     <div className='block'>
                        <Text
                           inner='You Save:'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                        <Text
                           inner={ savePrice || (inputs.type === 1 ? `${ inputs.price || 0 }${ getCurrencySumbol(inputs.currency) }` : `${ inputs.percent || 0 }%`) }
                           type={ types.medium160 }
                           size={ sizes.small }
                           style={ { color: '#24554E' } }
                        />
                     </div>
                     <Line />
                     <div className='block'>
                        <Text
                           inner='Total:'
                           type={ types.medium160 }
                           size={ sizes.xlarge }
                        />
                        <Text
                           inner={ `${ getBumpPrice() }` }
                           type={ types.medium160 }
                           size={ sizes.xlarge }
                        />
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

OrderBumpRight.propTypes = {
   inputs: PropTypes.object,
   selectedOffer: PropTypes.any,
   onChange: PropTypes.func,
   selectedPricing: PropTypes.object,
};

export default OrderBumpRight;
