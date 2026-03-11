import React, { useState } from 'react';
import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getGlobalBranding, updateGlobalBranding } from 'api/AuthApi';
import withLoading from 'utils/withLoading';
import DeleteModal from 'components/elements/DeleteModal';
import General from './General';
import Email from './Email';
import LegalPages from './LegalPages';

const GeneralLoading = withLoading(General);
const EmailLoading = withLoading(Email);
const LegalPagesLoading = withLoading(LegalPages);

const tabsSelector = [
   { value: 'general', key: 'General', iconName: 'customizeM' },
   // { value: 'email', key: 'Signature for Email', iconName: 'emailM' },
   { value: 'legal', key: 'Legal Pages', iconName: 'legalM' },
];

const GlobalBranding = () => {
   const [selectedPage, setSelectedPage] = useState(window.legalPages ? 'legal' : 'general');
   const {
      data: globalBranding, loading, setData: setGlobalBranding,
   } = useApiQuery(getGlobalBranding);

   const [updateGlobalBrandingFunc, { loading: updateLoading }] = useSubmitForm(updateGlobalBranding, {
      successMessage: 'Global branding has been changed.',
   });

   const [openDeleteModal, setOpenDeletModal] = useState('');
   const [isChanged, setIsChanged] = useState(false);
   const delModalApproveClick = () => {
      const socialAccounts = globalBranding.global_branding_signature_email.social_accounts.filter(
         social => social.id !== openDeleteModal);
      setGlobalBranding({
         ...globalBranding,
         global_branding_signature_email: {
            ...globalBranding.global_branding_signature_email,
            social_accounts: socialAccounts,
         },
      });
      setOpenDeletModal('');
   };

   const onChange = (name, value, type, social, editableId) => {
      setIsChanged(true);
      if (editableId) {
         const socialAccount = globalBranding.global_branding_signature_email.social_accounts.filter(
            sociall => sociall.id === editableId)[0];
         socialAccount.name = name;
         socialAccount.link = value;
      } else if (social) {
         setGlobalBranding({
            ...globalBranding,
            [type]: {
               ...globalBranding[type],
               [social]: [
                  ...globalBranding.global_branding_signature_email.social_accounts,
                  {
                     name,
                     link: value,
                     id: (new Date()).toString(),
                  },
               ],
            },
         });
      } else {
         setGlobalBranding({
            ...globalBranding,
            [name]: value,
         });
      }

      // else if (type) {
      //    setGlobalBranding({
      //       ...globalBranding,
      //       [name]: value,
      //       [type]: {
      //          ...globalBranding[type],
      //          [name]: value,
      //       },
      //    });
      // }
   };

   const saveGeneral = (data) => {
      if (isChanged) {
         updateGlobalBrandingFunc(data, () => {
            setIsChanged(false);
         });
      }
   };

   const getSelectedPages = () => {
      if (selectedPage === 'general') {
         return (
            <GeneralLoading
               isLoading={ loading || updateLoading }
               onChange={ onChange }
               globalBranding={ globalBranding }
               saveGeneral={ saveGeneral }
               isChanged={ isChanged }
            />
         );
      }
      if (selectedPage === 'email') {
         return (
            <EmailLoading
               isLoading={ loading || updateLoading }
               globalBranding={ globalBranding }
               onChange={ onChange }
               saveGeneral={ saveGeneral }
               setOpenDeletModal={ setOpenDeletModal }
               isChanged={ isChanged }
            />
         );
      }
      return (
         <LegalPagesLoading
            isLoading={ loading || updateLoading }
            globalBranding={ globalBranding }
            onChange={ onChange }
            saveGeneral={ saveGeneral }
            isChanged={ isChanged }
         />
      );
   };

   return (
      <>
         <InnerWrapper
            title='Global Branding'
            hasTabs={ true }
            tabName={ tabsSelector }
            selectedPage={ selectedPage }
            setSelectedPage={ setSelectedPage }
         >
            {getSelectedPages()}
         </InnerWrapper>
         {
            openDeleteModal && (
               <DeleteModal
                  title='Are you sure you want to delete this link?'
                  deleteText='Delete'
                  onDelete={ (e) => { delModalApproveClick(e); } }
                  onCancel={ () => setOpenDeletModal('') }
               />
            )
         }
      </>
   );
};

GlobalBranding.propTypes = {
};

export default GlobalBranding;
