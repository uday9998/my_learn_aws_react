import React from 'react';
import './index.scss';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { getVatTaxingSettings, updateVatTaxingSettings } from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';
import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import Switch, { SIZES as switchSizes } from 'components/elements/switchNew';
import Input from 'components/elements/inputNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Address from 'components/elements/Address';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

const Taxes = () => {
   const {
      loading, data, setData,
   } = useApiQuery(getVatTaxingSettings);
   const {
      vatEnabled, vatNumber, selectTaxesAddress, billingAddress, taxesAddress,
   } = data || {};
   const [submit] = useSubmitForm(updateVatTaxingSettings, {
      successMessage: 'Vat Taxing Settings Updated, Successfully',
      unHundleedErrorMessage: 'There Was An Issue',
   }, '.taxes-save');

   const handleSubmit = () => {
      submit(data);
   };
   function handleInputChange(name, value, type) {
      if (type === 'address') {
         setData({
            ...data,
            taxesAddress: {
               ...data.taxesAddress,
               [name]: value,
            },
         });
         return;
      }
      setData({ ...data, [name]: value });
   }
   // const isHaveBillingData = () => {
   //    if (billingAddress) {
   //       return !!billingAddress.apt_and_suite || !!billingAddress.city || !!billingAddress.country
   //          || !!billingAddress.phone || !!billingAddress.postal_code
   //          || !!billingAddress.state || !!billingAddress.street_address;
   //    }
   //    return false;
   // };

   const getBillingText = () => {
      if (billingAddress) {
         return `${ billingAddress.street_address ? `${ billingAddress.street_address },` : '' }${ billingAddress.country ? `${ billingAddress.country },` : '' }${ billingAddress.postal_code ? `${ billingAddress.postal_code },` : '' }${ billingAddress.city ? `${ billingAddress.city }` : '' }`;
      }
      return '';
   };

   return (
      <InnerWrapper title='Taxes' tooltip='Selling from the EU? We can help with VAT. The tax percentage will be 20% for all the members.'>
         {loading ? (
            <LoaderSpinner />
         ) : (
            <div className='settings--taxes'>
               <div className='enableVatTaxing'>
                  <div className='enableVatTaxing__switch'>
                     <Switch
                        value={ vatEnabled }
                        onChange={ () => handleInputChange('vatEnabled', !vatEnabled) }
                        label='Enable VAT Taxing'
                        name='Ena'
                        size={ switchSizes.medium }
                     />
                  </div>
                  {vatEnabled && (
                     <div className='enableVatTaxing__bottom'>
                        <div className='enableVatTaxing__vatNumber m-t-m'>
                           <Input
                              value={ vatNumber }
                              onChange={ (_, value) => handleInputChange('vatNumber', value) }
                              label='VAT Number'
                           />
                        </div>
                        <div className='enableVatTaxing__bottom__address'>
                           <div className='enableVatTaxing__bottom__address__top'>
                              {/* <Switch
                                 value={ selectTaxesAddress }
                                 // disabled={ !isHaveBillingData() }
                                 onChange={ () => handleInputChange('selectTaxesAddress', !selectTaxesAddress) }
                                 label='Use the Same Address'
                                 name='Ena'
                                 tooltip=''
                                 size={ switchSizes.medium }
                              /> */}
                              <Text
                                 inner='Add a business address for tax reporting purposes.'
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                                 style={ { color: '#727978' } }
                              />
                           </div>
                           {/* {(!selectTaxesAddress) && ( */}
                           <Address
                              inputs={ taxesAddress }
                              onChange={ (name, value) => handleInputChange(name, value, 'address') }
                           />
                           {/* )} */}
                           {/* {(selectTaxesAddress) && ( */}
                           <div className='enableVatTaxing__billing__address'>
                              {getBillingText() && (
                                 <div className='item'>
                                    <IconNew name='TaxGPSM' />
                                    <Text
                                       inner={ getBillingText() }
                                       type={ txtTypes.regularDefault }
                                       size={ txtSizes.small }
                                    />
                                 </div>
                              )}
                              {billingAddress && billingAddress.phone && (
                                 <div className='item'>
                                    <IconNew name='TaxPhoneM' />
                                    <Text
                                       inner={ billingAddress.phone }
                                       type={ txtTypes.regularDefault }
                                       size={ txtSizes.small }
                                    />
                                 </div>
                              )}
                           </div>
                           {/* )} */}
                        </div>
                     </div>
                  )}
               </div>
               <div className='taxesFormActions'>
                  <BaseButton
                     text={ vatEnabled ? 'Save & Verify' : 'Save' }
                     className='taxes-save'
                     onClick={ handleSubmit }
                  />
               </div>
            </div>
         )}
      </InnerWrapper>
   );
};

Taxes.propTypes = {

};

export default Taxes;
