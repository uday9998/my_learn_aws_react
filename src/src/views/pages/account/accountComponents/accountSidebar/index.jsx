import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import SettingItem from 'components/elements/designCourse/settings/SettingItem';
import Text, { SIZES as txtSize, TYPES as txtTypes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

const AccountSideBar = ({
   TabConsumer,
   onLogout,
   isOpenOnMob,
   setisOpenOnMob,
}) => {
   const { activeTab, switchTab } = TabConsumer;
   return (
      <div className='account__side'>
         <div className='account__side__top'>
            {/* <SettingItem
               text='Personal Information'
               active={ activeTab === 'personal' }
               tabId='personal'
               iconName='AccountM'
               switchTab={ (tab) => {
                  setisOpenOnMob(false);
                  switchTab(tab);
               } }
            /> */}
            <SettingItem
               text='Billing'
               active={ activeTab === 'billing' }
               tabId='billing'
               iconName='BilingAccountM'
               switchTab={ (tab) => {
                  setisOpenOnMob(false);
                  switchTab(tab);
               } }
            />
            <SettingItem
               text='Plans'
               active={ activeTab === 'plans' }
               tabId='plans'
               iconName='PlansAccountM'
               switchTab={ (tab) => {
                  setisOpenOnMob(false);
                  switchTab(tab);
               } }
            />

            <div
               className='account__side__top__switcher'
               role='presentation'
               onClick={ () => setisOpenOnMob(!isOpenOnMob) }
            >
               <IconNew name='ChevronLeftL' style={ !isOpenOnMob ? { transform: 'rotate(180deg)' } : {} } />
            </div>
         </div>
         <div className='account__side__bottom' role='presentation' onClick={ () => onLogout('OFFERS') }>
            <IconNew name='LogoutAccountM' />
            <Text
               inner='Log Out'
               type={ txtTypes.regularDefault }
               size={ txtSize.small }
            />
         </div>
      </div>
   );
};

AccountSideBar.propTypes = {
   onLogout: PropTypes.func,
   TabConsumer: PropTypes.any,
   isOpenOnMob: PropTypes.bool,
   setisOpenOnMob: PropTypes.func,
};

export default AccountSideBar;
