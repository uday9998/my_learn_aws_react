import React from 'react';
import PropTypes from 'prop-types';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateCheckoutCodes } from 'api/AuthApi';
import withLoading from 'utils/withLoading';
import './index.scss';


const CodesLoading = withLoading('div');

const CheckoutCodes = ({ codes, setCodes, loadingCodes }) => {
   const [updateCheckoutCodesFunc, { loading: updateLoading }] = useSubmitForm(updateCheckoutCodes, {
      successMessage: 'Checkout Codes has been changed.',
   });

   const handleChangeCode = (name, value) => {
      setCodes({ ...codes, value: { ...codes.value, [name]: value } });
   };

   const handleSaveCodes = () => {
      updateCheckoutCodesFunc({ ...codes.value }, (res) => {
         setCodes(res);
      });
   };

   return (
      <CodesLoading className='checkout-codes' isLoading={ loadingCodes || updateLoading }>
         <div className='checkout-codes-header'>
            <div className='top'>
               <Text
                  inner='Checkout Codes or Tracking Code'
                  type={ textTypes.mediumSmall }
                  size={ textSizes.medium }
               />
            </div>
            <Text
               inner='Add a special tracking code from Google or Facebook to track payment performance. '
               type={ textTypes.regularDefaultGrey }
               size={ textSizes.small }
            />
         </div>
         <div className='checkout-codes-content'>
            <div className='checkout-codes-content-field'>
               <Input
                  type='textarea'
                  value={ codes.value.header_code }
                  name='header_code'
                  label='Header Code'
                  onChange={ handleChangeCode }
                  placeholder='Insert Header Code Here'
               />
               <Text
                  inner='This code will be placed in the top section of each checkout page.'
                  type={ textTypes.regularDefaultGrey }
                  size={ textSizes.xsmall }
               />
            </div>
            <div className='checkout-codes-content-field'>
               <Input
                  type='textarea'
                  value={ codes.value.footer_code }
                  name='footer_code'
                  label='Footer Code'
                  onChange={ handleChangeCode }
                  placeholder='Insert Footer Code Here'
               />
               <Text
                  inner='This code will be placed in the bottom section of each checkout page.'
                  type={ textTypes.regularDefaultGrey }
                  size={ textSizes.xsmall }
               />
            </div>
            <div className='checkout-codes-content-field'>
               <Input
                  type='textarea'
                  value={ codes.value.after_purchase_code }
                  name='after_purchase_code'
                  label='After Purchase Code'
                  onChange={ handleChangeCode }
                  placeholder='Code to Run After Purchase'
               />
               <Text
                  inner='This code will be shown after purchase '
                  type={ textTypes.regularDefaultGrey }
                  size={ textSizes.xsmall }
               />
            </div>
         </div>
         <div className='code-btn'>
            <BaseButton
               text='Save'
               theme={ btnTheme.primary }
               size={ btnSize.small63 }
               onClick={ () => {
                  handleSaveCodes();
               } }
            />
         </div>
      </CodesLoading>
   );
};

CheckoutCodes.propTypes = {
   codes: PropTypes.object,
   setCodes: PropTypes.func,
   loadingCodes: PropTypes.bool,
};

export default CheckoutCodes;
