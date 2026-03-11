import {
   updateAccount,
   getAccount,
   resetAccountCourse,
   cancelSubscription,
} from 'api/AuthApi';
import * as action from 'state/modules/studentAccount/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';


export const accountInitOperation = () => {
   return async (dispatch) => {
      dispatch(action.setInitDataStart());
      try {
         const {
            data,
         } = await getAccount('account');
         dispatch(action.setInitDataCompleted('account', data));
      } catch (error) {
         dispatch(action.setInitDataFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const accountGetOperation = (tabName, pageNum, count) => {
   return async (dispatch) => {
      dispatch(action.getAccountStart());
      try {
         if (tabName === 'courses') {
            const {
               data,
            } = await getAccount(tabName, pageNum, count);

            dispatch(action.getAccountCompleted(tabName, data));
         } else {
            const {
               data,
            } = await getAccount(tabName);
            dispatch(action.getAccountCompleted(tabName, data));
         }
      } catch (error) {
         dispatch(action.getAccountFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const updateAccountOperation = (id, inputs) => {
   return async (dispatch) => {
      dispatch(action.updateAccountStart());
      try {
         const {
            status,
         } = await updateAccount(id, inputs);

         if (status === 204) {
            dispatch(action.updateAccountCompleted(inputs));
            if (isPrint('Account has been saved')) {
               toast.success('Account has been saved');
            }
         }
      } catch (error) {
         dispatch(action.updateAccountFailed(error.response && error.response.data));
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               const errorMessage = error.response.data.errors;
               if (errorMessage.password && errorMessage.password[0]) {
                  if (errorMessage.password[1]) {
                     if (isPrint(errorMessage.password[1])) {
                        toast.error(errorMessage.password[1]);
                     }
                  }
                  if (isPrint(errorMessage.password[0])) {
                     toast.error(errorMessage.password[0]);
                  }
               }
               if (errorMessage.current_password && errorMessage.current_password[0]) {
                  if (isPrint(errorMessage.current_password[0])) {
                     toast.error(errorMessage.current_password[0]);
                  }
               }
               if (errorMessage.name && errorMessage.name[0]) {
                  if (isPrint(errorMessage.name[0])) {
                     toast.error(errorMessage.name[0]);
                  }
               }
               if (errorMessage.email && errorMessage.email[0]) {
                  toast.error(errorMessage.email[0]);
                  if (isPrint(errorMessage.email[0])) {
                     toast.error(errorMessage.email[0]);
                  }
               }
            }
         } else if (error.response && error.response.data && error.response.data && error.response.data.password) {
            if (error.response.status !== 401) {
               if (isPrint(error.response.data.password[0])) {
                  toast.error(error.response.data.password[0]);
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


export const resetAccountCourseOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.resetAccountCourseStart());
      try {
         const data = await resetAccountCourse(id);

         if (data.status === 204) {
            dispatch(action.resetAccountCourseCompleted(data));
            if (isPrint('Your Class reset successfully')) {
               toast.success('Your Class reset successfully');
            }
         }
      } catch (error) {
         dispatch(action.resetAccountCourseFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const cancelSubscriptionOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.cancelSubscriptionStart());
      try {
         const data = await cancelSubscription(id);

         if (data.status === 204) {
            dispatch(action.cancelSubscriptionCompleted(id));
            if (isPrint('Your subscription has been successfully canceled')) {
               toast.success('Your subscription has been successfully canceled');
            }
         }
      } catch (error) {
         dispatch(action.cancelSubscriptionFailed());
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
