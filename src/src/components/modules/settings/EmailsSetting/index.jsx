import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import withLoading from 'utils/withLoading';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const EmailSettingsLoading = withLoading(DynamicWrapper);

const EmailsSetting = ({
   onChange, handleCancelChanges, fromEmailSettings, handleSaveFromEmail,
   onToggleDnsSettings,
}) => {
   const {
      loading,
      data: {
         fromEmail, fromName, replyEmail, signatureCreated,
      } = {},
   } = fromEmailSettings || {};
   return (
      <EmailSettingsLoading
         isOpen={ true }
         title='Email Settings'
         borderColor='#cddaf1'
         openedHasShadow
         openedBackColor='#fff'
         backColor='#fff'
         isLoading={ loading }
      >
         <div className='emailSettingsWrapper'>

            <div className='emailSettingsInfo'>
               <h3>
                  These settings allow you to select your marketing email domain.
                  The default active settings is support@miestro.com.
                  To activate your Custom Email Domain setting,
                  fill out the section and proceed setup by clicking &#34;Save&#34;.
                  Then please check the DNS settings and add the 2 records into your domain registrar.
                  Sending from a Miestro Email domain gives your the additional domain reputation
                  while sending from your own custom domain lends more authority to your brand.
               </h3>
            </div>
            <div className='emailsSetting'>
               <div>
                  <TextInput
                     label='From Email'
                     placeholder='support@miestro.com'
                     type='text'
                     name='fromEmail'
                     value={ fromEmail }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-exl'>
                  <TextInput
                     label='From Name'
                     placeholder='John Doe'
                     type='text'
                     name='fromName'
                     value={ fromName }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-exl'>
                  <TextInput
                     label='Reply-To Email Address'
                     placeholder='example@domain.com'
                     type='text'
                     name='replyEmail'
                     value={ replyEmail }
                     onChange={ onChange }
                  />
               </div>
               <div className='mailPreview'>
                  <h3>Preview</h3>
                  <ul>
                     <li>
                        <span>from</span>
                        {fromName} &lt;{fromEmail}&gt;
                     </li>
                     <li>
                        <span>reply-to</span>
                        {replyEmail}
                     </li>
                  </ul>
               </div>
               <div className='flex justify-end m-t-exl emailSettingsActions'>
                  {
                     signatureCreated
                  && (
                     <div className='m-r-m'>
                        <BaseButton
                           theme={ btnTheme.lightBlue }
                           size={ btnSize.medium }
                           text='DNS Settings'
                           onClick={ () => onToggleDnsSettings() }
                        />
                     </div>
                  )
                  }
                  <div className='m-r-m'>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.medium }
                        text='Cancel'
                        onClick={ () => handleCancelChanges('settings') }
                     />
                  </div>
                  <div>
                     <BaseButton
                        size={ btnSize.medium }
                        text='Save'
                        className='settings-email-save'
                        onClick={ () => handleSaveFromEmail() }
                     />
                  </div>
               </div>
            </div>
         </div>
      </EmailSettingsLoading>
   );
};

EmailsSetting.propTypes = {
   fromEmailSettings: PropTypes.object,
   onChange: PropTypes.func,
   onToggleDnsSettings: PropTypes.func,
   handleSaveFromEmail: PropTypes.func,
   handleCancelChanges: PropTypes.func,
};

export default EmailsSetting;
