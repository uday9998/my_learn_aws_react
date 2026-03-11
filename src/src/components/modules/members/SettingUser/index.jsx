import React from 'react';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import MultiSelect from 'components/elements/form/MultiSelect';

const SettingUser = ({
   isOpen, currentMember, handleInputChange,
   chooseCourses, onAddValue, onRemoveValue, selectedFilters, handleSave,
}) => {
   const chooseCoursesOptions = chooseCourses.map(option => (option.name));
   return (
      <DynamicWrapper
         isOpen={ isOpen }
         title='Member'
         borderColor='#cddaf1'
      >
         <div className='settingUser'>
            <TextInput
               label='Full Name'
               placeholder='Enter your name here'
               name='name'
               value={ currentMember.name }
               onChange={ handleInputChange }
            />
            <div className='m-t-exl'>
               <TextInput
                  label='Email Address'
                  placeholder='Enter your email here'
                  name='email'
                  value={ currentMember.email }
                  onChange={ handleInputChange }

               />
            </div>
            {currentMember && !!Object.keys(currentMember).length
            && !!currentMember.field_values
             && !!currentMember.field_values.length
             && currentMember.field_values.map((field, index) => {
                return (
                   <div className='m-t-exl' key={ field.id }>
                      <TextInput
                         name={ index }
                         value={ field.value }
                         label={ field.custom_field_name || '' }
                         placeholder=''
                         onChange={ (name, value) => handleInputChange(name, value, true) }
                      />
                   </div>
                );
             })}
            <div className='m-t-exl'>
               <TextInput
                  name='password'
                  value={ currentMember.password }
                  label='Change Password'
                  placeholder='Enter your password here'
                  onChange={ handleInputChange }
               />
            </div>
            <div className='m-t-exl'>
               <TextInput
                  name='password_confirmation'
                  // eslint-disable-next-line camelcase
                  value={ currentMember.password_confirmation }
                  label='Retype Password'
                  placeholder='Re enter the password here'
                  onChange={ handleInputChange }
               />
            </div>
            <div className='m-t-exl'>
               <MultiSelect
                  placeholder='Current Class'
                  iconColor='rgb(63, 79, 101)'
                  label='Add Member To Current Classes'
                  onAddValue={ onAddValue }
                  onRemoveValue={ onRemoveValue }
                  selectedValues={ selectedFilters }
                  options={ chooseCoursesOptions }
               />
            </div>
            <div className='w-full m-t-exl m-b-l flex justify-end'>
               <div className='selectedMember__button'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSizes.large }
                     text='Save'
                     className='user-save'
                     onClick={ () => handleSave(currentMember.id) }
                  />
               </div>
            </div>
         </div>
      </DynamicWrapper>
   );
};

SettingUser.propTypes = {
   isOpen: PropTypes.bool,
   currentMember: PropTypes.object,
   password: PropTypes.string,
   password_confirmation: PropTypes.string,
   handleInputChange: PropTypes.func,
   chooseCourses: PropTypes.array,
   onAddValue: PropTypes.func,
   onRemoveValue: PropTypes.func,
   selectedFilters: PropTypes.array,
   handleSave: PropTypes.func,
};

SettingUser.defaultProps = {
   isOpen: false,
};

export default SettingUser;
