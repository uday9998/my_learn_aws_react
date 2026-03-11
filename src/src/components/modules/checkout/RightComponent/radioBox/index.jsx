/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';

const RadioBox = ({
   setActivePricingIndex, pricing, checked, index,
}) => {
   return (
      <div className='select-pricing'>
         <input
            type='radio'
            value={ index }
            id={ `radio-${ pricing.id }` }
            name='payment'
            checked={ checked }
            onChange={ (e) => {
               setActivePricingIndex(+e.target.value);
            } }
         />
         <label htmlFor={ `radio-${ pricing.id }` } className='payment-credit-title'>
            <Text
               type={ txtType.SemiBold }
               size={ txtSizes.small }
               color='#333333'
               inner={ pricing.name }
            />
         </label>
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
