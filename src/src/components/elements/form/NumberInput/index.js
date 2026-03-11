/* eslint-disable no-undef */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import userImg from 'assets/images/regular.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import Tooltip from 'components/elements/Tooltip';
// import { text } from '@fortawesome/fontawesome-svg-core';

const NumberInput = ({
   placeholder, label, style, id, name, value, user, icon, iconColor, onChange, withHint,
   leftText, disabled, autocomplate, userAvatar, min, onFocus, onBlur, readOnlyInput, subLabel,
   maxlength, onKeyPress, hintText,
}) => {
   const [readOnly, setReadOnly] = useState(true);
   let formatedValue;
   if (value !== undefined) {
      if (+value >= +min) {
         formatedValue = value;
      } else {
         formatedValue = min;
      }
   }

   return (
      <div className='textInput'>
         <label htmlFor={ id }>
            {user ? (
               <div className='userLabel'>
                  <div className='userLabel_avatar'>
                     <img src={ userAvatar } alt='user' />
                  </div>
                  <Text
                     size={ txtSizes.extraSmall }
                     type={ txtType.normal }
                     inner={ label }
                     style={ { margin: '0 8px' } }
                  />
                  <FontAwesomeIcon
                     icon={ faAngleDown }
                     style={ { color: '#3f4f65' } }
                  />
               </div>
            ) : (
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.normal }
                  inner={ label || '' }
               />
            ) }
         </label>
         {
            subLabel && (
               <div className='input__subLabel'>
                  <Text
                     size={ txtSizes.extraSmall }
                     type={ txtType.regular }
                     inner={ subLabel }
                     color='#8a94a2'
                  />
               </div>
            )
         }
         <div className='textInput__wrapper'>
            <div className={ `textInput__InputWrapper ${ leftText ? 'leftText' : '' }` }>
               {leftText && <span>{leftText}</span>}
               <input
                  type='number'
                  style={ style }
                  placeholder={ placeholder }
                  id={ id }
                  name={ name }
                  value={ formatedValue }
                  onChange={ (e) => onChange(e.target.name, e.target.value) }
                  className='textInput__input'
                  disabled={ disabled }
                  autocomplate={ !autocomplate ? 'off' : 'on' }
                  readOnly={ !autocomplate && readOnly }

                  onFocus={ (e) => {
                     setReadOnly(readOnlyInput);
                     if (onFocus) {
                        onFocus(e);
                     }
                  } }
                  onBlur={ (e) => {
                     if (onBlur) {
                        onBlur(e);
                     }
                  } }
                  min={ min }
                  maxLength={ maxlength }
                  onKeyPress={ onKeyPress }
               />
               {
                  icon && (
                     <div className='inputIcon'>
                        <Icon name={ icon } color={ iconColor } />
                     </div>
                  )
               }
            </div>
            {
               withHint && (
                  <div className='hintIcon'>
                     <Tooltip hintText={ hintText } />
                  </div>

               )
            }
         </div>
      </div>
   );
};

NumberInput.propTypes = {
   placeholder: PropTypes.string,
   label: PropTypes.string,
   style: PropTypes.object,
   id: PropTypes.string,
   value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
   ]),
   disabled: PropTypes.bool,
   user: PropTypes.bool,
   icon: PropTypes.string,
   iconColor: PropTypes.string,
   onChange: PropTypes.func,
   name: PropTypes.string,
   withHint: PropTypes.bool,
   readOnlyInput: PropTypes.bool,
   leftText: PropTypes.string,
   autocomplate: PropTypes.bool,
   userAvatar: PropTypes.string,
   min: PropTypes.number,
   onFocus: PropTypes.func,
   onBlur: PropTypes.func,
   subLabel: PropTypes.string,
   maxlength: PropTypes.string,
   onKeyPress: PropTypes.func,
   hintText: PropTypes.string,
};

NumberInput.defaultProps = {
   placeholder: 'Type Sumething',
   autocomplate: true,
   value: '',
   user: false,
   withHint: false,
   readOnlyInput: false,
   userAvatar: userImg,
   subLabel: '',
   maxlength: '',
   onKeyPress: () => {},
   hintText: '',
};

export default NumberInput;
