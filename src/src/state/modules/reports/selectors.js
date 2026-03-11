import { createSelector } from 'reselect';

const innerStateSelector = state => state.reports;


export const initDataInProgress = createSelector(
   innerStateSelector,
   (state) => (state.initDataInProgress)
);

export const reportsSelector = createSelector(
   innerStateSelector,
   (state) => (state.reports)
);

export const reportItemsSelector = createSelector(
   innerStateSelector,
   (state) => {
      return {
         allTimeReports: { data: state.allTimeReports, loading: state.allTimeReportsLoading },
         revenueByCourse: {
            data: state.revenueByCourse,
            reportsDayByDay: state.reportsDayByDay,
            loading: state.revenueByCourseLoading,
            total: state.revenueByCourseTotal,
         },
      };
   }
);
