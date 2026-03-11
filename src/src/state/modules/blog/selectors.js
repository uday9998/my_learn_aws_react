import { createSelector } from 'reselect';

const innerStateSelector = state => state.blog;

export const blogSelector = createSelector(
   innerStateSelector,
   (state) => (state.blog)
);

export const getBlogInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getBlogInProgress)
);

export const getBlogPostInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getBlogPostInProgress)
);

export const postSelector = createSelector(
   innerStateSelector,
   (state) => (state.post)
);

export const authorsSelector = createSelector(
   innerStateSelector,
   (state) => (state.authors)
);


export const updatedPostSelector = createSelector(
   innerStateSelector,
   (state) => (state.updatedPost)
);

export const categoriesSelector = createSelector(
   innerStateSelector,
   (state) => (state.categories)
);

export const getBlogCategoriesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getBlogCategoriesInProgress)
);

export const blogSettingsSelector = createSelector(
   innerStateSelector,
   (state) => (state.blogSettings)
);

export const getBlogSettingsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getBlogSettingsInProgress)
);

export const showFullScreenLoaderSelector = createSelector(
   innerStateSelector,
   (state) => state.showFullScreenLoader
);