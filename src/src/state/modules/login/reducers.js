import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;
      return {
         ...state,
         inputs: {
            ...state.inputs,
            [key]: value,
         },
      };
   },

   [types.SET_REGISTER_INPUT]: (state, action) => {
      const { payload: { registerkey, registervalue } } = action;
      return {
         ...state,
         registerInputs: {
            ...state.registerInputs,
            [registerkey]: registervalue,
         },

      };
   },

   [types.LOGIN_START]: (state) => {
      return {
         ...state,
         isInProgress: true,
      };
   },
   [types.LOGIN_COMPLETED]: (state) => {
      return {
         ...state,
         errors: {},
         isInProgress: false,
      };
   },
   [types.LOGIN_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         isInProgress: false,
         errors,
      };
   },

   [types.FORGOT_PASSWORD_START]: (state) => {
      return {
         ...state,
         forgetPasswordisInProgress: true,
      };
   },
   [types.FORGOT_PASSWORD_COMPLETED]: (state) => {
      return {
         ...state,
         errors: {},
         forgetPasswordisInProgress: false,
      };
   },
   [types.FORGOT_PASSWORD_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         forgetPasswordisInProgress: false,
         errors,
      };
   },

   [types.RESET_PASSWORD_START]: (state) => {
      return {
         ...state,
         resetPasswordisInProgress: true,
      };
   },
   [types.RESET_PASSWORD_COMPLETED]: (state) => {
      return {
         ...state,
         errors: {},
         resetPasswordisInProgress: false,
      };
   },
   [types.RESET_PASSWORD_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         resetPasswordisInProgress: false,
         errors,
      };
   },
   [types.REGISTER_STUDENT_START]: (state) => {
      return {
         ...state,
         registerStudentisInProgress: true,
      };
   },
   [types.REGISTER_STUDENT_COMPLETED]: (state) => {
      return {
         ...state,
         errors: {},
         registerStudentisInProgress: false,
      };
   },
   [types.REGISTER_STUDENT_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         registerStudentisInProgress: false,
         errors,
      };
   },
};

export default createReducer(initialState)(reducersMap);
