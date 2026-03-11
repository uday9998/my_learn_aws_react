import React, { useState } from 'react';
import TextInput from 'components/elements/form/TextInput';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import './index.scss';

const NewCustomField = ({
   handleCustomFieldFunc, setIsCustomField, currentCustomField, setCurrentCustomField,
}) => {
   const [customFieldName, setCustomFieldName] = useState(currentCustomField.name || '');
   const [charectersLimit, setCharectersLimit] = useState((customFieldName && customFieldName.length) || 0);
   const [disableChanges, setDisableChanges] = useState(false);
   return (
      <div className='newCustomField'>
         <div className='newCustomFieldCloseButtonRectangle'>
            <div className='newCustomField-desc'>
               <Text
                  size={ TextSize.medium }
                  type={ TextType.normal }
                  inner={ currentCustomField.name ? 'Update Custom Field' : 'New Custom Field' }
               />
            </div>
            <div
               role='presentation'
               onClick={ () => setIsCustomField(false) }
            >
               <Icon name='CloseXNew' />
            </div>
         </div>
         <div>
            <div className='newCustomFieldInputs'>
               <TextInput
                  label='Name'
                  type='text'
                  placeholder='Type Custom Field Name'
                  id='customField'
                  name='customField'
                  value={ customFieldName }
                  onChange={ !disableChanges ? (name, value) => {
                     setCustomFieldName(value); setCharectersLimit(value.length);
                  } : () => {} }
                  maxlength='190'
                  rightLabel={ `${ charectersLimit }/190` }
                  onKeyDown={ (e) => {
                     if ((!e.shiftKey && e.which >= 48 && e.which <= 57)
                      || (e.which > 57 && e.which <= 90) || e.which === 46 || e.which === 32
                      || e.which === 8 || (e.which >= 96 && e.which <= 105)) {
                        setDisableChanges(false);
                     } else {
                        setDisableChanges(true);
                     }
                  } }
               />
            </div>
            <div className='newCustomFieldButtonsRectangle'>
               <BaseButton
                  theme={ btnTheme.grey }
                  size={ btnSizes.medium }
                  text='Cancel'
                  onClick={ () => { setIsCustomField(false); setCustomFieldName(''); setCurrentCustomField({}); } }
               />
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.medium }
                  text='Save'
                  onClick={ () => handleCustomFieldFunc(customFieldName) }
               />
            </div>
         </div>
      </div>
   );
};

NewCustomField.propTypes = {
   handleCustomFieldFunc: PropTypes.func,
   setIsCustomField: PropTypes.func,
   currentCustomField: PropTypes.object,
   setCurrentCustomField: PropTypes.func,
};

export default NewCustomField;
