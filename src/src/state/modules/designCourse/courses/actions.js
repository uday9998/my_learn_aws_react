import * as types from './types';

export const setInputAction = (key, value) => {
   return {
      type: types.SET_INPUT,
      payload: {
         key,
         value,
      },
   };
};

export const chooseCourseLinkStart = () => ({
   type: types.CHOOSE_COURSELINK_START,
});

export const chooseCourseLinkCompleted = (courseId) => ({
   type: types.CHOOSE_COURSELINK_COMPLETED,
   payload: {
      courseId,
   },
});

export const getCoursesStart = () => {
   return {
      type: types.GET_COURSES_START,
   };
};
export const getCoursesCompleted = (data, isByFilter) => {
   return {
      type: types.GET_COURSES_COMPLETED,
      payload: {
         data,
         isByFilter,
      },
   };
};
export const getCoursesFailed = (errors) => {
   return {
      type: types.GET_COURSES_FAILED,
      payload: {
         errors,
      },
   };
};

export const filteredCoursesStart = () => ({
   type: types.FILTERED_COURSES_START,
});

export const filteredCoursesCompleted = (data) => ({
   type: types.FILTERED_COURSES_COMPLETED,
   payload: {
      data,
   },
});

export const filteredCoursesFailed = (errors) => ({
   type: types.FILTERED_COURSES_FAILED,
   payload: {
      errors,
   },
});

export const hideCourseStart = () => {
   return {
      type: types.HIDE_COURSE_START,
   };
};
export const hideCourseCompleted = (courseId, isPublished, publishDate) => {
   return {
      type: types.HIDE_COURSE_COMPLETED,
      payload: {
         courseId, isPublished, publishDate,
      },
   };
};
export const hideCourseFailed = (errors) => {
   return {
      type: types.HIDE_COURSE_FAILED,
      payload: {
         errors,
      },
   };
};

export const showCourseStart = () => {
   return {
      type: types.SHOW_COURSE_START,
   };
};
export const showCourseCompleted = (id) => {
   return {
      type: types.SHOW_COURSE_COMPLETED,
      payload: {
         id,
      },
   };
};
export const showCourseFailed = (errors) => {
   return {
      type: types.SHOW_COURSE_FAILED,
      payload: {
         errors,
      },
   };
};

export const duplicateCourse = (duplicatedCourse) => {
   return {
      type: types.DUPLICATE_COURSE,
      payload: duplicatedCourse,
   };
};

export const duplicateCourseStart = () => {
   return {
      type: types.DUPLICATE_COURSE_START,
   };
};
export const duplicateCourseCompleted = (courseId, data) => {
   return {
      type: types.DUPLICATE_COURSE_COMPLETED,
      payload: {
         courseId,
         data,
      },
   };
};
export const duplicateCourseFailed = (errors) => {
   return {
      type: types.DUPLICATE_COURSE_FAILED,
      payload: {
         errors,
      },
   };
};

export const deleteCourseStart = () => {
   return {
      type: types.DELETE_COURSE_START,
   };
};
export const deleteCourseCompleted = (courseId, isFiltered) => {
   return {
      type: types.DELETE_COURSE_COMPLETED,
      payload: {
         courseId,
         isFiltered,
      },
   };
};
export const deleteCourseFailed = (errors) => {
   return {
      type: types.DELETE_COURSE_FAILED,
      payload: {
         errors,
      },
   };
};

export const updateCourseLinkStart = () => {
   return {
      type: types.UPDATE_COURSELINK_START,
   };
};
export const updateCourseLinkCompleted = (courseId, inputs) => {
   return {
      type: types.UPDATE_COURSELINK_COMPLETED,
      payload: {
         courseId,
         inputs,
      },
   };
};
export const updateCourseLinkFailed = (errors) => {
   return {
      type: types.UPDATE_COURSELINK_FAILED,
      payload: {
         errors,
      },
   };
};
export const getDefaultNamesStart = (bool) => {
   return {
      type: types.GET_DEFAULT_NAMES_START,
      payload: !!bool,
   };
};
export const getDefaultNamesCompleted = (data) => {
   return {
      type: types.GET_DEFAULT_NAMES_COMPLETED,
      payload: data,
   };
};
export const getDefaultNamesFailed = () => {
   return {
      type: types.GET_DEFAULT_NAMES_FAILED,
   };
};


export const deleteCoursesMultipleStart = () => ({
   type: types.DELETE_COURSESMULTIPLE_START,
});

export const deleteCoursesMultipleFailed = () => ({
   type: types.DELETE_COURSESMULTIPLE_FAILED,
});

export const deleteCoursesMultipleCompleted = () => ({
   type: types.DELETE_COURSESMULTIPLE_COMPLETED,
});
