import React from 'react';
// import './index.scss';
import PropTypes from 'prop-types';
import SettingItem from 'components/elements/designCourse/settings/SettingItem';


const SettingsMenu = ({ TabConsumer }) => {
   const { activeTab, switchTab } = TabConsumer;
   return (
      <div className='mob-settingsMenu'>
         <SettingItem
            text='Class Details'
            tabId='course-details'
            active={ activeTab === 'course-details' }
            switchTab={ switchTab }
         />
         <div className='m-t-exs'>
            <SettingItem
               text='Instructor Details'
               tabId='instructor-details'
               active={ activeTab === 'instructor-details' }
               switchTab={ switchTab }
            />
         </div>
         {/* <div className='m-t-exs'>
            <SettingItem
               text='SEO'
               tabId='seo'
               active={ activeTab === 'seo' }
               switchTab={ switchTab }
            />
         </div> */}
         <div className='m-t-exs'>
            <SettingItem
               text='Watch Room'
               tabId='site-changes'
               active={ activeTab === 'site-changes' }
               switchTab={ switchTab }
            />
         </div>
         {/* <div className='m-t-exs'>
            <SettingItem
               text='Thank You Page'
               tabId='thank-you-page'
               active={ activeTab === 'thank-you-page' }
               switchTab={ switchTab }
            />
         </div> */}
         <div className='m-t-exs'>
            <SettingItem
               text='Completion Message'
               tabId='completion-message'
               active={ activeTab === 'completion-message' }
               switchTab={ switchTab }
            />
         </div>
      </div>
   );
};

SettingsMenu.propTypes = {
   TabConsumer: PropTypes.any,
};

export default SettingsMenu;
