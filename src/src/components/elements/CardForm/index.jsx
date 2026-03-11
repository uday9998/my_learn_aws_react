/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/button-has-type */
import React, { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import {
   CardElement,
   Elements,
   injectStripe,
} from 'react-stripe-elements';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import credit1 from 'assets/images/plan/mastercard.png';
import credit2 from 'assets/images/plan/mastercard-1.png';
import credit3 from 'assets/images/plan/mastercard-2.png';
import credit4 from 'assets/images/plan/mastercard-3.png';
import credit5 from 'assets/images/plan/mastercard-4.png';
import Text, { SIZES as txtSize, TYPES as txtTypes } from 'components/elements/TextNew';

const CardForm = (props) => {
   const {
      stripe, getToken, currentRef, setUpdateCardInProgress,
   } = props;
   const style = {
      base: {
         color: '#32325d',
         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
         fontSmoothing: 'antialiased',
         fontSize: '16px',
         '::placeholder': {
            color: '#aab7c4',
         },
      },
      invalid: {
         color: '#fa755a',
         iconColor: '#fa755a',
      },
   };
   useImperativeHandle(currentRef, () => ({

      handleConfirm() {
         setUpdateCardInProgress(true);
         stripe.createToken().then(payload => { getToken(payload); }).catch((error) => {
            setUpdateCardInProgress(false);
            toast.error(error.message || 'Something went wrong!');
            if (isPrint(error.message) || isPrint('Something went wrong!')) {
               toast.error(error.message || 'Something went wrong!');
            }
         });
      },

   }));
   return (
      <>
         <label>
            <CardElement
               hidePostalCode={ true }
               className='MyCardElement'
               style={ style }
            />
         </label>
      </>
   );
};
const StripeCardForm = injectStripe(CardForm);

const Checkout = forwardRef(({ getToken, setUpdateCardInProgress }, ref) => {
   return (
      <div className='Checkout'>
         <div className='Checkout_imgs'>
            <img src={ credit1 } alt='plan' />
            <img src={ credit2 } alt='plan' />
            <img src={ credit3 } alt='plan' />
            <img src={ credit4 } alt='plan' />
            <img src={ credit5 } alt='plan' />
         </div>
         <div className='Checkout_imgs_text'>
            <Text
               inner='Credit Card'
               type={ txtTypes.mediumLargeGrey }
               size={ txtSize.xx_small }
            />
         </div>
         <Elements>
            <StripeCardForm
               currentRef={ ref }
               getToken={ getToken }
               setUpdateCardInProgress={ setUpdateCardInProgress }
            />
         </Elements>
      </div>
   );
});

export default Checkout;

Checkout.propTypes = {
   getToken: PropTypes.func,
   setUpdateCardInProgress: PropTypes.func,
};

CardForm.propTypes = {
   stripe: PropTypes.any,
   getToken: PropTypes.func,
   currentRef: PropTypes.any,
   setUpdateCardInProgress: PropTypes.func,
};
