import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import OtherPageButton from 'views/other/OtherPageButton';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { joinFreeLessonCourse } from 'api';

const SignInTemplateOneTop = ({
   generalProps, onSubmit, previewMode,
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

   // Simplified color logic based only on membership mode
   const isDarkMode = siteInfo.membership?.active_school_room?.mode === 1;
   const textColor = isDarkMode ? '#ffffff' : '#000000';
   const backgroundColor = isDarkMode ? '#404040' : '#fafafa';

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

   const { buttonColor, buttonBackground, cardBackground } = generalProps;
   const isPreview = window.location.pathname.includes('preview');

   const handleChangeInput = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setInputs({
         ...inputs,
         [name]: value,
      });
   };

   const handleSubmit = async () => {
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
      <div className='sign__template__top' style={{ 
         background: previewMode && generalProps.other_page_section.props.cardBackground 
            ? generalProps.other_page_section.props.cardBackground 
            : cardBackground || backgroundColor
      }}>
         {
            (generalProps.logo || siteInfo.school_logo) ? (
               <img src={generalProps.logo || siteInfo.school_logo} alt='' />
            ) : (
               <Text
                  inner={siteInfo.title}
                  size={sizes.size_36}
                  style={{ color: textColor }}
               />
            )
         }
         {editor ? (
            <div style={{ marginTop: '32px', width: '100%' }}>
               <AffiliateInlineEditor
                  text={generalProps.signInText}
                  fontSize='32'
                  fontWeight='500'
                  lineHeight='130%'
                  color={textColor}
                  onChange={(e) => {
                     changeProp('signInText', e);
                  }}
               />
            </div>
         ) : (
            <Text
               inner={previewMode ? generalProps.other_page_section.props.signInText : generalProps.signInText}
               type={types.mediumSmall}
               size={sizes.size_32}
               style={{ 
                  marginTop: '32px', 
                  textAlign: 'center', 
                  color: textColor
               }}
            />
         )}

         <div className='sign__template__top__text' style={{ marginBottom: '24px' }}>
            <Text
               inner="Don't have an account? "
               type={types.regular148}
               style={{ color: textColor }}
               size={sizes.large}
            />
            {
               editor || isPreview ? (
                  <Text
                     inner='Sign Up'
                     style={{ 
                        cursor: 'pointer', 
                        color: textColor
                     }}
                     type={types.regular148}
                     size={sizes.xlarge}
                  />
               ) : (
                  <Link to={Router.route('SIGNUP_STUDENT').getMask()} style={{ textDecoration: 'none' }}>
                     <Text
                        inner='Sign Up'
                        style={{ 
                           cursor: 'pointer', 
                           color: textColor
                        }}
                        type={types.regular148}
                        size={sizes.xlarge}
                     />
                  </Link>
               )
            }
         </div>
         <div className='sign__template__top__form'>
            <Input
               errorMessages={errorMessages.email}
               value={inputs.email}
               name='email'
               placeholder='Enter your email'
               onKeyPress={(e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleSubmit();
                  }
               }}
               label='Email'
               onChange={handleChangeInput}
               textColor={textColor}
            />
            <Input
               errorMessages={errorMessages.password}
               value={inputs.password}
               name='password'
               label='Password'
               type='password'
               onKeyPress={(e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleSubmit();
                  }
               }}
               placeholder='Enter your password'
               onChange={handleChangeInput}
               textColor={textColor}
               isPassword={true}
            />
            <div className='sign__template__top__form__remember'>
               <CheckBox
                  label='Remember me'
                  labelPosition='right'
                  checked={inputs.remember}
                  onChange={() => handleChangeInput('remember', !inputs.remember)}
                  previewMode={previewMode}
                  generalProps={generalProps}
                  textColor={textColor}
               />
               <Link to={Router.route('FORGOT_PASSWORD').getMask()} style={{ textDecoration: 'none' }}>
                  <Text
                     inner='Forgot Password'
                     style={{ 
                        cursor: 'pointer', 
                        color: textColor
                     }}
                     type={types.regular148}
                     size={sizes.large}
                  />
               </Link>
            </div>
            <OtherPageButton
               color={
                  previewMode && generalProps.other_page_section.props.buttonColor
                     ? generalProps.other_page_section.props.buttonColor
                     : buttonColor || '#ffffff'
               }
               isEditor={editor}
               inner={previewMode ? generalProps.other_page_section.props.buttonText : generalProps.buttonText}
               onChange={changeProp}
               className='login__button'
               background={
                  previewMode && generalProps.other_page_section.props.buttonBackground
                     ? generalProps.other_page_section.props.buttonBackground
                     : buttonBackground || siteInfo.membership?.active_school_room?.school_color
               }
               onClick={handleSubmit}
               errorMessage={errorMessages.generalError?.[0]}
            />
         </div>
      </div>
   );
};

SignInTemplateOneTop.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   previewMode: PropTypes.bool,
};

export default SignInTemplateOneTop;