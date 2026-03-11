import Info from 'components/elements/messages/info';
import React, { useState } from 'react';
import './index.scss';
import Input from 'components/elements/inputNew';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import ColorInput from 'components/elements/form/ColorInput';
import UploadImage from 'components/modules/uploadImage';
import CheckList from 'components/elements/checkListNew';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import Address from 'components/elements/Address';

const addressVariants = [
   { key: 'Use Your Saved Address', value: '1' },
   { key: 'Add New Address', value: '2' },
   { key: 'Hide Address', value: '3' },
];

const DesignEmailSettingsPage = ({ handleSaveFromEmail, emailSettings }) => {
   const [inputs, setInputs] = useState({
      emailBrandColor: emailSettings.emailBrandColor,
      emailFooterAddress: emailSettings.emailFooterAddress,
      emailHeaderLogo: emailSettings.emailHeaderLogo,
      emailCompanyWebsiteUrl: emailSettings.emailCompanyWebsiteUrl,
   });

   const [address, setAddress] = useState(emailSettings.emailAddress);

   const handleInputChange = (name, value, type) => {
      if (type === 'address') {
         setAddress({
            ...address,
            [name]: value,
         });
         return;
      }
      setInputs({
         ...inputs,
         [name]: value,
      });
   };


   const onSave = () => {
      const data = {
         ...inputs,
         emailAddress: address,
      };
      handleSaveFromEmail(data, true);
   };

   return (
      <div className='email__design'>
         <Info title='Add the corporate color, logo, address to make it look more professional' />
         <div className='email__design__brand__color'>
            <Text
               inner='Brand Color'
               type={ txtTypes.mediumSmall }
               size={ txtSizes.medium }
            />
            <Text
               inner='Add your brand color. This will be used for the buttons in the email'
               type={ txtTypes.regularDefault }
               size={ txtSizes.small }
               style={ { color: '#727978' } }
            />
            <ColorInput
               label='Color'
               subLabel=''
               icon='TriangleDown'
               name='emailBrandColor'
               value={ inputs.emailBrandColor }
               onChange={ (name, value) => handleInputChange(name, value) }
            />
         </div>
         <div className='divider' />
         <div className='email__design__upload'>
            <Text
               inner='Email Header'
               type={ txtTypes.mediumSmall }
               size={ txtSizes.medium }
            />
            <UploadImage
               isOptional={ true }
               label='Add Logo'
               src={ inputs.emailHeaderLogo }
               name='emailHeaderLogo'
               onChange={ handleInputChange }
               isImageUpload={ true }
            />
         </div>
         <Input
            value={ inputs.emailCompanyWebsiteUrl }
            onChange={ handleInputChange }
            label='Company Website URL'
            name='emailCompanyWebsiteUrl'
            placeholder='www.yourcompanywebsite.com'
         />
         <div className='divider' />
         <div className='email__design__address'>
            <Text
               inner='Email Footer Address'
               type={ txtTypes.mediumSmall }
               size={ txtSizes.medium }
            />
            {/* <CheckList
               values={ inputs.emailFooterAddress }
               items={ addressVariants }
               onChange={ (value) => handleInputChange('emailFooterAddress', value) }
            /> */}
            {/* {inputs.emailFooterAddress === '2' && ( */}
            <Address inputs={ address } onChange={ (name, value) => handleInputChange(name, value, 'address') } />
            {/* )} */}
         </div>
         <div className='email__design__buttons'>
            {/* <BaseButton
               text='Preview'
               theme={ btnThemes.secondary }
               onClick={ () =>  }
            /> */}
            <BaseButton
               text='Save Changes'
               className='settings-email-save'
               onClick={ () => onSave() }
            />
         </div>
      </div>
   );
};

DesignEmailSettingsPage.propTypes = {
   handleSaveFromEmail: PropTypes.func,
   emailSettings: PropTypes.object,
};

export default DesignEmailSettingsPage;
