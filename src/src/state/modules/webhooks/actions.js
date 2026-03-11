import * as types from './types';

export const getWebhooksStart = () => ({
   type: types.GET_WEBHOOKS_START,
});

export const getWebhooksCompleted = (data) => ({
   type: types.GET_WEBHOOKS_COMPLETED,
   payload: { data },
});

export const getWebhooksFailed = (errors) => ({
   type: types.GET_WEBHOOKS_FAILED,
   payload: errors,
});

export const getWebhookByIdStart = () => ({
   type: types.GET_WEBHOOKBYID_START,
});

export const getWebhookByIdCompleted = (data) => ({
   type: types.GET_WEBHOOKBYID_COMPLETED,
   payload: { data },
});

export const getWebhookByIdFailed = (errors) => ({
   type: types.GET_WEBHOOKBYID_FAILED,
   payload: errors,
});

export const getWebhookLogsStart = () => ({
   type: types.GET_WEBHOOKLOGS_START,
});

export const getWebhookLogsCompleted = (data) => ({
   type: types.GET_WEBHOOKLOGS_COMPLETED,
   payload: { data },
});

export const getWebhookLogsFailed = (errors) => ({
   type: types.GET_WEBHOOKLOGS_FAILED,
   payload: errors,
});

export const createWebhookStart = () => ({
   type: types.CREATE_WEBHOOKS_START,
});

export const createWebhookCompleted = (data) => ({
   type: types.CREATE_WEBHOOKS_COMPLETED,
   payload: { data },
});

export const createWebhookFailed = (errors) => ({
   type: types.CREATE_WEBHOOKS_FAILED,
   payload: {
      errors,
   },
});

export const deleteWebhookStart = () => ({
   type: types.DELETE_WEBHOOK_START,
});

export const deleteWebhookCompleted = (id) => ({
   type: types.DELETE_WEBHOOK_COMPLETED,
   payload: { id },
});

export const deleteWebhookFailed = (errors) => ({
   type: types.DELETE_WEBHOOK_FAILED,
   payload: errors,
});

export const updateWebhookStart = () => ({
   type: types.UPDATE_WEBHOOK_START,
});

export const updateWebhookCompleted = (id, inputs) => ({
   type: types.UPDATE_WEBHOOK_COMPLETED,
   payload: {
      id,
      inputs,
   },
});

export const updateWebhookFailed = (errors) => ({
   type: types.UPDATE_WEBHOOK_FAILED,
   payload: {
      errors,
   },
});


export const setInput = (key, value, target) => {
   return {
      type: types.SET_INPUT,
      payload: {
         key,
         value,
         target,
      },
   };
};


export const resetWebhook = () => {
   return {
      type: types.RESET_WEBHOOK,
   };
};
