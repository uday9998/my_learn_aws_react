import React, { useState } from 'react';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';
import PricingPopup from 'components/elements/PricingPopup';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import Icon from 'components/elements/Icon';
import Tabs from 'components/elements/tabs';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as TextSize, TYPES as TextType } from 'components/elements/TextNew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import FormActions from 'components/elements/form/FormActions';
import {
   createLandingDomain,
   deleteAccountDomain, deleteCustomDomains, getAllLandingDomains, updateAccountDomain, updateSettings,
} from 'api';
import { copyToClipBoard } from 'utils/copy.js';
import ModalNew from 'components/elements/ModalNew';
import { useApiQuery } from 'utils/hooks/useQuery';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import CreateDomainModal from './CreateDomainModal';
import AccountInputEdit from './AccountInputEdit';
import './index.scss';
import CustomDomainItem from './CustomDomain';

const apiUrl = process.env.REACT_APP_MAIN_DOMAIN;

const Domain = ({
   form, onChange, onCancel, onSave, onDomainDeleteCompleted,
   onDomainAddSuccess,
}) => {
   const [domainEdit, setDomainEdit] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const { permissions } = useSelector(siteInfoSelector);
   // const [subdomainEdit, setSubdomainEdit] = useState(false);
   const [changeDomain, setChangeDomain] = useState(0);
   const [isOpenNewLandingDomainModal, setIsOpenNewLandingDomainModal] = React.useState(false);
   const [domainModalOpen, setDomainModalOpen] = useState(false);
   const [createDomain] = useSubmitForm(updateSettings('account'));
   const [deleteDomain] = useSubmitForm(deleteAccountDomain);
   const [handleDeleteCustomDomain] = useSubmitForm(deleteCustomDomains);
   const { data: domains, setData: changeDomains } = useApiQuery(getAllLandingDomains);
   const [updateDomain] = useSubmitForm(updateAccountDomain, {
      successMessage: 'Custom Domain has been changed.',
   });
   const [addLandingDomain] = useSubmitForm(createLandingDomain);
   const [popupTitle, setPopupTitle] = useState('');
   // const domains = [
   //    {
   //       'id': 7,
   //       'site_uuid': '9e0a5717dc9b75a5886e2192b4d41e79',
   //       'domain': 'mymember.site',
   //       'is_domain_pointed': 1,
   //       'is_www_domain_pointed': 1,
   //       'is_https_active': 0,
   //       'is_used': 1,
   //       'is_verficated': 0,
   //       'created_at': '2023-04-20T10:33:41.000000Z',
   //       'updated_at': '2023-04-20T10:35:27.000000Z',
   //    },
   // ];
   const handleSave = (inputs, onSuccess) => {
      createDomain(inputs, () => {
         onSuccess();
         window.location = `${ process.env.REACT_APP_PROTOCOL }${ inputs.subdomain }.${ process.env.REACT_APP_MAIN_DOMAIN }?jwt-token=${ localStorage.getItem('authToken') }`;
      });
   };

   const handleDelete = (id) => {
      handleDeleteCustomDomain(id, () => {
         if (isPrint('Domain deleted successfuly.')) {
            toast.success('Domain deleted successfuly.');
         }
         changeDomains(domains.filter((e) => e.id !== id));
      });
   };

   const handleChangeTab = (value) => {
      if (!Array.isArray(permissions)) {
         if (permissions.custom_domain) {
            setChangeDomain(value);
         } else {
            setPopupTitle('Custom Domain');
            setShowPopup(true);
         }
      } else {
         setChangeDomain(value);
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   const { data } = form;
   return (
      <div className='domain__wrapper'>
         {
            showPopup && createPortal(<PricingPopup 
               popupTitle={ popupTitle } 
               handleClosePopup={ handleClosePopup }
            />, document.body)
         }
         <div className='domainSettings'>
            {!domainModalOpen && (
               <Tabs
                  variants={ [{ value: 0, key: 'Subdomain' }, { value: 1, key: 'Custom' }] }
                  selectedVariant={ changeDomain }
                  onSelect={ (value) => handleChangeTab(value) }
               />
            )}
            { data.domain && data.domain !== null && changeDomain === 1
            && (
               <div className='m-b-exl m-t-exl settings__domain'>
                  <TextInput
                     placeholder='Enter custom domain here'
                     label='Custom Domain'
                     name='domain'
                     value={ data.domain }
                     onChange={ onChange }
                     onBlur={ () => {
                        setDomainEdit(false);
                        // onCancel();
                        // updateDomain({ domain: data.domain });
                     } }
                     disabled={ !domainEdit }
                     onKeyPress={ event => {
                        if (event.key === 'Enter') {
                           //  handleFormSubmit('info'); setDomainEdit(false); setSubdomainEdit(false);
                        }
                     } }
                  />
                  <AccountInputEdit
                     setDomainEdit={ setDomainEdit }
                     domainEdit={ domainEdit }
                     deleteAccountDomain={ (inputs) => {
                        deleteDomain(inputs, () => {
                           window.location.reload();
                           onDomainDeleteCompleted();
                        });
                     } }
                     updateDomain={ updateDomain }
                  />
                  <div className='domainStatus'>
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.xsmall }
                        inner='Domain status:'
                        style={ { color: '#8a94a2' } }
                     />
                     { data.is_domain_pointed ? <Icon name='CheckTrue' width='16px' height='16px' /> : <Icon name='CheckFalse' width='16px' height='16px' /> }
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.xsmall }
                        inner={ `${ data.domain }  is  ${ data.is_domain_pointed ? '' : 'not' }   currently pointing to Miestro` }
                        style={ { color: '#8a94a2' } }
                     />
                  </div>
                  <div className='domainStatus'>
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.xsmall }
                        inner='www status : '
                        style={ { color: '#8a94a2' } }
                     />
                     { data.is_www_domain_pointed ? <Icon name='CheckTrue' width='16px' height='16px' /> : <Icon name='CheckFalse' width='16px' height='16px' /> }
                     <Text
                        type={ TextType.normal }
                        size={ TextSize.xsmall }
                        inner={ `www.${ data.domain }  is  ${ data.is_www_domain_pointed ? '' : 'not' }   currently pointing to Miestro` }
                        style={ { color: '#8a94a2' } }
                     />
                  </div>
               </div>
            )}
            {changeDomain === 0
            && (
               <div className='m-b-exs settings__subdomain'>
                  <Input
                     id='subdomain'
                     label='Subdomain'
                     name='subdomain'
                     value={ data.subdomain }
                     onChange={ onChange }
                     maxlength='80'
                     // disabled={ !subdomainEdit }
                  />
                  <Text
                     inner={ `.${ apiUrl }` }
                     type={ TextType.regularDefault }
                     size={ TextSize.small }
                     style={ { color: '#727978' } }
                  />
                  <div role='presentation' onClick={ () => copyToClipBoard(`https://${ data.subdomain }.${ apiUrl }`) }>
                     <Icon name='copyNew' />
                  </div>
               </div>
            )}
            {
               !data.domain && changeDomain === 1 && !domainModalOpen && !isOpenNewLandingDomainModal && (
                  <div className='settings__domain'>
                     <div className='settings__domain__title'>
                        <Text
                           inner='Custom Domain'
                           type={ TextType.regularDefault }
                           size={ TextSize.medium }
                        />
                     </div>
                     <div className='domain__createBtn flex'>
                        <BaseButton
                           theme={ btnTheme.primary }
                           size={ btnSize.large }
                           text='Create Domain'
                           onClick={ () => setDomainModalOpen(true) }
                        />
                        <div className='m-l-s'>
                           <BaseButton
                              theme={ btnTheme.secondary }
                              size={ btnSize.large }
                              text='Learn More'
                              onClick={ () => window.open('https://support.miestro.com/article/262-custom-domain-settings', '_blank') }
                           />
                        </div>
                     </div>
                  </div>
               )
            }

            {
               domainModalOpen && (
                  <CreateDomainModal
                     setIsModalOpen={ setDomainModalOpen }
                     createDomain={
                        domain => {
                           updateDomain({ domain }, () => onDomainAddSuccess(domain));
                        } }
                     onSubmit={ () => {
                        setDomainModalOpen(false);
                     } }
                  />
               )
            }


            {changeDomain === 0 && (
               <FormActions
                  onSave={ () => {
                     onSave(form.data, handleSave);
                     setDomainEdit(false);
                  //    setSubdomainEdit(false);
                  } }
                  onCancel={ () => {
                     onCancel();
                     setDomainEdit(false);
                  //  setSubdomainEdit(false);
                  } }
                  cancelDisabled={ true }
                  saveText='Save Subdomain'
               />
            )}
            {data.domain && data.domain !== null && changeDomain === 1 && (
               <FormActions
                  onSave={ () => {
                     updateDomain({ domain: data.domain });
                     setDomainEdit(false);
                  } }
                  onCancel={ () => {
                     onCancel();
                     setDomainEdit(false);
                  } }
               />
            )}

         </div>
         {/* Landing Domain Create Modal */}
         {isOpenNewLandingDomainModal && (
            <ModalNew onCloseModal={ () => setIsOpenNewLandingDomainModal(false) }>
               <CreateDomainModal
                  setIsModalOpen={ setIsOpenNewLandingDomainModal }
                  createDomain={
                     domain => {
                        addLandingDomain(domain, (preview) => {
                           setIsOpenNewLandingDomainModal(false);
                           changeDomains([...domains, preview]);
                           if (isPrint('Domain created successfuly.')) {
                              toast.success('Domain created successfuly.');
                           }
                        });
                     } }
                  onSubmit={ () => {
                     setIsOpenNewLandingDomainModal(false);
                  } }
               />
            </ModalNew>
         )}
         {
            domains && (
               <div className='settings__domain'>
                  <div className='settings__domain__title'>
                     <Text
                        inner='Landing Domain'
                        type={ TextType.regularDefault }
                        size={ TextSize.medium }
                        tooltip='Add custom domain for landing'
                     />
                  </div>
                  <div className='settings__domain__flex'>
                     {domains.map((e, index) => {
                        return (
                           <CustomDomainItem
                              index={ index }
                              domain={ e }
                              onDelete={ () => handleDelete(e.id) }
                           />
                        );
                     })}
                  </div>
                  <div className='domain__createBtn flex'>
                     <BaseButton
                        theme={ btnTheme.primary }
                        size={ btnSize.large }
                        text='Add new'
                        onClick={ () => setIsOpenNewLandingDomainModal(true) }
                     />
                  </div>
               </div>
            )
         }
      </div>
   );
};

Domain.propTypes = {
   onCancel: PropTypes.func,
   onSave: PropTypes.func,
   form: PropTypes.object,
   onChange: PropTypes.func,
   onDomainAddSuccess: PropTypes.func,
   onDomainDeleteCompleted: PropTypes.func,
};

export default Domain;
