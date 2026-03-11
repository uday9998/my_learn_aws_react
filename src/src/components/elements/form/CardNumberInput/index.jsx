/* eslint-disable no-console */
import React, { useState } from 'react';
import './index.scss';
import card from 'assets/images/checkout/card.png';
import classnames from 'classnames';
import TextInput from 'components/elements/form/TextInput';

const CardNumberInput = () => {
   const [focused, setFocused] = useState(false);
   return (
      <>
         <div className={ classnames('cardNumberInput', { 'cardNumberInput_focused': focused }) }>
            <img src={ card } alt='card' />
            <div className='cardNumberInput__inputs'>
               <input
                  className='cardNumberInput__number'
                  placeholder='Card Number'
                  onFocus={ () => setFocused(true) }
                  onBlur={ () => setFocused(false) }
               />
               <input
                  className='cardNumberInput__cvc'
                  placeholder='MM / YY / CVC'
                  onFocus={ () => setFocused(true) }
                  onBlur={ () => setFocused(false) }
               />
            </div>
         </div>
         <div className='mob-cardNumberInput'>
            <div className='mob-creditCardInput m-b-l'>
               <img src={ card } alt='card' />
               <TextInput
                  placeholder='Card Number'
                  label=''
               />
            </div>
            <TextInput
               placeholder='MM / YY / CVC'
               label=''
            />
         </div>
      </>
   );
};

export default CardNumberInput;
