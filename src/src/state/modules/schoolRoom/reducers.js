import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {
   [types.GET_PORTAL_TEMPLATE_FILES_START]: (state) => {
      return {
         ...state,
         isLoadingFiles: true,
      };
   },
   [types.GET_PORTAL_TEMPLATE_FILES_COMPLETED]: (state, action) => {
      return {
         ...state,
         isLoadingFiles: false,
         files: { ...action.payload },
      };
   },
   [types.GET_PORTAL_TEMPLATE_FILES_FAILED]: (state) => {
      return {
         ...state,
         isLoadingFiles: false,
      };
   },
   [types.UPDATE_PORTAL_TEMPLATE_FILE_START]: (state) => {
      return {
         ...state,
         isLoadingFiles: true,
      };
   },
   [types.UPDATE_PORTAL_TEMPLATE_FILE_FAILED]: (state) => {
      return {
         ...state,
         isLoadingFiles: false,
      };
   },
   [types.UPDATE_PORTAL_CSS_VARIABLES_FILE_COMPLETED]: (state, action) => {
      return {
         ...state,
         isLoadingFiles: false,
         files: {
            ...state.files,
            variables_css: {
               ...state.files.variables_css,
               content: action.payload,
            },
         },
      };
   },
   [types.CHANGE_PORTAL_THEMES_STATE]: (state, action) => {
      return {
         ...state,
         isMembership: action.payload,
      };
   },
};


export default createReducer(initialState)(reducersMap);
