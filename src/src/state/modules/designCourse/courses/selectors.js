import { createSelector } from 'reselect';

const innerStateSelector = state => state.courses;

export const coursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.courses)
);

export const currentCourseSelector = createSelector(
   innerStateSelector,
   (state) => (state.currentCourse)
);

export const duplicateCourseInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.duplicateCourseInProgress)
);


export const getCoursesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getCoursesInProgress)
);

export const totalCoursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.totalCourses)
);
export const defaultNamesSelector = createSelector(
   innerStateSelector,
   (state) => (state.defaultNames)
);
export const fetchDefaultNamesSelector = createSelector(
   innerStateSelector,
   (state) => (state.fetchDefaultNames)
);

export const isEmptyByFilterSelector = createSelector(
   innerStateSelector,
   (state) => (state.isEmptyByFilter)
);

export const errorsSelector = createSelector(
   innerStateSelector,
   (state) => (state.errors)
);

export const felteredCoursesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.felteredCoursesInProgress)
);
