import {
   getFrontBlogPost, getFrontBlog, getFrontBlogSettings, getFrontBlogCategories, getFrontBlogCount,
} from 'api/AuthApi';
import * as action from 'state/modules/blogFront/actions';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import { portalId } from 'utils/constants';

export const getFrontBlogOperation = (params, search) => {
   return async (dispatch) => {
      dispatch(action.getFrontBlogStart());
      try {
         const blog = await getFrontBlog(params, search);
         if (params && params[1]) {
            dispatch(action.getFrontBlogCompleted(blog.data, params[1]));
         } else {
            const categories = await getFrontBlogCategories();
            dispatch(action.getFrontBlogCompleted(blog.data, categories.data));
         }
      } catch (error) {
         dispatch(action.getFrontBlogFailed(error.response && error.response.data));
      }
   };
};

export const getBlogCountOperation = () => {
   return async (dispatch) => {
      dispatch(action.getFrontBlogCountStart());
      try {
         const blog = await getFrontBlogCount();
         dispatch(action.getFrontBlogCountCompleted(blog.data.total));
      } catch (error) {
         // dispatch(action.getFrontBlogFailed(error.response && error.response.data));
      }
   };
};


export const getFrontBlogPostOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.getFrontBlogPostStart());
      try {
         let { data } = await getFrontBlogPost(id);
         if (Object.keys(data).length === 0 && !window.blog) {
            dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
         } else if (window.blog) {
            data = window.blog;
         }
         const categories = await getFrontBlogCategories();
         dispatch(action.getFrontBlogPostCompleted(data, categories.data));
      } catch (error) {
         dispatch(action.getFrontBlogPostFailed(error.response && error.response.data));
      }
   };
};


export const getFrontBlogSettingsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getFrontBlogSettingsStart());
      try {
         const { data } = await getFrontBlogSettings();
         dispatch(action.getFrontBlogSettingsCompleted(data));
      } catch (error) {
         dispatch(action.getFrontBlogSettingsFailed(error.response && error.response.data));
      }
   };
};
