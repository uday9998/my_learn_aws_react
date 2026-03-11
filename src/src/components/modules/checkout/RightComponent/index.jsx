import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import TextInput from 'components/elements/inputNew';
import Section from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Section';
import Button from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Button';
import CheckboxIcon from 'assets/images/checkout/checkbox-icon.png';
import StripeView from 'components/modules/checkout/RightComponent/stripeView';
import TextView from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Text';
import Select from 'components/elements/SelectNew';
import IconNew from 'components/elements/iconsSize';
import Icon from 'components/elements/Icon';
import lockIcon from 'assets/images/checkout/lock__icon.svg';
import RadioBox from './radioBox';
import NewRadioBox from './template7RadioBox';
import './index.scss';

const RightComponent = (props) => {
   const {
      sections,
      showEditableComponent,
      editableSectionFunc,
      isPreview,
      customFieldsData,
      course,
      changeProp,
      templateName,
   } = props;
   const coursePricings = course.pricings.filter((pricing => pricing.pricing_type !== 0));
   const [activePricingIndex, setActivePricingIndex] = useState(0);
   const siteInfo = useSelector(siteInfoSelector);

   const section = sections[2];


   const buttonProps = {
      ...sections[2].checkout_components[0].props,
      text: coursePricings[activePricingIndex]?.free_trial ? 'Start Free Trial' : sections[2].checkout_components[0].props.text,
   };

   const getChoosedPaymentStyle = (templateName) => {
      if (templateName === 'template7') {
         const backgroundColor = section.checkout_components[7]?.props.bgColor
            ? section.checkout_components[7].props.bgColor
            : siteInfo.active_school_room.school_color;

         return { backgroundColor };
      }

      if (templateName === 'template1') {
         const { bgColor: backgroundColor } = sections[2].checkout_components[0].props;

         return { backgroundColor };
      }

      const { bgColor: backgroundColor } = section.checkout_components[7].props;

      return { backgroundColor };
   };

   const getPricing = (pricing) => {
      if (pricing) {
         let pricingnew = `${ pricing.price } ${ pricing.currency }`;
         if (pricing.pricing_type === 2) {
            const frequence = pricing.payment_frequence.charAt(0).toUpperCase() + pricing.payment_frequence.slice(1);
            pricingnew = `${ pricingnew }/${ frequence }`;
         } else if (pricing.pricing_type === 0) {
            pricingnew = 'Free';
         }
         return pricingnew;
      }
   };

   const endsWithTenNumbers = (text) => {
      if (/\d{10}$/.test(text)) {
         return text.slice(0, -10);
      }

      return text;
   };

   return (
      <Section
         slug={ sections[2].checkout_section.slug }
         key={ sections[2].checkout_section.slug }
         item={ sections[2] }
         i={ 2 }
         onClick={ (e) => { editableSectionFunc(e); } }
         isPreview={ isPreview }
      >
         <div className="modern-checkout-form">
            <div className="form-section">
               {sections[2].checkout_components[0] ? (
                  <TextView
                     { ...sections[2].checkout_components[0].props }
                     slug={ sections[2].checkout_components[0].slug }
                     onClick={ (e) => showEditableComponent(e) }
                     isPreview={ isPreview }
                     changeProp={ changeProp }
                     index={ 0 }
                     sections={ sections }
                     className="section-title"
                  />
               ) : (
                  <h2 className="section-title">Your Details</h2>
               )}
               <div className="input-group">
                  <label htmlFor="fullName">Full Name</label>
                  <TextInput
                     id="fullName"
                     placeholder="Name"
                     className="modern-input"
                  />
               </div>
               <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <TextInput
                     id="email"
                     placeholder="Email Address"
                     className="modern-input"
                  />
               </div>
               {customFieldsData && customFieldsData.custom_field && !!customFieldsData.custom_field.length
                  && customFieldsData.custom_field.map((customField => {
                     return (
                        <div key={customField.id} className="input-group">
                           <TextInput
                              placeholder={ customField.name }
                              className="modern-input"
                           />
                        </div>
                     );
                  }))
               }
            </div>

            <div className="form-section">
               {/* {sections[2].checkout_components[4] ? (
                  <TextView
                     { ...sections[2].checkout_components[4].props }
                     slug={ sections[2].checkout_components[4].slug }
                     onClick={ (e) => showEditableComponent(e) }
                     isPreview={ isPreview }
                     changeProp={ changeProp }
                     index={ 4 }
                     sections={ sections }
                     className="section-title"
                  />
               ) : (
                  <h2 className="section-title">Payment Details</h2>
               )} */}
               <div className="payment-method-selector">
                  <div className="payment-method active">
                     <span>Credit Card</span>
                  </div>
                  <div className="payment-method">
                     <span>PayPal</span>
                  </div>
               </div>
               <StripeView />
            </div>

            <div className="form-section">
               {sections[2].checkout_components[5] ? (
                  <TextView
                     { ...sections[2].checkout_components[5].props }
                     slug={ sections[2].checkout_components[5].slug }
                     onClick={ (e) => showEditableComponent(e) }
                     isPreview={ isPreview }
                     changeProp={ changeProp }
                     index={ 5 }
                     sections={ sections }
                     className="section-title"
                  />
               ) : (
                  <h2 className="section-title">Apply</h2>
               )}
               <div className="promo-code-container">
                  <TextInput
                     placeholder="Promo code"
                     className="modern-input promo-input"
                  />
                  {sections[2].checkout_components[6] ? (
                     <Button
                        { ...sections[2].checkout_components[6].props }
                        slug={ sections[2].checkout_components[6].slug }
                        onClick={ (e) => showEditableComponent(e) }
                        isPreview={ isPreview }
                        className="apply-button"
                     />
                  ) : (
                     <Button
                        className="apply-button"
                        text="Apply"
                     />
                  )}
               </div>
            </div>

            <div className="form-section">
               <div className="terms-checkbox-container">
                  <input type="checkbox" id="terms" className="checkbox-input" />
                  <label htmlFor="terms" className="checkbox-label">
                     I agree to the <span className="link">Terms of Use</span> & <span className="link">Privacy Policy</span>
                  </label>
               </div>
            </div>

            <div className="form-section">
               {sections[2].checkout_components[7] ? (
                  <Button
                     { ...sections[2].checkout_components[7].props }
                     slug={ sections[2].checkout_components[7].slug }
                     onClick={ (e) => showEditableComponent(e) }
                     isPreview={ isPreview }
                     className="checkout-button"
                     text={ coursePricings[activePricingIndex]?.free_trial ? 'Start Free Trial' : sections[2].checkout_components[7].props.text }
                  />
               ) : (
                  <Button
                     className="checkout-button"
                     text={`Free Trial ${course.pricings[0]?.price ? `${course.pricings[0].price} PHP` : '60.00 PHP'} / month`}
                  />
               )}
               <div className="security-text">
                  <img src={ lockIcon } alt="lock" />
                  <span>All transactions are secure and encrypted</span>
               </div>
            </div>
         </div>
      </Section>
   );
};

RightComponent.propTypes = {
   sections: PropTypes.array,
   editableSectionFunc: PropTypes.func,
   showEditableComponent: PropTypes.func,
   showSection: PropTypes.func,
   course: PropTypes.object,
   isPreview: PropTypes.bool,
   customFieldsData: PropTypes.object,
   changeProp: PropTypes.func,
   templateName: PropTypes.string,
};

export default RightComponent;