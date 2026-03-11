import React, { useContext, useState } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { AffiliateSettingsContext } from 'containers/pages/admin/affiliate/Settings';
import Tabs from 'components/elements/tabs';
import signInOneLogo from 'assets/images/affiliate/templates/signInOneLogo.png';
import signInPreview from 'assets/images/affiliate/templates/signInPreview.png';
import signUpOneLogo from 'assets/images/affiliate/templates/signUpOneLogo.png';
import signUpOnePreview from 'assets/images/affiliate/templates/signUpOnePreview.png';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import Button from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';

const AffiliateSettingsSignIn = () => {
   const {
      data, handleInputChange, switchedTemplate, setSwitchedTemplate, goToEditPage, affiliateId,
   } = useContext(AffiliateSettingsContext);
   const signInTemplates = data.templateSettings.length > 0 ? [data.templateSettings[0].landing] : [];
   const signUpTemplates = data.templateSettings.length > 0 ? [data.templateSettings[1].landing] : [];
   const [selectedTemplate, setSelectedTemplate] = useState(signInTemplates[0]);
   React.useEffect(() => {
      if (!selectedTemplate) {
         setSelectedTemplate(signInTemplates[0]);
      }
   }, [signInTemplates]);
   const pageVariants = [
      {
         key: 'Sign In', value: 'signin',
      },
      {
         key: 'Sign Up', value: 'signup',
      },
   ];

   const templateNames = {
      'Template sign in 1': 'Template one',
      'Template sign up 1': 'Template one',
   };

   const templateLogos = {
      'Template sign in 1': signInOneLogo,
      'Template sign up 1': signUpOneLogo,
   };

   const templatePreviews = {
      'Template sign in 1': signInPreview,
      'Template sign up 1': signUpOnePreview,
   };

   const sidebarArray = switchedTemplate === 'signin' ? signInTemplates : signUpTemplates;

   const selectTemplate = (templateName) => {
      if (switchedTemplate === 'signin') {
         handleInputChange(
            'selectedSignInTemplate', templateName
         );
         return;
      }
      handleInputChange(
         'selectedSignUpTemplate', templateName
      );
   };

   const isActiveTemplate = (templateName) => {
      return selectedTemplate.theme_name === templateName;
   };

   const getPreviewImage = () => {
      return templatePreviews[selectedTemplate.theme_name];
   };

   if (!selectedTemplate) {
      return null;
   }

   const handlePreview = () => {
      window.open(`/admin/affiliate/${ affiliateId }/template/preview/${ selectedTemplate.id }`, '_blank');
   };
   return (
      <div className='affiliate__settings__auth'>
         <div className='affiliate__settings__auth__left'>
            <Text
               inner='Templates'
               miniText='1'
               type={ types.regularDefault }
               size={ sizes.xlarge }
            />
            <Tabs
               variants={ pageVariants }
               selectedVariant={ switchedTemplate }
               onSelect={ (value) => {
                  setSwitchedTemplate(value);
                  if (value === 'signin') {
                     setSelectedTemplate(signInTemplates[0]);
                     return;
                  }
                  setSelectedTemplate(signUpTemplates[0]);
               } }
            />
            {sidebarArray.map((e) => {
               return (
                  <div
                     key={ e.id }
                     onClick={ () => setSelectedTemplate(e) }
                     role='presentation'
                     className={ `
                     affiliate__settings__auth__left__template
                     ${ isActiveTemplate(e.theme_name) ? ' affiliate__settings__auth__left__template__active' : '' }
                     ` }
                  >
                     <img src={ templateLogos[e.theme_name] } alt='' />
                     <div className='affiliate__settings__auth__left__template__bottom'>
                        <CheckboxCircle
                           label={ templateNames[e.theme_name] }
                           onCheck={ () => {} }
                           isChecked={ isActiveTemplate(e.theme_name) }
                        />
                     </div>
                  </div>
               );
            })}
         </div>
         <div className='affiliate__settings__auth__right'>
            <div className='affiliate__settings__auth__right__top'>
               <Text
                  inner='Preview'
                  type={ types.regular160 }
                  size={ sizes.xlarge }
               />
               <div className='right__top__actions'>
                  {selectedTemplate.is_active && (
                     <div className='right__top__actions__button' role='presentation' onClick={ () => goToEditPage(selectedTemplate.id) }>
                        <IconNew name='CheckoutEditM' />
                     </div>
                  )}
                  <div className='right__top__actions__button' role='presentation' onClick={ () => handlePreview() }>
                     <IconNew name='CheckoutPreviewM' />
                  </div>
                  <Button
                     text='Applied'
                     disabled={ selectedTemplate.is_active }
                     onClick={ () => selectTemplate(selectedTemplate.them_name) }
                  />
               </div>
            </div>
            <div className='affiliate__settings__auth__right__image'>
               <img src={ getPreviewImage() } alt='' />
            </div>
         </div>
      </div>
   );
};

AffiliateSettingsSignIn.propTypes = {

};

export default AffiliateSettingsSignIn;
