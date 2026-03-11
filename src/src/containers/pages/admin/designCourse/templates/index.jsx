import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'views/layout/AdminContainer';
import SiteHeader from 'views/layout/SiteHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import EmailTemplates from 'views/pages/EmailTemplates';
import * as selectors from 'state/modules/designCourse/emailTemplates/selectors';
import * as operations from 'state/modules/designCourse/emailTemplates/operations';
import * as actions from 'state/modules/designCourse/emailTemplates/actions';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { toast } from 'react-toastify';
import withLoading from 'utils/withLoading';
import isPrint from 'state/modules/designCourse/edit/Error';

const EmailTemplateIsLoading = withLoading(EmailTemplates);

class TemplatesContainer extends Component {
   static propTypes = {
      getEmailTemplates: PropTypes.func,
      getAutoEmails: PropTypes.func,
      getEmailTemplate: PropTypes.func,
      setInput: PropTypes.func,
      setCheckbox: PropTypes.func,
      updateEmailTemplate: PropTypes.func,
      checkBoxValues: PropTypes.object,
      template: PropTypes.object,
      autoEmails: PropTypes.object,
      courses: PropTypes.array,
      updateEmailNotifications: PropTypes.func,
      updateAutoEmailTemplate: PropTypes.func,
      revertAutoEmailTemplate: PropTypes.func,
      setAutoEmailInput: PropTypes.func,
      getEmailTemplatesInProgress: PropTypes.bool,
      getEmailTemplateInProgress: PropTypes.bool,
      goToBack: PropTypes.func,
   };


   constructor(props) {
      super(props);
      this.state = {
         courseSelectChange: 0,
      };
   }

   componentDidMount() {
      const { getEmailTemplates, getAutoEmails } = this.props;
      getEmailTemplates();
      getAutoEmails();
   }

   handleCourseSelectChange = (name, value) => {
      const { getEmailTemplate } = this.props;
      this.setState({ courseSelectChange: value });
      getEmailTemplate(value);
   }

   handleInputChange = async (name, value) => {
      const {
         setInput, courses, updateEmailTemplate,
      } = this.props;
      let updateValue = value;
      if (name === 'notify_enrollment' || name === 'notify_completion' || name === 'notify_subscription') {
         if (updateValue === false) {
            updateValue = 0;
         } else if (updateValue === true) {
            updateValue = 1;
         }
      }
      await setInput(name, updateValue);
      if (name === 'notify_enrollment' || name === 'notify_completion' || name === 'notify_subscription') {
         const { template } = this.props;
         if (!courses[0]) {
            if (isPrint('Please add course name')) {
               toast.error('Please add course name');
            }
         } else {
            delete template.id;
            delete template.created_at;
            delete template.updated_at;
            await updateEmailTemplate(template);
         }
      }
   }

   handleCheckboxChange = (name, value) => {
      const { setCheckbox, updateEmailNotifications } = this.props;
      setCheckbox(name, value);
      const updateValue = (value === false ? 'off' : 'on');
      updateEmailNotifications(name, updateValue);
   }


   handleSaveTemplates = () => {
      const { template, updateEmailTemplate, courses } = this.props;

      if (!courses[0]) {
         if (isPrint('Please add class name')) {
            toast.error('Please add class name');
         }
      } else {
         delete template.id;
         delete template.created_at;
         delete template.updated_at;
         updateEmailTemplate(template);
      }
   }

   handleCheckboxChangeForCourse = (name, value) => {
      const { template, updateEmailTemplate, courses } = this.props;
      template[name] = value;
      if (!courses[0]) {
         if (isPrint('Please add class name')) {
            toast.error('Please add class name');
         }
      } else {
         delete template.id;
         delete template.created_at;
         delete template.updated_at;
         updateEmailTemplate(template);
      }
   }

   handleSaveAutoEmail = () => {
      const { autoEmails, updateAutoEmailTemplate } = this.props;
      updateAutoEmailTemplate(autoEmails);
   }

   handleRevertAutoEmail = (id) => {
      const { revertAutoEmailTemplate } = this.props;
      revertAutoEmailTemplate(id);
   }

   handleInputChangeAutoEmail = (name, value) => {
      const { setAutoEmailInput } = this.props;
      setAutoEmailInput(name, value);
   }

   render() {
      const { courseSelectChange } = this.state;
      const {
         courses, template, checkBoxValues, getEmailTemplatesInProgress, getEmailTemplateInProgress, goToBack, autoEmails,
      } = this.props;
      return (

         <Container>
            <Container.Header>
               <SiteHeader title='Email Notifications' tooltip='This is where you can create and manage your Email Notifications.' hasArrow />
               <SiteHeaderMobile
                  isLeftAction
                  goToBack={ goToBack }
                  title='Email Notifications'
                  tooltip='This is where you can create and manage your Email Notifications.'
               />
            </Container.Header>
            <Container.Content>

               <EmailTemplateIsLoading
                  isLoading={ getEmailTemplatesInProgress }
                  handleCourseSelectChange={ (name, value) => this.handleCourseSelectChange(name, value) }
                  courseSelectChange={ courseSelectChange }
                  courses={ courses }
                  handleInputChange={ (name, value) => this.handleInputChange(name, value) }
                  handleCheckboxChange={ (name, value) => this.handleCheckboxChange(name, value) }
                  template={ template }
                  checkBoxValues={ checkBoxValues }
                  handleSaveTemplates={ this.handleSaveTemplates }
                  handleCheckboxChangeForCourse={ this.handleCheckboxChangeForCourse }
                  handleSaveAutoEmail={ this.handleSaveAutoEmail }
                  getEmailTemplateInProgress={ getEmailTemplateInProgress }
                  autoEmails={ autoEmails }
                  handleInputChangeAutoEmail={ this.handleInputChangeAutoEmail }
                  handleRevertAutoEmail={ this.handleRevertAutoEmail }
               />
            </Container.Content>
         </Container>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      courses: selectors.emailCoursesSelector(state),
      template: selectors.templateSelector(state),
      getEmailTemplatesInProgress: selectors.getEmailTemplatesInProgressSelector(state),
      getEmailTemplateInProgress: selectors.getEmailTemplateInProgressSelector(state),
      checkBoxValues: selectors.checkBoxValuesSelector(state),
      autoEmails: selectors.getAutoemailsTemplates(state),

   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getEmailTemplates: () => dispatch(operations.getEmailTemplatesOperation()),
      getEmailTemplate: (id) => dispatch(operations.getEmailTemplateOperation(id)),
      setInput: async (key, value) => {
         await dispatch(actions.setInput(key, value));
      },
      setAutoEmailInput: (key, value) => {
         dispatch(actions.setAutoEmailInput(key, value));
      },
      setCheckbox: (key, value) => {
         dispatch(actions.setCheckbox(key, value));
      },
      updateEmailTemplate: async (inputs) => {
         await dispatch(operations.updateEmailTemplateOperation(inputs));
      },
      updateEmailNotifications: (key, value) => {
         dispatch(operations.updateEmailNotificationsOperation(key, value));
      },
      updateAutoEmailTemplate: (data) => {
         dispatch(operations.updateAutoEmailTemplateOperation(data));
      },
      revertAutoEmailTemplate: (id) => {
         dispatch(operations.revertAutoEmailTemplateOperation(id));
      },
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      getAutoEmails: () => dispatch(operations.getAutoEmailsOperation()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesContainer);
