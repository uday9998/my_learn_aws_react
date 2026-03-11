import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalNew from 'components/elements/ModalNew';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';

import './style.scss';

const MemberChangePasswordModal = ({
   onCloseModal,
   handleInputChange,
   inputs,
   onConfirm,
}) => {
   const [localErrorMessages, setLocalErrorMessages] = useState({});
   
   const submitNewPassword = async () => {
      const { data: { errors = {} } = {} } = await onConfirm() || {};

      const { password: passwordErrors = [] } = errors;

      if (passwordErrors.length) {
         setLocalErrorMessages({
            password: passwordErrors,
            password_confirmation: passwordErrors,
         });
      }
   };

   const changePasswordInput = (name, value) => {
      if (localErrorMessages[name]?.length) {
         setLocalErrorMessages(prev => ({
            ...prev,
            [name]: [],
         }));
      }

      handleInputChange(name, value);
   };

   return (
      <ModalNew onCloseModal={ onCloseModal }>
         <div className='password__change__modal'>
            <Text
               inner='Change Password'
               type={ txtTypes.mediumSmall }
               size={ txtSizes.xxlarge }
            />
            <div className='password__change__modal__inputs'>
               <Input
                  errorMessages={ localErrorMessages.password }
                  type='password'
                  name='password'
                  value={ inputs.password }
                  label='Password'
                  onChange={ changePasswordInput }
                  id='password_1'
                  placeholder='Enter New Password'
               />
               <Input
                  errorMessages={ localErrorMessages.password_confirmation }
                  type='password'
                  name='password_confirmation'
                  value={ inputs.password_confirmation }
                  label='Confirm Password'
                  onChange={ changePasswordInput }
                  id='password_2'
                  placeholder='Re-enter New Password to Confirm'
               />
            </div>
            <div className='password__change__modal__buttons'>
               <BaseButton
                  text='Close'
                  theme={ btnTheme.secondary }
                  onClick={ onCloseModal }
               />
               <BaseButton
                  text='Change Password'
                  onClick={ submitNewPassword }
               />
            </div>
         </div>
      </ModalNew>
   );
};

MemberChangePasswordModal.propTypes = {
   onCloseModal: PropTypes.func,
   handleInputChange: PropTypes.func,
   inputs: PropTypes.object,
   onConfirm: PropTypes.func,
};

export default MemberChangePasswordModal;