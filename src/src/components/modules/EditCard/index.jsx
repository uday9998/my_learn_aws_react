import React, { useState } from 'react';
import {
   Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Text, { SIZES as txtSizes, TYPES as txtTypes } from 'components/elements/TextNew';
import './index.scss';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import { stripeCountries } from 'utils/stripeCountries';
import IconNew from 'components/elements/iconsSize';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

export const inputStyle = {
   fontWeight: '400',
   fontSize: '14px',
   color: '#131F1E',
   lineHeight: '24px',
};
const CheckoutForm = ({ onUpdate }) => {
   const [cardName, setCardName] = useState('');
   const [cardCountry, setCardCountry] = useState('AU');
   const [postalCode, setPostalCode] = useState('');
   const stripe = useStripe();
   const elements = useElements();
   const [isFetching, setIsFetching] = useState(false);
   const handleUpdate = async () => {
      if (!stripe && !elements) {
         return;
      }
      setIsFetching(true);
      // const res = await stripe.createToken({
      //    type: 'card',
      //    card: elements.getElement(CardNumberElement),
      //    billing_details: {
      //       name: cardName,
      //       address: {
      //          country: cardCountry,
      //       },
      //    },
      // });
      const res = await stripe.createToken(elements.getElement(CardNumberElement), {
         name: cardName,
         address_city: cardCountry,
      });
      setIsFetching(false);
      if (res && res.error) {
         if (isPrint(res.error.message)) {
            toast.error(res.error.message);
         }
         return;
      }
      onUpdate(res.token.id);
   };

   return (
      <form>
         {isFetching && (
            <LoaderSpinner />
         )}
         <Input
            value={ cardName }
            onChange={ (name, value) => setCardName(value) }
            label='Card Name'
            name='card'
         />
         <div className='edit__payment__item'>
            <IconNew name='CardListM' />
            <Text
               inner='Credit card number'
               type={ txtTypes.regularDefault }
               size={ txtSizes.small }
            />
            <div className='edit__payment__input'>
               <CardNumberElement
                  options={ {
                     style: {
                        base: inputStyle,
                     },
                  }
                  }
               />
            </div>
         </div>
         <div className='edit__payment__flex edit__payment__date-cvv'>
            <div className='edit__payment__item'>
               <Text
                  inner='Expiration date'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
               />

               <div className='edit__payment__input'>
                  <CardExpiryElement
                     options={ {
                        style: {
                           base: inputStyle,
                        },
                        placeholder: 'MM / YYYY',
                     } }
                  />
               </div>
            </div>
            <div className='edit__payment__item'>
               <Text
                  inner='CVC Code'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
               />

               <div className='edit__payment__input'>
                  <CardCvcElement
                     options={ {
                        style: {
                           base: inputStyle,
                        },
                        placeholder: 'CVC',
                     } }
                  />
               </div>
            </div>
         </div>
         <Input
            value={ postalCode }
            onChange={ (name, value) => setPostalCode(value) }
            label='Postal Code'
            name='postalCode'
         />
         <Select
            value={ cardCountry }
            onChange={ (name, value) => setCardCountry(value) }
            options={ stripeCountries }
            type='select-large'
            label='Country'
         />
         <BaseButton
            text='Save Payment Method'
            style={ { maxWidth: 'max-content', marginTop: '16px' } }
            onClick={ () => handleUpdate() }
         />
      </form>
   );
};
const EditCard = ({ onUpdate }) => {
   return (
      <div className='edit__payment'>
         <Elements stripe={ stripePromise }>
            <CheckoutForm onUpdate={ onUpdate } />
         </Elements>
      </div>
   );
};

EditCard.propTypes = {
   onUpdate: PropTypes.func,
};

CheckoutForm.propTypes = {
   onUpdate: PropTypes.func,
};
export default EditCard;
