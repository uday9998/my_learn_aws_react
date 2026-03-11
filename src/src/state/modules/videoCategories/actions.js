import * as types from './types';

export const reorderCategoriesCompleted = (categoryIds) => ({
   type: types.REORDER_CATEGORIES_COMLETED,
   payload: { categoryIds },
});

export const getCategoriesStart = () => ({
   type: types.GET_CATEGORIES_START,
});

export const getCategoriesCompleted = (data) => ({
   type: types.GET_CATEGORIES_COMPLETED,
   payload: data,
});

export const getCategoriesFailed = () => ({
   type: types.GET_CATEGORIES_END,
});

export const createCategoryStart = () => ({
   type: types.CREATE_CATEGORY_START,
});

export const createCategoryCompleted = (data) => ({
   type: types.CREATE_CATEGORY_COMPLETED,
   payload: data,
});

export const crateCategoryEnd = () => ({
   type: types.CREATE_CATEGORY_END,
});

export const filterCategoriesStart = () => ({
   type: types.CATEGORIES_FILTER_START,
});

export const filterCategoriesEnd = (data) => ({
   type: types.CATEGORIES_FILTER_END,
   payload: data,
});

export const updateCategoryStart = () => ({
   type: types.UPDATE_CATEGORY_START,
});

export const updateCategoryFailed = () => ({
   type: types.UPDATE_CATEGORY_FAILED,
});

export const updateCategoryCompleted = (data) => ({
   type: types.UPDATE_CATEGORY_COMPLETED,
   payload: data,
});

export const removeCategoryStart = () => ({
   type: types.REMOVE_CATEGORY_START,
});

export const removeCategoryCompleted = (id) => ({
   type: types.REMOVE_CATEGORY_COMPLETED,
   payload: id,
});

export const removeCategoryFailed = () => ({
   type: types.REMOVE_CATEGORY_FAILED,
});

export const getDetachedCoursesStart = () => ({
   type: types.GET_DETACHED_COURSES_START,
});

export const getDetachedCoursesCompleted = (data) => ({
   type: types.GET_DETACHED_COURSES_END,
   payload: data,
});

export const attachDetachCourseStart = () => ({
   type: types.ATTACH_DETACH_COURSE_START,
});

export const attachDetachCourseFailed = () => ({
   type: types.ATTACH_DETACH_COURSE_FAILED,
});

export const attachDetachCourseCompleted = (data) => ({
   type: types.ATTACH_DETACH_COURSE_COMPLETED,
   payload: data,
});
