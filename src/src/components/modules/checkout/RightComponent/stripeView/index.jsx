import React from 'react';
import './index.scss';
import TextInput from 'components/elements/form/TextInput';
import PropTypes from 'prop-types';
import StripeIcons from './stripeIcons';

const StripeView = ({ disableIcons }) => {
   return (
      <div className='stripe_content'>
         {!disableIcons && <StripeIcons />}
         <div>
            <TextInput
               label='Card Number'
               placeholder='1234 1234 1234 1234'
            />
         </div>
         <div className='stripe-inputs'>
            <div>
               <TextInput
                  label='Expiration Date'
                  placeholder='MM/YY'
               />
            </div>
            <div>
               <TextInput
                  label='CVV Code'
                  placeholder='CVV'
               />
            </div>
         </div>
      </div>
   );
};

StripeView.propTypes = {
   disableIcons: PropTypes.bool,
};

export default StripeView;
