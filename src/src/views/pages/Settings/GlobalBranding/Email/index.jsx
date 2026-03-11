import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { SIZES as TextSize, TYPES as TextType } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import TextInput from 'components/elements/inputNew';
import DropTriggle from 'components/elements/newDropTriggle';
import IconNew from 'components/elements/iconsSize';
// import Logo from 'assets/images/logo.png';
import Address from 'views/pages/Settings/Address';
import './index.scss';
import SliceAndConnectText from 'utils/getSplitedText';


const Email = ({
   globalBranding, onChange, saveGeneral, setOpenDeletModal, isChanged,
}) => {
   const [social, setSocial] = useState({ name: '', link: '' });
   const [selectEditableSocial, setSelectEditableSocial] = useState('');


   const links = {
      Facebook: 'https://www.facebook.com/',
      Pinterest: 'https://www.pinterest.com/',
      Youtube: 'https://www.youtube.com/',
      Linkedin: 'https://www.linkedin.com/in/',
      Tumblr: 'https://www.tumblr.com/',
      TikTok: 'https://www.tiktok.com/',
      Instagram: 'https://www.instagram.com/',
      Twitter: 'https://twitter.com/',
   };
   const onAdd = (name, link) => {
      if (name && link) {
         onChange(name, `${ links[name] }${ link }`, 'global_branding_signature_email', 'social_accounts');
         setSocial({ name: '', link: '' });
      }
   };
   const onEdit = (name, link, id) => {
      onChange(name, `${ links[name] }${ link }`, 'global_branding_signature_email', 'social_accounts', id);
      setSelectEditableSocial('');
   };
   const linkIcons = {
      Facebook: 'FaceBookM',
      Pinterest: 'PinterestM',
      Youtube: 'YoutubeM',
      Linkedin: 'LinkedingM',
      Tumblr: 'TumblrM',
      TikTok: 'TikTokM',
      Instagram: 'InstagramM',
      Twitter: 'TwitterM',
   };

   const socialAccounts = [
      { value: 'Facebook', label: 'Facebook' },
      { value: 'Twitter', label: 'Twitter' },
      { value: 'Instagram', label: 'Instagram' },
      { value: 'Pinterest', label: 'Pinterest' },
      { value: 'Youtube', label: 'Youtube' },
      { value: 'Linkedin', label: 'Linkedin' },
      { value: 'Tumblr', label: 'Tumblr' },
      { value: 'Podcast', label: 'Podcast' },
      { value: 'TikTok', label: 'TikTok' },
   ];

   const brandingAdd = globalBranding.global_branding_address;
   const billingAdd = globalBranding.billing_address;
   const outputAddress = !parseInt(globalBranding.global_branding_checked_address, 10) ? [brandingAdd.street_address, brandingAdd.apt_and_suite, brandingAdd.postal_code, brandingAdd.city, brandingAdd.country, brandingAdd.state].filter(Boolean).join(', ')
      : [billingAdd.street_address, billingAdd.apt_and_suite, billingAdd.postal_code, billingAdd.city, billingAdd.country, billingAdd.state].filter(Boolean).join(', ');
   return (
      <div className='signatureEmail'>
         <div>
            <TextInput
               label='Full Name'
               placeholder='Enter Your Full Name Here'
               type='text'
               name='full_name'
               value={ globalBranding.global_branding_signature_email.full_name || '' }
               onChange={ (name, value) => onChange(name, value, 'global_branding_signature_email') }
            />
         </div>
         <div>
            <TextInput
               label='Position'
               placeholder='Your Position or Title'
               type='text'
               name='position'
               value={ globalBranding.global_branding_signature_email.position || '' }
               onChange={ (name, value) => onChange(name, value, 'global_branding_signature_email') }
            />
         </div>
         <Address
            newAddress={ globalBranding.global_branding_address }
            billingAddress={ globalBranding.billing_address }
            default_address={ globalBranding.global_branding_checked_address }
            onChange={ (name, value) => onChange(name, value, 'global_branding_address') }
            onChangeSwitch={ (value) => onChange('global_branding_checked_address', value === false ? 0 : 1) }
            default_address_name='global_branding_checked_address'
         />
         <div className='signatureEmail-web'>
            <TextInput
               label='Website'
               placeholder='Your Website URL (if different from Company Website URL) '
               type='text'
               name='website'
               value={ globalBranding.global_branding_signature_email.website || '' }
               onChange={ (name, value) => onChange(name, value, 'global_branding_signature_email') }
            />
         </div>

         {!selectEditableSocial
                  && (
                     <div className='signatureEmail-social'>
                        <div className='signatureEmail-social-left'>
                           <Select
                              options={ socialAccounts }
                              type='select-medium'
                              name='name'
                              onChange={ (name, value) => setSocial({ ...social, [name]: value }) }
                              value={ social.name || '' }
                              placeholder='Select option'
                              label='Social Accounts'
                           />
                        </div>
                        <div className='signatureEmail-social-right'>
                           {social.name && (
                              <div className='flex flex-col' style={ { gap: '8px' } }>
                                 <Text
                                    inner='Link'
                                    type={ TextType.regularDefault }
                                    size={ TextSize.small }
                                 />
                                 <div className='signatureEmail-social-right-input'>
                                    <Text
                                       inner={ links[social.name] }
                                       type={ TextType.regularDefault }
                                       size={ TextSize.small }
                                    />
                                    <input type='text' placeholder='...' maxLength={ 50 } value={ social.link } onChange={ (e) => setSocial({ ...social, link: e.target.value }) } />
                                 </div>
                              </div>
                           )}
                        </div>
                        <div>
                           <BaseButton
                              theme={ btnTheme.primary }
                              size={ btnSize.large }
                              text='Add'
                              onClick={ () => {
                                 onAdd(social.name, social.link);
                              } }
                           />
                        </div>
                     </div>
                  )}
         {!!globalBranding.global_branding_signature_email.social_accounts.length
         && globalBranding.global_branding_signature_email.social_accounts.map((socialAccount) => {
            return (
               <div key={ socialAccount.id }>
                  {selectEditableSocial.id !== socialAccount.id && (
                     <div className='signatureEmail-socialContent' key={ socialAccount.id }>
                        <>
                           <div className='signatureEmail-socialContent-left'>
                              <div><IconNew name={ `${ linkIcons[socialAccount.name] }` } /></div>
                              <div>
                                 <Text
                                    type={ TextType.regularDefault }
                                    size={ TextSize.small }
                                    inner={ socialAccount.name }
                                 />
                              </div>
                              <div className='signatureEmail-subtitle'>
                                 <Text
                                    type={ TextType.regularDefaultGrey }
                                    size={ TextSize.small }
                                    inner={ SliceAndConnectText(socialAccount.link, 60) }
                                 />
                              </div>
                           </div>
                           <div>
                              <DropTriggle options={ [
                                 {
                                    trash: false, iconName: 'EditSettingsM', name: 'Edit', onClick: () => setSelectEditableSocial({ ...socialAccount, link: socialAccount.link.replace(`${ links[socialAccount.name] }`, '') }),
                                 },
                                 {
                                    trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => setOpenDeletModal(socialAccount.id),
                                 },
                              ] }
                              />
                           </div>
                        </>
                     </div>
                  )}
                  {selectEditableSocial.id === socialAccount.id
                  && (
                     <div className='signatureEmail-social'>
                        <div className='signatureEmail-social-left'>
                           <Select
                              options={ socialAccounts }
                              type='select-medium'
                              name='name'
                              onChange={ (name, value) => setSelectEditableSocial(
                                 { ...selectEditableSocial, [name]: value }) }
                              value={ selectEditableSocial.name || '' }
                              placeholder='Select option'
                              label='Social Accounts'
                           />
                        </div>
                        <div className='signatureEmail-social-right'>
                           {selectEditableSocial.name && (
                              <div className='flex flex-col' style={ { gap: '8px' } }>
                                 <Text
                                    inner='Link'
                                    type={ TextType.regularDefault }
                                    size={ TextSize.small }
                                 />
                                 <div className='signatureEmail-social-right-input'>
                                    <Text
                                       inner={ links[selectEditableSocial.name] }
                                       type={ TextType.regularDefault }
                                       size={ TextSize.small }
                                    />
                                    <input type='text' placeholder='...' maxLength={ 50 } value={ selectEditableSocial.link } onChange={ (e) => setSelectEditableSocial({ ...selectEditableSocial, link: e.target.value }) } />
                                 </div>
                              </div>
                           )}
                        </div>
                        <div>
                           <BaseButton
                              theme={ btnTheme.primary }
                              size={ btnSize.large }
                              text='Edit'
                              onClick={
                                 () => onEdit(
                                    selectEditableSocial.name, selectEditableSocial.link, selectEditableSocial.id)
                              }
                           />
                        </div>
                     </div>
                  )}
               </div>
            );
         })}

         <div className='signatureEmail-preview'>
            <div className='signatureEmail-preview-title'>
               <Text
                  type={ TextType.mediumSmall }
                  size={ TextSize.medium }
                  inner='Preview'
               />
            </div>
            <div className='signatureEmail-preview-content'>
               {globalBranding.school_logo
                && <div className='signatureEmail-preview-content-img'><img src={ globalBranding.school_logo } alt='logo' /></div>}
               <div className='signatureEmail-preview-content-text'>
                  <div className='signatureEmail-title'>
                     <Text
                        type={ TextType.mediumSmall }
                        size={ TextSize.medium }
                        inner={ globalBranding.global_branding_signature_email.full_name || 'Devon Lane' }
                     />
                  </div>
                  <div className='signatureEmail-subtitle'>
                     <Text
                        type={ TextType.regularDefault }
                        size={ TextSize.small }
                        s
                        inner={ globalBranding.global_branding_signature_email.position || 'UI/UX Designer' }
                     />
                  </div>
                  <div className='signatureEmail-subtitle'>
                     <Text
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small }
                        inner={ !parseInt(globalBranding.global_branding_checked_address, 10)
                           ? brandingAdd.phone
                           : billingAdd.phone }
                     />
                  </div>
                  <div className='signatureEmail-subtitle'>
                     <Text
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small }
                        inner={ outputAddress }
                     />
                  </div>
                  {globalBranding.global_branding_signature_email.website && (
                     <div className='signatureEmail-website'>
                        <Text
                           type={ TextType.regularDefaultGrey }
                           size={ TextSize.small }
                           style={ { color: '#6127FD' } }
                           inner={ globalBranding.global_branding_signature_email.website }
                        />
                     </div>
                  )}
                  {!!globalBranding.global_branding_signature_email.social_accounts.length
                  && (
                     <div className='social-icons'>
                        {globalBranding.global_branding_signature_email.social_accounts.map((socialAccount) => {
                           return (
                              <div key={ socialAccount.id }>
                                 <div><IconNew name={ `${ socialAccount.name }L` } color='#6127FD' /></div>
                              </div>
                           );
                        })}
                     </div>
                  )}
               </div>
            </div>
         </div>
         <div>
            <BaseButton
               theme={ btnTheme.primary }
               size={ btnSize.large }
               text='Save Changes'
               onClick={ () => saveGeneral(globalBranding) }
               disabled={ !isChanged }
            />
         </div>
      </div>
   );
};

Email.propTypes = {
   globalBranding: PropTypes.object,
   onChange: PropTypes.func,
   saveGeneral: PropTypes.func,
   setOpenDeletModal: PropTypes.func,
   isChanged: PropTypes.bool,
};

export default Email;
