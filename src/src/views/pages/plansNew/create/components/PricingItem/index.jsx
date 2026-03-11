import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import Tabs from 'components/elements/tabs';
import { priceOption, priceOptionPaypal } from 'utils/getCurrencySymbol';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconButton from 'components/elements/buttons/IconButton';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const typeOptions = [
   { label: 'One Time Plan', value: 1 },
   { label: 'Subscription', value: 2 },
   { label: 'Free', value: 0 },
];

const typeOptionsMembership = [
   { label: 'Subscription', value: 2 },
   { label: 'Free', value: 0 },
];

const frequenceOption = [
   { label: 'Weekly', value: 'week' },
   { label: 'Biweekly', value: '2 weeks' },
   { label: 'Monthly', value: 'month' },
   { label: 'Yearly', value: 'year' },
];

const freeTrailTabs = [
   { key: '7 days', value: 7 },
   { key: '14 days', value: 14 },
   { key: '30 days', value: 30 },
   { key: 'Custom', value: 'custom' },
];

const PricingItem = ({
   e, handleChangePlanInputs, index, isMembership, handleDeleteNewPlan, isFalseDelete,
   errorMessages = {}, addTemporaryErrorMessage
}) => {
   const [selectedFreeTrial, setSelectedFreeTrial] = useState(e.trial_period || 7);
   const [isCustomTrial, setIsCustomTrial] = useState(
      !!((e.trial_period !== 7 && e.trial_period !== 14 && e.trial_period !== 30)));

   const isCustom = () => {
      if (e.trial_period !== 7 && e.trial_period !== 14 && e.trial_period !== 30) {
         return true;
      }
      return false;
   };

   const limitPricingName = (index, name, value) => {
      const regex = /^[a-zA-Z0-9\s]*$/;
      if (!regex.test(value)) {
         addTemporaryErrorMessage(`pricings.${index}.${name}`, 'Only letters and numbers are allowed in this input.');
         return;
      }

      handleChangePlanInputs(index, name, value);
   };

   const errorKeyBeginning = `pricings.${index}.`;

   return (
      <>
         {isMembership && (
            <div className='plan__create__left__plan__membership'>
               <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className='plan__create__left__plan__membership__content'
               >
                  {!isFalseDelete && (
                     <IconButton
                        name='DeleteMediaM'
                        onClick={handleDeleteNewPlan}
                        className='deletePricingMembership'
                     />
                  )}
                  <Input
                     errorMessages={errorMessages[`${errorKeyBeginning}name`]}
                     name='name'
                     label='Pricing Name'
                     value={e.name}
                     maxlength={50}
                     onChange={(name, value) => limitPricingName(index, name, value)}
                     placeholder='Enter pricing name'
                  />
                  <div className="payment-type-section">
                     <label className="section-label">Payment Type</label>
                     <div className="payment-type-cards">
                        {typeOptionsMembership.map((option) => (
                           <div
                              key={option.value}
                              className={`payment-type-card ${e.pricing_type === option.value ? 'active' : ''}`}
                              onClick={() => handleChangePlanInputs(index, 'pricing_type', option.value, isMembership)}
                           >
                              <div className="card-radio">
                                 <div className={`radio-circle ${e.pricing_type === option.value ? 'checked' : ''}`}>
                                    {e.pricing_type === option.value && <div className="radio-dot" />}
                                 </div>
                              </div>
                              <div className="card-content">
                                 <h3 className="card-title">{option.label}</h3>
                                 <p className="card-description">
                                    {option.value === 2 && "Recurring payments at regular intervals"}
                                    {option.value === 0 && "No payment required to access"}
                                 </p>
                                 <p className="card-benefit">
                                    {option.value === 2 && "✓ Higher lifetime value"}
                                    {option.value === 0 && "✓ Grow your audience"}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  {e.pricing_type !== 0 && (
                     <div className='plan__create__left__plan__membership__amount'>
                        <ErrorMessageWrapper
                           errorMessages={errorMessages[`${errorKeyBeginning}price`]}
                        >
                           <Input
                              placeholder='Enter Price (e.g., $123.45)'
                              value={e.price}
                              type='number'
                              label='Amount'
                              name='price'
                              onChange={(name, value) => {
                                 if (value < 0) return;
                                 handleChangePlanInputs(index, name, value);
                              }}
                              min={0}
                              minNumber={0}
                              onKeyPress={(event) => {
                                 if (event.key === '-' || event.key === '+' || event.key === 'e') {
                                    event.preventDefault();
                                 }
                              }}
                           />
                        </ErrorMessageWrapper>
                        <Select
                           options={(e.payment_method === 'paypal-v2' || e.payment_method === 'stripe-paypalv2' || e.paymer_method === 'braintree-stripe-paypalv2')
                              ? priceOptionPaypal : priceOption}
                           type='select-medium'
                           onChange={(name, value) => handleChangePlanInputs(index, name, value)}
                           name='currency'
                           value={e.currency || 'USD'}
                           label='Currency'
                        />
                     </div>
                  )}

                  {e.pricing_type !== 0 && (
                     <div className='plan__create__left__plan__membership__amount'>
                     <div className="billing-interval-section">
                        <label className="section-label">Billing Interval</label>
                        <div className="billing-interval-cards">
                           {frequenceOption.map((option) => (
                              <div
                                 key={option.value}
                                 className={`billing-interval-card ${e.payment_frequence === option.value ? 'active' : ''}`}
                                 onClick={() => handleChangePlanInputs(index, 'payment_frequence', option.value)}
                              >
                                 <div className="interval-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                       <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                                       <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                                       <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                                       <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                 </div>
                                 <div className="interval-content">
                                    <h4 className="interval-title">{option.label}</h4>
                                    <p className="interval-description">
                                       {option.value === 'week' && 'Every 7 days'}
                                       {option.value === '2 weeks' && 'Every 14 days'}
                                       {option.value === 'month' && 'Every month'}
                                       {option.value === 'year' && 'Every 12 months'}
                                    </p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     </div>
                  )}
                  {e.pricing_type !== 0 && (
                     <>
                        {!e.payment_method?.includes('paystack') && (
                           <div className="free-trial-section">
                              <div className="free-trial-header">
                                 <div className="trial-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                       <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                                    </svg>
                                 </div>
                                 <div className="trial-content">
                                    <h3 className="trial-title">Offer a Free Trial</h3>
                                    <p className="trial-subtitle">Trials can increase conversion by up to 25%</p>
                                 </div>
                                 <div className="trial-toggle">
                                    <label className="toggle-switch">
                                       <input
                                          type="checkbox"
                                          checked={e.free_trial}
                                          onChange={() => handleChangePlanInputs(index, 'free_trial', !e.free_trial)}
                                       />
                                       <span className="toggle-slider"></span>
                                    </label>
                                 </div>
                              </div>
                           </div>
                        )}
                        {!!e.free_trial && !e.payment_method?.includes('paystack') && (
                           <div className="free-trial-tabs-container">
                              <label className="free-trial-tabs-label">Trial Period</label>
                              <Tabs
                                 variants={freeTrailTabs}
                                 selectedVariant={(isCustom() || isCustomTrial) ? 'custom' : selectedFreeTrial}
                                 onSelect={(value) => {
                                    if (value !== 'custom') {
                                       setSelectedFreeTrial(value);
                                       setIsCustomTrial(false);
                                       handleChangePlanInputs(index, 'trial_period', value);
                                    } else {
                                       setIsCustomTrial(true);
                                       setSelectedFreeTrial(1);
                                       handleChangePlanInputs(index, 'trial_period', 1);
                                    }
                                 }}
                              />
                           </div>
                        )}
                        {!e.payment_method?.includes('paystack') && !!e.free_trial && (isCustom() || isCustomTrial) && (
                           <ErrorMessageWrapper
                              errorMessages={errorMessages[`${errorKeyBeginning}trial_period`]}
                           >
                              <Input
                                 value={e.trial_period}
                                 type='number'
                                 label='Custom Time Period'
                                 placeholder='60'
                                 helpText='Days'
                                 minNumber={0}
                                 name='trial_period'
                                 onChange={(name, value) => {
                                    setSelectedFreeTrial(value);
                                    handleChangePlanInputs(index, name, value);
                                 }}
                              />
                           </ErrorMessageWrapper>
                        )}
                     </>
                  )}
               </div>
            </div>
         )}

         {!isMembership && (
            <div
               // eslint-disable-next-line react/no-array-index-key
               key={index}
               className='plan__create__left__plan'
            >
               <Input
                  errorMessages={errorMessages[`${errorKeyBeginning}name`]}
                  name='name'
                  label='Pricing Name'
                  value={e.name}
                  maxlength={50}
                  onChange={(name, value) => limitPricingName(index, name, value)}
                  placeholder='Enter pricing name'
               />
                  <div className="payment-type-section">
                     <label className="section-label">Payment Type</label>
                     <div className="payment-type-cards">
                        {typeOptions.map((option) => (
                           <div
                              key={option.value}
                              className={`payment-type-card ${e.pricing_type === option.value ? 'active' : ''}`}
                              onClick={() => handleChangePlanInputs(index, 'pricing_type', option.value)}
                           >
                              <div className="card-radio">
                                 <div className={`radio-circle ${e.pricing_type === option.value ? 'checked' : ''}`}>
                                    {e.pricing_type === option.value && <div className="radio-dot" />}
                                 </div>
                              </div>
                              <div className="card-content">
                                 <h3 className="card-title">{option.label}</h3>
                                 <p className="card-description">
                                    {option.value === 2 && "Recurring payments at regular intervals"}
                                    {option.value === 1 && "Single payment for unlimited access"}
                                    {option.value === 0 && "No payment required to access"}
                                 </p>
                                 <p className="card-benefit">
                                    {option.value === 2 && "✓ Higher lifetime value"}
                                    {option.value === 1 && "✓ No cancellations"}
                                    {option.value === 0 && "✓ Grow your audience"}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               {e.pricing_type !== 0 && (
                  <div className='plan__create__left__plan__amount'>
                     <ErrorMessageWrapper
                        errorMessages={errorMessages[`${errorKeyBeginning}price`]}
                     >
                        <Input
                           placeholder='Enter Price (e.g., $123.45)'
                           value={e.price}
                           type='number'
                           label='Amount'
                           name='price'
                           onChange={(name, value) => {
                              if (value < 0 || value > 99999) return;
                              handleChangePlanInputs(index, name, value);
                           }}
                           min={0}
                           minNumber={0}
                           onKeyPress={(event) => {
                              if (event.key === '-' || event.key === '+' || event.key === 'e') {
                                 event.preventDefault();
                              }
                           }}
                        />
                     </ErrorMessageWrapper>
                     <Select
                        options={(e.payment_method === 'paypal-v2' || e.payment_method === 'stripe-paypalv2' || e.paymer_method === 'braintree-stripe-paypalv2')
                           ? priceOptionPaypal : priceOption}
                        type='select-medium'
                        onChange={(name, value) => handleChangePlanInputs(index, name, value)}
                        name='currency'
                        value={e.currency || 'USD'}
                        label='Currency'
                     />
                  </div>
               )}
               {e.pricing_type === 2 && (
                  <div className='plan__create__left__plan__amount'>
                     <ErrorMessageWrapper
                        errorMessages={errorMessages[`${errorKeyBeginning}number_of_payments`]}
                     >
                        <Input
                           placeholder='Billing Cycle'
                           value={e.number_of_payments}
                           type='number'
                           label='Bill Every'
                           name='number_of_payments'
                           onChange={(name, value) => {
                              if (value < 0) return;
                              handleChangePlanInputs(index, name, value);
                           }}
                           min={0}
                           minNumber={0}
                           onKeyPress={(event) => {
                              if (event.key === '-' || event.key === '+' || event.key === 'e') {
                                 event.preventDefault();
                              }
                           }}
                        />
                     </ErrorMessageWrapper>
                     <div className="billing-interval-section">
                        <label className="section-label">Billing Interval</label>
                        <div className="billing-interval-cards">
                           {frequenceOption.map((option) => (
                              <div
                                 key={option.value}
                                 className={`billing-interval-card ${e.payment_frequence === option.value ? 'active' : ''}`}
                                 onClick={() => handleChangePlanInputs(index, 'payment_frequence', option.value)}
                              >
                                 <div className="interval-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                       <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                                       <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                                       <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                                       <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                 </div>
                                 <div className="interval-content">
                                    <h4 className="interval-title">{option.label}</h4>
                                    <p className="interval-description">
                                       {option.value === 'week' && 'Every 7 days'}
                                       {option.value === '2 weeks' && 'Every 14 days'}
                                       {option.value === 'month' && 'Every month'}
                                       {option.value === 'year' && 'Every 12 months'}
                                    </p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               )}
               {e.pricing_type === 2 && !e.payment_method?.includes('paystack') && (
                  <>
                     <div className="free-trial-section">
                        <div className="free-trial-header">
                           <div className="trial-icon">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                 <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                              </svg>
                           </div>
                           <div className="trial-content">
                              <h3 className="trial-title">Offer a Free Trial</h3>
                              <p className="trial-subtitle">Trials can increase conversion by up to 25%</p>
                           </div>
                           <div className="trial-toggle">
                              <label className="toggle-switch">
                                 <input
                                    type="checkbox"
                                    checked={e.free_trial}
                                    onChange={() => { handleChangePlanInputs(index, 'free_trial', !e.free_trial); }}
                                 />
                                 <span className="toggle-slider"></span>
                              </label>
                           </div>
                        </div>
                     </div>
                     {!!e.free_trial && (
                        <div className="free-trial-tabs-container">
                           <label className="free-trial-tabs-label">Trial Period</label>
                           <Tabs
                              variants={freeTrailTabs}
                              selectedVariant={(isCustom() || isCustomTrial) ? 'custom' : selectedFreeTrial}
                              onSelect={(value) => {
                                 if (value !== 'custom') {
                                    setSelectedFreeTrial(value);
                                    setIsCustomTrial(false);
                                    handleChangePlanInputs(index, 'trial_period', value);
                                 } else {
                                    setIsCustomTrial(true);
                                    setSelectedFreeTrial(1);
                                    handleChangePlanInputs(index, 'trial_period', 1);
                                 }
                              }}
                           />
                        </div>
                     )}
                     {!!e.free_trial && (isCustom() || isCustomTrial) && (
                        <ErrorMessageWrapper
                          errorMessages={errorMessages[`${errorKeyBeginning}trial_period`]}
                        >
                           <Input
                              value={e.trial_period}
                              type='number'
                              label='Custom Time Period'
                              placeholder='60'
                              helpText='Days'
                              minNumber={0}
                              name='trial_period'
                              onChange={(name, value) => {
                                 setSelectedFreeTrial(value);
                                 handleChangePlanInputs(index, name, value);
                              }}
                           />
                        </ErrorMessageWrapper>
                     )}
                  </>
               )}
            </div>
         )}
      </>
   );
};

PricingItem.propTypes = {
   e: PropTypes.object,
   handleChangePlanInputs: PropTypes.func,
   index: PropTypes.number,
   isMembership: PropTypes.bool,
   handleDeleteNewPlan: PropTypes.func,
   isFalseDelete: PropTypes.bool,
   errorMessages: PropTypes.object,
   addTemporaryErrorMessage: PropTypes.func,
};

export default PricingItem;