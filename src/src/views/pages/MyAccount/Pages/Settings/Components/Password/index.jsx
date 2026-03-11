import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import './index.scss';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { updateAccount } from 'api';

const MyAccountSettingsPassword = ({ data, handleInputChange, t }) => {
   const [updateAccountQuery] = useSubmitForm(updateAccount);
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const changeInput = (name, value, isBilling) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      handleInputChange(name, value, isBilling);
   };

   const handleUpdatePassword = () => {
      updateAccountQuery([data.id, {
         current_password: data.current_password,
         email: data.email,
         id: data.id,
         name: data.name,
         password: data.password,
         password_confirmation: data.confirmPassword,
         picture_src: data.picture_src,
      }], () => {
         const successMessage = 'Changes updated successfully.';
         if (isPrint(successMessage)) {
            toast.success(successMessage);
         }
      }, (errors) => {
         const errorMessages = errors.data?.errors;
         if (errorMessages) {
            addErrorMessages(errorMessages);
         }

         return true;
      });
   };

   return (
      <div className='my__account__password'>
         <Input
            errorMessages={ errorMessages.current_password }
            value={ data.current_password }
            label='Current Password'
            name='current_password'
            type='password'
            onChange={ changeInput }
            placeholder='●●●●●●●●'
         />
         <Input
            errorMessages={ errorMessages.password }
            value={ data.password }
            label='New Password'
            name='password'
            type='password'
            onChange={ changeInput }
            placeholder='●●●●●●●●'
         />
         <Input
            errorMessages={ errorMessages.confirmPassword }
            value={ data.confirmPassword }
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            onChange={ changeInput }
            placeholder='●●●●●●●●'
         />
         <div style={ { marginTop: '8px' } }>
            <BaseButton
               text='Save Changes'
               disabled={ !data.confirmPassword || !data.password || !data.current_password }
               onClick={ () => handleUpdatePassword() }
            />
         </div>
      </div>
   );
};
MyAccountSettingsPassword.propTypes = {
   data: PropTypes.object,
   handleInputChange: PropTypes.func,
};

export default MyAccountSettingsPassword;
