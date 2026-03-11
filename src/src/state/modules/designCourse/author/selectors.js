import { createSelector } from 'reselect';

const innerStateSelector = state => state.author;

export const getAllAuthorsSelector = createSelector(
   innerStateSelector,
   (state) => (state.authors)
);

export const isFetcheAuthorsSelector = createSelector(
   innerStateSelector,
   (state) => (state.isFetcheAuthors)
);

export const getOpenAuthorPopupSelector = createSelector(
   innerStateSelector,
   (state) => (state.isOpenAuthorPopup)
);

export const getOpenDeleteAuthorPopupSelector = createSelector(
   innerStateSelector,
   (state) => (state.isOpenDeleteAuthorPopup)
);
