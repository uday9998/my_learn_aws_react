import {
   getAllCoursesForEmails, sendEmail, getAllUsersEmails, getAdminsEmails, getTags, getTagEmails, getSettings,
   editEmailStatus,
   deleteEmailStatus, getEmailStatuses, sendTestEmail, multiDeleteEmailStatus, duplicateEmail,
} from 'api/AuthApi';
import * as action from 'state/modules/designCourse/emails/actions';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { ErrorPrinter } from 'utils/error';
import isPrint from '../edit/Error';

export const settingsEmailOperation = () => {
   return async (dispatch) => {
      dispatch(action.getSettingsEmailStart());
      try {
         const {
            data,
         } = await getSettings('emails');
         dispatch(action.getSettingsEmailCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getSettingsEmailFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const filterByCoursesOperation = () => {
   return async (dispatch) => {
      dispatch(action.setFilterOptionsStart());
      try {
         const {
            data,
         } = await getAllCoursesForEmails();

         const options = data.reduce((result, current) => {
            return {
               ...result,
               [current.name]: {
                  name: current.name,
                  emails: current.users.map(user => user.email),
               },
            };
         }, {});
         dispatch(action.setFilterOptions(options));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const filterByTagsEmailsOperation = (option, id) => {
   return async (dispatch) => {
      try {
         const {
            data,
         } = await getTagEmails(id);

         const emails = data.map(user => user.email);

         dispatch(action.addFilterOption(option, emails));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const filterByTagsOperation = () => {
   return async (dispatch) => {
      dispatch(action.setFilterOptionsStart());
      try {
         const {
            data,
         } = await getTags();
         const options = data.reduce((result, current) => {
            return {
               ...result,
               [current.name]: {
                  name: current.name,
                  id: current.id,
               },
            };
         }, {});
         dispatch(action.setFilterOptions(options));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const sendEmailOperation = (body, isTest) => {
   return async (dispatch) => {
      dispatch(action.emailSendStart());
      try {
         let data = '';
         if (isTest) {
            data = await sendTestEmail(body);
         } else {
            data = await sendEmail(body);
         }
         dispatch(action.emailSendCompleted(data.status));
         if (!isTest && body.status !== 'draft') {
            if (isPrint('Email sent successfully.')) {
               toast.success('Email sent successfully.');
            }
            dispatch(push(`${ Router.route('ADMIN_EMAILS').getMask() }`));
         } else if (isTest) {
            if (isPrint('Test email sent successfully.')) {
               toast.success('Test email sent successfully.');
            }
         } else if (body.status === 'draft' && !isTest) {
            if (isPrint('Email saved successfully.')) {
               toast.success('Email saved successfully.');
            }
            dispatch(push(`${ Router.route('ADMIN_EMAILS').getMask() }`));
         }
      } catch (error) {
         dispatch(action.emailSendFailed());
         if (error.response.status !== 401) {
            const errorsInput = error.response.data.errors;
            const errors = errorsInput || {};
            if (errors) {
               Object.values(errors).forEach(errorr => {
                  toast.error(errorr.join(' '));
               });
            } else if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const getAllUsersEmailsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getAllUsersEmailsActionStart());
      try {
         const {
            data,
         } = await getAllUsersEmails();
         dispatch(action.getAllUsersEmailsAction(data));
      } catch (error) {
         //  dispatch(action.setInitDataFailed(error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getAdminsEmailsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getAdminsEmailsActionStart());
      try {
         const {
            data,
         } = await getAdminsEmails();
         dispatch(action.getAdminsEmailsAction(data));
      } catch (error) {
         //  dispatch(action.setInitDataFailed(error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const editEmailStatusOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.editEmailStatusStart());
      try {
         const {
            data,
         } = await editEmailStatus(id);
         dispatch(action.editEmailStatusCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.editEmailStatusFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const getEmailStatusesOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.getEmailStatusesStart());
      try {
         const {
            data,
         } = await getEmailStatuses(params);
         dispatch(action.getEmailStatusesCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getEmailStatusesFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const changeEmailStatusPageOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.changeEmailStatusStart());
      try {
         const {
            data,
         } = await getEmailStatuses(params);
         dispatch(action.changeEmailStatusCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.changeEmailStatusFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const deleteEmailStatusOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.deleteEmailStatusStart());
      try {
         const data = await deleteEmailStatus(id);
         if (data.status === 204) {
            if (isPrint('The email has been deleted.')) {
               toast.success('The email has been deleted.');
            }
            dispatch(action.deleteEmailStatusCompleted(id));
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteEmailStatusFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const filterEmailStatusesOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.filterEmailStart());
      try {
         const {
            data,
         } = await getEmailStatuses(params);
         dispatch(action.filterEmailCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.filterEmailFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const multiDeleteEmailsOperation = (ids, callback) => {
   return async dispatch => {
      try {
         dispatch(action.actionEmailsStart());
         await multiDeleteEmailStatus(ids);
         dispatch(action.multiDleteEmailsCompleted(ids));
         if (callback) {
            callback();
         }
      } catch (error) {
         dispatch(action.actionEmailsFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const duplicateEmailOperation = (id) => {
   return async dispatch => {
      try {
         dispatch(action.actionEmailsStart());
         const { data } = await duplicateEmail(id);
         dispatch(action.duplicateEmailCompleted(data));
      } catch (error) {
         dispatch(action.actionEmailsFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};
