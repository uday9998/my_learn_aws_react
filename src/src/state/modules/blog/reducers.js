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
         [target]: {
            ...state[target],
            [key]: value,
         },
      };
   },

   [types.GET_BLOG_START]: (state) => {
      return {
         ...state,
         getBlogInProgress: true,
      };
   },

   [types.GET_BLOG_COMPLETED]: (state, action) => {
      const { payload: { blog, blogSettings } } = action;
      return {
         ...state,
         blog,
         blogSettings,
         getBlogInProgress: false,
      };
   },

   [types.GET_FILTEREDBLOG_COMPLETED]: (state, action) => {
      const { payload: { blog } } = action;
      return {
         ...state,
         blog,
         getBlogInProgress: false,
      };
   },

   [types.GET_BLOG_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getBlogInProgress: false,
      };
   },

   [types.DELETE_BLOG_START]: (state) => {
      return {
         ...state,
         getBlogInProgress: true,
      };
   },

   [types.DELETE_BLOG_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      let blog = [...state.blog];
      blog = blog.filter(post => post.id !== id);
      return {
         ...state,
         blog,
         getBlogInProgress: false,
      };
   },

   [types.DELETE_BLOG_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getBlogInProgress: false,
      };
   },

   [types.GET_BLOGPOST_START]: (state) => {
      return {
         ...state,
         getBlogPostInProgress: true,
      };
   },

   [types.GET_BLOGPOST_COMPLETED]: (state, action) => {
      const { payload: { data, authors } } = action;
      return {
         ...state,
         post: data,
         authors,
         updatedPost: data,
         getBlogPostInProgress: false,
      };
   },

   [types.GET_BLOGPOST_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getBlogPostInProgress: false,
      };
   },

   [types.SAVE_BLOGPOST_START]: (state) => {
      return {
         ...state,
         showFullScreenLoader: true,
      };
   },

   [types.SAVE_BLOGPOST_COMPLETED]: (state, action) => {
      const {
         payload: {
            id,
            data,
            isView,
         },
      } = action;

      const updatedPost = { ...state.post };
      const blog = [...state.blog];
      if (isView) {
         const foundItem = blog.find(el => el.id === id);
         foundItem.is_published = data.is_published;
         if (data.publish_date) {
            foundItem.publish_date = data.publish_date;
         }
         if (data.publish_time) {
            foundItem.publish_time = data.publish_time;
         }
      }
      return {
         ...state,
         updatedPost,
         blog,
         showFullScreenLoader: false,
      };
   },

   [types.SAVE_BLOGPOST_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         showFullScreenLoader: false,
      };
   },

   [types.GET_BLOGCATEGORIES_START]: (state) => {
      return {
         ...state,
         getBlogCategoriesInProgress: false,
      };
   },

   [types.GET_BLOGCATEGORIES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         categories: data.data,
         getBlogCategoriesInProgress: false,
      };
   },
   [types.ADD_BLOGCATEGORY_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         categories: [...state.categories, data],
      };
   },
   [types.UPDATE_BLOG_CATEGORY_COMLETED]: (state, action) => {
      const { payload: { id, data } } = action;
      return {
         ...state,
         categories: state.categories.map(cat => {
            if (cat.id !== id) return cat;
            return { ...cat, ...data };
         }),
      };
   },
   [types.DELETE_BLOG_CATEGORY_COMLETED]: (state, action) => {
      const { payload: { id } } = action;
      return {
         ...state,
         categories: state.categories.filter(({ id: i }) => i !== id),
      };
   },
   [types.UPDATE_BLOG_ATTACHED_CATEGORY]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         post: {
            ...state.post,
            categories: [...data],
         },
      };
   },
   [types.GET_BLOGCATEGORIES_FAILED]: (state) => {
      return {
         ...state,
         getBlogCategoriesInProgress: false,
      };
   },

   [types.ATTACH_BLOGCATEGORIES_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.ATTACH_BLOGCATEGORIES_COMPLETED]: (state, action) => {
      const { payload: { data, isAttach } } = action;
      let newData = [];
      if (isAttach) {
         newData = [
            ...state.post.categories,
            { ...data },
         ];
      } else {
         newData = data;
      }
      return {
         ...state,
         post: {
            ...state.post,
            categories: [
               ...newData,
            ],
         },
      };
   },

   [types.ATTACH_BLOGCATEGORIES_FAILED]: (state) => {
      return {
         ...state,
      };
   },

   [types.GET_BLOGSETTINGS_START]: (state) => {
      return {
         ...state,
         getBlogSettingsInProgress: true,
      };
   },

   [types.GET_BLOGSETTINGS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         blogSettings: { ...data, blog_page_color: '#131F1E' },
         getBlogSettingsInProgress: false,
      };
   },

   [types.GET_BLOGSETTINGS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getBlogSettingsInProgress: false,
      };
   },

   [types.SAVE_BLOGSETTINGS_START]: (state) => {
      return {
         ...state,
         getBlogSettingsInProgress: true,
      };
   },

   [types.SAVE_BLOGSETTINGS_COMPLETED]: (state, action) => {
      const { payload: { params } } = action;
      const blogSettings = { ...state.blogSettings };
      if (params && params[0] && params[0].key === 'blog_page_status') {
         blogSettings.blog_page_status = params[0].value;
      }
      return {
         ...state,
         blogSettings,
         getBlogSettingsInProgress: false,
      };
   },

   [types.SAVE_BLOGSETTINGS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getBlogSettingsInProgress: false,
      };
   },
};

export default createReducer(initialState)(reducersMap);
