import * as AuthApi from 'api/AuthApi';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';
import * as action from './actions';


export const getCoursesStatisticsOperation = (filter, { firstGet = false, courseChanged = false } = {}, dateOption, delimeter = 'day') => {
   return async (dispatch) => {
      dispatch(action.getCoursesStatisticsStart(firstGet));
      // if (courseChanged || firstGet) {
      //    dispatch(action.getAllTimeReportsStart());
      //    AuthApi.getAllTimeSalesStatistics(filter.course_id)
      //       .then(data => dispatch(action.getAllTimeReportsCompleted(data.data)))
      //       .catch(err => action.getAllTimeReportsFailed(err));
      // }
      // dispatch(action.getRevenueByCoursesStart());

      // AuthApi.getRevenueForPieChartAndTable(filter)
      //    .then(data => dispatch(action.getRevenueByCoursesCompleted(data.data)))
      //    .catch(err => action.getRevenueByCoursesFailed(err));
      try {
         const { data } = await AuthApi.getCoursesStatistics(filter, firstGet, delimeter);
         dispatch(action.getCoursesStatisticsCompleted(data, filter, dateOption, delimeter));
      } catch (error) {
         if (error.response) {
            dispatch(action.getCoursesStatisticsFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
