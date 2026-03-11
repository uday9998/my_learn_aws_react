import {
   getLessonCategories,
   reorderVideoCategories,
   addVideoCategory,
   updateVideoCategory,
   removeVideoCategory,
   getDettachedCategoryLessons,
   attachVideoLessonsCategory,
   detachVideoLessonsCategory,
   duplicatePlaylist,
} from 'api/AuthApi';
import * as actions from 'state/modules/videoCategories/actions';
import { toast } from 'react-toastify';
import { ErrorPrinter } from 'utils/error';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import isPrint from '../designCourse/edit/Error';


export const reorederCategoriesOperation = (categoryIds) => {
   return async (dispatch) => {
      try {
         dispatch(actions.reorderCategoriesCompleted(categoryIds));
         await reorderVideoCategories({ category_ids: categoryIds });
      } catch (error) {
         ErrorPrinter(error.response);
         if (isPrint('Failed To Reoreder The Categories')) {
            toast.error('Failed To Reoreder The Categories');
         }
      }
   };
};

export const getCategoriesOperation = (search) => {
   return async dispatch => {
      dispatch(actions.getCategoriesStart());
      try {
         const { data } = await getLessonCategories(search);
         dispatch(actions.getCategoriesCompleted(data));
      } catch (error) {
         ErrorPrinter(error.response);
         dispatch(actions.getCategoriesFailed());
         if (isPrint('Failed to get categories.')) {
            toast.error('Failed to get categories.');
         }
      }
   };
};

export const createCategoryOperation = (inputs, isReturnError) => {
   return async dispatch => {
      dispatch(actions.createCategoryStart());
      try {
         const { data } = await addVideoCategory(inputs);
         if (isPrint('Category created successfully.')) {
            toast.success('Category created successfully.');
         }
         dispatch(actions.createCategoryCompleted(data));
      } catch (error) {
         dispatch(actions.crateCategoryEnd());

         if (isReturnError) return error.response;
         ErrorPrinter(error.response);
      }
   };
};


export const FilterCategoriesOperation = (search) => {
   return async dispatch => {
      dispatch(actions.filterCategoriesStart());
      try {
         const { data } = await getLessonCategories(search);
         dispatch(actions.filterCategoriesEnd(data));
      } catch (error) {
         ErrorPrinter(error.response);
         dispatch(actions.filterCategoriesEnd([]));
      }
   };
};

export const updateCategoryOperation = (inputs, id, goBack, isReturnError) => {
   return async dispatch => {
      dispatch(actions.updateCategoryStart());
      try {
         await updateVideoCategory(id, inputs);
         if (isPrint('Category updated successfully.')) {
            toast.success('Category updated successfully.');
         }
         if (goBack) {
            goBack();
         }
         dispatch(actions.updateCategoryCompleted({ ...inputs, id }));
      } catch (error) {
         dispatch(actions.updateCategoryFailed());

         if (isReturnError) return error.response;
         ErrorPrinter(error.response);
      }
   };
};

export const removeCategoryOperation = (id) => {
   return async (dispatch) => {
      dispatch(actions.removeCategoryStart());
      try {
         await removeVideoCategory(id);
         if (isPrint('Category deleted successfully.')) {
            toast.success('Category deleted successfully.');
         }
         dispatch(getCategoriesOperation());
         dispatch(actions.removeCategoryCompleted(id));
      } catch (error) {
         dispatch(actions.removeCategoryFailed());
      }
   };
};

export const getDetachedCoursesOperation = (id) => {
   return async dispatch => {
      dispatch(actions.getDetachedCoursesStart());
      try {
         const { data } = await getDettachedCategoryLessons(id);
         dispatch(actions.getDetachedCoursesCompleted(data || []));
      } catch (error) {
         ErrorPrinter(error.response);
      }
   };
};

export const attachCourseCategoryOperation = (categoryId, ids, isCreatePage) => {
   return async dispatch => {
      dispatch(actions.attachDetachCourseStart());
      try {
         const { data } = await attachVideoLessonsCategory(categoryId, ids);
         if (isCreatePage) {
            dispatch(push({
               pathname: Router.route('ADMIN_VIDEO_CATEGORIES').getMask(),
            }));
         } else {
            dispatch(getCategoriesOperation());
         }

         if (isPrint('Changes saved successfully.')) {
            toast.success('Changes saved successfully.');
         }
         dispatch(actions.attachDetachCourseCompleted(data));
      } catch (error) {
         ErrorPrinter(error.response);
         dispatch(actions.attachDetachCourseFailed());
      }
   };
};

export const detachCoursesCategoryOperation = (categoryId, ids) => {
   return async dispatch => {
      dispatch(actions.attachDetachCourseStart());
      try {
         const { data } = await detachVideoLessonsCategory(categoryId, ids);
         dispatch(getCategoriesOperation());
         if (isPrint('Changes saved successfully.')) {
            toast.success('Changes saved successfully.');
         }
         dispatch(actions.attachDetachCourseCompleted(data));
      } catch (error) {
         ErrorPrinter(error.response);
         dispatch(actions.attachDetachCourseFailed());
      }
   };
};


export const duplicatePlaylistOperation = (sectionId, playlistId, catIds) => {
   return async dispatch => {
      dispatch(actions.getCategoriesStart());
      try {
         await duplicatePlaylist(sectionId, playlistId, catIds);
         dispatch(getCategoriesOperation());
         if (isPrint('Playlist duplicated successfully.')) {
            toast.success('Playlist duplicated successfully.');
         }
      } catch (error) {
         ErrorPrinter(error.response);
         dispatch(actions.getCategoriesFailed());
      }
   };
};
