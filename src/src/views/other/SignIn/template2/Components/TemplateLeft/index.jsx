import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Router from 'routes/router';
import { Link } from 'react-router-dom';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import OtherPageButton from 'views/other/OtherPageButton';

import './index.scss';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';

const SignInTemplateSecondLeft = ({
   generalProps,
   onSubmit,
   //    googleLogin,
}) => {
   const siteInfo = useSelector(siteInfoSelector);
   const data = useContext(OtherPageContext);
   const { editor, changeProp } = data || {};

   const [inputs, setInputs] = useState({
      email: '',
      password: '',
      remember: false,
   });
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const {
      textColor, secondaryTextColor, buttonColor, buttonBackground,
   } = generalProps;

   const handleChangeInput = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setInputs({
         ...inputs,
         [name]: value,
      });
   };

   const handleClick = async () => {
      const errMessages = await onSubmit(inputs, inputs.remember);

      const { generalError, ...errorMessages } = errMessages;

      if (!errorMessages.generalError?.length) {
         setTimeout(() => {
            removeErrorMessage('generalError');
         }, 1500);
      }

      addErrorMessages(errMessages);
   };

   return (
      <div
         className='signin__template2__left'
         style={ { background: generalProps.cardBackground } }
      >
         <div
            className='logo__wrapper'
         >
            {(generalProps.logo || siteInfo.school_logo) ? (
               <img src={ generalProps.logo || siteInfo.school_logo } alt='' />
            ) : (
               <IconNew name='TemplateSecondDefaultLogo' />
            )}
         </div>
         {editor ? (
            <div style={ { marginTop: '32px', width: '100%' } }>
               <AffiliateInlineEditor
                  text={ generalProps.signInText }
                  fontSize='28'
                  fontWeight='500'
                  lineHeight='130%'
                  color={ textColor }
                  onChange={ (e) => {
                     changeProp('signInText', e);
                  } }
               />
            </div>
         ) : (
            <Text
               inner={ generalProps.signInText }
               type={ types.mediumSmall }
               size={ sizes.size_28 }
               style={ { marginTop: '32px', color: textColor, textAlign: 'center' } }
            />
         )}

         <div className='signin__template2__left__text'>
            <Text
               inner="Don't have an account? " 
               type={ types.regular148 }
               style={ { color: secondaryTextColor } }
               size={ sizes.medium }
            />
            <Link to={ Router.route('SIGNUP_STUDENT').getMask() }>
               <Text
                  inner='Sign Up'
                  style={ { cursor: 'pointer', color: textColor } }
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
            </Link>
         </div>

         <div className='signin__template2__left__form'>
            <Input
               errorMessages={ errorMessages.email }
               value={ inputs.email }
               name='email'
               placeholder='Enter your email'
               onKeyPress={ (e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleClick();
                  }
               } }
               label='Email'
               onChange={ handleChangeInput }
               textColor={ textColor || siteInfo.active_school_room.school_text_color }
            />
            <Input
               errorMessages={ errorMessages.password }
               value={ inputs.password }
               name='password'
               label='Password'
               type='password'
               onKeyPress={ (e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleClick();
                  }
               } }
               placeholder='Enter your password'
               onChange={ handleChangeInput }
               textColor={ textColor || siteInfo.active_school_room.school_text_color }
            />
            <div className='signin__template2__left__form__remember'>
               <CheckBox
                  label='Remember me'
                  labelPosition='right'
                  checked={ inputs.remember }
                  onChange={ () => handleChangeInput('remember', !inputs.remember) }
                  textColor={ textColor || siteInfo.active_school_room.school_text_color }
               />
               <Link to={ Router.route('FORGOT_PASSWORD').getMask() }>
                  <Text
                     inner='Forgot Password'
                     style={ { cursor: 'pointer', color: textColor } }
                     type={ types.regular148 }
                     size={ sizes.medium }
                  />
               </Link>
            </div>
            <OtherPageButton
               color={ buttonColor }
               isEditor={ editor }
               inner={ generalProps.buttonText }
               onChange={ changeProp }
               className='login__button'
               background={ buttonBackground }
               onClick={ handleClick }
               errorMessage={ errorMessages.generalError?.[0] }
            />
            {/* {!editor && (
               <GoogleLoginButton
                  onClick={ () => googleLogin() }
               />
            )} */}
         </div>

      </div>
   );
};

SignInTemplateSecondLeft.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   //    googleLogin: PropTypes.func,
   // siteInfo: PropTypes.func,
};

export default SignInTemplateSecondLeft;
