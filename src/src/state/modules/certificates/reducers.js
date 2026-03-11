/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {

   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value, target } } = action;

      return {
         ...state,
         certificate: {
            ...state.certificate,
            [target]: {
               ...state.certificate[target],
               [key]: value,
            },
         },
      };
   },


   [types.GET_CERTIFICATE_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.GET_CERTIFICATE_COMPLETED]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         certificates: payload.data.data,
         courses: payload.data.courses,
         count: payload.count,
         isFetchingData: false,
      };
   },

   [types.GET_CERTIFICATE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

   [types.GET_CERTIFICATEBYID_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.GET_CERTIFICATEBYID_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         certificate: data,
         isFetchingData: false,
      };
   },

   [types.GET_CERTIFICATEBYID_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

   [types.CREATE_CERTIFICATE_COMPLETED]: (state) => {
      return {
         ...state,
      };
   },

   [types.UPDATE_CERTIFICATE_COMPLETED]: (state, action) => {
      const { payload: { id, data } } = action;
      const newCertificates = state.certificates.map(certificate => {
         if (certificate.id !== id) return certificate;
         return { ...certificate, data };
      });
      return {
         ...state,
         certificates: newCertificates,
         mode: {},
      };
   },

   [types.UPDATE_CERTIFICATE_FAILED]: (state) => {
      return {
         ...state,
         mode: {},
      };
   },

   [types.DELETE_CERTIFICATE_START]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },

   [types.DELETE_CERTIFICATE_COMPLETED]: (state, action) => {
      const { payload: { id, name } } = action;
      const coursesForCertificate = [...state.coursesForCertificate, name];
      const newCertificates = state.certificates.filter(certificate => {
         return certificate.id !== id;
      });
      return {
         ...state,
         certificates: newCertificates,
         coursesForCertificate,
         isFetchingData: false,
      };
   },

   [types.DELETE_CERTIFICATE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },


   [types.GET_COURSESFORCERTIFICATES_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.GET_COURSESFORCERTIFICATES_COMPLETED]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         coursesForCertificate: payload.data,
         isFetchingData: false,
      };
   },

   [types.GET_COURSESFORCERTIFICATES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

   [types.DELETE_CERTIFICATES_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.DELETE_CERTIFICATES_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },

   [types.DELETE_CERTIFICATES_COMPLETED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },

   [types.DUPLICATE_CERTIFICATE_COMPLETED]: (state, action) => {
      return {
         ...state,
         certificates: [...state.certificates, ...action.payload],
      };
   },

   [types.STATUS_CHANGE_CERTIFICATE]: (state, action) => {
      const newCertificates = state.certificates.map((e) => {
         if (e.id === action.payload) {
            return {
               ...e,
               published: e.published === 1 ? 0 : 1,
            };
         }
         return e;
      });
      return {
         ...state,
         certificates: newCertificates,
      };
   },
};

export default createReducer(initialState)(reducersMap);
