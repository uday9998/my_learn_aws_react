import { createSelector } from 'reselect';

const innerStateSelector = state => state.sites;

export const sitesSelector = createSelector(
   innerStateSelector,
   (state) => (state.sites)
);

export const totalSitesSelector = createSelector(
   innerStateSelector,
   (state) => (state.totalSites)
);


export const getSitesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getSitesInProgress)
);

export const currentSiteSelector = createSelector(
   innerStateSelector,
   (state) => (state.currentSite)
);

export const errorsSiteSelector = createSelector(
   innerStateSelector,
   (state) => (state.errors)
);

export const tokenSiteSelector = createSelector(
   innerStateSelector,
   (state) => (state.token)
);
