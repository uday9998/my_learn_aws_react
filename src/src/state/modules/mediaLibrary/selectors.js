import { createSelector } from 'reselect';

const innerStateSelector = state => state.medialibrary;

export const isFetchingDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.isFetchingData)
);

export const mediasSelector = createSelector(
   innerStateSelector,
   (state) => (state.medias)
);
export const mediaTypesSelector = createSelector(
   innerStateSelector,
   (state) => (state.mediaTypes)
);
export const folderCountSelector = createSelector(
   innerStateSelector,
   (state) => (state.folderCount)
);

export const mediaModeSelector = createSelector(
   innerStateSelector,
   (state) => (state.mode)
);

export const mediaPaginationSelector = createSelector(
   innerStateSelector,
   (state) => (state.pagination)
);

export const activeTabSelector = createSelector(
   innerStateSelector,
   (state) => (state.activeTab)
);

export const changePageInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.changePageInProgress)
);

export const mediaTagsSelectore = createSelector(
   innerStateSelector,
   (state) => (state.tags)
);

export const foldersSelector = createSelector(
   innerStateSelector,
   (state) => (state.folders)
);

export const mediaLabelsSelector = createSelector(
   innerStateSelector,
   (state) => state.labels
);

export const folderWithTypesSelector = createSelector(
   innerStateSelector,
   (state) => (state.folderWithTypes)
);

export const getProgressSelector = createSelector(
   innerStateSelector,
   state => state.getProgress
);
