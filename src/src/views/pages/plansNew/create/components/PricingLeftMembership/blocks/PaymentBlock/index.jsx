/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import stripeTextImage from 'assets/images/plan/stripeText.png';
import barinTreeTextImage from 'assets/images/plan/braintreeText.png';
import paypalTextImage from 'assets/images/plan/paypalText.png';
import CheckBox from 'components/elements/form/CheckBoxNew';
import paystackTextImage from 'assets/images/plan/paystackText.png';
import ApproveModal from 'components/elements/ApproveModal';
import './index.scss';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const PaymentBlock = ({
   integrations, pricings, handleInputChange, goToIntegrations, getCheckedPayments,
   errorMessages,
}) => {
   const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
   const getFilteredPlanName = (name) => {
      let filteredName = '';
      if (name.includes('braintree')) {
         filteredName = 'braintree';
      }
      if (name.includes('paystack')) {
         filteredName = 'paystack';
      }
      if (name.includes('stripe')) {
         filteredName += `${ filteredName.length ? '-' : '' }stripe`;
      }
      if (name.includes('paypal')) {
         filteredName += filteredName.length === 0 ? 'paypal-v2' : '-paypalv2';
      }
      return filteredName;
   };


   const onSelectIntegration = (type) => {
      let newPaymentMethod = getCheckedPayments();
      if (type === 'paystack' && !newPaymentMethod.includes(type)) {
         const subPlans = pricings.filter(pr => pr.pricing_type === 2);
         if (subPlans?.length && subPlans.some(obj => obj.free_trial === true)) {
            setIsOpenWarningModal(true);
         }
      }
      if (type === 'paystack' && !newPaymentMethod.includes(type)) {
         if (newPaymentMethod.includes('paypalv2')) {
            newPaymentMethod = 'paypalv2-paystack';
         } else {
            newPaymentMethod = type;
         }
      } else if (type === 'paypal-v2') {
         if (newPaymentMethod.includes(type) || newPaymentMethod.includes('paypalv2')) {
            if (type === 'paypal-v2') {
               newPaymentMethod = newPaymentMethod.replaceAll('paypalv2', '');
            }
            newPaymentMethod = newPaymentMethod.replaceAll(type, '');
         } else if (newPaymentMethod.includes('paystack')) {
            newPaymentMethod = 'paypalv2-paystack';
         } else {
            newPaymentMethod += type;
         }
      } else if (newPaymentMethod.includes(type)) {
         newPaymentMethod = newPaymentMethod.replaceAll(type, '');
      } else {
         if (type !== 'paystack' && (newPaymentMethod === 'paystack' || newPaymentMethod === 'paystack-stripe')) {
            newPaymentMethod = '';
         }
         newPaymentMethod += type;
      }
      newPaymentMethod = getFilteredPlanName(newPaymentMethod);
      const toUpdate = pricings.map((el) => {
         if (el.pricing_type === 0) {
            return el;
         }
         let currency = el.currency;
         if (newPaymentMethod.includes('paypal-v2') && el.currency === 'TRY') {
            currency = 'USD';
         }
         if (el.pricing_type === 2 && type === 'paystack' && newPaymentMethod.includes(type)) {
            return {
               ...el,
               free_trial: false,
               trial_period: 0,
               payment_method: newPaymentMethod,
            };
         }

         if (!integrations.paypal_client_id_v2 && (newPaymentMethod === 'stripe-paypal' || newPaymentMethod === 'stripe-paypalv2')) {
            newPaymentMethod = 'stripe';
         }
         return {
            ...el,
            currency,
            payment_method: newPaymentMethod,
         };
      });
      // if (!newPaymentMethod && data.status === 1) {
         // setIsOpenWarningModal(true);
      //  }
      handleInputChange('pricings', toUpdate, true);
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
      <div className='course__integration'>
         <ErrorMessageWrapper
            errorMessages={errorMessages}
         >
            <div className='course__integration__bottom'>
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
               {forMap.length > 0 && (
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
               )}
               <Text
                  inner='Go to Integrations'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#24554E', cursor: 'pointer', textDecoration: 'underline' } }
                  onClick={ () => goToIntegrations() }
               />
            </div>
         </ErrorMessageWrapper>
         {
            isOpenWarningModal && (
               <ApproveModal
                  title='Warning'
                  btnText='Okay'
                  onApprove={ () => { setIsOpenWarningModal(false); } }
                  withoutCancel={ true }
                  onCancel={ () => {} }
               >
                  <Text
                     inner='Unfortunately you can not have a free trial with Paystack.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </ApproveModal>
            )
         }
      </div>
   );
};

PaymentBlock.propTypes = {
   integrations: PropTypes.object,
   pricings: PropTypes.array,
   handleInputChange: PropTypes.func,
   goToIntegrations: PropTypes.func,
   getCheckedPayments: PropTypes.func,
   errorMessages: PropTypes.array,
};


export default PaymentBlock;
