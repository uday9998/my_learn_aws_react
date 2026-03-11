import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import OtherPageButton from 'views/other/OtherPageButton';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';
import CheckBox from 'components/elements/form/CheckBoxNew';
import ModalNew from 'components/elements/ModalNew';

const SignUpTemplateOneTop = ({
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
   const [isTermsOpen, setIsTermsOpen] = useState(false);
   const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
   const [errorMessages, setErrorMessages] = useState({});

   // Simplified color logic based only on membership mode
   const isDarkMode = siteInfo.membership?.active_school_room?.mode === 1;
   const textColor = isDarkMode ? '#ffffff' : '#000000';
   const backgroundColor = isDarkMode ? '#404040' : '#fafafa';
   const linkColor = isDarkMode ? '#ffffff' : '#24554e';

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

   const handleClick = async () => {
      const errMessages = await onSubmit(inputs, inputs.remember);

      const { name, is_agree: isAgree, ...errorMessages } = errMessages;

      addErrorMessages({ ...errorMessages, fullname: name, remember: isAgree });
   };

   const handleTogglePrivacy = () => {
      setIsPrivacyOpen(prevState => !prevState);
   };
   
   const handleToggleOpenTerms = () => {
      setIsTermsOpen(prevState => !prevState);
   };

   return (
      <div className='sign__template__top' style={{ 
         background: previewMode && generalProps.other_page_section.props.cardBackground 
            ? generalProps.other_page_section.props.cardBackground 
            : cardBackground || backgroundColor
      }}>
         {isTermsOpen && (
            <ModalNew onCloseModal={handleToggleOpenTerms}>
               <div dangerouslySetInnerHTML={{ __html: siteInfo.terms }} />
            </ModalNew>
         )}
         {isPrivacyOpen && (
            <ModalNew onCloseModal={handleTogglePrivacy}>
               <div dangerouslySetInnerHTML={{ __html: siteInfo.privacy }} />
            </ModalNew>
         )}
         {(generalProps.logo || siteInfo.school_logo) ? (
            <img src={generalProps.logo || siteInfo.school_logo} alt='' />
         ) : (
            <Text
               inner={siteInfo.title}
               size={sizes.size_36}
               style={{ color: textColor }}
            />
         )}
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
                  color: textColor,
               }}
            />
         )}

         <div className='sign__template__top__text' style={{ marginBottom: '24px' }}>
            <Text
               inner='Already have an account?'
               type={types.regular148}
               style={{ color: textColor }}
               size={sizes.large}
            />
            {
               editor || isPreview ? (
                  <Text
                     inner='Log In'
                     style={{ 
                        cursor: 'pointer', 
                        color: textColor
                     }}
                     type={types.regular148}
                     size={sizes.xlarge}
                  />
               ) : (
                  <Link to={Router.route('LOGIN').getMask()} style={{ textDecoration: 'none' }}>
                     <Text
                        inner='Log In'
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
               errorMessages={errorMessages.fullname}
               value={inputs.fullname}
               name='fullname'
               placeholder='Enter your full name'
               label='Full Name'
               onKeyPress={(e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleClick();
                  }
               }}
               onChange={handleChangeInput}
               textColor={textColor}
            />
            <Input
               errorMessages={errorMessages.email}
               value={inputs.email}
               name='email'
               placeholder='Enter your email'
               onKeyPress={(e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleClick();
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
               onKeyPress={(e) => {
                  if (e.keyCode === 13 || e.which === 13) {
                     handleClick();
                  }
               }}
               type='password'
               placeholder='Enter your password'
               onChange={handleChangeInput}
               textColor={textColor}
               isPassword={true}
            />
            <div className='checkbox__wrapper'>
               <CheckBox
                  labelPosition='right'
                  checked={inputs.remember}
                  onChange={() => handleChangeInput('remember', !inputs.remember)}
                  labelStyle={{ color: textColor }}
                  checkBoxColor={buttonBackground || siteInfo.membership?.active_school_room?.school_color}
                  generalProps={generalProps}
                  isError={errorMessages.remember?.length}
               />
               <div className='texts__wrapper'>
                  <Text 
                     inner='I agree to the'
                     size={sizes.size_14}
                     style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: textColor,
                     }}
                  />
                  <Text 
                     inner='Terms of Service'
                     size={sizes.size_14}
                     style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: linkColor,
                        cursor: 'pointer',
                     }}
                     onClick={handleToggleOpenTerms}
                  />
                  <Text 
                     inner='and'
                     size={sizes.size_16}
                     style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: textColor,
                     }}
                  />
                  <Text 
                     inner='Privacy Policy'
                     size={sizes.size_14}
                     style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: linkColor,
                        cursor: 'pointer',
                     }}
                     onClick={handleTogglePrivacy}
                  />
               </div>
            </div>
            <div className='button_wrapper'>
               <OtherPageButton
                  color={
                     previewMode && generalProps.other_page_section.props.buttonColor
                        ? generalProps.other_page_section.props.buttonColor
                        : buttonColor || '#ffffff'
                  }
                  isEditor={editor}
                  inner={previewMode ? generalProps.other_page_section.props.buttonText : generalProps.buttonText}
                  onChange={changeProp}
                  className='SignUp__button'
                  background={
                     previewMode && generalProps.other_page_section.props.buttonBackground
                        ? generalProps.other_page_section.props.buttonBackground
                        : buttonBackground || siteInfo.membership?.active_school_room?.school_color
                  }
                  onClick={handleClick}
               />
            </div>
         </div>
      </div>
   );
};

SignUpTemplateOneTop.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   previewMode: PropTypes.bool,
};

export default SignUpTemplateOneTop;