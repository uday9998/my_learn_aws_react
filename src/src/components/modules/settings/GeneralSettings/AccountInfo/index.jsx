/* eslint-disable no-prototype-builtins */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/inputNew';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import timezonsData from 'utils/timezons.json';
import Select from 'components/elements/form/Select';
import useS3Upload from 'components/modules/S3Upload';
import { priceOption } from 'utils/getCurrencySymbol';
import { fileToDataUrl } from 'utils/mediaLibrary';
import { isOneTimeUser as checkIsOneTimeUser } from 'utils/storage';
import { mainAppSelector, appSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateSettings } from 'api';


const AccountInfo = ({
   form, onChange, onCancel, isInfoSaveButtonDisabled, onSave,
}) => {
   const localeTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const [imageDataUrl, setImageDataUrl] = useState('');
   const mainApp = useSelector(mainAppSelector);
   const isOneTimeUser = checkIsOneTimeUser(mainApp.plan_name);
   const { data: accountSettings } = form;
   const [submit] = useSubmitForm(updateSettings('account'), {
      successMessage: 'Account Settings Updated Successfully',
   });

   const { progressEL, uploadButton } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Upload',
         theme: btnTheme.lightBlue,
         size: btnSize.medium,

      },
      onChange: async (src, _, file) => {
         const dataUrl = await fileToDataUrl(file);
         setImageDataUrl(dataUrl);
         onChange('picture_src', src);
      },
      fileLessonFormat: 'image',
      cropRatio: true,
   });
   const imageSrc = accountSettings.picture_src ? accountSettings.picture_src : accountSettings.picture_full_src;
   const app = useSelector(appSelector);


   return (
      <div className='accountInfo'>
         {isOneTimeUser && (
            <div className='oneTimeUser m-t-m'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.extraSmall }
                  inner={ `Your current plan is: ${ accountSettings.plan_name }` }
               />
            </div>
         )}
         <div className='accountInfo__avatar'>
            <div className='m-b-m'>
               <TextInput
                  placeholder='Enter title of site here'
                  label='Title of Site'
                  name='title'
                  maxlength='40'
                  value={ accountSettings.title }
                  onChange={ onChange }
               />
            </div>
            <div>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.extraSmall }
                  inner='Profile Picture'
               />
            </div>
            <div className='accountInfo__image'>
               <img src={ imageDataUrl || imageSrc } alt='upload-img' />
            </div>
            <div className='accountInfo__upload accountInfo__upload_loader m-t-m'>
               {progressEL}
               {uploadButton}
            </div>
         </div>
         <div className='m-b-exl'>
            <TextInput
               placeholder='Enter your name here'
               label='Full Name'
               type='text'
               name='name'
               value={ accountSettings.name }
               onChange={ onChange }
            />
         </div>
         <div className='m-b-exl'>
            <TextInput
               placeholder='Enter your email here'
               label='Email Address'
               name='email'
               value={ accountSettings.email }
               onChange={ onChange }
               disabled={ app && !app.is_main }
            />
         </div>
         <div className='m-b-exl'>
            <TextInput
               placeholder='Enter your password here'
               label='Change Password'
               type='password'
               name='password'
               value={ accountSettings.password }
               onChange={ onChange }
            />
         </div>
         <div className='m-b-exl'>
            <TextInput
               placeholder='Re enter the password here'
               label='Retype Password'
               type='password'
               name='password_confirmation'
               value={ accountSettings.password_confirmation }
               onChange={ onChange }
            />
         </div>
         <div className='m-b-exl'>
            <TextInput
               placeholder='Enter support email here'
               label='Support Email'
               name='support_email'
               value={ accountSettings.support_email }
               onChange={ onChange }
            />
         </div>
         <div className='m-b-exl'>
            <Select
               label='Default Currency'
               placeholder='Enter default currency here'
               id='default_currency'
               options={ priceOption }
               name='default_currency'
               value={ accountSettings.default_currency }
               onChange={ onChange }
               iconColor='#3f4f65'
            />
         </div>
         <div className='m-b-exl'>
            <Select
               label='Time Zone'
               placeholder='UTC/GMT + 00:00 Africa/Dakar'
               iconColor='#3f4f65'
               name='timezone'
               value={ accountSettings.timezone !== null ? accountSettings.timezone : localeTimezone }
               options={ timezonsData }
               onChange={ onChange }
            />
         </div>

         <div className='accountInfo__btns'>
            <div>
               <BaseButton
                  theme={ btnTheme.grey }
                  size={ btnSize.large }
                  text='Cancel'
                  onClick={ () => {
                     onCancel();
                     setImageDataUrl('');
                  } }
               />
            </div>
            <div>
               <BaseButton
                  size={ btnSize.large }
                  text='Save'
                  className='settings-save'
                  onClick={ () => onSave(accountSettings, submit, (inputsDiff) => {
                     const copy = { ...inputsDiff };
                     if (copy.hasOwnProperty('password_confirmation') && !copy.password_confirmation) {
                        delete copy.password_confirmation;
                     }
                     if (copy.hasOwnProperty('password') && !copy.password) {
                        delete copy.password;
                     }
                     return copy;
                  }) }
                  disabled={ isInfoSaveButtonDisabled }
               />
            </div>
         </div>
      </div>
   );
};

AccountInfo.propTypes = {
   form: PropTypes.object,
   onChange: PropTypes.func,
   onCancel: PropTypes.func,
   onSave: PropTypes.func,
   isInfoSaveButtonDisabled: PropTypes.bool,
};

export default AccountInfo;
