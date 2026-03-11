

import {
   getWebHooksData, getWebHookById, getWebHookLogs, createWebHook, deleteWebHook, updateWebHook,
} from 'api/AuthApi';
import * as action from 'state/modules/webhooks/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';

export const getWebHooksOperation = () => {
   return async (dispatch) => {
      dispatch(action.getWebhooksStart());
      try {
         const {
            data,
         } = await getWebHooksData();
         dispatch(action.getWebhooksCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getWebhooksFailed(error.response.data));
            if (error.response.status !== 401) {
               if (error.response.data.message && isPrint(error.response.data.message)) {
                  toast.error(error.response.data.message);
               } else if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const getWebHookByIdOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.getWebhookByIdStart());
      try {
         const {
            data,
         } = await getWebHookById(id);
         dispatch(action.getWebhookByIdCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getWebhookByIdFailed(error.response.data));
            if (error.response.status !== 401) {
               if (error.response.data.message && isPrint(error.response.data.message)) {
                  toast.error(error.response.data.message);
               } else if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const getWebHookLogsOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.getWebhookByIdStart());
      try {
         const {
            data,
         } = await getWebHookLogs(id);
         dispatch(action.getWebhookLogsCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getWebhookLogsFailed(error.response.data));
            if (error.response.status !== 401) {
               if (error.response.data.message && isPrint(error.response.data.message)) {
                  toast.error(error.response.data.message);
               } else if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const createWebHookOperation = (params) => {
   return async (dispatch) => {
      try {
         const {
            data,
         } = await createWebHook(params);
         dispatch(action.createWebhookCompleted(data));
         if (isPrint('Webhook has been created.')) {
            toast.success('Webhook has been created.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.createWebhookFailed(error.response.data));
            if (error.response.status !== 401) {
               if (error.response.data.message && isPrint(error.response.data.message)) {
                  toast.error(error.response.data.message);
               } else if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const deleteWebHookOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.deleteWebhookStart());
      try {
         await deleteWebHook(id);
         dispatch(action.deleteWebhookCompleted(id));
         if (isPrint('Webhook has been deleted.')) {
            toast.success('Webhook has been deleted.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteWebhookFailed(error.response && error.response.data));
            if (error.response.status !== 401) {
               if (error.response.data.message && isPrint(error.response.data.message)) {
                  toast.error(error.response.data.message);
               } else if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const updateWebHookOperation = (id, inputs) => {
   return async (dispatch) => {
      dispatch(action.updateWebhookStart());
      try {
         await updateWebHook(id, inputs);
         dispatch(action.updateWebhookCompleted(id, inputs));
         if (isPrint('Webhook has been updated.')) {
            toast.success('Webhook has been updated.');
         }
      } catch (error) {
         dispatch(action.updateWebhookFailed(error.response && error.response.data));
         if (error.response) {
            dispatch(action.updateWebhookFailed(error.response && error.response.data));
            if (error.response.status !== 401) {
               if (error.response.data.message && isPrint(error.response.data.message)) {
                  toast.error(error.response.data.message);
               } else if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};
