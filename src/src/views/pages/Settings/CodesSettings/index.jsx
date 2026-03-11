import React, { useEffect, useState } from 'react';
import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import WebHookMainContainer from 'containers/pages/admin/webHook';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import Api from '../Api';
import SchoolCodesSettings from '../SchoolCodes';
import GoogleVerification from '../GoogleVerification';

const tabsSelector = [
   { value: 'api', key: 'API', iconName: 'SettingsApiM' },
   { value: 'webhooks', key: 'Webhooks', iconName: 'SettingsWebhookM' },
   { value: 'googleverification', key: 'Google Verification', iconName: 'SettingsGoogleM' },
   { value: 'codesschool', key: 'Codes for Portal', iconName: 'SettingsCodesM' },
];

const CodesSettings = (props) => {
   const [selectedPage, setSelectedPage] = useState('api');
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');

   useEffect(() => {
      if (!Array.isArray(permissions)) {
         if (permissions.api) {
            setSelectedPage('api');
         } else {
            setSelectedPage('webhooks');
         }
      } 
   }, []);

   const handleSelectTab = (selectTab) => {
      if (!Array.isArray(permissions)) {
         if (!permissions.api && selectTab === 'api') {
            setPopupTitle('API');
            setShowPopup(true);
         } else {
            setSelectedPage(selectTab);
         }
      } else {
         setSelectedPage(selectTab);
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   const getSelectedPages = () => {
      if (selectedPage === 'webhooks') {
         return <WebHookMainContainer />;
      } if (selectedPage === 'googleverification') {
         return <GoogleVerification { ...props } />;
      }
      if (selectedPage === 'codesschool') {
         return <SchoolCodesSettings { ...props } />;
      }
      
      return (
         <Api
            { ...props }
         />
      );
   };

   return (
      <InnerWrapper title='Codes Settings' hasTabs={ true } tabName={ tabsSelector } selectedPage={ selectedPage } setSelectedPage={ handleSelectTab }>
         {
            showPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ handleClosePopup } />, document.body)
         }
         {getSelectedPages()}
      </InnerWrapper>
   );
};

CodesSettings.propTypes = {
};

export default CodesSettings;
