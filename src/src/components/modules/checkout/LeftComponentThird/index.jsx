/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import TextInput from 'components/elements/inputNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import Section from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Section';
import Button from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Button';
import PropTypes from 'prop-types';
import StripeView from 'components/modules/checkout/LeftComponentThird/stripeView';
import StripeIcons from 'components/modules/checkout/LeftComponentThird/stripeView/stripeIcons';
import TextView from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Text';
import CheckboxIcon from 'assets/images/checkout/checkbox-icon.png';
import lockIcon from 'assets/images/checkout/lock__icon.svg';
import RadioBox from './radioBox';
import './index.scss';

const LeftComponentThird = (props) => {
   const {
      sections, showEditableComponent, editableSectionFunc, isPreview, customFieldsData, course, changeProp,
   } = props;
   const coursePricings = course.pricings.filter((pricing => pricing.pricing_type !== 0));
   const [activePricingIndex, setActivePricingIndex] = useState(0);

   const getPricing = () => {
      let pricing = `${ coursePricings[activePricingIndex].price } ${ coursePricings[activePricingIndex].currency }`;
      if (coursePricings[activePricingIndex].pricing_type === 2) {
         pricing = `${ pricing }/${ coursePricings[activePricingIndex].payment_frequence }`;
      } else if (coursePricings[activePricingIndex].pricing_type === 0) {
         pricing = 'Free';
      }
      return pricing;
   };

   const buttonProps = {
      ...sections[1].checkout_components[0].props,
      text: coursePricings[activePricingIndex]?.free_trial ? 'Start Free Trial' : sections[1].checkout_components[0].props.text,
   };

   return (
      <Section
         slug={ sections[1].checkout_section.slug }
         key={ sections[1].checkout_section.slug }
         item={ sections[1] }
         i={ 1 }
         onClick={ (e) => { editableSectionFunc(e); } }
         isPreview={ isPreview }
         templateName='template3'
      >
         <div className='checkoutPageThird-leftContent'>
            <div className='left-side-title'>
               {sections[1].checkout_components[1]
                  ? (
                     <TextView
                        { ...sections[1].checkout_components[1].props }
                        slug={ sections[1].checkout_components[1].slug }
                        onClick={ (e) => showEditableComponent(e) }
                        isPreview={ isPreview }
                        changeProp={ changeProp }
                        index={ 1 }
                        sections={ sections }
                     />
                  ) : (
                     <Text
                        size={ TextSize.large }
                        type={ TextType.medium }
                        inner='Contact Information'
                        color='#1B2125'
                     />
                  )}
            </div>
            <div className='input-container'>
               <TextInput
                  placeholder='Full name'
                  label='Full name'
               />
               <TextInput
                  placeholder='Email address'
                  label='Email address'
               />
               {customFieldsData && customFieldsData.custom_field && !!customFieldsData.custom_field.length
               && customFieldsData.custom_field.map((customField => {
                  return (
                     <TextInput
                        key={ customField.id }
                        placeholder=''
                        label={ customField.name }
                     />
                  );
               }))
               }
            </div>
            <div className='payment-details-title'>
               {sections[1].checkout_components[2]
                  ? (
                     <TextView
                        { ...sections[1].checkout_components[2].props }
                        slug={ sections[1].checkout_components[2].slug }
                        onClick={ (e) => showEditableComponent(e) }
                        isPreview={ isPreview }
                        changeProp={ changeProp }
                        index={ 2 }
                        sections={ sections }
                     />
                  ) : (
                     <Text
                        size={ TextSize.large }
                        type={ TextType.medium }
                        inner='Payment Methods'
                        color='#1b2125'
                     />
                  )}
            </div>
            <div className='payment-details-container'>
               <div className='payment-details payment-details-stripe-border'>
                  <div className='payment-details-stripe'>
                     <div className='credit-card'>
                        <input type='radio' value='credit card' checked={ true } id='radio-credit-card' />
                        <label htmlFor='radio-credit-card' className='payment-credit-title'>
                           <Text
                              size={ TextSize.small }
                              type={ TextType.normal }
                              inner='Credit & Debit cards'
                              color='#1b2125'
                           />
                        </label>
                     </div>
                     <div><StripeIcons /></div>
                  </div>
               </div>
               <div className='m-t-exl'>
                  <StripeView disableIcons={ true } />
               </div>
            </div>
            <div className='payment-line' />
            <div className='paypal-container'>
               <div className='paypal-details'>
                  <div className='paypal'>
                     <input type='radio' value='paypal' id='radio-paypal' />
                     <label className='payment-credit-title' htmlFor='radio-paypal'>
                        <Text
                           size={ TextSize.small }
                           type={ TextType.normal }
                           inner='Pay with PayPal'
                           color='#1b2125'
                        />
                     </label>
                  </div>
               </div>

            </div>
            {!!coursePricings.length
               && (
                  <div>
                     <div className='choose-title'>
                        {sections[1].checkout_components[3]
                           ? (
                              <TextView
                                 { ...sections[1].checkout_components[3].props }
                                 slug={ sections[1].checkout_components[3].slug }
                                 onClick={ (e) => showEditableComponent(e) }
                                 isPreview={ isPreview }
                                 changeProp={ changeProp }
                                 index={ 3 }
                                 sections={ sections }
                              />
                           ) : (
                              <Text
                                 size={ TextSize.large }
                                 type={ TextType.medium }
                                 inner='Choose'
                                 color='#1b2125'
                              />
                           )}
                     </div>
                     <div onClick={ (e) => { e.stopPropagation(); } } role='presentation'>
                        { coursePricings.map((pricing, index) => {
                           if (pricing.price) {
                              return (
                                 <RadioBox
                                    key={ pricing.id }
                                    checked={ index === activePricingIndex }
                                    pricing={ pricing }
                                    setActivePricingIndex={ setActivePricingIndex }
                                    index={ index }
                                 />
                              );
                           }
                           return null;
                        })
                        }
                     </div>
                  </div>
               )
            }
            <div className='promocode-third choose-title'>
               {sections[1].checkout_components[4]
                  ? (
                     <TextView
                        { ...sections[1].checkout_components[4].props }
                        slug={ sections[1].checkout_components[4].slug }
                        onClick={ (e) => showEditableComponent(e) }
                        isPreview={ isPreview }
                        changeProp={ changeProp }
                        index={ 4 }
                        sections={ sections }
                     />
                  ) : (
                     <Text
                        size={ TextSize.large }
                        type={ TextType.medium }
                        inner='Add a Promo Code'
                        color='#1b2125'
                     />
                  )
               }
               {!!sections[1].checkout_components[5] && (
                  <div
                     className='promo-code-form'
                     style={{
                        paddingTop: `${ sections[1].checkout_components[5].props.paddingTop }px`,
                        paddingBottom: `${ sections[1].checkout_components[5].props.paddingBottom }px`,
                     }}
                  >
                     <TextInput
                        placeholder='Promo Code'
                     />
                     <Button
                        { ...sections[1].checkout_components[5].props }
                        paddingTop={ 0 }
                        paddingBottom={ 0 }
                        slug={ sections[1].checkout_components[5].slug }
                        onClick={ (e) => showEditableComponent(e) }
                        isPreview={ isPreview }
                        isApply={ false }
                     />
                  </div>
               )}
            </div>
            {!!coursePricings.length && (
               <>
                  <div className='item-amount-container'>
                     <Text
                        size={ TextSize.small }
                        type={ TextType.bold }
                        inner='ITEM'
                        color='#1b2125'
                     />
                     <Text
                        size={ TextSize.small }
                        type={ TextType.bold }
                        inner='AMOUNT'
                        color='#1b2125'
                     />
                  </div>
                  <div className='price-container'>
                     <Text
                        size={ TextSize.small }
                        type={ TextType.medium }
                        inner='Mastercode Class'
                        color='#1b2125'
                     />
                     <Text
                        size={ TextSize.small }
                        type={ TextType.medium }
                        inner={ getPricing() }
                        color='#1b2125'
                     />
                  </div>
               </>
            )}
            {
               sections[1].checkout_components[6] && (
                  <TextView
                     { ...sections[1].checkout_components[6].props }
                     slug={ sections[1].checkout_components[6].slug }
                     onClick={ (e) => showEditableComponent(e) }
                     isPreview={ isPreview }
                     changeProp={ changeProp }
                     index={ 6 }
                     sections={ sections }
                  />
               )
            }
            <div className='terms-conditions-text'>
               <div className='checkbox'>
                  <img src={ CheckboxIcon } alt='checkboxIcon' />
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small_14 }
                     style={{ color: '#333333' }}
                     inner='I agree to the'
                  />
               </div>
               <div className='terms-condition'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small_14 }
                     style={{ color: 'rgba(64, 115, 255)' }}
                     inner='Terms of Use'
                  />
               </div>
               <div className='terms-condition-and'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small_14 }
                     style={{ color: '#333333' }}
                     inner='&'
                  />
               </div>
               <div className='terms-condition'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small_14 }
                     style={{ color: 'rgba(64, 115, 255)' }}
                     inner=' Privacy Policy'
                  />
               </div>
            </div>
            <div className='footer-button'>
               <Button
                  { ...buttonProps }
                  slug={ sections[1].checkout_components[0].slug }
                  onClick={ (e) => showEditableComponent(e) }
                  isPreview={ isPreview }
               />
            </div>
            <div className='footer__text'>
               <img src={ lockIcon } alt='lock icon' />
               <span>All transactions are secure and encrypted</span>
            </div>
         </div>
      </Section>
   );
};

LeftComponentThird.propTypes = {
   sections: PropTypes.array,
   editableSectionFunc: PropTypes.func,
   showEditableComponent: PropTypes.func,
   showSection: PropTypes.func,
   course: PropTypes.object,
   isPreview: PropTypes.bool,
   customFieldsData: PropTypes.object,
   changeProp: PropTypes.func,
};

export default LeftComponentThird;
