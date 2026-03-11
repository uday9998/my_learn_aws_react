import React from 'react';
import './index.scss';
import TextInput from 'components/elements/form/TextInput';

const CheckoutForm = () => {
   return (
      <div className='checkoutForm'>
         <TextInput
            placeholder='Justin'
            label='Full name'
         />
         <TextInput
            placeholder='justin@miestro.com'
            label='Email Adress'
         />
         <TextInput
            placeholder='+380976534885'
            label='Phone Number'
         />
         <TextInput
            placeholder=''
            label='Create Password'
         />
      </div>
   );
};

export default CheckoutForm;
