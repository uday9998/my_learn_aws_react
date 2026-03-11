import React from 'react';
import Info from 'components/elements/messages/info';
import RadioModul from 'components/modules/radiomodul';
import Switch from 'components/elements/switchNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import ColorInput from 'components/elements/form/ColorInput';
import ImageView from 'components/elements/ImageView';
import Upload from 'components/modules/uploadWithoutS3';
import PropTypes from 'prop-types';
import Address from 'views/pages/Settings/Address';
import './index.scss';


const Receipt = ({
   receipt, updateReceipt, saveReceipt,
}) => {
   return (
      <div className='receipt'>
         {/* <Info title='This page is for course receipt design' /> */}
         <div>
            <RadioModul checked={ receipt.value && receipt.value.send_email } onChange={ updateReceipt } name='send_email' />
         </div>
         {receipt.value && !!receipt.value.send_email
         && (
            <>
               <div className='line' />
               <div className='switch-content'>
                  <Switch
                     label='Allows users to unsubscribe from receipts themselves'
                     size='medium'
                     positionText='right'
                     value={ !!receipt.value.allow_users_to_unsubscribe }
                     iconName='Help'
                     onChange={ (value) => updateReceipt('allow_users_to_unsubscribe', value === false ? 0 : 1) }
                  />
                  <Switch
                     label='Add a button to save receipt as PDF'
                     size='medium'
                     positionText='right'
                     value={ !!receipt.value.save_button_as_pdf }
                     iconName='Help'
                     onChange={ (value) => updateReceipt('save_button_as_pdf', value === false ? 0 : 1) }
                  />
               </div>
               <div className='line' />
               <div className='receipt-additional'>
                  <div className='receipt-additional-title'>
                     <Text
                        type={ TextType.mediumSmall }
                        size={ TextSize.medium }
                        inner='reCAPTCHA'
                     />
                  </div>
                  <div className='receipt-additional-captcha'>
                     <Text
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small }
                        inner="reCAPTCHA is a Google service that helps enhance your website's security against spam and abuse. It verifies the authenticity of contact submissions, ensuring only legitimate interactions."
                     />
                  </div>
                  <div>
                     <Switch
                        label='Enable reCAPTCHA'
                        size='medium'
                        value={ !!receipt.value.re_captcha }
                        iconName='Help'
                        onChange={ (value) => updateReceipt('re_captcha', value === false ? 0 : 1) }
                     />
                  </div>
               </div>
               <div className='line' />
               <div className='receipt-additional'>
                  <div className='receipt-additional-title'>
                     <Text
                        type={ TextType.mediumSmall }
                        size={ TextSize.medium }
                        inner='Additional Settings'
                     />
                  </div>
                  <div className='receipt-additional-subtitle'>
                     <Text
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small }
                        inner='Add your logo, select a brand color, and include your address to give your checkout a professional and personalized touch.'
                     />
                  </div>
                  <div className='receipt-img'>
                     {!receipt.value.logo && (
                        <Upload
                           isOptional={ true }
                           label='Add Logo'
                           fileLessonFormat='image'
                           isAmazonFile={ true }
                           text='Image'
                           onChange={ (url) => { updateReceipt('logo', url); } }
                        />
                     )}
                     {!!receipt.value.logo && (
                        <ImageView
                           src={ receipt.value.logo }
                           setIsOpenChangeModal={ () => {} }
                           clear={ () => { updateReceipt('logo', null); } }
                           onChange={ (url) => { updateReceipt('logo', url); } }
                        />
                     )}
                  </div>
               </div>
               <div className='receipt-brand'>
                  <div className='receipt-brand-title'>
                     <Text
                        type={ TextType.mediumSmall }
                        size={ TextSize.medium }
                        inner='Brand Color'
                     />
                  </div>
                  <div className='receipt-brand-subtitle'>
                     <Text
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small }
                        inner='Choose a color that represents your brand. This color will be applied to buttons in your emails, enhancing brand consistency.'
                     />
                  </div>
                  <div>
                     <ColorInput
                        label='Color'
                        subLabel=''
                        icon='TriangleDown'
                        name='brand_color'
                        value={ receipt.value.brand_color }
                        onChange={ (name, value) => updateReceipt(name, value) }
                     />
                  </div>
               </div>
               <div className='line' />
               <div className='receipt-address'>
                  <div className='receipt-address-title'>
                     <Text
                        type={ TextType.mediumSmall }
                        size={ TextSize.medium }
                        inner='Address'
                     />
                  </div>
                  <Address
                     newAddress={ receipt.value.new_address_data }
                     onChange={ (name, value) => updateReceipt(name, value, true) }
                     onChangeSwitch={ (value) => updateReceipt('default_address', value === false ? 0 : 1) }
                     billingAddress={ receipt.billing_address }
                     default_address={ receipt.value.default_address }
                     default_address_name='default_address'
                  />
                  {/* <div className='receipt-address-switch'>
                  <Switch
                     label='Use the Same Address'
                     size='medium'
                     value={ !!receipt.value.default_address }
                     tooltip='Example Text'
                     iconName='Help'
                     onChange={ (value) => updateReceipt('default_address', value === false ? 0 : 1) }
                  />
               </div>
               <div className='receipt-address-subtitle'>
                  <Text
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.small }
                     inner='Add a business address for tax reporting purposes.'
                  />
               </div>
               <div className='receipt-address-content'>
                  {!!receipt.value.default_address && receipt.default_address
                  && (
                  <>
                     {receipt.default_address.address && (
                        <TextWithIcon
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                           inner={ receipt.default_address.address }
                           iconName='pinM'
                        />
                     )}
                     {receipt.default_address.phone && (
                        <TextWithIcon
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                           inner={ receipt.default_address.phone }
                           iconName='phoneM'
                        />
                     )}
                     {receipt.default_address.state && (
                        <Text
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                           inner={ receipt.default_address.state }
                        />
                     )}
                     {receipt.default_address.country && (
                        <Text
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                           inner={ receipt.default_address.country }
                        />
                     )}
                     {receipt.default_address.city && (
                        <Text
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                           inner={ receipt.default_address.city }
                        />
                     )}
                     {receipt.default_address.street && (
                        <Text
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                           inner={ receipt.default_address.street }
                        />
                     )}
                     {receipt.default_address.postal_code && (
                        <Text
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                           inner={ receipt.default_address.postal_code }
                        />
                     )}
                  </>
                  )}
                  {!receipt.value.default_address
                  && (
                     <Address
                        newAddress={ receipt.value.new_address_data }
                        onChange={ (name, value) => updateReceipt(name, value, true) }
                     />
                  )}
               </div> */}
               </div>
            </>
         )
         }
         <div className='receipt-btns'>
            {/* <BaseButton
               theme={ btnTheme.secondary }
               size={ btnSize.large }
               text='Preview Receipt'
               // onClick={ () ={}  }
            /> */}
            <BaseButton
               theme={ btnTheme.primary }
               size={ btnSize.large }
               text='Save Settings'
               onClick={ () => saveReceipt() }
            />
         </div>
      </div>
   );
};

Receipt.propTypes = {
   receipt: PropTypes.object,
   updateReceipt: PropTypes.func,
   saveReceipt: PropTypes.func,
};

export default Receipt;
