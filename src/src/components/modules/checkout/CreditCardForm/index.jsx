import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import CheckBox from 'components/elements/form/CheckBox';
import CardNumberInput from 'components/elements/form/CardNumberInput';
import {
   visa,
   masterCard,
   discover,
   americanExpress,
} from 'assets/images/checkout';

const CreditCardForm = () => {
   return (
      <div className='creditCardForm'>
         <div className='cardsLightBlock'>
            <img src={ visa } alt='visa' />
            <img src={ masterCard } alt='master card' />
            <img src={ discover } alt='discover' />
            <img src={ americanExpress } alt='american express' />
         </div>
         <div className='creditCardInput'>
            <CardNumberInput />
         </div>
         <div className='m-b-m cursor-pointer'>
            <Text
               style={ { fontSize: '12px' } }
               type={ TextType.regular }
               size={ TextSize.extraSmall }
               inner='*Why are you asking for my credit card number?'
            />
         </div>
         <CheckBox label='Yes! Send me Miestro News and Updates' />
      </div>
   );
};

export default CreditCardForm;
