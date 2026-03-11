import { createSelector } from 'reselect';

const innerStateSelector = state => state.categories;

export const getCategoriesSelector = createSelector(
   innerStateSelector,
   (state) => (state.categories)
);

export const progressSelector = createSelector(
   innerStateSelector,
   state => state.isFetchingData
);

export const filterProgressSelector = createSelector(
   innerStateSelector,
   state => state.isFiltering
);

export const initialCountSelector = createSelector(
   innerStateSelector,
   state => state.categoriesInitialCount
);

export const updateProgressSelector = createSelector(
   innerStateSelector,
   state => state.updateProgress
);

export const detachedCourses = createSelector(
   innerStateSelector,
   state => state.detachedCourses
);

export const isProgressDetachCourses = createSelector(
   innerStateSelector,
   state => state.isProgressDetachCourses
);

export const isProgressCoursesOperationSelector = createSelector(
   innerStateSelector,
   state => state.isProcesingCourseOperation
);
