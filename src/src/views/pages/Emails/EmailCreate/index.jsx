/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { slug } from 'views/pages/DesignCourse/LessonCreate/BlockComponent';
import { cloneDeep } from 'lodash';
import EmailTitle from './EmailTitle';
import EmailBlocks from './EmailBlocks';
import BlockSettings from './BlockSettings';
import './index.scss';

const EmailCreate = ({
   goTo, match, saveZoomSettings,
   quizTemplatesDesc, quizTemplatesAsc, chooseSavedTemplate, email, setEmail, roles, fields, onEmailChange,
   formData, getFilterOptionsInProgress, emails, filterOptions, onAddValue, onRemoveValue,
   showFilters, selectedFilters, getAdminEmailsInProgress, subject, setSubject, deleteBlockId, deleteBlockLink, emptyField,
   errorMessages = {}
}) => {
   const [openSettings, setOpenSettings] = useState(true);
   const [isFirstRender, setIsFirstRender] = useState(true);

   const [, setHasError] = useState(false);

   const onGeneralSettingsChange = (name, value, file, isLink, index, isImage) => {
      const newEmailBlocks = [...email.blocks];
      if (file) {
         if (isImage) {
            newEmailBlocks[openSettings.currentIndex].email_files = [
               {
                  original_name: file.name,
                  mime_type: file.type,
                  [name]: value,
               }];
         } else {
            newEmailBlocks[openSettings.currentIndex].email_files = [
               ...newEmailBlocks[openSettings.currentIndex].email_files,
               {
                  original_name: file.name,
                  mime_type: file.type,
                  [name]: value,
               }];
         }
      } else if (isLink) {
         newEmailBlocks[openSettings.currentIndex].links[index][name] = value;
      } else if (name === 'links') {
         newEmailBlocks[openSettings.currentIndex][name] = value.value;
         if (value.id) {
            deleteBlockLink(value.id);
         }
      } else {
         newEmailBlocks[openSettings.currentIndex][name] = value;
      }
      setEmail({
         ...email,
         blocks: newEmailBlocks,
      });
   };

   const onGeneralCssChange = (name, value) => {
      const newEmail = { ...email };
      newEmail.css_attributes[name] = value;

      setEmail({
         ...newEmail,
      });
   };

   const onFooterChange = (name, value) => {
      const newEmail = { ...email };
      newEmail[name] = value;

      setEmail({
         ...newEmail,
      });
   };

   const onChooseBlock = (currentBlock, currentIndex) => {
      setOpenSettings({ currentBlock, currentIndex });
   };

   const onChange = (name, value) => {
      const newEmailBlocks = [...email.blocks];
      if (openSettings.currentIndex !== undefined) {
         newEmailBlocks[openSettings.currentIndex].css_attributes[name] = value;
      }
     
      if (name === 'amount') {
         const blockLinks = newEmailBlocks[openSettings.currentIndex].links;
         let diff;
         if (parseInt(value, 10) > blockLinks.length) {
            let newLinks;
            if (newEmailBlocks[openSettings.currentIndex].email_format === 'LinkBlock') {
               newLinks = {
                  link: '',
                  text: 'Link Text',
               };
            } else if (newEmailBlocks[openSettings.currentIndex].email_format === 'Button') {
               newLinks = {
                  link: '',
                  text: 'Button Text',
               };
            }
            diff = parseInt(value, 10) - blockLinks.length;
            for (let i = 0; i < diff; i++) {
               blockLinks.push(newLinks);
            }
         } else if (parseInt(value, 10) < blockLinks.length) {
            diff = blockLinks.length - parseInt(value, 10);

            if (blockLinks[blockLinks.length - 1] && blockLinks[blockLinks.length - 1].id) {
               deleteBlockLink(blockLinks[blockLinks.length - 1].id);
            }
            blockLinks.splice(blockLinks.length - diff, diff);
         }
      }

      setEmail({
         ...email,
         blocks: newEmailBlocks,
      });
   };

   const deleteBlock = (newSlug, blockId) => {
      if (blockId) {
         deleteBlockId(blockId);
      }
      let newEmailBlocks = [...email.blocks];
      newEmailBlocks = newEmailBlocks.filter(block => block.slug !== newSlug);

      setEmail({
         ...email,
         blocks: newEmailBlocks,
      });
   };

   const reOrderBlocks = (orderType, orderedBlockIndex) => {
      const newEmailBlocks = [...email.blocks];
      if (orderType === '+' && orderedBlockIndex < newEmailBlocks.length - 1) {
         newEmailBlocks[orderedBlockIndex].order = orderedBlockIndex + 1;
         newEmailBlocks[orderedBlockIndex + 1].order = orderedBlockIndex;
         const b = newEmailBlocks[orderedBlockIndex];
         newEmailBlocks[orderedBlockIndex] = newEmailBlocks[orderedBlockIndex + 1];
         newEmailBlocks[orderedBlockIndex + 1] = b;
      } else if (orderType === '-' && orderedBlockIndex > 0) {
         newEmailBlocks[orderedBlockIndex].order = orderedBlockIndex - 1;
         newEmailBlocks[orderedBlockIndex - 1].order = orderedBlockIndex;
         const b = newEmailBlocks[orderedBlockIndex];
         newEmailBlocks[orderedBlockIndex] = newEmailBlocks[orderedBlockIndex - 1];
         newEmailBlocks[orderedBlockIndex - 1] = b;
      }

      setEmail({
         ...email,
         blocks: newEmailBlocks,
      }
      );
   };

   const duplicateBlock = (duplicatedBlock, blockIndex) => {
      const newDuplicatedBlock = cloneDeep(duplicatedBlock);
      const newEmailBlocks = [...email.blocks];
      newEmailBlocks.splice(blockIndex, 0, {
         ...newDuplicatedBlock, slug: slug(), id: null,
      });

      newEmailBlocks.forEach((block, i) => {
         const orderedBlock = block;
         orderedBlock.order = i;
      });
      setEmail({
         ...email,
         blocks: newEmailBlocks,
      }
      );
   };
                     
   return (
      <div className='email__create'>
         <div className='email__create__container'>
            {openSettings && (
               <BlockSettings
                  onClose={ () => { setOpenSettings(false); } }
                  openSettings={ openSettings }
                  onGeneralSettingsChange={ onGeneralSettingsChange }
                  onChange={ onChange }
                  onGeneralCssChange={ onGeneralCssChange }
                  generalCss={ email && email.css_attributes }
                  emailInputs={ (email && email.blocks && !!email.blocks.length && email.blocks[openSettings.currentIndex] && email.blocks[openSettings.currentIndex]) || {} }
                  inputs={ (email && email.blocks && !!email.blocks.length && email.blocks[openSettings.currentIndex] && email.blocks[openSettings.currentIndex].css_attributes) || {} }
                  type={ openSettings && openSettings.currentBlock && openSettings.currentBlock.email_format }
               />
            )}
            <div className='email__create__container__right'>
               <EmailTitle
                  //  title={ currentemail.name }
                  //  subtitle={ currentemail.subtitle }
                  goTo={ goTo }
                  match={ match }
                  email={ email }
                  emails={ emails }
                  onChange={ onChange }
                  roles={ roles }
                  fields={ fields }
                  onEmailChange={ onEmailChange }
                  formData={ formData }
                  getFilterOptionsInProgress={ getFilterOptionsInProgress }
                  filterOptions={ filterOptions }
                  onAddValue={ onAddValue }
                  onRemoveValue={ onRemoveValue }
                  selectedFilters={ selectedFilters }
                  showFilters={ showFilters }
                  getAdminEmailsInProgress={ getAdminEmailsInProgress }
                  subject={ subject }
                  setSubject={ setSubject }
                  emptyField={ emptyField }
                  errorMessages={ errorMessages }
               />
               <EmailBlocks
                  onChange={ onChange }
                  onFooterChange={ onFooterChange }
                  onGeneralSettingsChange={ onGeneralSettingsChange }
                  onChooseBlock={ onChooseBlock }
                  deleteBlock={ deleteBlock }
                  reOrderBlocks={ reOrderBlocks }
                  duplicateBlock={ duplicateBlock }
                  setOpenSettings={ setOpenSettings }
                  openSettings={ openSettings }
                  saveZoomSettings={ saveZoomSettings }
                  //   setOpenQuizSettings={ setOpenQuizSettings }
                  setHasError={ setHasError }
                  quizTemplatesAsc={ quizTemplatesAsc }
                  quizTemplatesDesc={ quizTemplatesDesc }
                  chooseSavedTemplate={ chooseSavedTemplate }
                  email={ email }
                  setEmail={ setEmail }

               />
            </div>
         </div>
         {/* {openModal && (
            <ApproveModal
               title='Are you sure you want to exit email creation? Your progress will be lost.'
               btnText='Save & Exit'
               cancelText='Exit Without Saving'
               //   onApprove={ () => { saveemailWithErrors(true); setOpenModal(false); } }
               onCancel={ () => goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: match.params.id })) }
            />
         )} */}
      </div>
   );
};

EmailCreate.propTypes = {
   goTo: PropTypes.func,
   match: PropTypes.object,
   saveZoomSettings: PropTypes.func,
   quizTemplatesAsc: PropTypes.array,
   quizTemplatesDesc: PropTypes.array,
   chooseSavedTemplate: PropTypes.func,
   formData: PropTypes.object,
   filterOptions: PropTypes.object,
   selectedFilters: PropTypes.array,
   emails: PropTypes.array,
   getAdminEmailsInProgress: PropTypes.bool,
   email: PropTypes.object,
   setEmail: PropTypes.func,
   roles: PropTypes.any,
   fields: PropTypes.array,
   onEmailChange: PropTypes.func,
   getFilterOptionsInProgress: PropTypes.bool,
   onAddValue: PropTypes.func,
   onRemoveValue: PropTypes.func,
   showFilters: PropTypes.bool,
   subject: PropTypes.string,
   setSubject: PropTypes.func,
   deleteBlockId: PropTypes.func,
   deleteBlockLink: PropTypes.func,
   emptyField: PropTypes.bool,
   errorMessages: PropTypes.object,
};

export default EmailCreate;
