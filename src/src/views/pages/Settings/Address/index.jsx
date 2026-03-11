/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import TextInput from 'components/elements/inputNew';
import './index.scss';
import countries from 'utils/countries';
import Switch from 'components/elements/switchNew';
import Text, { SIZES as TextSize, TYPES as TextType } from 'components/elements/TextNew';

const Address = ({
   onChange, newAddress, default_address, onChangeSwitch,
}) => {
   // const handlePhoneChange = (_, value) => {
   //    // eslint-disable-next-line no-restricted-globals
   //    if (isNaN(Number(value)) && !!value === true) return;
   //    onChange(_, value);
   // };

   return (
      <div className='signatureEmail-address'>
         <div>
            <Switch
               label='Use the Same Address'
               size='medium'
               value={ !!parseInt(default_address, 10) }
               iconName='Help'
               onChange={ onChangeSwitch }
            />
         </div>
         <div className='signatureEmail-additional-subtitle'>
            <Text
               type={ TextType.regularDefaultGrey }
               size={ TextSize.small }
               inner='Add a business address for tax reporting purposes.'
            />
         </div>
         <div className='signatureEmail-address-content'>
            {/* {!!parseInt(default_address, 10)
                   && (
                      <>
                         {billingAddress.street_address && (
                            <TextWithIcon
                               type={ TextType.regularDefault }
                               size={ TextSize.small }
                               inner={ [billingAddress.street_address, billingAddress.apt_and_suite, billingAddress.postal_code, billingAddress.city, billingAddress.country, billingAddress.state].filter(Boolean).join(', ') }
                               iconName='pinM'
                            />
                         )}
                         {billingAddress.phone && (
                            <TextWithIcon
                               type={ TextType.regularDefault }
                               size={ TextSize.small }
                               inner={ billingAddress.phone || '' }
                               iconName='phoneM'
                            />
                         )}
                      </>
                   )} */}
            {!!parseInt(default_address, 10)
                  && (
                     <div className='addressForm'>
                        <div>
                           <TextInput
                              label='Street Address'
                              placeholder='Street Address Here'
                              type='text'
                              name='street_address'
                              value={ newAddress.street_address || '' }
                              onChange={ onChange }
                           />
                        </div>
                        <div>
                           <TextInput
                              label='Apt, Suite, Etc'
                              helpText='Optional'
                              placeholder='Apt., Suite, etc. (Optional)'
                              type='text'
                              name='apt_and_suite'
                              value={ newAddress.apt_and_suite || '' }
                              onChange={ onChange }
                           />
                        </div>
                        <div>
                           <TextInput
                              label='Phone'
                              placeholder='Insert Your Phone Number'
                              type='text'
                              name='phone'
                              value={ newAddress.phone || '' }
                              onChange={ onChange }
                           />
                        </div>
                        <div className='flex'>
                           <div className='flex-1 m-r-m'>
                              <TextInput
                                 label='Postal Code'
                                 placeholder='Enter Postal Code'
                                 type='text'
                                 name='postal_code'
                                 value={ newAddress.postal_code || '' }
                                 onChange={ onChange }
                              />
                           </div>
                           <div className='flex-1'>
                              <TextInput
                                 label='City'
                                 placeholder='City'
                                 type='text'
                                 name='city'
                                 value={ newAddress.city || '' }
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
                                    value={ newAddress.country || '' }
                                    onChange={ onChange }
                                    direction='top'
                                    icon='SelectNew'
                                 />
                              </div>
                           </div>
                           <div className='flex-1'>
                              <TextInput
                                 label='State'
                                 placeholder='State/Province'
                                 type='text'
                                 name='state'
                                 value={ newAddress.state || '' }
                                 onChange={ onChange }
                              />
                           </div>
                        </div>
                     </div>
                  )}
         </div>

      </div>

   );
};

Address.propTypes = {
   onChange: PropTypes.func,
   newAddress: PropTypes.object,
   default_address: PropTypes.any,
   onChangeSwitch: PropTypes.func,
};

export default Address;
