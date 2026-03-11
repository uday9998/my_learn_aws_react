import React from 'react';
import './index.scss';
import TemplatesCard from 'components/modules/emailTemplates/TemplatesCard';
import NotificationsCard from 'components/modules/emailTemplates/NotificationsCard';
import DynamicCard from 'components/modules/emailTemplates/DynamicCard';
import EmailCodesCard from 'components/modules/emailTemplates/EmailCodes';
import PropTypes from 'prop-types';
// import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Text from 'components/elements/Text';
import NoSearchSvg from 'assets/images/no-search-result.svg';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import withLoading from 'utils/withLoading';

const TemplateIsLoading = withLoading('div');

const EmailTemplates = ({
   active, handleCourseSelectChange, courseSelectChange, courses, handleCheckboxChangeForCourse,
   autoEmails, handleInputChange, template, checkBoxValues, handleSaveTemplates, handleSaveAutoEmail,
   handleCheckboxChange, getEmailTemplateInProgress, handleInputChangeAutoEmail, handleRevertAutoEmail,
}) => {
   return (
      courses.length === 0 ? (
         <ItemWrapper style={ { padding: '32px 50px 32px 42px' } }>
            <div className='emailtemplates-empty'>
               <img src={ NoSearchSvg } alt='noCredit' />
               <Text
                  size='small'
                  type='normal'
                  color='#8a94a2'
                  inner='No emails yet'
               />
            </div>
         </ItemWrapper>
      ) : (
         <div className='emailTemplates-page h-full'>
            <div className='content_left p-r-exl'>
               <TemplatesCard
                  handleCourseSelectChange={ handleCourseSelectChange }
                  courseSelectChange={ courseSelectChange }
                  courses={ courses }
               />
               <div className='m-t-m' />
               <NotificationsCard
                  handleCheckboxChange={ handleCheckboxChange }
                  checkBoxValues={ checkBoxValues }
                  template={ template }
                  handleCheckboxChangeForCourse={ handleCheckboxChangeForCourse }
               />
               <div className='m-t-m' />
               <EmailCodesCard />
            </div>
            <TemplateIsLoading className='content_right m-l-exl m-r-exl' isLoading={ getEmailTemplateInProgress }>
               <div className='m-b-exs'>
                  <DynamicCard
                     title='Welcome'
                     isOpen={ active === 1 }
                     handleInputChange={ handleInputChangeAutoEmail }
                     subject='subject'
                     body='body'
                     subjectValue={ autoEmails.subject }
                     bodyValue={ autoEmails.body }
                     getEmailTemplateInProgress={ getEmailTemplateInProgress }
                     saveButtonClick={ handleSaveAutoEmail }
                     handleRevertAutoEmail={ handleRevertAutoEmail }
                     isModified={ autoEmails.is_modified }
                     templateId={ autoEmails.id }
                     hasEmailToolTip
                     tooltipText='This email goes out to all members who register for your School.'
                  />
               </div>
               <div className='m-b-exs'>
                  <DynamicCard
                     title='Enrollment'
                     isOpen={ active === 2 }
                     handleInputChange={ handleInputChange }
                     subject='enrollment_email_subject'
                     body='enrollment_email'
                     subjectValue={ template.enrollment_email_subject }
                     bodyValue={ template.enrollment_email }
                     getEmailTemplateInProgress={ getEmailTemplateInProgress }
                     saveButtonClick={ handleSaveTemplates }
                     handleRevertAutoEmail={ handleRevertAutoEmail }
                     isModified={ false }
                     templateId={ template.id }
                     notifyName='notify_enrollment'
                     notifyEnrollment={ template.notify_enrollment }
                     hasEmailToolTip
                     tooltipText='This email goes out when you enroll in a course.'
                  />
               </div>
               <div className='m-b-exs'>
                  <DynamicCard
                     title='Completion'
                     isOpen={ active === 3 }
                     handleInputChange={ handleInputChange }
                     subject='completion_email_subject'
                     body='completion_email'
                     subjectValue={ template.completion_email_subject }
                     bodyValue={ template.completion_email }
                     getEmailTemplateInProgress={ getEmailTemplateInProgress }
                     saveButtonClick={ handleSaveTemplates }
                     handleRevertAutoEmail={ handleRevertAutoEmail }
                     isModified={ false }
                     templateId={ template.id }
                     notifyName='notify_completion'
                     notifyEnrollment={ template.notify_completion }
                     hasEmailToolTip
                     tooltipText='This email goes out when the course is completed.'
                  />
               </div>
               <div className='m-b-exs'>
                  <DynamicCard
                     title='Subscription'
                     isOpen={ active === 4 }
                     handleInputChange={ handleInputChange }
                     subject='subscription_cancellation_email_subject'
                     body='subscription_cancellation_email'
                     subjectValue={ template.subscription_cancellation_email_subject }
                     bodyValue={ template.subscription_cancellation_email }
                     getEmailTemplateInProgress={ getEmailTemplateInProgress }
                     saveButtonClick={ handleSaveTemplates }
                     handleRevertAutoEmail={ handleRevertAutoEmail }
                     isModified={ false }
                     templateId={ template.id }
                     notifyName='notify_subscription'
                     notifyEnrollment={ template.notify_subscription }
                     hasEmailToolTip
                     tooltipText='This email goes out after a number of failed attempts at billing a subscription course and makes them aware of the subscription cancellation.'
                  />
               </div>
               {/* <div className='m-b-exs'>
                  <DynamicCard
                     title='Affiliate Welcome'
                     isOpen={ active === 5 }
                     handleInputChange={ handleInputChange }
                     subject='affiliate_welcome_email_subject'
                     body='affiliate_welcome_email'
                     subjectValue={ template.affiliate_welcome_email_subject }
                     bodyValue={ template.affiliate_welcome_email }
                     getEmailTemplateInProgress={ getEmailTemplateInProgress }
                     saveButtonClick={ handleSaveTemplates }
                     isModified={ false }
                  />
               </div>
               <div>
                  <DynamicCard
                     title='Refund'
                     isOpen={ active === 6 }
                     handleInputChange={ handleInputChange }
                     subject='refound_email_subject'
                     body='refound_email'
                     subjectValue={ template.refound_email_subject }
                     bodyValue={ template.refound_email }
                     getEmailTemplateInProgress={ getEmailTemplateInProgress }
                     saveButtonClick={ handleSaveTemplates }
                     isModified={ false }
                  />
               </div> */}
               {/* <div className='m-t-exs save__btn'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Save'
                     onClick={ () => handleSaveTemplates() }
                  />
               </div> */}
            </TemplateIsLoading>
         </div>
      )
   );
};

EmailTemplates.propTypes = {
   active: PropTypes.number,
   handleCourseSelectChange: PropTypes.func,
   courseSelectChange: PropTypes.number,
   courses: PropTypes.array,
   template: PropTypes.object,
   autoEmails: PropTypes.object,
   handleInputChange: PropTypes.func,
   checkBoxValues: PropTypes.object,
   handleSaveTemplates: PropTypes.func,
   handleCheckboxChange: PropTypes.func,
   handleCheckboxChangeForCourse: PropTypes.func,
   handleInputChangeAutoEmail: PropTypes.func,
   handleRevertAutoEmail: PropTypes.func,
   handleSaveAutoEmail: PropTypes.func,
   getEmailTemplateInProgress: PropTypes.bool,
};

export default EmailTemplates;
