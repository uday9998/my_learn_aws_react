import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import TextInput from 'components/elements/form/TextInput';
import CustomSwitch from 'components/elements/form/CustomSwitch';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';


const CreateAutomationName = ({ automation, handleNameInputChange, handleStatusInputChange }) => {
   return (
      <div className='CreateAutomationName'>
         <div className='CreateAutomationInput'>
            <TextInput
               label='Name'
               placeholder='Name'
               name='name'
               rightLabel={ `${ automation.name ? automation.name.length : 0 }/150` }
               value={ automation.name }
               onChange={ (name, value) => {
                  if (value.length < 151) {
                     handleNameInputChange(name, value, 'automation');
                  } else if (isPrint('You are reached the character limit')) {
                     toast.error('You are reached the character limit');
                  }
               } }
               onBlur={ () => handleNameInputChange('save') }
            />
         </div>
         <div className='CreateAutomationSwitch'>
            <CustomSwitch
               firstOption={ { value: 1, inner: 'Active' } }
               secondOption={ { value: 0, inner: 'Disable' } }
               name='status'
               checked={ automation.status }
               onClick={ (name, value) => handleStatusInputChange(name, value, 'automation') }
               checkedBackground='#7cb740'
               checkedTextColor='#ffffff'
               borderColor='#7cb740'
               style={ { border: 'none' } }
            />
         </div>

      </div>
   );
};

CreateAutomationName.propTypes = {
   handleNameInputChange: PropTypes.func,
   automation: PropTypes.object,
   handleStatusInputChange: PropTypes.func,
};

export default CreateAutomationName;
