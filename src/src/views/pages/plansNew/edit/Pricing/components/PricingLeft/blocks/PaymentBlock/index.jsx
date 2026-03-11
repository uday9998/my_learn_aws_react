/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import stripeImage from 'assets/images/plan/stripe.png';
import braintreeImage from 'assets/images/plan/braintree.png';
import paypalImage from 'assets/images/plan/paypal.png';
import stripeTextImage from 'assets/images/plan/stripeText.png';
import barinTreeTextImage from 'assets/images/plan/braintreeText.png';
import paystackTextImage from 'assets/images/plan/paystackText.png';
import paypalTextImage from 'assets/images/plan/paypalText.png';
import CheckBox from 'components/elements/form/CheckBoxNew';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';
import IntegrationElem from '../IntegrationElem';

const PaymentBlock = ({
   integrations, goToIntegrations, onSelectIntegration, onConnectIntegration, getCheckedPayments,
   errorMessages,
}) => {
   const [paymentInputs, setPaymentInputs] = useState({});
   const integrationsItemsMap = [
      {
         name: 'Stripe',
         helpUrl: 'https://support.miestro.com/article/67-integrating-with-stripe',
         subtitle: 'Miestro will track all the data with Google Analytics and keep track of your pages in Miestro.',
         image: stripeImage,
         onConnect: () => onConnectIntegration('stripe', paymentInputs),
      },
      {
         subtitle: 'Miestro will track all the data with Google Analytics and keep track of your pages in Miestro.',
         name: 'Braintree',
         image: braintreeImage,
         helpUrl: 'https://support.miestro.com/article/297-braintree-integration',
         inputs: [
            {
               label: 'Merchant Id',
               field_value: paymentInputs.merchant_id,
               name: 'merchant_id',
               placeholder: 'Merchant Id',
            },
            {
               label: 'Public Key',
               field_value: paymentInputs.public_key,
               name: 'public_key',
               placeholder: 'Public Key',
            },
            {
               label: 'Private Key',
               field_value: paymentInputs.private_key,
               name: 'private_key',
               placeholder: 'Private Key',
            },
         ],
         onConnect: () => onConnectIntegration('braintree', paymentInputs),
      },
      {
         subtitle: 'Miestro will track all the data with Google Analytics and keep track of your pages in Miestro.',
         name: 'PayPal',
         image: paypalImage,
         helpUrl: 'https://support.miestro.com/article/298-integration-with-paypal',
         inputs: [{
            label: 'Miestro will track all the the data with Google Analytics and keep track of your pages in Miestro.',
            field_value: paymentInputs.paypal_client_id_v2,
            name: 'paypal_client_id_v2',
            placeholder: 'Client ID',
         }, {
            field_value: paymentInputs.paypal_secret_v2,
            name: 'paypal_secret_v2',
            placeholder: 'Secret',
         }],
         onConnect: () => onConnectIntegration('paypalv2', paymentInputs),
      },
   ];


   const handleInputChange = (name, value) => {
      setPaymentInputs({
         ...paymentInputs,
         [name]: value,
      });
   };

   const isHaveAnyIntegration = () => {
      const items = [];
      if (!integrations) {
         return [];
      }
      if (integrations.braintree_account_id) {
         items.push({
            key: 'Braintree', id: 'braintree', img: barinTreeTextImage, isChecked: getCheckedPayments().includes('braintree'),
         });
      }
      if (integrations.stripe_account_id) {
         items.push({
            key: 'Stripe', id: 'stripe', img: stripeTextImage, isChecked: getCheckedPayments().includes('stripe'),
         });
      }
      if (integrations.paypal_client_id_v2) {
         items.push({
            key: 'PayPal', id: 'paypal-v2', img: paypalTextImage, isChecked: getCheckedPayments().includes('paypal'),
         });
      }
      if (integrations.paystack) {
         items.push({
            key: 'Paystack', id: 'paystack', img: paystackTextImage, isChecked: getCheckedPayments().includes('paystack'),
         });
      }
      return items;
   };

   const firstText = 'Please connect your payment providers account to collect payment';
   const secondText = 'If you need to add additional payment methods, you can go to the integration section and add them there.';

   const forMap = isHaveAnyIntegration();

   return (
      <div className='plan__pricing__left__plans__integration'>
         <div className='plan__pricing__left__plans__integration__top'>
            <Text
               inner='Payment Methods'
               type={ types.medium153 }
               size={ sizes.large }
            />
            <Text
               inner='Set up and collect payment on this Plan with any of your connected providers.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#444C4B' } }
            />
         </div>
         <ErrorMessageWrapper
            errorMessages={errorMessages}
         >
            <div className='plan__pricing__left__plans__integration__bottom'>
               <div className='integration__bottom__top'>
                  <Text
                     inner='Payment Integrations'
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
                  <Text
                     inner={ forMap.length ? secondText : firstText }
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
               {forMap.length > 0 ? (
                  <div className='integration__bottom__items'>
                     {forMap.map((e, index) => {
                        return (
                           <div
                              key={ index }
                              className='integration__bottom__items__checkbox'
                           >
                              <CheckBox
                                 onChange={ () => onSelectIntegration(e.id) }
                                 checked={ e.isChecked }
                              />
                              <img src={ e.img } alt='' />
                           </div>
                        );
                     })}
                  </div>
               ) : (
                  <div className='integration__bottom__items'>
                     {integrationsItemsMap.map((item, index) => {
                        return (
                           <IntegrationElem
                              key={ index }
                              title={ item.name }
                              image={ item.image }
                              data={ item.inputs }
                              onChange={ handleInputChange }
                              onConnect={ item.onConnect }
                              subtitle={ item.subtitle }
                              helpUri={ item.helpUrl }
                           />
                        );
                     })}
                  </div>
               )}
               <Text
                  inner='Go to Integrations Settings'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#24554E', cursor: 'pointer', textDecoration: 'underline' } }
                  onClick={ () => goToIntegrations() }
               />
            </div>
         </ErrorMessageWrapper>
      </div>
   );
};

PaymentBlock.propTypes = {
   onConnectIntegration: PropTypes.func,
   goToIntegrations: PropTypes.func,
   integrations: PropTypes.object,
   getCheckedPayments: PropTypes.string,
   onSelectIntegration: PropTypes.func,
   errorMessages: PropTypes.array,
};

export default PaymentBlock;
