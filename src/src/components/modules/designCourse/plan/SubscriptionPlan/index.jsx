/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as txtType, SIZES as txtSizes } from 'components/elements/Text';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import TextInput from 'components/elements/form/TextInput';
import NumberInput from 'components/elements/form/NumberInput';
import Select from 'components/elements/form/Select';
// import getCurrencySymbol from 'utils/getCurrencySymbol';
import Icon from 'components/elements/Icon';
import Modal from 'components/elements/Modal';
import IntegartionModalContent from 'components/elements/IntegrationModalContent';
import MultiSelect from 'components/elements/form/MultiSelect';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import CheckBox from 'components/elements/form/CheckBox';
import TooltipwithIcon from 'components/elements/members/Tooltip';
import Tooltip from 'components/modules/designCourse/plan/SubscriptionPlan/Tooltip';
import { priceOption, priceOptionPaypal } from 'utils/getCurrencySymbol';

const SubscriptionPlan = ({
   goTo, goToIntegration, handleInputPlanChange, handlePlanSave, deletePlan,
   handleShowCouponPopup, plan: {
      selectedPricing, currentPricingUnsaved,
      stripe_connection: stripeConnection, braintree_connection: braintreeConnection,
      is_published: isPublished, pricings,
      paypal_connection_v2: paypalConnectionV2,
   }, chooseCourses, onAddValue, onRemoveValue, courseId,
}) => {
   const [isOpenIntegrationModal, setIsOpenIntegrationModal] = useState(false);
   const [deleteCourseModalIsOpen, setDeleteCourseModalIsOpen] = useState(false);
   const [deleteCourseModalValues, setDeleteCourseModalValues] = useState({ title: 'Delete Product', content: 'Are you sure you want to delete this product?' });
   const [courseName, setCourseName] = useState(0);
   const delCourseModalClick = (name) => {
      setCourseName(name);
      if (name === 'all') {
         setDeleteCourseModalValues({ title: 'Delete Products', content: 'Are you sure you want to delete all products?' });
      } else {
         setDeleteCourseModalValues({ title: 'Delete Product', content: 'Are you sure you want to delete this product?' });
      }
      setDeleteCourseModalIsOpen(true);
   };

   const delCourseModalApproveClick = () => {
      onRemoveValue(courseName);
      setDeleteCourseModalIsOpen(false);
   };

   // eslint-disable-next-line no-param-reassign
   if (!selectedPricing.currency) selectedPricing.currency = 'USD';
   let forBraintree = false;
   if (selectedPricing.payment_method === 'braintree') {
      selectedPricing.currency = 'USD';
      forBraintree = true;
   }

   let disableSavePlan = false;
   if (selectedPricing.payment_method === 'paypal-v2' && !paypalConnectionV2) {
      disableSavePlan = true;
   } else if (selectedPricing.payment_method === 'braintree' && !braintreeConnection) {
      disableSavePlan = true;
   } else if (selectedPricing.payment_method === 'stripe' && !stripeConnection) {
      disableSavePlan = true;
   } else if (selectedPricing.payment_method === 'stripe-paypalv2' && (!stripeConnection || !paypalConnectionV2)) {
      disableSavePlan = true;
   }

   const newchooseCourses = chooseCourses && chooseCourses.filter(choosecourse => choosecourse.id !== courseId);

   const chooseCoursesOptions = newchooseCourses.map(option => (option.name));
   // eslint-disable-next-line max-len
   const selectedPricingAttachedCourses = selectedPricing.attached_courses && selectedPricing.attached_courses.map(courses => (courses.course.name));

   const updateCurrentPricing = pricings.find(item => item.id === selectedPricing.id);
   let updateCurrentPricingBundleCourses = [];
   if (updateCurrentPricing) {
      // eslint-disable-next-line max-len
      updateCurrentPricingBundleCourses = updateCurrentPricing.attached_courses && updateCurrentPricing.attached_courses.map(courses => (courses.course));
   }
   const frequenceOption = [
      { label: 'Weekly', value: 'week' },
      { label: 'Biweekly', value: '2 weeks' },
      { label: 'Monthly', value: 'month' },
      { label: 'Yearly', value: 'year' },
   ];

   const paymentMethodOption = [
      { label: 'Stripe', value: 'stripe', isDisabled: !stripeConnection },
      { label: 'Braintree', value: 'braintree', isDisabled: !braintreeConnection },
      { label: 'Paypal', value: 'paypal-v2' },
      { label: 'Stripe/PayPal', value: 'stripe-paypalv2' },
   ];

   const trialOption = [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '7', value: 7 },
      { label: '8', value: 8 },
      { label: '9', value: 9 },
      { label: '10', value: 10 },
      { label: '11', value: 11 },
      { label: '12', value: 12 },
      { label: '13', value: 13 },
      { label: '14', value: 14 },
      { label: '15', value: 15 },
      { label: '16', value: 16 },
      { label: '17', value: 17 },
      { label: '18', value: 18 },
      { label: '19', value: 19 },
      { label: '20', value: 20 },
      { label: '21', value: 21 },
      { label: '22', value: 22 },
      { label: '23', value: 23 },
      { label: '24', value: 24 },
      { label: '25', value: 25 },
      { label: '26', value: 26 },
      { label: '27', value: 27 },
      { label: '28', value: 28 },
      { label: '29', value: 29 },
      { label: '30', value: 30 },

   ];

   // eslint-disable-next-line no-param-reassign
   if (!selectedPricing.currency) selectedPricing.currency = 'USD';
   return (
      <div className='drawer-wrapper'>
         <div className='subscriptionPlan'>
            <div className='flex justify-between align-center'>
               <Text
                  size={ txtSizes.medium }
                  type={ txtType.normal }
                  inner='SUBSCRIPTION PLAN'
               />
               {(!currentPricingUnsaved && !isPublished)
               && (
                  <div
                     role='presentation'
                     className='close'
                     onClick={ () => deletePlan(selectedPricing.id) }
                  >
                     <Icon name='Close' color='red' />
                  </div>
               )
               }
            </div>
            <div className='w-full m-t-m'>
               <TextInput
                  placeholder='Welcome'
                  label='Plan Name'
                  id='name'
                  name='name'
                  value={ selectedPricing.name }
                  onChange={ handleInputPlanChange }
                  hasTooltip={ true }
               />
            </div>
            <div className='characters-small-text'>
               <Text
                  color='#9c9c9c'
                  type={ txtType.normal }
                  inner={ `${ selectedPricing.name ? selectedPricing.name.length : '0' } of 15 characters` }
               />
            </div>
            <div className='w-full m-t-m'>
               <Select
                  disabled={ !!selectedPricing.id }
                  label='Payment Method'
                  placeholder='Choose'
                  id='payment_method'
                  options={ paymentMethodOption }
                  name='payment_method'
                  value={ selectedPricing.payment_method }
                  onChange={ handleInputPlanChange }
               />
            </div>
            <div className='w-full m-t-m'>
               <Select
                  disabled={ !!selectedPricing.id }
                  placeholder='Choose An Option'
                  label='Payment Frequency'
                  id='planName'
                  options={ frequenceOption }
                  name='payment_frequence'
                  value={ selectedPricing.payment_frequence }
                  onChange={ handleInputPlanChange }
               />
            </div>
            <div className='w-full m-t-m flex align-end'>
               <div className='planRate'>
                  <Select
                     disabled={ !!selectedPricing.id || forBraintree }
                     label='Subscription Pricing'
                     id='currency'
                     options={ (selectedPricing.payment_method === 'paypal-v2' || selectedPricing.payment_method === 'stripe-paypalv2')
                        ? priceOptionPaypal : priceOption }
                     name='currency'
                     value={ selectedPricing.currency }
                     onChange={ handleInputPlanChange }
                  />
               </div>
               <div className='planPrice'>
                  <TextInput
                     disabled={ !!selectedPricing.id }
                     placeholder='0.00'
                     label=''
                     id='price'
                     name='price'
                     value={ selectedPricing.price }
                     onChange={ handleInputPlanChange }
                  />
               </div>
            </div>
            <div className='w-full m-t-m flex align-end  planRatePrice'>
               <div className='planPrice freeTrial'>
                  <div className='flex'>
                     <CheckBox
                        label='Free Trial (Yes/No)'
                        name='free_trial'
                        filled
                        onChange={ handleInputPlanChange }
                        checked={ selectedPricing.free_trial }
                        disabled={ !!selectedPricing.id }
                     />
                     <TooltipwithIcon hintText='You can offer your potentioal clients the option to have a free trial period for this particualler course.' isComment={ true } />
                  </div>
               </div>
               {!!selectedPricing.free_trial
                  && (
                     <div className='planRate freeTrialSelect'>
                        <Select
                           disabled={ !!selectedPricing.id }
                           label='Trial days'
                           id='trial_period'
                           options={ trialOption }
                           name='trial_period'
                           value={ selectedPricing.trial_period }
                           onChange={ handleInputPlanChange }
                           style={ { width: '50%' } }
                        />
                     </div>
                  )
               }
            </div>
            <div className='w-full number_of_payments'>
               <Tooltip />
               <NumberInput
                  disabled={ !!selectedPricing.id }
                  placeholder='1'
                  label='Number Of Payments'
                  min={ 0 }
                  type='number'
                  id='number_of_payments'
                  name='number_of_payments'
                  value={ selectedPricing.number_of_payments }
                  style={ { width: '50%' } }
                  onChange={ handleInputPlanChange }
               />
            </div>
            {newchooseCourses.length
               ? (
                  <div className='w-full m-t-m'>
                     <MultiSelect
                        placeholder='Choose Class'
                        label={ ['Bundles', <span className='bundlesOptional'>(Optional)</span>] }
                        iconColor='rgb(63, 79, 101)'
                        onAddValue={ onAddValue }
                        selectedValues={ selectedPricingAttachedCourses }
                        options={ chooseCoursesOptions }
                        hasTooltip={ true }
                     />
                  </div>
               )
               : ''
            }
            <div className='w-full m-t-m'>
               {!paypalConnectionV2 && (
                  <div className='w-full m-t-exs'>
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.full }
                        text='Connect To PayPal'
                        style={ { height: '32px' } }
                        onClick={ () => goTo(`${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#integrations`) }
                     />
                  </div>
               )}
               {!stripeConnection
                  && (
                     <div className='w-full m-t-exs'>
                        <BaseButton
                           theme={ buttonTheme.grey }
                           size={ buttonSizes.full }
                           text='Connect To Stripe'
                           style={ { height: '32px' } }
                           onClick={ () => goTo(`${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#integrations`) }
                        />
                     </div>
                  )
               }
               {/* <div className='characters-small-text'>
                  <Text
                     color='#9c9c9c'
                     type={ txtType.normal }
                     inner='In order to set up a membership subscription plan you must have a Stripe account connected in the Integrations section. (One time Plans can be set up with Stripe or Paypal)'
                  />
               </div> */}
            </div>
            {!braintreeConnection
            && (
               <div className='w-full m-t-m'>
                  <div className='w-full m-t-exs'>
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.full }
                        text='Connect To Braintree'
                        style={ { height: '32px' } }
                        onClick={ () => goTo(`${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#integrations`) }
                     />
                  </div>
               </div>
            )
            }
            <div className='w-full flex justify-end m-t-exl subscriptionPlan__buttons'>
               {!currentPricingUnsaved && selectedPricing.payment_method !== 'paypal-v2'
               && (
                  <BaseButton
                     theme={ buttonTheme.lightGreen }
                     size={ buttonSizes.large }
                     text='Add Coupon'
                     margin
                     // onClick={ () => handleShowCouponPopup(true) }
                     // eslint-disable-next-line max-len
                     onClick={ !stripeConnection && !braintreeConnection ? () => setIsOpenIntegrationModal(true) : () => handleShowCouponPopup(true) }
                     //  disabled={ !stripeConnection }

                  />
               )
               }
               <BaseButton
                  theme={ buttonTheme.darkGreen }
                  size={ buttonSizes.large }
                  text='Save'
                  className='save-plan'
                  onClick={ disableSavePlan ? () => setIsOpenIntegrationModal(true) : handlePlanSave }
                  //  disabled={ !currentPricingUnsaved }
               />
            </div>
         </div>
         {isOpenIntegrationModal && (
            <Modal
               blurColor='rgba(63, 79, 101, 0.6)'
               contentBgColor='#fff'
               contentPosition={ window.innerWidth < 1024 ? 'full-screen' : 'center' }
               closeOnClickOutside={ true }
               onClose={ () => setIsOpenIntegrationModal(false) }
            >
               <IntegartionModalContent
                  onCancel={ () => setIsOpenIntegrationModal(false) }
                  onApprove={ () => goToIntegration() }
               />
            </Modal>
         )
         }
         { !!selectedPricing.id && updateCurrentPricingBundleCourses
         && updateCurrentPricingBundleCourses.length !== 0 && (
            <div className='m-t-m'>
               <ItemWrapper>
                  <div className='oneTimePlanBundles'>
                     <div className='flex justify-between align-center'>
                        <Text
                           size={ txtSizes.medium }
                           type={ txtType.normal }
                           inner='BUNDLES'
                        />
                        <div role='presentation' title='delete all' className='deleteAll' onClick={ () => delCourseModalClick('all') }>
                           <Icon name='Close' color='#c2cedb' />
                        </div>

                     </div>
                     <div>
                        {updateCurrentPricingBundleCourses.map(obj => {
                           return (
                              <div key={ obj.id }>
                                 <div className='flex justify-between align-center selectedBundleCourses m-t-m'>
                                    <div>
                                       <Text
                                          size={ txtSizes.extraSmall }
                                          inner={ obj.name }
                                       />

                                    </div>
                                    <div role='presentation' title='delete all' className='deleteAll' onClick={ () => delCourseModalClick(obj) }>
                                       <Icon name='Delete' color='#c2cedb' />
                                    </div>

                                 </div>

                              </div>
                           );
                        })}
                     </div>
                  </div>
               </ItemWrapper>
               {
                  deleteCourseModalIsOpen && (
                     <Modal
                        blurColor='rgba(63, 79, 101, 0.6)'
                        contentBgColor='#fff'
                        contentPosition='center'
                        closeOnClickOutside={ true }
                        contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                        onClose={ () => setDeleteCourseModalIsOpen(false) }
                     >
                        <div>
                           <DeleteModalContent
                              onCancel={ () => setDeleteCourseModalIsOpen(false) }
                              onApprove={ () => delCourseModalApproveClick() }
                              title={ deleteCourseModalValues.title }
                              content={ deleteCourseModalValues.content }
                           />
                        </div>
                     </Modal>
                  )
               }
            </div>
         )
         }
      </div>
   );
};
SubscriptionPlan.propTypes = {
   plan: PropTypes.object,
   goTo: PropTypes.func,
   handleInputPlanChange: PropTypes.func,
   handlePlanSave: PropTypes.func,
   handleShowCouponPopup: PropTypes.func,
   deletePlan: PropTypes.func,
   goToIntegration: PropTypes.func,
   chooseCourses: PropTypes.any,
   onAddValue: PropTypes.func,
   onRemoveValue: PropTypes.func,
   courseId: PropTypes.number,
};


export default SubscriptionPlan;
