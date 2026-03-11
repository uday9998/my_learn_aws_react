import { createSelector } from 'reselect';

const innerStateSelector = state => state.comments;

export const SortingVersionSelector = createSelector(
   innerStateSelector,
   (state) => (state.sortingVersion)
);

export const loadingSelector = createSelector(
   innerStateSelector,
   state => state.isLoading
);

export const commentsSelector = createSelector(
   innerStateSelector,
   state => state.comments
);

export const searchDataSelector = createSelector(
   innerStateSelector,
   state => state.searchData
);

export const searchingProgressSelector = createSelector(
   innerStateSelector,
   state => state.isSearching
);

export const commentChangesSelector = createSelector(
   innerStateSelector,
   state => state.isProgressComment
);

export const replyProgressSelector = createSelector(
   innerStateSelector,
   state => state.isProgressRepling
);

export const commentGetProgressSelector = createSelector(
   innerStateSelector,
   state => state.replieProgress
);

export const commentSelector = createSelector(
   innerStateSelector,
   state => state.comment
);
