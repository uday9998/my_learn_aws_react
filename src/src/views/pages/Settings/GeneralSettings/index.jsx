import React, { useMemo, useState, useEffect } from 'react';
import useForms from 'utils/hooks/useForms/index';
import { getSettings, getSettingsByGroup, putAccountSettings } from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import GeneralSettingsContent from 'components/modules/settings/GeneralSettings';
import SettingsList from 'components/modules/settings/SettingsList';
import getDeff from 'utils/getDeff';
import addonReducer, { ACTIONS } from './addonReducer';

const GeneralSettings = () => {
   const [selectedPage, setSelectedPage] = useState('personal');
   const forms = useMemo(() => {
      return [
         { key: 'address', fetchAction: getSettingsByGroup.bind(null, 'address') },
         { key: 'account', fetchAction: getSettings.bind(null, 'account') },
         { key: 'domain', fetchAction: getSettingsByGroup.bind(null, 'domain') },
         { key: 'seo', fetchAction: getSettingsByGroup.bind(null, 'seo') },
         { key: 'branding', fetchAction: getSettingsByGroup.bind(null, 'branding') },
      ];
   }, []);

   const [setSettings, { loading: loadingAccount }] = useSubmitForm(putAccountSettings, {
      successMessage: 'Changes saved successfully.',
   });

   const {
      state, onChange, onCancel, onSaveCache, setActiveForm,
      onSave, dispatch,
   } = useForms(forms, 'account', addonReducer);
   const [account, setAccount] = useState(state.account && state.account.data);

   useEffect(() => {
      setAccount(state.account && state.account.data);
   }, [state.account && state.account.data]);

   const onDomainAddSuccess = (domain) => {
      dispatch(ACTIONS.createDomainCompleted(domain));
   };
   const onDomainDeleteCompleted = () => {
      dispatch(ACTIONS.deleteDomainCompleted());
   };

   const onSaveAccountInformation = (inputs) => {
      const deff = getDeff(state.account && state.account.data, inputs);

      setSettings(deff, () => {
         setAccount(inputs);
      });
   };

   return (
      <SettingsList
         state={ state }
         onChange={ onChange }
         onCancel={ onCancel }
         onSaveSuccess={ onSaveCache }
         onOpen={ setActiveForm }
         onSave={ onSave }
         selectedPage={ selectedPage }
         setSelectedPage={ setSelectedPage }
         initial='account'
      >
         <GeneralSettingsContent
            id='account'
            account={ account }
            loading={ loadingAccount }
            onSaveAccountInformation={ onSaveAccountInformation }
            title='General Settings'
            selectedPage={ selectedPage }
            onDomainAddSuccess={ onDomainAddSuccess }
            onDomainDeleteCompleted={ onDomainDeleteCompleted }
         />
      </SettingsList>
   );
};

GeneralSettings.propTypes = {
};

export default GeneralSettings;
