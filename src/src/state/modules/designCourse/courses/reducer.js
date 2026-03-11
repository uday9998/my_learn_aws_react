import * as types from './types';
import {
   createReducer,
} from '../../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;

      return {
         ...state,
         currentCourse: {
            ...state.currentCourse,
            [key]: value,
         },
      };
   },

   [types.CHOOSE_COURSELINK_COMPLETED]: (state, action) => {
      const { payload: { courseId } } = action;
      const { courses } = state;
      const currentCourse = courses.find((course) => course.id === courseId);

      return {
         ...state,
         currentCourse,
      };
   },

   [types.GET_COURSES_START]: (state) => {
      return {
         ...state,
         getCoursesInProgress: true,
      };
   },

   [types.GET_COURSES_COMPLETED]: (state, action) => {
      const { payload: { data, isByFilter } } = action;
      
      return {
         ...state,
         courses: data.data,
         totalCourses: data.total,
         getCoursesInProgress: false,
         isEmptyByFilter: isByFilter ? data.data.length === 0 : false,
      };
   },

   [types.GET_COURSES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getCoursesInProgress: false,
         errors,
      };
   },

   [types.FILTERED_COURSES_START]: (state) => {
      return {
         ...state,
         felteredCoursesInProgress: true,
      };
   },

   [types.DELETE_COURSESMULTIPLE_START]: (state) => {
      return {
         ...state,
         getCoursesInProgress: true,
      };
   },

   [types.FILTERED_COURSES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         felteredCoursesInProgress: false,
         courses: data.data,
         totalCourses: data.total,
      };
   },

   [types.FILTERED_COURSES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         felteredCoursesInProgress: false,
      };
   },


   [types.SHOW_COURSE_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.SHOW_COURSE_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      const courses = [...state.courses];
      const selectedCourse = courses.find(course => course.id === id);
      if (selectedCourse.show_course === 0) {
         selectedCourse.show_course = 1;
      } else {
         selectedCourse.show_course = 0;
      }
      return {
         ...state,
         courses,
      };
   },

   [types.SHOW_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },


   [types.HIDE_COURSE_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.HIDE_COURSE_COMPLETED]: (state, action) => {
      const {
         payload: {
            courseId, isPublished, publishDate,
         },
      } = action;
      const courses = state.courses.map((e) => {
         if (e.id === courseId) {
            let publishingDate = null;
            let publishDateString = null;
            if (isPublished === 2 || isPublished === 0) {
               publishingDate = 1;
               publishDateString = null;
            } else if (isPublished === 3) {
               publishingDate = 3;
               publishDateString = publishDate;
            } else {
               publishingDate = 0;
               publishDateString = null;
            }
            return {
               ...e,
               is_published: publishingDate,
               publishing_date: publishDateString,
            };
         }
         return e;
      });
      return {
         ...state,
         courses,
      };
   },

   [types.HIDE_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },

   [types.DUPLICATE_COURSE]: (state, action) => {
      const { payload } = action; 
      const newCourses = state.courses;
      newCourses.splice(1, 0, payload);

      return {
         ...state,
         courses: newCourses,
      };
   },

   [types.DUPLICATE_COURSE_START]: (state) => {
      return {
         ...state,
         duplicateCourseInProgress: true,
      };
   },

   [types.DUPLICATE_COURSE_COMPLETED]: (state) => {
      return {
         ...state,
         duplicateCourseInProgress: false,
      };
   },

   [types.DUPLICATE_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         duplicateCourseInProgress: false,
      };
   },

   [types.DELETE_COURSE_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.DELETE_COURSE_COMPLETED]: (state, action) => {
      const { payload: { courseId, isFiltered } } = action;
      let courses = [...state.courses];
      courses = courses.filter(course => course.id !== courseId);
      return {
         ...state,
         courses,
         isEmptyByFilter: isFiltered && courses.length === 0,
      };
   },

   [types.DELETE_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },

   [types.UPDATE_COURSELINK_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.UPDATE_COURSELINK_COMPLETED]: (state, action) => {
      const { payload: { courseId, inputs } } = action;
      const courses = [...state.courses];
      const updateCourse = courses.find(course => course.id === courseId);
      updateCourse.url = inputs.url;
      updateCourse.landing_url = inputs.landing_url;

      return {
         ...state,
         courses,
      };
   },

   [types.UPDATE_COURSELINK_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },
   [types.GET_DEFAULT_NAMES_START]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         fetchDefaultNames: payload,
      };
   },

   [types.GET_DEFAULT_NAMES_COMPLETED]: (state, action) => {
      const { payload } = action;

      return {
         ...state,
         fetchDefaultNames: false,
         defaultNames: payload,
      };
   },
   [types.GET_DEFAULT_NAMES_FAILED]: (state) => {
      return {
         ...state,
         fetchDefaultNames: false,
      };
   },
};

export default createReducer(initialState)(reducersMap);
