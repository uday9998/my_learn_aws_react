import { createSelector } from 'reselect';

const innerStateSelector = state => state.courseComments;

export const commentsDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.commentsData)
);
export const commentsCountSelector = createSelector(
   innerStateSelector,
   (state) => (state.commentsData.data.length)
);

export const fetchDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.fetchData)
);

export const fetchNewDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.fetchNewData)
);
