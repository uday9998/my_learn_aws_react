import * as types from './types';
import {
   createReducer,
} from '../../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;

      return {
         ...state,
         template: {
            ...state.template,
            [key]: value,
         },
      };
   },

   [types.SET_AUTO_EMAIL_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;

      return {
         ...state,
         autoEmails: {
            ...state.autoEmails,
            [key]: value,
         },
      };
   },

   [types.SET_CHECKBOX]: (state, action) => {
      const { payload: { key, value } } = action;

      return {
         ...state,
         checkBoxValues: {
            ...state.checkBoxValues,
            [key]: (value === false ? 'off' : 'on'),
         },
      };
   },

   [types.GET_EMAILTEMPLATES_START]: (state) => {
      return {
         ...state,
         getEmailTemplatesInProgress: true,
      };
   },

   [types.GET_EMAILTEMPLATES_COMPLETED]: (state, action) => {
      const { payload: { data, emailTemplateFirst } } = action;
      const courses = data.courses.map(course => ({
         value: course.id, label: course.name,
      }));
      const checkBoxValues = {
         notify_course_signup: data.metas.notify_course_signup,
         notify_completion_email: data.metas.notify_completion_email,
         notify_enrollment_email: data.metas.notify_enrollment_email,
         notify_subscription_cancellation_email: data.metas.notify_subscription_cancellation_email,
      };
      return {
         ...state,
         getEmailTemplatesInProgress: false,
         courses,
         checkBoxValues,
         template: emailTemplateFirst,
      };
   },

   [types.GET_EMAILTEMPLATES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getEmailTemplatesInProgress: false,
         errors,
      };
   },

   [types.GET_EMAILTEMPLATE_START]: (state) => {
      return {
         ...state,
         getEmailTemplateInProgress: true,
      };
   },

   [types.GET_EMAILTEMPLATE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         getEmailTemplateInProgress: false,
         template: data,
      };
   },

   [types.GET_EMAILTEMPLATE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getEmailTemplateInProgress: false,
         errors,
      };
   },

   [types.UPDATE_EMAILTEMPLATE_START]: (state) => {
      return {
         ...state,
         updateEmailTemplateInProgress: true,
      };
   },

   [types.UPDATE_EMAILTEMPLATE_COMPLETED]: (state) => {
      return {
         ...state,
         updateEmailTemplateInProgress: false,
         template: {
            ...state.template,
         },
      };
   },

   [types.UPDATE_EMAILTEMPLATE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         updateEmailTemplateInProgress: false,
         errors,
      };
   },

   [types.UPDATE_EMAILNOTIFICATIONS_COMPLETED]: (state) => {
      return {
         ...state,
         updateEmailTemplateInProgress: true,
      };
   },

   [types.GET_AUTO_EMAILTEMPLATES_COMPLETED]: (state, action) => {
      return {
         ...state,
         autoEmails: action.data[0],
      };
   },

   [types.UPDATE_AUTO_EMAILTEMPLATES_COMPLETED]: (state, action) => {
      return {
         ...state,
         autoEmails: action.data,
      };
   },

   [types.REVERT_AUTO_EMAILTEMPLATE_COMPLETED]: (state, action) => {
      return {
         ...state,
         autoEmails: action.data,
      };
   },


};

export default createReducer(initialState)(reducersMap);
