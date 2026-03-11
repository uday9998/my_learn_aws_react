import React from 'react';
import SettingItem from 'components/elements/designCourse/settings/SettingItem';
import PropTypes from 'prop-types';

const LandingSettingsMenu = ({ TabConsumer }) => {
   const { activeTab, switchTab } = TabConsumer;
   return (
      <div className='settingsMenu'>
         <SettingItem
            text='General Settings'
            active={ activeTab === 'general_settings' }
            tabId='general_settings'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />
         <SettingItem
            text='SEO and Social Sharing'
            active={ activeTab === 'seo_and_social_sharing' }
            tabId='seo_and_social_sharing'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />
      </div>
   );
};

LandingSettingsMenu.propTypes = {
   TabConsumer: PropTypes.any,
};

export default LandingSettingsMenu;
