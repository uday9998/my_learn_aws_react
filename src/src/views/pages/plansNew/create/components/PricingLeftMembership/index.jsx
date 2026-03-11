import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import PricingItem from 'views/pages/plansNew/create/components/PricingItem';
import Button, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import PaymentBlock from './blocks/PaymentBlock';

const PricingLeftMembership = ({
   integrations, 
   goToIntegrations, 
   setPlanData, 
   planData, 
   errorMessages = {},
   clearErrorMessages, 
   removeErrorMessage, 
   addTemporaryErrorMessage
}) => {
   const newPlan = {
      currency: 'USD',
      name: '',
      price: '',
      'pricing_type': 2,
      number_of_payments: 1,
      payment_method: null, // Set default to null since it's optional
   };

   const handleInputChange = (name, value, isPaymentMethodChanged) => {
      // Remove the payment method validation check since it's optional
      setPlanData({
         ...planData,
         [name]: value,
      });
   };

   const getCheckedPayments = () => {
      let items = '';
      planData.pricings.forEach(element => {
         if (element.payment_method) {
            items = element.payment_method;
         }
      });
      return items; // Can return empty string since payment method is optional
   };

   const handleAddNewPlan = () => {
      handleInputChange('pricings', [
         ...planData.pricings,
         {
            ...newPlan,
            // Make payment_method optional by not setting a default
            // It will only be set if explicitly chosen
         },
      ]);
   };

   const handleDeleteNewPlan = (indexToRemove) => {
      const newPricings = [...planData.pricings];
      newPricings.splice(indexToRemove, 1);
      clearErrorMessages();
      handleInputChange('pricings', newPricings);
   };

   const handleChangePlanInputs = (i, name, value) => {
      const newPlans = planData.pricings.map((e, index) => {
         if (index === i) {
            if (name === 'pricing_type') {
               const returnValue = {
                  name: e.name,
                  pricing_type: value,
                  number_of_payments: 1,
                  payment_method: null, // Make optional by setting to null
                  currency: 'USD',
               };
               if (value !== 3) {
                  returnValue.currency = 'USD';
                  returnValue.price = 0;
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
      if (errorMessages[fieldName]?.length) {
         removeErrorMessage(fieldName);
      }
      handleInputChange('pricings', newPlans);
   };

   return (
      <div className='course__pricing__left'>
         <div className='plan__create__left__plan__membership'>
            {planData.pricings.map((e, index) => (
               <PricingItem
                  key={index}
                  e={e}
                  index={index}
                  handleChangePlanInputs={handleChangePlanInputs}
                  isMembership={true}
                  handleAddNewPlan={handleAddNewPlan}
                  handleDeleteNewPlan={() => handleDeleteNewPlan(index)}
                  isFalseDelete={planData.pricings.length === 1}
                  errorMessages={errorMessages}
                  addTemporaryErrorMessage={addTemporaryErrorMessage}
               />
            ))}
            <Button
               theme={btnTheme.tertiaryGreen}
               size={btnSize.medium44}
               text='Add New One'
               style={{ width: '151px' }}
               onClick={handleAddNewPlan}
               isIconRight={true}
               iconName='PlusM'
            />
         </div>
         {planData.pricings.some(({ pricing_type: pricingType }) => pricingType !== 0) && (
            <PaymentBlock
               integrations={integrations}
               pricings={planData.pricings}
               handleInputChange={handleInputChange}
               goToIntegrations={goToIntegrations}
               getCheckedPayments={getCheckedPayments}
               errorMessages={errorMessages['pricings.0.payment_method']}
            />
         )}
      </div>
   );
};

PricingLeftMembership.propTypes = {
   integrations: PropTypes.object,
   goToIntegrations: PropTypes.func,
   planData: PropTypes.object,
   setPlanData: PropTypes.func,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default PricingLeftMembership;