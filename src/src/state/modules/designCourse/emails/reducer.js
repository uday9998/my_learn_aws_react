import * as types from './types';
import {
   createReducer,
} from '../../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;
      let changeEmails = state.emails;
      let changeselectedFilters = state.selectedFilters;
      if (key === 'category' && (value === 'Courses' || value === 'Tags')) { changeEmails = []; changeselectedFilters = []; }

      return {
         ...state,
         formData: {
            ...state.formData,
            [key]: value,

         },
         emails: changeEmails,
         selectedFilters: changeselectedFilters,

      };
   },

   [types.RESET_INPUT]: (state) => {
      return {
         ...state,
         formData: { role: 5, css_attributes: {} },
         emails: [],
         selectedFilters: [],
         filterEmails: [],
         emailId: null,
      };
   },


   [types.EMAIL_SEND_START]: (state) => {
      return {
         ...state,
         sendEmailInProgress: true,
      };
   },

   [types.EMAIL_SEND_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         isEmailSent: (data === 204),
         sendEmailInProgress: false,
      };
   },


   [types.EMAIL_SEND_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         sendEmailInProgress: false,
         errors,
      };
   },

   [types.GET_ADMINS_EMAILS_START]: (state) => {
      return {
         ...state,
         getAdminEmailsInProgress: true,
      };
   },

   [types.GET_ADMINS_EMAILS]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         Admins: data,
         emails: [...data],
         getAdminEmailsInProgress: false,
      };
   },

   [types.GET_ALLUSERS_EMAILS_START]: (state) => {
      return {
         ...state,
         getUsersEmailsInProgress: true,
      };
   },

   [types.GET_ALLUSERS_EMAILS]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         allUsers: data,
         emails: [...data],
         getUsersEmailsInProgress: false,
      };
   },

   [types.SET_FILTER_OPTIONS_START]: (state) => {
      return {
         ...state,
         getFilterOptionsInProgress: true,
      };
   },

   [types.SET_FILTER_OPTIONS]: (state, { payload: { options } }) => {
      return {
         ...state,
         getFilterOptionsInProgress: false,
         filterOptions: options,
      };
   },
   [types.ADD_FILTER_OPTION]: (state, { payload: { option, emails } }) => {
      let filterEmails;

      if (state.filterOptions[option].emails) {
         filterEmails = state.filterOptions[option].emails;
      } else {
         filterEmails = emails;
      }

      const newEmails = state.emails.concat(filterEmails);
      const uniqueEmails = new Set(newEmails);
      return {
         ...state,
         filterOptions: {
            ...state.filterOptions,
            [option]: {
               ...state.filterOptions[option],
               emails: filterEmails,
            },
         },
         emails: [...uniqueEmails],
         selectedFilters: [...state.selectedFilters, option],
      };
   },
   [types.REMOVE_FILTER_OPTION]: (state, { payload: { option } }) => {
      const newSelectedFilters = state.selectedFilters.filter(filter => filter !== option);
      const newEmails = state.emails.filter(email => {
         // eslint-disable-next-line no-restricted-syntax
         for (const [key, value] of Object.entries(state.filterOptions)) {
            // eslint-disable-next-line no-continue
            if (!newSelectedFilters.includes(key)) continue;
            if (key !== option && value.emails && value.emails.includes(email)) return true;
         }

         return state.filterOptions[option].emails && !state.filterOptions[option].emails.includes(email);
      });


      return {
         ...state,
         emails: newEmails,
         selectedFilters: newSelectedFilters,
      };
   },
   [types.FILTER_EMAILS]: (state, { payload: { filterEmails } }) => {
      return {
         ...state,
         filterEmails,
      };
   },

   [types.GET_SETTINGSEMAIL_START]: (state) => {
      return {
         ...state,
         getEmailInProgress: true,
      };
   },
   [types.GET_SETTINGSEMAIL_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         email: data.from_email_address,
         replyEmail: data.reply_email,
         getEmailInProgress: false,
      };
   },
   [types.GET_SETTINGSEMAIL_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getEmailInProgress: false,
      };
   },

   [types.EDIT_EMAILSTATUS_START]: (state) => {
      return {
         ...state,
         sendEmailInProgress: true,
      };
   },

   [types.EDIT_EMAILSTATUS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      function DataType(dataType) {
         let dataTypeNew = 'Courses';
         switch (dataType) {
            case 'courses': dataTypeNew = 'Courses'; break;
            case 'admins': dataTypeNew = 'Admins'; break;
            case 'all_users': dataTypeNew = 'All Users'; break;
            case 'tags': dataTypeNew = 'Tags'; break;
            default:
               break;
         }
         return dataTypeNew;
      }
      const selectedFiltersArray = data && data.send_to ? data.send_to.split(', ') : [];

      return {
         ...state,
         sendEmailInProgress: false,
         formData: {
            ...state.formData,
            category: DataType(data.type),
            subject: data.subject,
            content: data.body,
            id: data.id,
            blocks: data.blocks,
            css_attributes: data.css_attributes,
            footer_text: data.footer_text,

         },
         selectedFilters: selectedFiltersArray,
         emails: data.emails,
         filterEmails: [],
         emailId: data.id,
      };
   },


   [types.EDIT_EMAILSTATUS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         sendEmailInProgress: false,
      };
   },

   [types.GET_EMAILSTATUSES_START]: (state) => {
      return {
         ...state,
         getEmailStatusesInProgress: true,
      };
   },

   [types.GET_EMAILSTATUSES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         getEmailStatusesInProgress: false,
         emailStatuses: data.data,
         emailStatusesTotal: data.total,
         initalEmailsLength: data.data.length,
      };
   },

   [types.GET_EMAILSTATUSES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getEmailStatusesInProgress: false,
         errors,
      };
   },

   [types.CHANGE_EMAILSTATUSES_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.CHANGE_EMAILSTATUSES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         emailStatuses: data.data,
         emailStatusesTotal: data.total,
      };
   },

   [types.CHANGE_EMAILSTATUSES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },

   [types.DELETE_EMAILSTATUS_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.DELETE_EMAILSTATUS_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      const { emailStatuses } = state;

      const newemailStatuses = emailStatuses.filter(emailStatus => emailStatus.id !== id);
      return {
         ...state,
         emailStatuses: newemailStatuses,
      };
   },

   [types.DELETE_EMAILSTATUS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },

   [types.EMAILSTATUSES_UPDATE]: (state, action) => {
      const { payload: { data } } = action;
      const emailStatuses = [...state.emailStatuses];

      const newData = emailStatuses.filter(email => email.tag === Object.keys(data)[0]);
      if (newData[0]) {
         newData[0].actions = Object.values(data)[0];
      }


      return {
         ...state,
         emailStatuses,
      };
   },

   [types.FILTER_EMAILS_COMPLETED]: (state, action) => {
      return {
         ...state,
         emailStatuses: [...action.payload.data],
         isEmptyByFilter: action.payload.data.length === 0,
      };
   },
   [types.ACTION_EMAILS_START]: (state) => {
      return {
         ...state,
         isLoadingAction: true,
      };
   },
   [types.MULTI_DELETE_EMAILS_COMPLETED]: (state, action) => {
      const ids = action.payload;
      return {
         ...state,
         isLoadingAction: false,
         emailStatuses: state.emailStatuses.filter(email => !ids.includes(email.id)),
      };
   },
   [types.ACTION_EMAILS_FAILED]: (state) => {
      return {
         ...state,
         isLoadingAction: false,
      };
   },
   [types.DUPLICATE_EMAIL_COMPLETED]: (state, action) => {
      const data = action.payload;
      return {
         ...state,
         isLoadingAction: false,
         emailStatuses: [data, ...state.emailStatuses],
      };
   },
};

export default createReducer(initialState)(reducersMap);
