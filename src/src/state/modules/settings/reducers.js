/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.SET_INIT_DATA_START]: (state) => {
      return {
         ...state,
         dataIsFetching: true,
      };
   },
   [types.SET_INIT_DATA_COMPLETED]: (state, action) => {
      const { payload: { key, data } } = action;
      return {
         ...state,
         [key]: {
            ...data,
         },
         dataIsFetching: false,
      };
   },
   [types.SET_INIT_DATA_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         dataIsFetching: false,
      };
   },

   [types.GET_SETTINGS_START]: (state) => {
      return {
         ...state,
         getSettingsInProgress: true,
      };
   },
   [types.GET_FROM_EMAIL_START]: (state) => {
      return {
         ...state,
         fromEmailLoading: true,
         getSettingsInProgress: true,
      };
   },

   [types.GET_FROM_EMAIL_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const emailsSettings = state.emails || {};
      return {
         ...state,
         fromEmailLoading: false,
         emails: { ...emailsSettings, ...data },
         getSettingsInProgress: false,
      };
   },

   [types.SET_DNS_SETTINGS_STATE]: (state, action) => {
      const { payload: { dnsSettingsOpen } } = action;
      return {
         ...state,
         dnsSettingsOpen,
      };
   },

   [types.GET_SETTINGS_COMPLETED]: (state, action) => {
      const { payload: { key, data } } = action;
      let connectedList = {};
      if (key === 'integrations') {
         connectedList = {
            'google-analytics_connected': !!data.google_analytics_id,
            'mailchimp_connected': !!data.mailchimp_api_key,
            'facebook-pixel_connected': !!data.facebook_pixel_code,
            'convertkit_connected': !!data.convertkit_api_secret,
            'drip_connected': !!data.drip_api_key,
            'paypal_connected': !!data.paypal_email,
            'braintree_connected': !!data.braintree_account_id,
            'paystack_connected': !!data.paystack,
            'paypalv2_connected': !!data.paypal_client_id_v2 || !!data.paypal_secret_v2,
            'stripe_connected': !!data.stripe_account_id,
            'zoom_connected': !!data.zoom_user_id,
            'aweber_connected': !!data.aweber_consumer_key
            && !!data.aweber_consumer_secret && !!data.aweber_access_key
            && !!data.aweber_access_secret,
            activecampaign_connected: !!data.active_campaign_api_url && !!data.active_campaign_api_key,
         };
      }
      if (key === 'mainhub' && data.custom_links && data.custom_links.items && data.custom_links.items.length) {
         data.custom_links.items.sort((a, b) => {
            if (a.order < b.order) return -1;
            return a.order > b.order ? 1 : 0;
         });
      }
      return {
         ...state,
         [key]: {
            ...data,
            ...connectedList,
         },
         tabName: key,
         getSettingsInProgress: false,
         putSettingsInProgress: false,
      };
   },
   [types.GET_SETTINGS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getSettingsInProgress: false,
      };
   },


   [types.COLOR_SWITCH]: (state, action) => {
      const { payload: { colorPallete } } = action;
      return {
         ...state,
         mainhub: {
            ...state.mainhub,
            ...colorPallete,
         },
      };
   },

   [types.CONNECT_INTEGRATION_COMPLETED]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         integrationSettings: {
            ...state,
            integrations: {
               ...state.integrations,
               [`${ payload }_connected`]: true,
            },
         },
      };
   },

   [types.SET_INPUT]: (state, action) => {
      const { payload: { target, key, value } } = action;
      return {
         ...state,
         [target]: {
            ...state[target],
            [key]: value,
         },

      };
   },

   [types.PUT_SETTINGS_START]: (state) => {
      return {
         ...state,
         putSettingsInProgress: true,
         settingsError: false,
      };
   },

   [types.PUT_SETTINGS_COPMLATED]: (state, action) => {
      const { payload: { data } } = action;
      const userChangedData = {};
      let domain = null;
      if (data) {
         if (data.name) {
            userChangedData.name = data.name;
         } else {
            userChangedData.name = state.account.name;
         }
         if (data.picture_src) {
            userChangedData.picture_src = data.picture_src;
         } else {
            userChangedData.picture_src = state.account.picture_src;
         }
         if (data.domain) {
            domain = data.domain;
         }
      }
      return {
         ...state,
         putSettingsInProgress: false,
         userChangedData,
         settingsError: false,
         account: {
            ...state.account,
            domain,
         },
      };
   },
   [types.UPDATE_CLASS_DATA_COMPLETED]: (state, action) => {
      const { payload: { classData } } = action;

      return {
         ...state,
         putSettingsInProgress: false,
         mainhub: {
            ...state.mainhub,
            class_data: classData,
            removeSliderSettings: [],
         },
      };
   },
   [types.PUT_SETTINGS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         putSettingsInProgress: false,
         errors,
         settingsError: true,
      };
   },

   [types.CREATE_CUSTOMLINK_START]: (state) => {
      return {
         ...state,
         createLinkInProgress: true,
         isCustomLinksButtonDisabled: true,
      };
   },

   [types.CREATE_CUSTOMLINK_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const { mainhub } = state;
      return {
         ...state,
         createLinkInProgress: false,
         createLinkModalOpen: false,
         isCustomLinksButtonDisabled: false,
         mainhub: {
            ...mainhub,
            custom_links: data,
         },
         errors: {},
      };
   },

   [types.CREATE_CUSTOMLINK_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         createLinkInProgress: false,
         isCustomLinksButtonDisabled: false,
         errors,
      };
   },

   [types.CREATE_CUSTOMLINK_OPEN_MODAL]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         createLinkModalOpen: data,
      };
   },

   [types.UPDATE_CUSTOMLINK_START]: (state) => {
      return {
         ...state,
         createLinkInProgress: true,
      };
   },

   [types.UPDATE_CUSTOMLINK_COMPLETED]: (state, action) => {
      const { payload: { id, inputs } } = action;
      const { mainhub } = state;

      const newCustomLinks = mainhub.custom_links.items.map(item => {
         if (item.id === id) {
            return { id, ...inputs };
         }
         return item;
      });

      return {
         ...state,
         createLinkInProgress: false,
         mainhub: {
            ...mainhub,
            custom_links: {
               items: newCustomLinks,
            },
         },
         errors: {},
      };
   },

   [types.UPDATE_CUSTOMLINK_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         createLinkInProgress: false,
         errors,
      };
   },

   [types.DELETE_CUSTOMLINK_START]: (state) => {
      return {
         ...state,
         createLinkInProgress: true,
      };
   },

   [types.DELETE_CUSTOMLINK_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      const { mainhub } = state;
      const newCustomLinks = Object.values(mainhub.custom_links.items).filter(item => item.id !== id);
      return {
         ...state,
         createLinkInProgress: false,
         mainhub: {
            ...mainhub,
            custom_links: {
               items: newCustomLinks,
            },
         },
         errors: {},
      };
   },

   [types.DELETE_CUSTOMLINK_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         createLinkInProgress: false,
         errors,
      };
   },

   [types.CANCEL_CHANGES]: (state, action) => {
      const { payload: { initialFields, currentTab } } = action;

      return {
         ...state,
         [currentTab]: {
            ...state[currentTab],
            ...initialFields,
         },
      };
   },

   [types.GET_VIDEO_START]: (state) => {
      return {
         ...state,
         getVideoInProgress: true,
      };
   },
   [types.GET_VIDEO_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         video: data.video,
         getVideoInProgress: false,
      };
   },
   [types.GET_VIDEO_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getVideoInProgress: false,
      };
   },


   [types.GET_VIDEOS_START]: (state) => {
      return {
         ...state,
         getVideosInProgress: true,
      };
   },
   [types.GET_VIDEOS_COMPLETED]: (state, action) => {
      const { payload: { key, data } } = action;
      return {
         ...state,
         [key]: {
            ...data,
         },
         getVideosInProgress: false,
      };
   },
   [types.GET_VIDEOS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getVideosInProgress: false,
      };
   },

   [types.GET_VIDEOSBYDATE_START]: (state) => {
      return {
         ...state,
         getVideosInProgress: true,
      };
   },
   [types.GET_VIDEOSBYDATE_COMPLETED]: (state, action) => {
      const { payload: { key, data } } = action;
      return {
         ...state,
         [key]: {
            ...data,
         },
         getVideosInProgress: false,
      };
   },
   [types.GET_VIDEOSBYDATE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getVideosInProgress: false,
      };
   },

   [types.DELETE_DOMAIN_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.DELETE_DOMAIN_COMPLETED]: (state) => {
      const account = { ...state.account };
      account.domain = null;
      return {
         ...state,
         account,
      };
   },

   [types.DELETE_DOMAIN_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },

   [types.CUSTOMLINK_ORDER_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.CUSTOMLINK_ORDER_COMPLETED]: (state, action) => {
      const { payload: { newCustomLinks } } = action;
      const { mainhub } = state;
      return {
         ...state,
         mainhub: {
            ...mainhub,
            custom_links: {
               items: newCustomLinks,
            },
         },
      };
   },

   [types.CUSTOMLINK_ORDER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },

   [types.GET_FILE_SIZE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         fileSizeInfo: data,
      };
   },

   [types.GET_APIKEY_START]: (state) => {
      return {
         ...state,
         getApiKeyInProgress: true,
      };
   },
   [types.GET_APIKEY_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         apiData: data,
         getApiKeyInProgress: false,
      };
   },
   [types.GET_APIKEY_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getApiKeyInProgress: false,
      };
   },

   [types.CREATE_APIKEY_START]: (state) => {
      return {
         ...state,
         getApiKeyInProgress: true,
      };
   },
   [types.CREATE_APIKEY_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         apiData: data,
         getApiKeyInProgress: false,
      };
   },
   [types.CREATE_APIKEY_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getApiKeyInProgress: false,
      };
   },

   [types.GET_ALL_COURSES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         allCourses: data.filter(({ is_published: isPublished }) => isPublished === 1),
      };
   },

   [types.SET_SCRIPT_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;
      if (key === 'newScript') {
         return {
            ...state,
            [key]: value,

         };
      }
      return {
         ...state,
         currentScript: {
            ...state.currentScript,
            script: value,
         },

      };
   },

   [types.CHOOSE_SCRIPT]: (state, action) => {
      const { payload: { id } } = action;
      const currentScript = state.scripts.find(script => script.id === id);

      return {
         ...state,
         currentScript,
      };
   },

   [types.EMPTY_SCRIPT]: (state) => {
      return {
         ...state,
         newScript: '',
         currentScript: {},
      };
   },

   [types.GET_SCRIPTS_START]: (state) => {
      return {
         ...state,
         getScriptsInProgress: true,
      };
   },
   [types.GET_SCRIPTS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         scripts: data,
         getScriptsInProgress: false,
      };
   },
   [types.GET_SCRIPTS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getScriptsInProgress: false,
      };
   },

   [types.CREATE_SCRIPT_START]: (state) => {
      return {
         ...state,
         getScriptsInProgress: true,
      };
   },

   [types.CREATE_SCRIPT_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const updateScripts = [...state.scripts];
      updateScripts.push(data);
      return {
         ...state,
         scripts: updateScripts,
         newScript: '',
         getScriptsInProgress: false,
      };
   },

   [types.CREATE_SCRIPT_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getScriptsInProgress: false,
      };
   },

   [types.DELETE_SCRIPT_START]: (state) => {
      return {
         ...state,
         getScriptsInProgress: true,
      };
   },

   [types.DELETE_SCRIPT_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      let updateScripts = [...state.scripts];
      updateScripts = updateScripts.filter(item => item.id !== id);
      return {
         ...state,
         getScriptsInProgress: false,
         scripts: updateScripts,
         errors: {},
      };
   },

   [types.DELETE_SCRIPT_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getScriptsInProgress: false,
         errors,
      };
   },

   [types.UPDATE_SCRIPT_START]: (state) => {
      return {
         ...state,
         getScriptsInProgress: true,
      };
   },

   [types.UPDATE_SCRIPT_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const updateScripts = [...state.scripts];
      const updatedScript = updateScripts.find(updateScript => updateScript.id === data.id);
      updatedScript.script = data.script;
      return {
         ...state,
         newScript: '',
         currentScript: {},
         scripts: updateScripts,
         getScriptsInProgress: false,
      };
   },

   [types.UPDATE_SCRIPT_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getScriptsInProgress: false,
      };
   },

   [types.DISABLE_DISCONNECT_INTEGRATION]: (state) => {
      return {
         ...state,
         disableDisconnectIntegration: true,
      };
   },

   [types.ENABLE_DISCONNECT_INTEGRATION]: (state) => {
      return {
         ...state,
         disableDisconnectIntegration: false,
      };
   },
   [types.GET_NOTIFICATIONS_START]: (state) => ({
      ...state,
      isNotificationsFetching: true,
   }),
   [types.GET_NOTIFICATIONS_FAILED]: (state) => ({
      ...state,
      isNotificationsFetching: false,
   }),
   [types.GET_NOTIFICATIONS_COMPLECTED]: (state, action) => ({
      ...state,
      notifications: action.payload,
      initialNotifications: action.payload,
      isNotificationsFetching: false,
   }),
   [types.CHANGE_NOTIFY]: (state, action) => {
      const { key, name, value } = action.payload;
      const filteredNotifications = state.notifications.map((n) => {
         if (n.id === key) {
            return {
               ...n,
               [name]: value,
            };
         }
         return n;
      });
      return {
         ...state,
         notifications: filteredNotifications,
      };
   },
   [types.SAVE_CODES_SETTINGS_START]: (state) => {
      return {
         ...state,
         dataIsFetching: true,
      };
   },
   [types.SAVE_CODES_SETTINGS_FAILED]: (state) => {
      return {
         ...state,
         dataIsFetching: false,
      };
   },
   [types.SAVE_CODES_SETTINGS_COMPLETED]: (state, action) => {
      return {
         ...state,
         codes: action.payload,
         dataIsFetching: false,
      };
   },
   [types.GET_CODES_SETTINGS_START]: (state) => {
      return {
         ...state,
         dataIsFetching: true,
      };
   },
   [types.GET_CODES_SETTINGS_FAILED]: (state) => {
      return {
         ...state,
         dataIsFetching: false,
      };
   },
   [types.GET_CODES_SETTINGS_COMPLETED]: (state, action) => {
      return {
         ...state,
         dataIsFetching: false,
         codes: action.payload,
      };
   },
};

export default createReducer(initialState)(reducersMap);
