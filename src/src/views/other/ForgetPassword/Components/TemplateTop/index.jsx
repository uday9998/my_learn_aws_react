import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ForgetPasswordTemplateTop = ({ generalProps, onSubmit }) => {
   const [inputs, setInputs] = React.useState({
      email: '',
      password: '',
      remember: false,
   });

   const history = useHistory();

   const {
      textColor, secondaryTextColor, buttonColor, buttonBackground,
   } = generalProps;

   const data = React.useContext(OtherPageContext);
   const { editor } = data || {};
   const handleChangeInput = (name, value) => {
      setInputs({
         ...inputs,
         [name]: value,
      });
   };

   const siteInfo = useSelector(siteInfoSelector);

   // Determine background and text colors based on school_bg_color
   const schoolBgColor = siteInfo.membership?.active_school_room?.school_bg_color?.toLowerCase();
   
   let containerBackground;
   let textColorOverride;
   
   if (schoolBgColor === '#fff') {
      containerBackground = '#fafafa';
      textColorOverride = 'var(--memberTextColor)';
   } else if (schoolBgColor === '#121212') {
      containerBackground = '#2a2a2a';
      textColorOverride = '#ffffff'; // Set all text to white for dark theme
   } else {
      containerBackground = generalProps.cardBackground || 'var(--mainBg005)';
      textColorOverride = 'var(--memberTextColor)';
   }

   const css = `
   .input .input__default__label, .checkBox__label span {
       color: ${textColorOverride} !important;
    }
`;

   const navigateToLoginPage = () => {
      history.goBack();
   };

   return (
      <div className='sign__template__top' style={{ background: containerBackground }}>

         <Text
            inner='Forgot password'
            type={types.mediumSmall}
            size={sizes.size_28}
            style={{ color: textColorOverride }}
         />

         <div className='sign__template__top__text'>
            <Text
               inner='Please, enter your email address so we can send you a link for password reset'
               type={types.regular148}
               style={{ 
                  color: textColorOverride,
                  textAlign: 'center',
                  opacity: 0.8 
               }}
               size={sizes.medium}
            />
         </div>
         
         <div className='sign__template__top__form' style={{ marginTop: '24px' }}>
            <style>
               {css}
            </style>
            <Input
               value={inputs.email}
               name='email'
               placeholder='Enter your email'
               label='Email'
               onChange={handleChangeInput}
               textColor={textColorOverride}
            />
            <Button
               text='Confirm'
               className='forget__password__link'
               onClick={!editor ? () => onSubmit(inputs, inputs.remember) : () => {}}
               theme='explore'
               style={{ backgroundColor: siteInfo.membership?.active_school_room?.school_color }}
            />
            <Button
               text='Cancel'
               className='forget__password__link'
               theme='white'
               style={{ 
                  marginTop: '0',
                  backgroundColor: schoolBgColor === '#121212' ? '#404040' : undefined,
                  color: schoolBgColor === '#121212' ? '#ffffff' : textColorOverride
               }}
               onClick={navigateToLoginPage}
            />
         </div>
      </div>
   );
};

ForgetPasswordTemplateTop.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
};

export default ForgetPasswordTemplateTop;