import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Address from 'components/elements/Address';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateAddressSettings } from 'api';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const MyAccountSettingsAddress = ({ billingData, handleInputChange }) => {
   const [update] = useSubmitForm(updateAddressSettings);
   const handleSave = () => {
      update(billingData, () => {
         if (isPrint('Changes saved successfuly.')) {
            toast.success('Changes saved successfuly.');
         }
      });
   };
   return (
      <div className='settings__address'>
         <Address inputs={ billingData } onChange={ (name, value) => handleInputChange(name, value, true) } />
         <div style={ { marginTop: '8px' } }>
            <BaseButton
               text='Save Changes'
               onClick={ () => handleSave() }
            />
         </div>
      </div>
   );
};

MyAccountSettingsAddress.propTypes = {
   billingData: PropTypes.func,
   handleInputChange: PropTypes.func,
};

export default MyAccountSettingsAddress;
