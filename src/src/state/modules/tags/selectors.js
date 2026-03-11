import { createSelector } from 'reselect';

const innerStateSelector = state => state.tags;

export const getTagsSelector = createSelector(
   innerStateSelector,
   (state) => (state.tags)
);

export const tagsIsFetchingSelector = createSelector(
   innerStateSelector,
   (state) => (state.tagsIsFetching)
);
