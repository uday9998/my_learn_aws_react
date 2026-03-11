import { createSelector } from 'reselect';

const innerStateSelector = state => state.tracking;


export const emailsDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.data)
);

export const emailsProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.isLoading)
);
