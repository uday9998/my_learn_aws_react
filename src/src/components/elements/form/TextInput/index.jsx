/* eslint-disable no-undef */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import userImg from 'assets/images/regular.jpg';
import Text, { SIZES as txtSizes, TYPES as txtType } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import Tooltip from 'components/elements/Tooltip';
import TooltipwithIcon from 'components/elements/members/Tooltip';
// import { text } from '@fortawesome/fontawesome-svg-core';

const TextInput = ({
   placeholder, label, style, id, name, value, type, user, icon, iconColor, onChange, withHint,
   leftText, disabled, autocomplate, userAvatar, min, onFocus, onBlur, readOnlyInput, subLabel,
   maxlength, onKeyPress, hintText, rightLabel, labelBottom, labelBottomText, max, onKeyDown,
   hasTooltip, onInput, isDiv,
}) => {
   const [readOnly, setReadOnly] = useState(true);
   const change = (inputName, inputValue) => {
      if (type === 'text') {
         onChange(inputName, inputValue);
         // onChange(inputName, inputValue.trim());
      } else {
         onChange(inputName, inputValue);
      }
   };
   return (
      <div className={ labelBottom ? 'textInput__LabelBottom' : 'textInput' }>
         <label htmlFor={ id }>
            {user ? (
               <div className='userLabel'>
                  <div className='userLabel_avatar'>
                     <img src={ userAvatar } alt='user' />
                  </div>
                  <Text
                     size={ txtSizes.small }
                     type={ txtType.regularDefault }
                     inner={ label }
                     style={ { margin: '0 8px' } }
                  />

               </div>
            ) : (
               <div className='labelsRectangle'>
                  <Text
                     size={ txtSizes.small }
                     type={ txtType.regularDefault }
                     inner={ label || '' }
                     style={ { margin: '0px 0 8px 0 ' } }
                  />
                  { hasTooltip && <TooltipwithIcon hintText='This is the name that will show up on the customers CC statement.' style={ { top: '-3px' } } />}
                  { rightLabel && (
                     <Text
                        size={ txtSizes.extraSmall }
                        type={ txtType.normal }
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
            <div className={ `textInput__InputWrapper ${leftText ? 'leftText' : ''}` }>
               {leftText && <span>{leftText}</span>}
               {!isDiv
                  ? (
                     <input
                        type={ type }
                        style={ style }
                        placeholder={ placeholder }
                        id={ id }
                        name={ name }
                        value={ value !== undefined ? value : '' }
                        onChange={ (e) => change(e.target.name, e.target.value) }
                        className='textInput__input'
                        disabled={ disabled }
                        readOnly={ !autocomplate && readOnly }
                        onInput={ onInput }
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
                  )
                  : <div className='textInput__input' style={ { overflow: 'hidden' } } disabled={ disabled } dangerouslySetInnerHTML={ { __html: value } } />
               }
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
      </div>
   );
};

TextInput.propTypes = {
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
   name: PropTypes.any,
   withHint: PropTypes.bool,
   readOnlyInput: PropTypes.bool,
   leftText: PropTypes.string,
   autocomplate: PropTypes.bool,
   userAvatar: PropTypes.string,
   min: PropTypes.any,
   onFocus: PropTypes.func,
   onBlur: PropTypes.func,
   subLabel: PropTypes.string,
   maxlength: PropTypes.string,
   onKeyPress: PropTypes.func,
   hintText: PropTypes.string,
   rightLabel: PropTypes.any,
   max: PropTypes.any,
   labelBottom: PropTypes.bool,
   labelBottomText: PropTypes.string,
   onKeyDown: PropTypes.func,
   hasTooltip: PropTypes.bool,
   onInput: PropTypes.func,
   isDiv: PropTypes.bool,
};

TextInput.defaultProps = {
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
};

export default TextInput;
