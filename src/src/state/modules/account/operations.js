
import * as AuthApi from 'api/AuthApi';
import { toast } from 'react-toastify';
import * as actions from './actions';
import isPrint from '../designCourse/edit/Error';
import { changeAuthFromMyAccount } from '../common/operations';

export const getAdmin = () => {
   return async (dispatch) => {
      dispatch(actions.getAccountInfoStart());
      try {
         const { data } = await AuthApi.getSettings('account');
         dispatch(actions.getAccountInfoCompleted(data));
      } catch (error) {
         dispatch(actions.getAccountInfoFailed());
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const SaveAccount = (inputs) => {
   return async (dispatch) => {
      dispatch(actions.setAccountInfoStart());
      try {
         await AuthApi.putSettings(inputs, 'account');
         const { data } = await AuthApi.getSettings('account');
         dispatch(actions.getAccountInfoCompleted(data));
         const { name } = data;
         changeAuthFromMyAccount({
            name,
            picture_full_src: data.picture_full_src,
            picture_src: data.picture_src,
         })(dispatch);
         if (isPrint('The settings has been saved')) {
            toast.success('The settings has been saved');
         }
      } catch (error) {
         dispatch(actions.setAccountInfoFinish());
         let errorMessage;
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               errorMessage = error.response.data.errors;
               if (errorMessage.from_name) {
                  if (isPrint(errorMessage.from_name[0])) {
                     toast.error(errorMessage.from_name[0]);
                  }
               }
               if (errorMessage.domain) {
                  if (isPrint(errorMessage.domain[0])) {
                     toast.error(errorMessage.domain[0]);
                  }
               }
               if (errorMessage.from_email_address) {
                  if (isPrint(errorMessage.from_email_address[0])) {
                     toast.error(errorMessage.from_email_address[0]);
                  }
               }
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
               if (errorMessage.name && errorMessage.name[0]) {
                  if (isPrint(errorMessage.name[0])) {
                     toast.error(errorMessage.name[0]);
                  }
               }
               if (errorMessage.email && errorMessage.email[0]) {
                  if (isPrint(errorMessage.email[0])) {
                     toast.error(errorMessage.email[0]);
                  }
               }
               if (errorMessage.subdomain && errorMessage.subdomain[0]) {
                  if (isPrint(errorMessage.subdomain[0])) {
                     toast.error(errorMessage.subdomain[0]);
                  }
               }
               if (errorMessage.domain && errorMessage.domain[0]) {
                  if (isPrint(errorMessage.domain[0])) {
                     toast.error(errorMessage.domain[0]);
                  }
               }
               if (errorMessage.support_email && errorMessage.support_email[0]) {
                  if (isPrint(errorMessage.support_email[0])) {
                     toast.error(errorMessage.support_email[0]);
                  }
               }
            }
         } else if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getPlansInfo = () => {
   return async (dispatch) => {
      dispatch(actions.getPlanStart());
      try {
         const { data } = await AuthApi.getPlanCards();
         dispatch(actions.getPlanCompleted(data));
      } catch (error) {
         dispatch(actions.getPlanFailed());
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};

export const cancelCurrentAdmin = () => {
   return async (dispatch) => {
      dispatch(actions.cancelAccountStart());
      try {
         await AuthApi.cancelPlan();
         getPlansInfo()(dispatch);
         dispatch(actions.cancelACcountEnd());
         if (isPrint('Subscription cancelled!')) {
            toast.success('Subscription cancelled!');
         }
      } catch (err) {
         dispatch(actions.cancelACcountEnd());
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};


export const reactivateCurrentAdmin = (id) => {
   return async (dispatch) => {
      dispatch(actions.reactivateAccountStart());
      try {
         await AuthApi.reactivateSub(id);
         getPlansInfo()(dispatch);
         dispatch(actions.reactivateAccountEnd());
         if (isPrint('Subscription reactivated!')) {
            toast.success('Subscription reactivated!');
         }
      } catch (err) {
         dispatch(actions.reactivateAccountEnd());
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};
export const updateCardOperation = (inputs) => {
   return async (dispatch) => {
      dispatch(actions.updateCardStart());
      try {
         await AuthApi.updateCard(inputs);
         if (isPrint('Card Changed Successfully')) {
            toast.success('Card Changed Successfully');
         }
         window.location.reload();
      } catch (error) {
         dispatch(actions.updateCardEnd());
         const { response: { status, data: { message } = {} } = {} } = error;
         if (message === 'You can only upgrade your plan!') {
            dispatch(actions.updateCardEnd(false));
         } else {
            dispatch(actions.updateCardEnd());
            if (status !== 401) {
               if (isPrint(message)) {
                  toast.error(message);
               }
            } else if (error && error.response && error.response.message) {
               toast.error(error.response.message);
            }
         }
      }
   };
};

export const changePlanOperation = (planId) => {
   return async (dispatch) => {
      dispatch(actions.changePlanStart());
      try {
         await AuthApi.changePlan(planId);
         if (isPrint('Plan Changed Successfully')) {
            toast.success('Plan Changed Successfully');
         }
         dispatch(actions.changePlanEnd());
         window.location.reload();
      } catch (error) {
         dispatch(actions.changePlanEnd());
         const { response: { status, data: { message } = {} } = {} } = error;
         if (status !== 401) {
            if (isPrint(message)) {
               toast.error(message);
            }
         }
      }
   };
};

export const saveBillingData = (data) => {
   return async (dispatch) => {
      dispatch(actions.saveBillingDataStart());
      try {
         await AuthApi.putSettings(data, 'account');
         dispatch(actions.saveBillingDataEnd(data));
         if (isPrint('Changes saved successfully.')) {
            toast.success('Changes saved successfully.');
         }
      } catch (error) {
         dispatch(actions.saveBillingDataFailed());
         if (isPrint('Somethin went wront')) {
            toast.error('Somethin went wrong');
         }
      }
   };
};


export const UpdatePaymentOperation = (id) => {
   return async (dispatch) => {
      dispatch(actions.updateCardStart());
      try {
         await AuthApi.updateBillingCard(id);
         toast.success('Payment method updated successfully');
         setTimeout(() => {
            window.location.reload();
         }, 200);
         dispatch(actions.updateCardEnd());
      } catch (error) {
         dispatch(actions.updateCardEnd());
      }
   };
};


export const connectToPlanOperation = (plan) => {
   return async (dispatch) => {
      dispatch(actions.connectToPlanStart());
      try {
         const data = await AuthApi.connectToPlan(plan);
         if (isPrint('Plan Connected Successfully')) {
            toast.success('Plan Connected Successfully');
         }
         setTimeout(() => {
            window.location.reload();
         }, 200);
         dispatch(actions.connectToPlanCompleted(data));
      } catch (error) {
         dispatch(actions.connectToPlanFailed());
         const { response: { status, data: { message } = {} } = {} } = error;
         if (status !== 401) {
            if (isPrint(message)) {
               toast.error(message);
            } else if (error && error.response && error.response.message) {
               toast.error(error.response.message);
            } else if (isPrint('Please contact support.')) {
               toast.error('Please contact support.');
            }
         }
      }
   };
};
