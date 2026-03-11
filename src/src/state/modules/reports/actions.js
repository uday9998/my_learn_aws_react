import * as types from './types';

export const setFilterInput = (key, value) => ({
   type: types.SET_FILTER_INPUT,
   payload: {
      key, value,
   },
});

export const getCoursesStatisticsStart = (firstGet) => ({
   type: types.GET_COURSES_STATISTICS_START,
   payload: {
      firstGet,
   },
});

export const getCoursesStatisticsCompleted = (data, filter, dateOption, delimeter) => ({
   type: types.GET_COURSES_STATISTICS_COMPLETED,
   payload: {
      data,
      filter,
      dateOption,
      delimeter,
   },
});

export const getCoursesStatisticsFailed = (errors) => ({
   type: types.GET_COURSES_STATISTICS_FAILED,
   payload: {
      errors,
   },
});

export const getAllTimeReportsStart = () => ({
   type: types.GET_ALL_TIME_REVENUE_BY_COURSE_START,
});

export const getAllTimeReportsCompleted = (data) => ({
   type: types.GET_ALL_TIME_REVENUE_BY_COURSE_COMPLETED,
   payload: {
      data,
   },
});

export const getAllTimeReportsFailed = (errors) => ({
   type: types.GET_ALL_TIME_REVENUE_BY_COURSE_FAILED,
   payload: {
      errors,
   },
});

export const getRevenueByCoursesStart = () => ({
   type: types.GET_REVENUE_BY_COURSE_START,
});

export const getRevenueByCoursesCompleted = (data) => ({
   type: types.GET_REVENUE_BY_COURSE_COMPLETED,
   payload: {
      data,
   },
});

export const getRevenueByCoursesFailed = (errors) => ({
   type: types.GET_REVENUE_BY_COURSE_FAILED,
   payload: {
      errors,
   },
});
