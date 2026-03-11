import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import countries from 'utils/countries';

const Address = ({ inputs, onChange }) => {
   return (
      <div className='address__inputs'>
         <Input
            value={ inputs.street_address || '' }
            onChange={ onChange }
            name='street_address'
            label='Street Address'
            placeholder='Street Address Here'
         />
         <Input
            helpText='optional'
            value={ inputs.apt_and_suite || '' }
            onChange={ onChange }
            name='apt_and_suite'
            label='Apt, Suite, Etc'
            placeholder='Apt., Suite, etc. (Optional)'
         />
         <Input
            value={ inputs.phone || '' }
            onChange={ onChange }
            name='phone'
            label='Phone'
            placeholder='Insert Your Phone Number'
         />
         <div className='address__inputs__flex'>
            <Input
               value={ inputs.postal_code || '' }
               onChange={ onChange }
               name='postal_code'
               label='Postal Code'
               placeholder='Enter Postal Code'
            />
            <Input
               value={ inputs.city || '' }
               onChange={ onChange }
               name='city'
               label='City'
               placeholder='City Name Here'
            />
         </div>
         <div className='address__inputs__flex'>
            <Select
               value={ inputs.country || 'Afghanistan' }
               type='select-medium'
               label='Country'
               onChange={ onChange }
               options={ countries }
               name='country'
            />
            <Input
               value={ inputs.state || '' }
               onChange={ onChange }
               name='state'
               label='State'
               placeholder='State/Province'
            />
         </div>
      </div>
   );
};

Address.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
};

export default Address;
