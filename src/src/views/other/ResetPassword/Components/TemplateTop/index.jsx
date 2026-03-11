
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';

const ResetPasswordTemplateTop = ({ generalProps, onSubmit }) => {
   const [inputs, setInputs] = React.useState({
      email: '',
      password: '',
      remember: false,
   });

   const {
      textColor, buttonColor, buttonBackground,
   } = generalProps;

   const data = React.useContext(OtherPageContext);
   const { editor } = data || {};
   const handleChangeInput = (name, value) => {
      setInputs({
         ...inputs,
         [name]: value,
      });
   };
   const css = `
   .input .input__default__label, .checkBox__label span {
       color: ${ textColor }
    }
`;

   const siteInfo = useSelector(siteInfoSelector);

   return (
      <div className='sign__template__top' style={ { background: generalProps.cardBackground || 'var(--mainBg005)' } }>
         {generalProps.logo ? (
            <img src={ generalProps.logo } alt='' />
         ) : (
            <Text
               inner={ siteInfo.title }
               type={ types.mediumSmall }
               size={ sizes.size_28 }
               style={ { marginTop: '32px', color: textColor } }
            />
         )}
         <Text
            inner='Reset password'
            type={ types.mediumSmall }
            size={ sizes.size_28 }
            style={ { marginTop: '32px', color: textColor || siteInfo.active_school_room.school_text_color } }
         />
         <div className='sign__template__top__form'>
            <style>
               {css}
            </style>
            <Input
               value={ inputs.email }
               name='email'
               placeholder='Enter your email'
               label='Email'
               onChange={ handleChangeInput }
               textColor={ textColor || siteInfo.active_school_room.school_text_color }
            />
            <Input
               value={ inputs.password }
               name='password'
               placeholder='Enter your password'
               label='Password'
               type='password'
               onChange={ handleChangeInput }
               textColor={ textColor || siteInfo.active_school_room.school_text_color }
            />
            <Input
               value={ inputs.confirmPassword }
               name='confirmPassword'
               placeholder='Enter your password'
               label='Confirm Password'
               type='password'
               onChange={ handleChangeInput }
               textColor={ textColor || siteInfo.active_school_room.school_text_color }
            />
            <Button
               text='Reset Password'
               className='reset__button'
               onClick={ !editor ? () => onSubmit(inputs, inputs.remember) : () => {} }
               style={ {
                  background: buttonBackground || siteInfo.active_school_room.school_color,
                  color: buttonColor || siteInfo.active_school_room.school_text_color,
               } }
               resetBorderColor={ siteInfo.active_school_room.school_color }
            />

         </div>
      </div>
   );
};

ResetPasswordTemplateTop.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
};

export default ResetPasswordTemplateTop;
