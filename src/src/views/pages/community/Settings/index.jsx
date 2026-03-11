import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import TabSwitch from 'components/elements/TabSwitch';
import QueryParams from 'utils/QueryParams';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
// import Icon from 'components/elements/Icon';
// import ReactTooltip from 'react-tooltip';
import IconNew from 'components/elements/iconsSize';
import CommunitySettingsMenu from './SettingsComponents/CommunitySettingsMenu';
import CommunitySettingsGeneral from './SettingsComponents/CommunitySettingsGeneral';
import CommunitySettingsBranding from './SettingsComponents/CommunitySettingsBranding';
import CommunitySettingsNotifications from './SettingsComponents/CommunitySettingsNotifications';
import CommunitySettingsMessaging from './SettingsComponents/CommunitySettingsMessaging';
import CommunitySettingsSeo from './SettingsComponents/CommunitySettingsSeo';
import CommunitySettingsCategories from './SettingsComponents/CommunitySettingsCategories';
import CommunitySettingsAnalytics from './SettingsComponents/CommunitySettingsAnalytics';

const CommunitySettingsView = ({
   settings, saveSettings, community, courses,
}) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleSaveChanges = (inputs, parentKey, courses) => {
      saveSettings(QueryParams.getHash(), inputs, parentKey, courses);
   };
   return (
      <div className='community__settings'>
         <div className='community__settings__top'>
            <Text
               inner='Settings'
               type={ txtTypes.regularMin }
               size={ txtSizes.size_28 } />
            {/* <div className='tooltip' data-tip='asd'>
               <Icon name='ToolTip' className='backIcon' />
               <ReactTooltip />
            </div> */}
         </div>
         <div className='community__settings__bottom'>
            <TabSwitch
               initialTab='general'
               onSwitchTab={ () => {
                  setIsOpen(false);
               } }
            >
               <div
                  className={ `community__settings__bottom__left ${ isOpen ? 'opened' : 'closed' }` }
               >
                  <div
                     className='community__settings_switcher'
                     role='presentation'
                     onClick={ () => setIsOpen(!isOpen) }
                  >
                     <IconNew name='ChevronLeftL' style={ !isOpen ? { transform: 'rotate(180deg)' } : {} } />
                  </div>
                  <TabSwitch.Tab>
                     <CommunitySettingsMenu />
                  </TabSwitch.Tab>
               </div>
               <div className='community__settings__bottom__right scroll'>
                  <TabSwitch.Content>
                     <CommunitySettingsGeneral
                        tabId='general'
                        courses={ courses }
                        community={ community }
                        onSave={ (inputs) => handleSaveChanges(inputs, 'general_settings', courses) }
                        settings={ settings.general_settings }
                     />
                     <CommunitySettingsBranding
                        tabId='branding'
                        courses={ courses }
                        community={ community }
                        onSave={ (inputs) => handleSaveChanges(inputs, 'branding') }
                        settings={ settings.branding || {} }
                     />
                     <CommunitySettingsCategories
                        tabId='categories'
                     />
                     <CommunitySettingsAnalytics
                        tabId='analytics'
                        community={ community }
                     />
                     <CommunitySettingsNotifications
                        tabId='notifications'
                        onSave={ (inputs) => handleSaveChanges(inputs, 'community_notification_settings') }
                        settings={ settings.community_notification_settings }
                     />
                     <CommunitySettingsMessaging
                        tabId='messaging'
                        onSave={ (inputs) => handleSaveChanges(inputs, 'community_messaging_settings') }
                        settings={ settings.community_messaging_settings }
                     />
                     <CommunitySettingsSeo
                        onSave={ (inputs) => handleSaveChanges(inputs, 'community_seo') }
                        tabId='seo'
                        settings={ settings.community_seo }
                     />
                  </TabSwitch.Content>
               </div>
            </TabSwitch>
         </div>
      </div>
   );
};

CommunitySettingsView.propTypes = {
   settings: PropTypes.object,
   saveSettings: PropTypes.func,
   community: PropTypes.object,
   courses: PropTypes.array,
};

export default CommunitySettingsView;
