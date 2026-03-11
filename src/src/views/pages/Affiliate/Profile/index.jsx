import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Select from 'components/elements/SelectNew';
import Input from 'components/elements/inputNew';
import timezones from 'utils/timezons.json';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import UploadModal from 'components/modules/UploadModal';
import IconButton from 'components/elements/buttons/IconButton';
import { localeTimezone, TimezoneSelector } from 'utils/timeZone.js';

const ProfilePage = ({ account, onSaveAccountInformation }) => {
   const [inputs, setInputs] = useState({
      ...account,
   });
   // const [isClosedSupportInput, setIsClosedSupportInput] = useState(true);
   const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

   const handleInputChange = (name, value) => {
      if (name === 'picture_full_src') {
         setInputs({
            ...inputs,
            picture_src: value,
            [name]: value,
         });
         setIsOpenUploadModal(false);
      } else {
         setInputs({
            ...inputs,
            [name]: value,
         });
      }
   };
   return (
      <div className='account__personal__container'>
         <div className='personal'>
            <div className='personal__background' />
            <div className='personal__content'>
               <div className='personal__content__top'>
                  <div className='image'>
                     <img src={ inputs.picture_full_src } alt='' />
                     <div className='image__edit' role='presentation' onClick={ () => setIsOpenUploadModal(true) }>
                        <IconNew name='AccountImageEditX' />
                     </div>
                     {(inputs.picture_full_src && inputs.picture_full_src !== 'http://miestro.loc/images/account/user.png') && (
                        <div className='image__edit__cancel'>
                           <IconButton
                              text=''
                              name='AccountRemoveImageM'
                              className='image__view__clear'
                              onClick={ () => handleInputChange('picture_full_src', 'http://miestro.loc/images/account/user.png') }
                           />
                        </div>
                     )}
                  </div>
                  <Input
                     value={ inputs.name }
                     onChange={ handleInputChange }
                     name='name'
                  />

               </div>
               <Input
                  type='textarea'
                  value={ inputs.about_me }
                  onChange={ handleInputChange }
                  label='About Me'
                  name='about_me'
                  placeholder='Tell us about yourself'
               />
               <Input
                  value={ inputs.email }
                  onChange={ handleInputChange }
                  name='email'
                  label='Email'
                  disabled={ true }
               />
               <Input
                  value={ inputs.paypal_email }
                  onChange={ handleInputChange }
                  name='paypal_email'
                  label='Paypal Email'
               />
               <Select
                  type='select-medium'
                  value={ inputs.time_zone || localeTimezone }
                  label='Time Zone'
                  options={ TimezoneSelector() }
                  onChange={ handleInputChange }
                  name='time_zone'
               />
               <div style={ { marginTop: '8px' } }>
                  <BaseButton
                     text='Save Changes'
                     onClick={ () => onSaveAccountInformation(inputs) }
                  />
               </div>
            </div>
            {isOpenUploadModal && (
               <UploadModal
                  cropRatio={ true }
                  onChange={ (value) => handleInputChange('picture_full_src', value) }
                  fileLessonFormat='image'
                  isAmazonFile={ true }
                  onCloseModal={ () => setIsOpenUploadModal(false) }
               />
            )}
         </div>
      </div>
   );
};

ProfilePage.propTypes = {
   account: PropTypes.object,
   onSaveAccountInformation: PropTypes.func,
};

export default ProfilePage;
