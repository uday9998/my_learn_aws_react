import React, { useContext } from 'react';
import { AffiliateSettingsContext } from 'containers/pages/admin/affiliate/Settings';
import './index.scss';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import Select from 'components/elements/SelectNew';
import Line from 'components/elements/Line';
import Switch from 'components/elements/switchNew';

const AffiliateSettingsGeneral = () => {
   const { data, handleInputChange } = useContext(AffiliateSettingsContext);
   const selectOptions = [
      { value: 1, label: 'Anyone with the link' },
      { value: 0, label: 'Only people invited to the Affiliate Program' },
   ];
   const access = selectOptions.find((e) => e.value === data.general.invitation_status).label || '';
   return (
      <div className='affiliate__settings__general'>
         <div className='affiliate__settings__general__left'>
            <div className='affiliate__settings__general__left__block'>
               <TextWithTooltip
                  // tooltip='text'
                  inner='General Settings'
                  isIconRigth={ true }
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <Text
                  inner='General Access'
                  type={ types.medium150 }
                  size={ sizes.medium }
                  style={ { marginTop: '20px' } }
               />
               <Text
                  inner='Give people the opportunity to become affiliated in two different ways: via email or a link'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978', marginBottom: '24px' } }
               />
               <Select
                  label='Who Can Join the Affiliate Program'
                  options={ selectOptions }
                  value={ data.general.invitation_status }
                  name='invitation_status'
                  type='select-medium'
                  onChange={ handleInputChange }
               />
            </div>
            <Line />
            <div className='affiliate__settings__general__left__block'>
               <Text
                  inner='Window for Referral Conversion'
                  type={ types.medium150 }
                  size={ sizes.medium }
                  style={ { marginBottom: '4px' } }
               />
               <Text
                  inner='When a customer clicks on an affiliate link and makes a purchase, you can decide how long later the referral is no longer credited to the affiliate.'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978', marginBottom: '24px' } }
               />
               <Input
                  value={ Number.parseFloat(data.general.time_period) }
                  name='time_period'
                  onChange={ handleInputChange }
                  type='number'
                  label='Time Period'
                  helpText='Days'
               />
            </div>
            <Line />
            <div className='affiliate__settings__general__left__block'>
               <div className='affiliate__settings__general__left__checkbox'>
                  <Text
                     inner='Allow Affiliates to Use Coupon Codes'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <Switch
                     size='medium'
                     value={ data.general.allow_coupon_codes }
                     onChange={ () => handleInputChange('allow_coupon_codes', data.general.allow_coupon_codes === 1 ? 0 : 1) }
                  />
               </div>
               <Text
                  inner='It is possible for each affiliate to create a unique coupon code that can be shared with people. Below you must enter the maximum amount of discount an affiliate can provide.'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978', marginBottom: '24px' } }
               />
               <Input
                  value={ data.general.max_percent }
                  name='max_percent'
                  onChange={ handleInputChange }
                  type='number'
                  maxNumber={ 100 }
                  label='Max Percent OFF For Affiliates'
               />
            </div>
            {/* <Line />
            <div className='affiliate__settings__general__left__block'>
               <div className='affiliate__settings__general__left__checkbox'>
                  <Text
                     inner='Contact Info'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <Switch
                     size='medium'
                     value={ data.general.contract_info }
                     onChange={ () => handleInputChange('contract_info', !data.general.contract_info) }
                  />
               </div>
               <Text
                  inner='You may add your contact information, such as your email address, this will help your affiliates to get in touch with you if they need ask something.'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978', marginBottom: '24px' } }
               />
               <div className='affiliate__settings__general__left__inputs'>
                  <Input
                     value={ data.general.email_address }
                     name='email_address'
                     onChange={ handleInputChange }
                     label='Email Address'
                  />
                  <Input
                     value={ data.general.email_subject }
                     name='email_subject'
                     onChange={ handleInputChange }
                     label='Email Subject'
                  />
               </div>
            </div> */}
         </div>
         <div className='affiliate__settings__general__right'>
            <Text
               inner='Summary'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <div className='affiliate__settings__general__right__preview'>
               <Text
                  inner={ `Affiliate Access - ${ access }` }
                  type={ types.medium150 }
                  size={ sizes.medium }
               />
               <Line />
               <Text
                  inner={ `Referral Conversion Period - ${ data.general.time_period } Days` }
                  type={ types.medium150 }
                  size={ sizes.medium }
               />
               {data.general.couponCodes && (
                  <>
                     <Line />
                     <Text
                        inner={ `Max Percent Off for Affiliates - ${ data.general.percentCodes } %` }
                        type={ types.medium150 }
                        size={ sizes.medium }
                     />
                  </>
               )}
               {data.contactInfo && (
                  <>
                     <Line />
                     <Text
                        inner={ `Contact Info - ${ data.general.emailAddress }` }
                        type={ types.medium150 }
                        size={ sizes.medium }
                     />
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

AffiliateSettingsGeneral.propTypes = {

};

export default AffiliateSettingsGeneral;
