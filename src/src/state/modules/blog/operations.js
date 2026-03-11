import {
   getBlog, deleteBlog, saveBlogSettings, getBlogSettings, createDefaultBlog, getBlogPost, saveBlogPost,
   getBlogCategories, addBlogCategory, attachBlogCategories, updateBlogCategory, deleteBlogCategory,
   deleteMultipleBlog, getCourseAuthors,
} from 'api/AuthApi';
import * as action from 'state/modules/blog/actions';
import { toast } from 'react-toastify';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import isPrint from '../designCourse/edit/Error';


export const getBlogOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.getBlogStart());
      try {
         const blog = await getBlog(params);
         if (params) {
            dispatch(action.getFilteredBlogCompleted(blog.data));
         } else {
            const blogSettings = await getBlogSettings();
            dispatch(action.getBlogCompleted(blog.data, blogSettings.data));
         }
      } catch (error) {
         dispatch(action.getBlogFailed(error.response && error.response.data));
      }
   };
};


export const deleteBlogOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.deleteBlogStart());
      try {
         await deleteBlog(id);
         if (isPrint('The blog is deleted successfully.')) {
            toast.success('The blog is deleted successfully.');
         }
         dispatch(action.deleteBlogCompleted(id));
      } catch (error) {
         dispatch(action.deleteBlogFailed(error.response && error.response.data));
      }
   };
};

export const saveBlogSettingsOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.saveBlogSettingsStart());
      try {
         await saveBlogSettings(params);
         if (isPrint('Blog settings are saved successfully.')) {
            toast.success('Blog settings are saved successfully.');
         }
         dispatch(action.saveBlogSettingsCompleted(params));
      } catch (error) {
         dispatch(action.saveBlogSettingsFailed(error.response && error.response.data));
      }
   };
};

export const getBlogSettingsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getBlogSettingsStart());
      try {
         const { data } = await getBlogSettings();
         dispatch(action.getBlogSettingsCompleted(data));
      } catch (error) {
         dispatch(action.getBlogSettingsFailed(error.response && error.response.data));
      }
   };
};


export const createBlogOperation = () => {
   return async (dispatch) => {
      // dispatch(action.createBlogStart());
      try {
         const { data: { id } } = await createDefaultBlog();
         dispatch(push(`${ Router.route('ADMIN_BLOG_EDIT').getCompiledPath({ id }) }#post_details`));
         //  dispatch(action.createBlogCompleted());
         if (isPrint('Blog has been created.')) {
            toast.success('Blog has been created.');
         }
      } catch (error) {
         // /  dispatch(action.createBlogFailed(error.response && error.response.data));
      }
   };
};

export const getBlogPostOperation = (id, getPost) => {
   return async (dispatch) => {
      dispatch(action.getBlogPostStart());
      try {
         const { data } = await getBlogPost(id);
         getPost(data);
         const { data: authors } = await getCourseAuthors();
         dispatch(action.getBlogPostCompleted(data, authors));
      } catch (error) {
         dispatch(action.getBlogPostFailed(error.response && error.response.data));
      }
   };
};


export const saveBlogPostOperation = (id, post, isView) => {
   return async (dispatch) => {
      dispatch(action.saveBlogPostStart());
      try {
         await saveBlogPost(id, post);
         if (isView) {
            if (isPrint('Blog visibility  is changed successfully.')) {
               toast.success('Blog visibility  is changed successfully.');
            }
         } else if (isPrint('Blog post is saved successfully.')) {
            toast.success('Blog post is saved successfully.');
         }

         dispatch(action.saveBlogPostCompleted(id, post, isView));
      } catch (error) {
         dispatch(action.saveBlogPostFailed(error.response && error.response.data));
         if (error.response && error.response.data && error.response.data.errors && error.response.data.errors) {
            const errorName = error.response.data.errors;
            if (error.response.status !== 401) {
               if (errorName.title) {
                  return errorName;
                  // if (isPrint(errorName.title[0])) {
                  //    toast.error(errorName.title[0]);
                  // }
               }
               if (errorName.content) {
                  if (isPrint(errorName.content[0])) {
                     toast.error(errorName.content[0]);
                  }
               }
               if (errorName.slug) {
                  if (isPrint(errorName.slug[0])) {
                     toast.error(errorName.slug[0]);
                  }
               }
            }
         }
      }
   };
};


