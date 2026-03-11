import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import IconButton from 'components/elements/buttons/IconButton';
import UploadModal from 'components/modules/UploadModal';
import Input from 'components/elements/inputNew';
// import timezones from 'utils/timezons.json';
import Select from 'components/elements/SelectNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import { localeTimezone, TimezoneSelector } from 'utils/timeZone.js';

const MyAccountSettingsPersonal = ({ data, handleInputChange, handleSaveSettings, t }) => {
   const [isOpenUploadModal, setIsOpenUploadModal] = React.useState(false);


   return (
      <div className='personal'>
         <div className='personal__background' />
         <div className='personal__content'>
            <div className='personal__content__top'>
               <div className='image'>
                  <img src={ data.picture_full_src } alt='' />
                  <div className='image__edit' role='presentation' onClick={ () => setIsOpenUploadModal(true) }>
                     <IconNew name='AccountImageEditX' />
                  </div>
                  {(data.picture_full_src && data.picture_full_src !== 'http://miestro.loc/images/account/user.png') && (
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
                  value={ data.name }
                  onChange={ handleInputChange }
                  name='name'
               />

            </div>
            <Input
               type='textarea'
               value={ data.about_me }
               onChange={ handleInputChange }
               label='About Me'
               name='about_me'
               placeholder='Tell us about yourself'
            />
            <Input
               value={ data.email }
               onChange={ handleInputChange }
               name='email'
               label='Email'
               disabled={ true }
            />
            <Select
               type='select-medium'
               value={ data.time_zone !== null ? data.time_zone : localeTimezone }
               label='Time Zone'
               options={ TimezoneSelector() }
               onChange={ handleInputChange }
               name='time_zone'
            />
            <div style={ { marginTop: '8px' } }>
               <BaseButton
                  text='Save Changes'
                  onClick={ () => handleSaveSettings('personal') }
               />
            </div>
         </div>
         {isOpenUploadModal && (
            <UploadModal
               cropRatio={ true }
               onChange={ (value) => { handleInputChange('picture_full_src', value); setIsOpenUploadModal(false); } }
               fileLessonFormat='image'
               isAmazonFile={ true }
               onCloseModal={ () => setIsOpenUploadModal(false) }
            />
         )}
      </div>
   );
};

MyAccountSettingsPersonal.propTypes = {
   data: PropTypes.object,
   handleInputChange: PropTypes.func,
   handleSaveSettings: PropTypes.func,
};

export default MyAccountSettingsPersonal;
