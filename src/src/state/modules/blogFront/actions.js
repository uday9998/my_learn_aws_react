import * as types from './types';


export const getFrontBlogPostStart = () => ({
   type: types.GET_FRONTBLOGPOST_START,
});

export const getFrontBlogPostCompleted = (data, categories) => ({
   type: types.GET_FRONTBLOGPOST_COMPLETED,
   payload: {
      data,
      categories,
   },
});

export const getFrontBlogCountStart = () => ({
   type: types.GET_FRONTBLOGCOUNT_START,
});

export const getFrontBlogCountCompleted = (total) => ({
   type: types.GET_FRONTBLOGCOUNT_COMPLETED,
   payload: {
      total,
   },
});

export const getFrontBlogPostFailed = (errors) => ({
   type: types.GET_FRONTBLOGPOST_FAILED,
   payload: {
      errors,
   },
});

export const getFrontBlogStart = () => ({
   type: types.GET_FRONTBLOG_START,
});

export const getFrontBlogCompleted = (blog, categories) => ({
   type: types.GET_FRONTBLOG_COMPLETED,
   payload: {
      blog,
      categories,
   },
});

export const getFrontBlogFailed = (errors) => ({
   type: types.GET_FRONTBLOG_FAILED,
   payload: {
      errors,
   },
});


export const getFrontBlogSettingsStart = () => ({
   type: types.GET_FRONTBLOGSETTINGS_START,
});

export const getFrontBlogSettingsCompleted = (data) => ({
   type: types.GET_FRONTBLOGSETTINGS_COMPLETED,
   payload: {
      data,
   },
});

export const getFrontBlogSettingsFailed = (errors) => ({
   type: types.GET_FRONTBLOGSETTINGS_FAILED,
   payload: {
      errors,
   },
});
