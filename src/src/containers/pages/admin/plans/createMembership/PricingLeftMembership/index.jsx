import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import PricingItem from 'views/pages/plansNew/create/components/PricingItem';
import Info from 'components/elements/messages/info';
import Input from 'components/elements/inputNew';
import PaymentBlock from './blocks/PaymentBlock';


const PlanCreateLeft = ({
   data, setData, integrations, goToIntegrations,
}) => {
   const [selectedVariant, setSelectedVariant] = useState(1);

   const getCheckedPayments = () => {
      let items = '';
      data.pricings.forEach(element => {
         if (element.payment_method) {
            items = element.payment_method;
         }
      });
      return items;
   };

   const newPlan = {
      currency: 'USD',
      name: '',
      price: 0,
      'pricing_type': 1,
      payment_method: getCheckedPayments(),
   };

   const handleInputChange = (name, value) => {
      setData({
         ...data,
         [name]: value,
      });
   };

   const handleChangeTab = (step) => {
      setSelectedVariant(step);
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
      if (number > data.pricings.length) {
         handleInputChange('pricings', [
            ...data.pricings,
            ...(Array(number - data.pricings.length).fill(newPlan)),
         ]);
         return;
      }
      handleInputChange('pricings', data.pricings.slice(0, number));
   };


   const handleChangePlanInputs = (i, name, value, isMembership) => {
      const newPlans = data.pricings.map((e, index) => {
         if (index === i) {
            if (name === 'pricing_type') {
               const retrunValue = {
                  name: e.name,
                  pricing_type: value,
                  payment_method: getCheckedPayments(),
                  currency: 'USD',
               };
               if (value !== 3) {
                  retrunValue.currency = 'USD';
                  retrunValue.price = 0;
               }
               if (isMembership && value === 2) {
                  retrunValue.number_of_payments = 1;
               }
               return retrunValue;
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
      handleInputChange('pricings', newPlans);
   };

   return (
      <div className='course__pricing__left'>
         <Info
            title='All payments are made using Stripe, Braintree, or Paypal.
            You can connect payment methods in the Integrations section.'
         />
         {selectedVariant === 0 && (
            <Input
               type='number'
               value={ data.pricings.length }
               onChange={ handleChangeNumberCustom }
               label='Custom Number of Plans'
               minNumber={ 1 }
            />
         )}
         {data.pricings.map((e, index) => {
            return (
               <PricingItem
                  e={ e }
                  index={ index }
                  handleChangePlanInputs={ handleChangePlanInputs }
               />
            );
         })}
         {data.pricings[0].pricing_type !== 0 && (
            <PaymentBlock
               integrations={ integrations }
               pricings={ data.pricings }
               handleInputChange={ handleInputChange }
               goToIntegrations={ goToIntegrations }
               getCheckedPayments={ getCheckedPayments }
            />
         )}
      </div>
   );
};

PlanCreateLeft.propTypes = {
   data: PropTypes.object,
   setData: PropTypes.func,
   integrations: PropTypes.object,
   goToIntegrations: PropTypes.func,
};

export default PlanCreateLeft;
