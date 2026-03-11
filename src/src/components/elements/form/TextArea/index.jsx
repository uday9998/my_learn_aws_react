/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import classnames from 'classnames';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const TextArea = ({
   placeholder, label, style, id, value, name, onChange, handleOnKeyDown,
   hasFocus, maxLength, subLabel, onBlur, rightLabel, disabled, hasHelpText,
}) => {
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const handleOnChange = (e) => {
      const { value: newValue, name } = e.target;

      if (Number(maxLength) !== 0 && newValue.length > Number(maxLength)) {
         setLocalErrorMessages([`There is a limit of ${ maxLength } characters for you to write.`]);
         return;
      }

      if (localErrorMessages.length) setLocalErrorMessages([]);

      onChange(name, newValue);
   };

   return (
      <div className='textArea'>
         <div className='textArea__labels'>
            <label htmlFor={ id }>
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.normal }
                  inner={ label }
               />
            </label>
            {rightLabel && (
               <label htmlFor={ id }>
                  <Text
                     size={ txtSizes.extraSmall }
                     type={ txtType.normal }
                     inner={ rightLabel }
                  />
               </label>
            )
            }
            {hasHelpText && <span className='textArea__helper'>{`${ value?.length ?? 0 }/${ maxLength }`}</span>}
         </div>

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
        
        <ErrorMessageWrapper errorMessages={localErrorMessages}>
            <textarea
               type='text'
               style={ style }
               placeholder={ placeholder }
               id={ id }
               name={ name }
               // maxLength={ maxLength }
               disabled={ disabled }
               value={ value || '' }
               onChange={ handleOnChange }
               className={ classnames('textArea__input', { 'textArea__input-focus': hasFocus && !localErrorMessages.length }) }
               onKeyDown={ handleOnKeyDown }
               onBlur={ (e) => {
                  if (onBlur) {
                     onBlur(e.target.name, e.target.value);
                  }
               } }
            />
        </ErrorMessageWrapper>
      </div>

   );
};

TextArea.propTypes = {
   placeholder: PropTypes.string,
   label: PropTypes.string,
   maxLength: PropTypes.any,
   style: PropTypes.object,
   id: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func,
   name: PropTypes.string,
   handleOnKeyDown: PropTypes.func,
   hasFocus: PropTypes.bool,
   subLabel: PropTypes.string,
   onBlur: PropTypes.func,
   rightLabel: PropTypes.any,
   disabled: PropTypes.bool,
   hasHelpText: PropTypes.bool,
};

TextArea.defaultProps = {
   placeholder: 'Type Something',
   label: 'label:',
   hasFocus: true,
   value: '',
   maxLength: '',
   subLabel: '',
   onBlur: () => {},
   rightLabel: false,
};

export default TextArea;
