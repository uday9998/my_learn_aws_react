/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.GET_FRONTBLOGPOST_START]: (state) => {
      return {
         ...state,
         getFrontBlogPostInProgress: true,
      };
   },

   [types.GET_FRONTBLOGPOST_COMPLETED]: (state, action) => {
      const { payload: { data, categories } } = action;
      return {
         ...state,
         postFront: data,
         categoriesFront: categories,
         getFrontBlogPostInProgress: false,
      };
   },

   [types.GET_FRONTBLOGPOST_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getFrontBlogPostInProgress: false,
      };
   },

   [types.GET_FRONTBLOG_START]: (state) => {
      return {
         ...state,
         getFrontBlogInProgress: true,
      };
   },

   [types.GET_FRONTBLOG_COMPLETED]: (state, action) => {
      const { payload: { blog, categories } } = action;
      return {
         ...state,
         blogFront: blog,
         categoriesFront: categories,
         getFrontBlogInProgress: false,
      };
   },

   [types.GET_FRONTBLOG_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getFrontBlogInProgress: false,
      };
   },

   [types.GET_FRONTBLOGSETTINGS_START]: (state) => {
      return {
         ...state,
         getFrontBlogSettingsInProgress: true,
      };
   },

   [types.GET_FRONTBLOGSETTINGS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         blogSettingsFront: data,
         getFrontBlogSettingsInProgress: false,
      };
   },

   [types.GET_FRONTBLOGSETTINGS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getFrontBlogSettingsInProgress: false,
      };
   },

   [types.GET_FRONTBLOGCOUNT_START]: (state) => {
      return {
         ...state,
         getFrontBlogCountInProgress: true,
      };
   },

   [types.GET_FRONTBLOGCOUNT_COMPLETED]: (state, action) => {
      const { payload: { total } } = action;
      return {
         ...state,
         total,
         getFrontBlogCountInProgress: false,
      };
   },

};

export default createReducer(initialState)(reducersMap);
