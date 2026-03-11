import React, { useState } from 'react';
import './index.scss';
import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import PropTypes from 'prop-types';
import DesignEmailSettingsPage from './EmailSettingsPages/Design';
import NotificationsEmailSettingsPage from './EmailSettingsPages/Notifications';
import UnsubscribeEmailSettingsPage from './EmailSettingsPages/Unsubscribe';
import GeneralEmailSettingsPage from './EmailSettingsPages/General';

const tabOptions = [
   { key: 'General', value: 'general', iconName: 'GeneralEmailSettingsM' },
   { key: 'Email Design', value: 'design', iconName: 'DesignEmailSettingsM' },
   { key: 'Email Notifications', value: 'notify', iconName: 'NotificationsEmailSettingsM' },
   // { key: 'Unsubscribe Survey', value: 'unsubscribe', iconName: 'UnsubscribeEmailSettingsM' },
];

const EmailsSettings = (props) => {
   const [selectedTab, setSelectedTab] = useState('general');
   const { isFetchingNotifications } = props;
   const getPage = () => {
      switch (selectedTab) {
         case 'design':
            return (<DesignEmailSettingsPage { ...props } />);
         case 'notify':
            return (<NotificationsEmailSettingsPage { ...props } />);
         case 'unsubscribe':
            return (<UnsubscribeEmailSettingsPage />);
         default:
            return (<GeneralEmailSettingsPage { ...props } />);
      }
   };

   return (
      <InnerWrapper
         hasTabs={ true }
         selectedPage={ selectedTab }
         setSelectedPage={ setSelectedTab }
         tabName={ tabOptions }
         title='Email Settings'
         tooltip='this is email page'
      >
         {!isFetchingNotifications ? getPage() : (
            <LoaderSpinner />
         )}
      </InnerWrapper>
   );
};

EmailsSettings.propTypes = {
   isFetchingNotifications: PropTypes.bool,
};


export default EmailsSettings;
