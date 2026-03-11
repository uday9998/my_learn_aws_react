import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import Input from 'components/elements/inputNew';
// import Radio from 'components/elements/form/Radio';


const Wite = ({
   onClose, currentAction, saveAction, handleInputChange, position,
}) => {
   const [disableChanges, setDisableChanges] = useState(false);
   const timeOptions = [
      { label: 'Minutes', value: 'minute' },
      { label: 'Hours', value: 'hour' },
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
   ];

   const limitandChangeNumbar = (name, value) => {
      let newValue = value;
      if (parseInt(value, 10) > 100) {
         newValue = 100;
      } else if (parseInt(value, 10) < 1) {
         newValue = 1;
      }
      handleInputChange(name, newValue, 'currentAction');
   };

   const saveActionFunc = () => {
      let type = currentAction.payload.type;
      let value = currentAction.payload.value;
      if (!value) {
         value = 1;
      }
      if (!type) {
         type = 'minute';
      } else if (type === 'minute' && !value) {
         value = 5;
      }
      if (type && value) {
         if (position) {
            saveAction({ value, type });
         } else {
            saveAction({
               type: 'wait', id: currentAction.id, payload: { value, type },
            });
         }
      }
   };
   return (
      <div className='wait-card'>
         <div className='wait-card-title'>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='Wait'
            />
            <Text
               type={ TextType.regularDefault }
               size={ TextSize.small }
               style={ { color: '#727978', textTransform: 'capitalize' } }
               inner='Choose the amount of time that should pass before the next action.'
            />
         </div>
         <div className='wait-card-content'>
            <div className='wait-card-form'>
               <Input
                  value={ currentAction.payload.value }
                  type='number'
                  min='1'
                  max='100'
                  name='value'
                  placeholder='1'
                  onKeyDown={ (e) => {
                     if ((e.which >= 48 && e.which <= 57) || e.which === 46
                        || e.which === 8 || (e.which >= 96 && e.which <= 105)) {
                        setDisableChanges(false);
                     } else {
                        setDisableChanges(true);
                     }
                  } }
                  onChange={ !disableChanges ? (name, value) => limitandChangeNumbar(name, value) : () => {} }
               />
               <Select
                  style={ { height: '48px' } }
                  id='emailto'
                  placeholder='time'
                  type='select-medium'
                  options={ timeOptions }
                  name='type'
                  value={ currentAction.payload.type ? currentAction.payload.type : 'minute' }
                  onChange={ (name, value) => handleInputChange(name, value, 'currentAction') }
                  icon='TriangleDownBlack'
               />
            </div>
            {/* <div className='wait-card-radio'>
               <Radio
                  name='time of day'
                  checked={ true }
                  // onChange={ () => {} }
                  label='Wait Until a Specific Time of Day'
                  className=''
                  color={ true ? '#7cb740' : '#c2cedb' }
               />
               <Radio
                  name='time of week'
                  checked={ false }
                  // onChange={ () => {} }
                  label='Wait Until a Specific Day(s) of the week'
                  className='m-t-m'
                  color={ true ? '#7cb740' : '#c2cedb' }
               />
            </div> */}
         </div>
         <div className='wait-card-btns'>
            <div className='wait-card-btn'>
               <BaseButton
                  theme={ btnThemes.secondary }
                  text='Cancel'
                  onClick={ onClose }
               />
            </div>
            <div className='wait-card-btn'>
               <BaseButton
                  text='Save'
                  onClick={ () => saveActionFunc() }
               />
            </div>
         </div>
      </div>
   );
};

Wite.propTypes = {
   onClose: PropTypes.func,
   saveAction: PropTypes.func,
   currentAction: PropTypes.object,
   handleInputChange: PropTypes.func,
   position: PropTypes.string,
};

export default Wite;
