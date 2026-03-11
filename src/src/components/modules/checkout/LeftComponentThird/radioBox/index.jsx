/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';


const RadioBox = ({
   setActivePricingIndex, pricing, checked, index,
}) => {
   const getPricing = () => {
      let pricingnew = `${ pricing.price } ${ pricing.currency }`;
      if (pricing.pricing_type === 2) {
         pricingnew = `${ pricingnew }/${ pricing.payment_frequence }`;
      } else if (pricing.pricing_type === 0) {
         pricingnew = 'Free';
      }
      return pricingnew;
   };

   return (
      <div className='mastercode-class-container m-b-m select-pricing' key={ pricing.id }>
         <div className='mastercode-class-details'>
            <div className='mastercode-class'>
               <div>
                  <input
                     type='radio'
                     id={ `radio-${ pricing.id }` }
                     value={ index }
                     name='payment'
                     checked={ checked }
                     onChange={ (e) => {
                        setActivePricingIndex(+e.target.value);
                     } }
                  />
                  <label htmlFor={ `radio-${ pricing.id }` } className='payment-credit-title'>
                     <Text
                        size={ txtSizes.small }
                        type={ txtType.bold }
                        inner={ pricing.name }
                        color='#1b2125'
                     />
                  </label>
               </div>
               <div>
                  <Text
                     size={ txtSizes.small }
                     type={ txtType.bold }
                     inner={ getPricing() }
                     color='#71B6EF'
                  />
               </div>
            </div>

         </div>
      </div>
   );
};

export default RadioBox;

RadioBox.propTypes = {
   pricing: PropTypes.object,
   setActivePricingIndex: PropTypes.func,
   checked: PropTypes.bool,
   index: PropTypes.number,
};

RadioBox.defaultProps = {
};
