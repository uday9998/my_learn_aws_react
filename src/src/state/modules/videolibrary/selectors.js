import { createSelector } from 'reselect';

const innerStateSelector = state => state.videolibrary;

export const isFetchingDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.isFetchingData)
);

export const videosSelector = createSelector(
   innerStateSelector,
   (state) => (state.videos)
);
export const isFetchingDataByFilterSelector = createSelector(
   innerStateSelector,
   (state) => (state.isFetchingDataByFilter)
);
