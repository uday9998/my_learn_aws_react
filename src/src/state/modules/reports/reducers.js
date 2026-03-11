import moment from 'moment';
import {
   createReducer,
} from '../../utils/reducerHelper';
import * as types from './types';

import initialState from './initial-state';

const reducersMap = {
   [types.SET_FILTER_INPUT]: (state, action) => {
      const { key, value } = action.payload;
      return {
         ...state,
         reports: {
            ...state.reports,
            filter: { ...state.reports.filter, [key]: value },
         },
      };
   },
   [types.GET_COURSES_STATISTICS_START]: (state, action) => {
      const { firstGet } = action.payload;
      return {
         ...state,
         getCoursesStatisticsInProgress: true,
         initDataInProgress: true,
      };
   },
   [types.GET_COURSES_STATISTICS_COMPLETED]: (state, action) => {
      const {
         data, filter, dateOption, delimeter,
      } = action.payload;
      const salesStatistic = data.with_dates;
      // {
      //    date: data.map(item => item.date[0]),
      //    close: data.map(item => item.amount),
      // };

      return {
         ...state,
         getCoursesStatisticsInProgress: false,
         initDataInProgress: false,
         reports: {
            ...state.reports,
            sales: data.all,
            sales_count: data.sales_count,
            course_completitions: data.course_completitions,
            new_users_count: data.new_users_count,
            courses: data.courses,
            sales_statistic: [...salesStatistic],
            salesData: data,
            delimeter,
            //  filter: { ...state.reports.filter, from: filter.from, to: filter.to },
            dateOption,
         },
      };
   },
   [types.GET_COURSES_STATISTICS_FAILED]: (state, action) => {
      const { errors } = action.payload;
      return {
         ...state,
         errors,
         getCoursesStatisticsInProgress: false,
         initDataInProgress: false,
      };
   },
   [types.GET_ALL_TIME_REVENUE_BY_COURSE_START]: (state) => {
      return {
         ...state,
         allTimeReportsLoading: true,
      };
   },
   [types.GET_ALL_TIME_REVENUE_BY_COURSE_COMPLETED]: (state, action) => {
      const { data } = action.payload;

      return {
         ...state,
         allTimeReportsLoading: false,
         allTimeReports: data,
      };
   },
   [types.GET_REVENUE_BY_COURSE_START]: (state) => {
      return {
         ...state,
         revenueByCourseLoading: true,
      };
   },
   [types.GET_REVENUE_BY_COURSE_COMPLETED]: (state, action) => {
      const { data: { top_courses: topCourses, groupByDate, dateRange } } = action.payload;
      const [from, to] = dateRange;
      const reportsDayByDay = [];
      const summary = {
         date: 'Summary', revenue: 0, payments: 0, coursesCount: 0,
      };

      for (const d = moment(from); d.isBefore(to); d.add(1, 'day')) {
         const groupKey = d.format('MM/DD/YYYY');
         const res = groupByDate[groupKey];
         let dayResult = {
            date: groupKey, revenue: 0, payments: 0, coursesCount: 0,
         };
         if (res) {
            dayResult = { ...dayResult, revenue: +res.revenue.toFixed(1), ...groupByDate[groupKey] };
            summary.revenue += res.revenue;
            summary.payments += res.payments;
            summary.coursesCount += res.coursesCount;
         }
         reportsDayByDay.push(dayResult);
      }
      summary.revenue = +summary.revenue.toFixed(1);
      reportsDayByDay.unshift(summary);
      const allAmount = topCourses.reduce((acc, course) => acc + course.revenue, 0);
      const revenueByCourse = topCourses.reduce((res, course) => {
         const percentage = +((course.revenue / allAmount) * 100).toFixed(2);
         res.courses.push({ ...course, revenuePercentage: percentage });
         res.data.push(percentage);
         return res;
      }, { data: [], courses: [] });

      return {
         ...state,
         revenueByCourse,
         revenueByCourseLoading: false,
         revenueByCourseTotal: +allAmount.toFixed(1),
         reportsDayByDay,
      };
   },
};

export default createReducer(initialState)(reducersMap);
