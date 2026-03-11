import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import Input from 'components/elements/inputNew';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { AffiliateFrontContext } from 'containers/pages/affiliate/login';
import { siteInfoSelector } from 'state/modules/common/selectors';
import ModalNew from 'components/elements/ModalNew';

const SignUpForm = ({ linksColor }) => {
   const { terms, privacy } = useSelector(siteInfoSelector);

   const [isTermsOpen, setIsTermsOpen] = useState(false);
   const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

   const { data, handleInputChange, onSubmit } = React.useContext(AffiliateFrontContext);

   const closeTermsModal = () => setIsTermsOpen(false);
   const openTermsModal = () => setIsTermsOpen(true);
   const closePrivacyModal = () => setIsPrivacyOpen(false);
   const openPrivacyModal = () => setIsPrivacyOpen(true);

   const KeyPressHandle = (e) => {
      if (data.is_agree && (e.keyCode === 13 || e.which === 13)) {
         onSubmit();
      }
   };

   return (
      <div className='affiliate__sign'>
         <Input
            type='text'
            value={ data.name }
            label='Full Name'
            placeholder='Enter your full name'
            name='name'
            onChange={ handleInputChange }
            onKeyPress={ KeyPressHandle }
         />
         <Input
            type='text'
            value={ data.email }
            label='Email'
            placeholder='Enter your email'
            name='email'
            onChange={ handleInputChange }
            onKeyPress={ KeyPressHandle }
         />
         <Input
            type='password'
            value={ data.password }
            label='Password'
            placeholder='Enter your password'
            name='password'
            onChange={ handleInputChange }
            onKeyPress={ KeyPressHandle }
         />
         <Input
            type='password'
            value={ data.password_confirmation }
            label='Confirm password'
            placeholder='Confirm your password'
            name='password_confirmation'
            onChange={ handleInputChange }
            onKeyPress={ KeyPressHandle }
         />
         <Input
            type='text'
            value={ data.paypal_email }
            label='Paypal Email'
            placeholder='Enter your Paypal email'
            name='paypal_email'
            onChange={ handleInputChange }
            onKeyPress={ KeyPressHandle }
         />
         <div className='affiliate__sign__accept'>
            <CheckBox
               checked={ data.is_agree }
               onChange={ handleInputChange }
               name='is_agree'
            />
            <div className='affiliate__sign__accept__text'>
               <Text
                  type={ types.regular }
                  size={ sizes.medium }
                  color='#555555'
                  inner='I agree to the'
               />
            </div>
            <div className='affiliate__sign__accept__link' onClick={ openTermsModal } role='presentation'>
               <Text
                  type={ types.regular148 }
                  size={ sizes.medium }
                  style={ { color: linksColor } }
                  inner='Terms of Use'
               />
            </div>
            <div className='affiliate__sign__accept__text'>
               <Text
                  type={ types.regular }
                  size={ sizes.medium }
                  color='#555555'
                  inner='&'
               />
            </div>
            <div className='affiliate__sign__accept__link' onClick={ openPrivacyModal } role='presentation'>
               <Text
                  type={ types.regular148 }
                  size={ sizes.medium }
                  style={ { color: linksColor } }
                  inner=' Privacy Policy'
               />
            </div>
         </div>
         {isTermsOpen && (
            <ModalNew onCloseModal={ closeTermsModal }>
               <div dangerouslySetInnerHTML={ { __html: terms } } />
            </ModalNew>
         )}
         {isPrivacyOpen && (
            <ModalNew onCloseModal={ closePrivacyModal }>
               <div dangerouslySetInnerHTML={ { __html: privacy } } />
            </ModalNew>
         )}
      </div>
   );
};

SignUpForm.propTypes = {
   linksColor: PropTypes.string,
};

export default SignUpForm;
