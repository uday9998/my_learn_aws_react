import React from 'react';
import './index.mob.scss';
import SettingItem from 'components/elements/designCourse/settings/SettingItem';

const SettingsMenu = () => {
   return (
      <div className='mob-settingsMenu'>
         <SettingItem
            text='Class Details'
         />
         <div className='m-t-exs'>
            <SettingItem
               text='Instructor Details'
            />
         </div>
         <div className='m-t-exs'>
            <SettingItem
               text='Seo'
            />
         </div>
         <div className='m-t-exs'>
            <SettingItem
               text='Watch Room Changes'
            />
         </div>
      </div>
   );
};

export default SettingsMenu;
