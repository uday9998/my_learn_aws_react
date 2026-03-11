import React from 'react';
import SettingItem from 'components/elements/designCourse/settings/SettingItem';
import PropTypes from 'prop-types';
import './index.scss';

const SettingsMenu = ({ TabConsumer, memberPermissions, app }) => {
   const { activeTab, switchTab } = TabConsumer;

   return (
      <div className='settingsMenu'>
         {memberPermissions() !== 'support' && (
            <SettingItem
               text='General Settings'
               active={ activeTab === 'general' }
               tabId='general'
               iconName='GeneralSettingsM'
               switchTab={ switchTab }
            />
         )}
         {memberPermissions() !== 'support' && (
            <SettingItem
               text='Email Settings'
               active={ activeTab === 'emails' }
               tabId='emails'
               iconName='EmailSettingsM'
               switchTab={ switchTab }
            />
         )}
         {memberPermissions() !== 'support' && memberPermissions() !== 'subAdminAssistant' && (
            <SettingItem
               text='Integrations'
               active={ activeTab === 'integrations' }
               tabId='integrations'
               iconName='IntegrationSettingsM'
               switchTab={ switchTab }
            />
         )}
         {memberPermissions() !== 'support' && (
            <SettingItem
               text='Taxes'
               active={ activeTab === 'taxes' }
               tabId='taxes'
               iconName='TaxesSettingsM'
               switchTab={ switchTab }
            />
         )}
         {!!app.is_main && memberPermissions() !== 'support' && (
            <SettingItem
               text='Sites'
               active={ activeTab === 'sites' }
               tabId='sites'
               iconName='SitesSettingsM'
               switchTab={ switchTab }
            />
         )}
         {/* <SettingItem
            text='Video Analytics'
            active={ activeTab === 'videoanalytics' }
            tabId='videoanalytics'
            switchTab={ switchTab }
         />
         <SettingItem
            text='Webhooks'
            active={ activeTab === 'webhooks' }
            tabId='webhooks'
            switchTab={ switchTab }
         />
         <SettingItem
            text='API'
            active={ activeTab === 'api' }
            tabId='api'
            switchTab={ switchTab }
         /> */}
         {memberPermissions() !== 'support' && (
            <SettingItem
               text='Global Branding'
               active={ activeTab === 'globalbranding' }
               tabId='globalbranding'
               iconName='GlobalSettingsM'
               switchTab={ switchTab }
            />
         )}
         {memberPermissions() !== 'support' && (
            <SettingItem
               text='Checkout Settings'
               active={ activeTab === 'checkoutsettings' }
               tabId='checkoutsettings'
               iconName='CheckoutSettingsM'
               switchTab={ switchTab }
            />
         )}
         {memberPermissions() !== 'support' && (
            <SettingItem
               text='Codes Settings'
               active={ activeTab === 'codessettings' }
               tabId='codessettings'
               iconName='CodesSettingsM'
               switchTab={ switchTab }
            />
         )}

         <SettingItem
            text='Languages'
            active={ activeTab === 'language' }
            tabId='language'
            iconName='LanguageSettingsM'
            switchTab={ switchTab }
         />
      </div>
   );
};

SettingsMenu.propTypes = {
   TabConsumer: PropTypes.any,
   memberPermissions: PropTypes.func,
   app: PropTypes.object,
};

export default SettingsMenu;
