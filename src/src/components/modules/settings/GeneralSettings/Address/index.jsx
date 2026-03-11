import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateSettingsByGroup } from 'api';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import './style.scss';
import Select from 'components/elements/form/Select';
import countries from 'utils/countries';

const Address = ({
   form, onChange, onCancel, onSaveSuccess,
}) => {
   const [subimt] = useSubmitForm(updateSettingsByGroup('address'), {
      successMessage: 'Address Updated Successfully',
   }, '.address-save');
   if (form.loading) {
      return 'Loading...';
   }
   const handlePhoneChange = (_, value) => {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(Number(value)) && !!value === true) return;
      onChange(_, value);
   };
   return (

      <div className='addressForm'>
         <div className='address__desc'>
            <Text
               type={ TextType.medium }
               size={ TextSize.small }
               inner={ (
                  <span>
                     Add a mailing address for tax reporting purposes.
                  </span>
               ) }
               className='text-center'
               color='#8a94a2'
            />
         </div>
         <div>
            <TextInput
               label='Street Address asdfsaf'
               placeholder=''
               type='text'
               name='street'
               value={ form.data.street }
               onChange={ onChange }
            />
         </div>
         <div className='m-t-m'>
            <TextInput
               label='Apt, Suite, Etc (Optional)'
               placeholder=''
               type='text'
               name='apt_suite'
               value={ form.data.apt_suite }
               onChange={ onChange }
            />
         </div>
         <div className='m-t-m'>
            <TextInput
               label='Phone'
               placeholder=''
               type='text'
               name='phone'
               value={ form.data.phone }
               onChange={ handlePhoneChange }
            />
         </div>
         <div className='flex m-t-m'>
            <div className='flex-1 m-r-m'>
               <TextInput
                  label='Postal Code'
                  placeholder=''
                  type='text'
                  name='postal_code'
                  value={ form.data.postal_code }
                  onChange={ onChange }
               />
            </div>
            <div className='flex-1'>
               <TextInput
                  label='City'
                  placeholder=''
                  type='text'
                  name='city'
                  value={ form.data.city }
                  onChange={ onChange }
               />
            </div>
         </div>
         <div className='flex m-t-m'>
            <div className='flex-1 m-r-m'>
               <div style={ { marginTop: '-4px' } }>
                  <Select
                     style={ { height: '48px' } }
                     id='countries'
                     options={ countries }
                     name='country'
                     label='Country'
                     value={ form.data.country }
                     onChange={ onChange }
                     direction='top'
                     icon='SelectNew'
                  />
               </div>
            </div>
            <div className='flex-1'>
               <TextInput
                  label='State'
                  placeholder=''
                  type='text'
                  name='state'
                  value={ form.data.state }
                  onChange={ onChange }
               />
            </div>
         </div>
         <div className='emailsSetting__btns m-t-m flex justify-end'>
            <div>
               <BaseButton
                  theme={ btnTheme.grey }
                  size={ btnSize.large }
                  text='Cancel'
                  onClick={ () => onCancel('settings') }
               />
            </div>
            <div className='m-l-m'>
               <BaseButton
                  size={ btnSize.large }
                  text='Save'
                  className='address-save'
                  onClick={ () => {
                     subimt(form.data, onSaveSuccess);
                  } }
               />
            </div>
         </div>
      </div>
   );
};

Address.propTypes = {
   onCancel: PropTypes.func,
   onSaveSuccess: PropTypes.func,
   form: PropTypes.object,
   onChange: PropTypes.func,
};

export default Address;
