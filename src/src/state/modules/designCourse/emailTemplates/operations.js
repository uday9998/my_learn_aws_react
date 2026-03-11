import {
   getEmailTemplates, getEmailTemplate, updateEmailTemplate,
   updateEmailNotifications, getAutoEmails, updateAutoEmailTemplate, revertAutoEmailTemplate,
} from 'api/AuthApi';
import * as action from 'state/modules/designCourse/emailTemplates/actions';
import { toast } from 'react-toastify';
import isPrint from '../edit/Error';


export const getEmailTemplatesOperation = () => {
   return async (dispatch) => {
      dispatch(action.getEmailTemplatesStart());
      try {
         const {
            data,
         } = await getEmailTemplates();
         if (data.courses[0]) {
            const emailTemplateFirst = await getEmailTemplate(data.courses[0].id);
            dispatch(action.getEmailTemplatesCompleted(data, emailTemplateFirst.data));
         } else {
            dispatch(action.getEmailTemplatesCompleted(data, {}));
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.getEmailTemplatesFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getAutoEmailsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getAutoEmailTemplatesStart());
      try {
         const { data } = await getAutoEmails();
         dispatch(action.getAutoEmailTemplatesCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getAutoEmailTemplatesFailed(error.response.data));
         }
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};

export const revertAutoEmailTemplateOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.revertAutoEmailTemplateStart());
      try {
         const { data } = await revertAutoEmailTemplate(id);
         dispatch(action.revertAutoEmailTemplateCompleted(data));
         if (isPrint('The email notification saved successfully.')) {
            toast.success('The email notification saved successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.revertAutoEmailTemplateFailed(error.response.data));
         }
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};

export const updateAutoEmailTemplateOperation = (template) => {
   if (document.querySelector('.email-save')) {
      document.querySelector('.email-save').setAttribute('disabled', 'disabled');
   }
   return async (dispatch) => {
      dispatch(action.updateAutoEmailTemplatesStart());
      try {
         const { data } = await updateAutoEmailTemplate(template.id, { subject: template.subject, body: template.body });
         if (document.querySelector('.email-save')) {
            document.querySelector('.email-save').removeAttribute('disabled');
         }
         dispatch(action.updateAutoEmailTemplatesCompleted(data));
         if (isPrint('The email notification saved successfully.')) {
            toast.success('The email notification saved successfully.');
         }
      } catch (error) {
         if (document.querySelector('.email-save')) {
            document.querySelector('.email-save').removeAttribute('disabled');
         }
         if (error.response) {
            dispatch(action.updateAutoEmailTemplatesFailed(error.response.data));
         }
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};


export const getEmailTemplateOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.getEmailTemplateStart());
      try {
         const { data } = await getEmailTemplate(id);
         dispatch(action.getEmailTemplateCompleted(data));
      } catch (error) {
         dispatch(action.getEmailTemplateFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const updateEmailTemplateOperation = (inputs) => {
   if (document.querySelector('.email-save')) {
      document.querySelector('.email-save').setAttribute('disabled', 'disabled');
   }
   return async (dispatch) => {
      dispatch(action.updateEmailTemplateStart());
      try {
         await updateEmailTemplate(inputs);
         if (document.querySelector('.email-save')) {
            document.querySelector('.email-save').removeAttribute('disabled');
         }
         dispatch(action.updateEmailTemplateCompleted(inputs));
         if (isPrint('The email notification saved successfully.')) {
            toast.success('The email notification saved successfully.');
         }
      } catch (error) {
         if (document.querySelector('.email-save')) {
            document.querySelector('.email-save').removeAttribute('disabled');
         }
         dispatch(action.updateEmailTemplateFailed(error.response && error.response.data));
         if (error.response && error.response.data) {
            if (error.response.status !== 401) {
               if (isPrint('Please add a text in the email.')) {
                  toast.error('Please add a text in the email.');
               }
            }
         } else {
            // eslint-disable-next-line no-lonely-if
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const updateEmailNotificationsOperation = (key, value) => {
   if (document.querySelector('.email-save')) {
      document.querySelector('.email-save').setAttribute('disabled', 'disabled');
   }
   return async (dispatch) => {
      //  dispatch(action.updateEmailNotificationsStart());
      try {
         await updateEmailNotifications(key, value);
         if (document.querySelector('.email-save')) {
            document.querySelector('.email-save').removeAttribute('disabled');
         }
         dispatch(action.updateEmailNotificationsCompleted(key, value));
         if (isPrint('The email notification saved successfully.')) {
            toast.success('The email notification saved successfully.');
         }
      } catch (error) {
         if (document.querySelector('.email-save')) {
            document.querySelector('.email-save').removeAttribute('disabled');
         }

         // dispatch(action.updateEmailNotificationsFailed(error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
