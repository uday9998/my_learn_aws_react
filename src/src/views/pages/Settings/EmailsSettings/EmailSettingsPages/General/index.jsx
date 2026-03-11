import React, { useEffect, useState } from 'react';
import './index.scss';
import Info from 'components/elements/messages/info';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import { settingsGetOperation } from 'state/modules/settings/operations';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import CheckList from 'components/elements/checkListNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import preview from 'assets/images/previewEmail.png';
import SwitchNew from 'components/elements/switchNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { changeFromEmail } from 'api/AuthApi';
import VerifyEmailModal from 'containers/modules/verifyFromEmail';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { connect } from 'react-redux';

const TimeVariants = [
   { value: 'soon', key: 'Send As Soon As Possible' },
   { value: 'custom', key: 'Choose Start Time' },
];


const GeneralEmailSettingsPage = ({ emailSettings, handleSaveFromEmail, getSettings }) => {
   const [changeFromEmailFunc, { loading: loadingFromEmail }] = useSubmitForm(changeFromEmail, {
      successMessage: '',
   });

   const [inputs, setInputs] = useState({
      emailDateTime: 'soon',
      emailDate: '',
      emailTime: '',
      supportEmail: null,
   });

   const [fromEmail, setFromEmail] = useState('');
   const [openVerifyModal, setOpenVerifyModal] = useState(false);

   useEffect(() => {
      setInputs({
         fromEmail: emailSettings.fromEmail || '',
         fromName: emailSettings.fromName || '',
         replyEmail: emailSettings.replyEmail || '',
         emailDateTime: emailSettings.emailDateTime || 'soon',
         emailTracking: emailSettings.emailTracking,
         supportEmail: emailSettings.supportEmail || null,
         emailDate: emailSettings.emailDate ? new Date(emailSettings.emailDate) : '',
         emailTime: emailSettings.emailTime || '',
      });
      setFromEmail(emailSettings.fromEmail || '');
   }, [emailSettings]);

   const handleInputChange = (name, value) => {
      setInputs({
         ...inputs,
         [name]: value,
      });
   };

   const onSave = () => {
      const data = {
         // fromEmail: inputs.fromEmail,
         replyEmail: inputs.replyEmail,
         fromName: inputs.fromName,
         emailDateTime: inputs.emailDateTime,
         emailTracking: inputs.emailTracking,
         supportEmail: inputs.supportEmail,
         emailDate: inputs.emailDate,
         emailTime: inputs.emailTime,
      };
      handleSaveFromEmail(data, false);
   };

   const handleChangeFromEmail = () => {
      changeFromEmailFunc({ fromEmail }, (res) => {
         if (res === true) {
            setOpenVerifyModal(true);
         }
      });
   };

   return (
      <div className='general__email'>
         <Info
            title={ `Choose a marketing email domain to align with your branding. The current default is a ${ inputs.fromEmail }. To use a custom domain for enhanced brand authority, enter it in the settings, click 'Save', and update your DNS with the provided records.` }
         />
         <div className='general__email__inputs'>
            <div>
               <Input
                  value={ fromEmail }
                  onChange={ (name, value) => setFromEmail(value) }
                  label='From Email'
                  name='fromEmail'
                  helpText='Default Email Address'
               // disabled={ true }
               />
               {emailSettings && emailSettings.panding_from_email
             && emailSettings.panding_from_email.email && emailSettings.panding_from_email.is_verify === 0
             && (
                <div style={ { paddingTop: '8px' } }>
                   <Text
                      inner={ `${ emailSettings.panding_from_email.email } not verified` }
                      size={ txtSizes.xsmall }
                      type={ txtTypes.regularDefaultSmall }
                      style={ { color: '#727978' } }
                   />
                </div>
             )
               }
               <BaseButton
                  text='Verify Email'
                  className='settings-email-save'
                  onClick={ () => handleChangeFromEmail() }
                  disabled={ inputs.fromEmail === fromEmail || !fromEmail }
               />
               {loadingFromEmail && <LoaderSpinner />}
               {openVerifyModal && (
                  <VerifyEmailModal
                     resendCode={ changeFromEmailFunc }
                     fromEmail={ fromEmail }
                     onClose={ () => { getSettings(); setOpenVerifyModal(false); } } />
               )}
            </div>

            {inputs.supportEmail !== null ? (
               <div className='general__email__support'>
                  <Input
                     value={ inputs.supportEmail }
                     onChange={ handleInputChange }
                     label='Support From Email'
                     name='supportEmail'
                  />
                  <div className='general__email__support__trash' role='presentation' onClick={ () => handleInputChange('supportEmail', null) }>
                     <IconNew name='EmailRemoveM' />
                  </div>
               </div>
            ) : (
               <div className='general__email__plus' role='presentation' onClick={ () => handleInputChange('supportEmail', '') }>
                  <IconNew name='PlusSupportM' />
                  <Text
                     inner='Add Support Email'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefaultSmall }
                     style={ { color: '#24554E' } }
                  />
               </div>
            )}

            <Input
               value={ inputs.fromName }
               onChange={ handleInputChange }
               label='From Whom'
               name='fromName'
            />

            <Input
               value={ inputs.replyEmail }
               onChange={ handleInputChange }
               label='Reply-to Email Address'
               name='replyEmail'
            />
         </div>
         <div className='divider' />
         <div className='general__email__time'>
            <Text
               inner='Time To Send Sequences'
               type={ txtTypes.mediumSmall }
               size={ txtSizes.medium }
            />
            <CheckList
               items={ TimeVariants }
               values={ inputs.emailDateTime }
               onChange={ (value) => handleInputChange('emailDateTime', value) }
            />
            { inputs.emailDateTime !== 'soon' && (
               <div className='general__email__time__bottom'>
                  <Input
                     type='date'
                     value={ inputs.emailDate }
                     name='emailDate'
                     onChange={ handleInputChange }
                     placeholder='Select Date'
                  />
                  <Input
                     type='time'
                     value={ inputs.emailTime }
                     name='emailTime'
                     onChange={ handleInputChange }
                     placeholder='Enter the send time'
                  />
               </div>
            )}
         </div>
         <div className='divider' />
         <div className='general__email__tracking'>
            <Text
               inner='Email Tracking And Analytics'
               type={ txtTypes.mediumSmall }
               size={ txtSizes.medium }
            />
            <Text
               inner='Monitor recipient behavior with metrics like opens, clicks, and bounces. Untoggle to disable open tracking for privacy. '
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978', paddingBottom: '4px' } }
            />
            <SwitchNew
               value={ inputs.emailTracking }
               onChange={ (value) => handleInputChange('emailTracking', value) }
               size='medium'
               label='Enable Email Tracking and Analytics'
            />
         </div>
         <div className='divider' />
         <div className='general__email__preview'>
            <div className='general__email__preview__left'>
               <img src={ preview } alt='' />
            </div>
            <div className='general__email__preview__right'>
               <div className='general__email__preview__right__item'>
                  <Text
                     inner='From:  '
                     type={ txtTypes.mediumLarge }
                     size={ txtSizes.small }
                  />
                  <Text
                     inner={ `${ inputs.fromName }<${ inputs.fromEmail || '' }>` }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
               <div className='general__email__preview__right__item'>
                  <Text
                     inner='Reply-to:  '
                     type={ txtTypes.mediumLarge }
                     size={ txtSizes.small }
                  />
                  <Text
                     inner={ `${ inputs.fromName } ${ inputs.replyEmail }` }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
            </div>
         </div>
         <BaseButton
            text='Save Changes'
            className='settings-email-save'
            onClick={ () => onSave() }
         />
      </div>
   );
};

GeneralEmailSettingsPage.propTypes = {
   emailSettings: PropTypes.object,
   handleSaveFromEmail: PropTypes.func,
   getSettings: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => {
   return {
      getSettings: () => {
         dispatch(settingsGetOperation('emails'));
      },
   };
};

export default connect(() => {}, mapDispatchToProps)(GeneralEmailSettingsPage);
