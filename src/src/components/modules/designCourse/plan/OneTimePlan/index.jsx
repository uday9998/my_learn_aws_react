/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as txtType, SIZES as txtSizes } from 'components/elements/Text';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import TextInput from 'components/elements/form/TextInput';
import Select from 'components/elements/form/Select';
// import getCurrencySymbol from 'utils/getCurrencySymbol';
import Icon from 'components/elements/Icon';
import Modal from 'components/elements/Modal';
import IntegartionModalContent from 'components/elements/IntegrationModalContent';
import MultiSelect from 'components/elements/form/MultiSelect';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import { priceOption, priceOptionPaypal } from 'utils/getCurrencySymbol';

const OneTimePlan = ({
   goTo, goToIntegration, handleInputPlanChange, handlePlanSave, handleShowCouponPopup, deletePlan, plan: {
      selectedPricing,
      paypal_connection: paypalConnection, stripe_connection: stripeConnection,
      braintree_connection: braintreeConnection,
      paypal_connection_v2: paypalConnectionV2,
      currentPricingUnsaved, is_published: isPublished, pricings,
   }, chooseCourses, onAddValue, onRemoveValue, settingsData, courseId,
}) => {
   const [isOpenIntegrationModal, setIsOpenIntegrationModal] = useState(false);
   const [deleteCourseModalIsOpen, setDeleteCourseModalIsOpen] = useState(false);
   const [deleteCourseModalValues, setDeleteCourseModalValues] = useState({ title: 'Delete Product', content: 'Are you sure you want to delete this product?' });
   const [courseName, setCourseName] = useState({});
   let paymentMethodOption = [
      { label: 'Stripe/Paypal Old', value: 'stripe-paypal' },
      { label: 'Stripe/PayPal', value: 'stripe-paypalv2' },
      { label: 'Stripe', value: 'stripe' },
      { label: 'Paypal Old', value: 'paypal' },
      { label: 'Paypal', value: 'paypal-v2' },
      { label: 'Braintree', value: 'braintree' },
   ];
   if (!paypalConnection && !selectedPricing.id) {
      paymentMethodOption = [
         { label: 'Stripe/PayPal', value: 'stripe-paypalv2' },
         { label: 'Stripe', value: 'stripe' },
         { label: 'Paypal', value: 'paypal-v2' },
         { label: 'Braintree', value: 'braintree' },
      ];
   }
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
   let forBraintree = false;
   if (!selectedPricing.currency) selectedPricing.currency = 'USD';
   if (selectedPricing.payment_method === 'braintree') {
      selectedPricing.currency = 'USD';
      forBraintree = true;
   }

   let disableSavePlan = false;
   if (selectedPricing.payment_method === 'paypal-v2' && !paypalConnectionV2 && settingsData.is_published === 1) {
      disableSavePlan = true;
   } else if (selectedPricing.payment_method === 'braintree' && !braintreeConnection && settingsData.is_published === 1) {
      disableSavePlan = true;
   } else if (selectedPricing.payment_method === 'stripe' && !stripeConnection && settingsData.is_published === 1) {
      disableSavePlan = true;
   } else if (selectedPricing.payment_method === 'paypal' && !paypalConnection && settingsData.is_published === 1) {
      disableSavePlan = true;
   } else if (selectedPricing.payment_method === 'stripe-paypal' && !paypalConnection && !stripeConnection && settingsData.is_published === 1) {
      disableSavePlan = true;
   } else if (selectedPricing.payment_method === 'stripe-paypalv2' && !paypalConnectionV2 && !stripeConnection && settingsData.is_published === 1) {
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
   return (
      <div className='drawer-wrapper'>
         <div className='oneTimePlan'>
            <div className='flex justify-between align-center'>
               <Text
                  size={ txtSizes.medium }
                  type={ txtType.normal }
                  inner='ONE TIME PLAN'
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
                  size={ txtSizes.medium }
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
            <div className='w-full m-t-m flex align-end'>
               <div className='planRate'>
                  <Select
                     disabled={ !!selectedPricing.id || forBraintree }
                     label='One Time Pricing'
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
            {newchooseCourses.length
               ? (
                  <div className='w-full m-t-m'>
                     <MultiSelect
                        placeholder='Choose Class'
                        label={ ['Bundles', <span className='bundlesOptional'>(Optional)</span>] }
                        iconColor='rgb(63, 79, 101)'
                        onAddValue={ onAddValue }
                        onRemoveValue={ onRemoveValue }
                        selectedValues={ selectedPricingAttachedCourses }
                        options={ chooseCoursesOptions }
                        hasTooltip={ true }
                     />
                  </div>
               )
               : ''
            }

            <div className='w-full m-t-m'>
               {!paypalConnectionV2
                     && (
                        <div className='w-full'>
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
                     )}
               {!braintreeConnection
                     && (
                        <div className='w-full m-t-exs'>
                           <BaseButton
                              theme={ buttonTheme.grey }
                              size={ buttonSizes.full }
                              text='Connect To Braintree'
                              style={ { height: '32px' } }
                              onClick={ () => goTo(`${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#integrations`) }
                           />
                        </div>
                     )}
            </div>

            <div className='w-full flex flex-wrap justify-end m-t-exl buttom-content'>
               {!currentPricingUnsaved
               && (
                  <BaseButton
                     theme={ buttonTheme.lightGreen }
                     size={ buttonSizes.large }
                     text='Add Coupon'
                     margin
                     // eslint-disable-next-line max-len
                     // onClick={ !paypalConnection && !stripeConnection ? () => setIsOpenIntegrationModal(true) : () => handleShowCouponPopup(true) }
                     onClick={ () => handleShowCouponPopup(true) }
                     //  disabled={ !paypalConnection && !stripeConnection }

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
OneTimePlan.propTypes = {
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
   settingsData: PropTypes.object,
   courseId: PropTypes.number,
};

export default OneTimePlan;
