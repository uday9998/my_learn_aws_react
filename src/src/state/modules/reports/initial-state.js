import moment from 'moment';

export default {
   initDataInProgress: true,
   getCoursesStatisticsInProgress: false,
   reports: {
      sales: '0.00',
      new_users_count: 0,
      sales_count: 0,
      course_completitions: 0,
      courses: [],
      filter: {
         course_id: '',
         from: moment().subtract(7, 'days').format('YYYY-MM-DD'),
         to: moment().subtract('days').format('YYYY-MM-DD'),
      },
   },
   allTimeReportsLoading: true,
   allTimeReports: [],
   revenueByCourseLoading: true,
   revenueByCourse: { top_courses: [] },
};
