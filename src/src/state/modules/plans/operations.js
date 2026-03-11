import {
   addCustomFields,
   addTag,
   deleteCustomFields,
   deleteOrderBum,
   deletePlans,
   deleteUpsell,
   downsellDelete,
   downsellStatusChange,
   getCheckoutLandingsNew,
   getCustomPlanFields,
   getIntegration,
   getPlan,
   getPlansPricings,
   getSettings,
   getTags,
   makeActiveLanding,
   udpatePlanSettings,
   updatePlanMainInfo,
   updatePlanPricing,
   removeAutoresponder,
} from 'api/AuthApi';
import { toast } from 'react-toastify';
import { ErrorPrinter } from 'utils/error';
import axios from 'axios';
import isPrint from '../designCourse/edit/Error.js';
import { addIntegrationOperation } from '../settings/operations.js';
import * as actions from './actions.js';
import { getAuthoresponderSettingsGet } from './utils.js';


export const getPlans = (query, isPagination = false) => {
   return async (dispatch) => {
      try {
         dispatch(actions.getPlansStart());
         const { data } = await getPlansPricings(query, isPagination);
         dispatch(actions.getPlansCompleted(data, isPagination));
      } catch (error) {
         dispatch(actions.getPlansFailed({}));
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const filterPlans = (query, isPagination = false) => {
   return async (dispatch) => {
      try {
         dispatch(actions.filterPlansStart());
         const { data } = await getPlansPricings(query, isPagination);
         dispatch(actions.filterPLansCompleted(data));
      } catch (error) {
         dispatch(actions.filterPlansFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const getPlansNextPageOperation = (query, callBack, isPagination = false) => {
   return async dispatch => {
      try {
         dispatch(actions.getPlansNextPageStart());
         const { data } = await getPlansPricings(query, isPagination);
         dispatch(actions.getPlansNextPageCompleted(data));
         if (callBack) {
            callBack();
         }
      } catch (error) {
         if (!axios.isCancel(error)) {
            dispatch(actions.getPlansNextPageFailed());
            if (error && error.response && error.response.data) {
               ErrorPrinter(error.response);
            }
         }
      }
   };
};


export const deletePlansOperation = (ids, callBack) => {
   return async (dispatch) => {
      try {
         await deletePlans(ids);
         dispatch(actions.deletePlansCompleted(ids));
         callBack();
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};
const integerations = {
   MailChimp: 'mailchimp',
   ConvertKit: 'convertkit',
   AWeber: 'aweber',
   Drip: 'drip',
   ActiveCampaign: 'activecampaign',
};
export const getAutoResponderListsOperation = (integrationCode) => {
   return async (dispatch) => {
      try {
         dispatch(actions.getAuthoresponderOptionsListStart());
         const {
            data,
         } = await getIntegration(integerations[integrationCode]);
         dispatch(actions.getAuthoresponderOptionsListCompleted(data[`${ integerations[integrationCode] }_lists`]));
      } catch (error) {
         dispatch(actions.getAuthoresponderOptionsListFailed());
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const getPlanOperation = (id) => {
   return async dispatch => {
      try {
         dispatch(actions.getPlanStart());
         const { data } = await getPlan(id);
         const { data: integrations } = await getSettings('integrations');
         const { data: tags } = await getTags();
         const { data: fields } = await getCustomPlanFields();
         const { data: landings } = await getCheckoutLandingsNew(id);
         if (data.setting && data.setting.autoresponder && data.setting.autoresponder.autoresponder_type) {
            getAutoResponderListsOperation(data.setting.autoresponder.autoresponder_type)(dispatch);
         }
         dispatch(actions.getPLanCompleted({
            ...data,
            integrations,
            tags,
            setting: data.setting ? {
               ...data.setting,
               ...getAuthoresponderSettingsGet(data.setting),
            } : {},
            fields,
            landings,
         }));
      } catch (error) {
         dispatch(actions.getPLanFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};


export const planInputChangeOperation = (name, value, isQuery) => {
   return async dispatch => {
      try {
         if (name === 'setting' && value.autoresponder === undefined && !!value.list) {
            await removeAutoresponder(value.plan_id);
         } 
         if (name === 'setting' && value.autoresponder !== undefined && isQuery) {
            getAutoResponderListsOperation(value.autoresponder)(dispatch);
         }
         dispatch(actions.planInputChange(name, value));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const planIntegrationOperation = (...params) => {
   return async (dispatch) => {
      try {
         dispatch(actions.planIntegrationStart());
         await addIntegrationOperation(...params)(dispatch);
         const { data: integrations } = await getSettings('integrations');
         dispatch(actions.planIntegrationCompleted(integrations));
      } catch (error) {
         dispatch(actions.planIntegrationFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const planSaveOperation = (data, onError = ErrorPrinter) => {
   return async (dispatch) => {
      try {
         dispatch(actions.planSaveStart());
         const mainPlanSettings = {
            name: data.name,
            course_id: data.course_id,
            status: data.status,
            bundle_courses: data.bundle_courses ? data.bundle_courses.map((e) => e.id) : [],
            thank_you_message: data.thank_you_message,
            thank_you_page_url: data.thank_you_page_url,
            thank_you_page_id: data.thank_you_page_id,
            thank_you_page_active: data.thank_you_page_active,
            picture_src: data.picture_src,
         };
         let pricingsPlanSettings = {
            pricings: data.pricings,
            delete_ids: data.deletedIds,
            setting: {
               taxes: data.taxes,
               send_email: data.send_email,
               email_subject: data.email_subject,
               email_text: data.email_text,
               thank_you_page_active: data.thank_you_page_active,
               thank_you_page_id: data.thank_you_page_id,
               thank_you_page_url: data.thank_you_page_url,
            },
         };
         if (data.delete_file_id) {
            pricingsPlanSettings = { ...pricingsPlanSettings, delete_file_id: data.delete_file_id };
         }
         const getAuthoresponderSettings = () => {
            if (!data.setting.autoresponder) {
               return {};
            }
            return {
               autoresponder: {
                  autoresponder: data.setting.autoresponder || '',
                  [`${ integerations[data.setting.autoresponder] }_list`]: data.setting.list || '',
               },
            };
         };
         const settingsPlan = {
            terms: data.setting.terms || 0,
            seo_title: data.setting.seo_title || '',
            seo_description: data.setting.seo_description || '',
            seo_image: data.setting.seo_image || '',
            header_script: data.setting.header_script || '',
            body_script: data.setting.body_script || '',
            footer_script: data.setting.footer_script || '',
            meta_code: data.setting.meta_code || '',
            custom_field_ids: (data.setting.custom_fields || []).map((e) => e.id),
            tags: (data.setting.tags || []).map((e) => e.id),
            ...getAuthoresponderSettings(),
         };
         if (data.status === 1) {
            await updatePlanPricing(data.id, pricingsPlanSettings);
            await udpatePlanSettings(data.id, settingsPlan);
            await updatePlanMainInfo(data.id, mainPlanSettings);
         } else {
            await updatePlanMainInfo(data.id, mainPlanSettings);
            await udpatePlanSettings(data.id, settingsPlan);
            await updatePlanPricing(data.id, pricingsPlanSettings);
         }
         getPlanOperation(data.id)(dispatch);
         if (isPrint('Changes saved successfully.')) {
            toast.success('Changes saved successfully.');
         }
         dispatch(actions.planSaveCompleted());
      } catch (error) {
         dispatch(actions.planSaveFailed());
         if (error && error.response && error.response.data) {
            onError(error.response);
         }
      }
   };
};

export const planAddTagOperation = (inputs) => {
   return async dispatch => {
      try {
         const { data } = await addTag(inputs);
         if (isPrint('Tag added successfully.')) {
            toast.success('Tag added successfully.');
         }
         dispatch(actions.tagAddCompleted(data));
      } catch (error) {
         if (error?.response?.data) {
            const { errors: { name } = {} } = error.response.data;

            return name;
         }
      }
   };
};

export const deleteOrderBumpOperation = (planId, id) => {
   return async dispatch => {
      try {
         await deleteOrderBum(planId, id);
         if (isPrint('Order deleted successfully.')) {
            toast.success('Order deleted successfully.');
         }
         dispatch(actions.deleteOrderBumpCompleted(id));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const addCustomFieldsOperation = (name) => {
   return async dispatch => {
      try {
         const { data } = await addCustomFields(name);
         if (isPrint('Custom field added successfully.')) {
            toast.success('Custom field added successfully.');
         }
         dispatch(actions.addCustomFieldCompleted(data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const deleteCustomFieldOperation = (id) => {
   return async dispatch => {
      try {
         await deleteCustomFields(id);
         if (isPrint('Custom field deleted successfully.')) {
            toast.success('Custom field deleted successfully.');
         }
         dispatch(actions.deleteCustomFieldCompleted(id));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const deleteUpsellOperation = (planId, id, callBack) => {
   return async dispatch => {
      try {
         await deleteUpsell(planId, id);
         callBack();
         if (isPrint('Upsell deleted successfully.')) {
            toast.success('Upsell deleted successfully.');
         }
         dispatch(actions.deleteUpsellCompleted(id));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const makeActiveLandingOperation = (planId, landingId, callBack) => {
   return async dispatch => {
      try {
         await makeActiveLanding({ offerId: planId, landingId });
         dispatch(actions.makeActiveLandingCompleted(landingId));
         if (isPrint('Checkout template has been changed.')) {
            toast.success('Checkout template has been changed.');
         }
         callBack();
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};


export const deleteDownsellOperation = (offerId, downsellId) => {
   return async dispatch => {
      try {
         await downsellDelete(offerId, downsellId);
         if (isPrint('Downsell deleted successfully.')) {
            toast.success('Downsell deleted successfully.');
         }
         dispatch(actions.deleteDownsellCompleted(downsellId));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const changeDownselStatus = (offerId, id) => {
   return async dispatch => {
      try {
         await downsellStatusChange(offerId, id);
         if (isPrint('Downsell updated successfully.')) {
            toast.success('Downsell updated successfully.');
         }
         dispatch(actions.changeDownsellStatusCompleted(id));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};
