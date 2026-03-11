import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import SettingsMenu from 'components/modules/settings/SettingsMenu';
import TabSwitch from 'components/elements/TabSwitch';
import IntegrationModule from 'components/modules/settings/Integration';
import classnames from 'classnames';
import Domains from 'containers/pages/admin/domains';
import WebHookMainContainer from 'containers/pages/admin/webHook';
import Language from 'components/modules/settings/Language';
import IconNew from 'components/elements/iconsSize';
import EmailsSettings from './EmailsSettings';
import Api from './Api';
import Taxes from './Taxes';
import GeneralSettings from './GeneralSettings';
import CodesSettings from './CodesSettings';
import CheckoutSettings from './CheckoutSettings';
import GlobalBranding from './GlobalBranding';


const Settings = (props) => {
   const {
      onSwitchTab,
      getSettingsInProgress,
      tabName,
      location,
      memberPermissions,
      app,
      isMobile,
   } = props;

   const [isOpenOnMob, setIsOpenOnMob] = useState(false);


   return (
      <TabSwitch
         onSwitchTab={ (tab) => {
            setIsOpenOnMob(false);
            onSwitchTab(tab);
         } }
         location={ location.hash === '#general' ? null : location }
         dataIsFetching={ getSettingsInProgress }
         initialTab={ memberPermissions() === 'support' ? 'webhooks' : 'general' }
      >
         <div className={ tabName === 'sites' ? 'd-settings settingsPage flex h-full w-full d-course-settings d-settings-domains' : 'd-settings settingsPage flex h-full w-full d-course-settings' }>

            <div
               className={ `content_left ${ isOpenOnMob ? 'opened' : 'closed' }` }
            >
               <div className='settings-content'>
                  {
                     isMobile && (
                        <div
                           className='settings-content-switcher'
                           role='presentation'
                           onClick={ () => setIsOpenOnMob(!isOpenOnMob) }
                        >
                           <IconNew name='ChevronLeftL' style={ !isOpenOnMob ? { transform: 'rotate(180deg)' } : {} } />
                        </div>
                     )
                  }
                  <TabSwitch.Tab>
                     <SettingsMenu memberPermissions={ memberPermissions } app={ app } />
                  </TabSwitch.Tab>
               </div>
            </div>
            <div
               className='content_right'
            >
               <div className={ classnames('rightSide') }>
                  {memberPermissions() === 'admin' && (
                     <TabSwitch.Content>
                        <GeneralSettings
                           tabId='general'
                        />
                        <EmailsSettings
                           tabId='emails'
                           { ...props }
                        />
                        <Taxes
                           tabId='taxes'
                        />
                        <IntegrationModule
                           tabId='integrations'
                           { ...props }
                        />
                        <CodesSettings
                           tabId='codessettings'
                           { ...props }
                        />
                        <CheckoutSettings
                           tabId='checkoutsettings'
                           { ...props }
                        />
                        <GlobalBranding
                           tabId='globalbranding'
                           { ...props }
                        />
                        <Domains
                           tabId='sites'
                           { ...props }
                        />
                        <WebHookMainContainer
                           tabId='webhooks'
                        />
                        <Api
                           tabId='api'
                           { ...props }
                        />
                        <Language
                           tabId='language'
                           { ...props }
                        />
                     </TabSwitch.Content>
                  )}
                  {(memberPermissions() === 'subAdminAssistant') && (
                     <TabSwitch.Content>
                        <GeneralSettings
                           tabId='general'
                        />
                        <EmailsSettings
                           tabId='emails'
                           { ...props }
                        />
                        <Taxes
                           tabId='taxes'
                        />
                        <CodesSettings
                           tabId='codessettings'
                           { ...props }
                        />
                        <CheckoutSettings
                           tabId='checkoutsettings'
                           { ...props }
                        />
                        <GlobalBranding
                           tabId='globalbranding'
                           { ...props }
                        />
                        <Domains
                           tabId='sites'
                           { ...props }
                        />
                        <WebHookMainContainer
                           tabId='webhooks'
                        />
                        <Api
                           tabId='api'
                           { ...props }
                        />
                        <Language
                           tabId='language'
                           { ...props }
                        />
                     </TabSwitch.Content>
                  )}
               </div>
            </div>
         </div>
      </TabSwitch>
   );
};

Settings.propTypes = {
   integrationProducts: PropTypes.array,
   onSwitchTab: PropTypes.func,
   getSettingsInProgress: PropTypes.bool,
   tabName: PropTypes.string,
   location: PropTypes.object,
   memberPermissions: PropTypes.func,
   app: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default Settings;
