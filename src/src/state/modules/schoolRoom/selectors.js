import { createSelector } from 'reselect';

const innerStateSelector = state => state.schoolRoom;

export const isLoadingFilesSelector = createSelector(
   innerStateSelector,
   state => state.isLoadingFiles
); 

export const portalTemplateFilesSelector = createSelector(
   innerStateSelector,
   state => state.files
);

export const portalTemplateTypeSelector = createSelector(
   innerStateSelector,
   state => state
);