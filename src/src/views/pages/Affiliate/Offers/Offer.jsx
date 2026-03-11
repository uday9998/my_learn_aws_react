import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

const Offer = ({
   picture, isChecked, onCheck, planName, isFree, pricings,
}) => {
   return (
      <div
         className='affiliate__offer'
         role='presentation'
         onClick={ () => onCheck() }
      >
         <div className='affiliate__offer__top'>
            <img src={ picture } alt='' style={ { opacity: isChecked ? '0.5' : '1' } } />
            <div className='affiliate__offer__top__actions'>
               <CheckBox
                  checked={ isChecked }
                  onChange={ () => onCheck() }
               />
               <div className='affiliate__offer__top__actions__right'>
                  {isFree ? (
                     <div className='affiliate__offer__top__actions__right__unlock'>
                        <IconNew name='UnLockAffiliateOffersS' />
                        <Text
                           inner='Free'
                           type={ types.mediumSmall }
                           style={ { color: 'white', lineHeight: '140%' } }
                           size={ sizes.xx_small }
                        />
                     </div>
                  ) : (
                     <div className='affiliate__offer__top__actions__right__info'>
                        <IconNew name='LockAffiliateOfferS' />
                     </div>
                  )}
                  <div className='affiliate__offer__top__actions__right__info'>
                     <IconNew name='PricingsAffiliateOffersS' />
                     <Text
                        inner={ pricings.length }
                        type={ types.mediumSmall }
                        style={ { color: 'white', lineHeight: '140%' } }
                        size={ sizes.xx_small }
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className='affiliate__offer__bottom'>
            <Text
               inner={ planName }
               type={ types.medium153 }
               size={ sizes.large }
            />
         </div>
      </div>
   );
};

Offer.propTypes = {
   picture: PropTypes.string,
   isChecked: PropTypes.bool,
   onCheck: PropTypes.func,
   planName: PropTypes.string,
   isFree: PropTypes.bool,
   pricings: PropTypes.array,
};

export default Offer;
