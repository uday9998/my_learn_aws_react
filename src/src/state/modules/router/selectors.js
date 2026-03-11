import { createSelector } from 'reselect';

const innerStateSelector = state => state.router;

export const locationSelector = createSelector(
   innerStateSelector,
   (state) => (state.location)
);

export const currentLocationPathSelector = createSelector(
   locationSelector,
   (state) => (state.pathname)
);
