import React from 'react';
import PropTypes from 'prop-types';
import SettingItem from 'components/elements/designCourse/settings/SettingItem';

const CommunitySettingsMenu = ({ TabConsumer }) => {
   const { activeTab, switchTab } = TabConsumer;
   return (
      <div className='settingsMenu'>
         <SettingItem
            text='General Settings'
            active={ activeTab === 'general' }
            tabId='general'
            iconName='GeneralSettingsM'
            switchTab={ switchTab }
         />
          
         <SettingItem
            text='Community Branding'
            active={ activeTab === 'branding' }
            tabId='branding'
            iconName='GlobalSettingsM'
            switchTab={ switchTab }
         />
         <SettingItem
            text='Community Categories'
            active={ activeTab === 'categories' }
            tabId='categories'
            iconName='CategoriesProductM'
            switchTab={ switchTab }
         />
         <SettingItem
            text='Community Analytics'
            active={ activeTab === 'analytics' }
            tabId='analytics'
            iconName='AnalyticsM'
            switchTab={ switchTab }
         />
         <SettingItem
            text='Community Notifications'
            active={ activeTab === 'notifications' }
            tabId='notifications'
            iconName='CommunityNotificationsM'
            switchTab={ switchTab }
         />
         <SettingItem
            text='Community Messaging'
            active={ activeTab === 'messaging' }
            tabId='messaging'
            iconName='CommunityMessagingM'
            switchTab={ switchTab }
         />
         {/* <SettingItem
            text='Domain'
            active={ activeTab === 'domain' }
            tabId='domain'
            iconName='CommunityMessagingM'
            switchTab={ switchTab }
         /> */}
         <SettingItem
            text='SEO'
            active={ activeTab === 'seo' }
            tabId='seo'
            iconName='CommunitySeoM'
            switchTab={ switchTab }
         />
      </div>
   );
};

CommunitySettingsMenu.propTypes = {
   TabConsumer: PropTypes.object,
};

export default CommunitySettingsMenu;
