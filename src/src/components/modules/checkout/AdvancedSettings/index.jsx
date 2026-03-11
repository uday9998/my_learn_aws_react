import React, { useState } from 'react';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import RadioBox from 'components/elements/form/Radio';
import AdvancedTags from 'components/modules/designCourse/signUp/signUpCards/AdvancedTags';
import AdvancedAutoresponder from 'components/modules/designCourse/signUp/signUpCards/AdvancedAutoresponder';
import ThankYouPage from 'components/modules/checkout/AdvancedSettings/ThankYouPage';
import Seo from 'components/modules/checkout/AdvancedSettings/Seo';
import CustomFields from 'components/modules/checkout/AdvancedSettings/CustomFields';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateCheckoutCourse } from 'api/AuthApi';
import PropTypes from 'prop-types';
import './index.scss';

const checkoutUrl = process.env.REACT_APP_CHECKOUT_URL;

const AdvancedSettings = ({
   attachTag, detachTag, course, signUp,
   handleInputChange, settingsData, handleSettingsSave, app, copyCodeToClipboard, copyView, setCourse,
   handleSignUpSave, goTo, autoresponderOptions, autoResponderListsOptions, onChange,
   customFieldsData, setCustomFields,
}) => {
   const [updateCheckoutCourseTerms] = useSubmitForm(updateCheckoutCourse, {
      successMessage: 'Terms & Conditions status has been changed.',
   });
   const [isTermsActive, setIsTermsActive] = useState(course && course.checkout && course.checkout.is_terms_active);
   const handleTermChange = (isActive) => {
      const courseCheckout = {
         is_terms_active: isActive,
      };
      if (isTermsActive !== isActive) {
         setIsTermsActive(isActive);
         updateCheckoutCourseTerms({ courseId: course.id, courseCheckout }, (data) => {
            setCourse({
               ...course,
               checkout: {
                  ...course.checkout,
                  is_terms_active: data.is_terms_active,
               },
            });
         });
      }
   };

   return (
      <div className='settings-container'>
         <div className='details-title'>
            <Text
               size={ TextSize.medium }
               type={ TextType.bold }
               inner='Details'
               color='#3f4f65'
            />
         </div>
         {!!course.pricings.length && (
            <div className='details-input-button'>
               <div>
                  {/* <Text
                     size={ TextSize.extraSmall }
                     type={ TextType.normal }
                     inner='URL'
                     style={ { margin: '8px 0' } }
                  /> */}
                  <TextInput
                     id='checkout_url'
                     label='URL'
                     placeholder='mastercode'
                     leftText={ `${ checkoutUrl }` }
                     name='checkout_url'
                     onChange={ () => {} }
                     autocomplate={ false }
                     value={ `${ app.uuid }/0/${ course.id }/${ course.pricings[0].id }` }
                     disabled={ true }
                  />
               </div>
               <div className='copybtn'>
                  <BaseButton
                     theme={ btnTheme.lightBlue }
                     size={ btnSize.largeMedium }
                     text='Copy URL'
                     onClick={ () => copyCodeToClipboard(`${ checkoutUrl }${ app.uuid }/0/${ course.id }/${ course.pricings[0].id }`, `checkout_url${ course.pricings[0].id }`) }
                  />
                  { copyView === `checkout_url${ course.pricings[0].id }`
                     && <div className='copiedText'>Copied</div>
                  }
               </div>
            </div>
         )}
         <div className='product-tag-border' />
         <div>
            <AdvancedAutoresponder
               signUp={ signUp }
               onChange={ onChange }
               handleSignUpSave={ () => handleSignUpSave('advanced') }
               autoresponderOptions={ autoresponderOptions }
               autoResponderListsOptions={ autoResponderListsOptions }
               goTo={ goTo }
            />
         </div>
         <div className='product-tag-border' />
         <div>
            <AdvancedTags
               signUp={ signUp }
               attachTag={ attachTag }
               detachTag={ detachTag }
            />
         </div>
         <div className='terms-conditions'>
            <Text
               size={ TextSize.medium }
               type={ TextType.bold }
               inner='Terms & Conditions'
               color='#3f4f65'
            />
         </div>
         <div className='radioboxes'>
            <div className='dont-active'>
               <RadioBox
                  name='acive'
                  label="Don't Activate"
                  className="don't-active"
                  textType='normal'
                  onChange={ () => handleTermChange(0) }
                  checked={ !isTermsActive }
                  color={ !isTermsActive ? '#7cb740' : '#c2cedb' }
               />
            </div>
            <div>
               <RadioBox
                  name='require'
                  label='Yes Require Them'
                  className='require'
                  textType='normal'
                  onChange={ () => handleTermChange(1) }
                  checked={ isTermsActive }
                  color={ isTermsActive ? '#7cb740' : '#c2cedb' }
               />
            </div>
         </div>
         <div className='product-tag-border' />
         <div className='after-purchase-input'>
            <ThankYouPage
               settingsData={ settingsData.thank_you_page }
               thankYouPageUrl={ settingsData.thank_you_page_url }
               thankYouMessage={ settingsData.thank_you_message }
               thankYouPageActive={ settingsData.thank_you_page_active }
               handleInternalInputChange={ (key, value) => handleInputChange(key, value, 'thank-you-page') }
               handleSettingsSave={ handleSettingsSave }
            />
         </div>
         <div className='product-tag-border-2' />
         <CustomFields
            course={ course }
            customFieldsData={ customFieldsData }
            setCustomFields={ setCustomFields }
         />
         <div className='m-t-m'>
            <Seo
               settingsData={ settingsData }
               handleInternalInputChange={ (key, value) => handleInputChange(key, value, 'settings') }
               handleSettingsSave={ handleSettingsSave }
            />
         </div>
      </div>
   );
};

AdvancedSettings.propTypes = {
   detachTag: PropTypes.func,
   attachTag: PropTypes.func,
   course: PropTypes.object,
   handleInputChange: PropTypes.func,
   handleSettingsSave: PropTypes.func,
   settingsData: PropTypes.any,
   app: PropTypes.object,
   copyCodeToClipboard: PropTypes.func,
   copyView: PropTypes.string,
   setCourse: PropTypes.func,
   signUp: PropTypes.object,
   handleSignUpSave: PropTypes.func,
   goTo: PropTypes.func,
   autoresponderOptions: PropTypes.array,
   autoResponderListsOptions: PropTypes.array,
   onChange: PropTypes.func,
   setCustomFields: PropTypes.func,
   customFieldsData: PropTypes.object,
};


export default AdvancedSettings;
