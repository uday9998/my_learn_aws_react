import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import IconNew from 'components/elements/iconsSize';
import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import Input from 'components/elements/inputNew';
import OtherPageButton from 'views/other/OtherPageButton';

import './index.scss';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';
import CheckBox from 'components/elements/form/CheckBoxNew';
import ModalNew from 'components/elements/ModalNew';

const TemplateLeft = ({
   generalProps,
   onSubmit,
   //    googleLogin,
   // siteInfo,
}) => {
   const siteInfo = useSelector(siteInfoSelector);
   const data = useContext(OtherPageContext);
   const { editor, changeProp } = data || {};

   const [inputs, setInputs] = useState({
      email: '',
      password: '',
      remember: false,
   });
   const [isTermsOpen, setIsTermsOpen] = useState(false);
   const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
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

      const { is_agree: isAgree, ...errorMessages } = errMessages;

      addErrorMessages({ ...errorMessages, remember: isAgree });
   };

   const handleTogglePrivacy = () => {
      setIsPrivacyOpen(prevState => !prevState);
   };
   const handleToggleOpenTerms = () => {
      setIsTermsOpen(prevState => !prevState);
   };

   return (
      <div
         className='signup__template2__left'
         style={ { background: generalProps.cardBackground } }
      >
         {isTermsOpen && (
            <ModalNew onCloseModal={ handleToggleOpenTerms }>
               <div dangerouslySetInnerHTML={ { __html: siteInfo.terms } } />
            </ModalNew>
         )}
         {isPrivacyOpen && (
            <ModalNew onCloseModal={ handleTogglePrivacy }>
               <div dangerouslySetInnerHTML={ { __html: siteInfo.privacy } } />
            </ModalNew>
         )}
         <div className='logo__wrapper'>
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
         <div className='signup__template2__left__text'>
            <Text
               inner='Already have an account?'
               type={ types.regular148 }
               // style={ { color: secondaryTextColor } }
               style={ { color: '#444C4B' || secondaryTextColor } }
               size={ sizes.medium }
            />
            <Link to={ Router.route('LOGIN').getMask() }>
               <Text
                  inner='Log In with Email'
                  style={ { cursor: 'pointer', color: textColor } }
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
            </Link>

         </div>
         <div className='signup__template2__left__form'>
            <Input
               errorMessages={ errorMessages.email }
               value={ inputs.email }
               name='email'
               placeholder='Enter your email'
               label='Email'
               onKeyPress={ (e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleClick();
                  }
               } }
               onChange={ handleChangeInput }
               textColor={ textColor || siteInfo.active_school_room.school_text_color }
            />
            <Input
               errorMessages={ errorMessages.name }
               value={ inputs.name }
               name='name'
               placeholder='Enter your name'
               onKeyPress={ (e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleClick();
                  }
               } }
               label='Name'
               onChange={ handleChangeInput }
               textColor={ textColor || siteInfo.active_school_room.school_text_color }
            />
            <Input
               errorMessages={ errorMessages.password }
               value={ inputs.password }
               name='password'
               label='Password'
               onKeyPress={ (e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleClick();
                  }
               } }
               type='password'
               placeholder='Enter your password'
               onChange={ handleChangeInput }
               textColor={ textColor || siteInfo.active_school_room.school_text_color }
            />
            <div className='checkbox__wrapper'>
               <CheckBox
                  labelPosition='right'
                  checked={ inputs.remember }
                  onChange={ () => handleChangeInput('remember', !inputs.remember) }
                  labelStyle={ { color: textColor || siteInfo.active_school_room.school_text_color } }
                  checkBoxColor={ buttonBackground || siteInfo.active_school_room.school_color }
                  generalProps={ generalProps }
                  isError={ errorMessages.remember?.length }
               />
               <div className='texts__wrapper'>
                  <Text 
                     inner='I agree to the'
                     size={ sizes.size_14 }
                     style={ {
                        fontWeight: 'bold',
                        color: textColor || siteInfo.active_school_room.school_text_color,
                     } }
                  />
                  <Text 
                     inner='Terms of Service'
                     size={ sizes.size_14 }
                     style={ {
                        fontWeight: 'bold',
                        color: '#24554e',
                        cursor: 'pointer',
                     } }
                     onClick={ handleToggleOpenTerms }
                  />
                  <Text 
                     inner='and'
                     size={ sizes.size_14 }
                     style={ {
                        fontWeight: 'bold',
                        color: textColor || siteInfo.active_school_room.school_text_color,
                     } }
                  />
                  <Text 
                     inner='Privacy Policy'
                     size={ sizes.size_14 }
                     style={ {
                        fontWeight: 'bold',
                        color: '#24554e',
                        cursor: 'pointer',
                     } }
                     onClick={ handleTogglePrivacy }
                  />
               </div>
            </div>
            {/* <Input
               errorMessages={ errorMessages.confirmPassword }
               value={ inputs.confirmPassword }
               name='confirmPassword'
               label='Confirm Password'
               type='password'
               onKeyPress={ (e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     onSubmit();
                  }
               } }
               placeholder='Enter your password'
               onChange={ handleChangeInput }
            /> */}
            <OtherPageButton
               color={ buttonColor }
               isEditor={ editor }
               inner={ generalProps.buttonText }
               onChange={ changeProp }
               className='SignUp__button'
               background={ buttonBackground }
               onClick={ handleClick }
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

TemplateLeft.propTypes = {
   generalProps: PropTypes.object,
   //    googleLogin: PropTypes.func,
   onSubmit: PropTypes.func,
   // siteInfo: PropTypes.object,
};

export default TemplateLeft;
