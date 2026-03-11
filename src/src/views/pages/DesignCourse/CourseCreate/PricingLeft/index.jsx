import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import PricingItem from 'views/pages/plansNew/create/components/PricingItem';
import Info from 'components/elements/messages/info';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Tabs from 'components/elements/tabs';
import Input from 'components/elements/inputNew';
import PaymentBlock from './blocks/PaymentBlock';

const tabVariants = [
   { key: '1 Plan', value: 1 },
   { key: '3 Plans', value: 2 },
   { key: 'Custom', value: 0 },
];

const PlanCreateLeft = ({
   data, 
   setData, 
   integrations, 
   goToIntegrations, 
   errorMessages = {},
   clearErrorMessages, 
   removeErrorMessage, 
   addTemporaryErrorMessage
}) => {
   const [selectedVariant, setSelectedVariant] = useState(1);

   const getCheckedPayments = () => {
      if (!data?.pricings || !Array.isArray(data.pricings)) {
         return '';
      }
      
      return data.pricings.reduce((items, element) => {
         if (element?.payment_method) {
            return element.payment_method;
         }
         return items;
      }, '');
   };

   const newPlan = {
      currency: 'USD',
      name: '',
      price: '',
      'pricing_type': 1,
      payment_method: '',  // Initialize empty instead of calling getCheckedPayments
   };

   const handleInputChange = (name, value, isPaymentMethodChanged) => {
      // Safely handle error message removal
      if (errorMessages && typeof removeErrorMessage === 'function') {
         if (errorMessages['pricings.0.payment_method']) {
            removeErrorMessage('pricings.0.payment_method');
         }
      }

      setData(prevData => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleChangeTab = (step) => {
      setSelectedVariant(step);
      if (typeof clearErrorMessages === 'function') {
         clearErrorMessages();
      }
      
      switch (step) {
         case 1:
            handleInputChange('pricings', [newPlan]);
            break;
         case 2:
            handleInputChange('pricings', Array(3).fill(newPlan));
            break;
         default:
            handleInputChange('pricings', Array(2).fill(newPlan));
      }
   };

   const handleChangeNumberCustom = (name, number) => {
      const currentPricings = Array.isArray(data.pricings) ? data.pricings : [];
      
      if (number > currentPricings.length) {
         handleInputChange('pricings', [
            ...currentPricings,
            ...(Array(number - currentPricings.length).fill(newPlan)),
         ]);
         return;
      }
      handleInputChange('pricings', currentPricings.slice(0, number));
   };

   const handleChangePlanInputs = (i, name, value, isMembership) => {
      if (!Array.isArray(data.pricings)) {
         return;
      }

      const newPlans = data.pricings.map((e, index) => {
         if (index === i) {
            if (name === 'pricing_type') {
               const returnValue = {
                  name: e.name || '',
                  pricing_type: value,
                  payment_method: '',  // Initialize empty
                  currency: 'USD',
               };
               if (value !== 3) {
                  returnValue.currency = 'USD';
                  returnValue.price = '';
               }
               if (isMembership && value === 2) {
                  returnValue.number_of_payments = 1;
               }
               return returnValue;
            }
            if (name === 'free_trial') {
               if (!!value && !e.trial_period) {
                  return {
                     ...e,
                     [name]: value,
                     trial_period: 7,
                  };
               }
            }
            return {
               ...e,
               [name]: value,
            };
         }
         return e;
      });

      const fieldName = `pricings.${i}.${name}`;
      if (errorMessages?.[fieldName] && typeof removeErrorMessage === 'function') {
         removeErrorMessage(fieldName);
      }
      handleInputChange('pricings', newPlans);
   };

   const hasNonFreePlans = Array.isArray(data.pricings) && data.pricings.some(
      pricing => pricing?.pricing_type !== 0
   );

   return (
      <div className='course__pricing__left'>
         <Info
            title='All payments are made using Stripe, Braintree, or Paypal.
            You can connect payment methods in the Integrations section. Payment setup is optional and can be configured later.'
         />
         <div className='plan__create__left__inputs__tab'>
            <Text
               inner='Number of Plans'
               type={types.regularDefault}
               size={sizes.small}
            />
            <Tabs
               variants={tabVariants}
               selectedVariant={selectedVariant}
               onSelect={handleChangeTab}
            />
         </div>
         {selectedVariant === 0 && (
            <Input
               type='number'
               value={Array.isArray(data.pricings) ? data.pricings.length : 0}
               onChange={handleChangeNumberCustom}
               label='Custom Number of Plans'
               minNumber={1}
            />
         )}
         {Array.isArray(data.pricings) && data.pricings.map((e, index) => (
            <PricingItem
               key={index}
               e={e || newPlan}
               index={index}
               handleChangePlanInputs={handleChangePlanInputs}
               errorMessages={errorMessages}
               addTemporaryErrorMessage={addTemporaryErrorMessage}
            />
         ))}
         {hasNonFreePlans && (
            <>
               <PaymentBlock
                  integrations={integrations || {}}
                  pricings={data.pricings || []}
                  handleInputChange={handleInputChange}
                  goToIntegrations={goToIntegrations}
                  getCheckedPayments={getCheckedPayments}
                  errorMessages={null}
                  isOptional={true}
               />
               <Text
                  inner="Payment methods are optional and can be configured later in Integrations"
                  type={types.regularDefault}
                  size={sizes.small}
                  className="mt-2 text-gray-600"
               />
            </>
         )}
      </div>
   );
};

PlanCreateLeft.propTypes = {
   data: PropTypes.object,
   setData: PropTypes.func,
   integrations: PropTypes.object,
   goToIntegrations: PropTypes.func,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default PlanCreateLeft;