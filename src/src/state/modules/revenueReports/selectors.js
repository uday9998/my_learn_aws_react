import { createSelector } from 'reselect';

const innerStateSelector = state => state.revenueReports;


export const fetchDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.fetchData)
);

export const fetchFilterDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.fetchFilterData)
);

export const reportsSelector = createSelector(
   innerStateSelector,
   (state) => (state.reports)
);
export const fetchGhostDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.fetchGhostData)
);
export const ghostSelector = createSelector(
   innerStateSelector,
   (state) => (state.ghost)
);
export const stepsSelector = createSelector(
   innerStateSelector,
   (state) => (state.steps)
);
export const fetchStepsDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.fetchStepsData)
);