export const getBlogCategoriesOperation = () => {
   return async (dispatch) => {
      dispatch(action.getBlogCategoriesStart());
      try {
         const data = await getBlogCategories();
         dispatch(action.getBlogCategoriesCompleted(data));
      } catch (error) {
         dispatch(action.getBlogCategoriesFailed());
      }
   };
};

export const addBlogCategoryOperation = (data, post) => {
   return async (dispatch) => {
      dispatch(action.addBlogCategoryStart());
      try {
         const newData = await addBlogCategory(data);
         dispatch(action.addBlogCategoryCompleted(newData.data));
         if (post) {
            const newId = newData.data.id;
            const newIdsData = {
               category_ids: [
                  ...post.attachedIds,
                  newId,
               ],
            };
            await attachBlogCategories(post.id, newIdsData);
            dispatch(action.attachBlogCategoriesCompleted(newData.data, true));
         }
         if (isPrint('Category has been created.')) {
            toast.success('Category has been created.');
         }
      } catch (error) {
         if (error.response && error.response.status === 422) {
            const { data: { errors: { name } = [] } = {} } = error.response;
            return name;
         }
      }
   };
};

export const updateCategoryOperation = (id, data, post) => {
   return async (dispatch) => {
      try {
         await updateBlogCategory(id, data);
         dispatch(action.updateBlogCategoryCompleted(id, data));
         if (post) {
            const newAttached = post.attachedValues.map(cat => {
               if (cat.id !== id) return cat;
               return { ...cat, ...data };
            });
            dispatch(action.updateAttachedCategory(newAttached));
         }
         if (isPrint('Category updated successfully')) {
            toast.success('Category updated successfully');
         }
      } catch (error) {
         if (error.response && error.response.status === 422) {
            const { data: { errors: { name } = [] } = {} } = error.response;
            if (isPrint(name.join(' '))) {
               toast.error(name.join(' '));
            }
         }
      }
   };
};

export const removeCategoryOperation = (id, post) => {
   return async (dispatch) => {
      try {
         await deleteBlogCategory(id);
         dispatch(action.deleteBlogCategoryCompleted(id));
         if (post) {
            const newAttached = post.attachedValues.filter(cat => {
               return cat.id !== id;
            });
            dispatch(action.updateAttachedCategory(newAttached));
         }
         if (isPrint('Category removed successfully')) {
            toast.success('Category removed successfully');
         }
      } catch (error) {
         toast.error('Somethin went wrong!');
      }
   };
};

export const attachBlogCategoriesOperation = (blogId, data, newIdsData, isAttach) => {
   return async (dispatch) => {
      dispatch(action.attachBlogCategoriesStart());
      try {
         await attachBlogCategories(blogId, newIdsData);
         dispatch(action.attachBlogCategoriesCompleted(data, false));
         if (isAttach) {
            if (isPrint('Category has been attached.')) {
               toast.success('Category has been attached.');
            }
         } else if (isPrint('Category has been detached.')) {
            toast.success('Category has been detached.');
         }
      } catch (error) {
         dispatch(action.attachBlogCategoriesFailed());
         if (error.response && error.response.status === 422) {
            if (isPrint('The categories field is required.')) {
               toast.error('The categories field is required.');
            }
         }
      }
   };
};

export const deleteBlogByIdsOperation = (data) => {
   return async (dispatch) => {
      dispatch(action.deleteBlogMultipleStart());
      try {
         await deleteMultipleBlog(data);
         await getBlogOperation()(dispatch);
         dispatch(action.deleteBlogMultipleCompleted({ sortName: 'recently' }));
         const count = data.length === 1 ? 'Article' : 'Articles';
         if (isPrint(`${ count } deleted successfully.`)) {
            toast.success(`${ count } deleted successfully.`);
         }
      } catch (error) {
         dispatch(action.deleteBlogMultipleFailed());
         toast.error('Somethin went wrong!');
      }
   };
};
