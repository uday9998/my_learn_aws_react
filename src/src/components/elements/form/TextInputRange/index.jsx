/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import userImg from 'assets/images/regular.jpg';
import Text, { SIZES as txtSizes, TYPES as txtType } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import Tooltip from 'components/elements/Tooltip';
import TooltipwithIcon from 'components/elements/members/Tooltip';
// import { text } from '@fortawesome/fontawesome-svg-core';

const TextInputRange = ({
   placeholder, label, style, id, name, value, type, user, icon, iconColor, onChange, withHint,
   leftText, disabled, autocomplate, userAvatar, min, onFocus, onBlur, readOnlyInput, subLabel,
   maxlength, onKeyPress, hintText, rightLabel, labelBottom, labelBottomText, max, onKeyDown,
   hasTooltip, step, showResetButton, size,
}) => {
   const [readOnly, setReadOnly] = useState(true);
   const initialValueRef = useRef(null);
   useEffect(() => {
      initialValueRef.current = value || 0;
   }, []);

   return (
      <div className='textInputRange'>
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
               </div>
            ) : (
               <div className='labelsRectangle'>
                  <Text
                     size={ size ? txtSizes[`${ size }`] : txtSizes.small }
                     type={ txtType.regularDefault }
                     inner={ label || '' }
                  />
                  <span className='leftText__input'>{leftText}</span>
                  { hasTooltip && <TooltipwithIcon hintText='This is the name that will show up on the customers CC statement.' style={ { top: '-3px' } } />}
                  { rightLabel && (
                     <Text
                        size={ txtSizes.small }
                        type={ txtType.regularDefault }
                        inner={ rightLabel }
                     />
                  )}

               </div>

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
         <div className={ labelBottom ? 'form-label-group textInput__wrapper' : 'textInput__wrapper' }>
            <div className={ `textInput__InputWrapper ${ leftText ? 'leftText' : '' }` }>
               <input
                  type={ type }
                  style={ { ...style, backgroundSize: `${ (value - min) * 100 / (max - min) }% 100%` } }
                  step={ step }
                  placeholder={ placeholder }
                  id={ id }
                  name={ name }
                  value={ value || 0 }
                  onChange={ (e) => onChange(e.target.value, e.target.name) }
                  className='textInput__input'
                  disabled={ disabled }
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
                  max={ max }
                  maxLength={ maxlength }
                  onKeyPress={ onKeyPress }
                  onKeyDown={ onKeyDown }
               />
               {labelBottom
                  && (
                     <label className='labelBottom' htmlFor={ id }>
                        { labelBottomText }
                     </label>
                  )
               }
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
         {
            showResetButton && (
               <div
                  className='textInputRange__reset__button'
                  role='presentation'
                  onClick={ () => {
                     onChange(initialValueRef.current, name);
                  } }
               >
                  Reset
               </div>
            )
         }
      </div>
   );
};

TextInputRange.propTypes = {
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
   type: PropTypes.string,
   name: PropTypes.string,
   withHint: PropTypes.bool,
   readOnlyInput: PropTypes.bool,
   leftText: PropTypes.any,
   autocomplate: PropTypes.bool,
   userAvatar: PropTypes.string,
   min: PropTypes.any,
   onFocus: PropTypes.func,
   onBlur: PropTypes.func,
   subLabel: PropTypes.string,
   maxlength: PropTypes.string,
   onKeyPress: PropTypes.func,
   hintText: PropTypes.string,
   rightLabel: PropTypes.bool,
   max: PropTypes.any,
   labelBottom: PropTypes.bool,
   labelBottomText: PropTypes.string,
   onKeyDown: PropTypes.func,
   hasTooltip: PropTypes.bool,
   step: PropTypes.string,
   showResetButton: PropTypes.bool,
   size: PropTypes.string,
};

TextInputRange.defaultProps = {
   placeholder: 'Type Sumething',
   autocomplate: true,
   value: '',
   user: false,
   type: 'text',
   withHint: false,
   readOnlyInput: false,
   userAvatar: userImg,
   subLabel: '',
   maxlength: '',
   onKeyPress: () => {},
   onChange: () => {},
   hintText: '',
   rightLabel: false,
   step: '1',
   showResetButton: false,
};

export default TextInputRange;
