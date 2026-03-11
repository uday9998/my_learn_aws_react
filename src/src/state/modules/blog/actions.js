import * as types from './types';

export const getBlogStart = () => ({
   type: types.GET_BLOG_START,
});
export const getBlogCompleted = (blog, blogSettings) => ({
   type: types.GET_BLOG_COMPLETED,
   payload: {
      blog,
      blogSettings,
   },
});

export const getFilteredBlogCompleted = (blog) => ({
   type: types.GET_FILTEREDBLOG_COMPLETED,
   payload: {
      blog,
   },
});

export const getBlogFailed = (errors) => ({
   type: types.GET_BLOG_FAILED,
   payload: {
      errors,
   },
});

export const deleteBlogStart = () => ({
   type: types.DELETE_BLOG_START,
});

export const deleteBlogCompleted = (id) => ({
   type: types.DELETE_BLOG_COMPLETED,
   payload: {
      id,
   },
});

export const deleteBlogFailed = (errors) => ({
   type: types.DELETE_BLOG_FAILED,
   payload: {
      errors,
   },
});

export const getBlogSettingsStart = () => ({
   type: types.GET_BLOGSETTINGS_START,
});

export const getBlogSettingsCompleted = (data) => ({
   type: types.GET_BLOGSETTINGS_COMPLETED,
   payload: {
      data,
   },
});

export const getBlogSettingsFailed = (errors) => ({
   type: types.GET_BLOGSETTINGS_FAILED,
   payload: {
      errors,
   },
});

export const saveBlogSettingsStart = () => ({
   type: types.SAVE_BLOGSETTINGS_START,
});

export const saveBlogSettingsCompleted = (params) => ({
   type: types.SAVE_BLOGSETTINGS_COMPLETED,
   payload: {
      params,
   },
});

export const saveBlogSettingsFailed = (errors) => ({
   type: types.SAVE_BLOGSETTINGS_FAILED,
   payload: {
      errors,
   },
});

export const getBlogPostStart = () => ({
   type: types.GET_BLOGPOST_START,
});

export const getBlogPostCompleted = (data, authors) => ({
   type: types.GET_BLOGPOST_COMPLETED,
   payload: {
      data,
      authors,
   },
});

export const getBlogPostFailed = (errors) => ({
   type: types.GET_BLOGPOST_FAILED,
   payload: {
      errors,
   },
});

export const saveBlogPostStart = () => ({
   type: types.SAVE_BLOGPOST_START,
});

export const saveBlogPostCompleted = (id, data, isView) => ({
   type: types.SAVE_BLOGPOST_COMPLETED,
   payload: {
      id,
      data,
      isView,
   },
});

export const saveBlogPostFailed = (errors) => ({
   type: types.SAVE_BLOGPOST_FAILED,
   payload: {
      errors,
   },
});

export const setInput = (key, value, target) => {
   return {
      type: types.SET_INPUT,
      payload: {
         key,
         value,
         target,
      },
   };
};


export const getBlogCategoriesStart = () => ({
   type: types.GET_BLOGCATEGORIES_START,
});

export const getBlogCategoriesCompleted = (data) => ({
   type: types.GET_BLOGCATEGORIES_COMPLETED,
   payload: {
      data,
   },
});

export const getBlogCategoriesFailed = () => ({
   type: types.GET_BLOGCATEGORIES_FAILED,
});


export const attachBlogCategoriesStart = () => ({
   type: types.ATTACH_BLOGCATEGORIES_START,
});

export const attachBlogCategoriesCompleted = (data, isAttach) => ({
   type: types.ATTACH_BLOGCATEGORIES_COMPLETED,
   payload: {
      data,
      isAttach,
   },
});

export const attachBlogCategoriesFailed = () => ({
   type: types.ATTACH_BLOGCATEGORIES_FAILED,
});


export const addBlogCategoryStart = () => ({
   type: types.ADD_BLOGCATEGORY_START,
});

export const addBlogCategoryCompleted = (data) => ({
   type: types.ADD_BLOGCATEGORY_COMPLETED,
   payload: {
      data,
   },
});

export const updateBlogCategoryCompleted = (id, data) => ({
   type: types.UPDATE_BLOG_CATEGORY_COMLETED,
   payload: {
      id,
      data,
   },
});

export const deleteBlogCategoryCompleted = (id) => ({
   type: types.DELETE_BLOG_CATEGORY_COMLETED,
   payload: {
      id,
   },
});

export const updateAttachedCategory = (data) => ({
   type: types.UPDATE_BLOG_ATTACHED_CATEGORY,
   payload: {
      data,
   },
});

export const addBlogCategoryFailed = () => ({
   type: types.ADD_BLOGCATEGORY_FAILED,
});

export const deleteBlogMultipleStart = () => ({
   type: types.DELETE_BLOGMULTIPLE_START,
});

export const deleteBlogMultipleFailed = () => ({
   type: types.DELETE_BLOGMULTIPLE_FAILED,
});

export const deleteBlogMultipleCompleted = () => ({
   type: types.DELETE_BLOGMULTIPLE_COMPLETED,
});
