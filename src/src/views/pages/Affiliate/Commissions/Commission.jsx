import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';

const Commission = ({
   offer, handleChangeCommission, index, imageUrl
}) => {
   const getPricingCommission = (pricing) => {
      const commission = offer.commission;
      if (pricing.pricing_type === 0) {
         return '-';
      }
      return ((pricing.price * commission) / 100);
   };

   const getAffiliateCommission = (pricing) => {
      if (pricing.pricing_type === 0) {
         return '-';
      }
      const pricingCommission = getPricingCommission(pricing);
      return (pricing.price - pricingCommission).toFixed(2);
   };

   return (
      <div className='affiliate__commission'>
         <div className='affiliate__commission__top'>
            <div className='affiliate__commission__top__left'>
               <div className='default'>
                  <img src={ imageUrl } alt='' />
               </div>
               <div className='content'>
                  <Text
                     inner={ offer.plan.name }
                     type={ types.regular148 }
                     size={ sizes.large }
                  />
                  <div className='pricings'>
                     {offer.plan.pricings.map((e) => {
                        return (
                           <div className='pricing'>
                              <Text
                                 inner={ e.pricing_type === 0 ? 'Free' : `$${ e.price }` }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                                 style={ { color: '#24554E' } }
                              />
                           </div>
                        );
                     })}
                     <TextWithIcon
                        iconName='AffiliateUserM'
                        inner='0'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  </div>
               </div>
            </div>
            <div className='affiliate__commission__top__right'>
               <Input
                  type='number'
                  label='Commission'
                  minNumber={ 0 }
                  helpText='Percents, %'
                  disabled={ offer.plan.pricings.length === 1 && offer.plan.pricings[0].pricing_type === 0 }
                  maxNumber={ 100 }
                  value={ offer.commission }
                  onChange={ (name, value) => handleChangeCommission(index, value) }
               />
            </div>
         </div>
         <div className='affiliate__commission__bottom'>
            <div className='affiliate__commission__bottom__block'>
               <Text
                  inner='Your Income'
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
               {offer.plan.pricings.map((e) => {
                  return (
                     <div className='price'>
                        <Text
                           inner={ `$${ getAffiliateCommission(e) }` }
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: '#24554E' } }
                        />
                     </div>
                  );
               })}
            </div>
            <div className='affiliate__commission__bottom__block'>
               <Text
                  inner='Affiliate Income'
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
               {offer.plan.pricings.map((e) => {
                  return (
                     <div className='price'>
                        <Text
                           inner={ `$${ getPricingCommission(e) }` }
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: '#24554E' } }
                        />
                     </div>
                  );
               })}
            </div>

         </div>
      </div>
   );
};

Commission.propTypes = {
   offer: PropTypes.object,
   handleChangeCommission: PropTypes.func,
   index: PropTypes.number,
   imageUrl: PropTypes.string,
};

export default Commission;
