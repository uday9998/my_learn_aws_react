import React, { useState, useEffect } from 'react';
import EmailCreate from 'views/pages/Emails/EmailCreate';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import Container from 'views/layout/AdminContainer';
import withLoading from 'utils/withLoading';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import { useHistory } from 'react-router';
import EmailHeader from 'views/layout/DesignCourse/EmailsBaseHeader';
import { emailBlockDelete, emailLinkDelete } from 'api/AuthApi';
import * as action from 'state/modules/designCourse/emails/actions';
import * as selectors from 'state/modules/designCourse/emails/selectors';
import * as operations from 'state/modules/designCourse/emails/operations';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Modal from 'components/elements/Modal';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import { authUserSelector } from 'state/modules/common/selectors';

const EmailCreateLoading = withLoading(EmailCreate);


const EmailsEditContainer = ({
   match, filterByCourses, setInputAction, getAdminsEmails,
   getAllUsersEmails, filterByTags, formData, getFilterOptionsInProgress, emails,
   filterOptions, addFilterOptionAction, filterByTagsEmails,
   removeFilterOptionAction, selectedFilters, getAdminEmailsInProgress,
   filterEmails, sendEmail, editEmailStatus, sendEmailInProgress, deleteEmailStatus, authUser,
}) => {
   const [emailBlockDeleteFunc] = useSubmitForm(emailBlockDelete, {
      successMessage: 'Block has been deleted.',
   });

   const [emailLinkDeleteFunc] = useSubmitForm(emailLinkDelete);

   const [deleteEmailModalIsOpen, setDeleteEmailModalIsOpen] = useState(false);

   const history = useHistory();

   const delEmailModalClick = () => {
      setDeleteEmailModalIsOpen(true);
   };

   const delEmailModalApproveClick = () => {
      deleteEmailStatus(match.params.id);
      setDeleteEmailModalIsOpen(false);
      history.push(`${ Router.route('ADMIN_EMAILS').getCompiledPath() }`);
   };

   const deleteBlock = (blockId) => {
      if (blockId) {
         emailBlockDeleteFunc({ emailId: match.params.id, blockId }, () => {

         });
      }
   };

   const deleteBlockLink = (linkId) => {
      if (linkId) {
         emailLinkDeleteFunc({ linkId }, () => {

         });
      }
   };


   const fields = {
      option: {
         label: 'Send to',
         placeholder: 'Products',
         options: [
            { label: 'Products', value: 'Courses' },
            { label: 'Tags', value: 'Tags' },
            { label: 'Admins', value: 'Admins' },
            { label: 'All Users', value: 'All Users' }],
         iconColor: '#3f4f65',
      },
      type: {
         placeholder: 'Choose Option',
         iconColor: '#3f4f65',
      },
      subject: {
         placeholder: 'Subject Line',
         label: 'Subject',
      },
      content: {
         placeholder: 'Type something',
         label: 'Text Content',
      },
   };

   const roles = {
      courses: 5,
      tags: 6,
      admins: 2,
      all: 10,
   };

   const typesByRoles = {
      5: 'courses',
      6: 'tags',
      2: 'admins',
      10: 'all_users',
   };

   const [email, setEmail] = useState({
      blocks: formData.blocks || [],
      footer_text: formData.footer_text,
      css_attributes: {
         bg_color: (formData.css_attributes && formData.css_attributes.bg_color) || '#ffffff',
         brand_color: (formData.css_attributes && formData.css_attributes.brand_color) || '#6127FD',
         paddingTop: (formData.css_attributes && formData.css_attributes.paddingTop) || '64',
         paddingBottom: (formData.css_attributes && formData.css_attributes.paddingBottom) || '64',
      },
   });
   const [subject, setSubject] = useState((formData && formData.subject) || '');
   const [type, setType] = useState('courses');
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const handleNewMessage = () => {
      //  resetInputAction();
      filterByCourses();
   };
   useEffect(() => {
      editEmailStatus(match.params.id);
      handleNewMessage();
   }, []);

   useEffect(() => {
      setSubject((formData && formData.subject) || '');
      setType(formData && typesByRoles[formData.role]);
      setEmail({
         blocks: formData.blocks || [],
         footer_text: formData.footer_text,
         css_attributes: {
            bg_color: (formData.css_attributes && formData.css_attributes.bg_color) || '#ffffff',
            brand_color: (formData.css_attributes && formData.css_attributes.brand_color) || '#6127FD',
            paddingTop: (formData.css_attributes && formData.css_attributes.paddingTop) || '64',
            paddingBottom: (formData.css_attributes && formData.css_attributes.paddingBottom) || '64',
         },
      });
   }, [formData]);

   const getSelectedEmails = () => {
      return emails.filter(emailnew => !filterEmails.includes(emailnew));
   };


   const handleSave = (sendType, date) => {
      const selectedEmails = getSelectedEmails();
      const errMessages = {};

      if (!subject.trim()) {
         errMessages.subject = ['Subject is required'];
      }

      if (!selectedEmails.length) {
         errMessages.options = ['There are no recipients to send the email to'];
      }

      if (Object.keys(errMessages).length) {
         addErrorMessages(errMessages);
         return;
      }

      const role = formData.role || 5;
      let sendTo = selectedFilters.join(', ');
      if (type === 'all_users' || type === 'admins') {
         sendTo = null;
      }
      let body = {
         // eslint-disable-next-line max-len
         role,
         to: selectedEmails,
         subject,
         body: '<span></span>',
         type,
         send_to: sendTo,
         status: sendType === 'test' ? 'draft' : sendType,
         id: formData.id,
         ...email,
      };
      if (date) {
         body = { ...body, scheduled_date: date };
      }
      if (sendType === 'test') {
         body.to = authUser.email;
         sendEmail(body, true);
      } else {
         sendEmail(body);
      }
   };


   const goTo = () => {
      history.push(`${ Router.route('ADMIN_EMAILS').getCompiledPath() }`);
   };


   const handleOptionChange = (option) => {
      const formatOption = option.toLowerCase().split(' ')[0];
      setInputAction('role', roles[formatOption]);
      setType(formatOption === 'all' ? 'all_users' : formatOption);

      switch (formatOption) {
         case 'courses': filterByCourses(); break;
         case 'admins': getAdminsEmails(); break;
         case 'all': getAllUsersEmails(); break;
         case 'tags': filterByTags(); break;
         default:
            break;
      }
   };

   const handleInputChange = (name, value) => {
      setInputAction(name, value);
      if (name === 'category') {
         handleOptionChange(value);
      }
   };

   const changeSubjectLine = (newValue) => {
      if (errorMessages.subject?.length) {
         removeErrorMessage('subject');
      }

      setSubject(newValue);
   };

   const onAddValue = (option) => {
      if (errorMessages.options?.length) {
         removeErrorMessage('options');
      }

      const role = formData.role;
      if (role === 5) {
         addFilterOptionAction(option);
      }
      if (role === 6) {
         filterByTagsEmails(option, filterOptions[option].id);
      }
   };

   const onRemoveValue = (option) => {
      removeFilterOptionAction(option);
   };

   return (
      <Container>
         <Container.Header>
            <EmailHeader
               title='New Broadcast Email'
               //   goTo={ () => setOpenModal(true) }
               match={ match }
               goTo={ goTo }
               handleSave={ handleSave }
               delEmailModalClick={ delEmailModalClick }
               email={ email }
               //   onChange={ onChange }
               //  saveLesson={ (isExit) => { saveLessonWithErrors(isExit); setOpenSettings(false); } }
               handlePreviewEmail={
                  email && email.blocks && email.blocks.length > 0
                     ? () => {
                        const previewUrl = `${ window.location.origin }/api/v1/emails/preview/0?data=${ JSON.stringify(email.blocks) }`;
                        window.open(previewUrl, '_blank');
                     }
                     : null
               }
            />
         </Container.Header>
         {sendEmailInProgress && (
            <LoaderSpinner />
         )}
         {!sendEmailInProgress && (
            <EmailCreateLoading
               isLoading={ false }
               email={ email }
               setEmail={ setEmail }
               roles={ roles }
               fields={ fields }
               onEmailChange={ handleInputChange }
               formData={ formData }
               getFilterOptionsInProgress={ getFilterOptionsInProgress }
               emails={ emails }
               filterOptions={ filterOptions }
               onAddValue={ onAddValue }
               onRemoveValue={ onRemoveValue }
               selectedFilters={ selectedFilters }
               showFilters={ formData.role === 5 || formData.role === 6 }
               getAdminEmailsInProgress={ getAdminEmailsInProgress }
               subject={ subject }
               setSubject={ changeSubjectLine }
               deleteBlockId={ deleteBlock }
               deleteBlockLink={ deleteBlockLink }
               errorMessages={ errorMessages }
            />
         )}
         {/* {
            sendModalOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth='389px'
                  onClose={ () => setSendModalOpen(false) }
               >
                  <EmailModalContent
                     setSendModalClose={ () => setSendModalOpen(false) }
                     title={ emailSendType === 'draft' ? 'Save Draft' : 'Send Email' }
                     content={ emailSendType === 'draft' ? 'The email saved as draft successfully' : 'The email sent successfully' }
                  />
               </Modal>
            )
         } */}
         {
            deleteEmailModalIsOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth={ window.innerWidth >= 1024 ? '414px' : '300px' }
                  onClose={ () => setDeleteEmailModalIsOpen(false) }
               >
                  <div>
                     <DeleteModalContent
                        onCancel={ () => setDeleteEmailModalIsOpen(false) }
                        onApprove={ () => delEmailModalApproveClick() }
                        // title='Delete Email'
                        content='Are you sure you want to delete this email?'
                     />
                  </div>
               </Modal>
            )
         }
      </Container>

   );
};


