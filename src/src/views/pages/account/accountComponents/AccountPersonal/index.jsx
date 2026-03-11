import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import Select from 'components/elements/SelectNew';
import Input from 'components/elements/inputNew';
import timezonsData from 'utils/timezons.json';
import BaseButton, { SIZES as btnSizes, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import { priceOption } from 'utils/getCurrencySymbol';
import UploadModal from 'components/modules/UploadModal';
import IconButton from 'components/elements/buttons/IconButton';
import LoaderSpinner from 'components/elements/LoaderSpiner';


const AccountPersonalPage = ({
   account, onSaveAccountInformation, isVerifiedEmail, loading,
}) => {
   const [inputs, setInputs] = useState({
      ...account,
   });
   const [isClosedSupportInput, setIsClosedSupportInput] = useState(true);
   const localeTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

   useEffect(() => {
      setInputs({ ...account });
   }, [account]);

   const handleInputChange = (name, value) => {
      if (name === 'picture_full_src') {
         setInputs({
            ...inputs,
            picture_src: value,
            [name]: value,
         });
         setIsOpenUploadModal(false);
      } else {
         setInputs({
            ...inputs,
            [name]: value,
         });
      }
   };

   useEffect(() => {
      if (localStorage.getItem('openModal')) {
         localStorage.removeItem('openModal');
         setIsOpenUploadModal(true);
      }
   }, []);

   return (
      <>
         {!!account && !account.email && <LoaderSpinner />}
         {loading && <LoaderSpinner /> }
         <InnerWrapper title='Personal Information'>
            <div className='account__personal'>
               <div className='account__personal__top'>
                  <div className='account__personal__top__background' />
                  <div className='account__personal__top__content'>
                     <div className='image'>
                        <img src={ inputs.picture_full_src } alt='' />
                        <div className='image__edit' role='presentation' onClick={ () => setIsOpenUploadModal(true) }>
                           <IconNew name='AccountImageEditX' />
                        </div>
                        {(inputs.picture_full_src && inputs.picture_full_src !== 'http://miestro.loc/images/account/user.png') && (
                           <div className='image__edit__cancel'>
                              <IconButton
                                 theme={ btnTheme.change }
                                 size={ btnSizes.small }
                                 text=''
                                 name='AccountRemoveImageM'
                                 className='image__view__clear'
                                 onClick={ () => handleInputChange('picture_full_src', 'http://miestro.loc/images/account/user.png') }
                              />
                           </div>
                        )}
                     </div>
                     <Input
                        value={ inputs.name }
                        name='name'
                        onChange={ handleInputChange }
                     />
                  </div>
               </div>
               {isOpenUploadModal && (
                  <UploadModal
                     cropRatio={ true }
                     onChange={ (value) => handleInputChange('picture_full_src', value) }
                     fileLessonFormat='image'
                     isAmazonFile={ true }
                     onCloseModal={ () => setIsOpenUploadModal(false) }
                  />
               )}
               <div className='account__personal__inputs'>
                  <Input
                     value={ inputs.title }
                     name='title'
                     onChange={ handleInputChange }
                     helpText='Optional'
                     label='Site Title'
                  />
                  <div className='account__email'>
                     <div className='account__email__input'>
                        <div className='left'>
                           <Text
                              inner='Email Address'
                              type={ TextType.regularDefault }
                              size={ TextSize.small }
                           />
                           {!isVerifiedEmail && <IconNew name='EmailVerifiedI' />}

                        </div>
                        {!isVerifiedEmail && (
                           <Text
                              inner='Verified'
                              type={ TextType.regularLarge }
                              size={ TextSize.xsmall }
                              style={ { color: '#379552' } }
                           />
                        )}

                     </div>
                     <Input
                        value={ inputs.email }
                        name='email'
                        onChange={ handleInputChange }
                     />
                  </div>
                  {(!inputs.support_email && isClosedSupportInput) && (
                     <div
                        className='add__suport__button'
                        role='presentation'
                        onClick={ () => setIsClosedSupportInput(false) }
                     >
                        <IconNew
                           name='PlusSupportM'
                        />
                        <Text
                           inner='Add Support Email'
                           size={ TextSize.small }
                           type={ TextType.regularDefaultSmallX }
                           style={ { color: '#24554E' } }
                        />
                     </div>
                  )}
                  {(!isClosedSupportInput || inputs.support_email) && (
                     <Input
                        value={ inputs.support_email }
                        name='support_email'
                        onChange={ handleInputChange }
                        label='Support Email Address'
                        placeholder='Add Your Support Email Address Here'
                     />
                  )}
                  <Select
                     label='Default Currency'
                     placeholder='Enter default currency here'
                     id='default_currency'
                     options={ priceOption }
                     type='select-large'
                     name='default_currency'
                     value={ inputs.default_currency }
                     onChange={ handleInputChange }
                     iconName='SelectButtonPersonalL'
                  />
                  <Select
                     label='Time Zone'
                     placeholder='Select Time Zone'
                     name='timezone'
                     type='select-large'
                     value={ inputs.timezone ? inputs.timezone : localeTimezone }
                     options={ timezonsData }
                     onChange={ handleInputChange }
                     iconName='SelectButtonPersonalL'
                  />
                  <BaseButton
                     text='Save Changes'
                     style={ { maxWidth: 'max-content' } }
                     onClick={ () => onSaveAccountInformation(inputs) }
                  />
               </div>
            </div>
         </InnerWrapper>
      </>
   );
};

AccountPersonalPage.propTypes = {
   account: PropTypes.object,
   onSaveAccountInformation: PropTypes.func,
   isVerifiedEmail: PropTypes.bool,
   loading: PropTypes.bool,
};

export default AccountPersonalPage;
