/* eslint-disable no-prototype-builtins */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import TextInput from 'components/elements/inputNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateSettings } from 'api';
import { toast } from 'react-toastify';

const Password = ({
   form, 
   onChange,
}) => {
   const { data: accountSettings } = form;
   
   const [submit, { loading: passwordLoading }] = useSubmitForm(updateSettings('account'), {
      successMessage: 'Password Updated Successfully',
      onError: (error) => {
         // Handle API error responses
         const errorMessage = error?.response?.data?.message || 
                             error?.message || 
                             'Failed to update password. Please try again.';
         toast.warn(errorMessage);
      }
   });

   const validatePasswordFields = () => {
      const { current_password, password, password_confirmation } = accountSettings;
      
      if (!current_password) {
         toast.warn('Please enter your current password');
         return false;
      }
      
      if (!password) {
         toast.warn('Please enter a new password');
         return false;
      }
      
      if (!password_confirmation) {
         toast.warn('Please confirm your new password');
         return false;
      }
      
      if (password !== password_confirmation) {
         toast.warn('New password and confirmation do not match');
         return false;
      }
      
      if (password.length < 8) {
         toast.warn('New password must be at least 8 characters long');
         return false;
      }
      
      return true;
   };

   const handleSavePassword = async () => {
      if (!validatePasswordFields()) {
         return;
      }

      try {
         await submit({
            password: accountSettings.password,
            password_confirmation: accountSettings.password_confirmation,
            current_password: accountSettings.current_password
         });
         
         // Clear password fields after successful update
         onChange({ target: { name: 'current_password', value: '' } });
         onChange({ target: { name: 'password', value: '' } });
         onChange({ target: { name: 'password_confirmation', value: '' } });
         
      } catch (error) {
         // Error is already handled by the useSubmitForm onError callback
      }
   };

   return (
      <div className='passwordInfo'>
         <div className='m-t-exl m-b-m'>
            <TextInput
               placeholder='Enter your current password'
               label='Current Password'
               type='password'
               name='current_password'
               value={accountSettings.current_password || ''}
               onChange={onChange}
               isPassword={true}
               disabled={passwordLoading}
            />
         </div>
         
         <div className='m-t-exl m-b-m'>
            <TextInput
               placeholder='Choose a new password'
               label='New Password'
               type='password'
               name='password'
               value={accountSettings.password || ''}
               onChange={onChange}
               isPassword={true}
               disabled={passwordLoading}
            />
         </div>
         
         <div className='m-b-exl'>
            <TextInput
               placeholder='Re-enter new password to confirm'
               label='Confirm Password'
               type='password'
               name='password_confirmation'
               value={accountSettings.password_confirmation || ''}
               onChange={onChange}
               isPassword={true}
               disabled={passwordLoading}
            />
         </div>

         <div className='passwordInfo__btn'>
            <div>
               <BaseButton
                  size={btnSize.large}
                  theme={btnTheme.primary}
                  text={passwordLoading ? 'Saving...' : 'Save Password'}
                  className='settings-save'
                  onClick={handleSavePassword}
                  disabled={passwordLoading}
               />
            </div>
         </div>
      </div>
   );
};

Password.propTypes = {
   form: PropTypes.object.isRequired,
   onChange: PropTypes.func.isRequired,
};

export default Password;