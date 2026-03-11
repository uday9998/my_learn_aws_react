import { createSelector } from 'reselect';

const innerStateSelector = state => state.blogFront;


export const getFrontBlogPostInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getFrontBlogPostInProgress)
);

export const postFrontSelector = createSelector(
   innerStateSelector,
   (state) => (state.postFront)
);

export const totalSelector = createSelector(
   innerStateSelector,
   (state) => (state.total)
);

export const getFrontBlogCountInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getFrontBlogCountInProgress)
);

export const getFrontBlogInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getFrontBlogInProgress)
);

export const blogFrontSelector = createSelector(
   innerStateSelector,
   (state) => (state.blogFront)
);

export const blogSettingsFrontSelector = createSelector(
   innerStateSelector,
   (state) => (state.blogSettingsFront)
);

export const getFrontBlogSettingsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getFrontBlogSettingsInProgress)
);

export const categoriesFrontSelector = createSelector(
   innerStateSelector,
   (state) => (state.categoriesFront)
);
