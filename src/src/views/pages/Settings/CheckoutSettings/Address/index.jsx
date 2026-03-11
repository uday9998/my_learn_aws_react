import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import TextInput from 'components/elements/inputNew';
import './index.scss';
import countries from 'utils/countries';

const Address = ({
   onChange, newAddress,
}) => {
   const handlePhoneChange = (_, value) => {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(Number(value)) && !!value === true) return;
      onChange(_, value);
   };
   return (

      <div className='addressForm'>
         <div>
            <TextInput
               label='Street Address'
               placeholder=''
               type='text'
               name='street'
               value={ newAddress.street }
               onChange={ onChange }
            />
         </div>
         <div>
            <TextInput
               label='Apt, Suite, Etc'
               helpText='Optional'
               placeholder=''
               type='text'
               name='apt_suite'
               value={ newAddress.apt_suite }
               onChange={ onChange }
            />
         </div>
         <div>
            <TextInput
               label='Phone'
               placeholder=''
               type='text'
               name='phone'
               value={ newAddress.phone }
               onChange={ handlePhoneChange }
            />
         </div>
         <div className='flex'>
            <div className='flex-1 m-r-m'>
               <TextInput
                  label='Postal Code'
                  placeholder=''
                  type='text'
                  name='postal_code'
                  value={ newAddress.postal_code }
                  onChange={ onChange }
               />
            </div>
            <div className='flex-1'>
               <TextInput
                  label='City'
                  placeholder=''
                  type='text'
                  name='city'
                  value={ newAddress.city }
                  onChange={ onChange }
               />
            </div>
         </div>
         <div className='flex'>
            <div className='flex-1 m-r-m'>
               <div>
                  <Select
                     style={ { height: '48px' } }
                     id='countries'
                     type='select-medium'
                     placeholder='Choose Country'
                     options={ countries }
                     name='country'
                     label='Country'
                     value={ newAddress.country }
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
                  value={ newAddress.state }
                  onChange={ onChange }
               />
            </div>
         </div>
      </div>
   );
};

Address.propTypes = {
   onChange: PropTypes.func,
   newAddress: PropTypes.object,
};

export default Address;
