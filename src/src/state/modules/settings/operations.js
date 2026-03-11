import {
   getSettings, putSettings, createCustomLink, updateCustomLink, setSchoolRoomCodes,
   deleteCustomLink, getSingleVideo, getVideosByDate, addIntegration, disconnectIntegration,
   deleteAccountDomain, customLinksReorder, getUploadsSize, initSiteDetails, createApiKey,
   getFromEmail, updateFromEmail, addIntegrationPaypal, saveEmailNotification,
   getApiKey, getAllCoursesOptimized, updateEmailNotifications, getScripts, createScript,
   deleteScript, updateScript, updateFromEmailDesign, getEmailNotifications, getEmailNotificationsFromMeta,
   getSchoolRoomCodes,
} from 'api/AuthApi';
import * as action from 'state/modules/settings/actions';
import { toast } from 'react-toastify';
import { difference } from 'lodash';
import { siteDetailsInitOperation } from 'state/modules/common/operations';
import isPrint from '../designCourse/edit/Error';


export const settingsInitOperation = (tabName) => {
   return async (dispatch) => {
      dispatch(action.setInitDataStart());
      try {
         const {
            data,
         } = await getSettings(tabName);
         dispatch(action.setInitDataCompleted(tabName, data));
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

export const getAllCoursesOperation = () => {
   return async (dispatch) => {
      try {
         const {
            data,
         } = await getAllCoursesOptimized();
         dispatch(action.getAllCoursesCompleted(data));
      } catch (error) {
         dispatch(action.getSettingsFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const settingsGetOperation = (tabName, pageNum, count) => {
   return async (dispatch) => {
      dispatch(action.getSettingsStart());
      try {
         if (tabName === 'videoanalytics') {
            const {
               data,
            } = await getSettings(tabName, pageNum, count);
            dispatch(action.getSettingsCompleted(tabName, data));
         } else {
            const {
               data,
            } = await getSettings(tabName);
            dispatch(action.getSettingsCompleted(tabName, data));
         }
         if (tabName === 'emails') {
            dispatch(action.getFromEmailStart());
            const { data } = await getFromEmail();
            dispatch(action.getFromEmailCompleted(data));
         }
      } catch (error) {
         dispatch(action.getSettingsFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const updateFromEmailOperation = (inputs, isDesign) => {
   document.querySelector('.settings-email-save').setAttribute('disabled', 'disabled');
   return async (dispatch) => {
      try {
         const { data, status } = isDesign ? await updateFromEmailDesign(inputs) : await updateFromEmail(inputs);
         if (isPrint('Email Settings Updated Successfully')) {
            toast.success('Email Settings Updated Successfully');
         }
         if (!isDesign) {
            await siteDetailsInitOperation()(dispatch);
         }
         document.querySelector('.settings-email-save').removeAttribute('disabled');
         if (status === 201 || status === 204) {
            dispatch(action.getFromEmailCompleted(inputs));
            if (isPrint(data.message)) {
               toast.success(data.message);
            }
         }
         dispatch(action.setDnsSettingsState(true));
      } catch (err) {
         if (document.querySelector('.settings-email-save')) {
            document.querySelector('.settings-email-save').removeAttribute('disabled');
         }
         const { response: { data: { errors = {}, message } = {} } = {} } = err;
         Object.values(errors).map(e => {
            if (isPrint(e.join(' '))) {
               return toast.error(e.join(' '));
            }
            return null;
         });
         if (Object.keys(errors).length === 0 && message) {
            if (isPrint(message)) {
               toast.error(message);
            }
         }
      }
   };
};

export const videosGetOperation = (tabName, pageNum, count) => {
   return async (dispatch) => {
      dispatch(action.getVideosStart());
      try {
         const {
            data,
         } = await getSettings(tabName, pageNum, count);
         dispatch(action.getVideosCompleted(tabName, data));
      } catch (error) {
         dispatch(action.getVideosFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const videosGetbyDateOperation = (date, pageNum, count) => {
   return async (dispatch) => {
      dispatch(action.getVideosbyDateStart());
      try {
         const {
            data,
         } = await getVideosByDate(date, pageNum, count);
         dispatch(action.getVideosbyDateCompleted('videoanalytics', data));
      } catch (error) {
         dispatch(action.getVideosbyDateFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getSingleVideoOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.getSingleVideoStart());
      try {
         const {
            data,
         } = await getSingleVideo(id);
         dispatch(action.getSingleVideoCompleted(data));
      } catch (error) {
         dispatch(action.getSingleVideoFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const addIntegrationOperation = (integration, body) => {
   if (integration === 'paypalv2' && document.querySelector('#paypalv2')) {
      document.querySelector('#paypalv2').setAttribute('disabled', 'disabled');
   }
   
   return async (dispatch) => {
      try {
         if (integration === 'paypal' || integration === 'stripe' || integration === 'paypalv2' || integration === 'paypal-v2') {
            const initData = await initSiteDetails();
            if (initData.data && initData.data.user && initData.data.user.uuid) {
               window.dataLayer.push({
                  'event': 'payment integration added',
                  'id': initData.data.user.uuid,
                  'first time': initData.data.metas.is_payment_updated === '0' && initData.data.user.version === 1 ? 'yes' : 'no',
               });
            }
         }

         if (integration !== 'paypalv2') {
            const { data } = await addIntegration(integration, body);
            
            if (data && data.message && data.message.includes('Already Connected')) {
               throw new Error(data.message);
            }
            
            if (data && data.error) {
               throw new Error(data.message || 'Connection failed');
            }
            
            const ouaths = ['paypal', 'stripe', 'aweber'];
            if (ouaths.includes(integration) && data.redirect_url) {
               window.location.href = data.redirect_url;
            } else {
               if (isPrint('Successfully connected.')) {
                  toast.success('Successfully connected.');
               }
               dispatch(settingsGetOperation('integrations'));
            }
         } else {
            if (!body.paypal_client_id_v2 || !body.paypal_secret_v2) {
               throw new Error('Please fill in all the required fields.');
            }
            
            const response = await addIntegrationPaypal(body);
            
            if (document.querySelector('#paypalv2')) {
               document.querySelector('#paypalv2').removeAttribute('disabled');
            }
            
            if (response && response.data && response.data.status === 404) {
               throw new Error(response.data.message || 'Connection failed');
            }
            
            if (response.data && response.data.message && response.data.message.includes('Already Connected')) {
               throw new Error(response.data.message);
            }
            
            if (response.data && response.data.error) {
               throw new Error(response.data.message || 'Connection failed');
            }
            
            if (isPrint('Successfully connected.')) {
               toast.success('Successfully connected.');
            }
            dispatch(settingsGetOperation('integrations'));
         }
      } catch (error) {
         if (document.querySelector('#paypalv2')) {
            document.querySelector('#paypalv2').removeAttribute('disabled');
         }
         
         let errorMessage = 'Connection failed';
         
         
         if (error.response && error.response.data) {
            const responseData = error.response.data;
            
            if (responseData.message) {
               errorMessage = responseData.message;
            } else if (responseData.error) {
               errorMessage = responseData.error;
            } else if (responseData.paymenth_method === 'braintree' && responseData.error) {
               errorMessage = responseData.error;
            } else if (responseData.payment_method === 'zoom' && responseData.error) {
               errorMessage = responseData.error;
            } else if (responseData.errors) {
               const errors = responseData.errors;
               if (typeof errors === 'object') {
                  const firstError = Object.values(errors)[0];
                  if (Array.isArray(firstError)) {
                     errorMessage = firstError[0];
                  } else {
                     errorMessage = firstError;
                  }
               } else {
                  errorMessage = errors;
               }
            }
         } else if (error.message && !error.message.includes('status code')) {
            errorMessage = error.message;
         }
         
         
         // Always re-throw the error so the container can catch it
         const finalError = new Error(errorMessage);
         finalError.response = error.response; // Preserve original response
         throw finalError;
      }
   };
};

export const disconnectIntegrationOperation = (integration) => {
   let integretionSetting = integration;
   if (integration === 'paypalv2') {
      integretionSetting = 'paypal-v2';
   }
   return async (dispatch) => {
      try {
         const res = await disconnectIntegration(integretionSetting);
         
         if (res && res.data === 'Remove pricings first!') {
            dispatch(action.disableDisconnectIntegration());
            throw new Error('Remove pricings first!');
         }
         
         if (res && res.data && res.data.error) {
            throw new Error(res.data.message || 'Disconnect failed');
         }
         
         if (isPrint('Disconnected.')) {
            toast.success('Disconnected.');
            dispatch(settingsGetOperation('integrations'));
         }
      } catch (error) {
         let errorMessage = 'Disconnect failed';
         
         if (error.message) {
            errorMessage = error.message;
         } else if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
         }
         
         throw new Error(errorMessage);
      }
   };
};
export const settingsPutOperation = (inputs, formName) => {
   return async (dispatch) => {
      dispatch(action.putSettingsStart());
      try {
         const initData = await initSiteDetails();
         if (initData.data && initData.data.user && initData.data.user.uuid) {
            window.dataLayer.push({
               'event': 'student room settings saved',
               'id': initData.data.user.uuid,
               'first time': initData.data.metas.is_main_hub_updated === '0' && initData.data.user.version === 1 ? 'yes' : 'no',
            });
         }
         // eslint-disable-next-line no-param-reassign
         inputs.is_main_hub_updated = '1';
         if (inputs.domain === null) {
            // eslint-disable-next-line no-param-reassign
            delete inputs.domain;
         }

         const {
            status, data,
         } = await putSettings(inputs, formName);

         if (status === 201 || status === 204) {
            if (inputs.title) {
               document.title = inputs.title;
            }
            if (formName === 'account') {
               dispatch(action.putSettingsCompleted(inputs));
            } else if (formName === 'mainhub') {
               dispatch(action.updateClassDataCompleted(data.class_data));
            } else {
               dispatch(action.putSettingsCompleted());
            }

            if (isPrint('The settings has been saved')) {
               toast.success('The settings has been saved');
            }
            if (inputs.subdomain) {
               window.location = `${ process.env.REACT_APP_PROTOCOL }${ inputs.subdomain }.${ process.env.REACT_APP_MAIN_DOMAIN }?jwt-token=${ localStorage.getItem('authToken') }`;
            }
         }
      } catch (error) {
         dispatch(action.putSettingsFailed(error.response && error.response.data));
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
               if (formName === 'account') {
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
            }
         } else if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const createCustomLinkOperation = (inputs, header) => {
   return async (dispatch) => {
      dispatch(action.createCustomLinkStart());
      try {
         const {
            data,
         } = await createCustomLink(inputs);
         dispatch(action.createCustomLinkCompleted(data));
         if (header) {
            if (isPrint('Header link saved successfully.')) {
               toast.success('Header link saved successfully.');
            }
         } else if (isPrint('Footer link saved successfully.')) {
            toast.success('Footer link saved successfully.');
         }
      } catch (error) {
         dispatch(action.createCustomLinkFailed(error.response && error.response.data));

         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               if (error.response.data.errors.href) {
                  if (isPrint(error.response.data.errors.href[0])) {
                     toast.error(error.response.data.errors.href[0]);
                  }
               }
               if (error.response.data.errors.target) {
                  if (isPrint(error.response.data.errors.target[0])) {
                     toast.error(error.response.data.errors.target[0]);
                  }
               }
               if (error.response.data.errors.position) {
                  if (isPrint(error.response.data.errors.position[0])) {
                     toast.error(error.response.data.errors.position[0]);
                  }
               }
               if (error.response.data.errors.text) {
                  if (isPrint(error.response.data.errors.text[0])) {
                     toast.error(error.response.data.errors.text[0]);
                  }
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

export const updateCustomLinkOperation = (id, inputs, header) => {
   return async (dispatch) => {
      dispatch(action.updateCustomLinkStart());
      try {
         await updateCustomLink(id, inputs);
         dispatch(action.updateCustomLinkCompleted(id, inputs));
         if (header) {
            if (isPrint('Header link saved successfully.')) {
               toast.success('Header link saved successfully.');
            }
         } else if (isPrint('Footer link saved successfully.')) {
            toast.success('Footer link saved successfully.');
         }
      } catch (error) {
         dispatch(action.updateCustomLinkFailed(error.response && error.response.data));
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               if (error.response.data.errors.href) {
                  if (isPrint(error.response.data.errors.href[0])) {
                     toast.error(error.response.data.errors.href[0]);
                  }
               }
               if (error.response.data.errors.target) {
                  if (error.response.data.errors.target[0]) {
                     toast.error(error.response.data.errors.target[0]);
                  }
               }
               if (error.response.data.errors.position) {
                  if (error.response.data.errors.position[0]) {
                     toast.error(error.response.data.errors.position[0]);
                  }
               }
               if (error.response.data.errors.text) {
                  if (error.response.data.errors.text[0]) {
                     toast.error(error.response.data.errors.text[0]);
                  }
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

export const deleteCustomLinkOperation = (id, header) => {
   return async (dispatch) => {
      dispatch(action.deleteCustomLinkStart());
      try {
         await deleteCustomLink(id);
         dispatch(action.deleteCustomLinkCompleted(id));
         if (header) {
            if (isPrint('Header link has been deleted successfully.')) {
               toast.success('Header link has been deleted successfully.');
            }
         } else if (isPrint('Footer link has been deleted successfully.')) {
            toast.success('Footer link has been deleted successfully.');
         }
      } catch (error) {
         dispatch(action.deleteCustomLinkFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const deleteAccountDomainOperation = () => {
   return async (dispatch) => {
      dispatch(action.deleteAccountDomainStart());
      try {
         await deleteAccountDomain();
         dispatch(action.deleteAccountDomainCompleted());
         if (isPrint('Custom domain has been deleted successfully.')) {
            toast.success('Custom domain has been deleted successfully.');
         }
      } catch (error) {
         dispatch(action.deleteAccountDomainFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const customLinksReorderOperation = (data, newCustomLinks) => {
   return async (dispatch) => {
      try {
         await customLinksReorder(data);
         dispatch(action.customLinksReorderCompleted(newCustomLinks));
      } catch (error) {
         if (error.response) {
            dispatch(action.customLinksReorderFailed(error.response));
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
            // eslint-disable-next-line no-console
         }
      }
   };
};

export const getFileSizeInfoOperation = () => {
   return async (dispatch, getState) => {
      dispatch(action.getFileSizeInfoStart());

      const state = getState();
      try {
         if (!Object.keys(state.settings.fileSizeInfo).length) {
            const {
               data,
            } = await getUploadsSize();
   
            dispatch(action.getFileSizeInfoCompleted(data));
         }
      } catch (error) {
         dispatch(action.getFileSizeInfoFailed());
      }
   };
};


export const createApiKeyOperation = () => {
   return async (dispatch) => {
      dispatch(action.createApikeyStart());
      try {
         const {
            data,
         } = await createApiKey();
         dispatch(action.createApikeyCompleted(data));
      } catch (error) {
         dispatch(action.createApikeyFailed(error.response && error.response.data));
      }
   };
};

export const getApiKeyOperation = () => {
   return async (dispatch) => {
      dispatch(action.getApikeyStart());
      try {
         const {
            data,
         } = await getApiKey();
         dispatch(action.getApikeyCompleted(data));
      } catch (error) {
         dispatch(action.getApikeyFailed(error.response && error.response.data));
      }
   };
};

export const updateLanguagesOperation = (value) => {
   document.querySelector('.language-save').setAttribute('disabled', 'disabled');
   return async () => {
      //  dispatch(action.updateEmailNotificationsStart());
      try {
         await updateEmailNotifications('languages_pack', value);
         document.querySelector('.language-save').removeAttribute('disabled');
         // dispatch(action.updateEmailNotificationsCompleted(key, value));
         if (isPrint('Languages settings saved successfully.')) {
            toast.success('Languages settings saved successfully.');
         }
      } catch (error) {
         document.querySelector('.language-save').removeAttribute('disabled');
         // dispatch(action.updateEmailNotificationsFailed(error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getScriptsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getScriptsStart());
      try {
         const {
            data,
         } = await getScripts();
         dispatch(action.getScriptsCompleted(data));
      } catch (error) {
         dispatch(action.getScriptsFailed(error.response && error.response.data));
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const createScriptOperation = (script) => {
   return async (dispatch) => {
      dispatch(action.createScriptStart());
      try {
         const {
            data,
         } = await createScript(script);
         if (isPrint('New Script is Added.')) {
            toast.success('New Script is Added.');
         }
         dispatch(action.createScriptCompleted(data));
      } catch (error) {
         dispatch(action.createScriptFailed(error.response && error.response.data));
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               const errorMessage = error.response.data.errors;
               if (errorMessage.script && errorMessage.script[0]) {
                  if (isPrint(errorMessage.script[0])) {
                     toast.error(errorMessage.script[0]);
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

export const deleteScriptOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.deleteScriptStart());
      try {
         await deleteScript(id);
         if (isPrint('The Script is deleted successfully.')) {
            toast.success('The Script is deleted successfully.');
         }
         dispatch(action.deleteScriptCompleted(id));
      } catch (error) {
         dispatch(action.deleteScriptFailed(error.response && error.response.data));
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const updateScriptOperation = (script) => {
   return async (dispatch) => {
      dispatch(action.updateScriptStart());
      try {
         await updateScript(script);
         if (isPrint('The Script is updated successfully.')) {
            toast.success('The Script is updated successfully.');
         }
         dispatch(action.updateScriptCompleted(script));
      } catch (error) {
         dispatch(action.updateScriptFailed(error.response && error.response.data));
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getNotifications = () => {
   return async (dispatch) => {
      dispatch(action.getNotificationsStart());
      try {
         const { data } = await getEmailNotifications();
         dispatch(action.getNotificationsComplected(data));
      } catch (error) {
         dispatch(action.getNotificationsFailed());
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const getNotificationsMeta = () => {
   return async (dispatch) => {
      dispatch(action.getNotificationsStart());
      try {
         const { data } = await getEmailNotificationsFromMeta();
         dispatch(action.getNotificationsComplected(data));
      } catch (error) {
         dispatch(action.getNotificationsFailed());
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const saveNotifications = (prev, next) => {
   return async (dispatch) => {
      dispatch(action.saveNotificationStart());
      try {
         const toUpdate = difference(next, prev);
         await saveEmailNotification(toUpdate);
         if (isPrint('Email Notifications Updated Successfully.')) {
            toast.success('Email Notifications Updated Successfully.');
         }
         const { data } = await getEmailNotifications();
         dispatch(action.getNotificationsComplected(data));
      } catch (error) {
         dispatch(action.saveNotificationFailed());
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const putSchoolCodesOperation = (inputs) => {
   return async (dispatch) => {
      dispatch(action.saveSchoolCodesStart());
      try {
         await setSchoolRoomCodes(inputs);
         if (isPrint('Settings Updated Successfully')) {
            toast.success('Settings Updated Successfully');
         }
         dispatch(action.saveSchoolCodesCompleted(inputs));
      } catch (error) {
         dispatch(action.saveSchoolCodesFailed());
         if (error.response.message) {
            if (isPrint(error.response.message)) {
               toast.error(error.response.message);
            }
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getSchoolRoomCodesOperation = () => {
   return async (dispatch) => {
      dispatch(action.getSchoolCodesStart());
      try {
         const { data } = await getSchoolRoomCodes();
         dispatch(action.getSchoolCodesCompleted(data));
      } catch (error) {
         dispatch(action.getSchoolCodesFailed());
         if (error.response.message) {
            if (isPrint(error.response.message)) {
               toast.error(error.response.message);
            }
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
