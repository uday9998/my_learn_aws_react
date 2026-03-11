import React from 'react';
import SettingItem from 'components/elements/designCourse/settings/SettingItem';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-polyglot';

const AccountMenu = ({ TabConsumer }) => {
   const { activeTab, switchTab } = TabConsumer;
   const t = useTranslate();
   return (
      <div className='settingsMenu'>
         <SettingItem
            text={ t('account') }
            active={ activeTab === 'account' }
            tabId='account'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />
         <SettingItem
            text={ t('past_orders') }
            active={ activeTab === 'orders' }
            tabId='orders'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />
         <SettingItem
            text='My Classes'
            active={ activeTab === 'courses' }
            tabId='courses'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />
         <SettingItem
            text={ t('certificates') }
            active={ activeTab === 'certificates' }
            tabId='certificates'
            switchTab={ switchTab }
         />
         {/**  <SettingItem
            text='Emails'
            active={ activeTab === 'emails' }
            tabId='emails'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />
         <SettingItem
            text='Mainhub'
            active={ activeTab === 'mainhub' }
            tabId='mainhub'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />
         <SettingItem
            text='Class'
            active={ activeTab === 'courses' }
            tabId='courses'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />

         <SettingItem
            text='Connect'
            active={ activeTab === 'connect' }
            tabId='connect'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />
         <SettingItem
            text='Integrations'
            active={ activeTab === 'integrations' }
            tabId='integrations'
            switchTab={ switchTab }
         />
         <div className='m-t-exs' />
         <SettingItem
            text='Video Analytics'
            active={ activeTab === 'videoanalytics' }
            tabId='videoanalytics'
            switchTab={ switchTab }
         /> */}
      </div>
   );
};

AccountMenu.propTypes = {
   TabConsumer: PropTypes.any,
};

export default AccountMenu;