EmailsEditContainer.propTypes = {
   match: PropTypes.object,
   formData: PropTypes.object,
   setInputAction: PropTypes.func,
   filterByCourses: PropTypes.func,
   filterOptions: PropTypes.object,
   selectedFilters: PropTypes.array,
   emails: PropTypes.array,
   filterEmails: PropTypes.array,
   removeFilterOptionAction: PropTypes.func,
   addFilterOptionAction: PropTypes.func,
   sendEmail: PropTypes.func,
   filterByTags: PropTypes.func,
   filterByTagsEmails: PropTypes.func,
   getAdminsEmails: PropTypes.func,
   getAllUsersEmails: PropTypes.func,
   editEmailStatus: PropTypes.func,
   getFilterOptionsInProgress: PropTypes.bool,
   sendEmailInProgress: PropTypes.bool,
   getAdminEmailsInProgress: PropTypes.bool,
   deleteEmailStatus: PropTypes.func,
   authUser: PropTypes.object,
};

const mapStateToProps = state => {
   return {
      formData: selectors.formDataSelector(state),
      filterOptions: selectors.filterOptionsSelector(state),
      emails: selectors.emailsSelector(state),
      selectedFilters: selectors.selectedFiltersSelector(state),
      filterEmails: selectors.filterEmailsSelector(state),
      isEmailSent: selectors.isEmailSentSelector(state),
      sendEmailInProgress: selectors.sendEmailInProgressSelector(state),
      settingsEmail: selectors.settingsEmailSelector(state),
      getEmailInProgress: selectors.getEmailInProgressSelector(state),
      emailId: selectors.emailIdSelector(state),
      emailStatuses: selectors.emailStatusesSelector(state),
      getEmailStatusesInProgress: selectors.getEmailStatusesInProgressSelector(state),
      emailStatusesTotal: selectors.emailStatusesTotalSelector(state),
      getFilterOptionsInProgress: selectors.getFilterOptionsInProgressSelector(state),
      getUsersEmailsInProgress: selectors.getUsersEmailsInProgressSelector(state),
      getAdminEmailsInProgress: selectors.getAdminEmailsInProgressSelector(state),
      authUser: authUserSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      filterByCourses: () => dispatch(operations.filterByCoursesOperation()),
      filterByTags: () => dispatch(operations.filterByTagsOperation()),
      filterByTagsEmails: (option, id) => dispatch(operations.filterByTagsEmailsOperation(option, id)),
      getAdminsEmails: () => dispatch(operations.getAdminsEmailsOperation()),
      getAllUsersEmails: () => dispatch(operations.getAllUsersEmailsOperation()),
      setInputAction: (key, value) => dispatch(action.setInput(key, value)),
      resetInputAction: () => dispatch(action.resetInput()),
      addFilterOptionAction: option => dispatch(action.addFilterOption(option)),
      removeFilterOptionAction: option => dispatch(action.removeFilterOption(option)),
      setFilterEmailsAction: filterEmails => dispatch(action.setFilterEmails(filterEmails)),
      sendEmail: async (body, isTest) => { await dispatch(operations.sendEmailOperation(body, isTest)); },
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      getSettingsEmail: () => {
         dispatch(operations.settingsEmailOperation());
      },
      editEmailStatus: (id) => {
         dispatch(operations.editEmailStatusOperation(id));
      },
      getEmailStatuses: async () => {
         await dispatch(operations.getEmailStatusesOperation());
      },
      deleteEmailStatus: async (id) => {
         await dispatch(operations.deleteEmailStatusOperation(id));
      },
      changeEmailStatusPage: ({ ...params }) => {
         dispatch(operations.changeEmailStatusPageOperation(params));
      },

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailsEditContainer);
