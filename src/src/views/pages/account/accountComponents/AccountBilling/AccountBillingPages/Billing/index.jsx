import React, { useCallback, useReducer } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPES as txtTypes } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Address from 'components/elements/Address';

const inputsReducer = (state, action) => {
   const { payload } = action;
   switch (action.type) {
      case 'change_input':
         return {
            ...state,
            [payload.name]: payload.value,
         };
      default:
         return state;
   }
};

const AccountBillingPage = ({ onSaveBillingAddressData, account }) => {
   const [inputs, dispatch] = useReducer(inputsReducer, account.billing_address);
   const onChange = (name, value) => {
      dispatch({
         type: 'change_input',
         payload: {
            name, value,
         },
      });
   };

   const handleSave = useCallback((info) => {
      onSaveBillingAddressData({ billing_address: info });
   }, []);

   return (
      <div className='account__billing'>
         <Text
            inner='Add a mailing address for tax reporting purposes.'
            type={ txtTypes.regularDefault }
            size={ txtSizes.small }
            style={ { color: '#727978' } }
         />
         <div>
            <Address inputs={ inputs } onChange={ onChange } />
            <BaseButton
               text='Save Changes'
               disabled={ Object.is(account.billing_address, inputs) }
               style={ { marginTop: '24px' } }
               onClick={ () => handleSave(inputs) }
            />
         </div>
      </div>
   );
};

AccountBillingPage.propTypes = {
   onSaveBillingAddressData: PropTypes.func,
   account: PropTypes.any,
};

export default AccountBillingPage;
