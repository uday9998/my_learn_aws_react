import React, { useState, useRef } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import PropTypes from 'prop-types';
import Tabs from 'components/elements/tabs';
import PricingItem from 'views/pages/plansNew/create/components/PricingItem';
import Input from 'components/elements/inputNew';
import Line from 'components/elements/Line';
import Switch from 'components/elements/switchNew';
import Select from 'components/elements/SelectNew';
import { planAddTagOperation } from 'state/modules/plans/operations';
import Button, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import ApproveModal from 'components/elements/ApproveModal';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import EmailBlock from './blocks/EmailBlock';
import PaymentBlock from './blocks/PaymentBlock';
import PricingOrderBumps from './blocks/OrderBump';
import ThankYouBlock from './blocks/ThankYouBlock';

const tabVariants = [
   { key: '1 Plan', value: 1 },
   { key: '3 Plans', value: 2 },
   { key: 'Custom', value: 0 },
];

const postPurchaseUrlOptions = [
   { label: 'Custom Url', value: 1 },
   { label: 'Portal', value: 2 },
   { label: 'Watch Room', value: 3 },
];

const PlanPricingLeft = ({
   data, onChange, handleConnectIntegration, goToIntegrations, goToOrderBump, deleteOrderBump,
   goToOrderBumpEdit, match, errorMessages = {}, clearErrorMessages, removeErrorMessage, addTemporaryErrorMessage
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const [publishError, setPublishError] = useState('');

   const getTab = (i) => {
      switch (i.length) {
         case 1:
            return 1;
         case 3:
            return 2;
         default:
            return 0;
      }
   };
   const { current: initialPricings } = useRef(data.pricings);
   const [selectedVariant, setSelectedVariant] = useState(getTab(data.pricings));
   const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
   const newPlan = {
      currency: 'USD',
      name: '',
      'payment_method': null,
      price: '',
      number_of_payments: 1,
      'pricing_type': 2,
   };
   const handleChangeTab = (step) => {
      setSelectedVariant(step);
      clearErrorMessages();
      if (step === getTab(initialPricings)) {
         switch (step) {
            case 1:
               onChange('pricings', initialPricings);
               break;
            case 2:
               onChange('pricings', initialPricings);
               break;
            default:
               onChange('pricings', initialPricings);
         }
         return;
      }
      switch (step) {
         case 1:
            onChange('pricings', [newPlan]);
            break;
         case 2:
            onChange('pricings', Array(3).fill(newPlan));
            break;
         default:
            onChange('pricings', Array(2).fill(newPlan));
      }
   };
   
   const handleChangePlanInputs = (i, name, value, isMembership) => {

      
      if (name === 'pricing_type' && data.status === 1) {
         const currentPlan = data.pricings[i];
         const isCurrentlyFree = currentPlan.pricing_type === 0;
         const isChangingToPaid = value !== 0;
         
         if (isCurrentlyFree && isChangingToPaid) {
            const errorMessage = data.is_course === 1 
               ? 'You need to unpublish the course first before changing from free to a paid plan.'
               : 'You need to unpublish the product first before changing from free to a paid plan.';
            
            setPublishError(errorMessage);
            return;
         }
      }

      setPublishError('');
   
      const newPlans = data.pricings.map((e, index) => {
         if (index === i) {
            if (name === 'pricing_type') {
               const retrunValue = {
                  name: e.name,
                  pricing_type: value,
                  payment_method: null,
                  currency: 'USD',
               };
               if (value !== 3) {
                  retrunValue.currency = 'USD';
                  retrunValue.price = '';
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

      const fieldName = `pricings.${i}.${name}`;
      if (errorMessages[fieldName]?.length) {
         removeErrorMessage(fieldName);
      }
      onChange('pricings', newPlans);
   };
   
   const handleChangeNumberCustom = (name, number) => {
      if (number > data.pricings.length) {
         onChange('pricings', [
            ...data.pricings,
            ...(Array(number - data.pricings.length).fill(newPlan)),
         ]);
         return;
      }
      onChange('pricings', data.pricings.slice(0, number));
   };

   const getCheckedPayments = () => {
      let items = '';
      data.pricings.forEach(element => {
         if (element.payment_method) {
            items = element.payment_method;
         }
      });
      return items;
   };

   const getPlansCount = () => {
      let count = 0;
      data.pricings.forEach((e) => {
         if (e.pricing_type !== 0) {
            count++;
         }
      });
      return count;
   };

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

   const handlePricingChange = (type) => {
      let newPaymentMethod = getCheckedPayments();
      if (type === 'paystack' && !newPaymentMethod.includes(type)) {
         const subPlans = data.pricings.filter(pr => pr.pricing_type === 2);
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
      const toUpdate = data.pricings.map((el) => {
         if (el.pricing_type === 0) {
            return el;
         }
         if (el.pricing_type === 2 && type === 'paystack' && newPaymentMethod.includes(type)) {
            return {
               ...el,
               free_trial: false,
               trial_period: 0,
               payment_method: newPaymentMethod,
            };
         }

         if (!data.integrations.paypal_client_id_v2 && (newPaymentMethod === 'stripe-paypal' || newPaymentMethod === 'stripe-paypalv2')) {
            newPaymentMethod = 'stripe';
         }
         return {
            ...el,
            payment_method: newPaymentMethod,
         };
      });
      if (!newPaymentMethod && data.status === 1) {
      }

      if (errorMessages['pricings.0.payment_method']?.length) {
         removeErrorMessage('pricings.0.payment_method');
      }
      onChange('pricings', toUpdate);
   };

   const handleAddNewPlan = () => {
      onChange('pricings', [
         ...data.pricings,
         {
            ...newPlan,
            payment_method: getCheckedPayments(),
         },
      ]);
   };

   const handleDeleteNewPlan = (indexToRemove) => {
      const newPricings = [...data.pricings];
      newPricings.splice(indexToRemove, 1);
      clearErrorMessages();
      onChange('pricings', newPricings);
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className='plan__pricing__left'>
         {
            showPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ handleClosePopup } />, document.body)
         }
         <div className='plan__pricing__left__top'>
            <Text
               inner='Price Details'
               type={ types.medium150 }
               size={ sizes.medium }
            />
            <Text
               inner='Set the price and payment structure for this offer'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#444C4B' } }
            />
         </div>
         {publishError && (
            <div className="error-message" style={{color: '#E53E3E', backgroundColor: '#FED7D7', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px'}}>
               {publishError}
            </div>
         )}
         <div className='plan__pricing__left__plans'>
            {match && match.url.includes('membership') && (
               <div className='plan__pricing__left__plans__content'>
                  <Text
                     inner='Payment Settings'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <div className='plan__create__left__plan__membership'>
                     {data.pricings.map((e, index) => {
                        return (
                           <PricingItem
                              e={ e }
                              index={ index }
                              handleChangePlanInputs={ handleChangePlanInputs }
                              isMembership={ true }
                              handleDeleteNewPlan={ () => handleDeleteNewPlan(index) }
                              isFalseDelete={ data.pricings.length === 1 }
                              errorMessages={ errorMessages }
                              addTemporaryErrorMessage={ addTemporaryErrorMessage }
                           />
                        );
                     })}
                     <Button
                        theme={ btnTheme.tertiaryGreen }
                        size={ btnSize.medium44 }
                        text='Add New One'
                        style={ { width: '151px' } }
                        onClick={ handleAddNewPlan }
                        isIconRight={ true }
                        iconName='PlusM'
                     />
                  </div>
               </div>
            )}
            {(!match || !match.url.includes('membership')) && (
               <div className='plan__pricing__left__plans__content'>
                  <Text
                     inner='Payment Settings'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <div className='plan__pricing__left__plans__content__tab'>
                     <Text
                        inner='Number of Plans'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                     <Tabs
                        variants={ tabVariants }
                        selectedVariant={ selectedVariant }
                        onSelect={ handleChangeTab }
                     />
                  </div>

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
                           errorMessages={ errorMessages }
                           addTemporaryErrorMessage={ addTemporaryErrorMessage }
                        />
                     );
                  })}
               </div>
            )}
            <Line />
            <div className='plan__pricing__left__plans__taxes'>
               <Switch
                  value={ data.taxes }
                  label='Taxes'
                  onChange={ () => onChange('taxes', data.taxes === 1 ? 0 : 1) }
                  size='medium'
                  positionText='left'
               />
               <Text
                  inner='Incorporate tax rates into your checkout flow to ensure correct charge calculations.'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
            </div>
            <Line />
            <ThankYouBlock data={ data } onChange={ onChange } />
            <Line />
            <div className='plan__pricing__left__plans__url'>
               <div className='plan__pricing__left__plans__url__top'>
                  <Text
                     inner='Post-Purchase'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <Text
                     inner='Choose where to send members after their Offer purchase.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
               <div className='plan__pricing__left__plans__url__bottom'>
                  <Select
                     options={ postPurchaseUrlOptions }
                     value={ data.thank_you_page_id }
                     placeholder='Select option'
                     onChange={ onChange }
                     label=''
                     type='select-medium'
                     name='thank_you_page_id'
                  />
                  {data.thank_you_page_id === 1 && (
                     <Input
                        name='thank_you_page_url'
                        value={ data.thank_you_page_url }
                        placeholder='Enter your custom url.'
                        onChange={ onChange }
                     />
                  )}
               </div>
            </div>
            <Line />
            <EmailBlock
               data={ data }
               onChange={ onChange }
            />
         </div>
         {data.pricings.some(({ pricing_type: pricingType }) => pricingType !== 0) && (
            <PaymentBlock
               onConnectIntegration={ handleConnectIntegration }
               integrations={ data.integrations }
               goToIntegrations={ goToIntegrations }
               getCheckedPayments={ getCheckedPayments }
               onSelectIntegration={ handlePricingChange }
               errorMessages={ errorMessages['pricings.0.payment_method'] }
            />
         )}
         {(!match || !match.url.includes('membership')) && (
            <PricingOrderBumps
               data={ data.order_bumps }
               goToOrderBump={ goToOrderBump }
               goToOrderBumpEdit={ goToOrderBumpEdit }
               deleteOrderBump={ deleteOrderBump }
            />
         )}
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

PlanPricingLeft.propTypes = {
   handleConnectIntegration: PropTypes.func,
   data: PropTypes.object,
   goToOrderBumpEdit: PropTypes.func,
   onChange: PropTypes.func,
   goToIntegrations: PropTypes.func,
   goToOrderBump: PropTypes.func,
   deleteOrderBump: PropTypes.func,
   match: PropTypes.object,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default PlanPricingLeft;