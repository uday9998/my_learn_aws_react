import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import Container from 'views/layout/AdminContainer';
import Emails from 'views/pages/Emails';
import EmailsBaseHeader from 'views/layout/DesignCourse/EmailsBaseHeader';
import { toast } from 'react-toastify';
import Modal from 'components/elements/Modal';
import EmailModalContent from 'components/modules/emails/EmailModal';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';

import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import * as action from 'state/modules/designCourse/emails/actions';
import * as selectors from 'state/modules/designCourse/emails/selectors';
import * as operations from 'state/modules/designCourse/emails/operations';
import EmailStatuses from 'views/pages/EmailStatuses';
import withLoading from 'utils/withLoading';
import isPrint from 'state/modules/designCourse/edit/Error';
import { portalId } from 'utils/constants';

const EmailStatusesIsLoading = withLoading(EmailStatuses);

class EmailsContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,
      setInputAction: PropTypes.func,
      filterByCourses: PropTypes.func,
      filterOptions: PropTypes.object,
      setFilterEmails: PropTypes.array,
      selectedFilters: PropTypes.array,
      emails: PropTypes.array,
      filterEmails: PropTypes.array,
      setFilterEmailsAction: PropTypes.func,
      removeFilterOptionAction: PropTypes.func,
      addFilterOptionAction: PropTypes.func,
      formData: PropTypes.object,
      sendEmail: PropTypes.func,
      filterByTags: PropTypes.func,
      filterByTagsEmails: PropTypes.func,
      getAdminsEmails: PropTypes.func,
      getAllUsersEmails: PropTypes.func,
      resetInputAction: PropTypes.func,
      goToBack: PropTypes.func,
      isEmailSent: PropTypes.bool,
      getSettingsEmail: PropTypes.func,
      settingsEmail: PropTypes.string,
      getEmailInProgress: PropTypes.bool,
      editEmailStatus: PropTypes.func,
      emailId: PropTypes.number,
      getEmailStatusesInProgress: PropTypes.bool,
      getEmailStatuses: PropTypes.func,
      emailStatuses: PropTypes.array,
      deleteEmailStatus: PropTypes.func,
      changeEmailStatusPage: PropTypes.func,
      emailStatusesTotal: PropTypes.number,
      getFilterOptionsInProgress: PropTypes.bool,
      getUsersEmailsInProgress: PropTypes.bool,
      getAdminEmailsInProgress: PropTypes.bool,
   };

   constructor(props) {
      super(props);
      this.fields = {
         option: {
            label: 'Send to',
            placeholder: 'Classes',
            options: [
               { label: 'Classes', value: 'Courses' },
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

      this.roles = {
         courses: 5,
         tags: 6,
         admins: 2,
         all: 10,
      };
      this.state = {
         currentTab: 1,
         emailFormValidation: [{ name: false }, { name: false }, { name: false }, { name: false }],
         sendModalOpen: false,
         type: 'courses',
         emailSendType: 'draft',
         isNewMessage: false,
      };
   }

   async componentDidMount() {
      const { getEmailStatuses } = this.props;
      await getEmailStatuses();
      const { emailStatuses } = this.props;
      if (!emailStatuses.length) {
         this.handleNewMessage(true);
      }
   }

   handleLogout = () => {
      const { logout } = this.props;
      logout();
   }

   getSelectedEmails = () => {
      const { emails, filterEmails } = this.props;
      return emails.filter(email => !filterEmails.includes(email));
   };

   handleOptionChange = option => {
      const {
         filterByCourses, setInputAction, getAdminsEmails, getAllUsersEmails, filterByTags,
      } = this.props;
      const formatOption = option.toLowerCase().split(' ')[0];
      setInputAction('role', this.roles[formatOption]);
      this.setState({ type: formatOption === 'all' ? 'all_users' : formatOption });

      switch (formatOption) {
         case 'courses': filterByCourses(); break;
         case 'admins': getAdminsEmails(); break;
         case 'all': getAllUsersEmails(); break;
         case 'tags': filterByTags(); break;
         default:
            break;
      }
   }

   onRemoveEmail = email => {
      const { setFilterEmailsAction, filterEmails } = this.props;
      const emails = [...filterEmails, email];
      setFilterEmailsAction(emails);
   }

   onAddEmail = email => {
      const { setFilterEmailsAction, filterEmails } = this.props;
      const emails = filterEmails.filter(e => e !== email);
      setFilterEmailsAction(emails);
   }

   onSendEmail = async (sendType) => {
      const {
         sendEmail, selectedFilters, emailId,
      } = this.props;
      const { type } = this.state;
      const { formData: { subject, content } } = this.props;
      const role = 5;
      let sendTo = selectedFilters.join(', ');
      if (type === 'all_users' || type === 'admins') {
         sendTo = null;
      }
      const body = {
         // eslint-disable-next-line max-len
         role, to: this.getSelectedEmails(), subject, body: content, status: sendType, type, send_to: sendTo, id: emailId,
      };
      this.setState({ emailSendType: sendType });
      await sendEmail(body);
      const { isEmailSent } = this.props;
      if (isEmailSent) {
         this.nextStepClick();
         const { getEmailStatuses } = this.props;
         getEmailStatuses();
         this.setState({ sendModalOpen: true });
      }
   }

   backStepClick = () => {
      const { currentTab } = this.state;
      let currentStep = currentTab;
      currentStep = currentTab - 1;
      this.setState({ currentTab: currentStep });
   }


   nextStepClick = (stepId) => {
      const { currentTab, emailFormValidation, type } = this.state;
      const { formData } = this.props;
      let currentStep = currentTab;
      let isStepDone = false;
      let validationStep = stepId - 2;
      if (stepId === 1) {
         validationStep = 0;
      }
      if (stepId && emailFormValidation[validationStep].name) {
         currentStep = stepId;
      } else {
         if (currentStep === 1 && this.getSelectedEmails().length) {
            isStepDone = true;
         }
         if (currentStep === 2 && formData.subject && formData.content) {
            isStepDone = true;
         }
         if (currentStep === 3) {
            isStepDone = true;
         }
         if (currentStep === 4) {
            isStepDone = true;
         }
      }

      if (isStepDone && !stepId) {
         if (currentTab !== 4) {
            currentStep = currentTab + 1;
         }
         emailFormValidation[currentTab - 1].name = true;
      } else if (!isStepDone && !stepId) {
         if (currentTab === 1) {
            if (type === 'admins' && this.getSelectedEmails().length === 0) {
               if (isPrint('There are no any admins to send a message')) {
                  toast.error('There are no any admins to send a message');
               }
            } else if (type === 'users' && this.getSelectedEmails().length === 0) {
               if (isPrint('There are no any users to send a message')) {
                  toast.error('There are no any users to send a message');
               }
            } else if (isPrint('Please choose an option first')) {
               toast.error('Please choose an option first');
            }
         } else if (isPrint('Please add a text')) {
            toast.error('Please add a text');
         }

         emailFormValidation[currentTab - 1].name = false;
      }
      this.setState({ currentTab: currentStep });
   }

   handleInputChange = (name, value) => {
      const { setInputAction } = this.props;
      setInputAction(name, value);
      if (name === 'category') this.handleOptionChange(value);
   }

   onAddValue = (option) => {
      const {
         addFilterOptionAction, filterByTagsEmails, filterOptions,
      } = this.props;
      const { formData: { role } } = this.props;
      if (role === 5) {
         addFilterOptionAction(option);
      }
      if (role === 6) {
         filterByTagsEmails(option, filterOptions[option].id);
      }
   }

   onRemoveValue = (option) => {
      const {
         removeFilterOptionAction,
      } = this.props;
      removeFilterOptionAction(option);
   }

   setSendModalOpen = () => {
      this.setState({ sendModalOpen: false });
   }

   setSendModalClose = () => {
      const { resetInputAction, filterByCourses } = this.props;
      resetInputAction();
      filterByCourses();
      this.setState({
         currentTab: 1,
         isNewMessage: false,
         emailFormValidation: [{ name: false }, { name: false }, { name: false }, { name: false }],
         sendModalOpen: false,
      });
   }

   handleNewMessage = (data) => {
      this.setState({ isNewMessage: data });
      const { resetInputAction, filterByCourses, getSettingsEmail } = this.props;
      resetInputAction();
      filterByCourses();
      getSettingsEmail();
      this.setState({
         currentTab: 1,
         emailFormValidation: [{ name: false }, { name: false }, { name: false }, { name: false }],
         sendModalOpen: false,
      });
   }

   handleEditEmailStatus = (isEditMessage, id, type) => {
      const newType = type === 'all_users' ? 'all' : type;
      this.setState({ isNewMessage: isEditMessage });
      const { getSettingsEmail, editEmailStatus } = this.props;
      editEmailStatus(id);
      this.handleOptionChange(newType);
      getSettingsEmail();
      this.setState({
         currentTab: 1,
         emailFormValidation: [{ name: false }, { name: false }, { name: false }, { name: false }],
         sendModalOpen: false,
      });
   }

   deleteEmailStatus = async (id) => {
      const { deleteEmailStatus } = this.props;
      await deleteEmailStatus(id);
      const { emailStatuses } = this.props;
      if (!emailStatuses.length) {
         this.handleNewMessage(true);
      }
   }

   onChangeEmailStatusPage = (data) => {
      const { changeEmailStatusPage } = this.props;
      changeEmailStatusPage({ page: data.currentPage, count: 20 });
   }


   render() {
      const {
         filterOptions, formData, addFilterOptionAction, removeFilterOptionAction, emails, selectedFilters,
         filterByTagsEmails,
         setFilterEmails,
         goToBack, settingsEmail, getEmailInProgress,
         emailStatuses, getEmailStatusesInProgress, emailStatusesTotal, getFilterOptionsInProgress,
         getUsersEmailsInProgress, getAdminEmailsInProgress,
      } = this.props;
      const {
         currentTab, emailFormValidation, sendModalOpen, emailSendType, isNewMessage,
      } = this.state;
      return (
         <Container>

            {/* <Container.Header>
               <EmailsBaseHeader
                  handleNewMessage={ this.handleNewMessage }
                  isNewMessage={ isNewMessage }
                  tooltip='On this page you will be able to create and send emails to different sets of people signed up to your school.'
               />
               <SiteHeaderMobile
                  isLeftAction
                  goToBack={ goToBack }
                  title='Emails'
                  tooltip='On this page you will be able to create and send emails to different sets of people signed up to your school.'
               />
            </Container.Header>
            <Container.Content>
               {isNewMessage && (
                  <Emails
                     onChange={ this.handleInputChange }
                     onAddFilterValue={ addFilterOptionAction }
                     onSendEmail={ this.onSendEmail }
                     onSendTestEmail={ this.onSendTestEmail }
                     onRemoveFilterValue={ removeFilterOptionAction }
                     onAddEmail={ this.onAddEmail }
                     onRemoveEmail={ this.onRemoveEmail }
                     showFilters={ formData.role === 5 || formData.role === 6 }
                     fields={ this.fields }
                     emails={ emails }
                     formData={ formData }
                     setFilterEmails={ setFilterEmails }
                     selectedEmails={ this.getSelectedEmails() }
                     selectedFilters={ selectedFilters }
                     filterOptions={ filterOptions }
                     currentTab={ currentTab }
                     nextStepClick={ this.nextStepClick }
                     emailFormValidation={ emailFormValidation }
                     filterByTagsEmails={ filterByTagsEmails }
                     onAddValue={ this.onAddValue }
                     onRemoveValue={ this.onRemoveValue }
                     settingsEmail={ settingsEmail }
                     getEmailInProgress={ getEmailInProgress }
                     backStepClick={ this.backStepClick }
                     getFilterOptionsInProgress={ getFilterOptionsInProgress }
                     getUsersEmailsInProgress={ getUsersEmailsInProgress }
                     getAdminEmailsInProgress={ getAdminEmailsInProgress }
                  />
               )}
               {!isNewMessage && (
                  <EmailStatusesIsLoading
                     isLoading={ getEmailStatusesInProgress }
                     emailStatuses={ emailStatuses }
                     handleNewMessage={ this.handleNewMessage }
                     deleteEmailStatus={ this.deleteEmailStatus }
                     getEmailStatusesInProgress={ getEmailStatusesInProgress }
                     onChangeEmailStatusPage={ this.onChangeEmailStatusPage }
                     emailStatusesTotal={ emailStatusesTotal }
                     handleEditEmailStatus={
                        (isEditMessage, id, type) => this.handleEditEmailStatus(isEditMessage, id, type) }

                  />
               )}
               {
                  sendModalOpen && (
                     <Modal
                        blurColor='rgba(63, 79, 101, 0.6)'
                        contentBgColor='#fff'
                        contentPosition='center'
                        closeOnClickOutside={ true }
                        contentWidth='389px'
                        onClose={ () => this.setSendModalClose() }
                     >
                        <EmailModalContent
                           setSendModalClose={ () => this.setSendModalClose() }
                           title={ emailSendType === 'draft' ? 'Save Draft' : 'Send Email' }
                           content={ emailSendType === 'draft' ? 'The email saved as draft successfully' : 'The email sent successfully' }
                        />
                     </Modal>
                  )
               }

            </Container.Content> */}
         </Container>
      );
   }
}

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
      sendEmail: async (body) => { await dispatch(operations.sendEmailOperation(body)); },
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailsContainer);
