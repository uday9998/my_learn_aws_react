import { createSelector } from 'reselect';

const innerStateSelector = state => state.webHooks;

export const isFetchingDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.isFetchingData)
);

export const webHooksSelector = createSelector(
   innerStateSelector,
   (state) => (state.webHooks)
);
export const webHookByIdSelector = createSelector(
   innerStateSelector,
   (state) => (state.webHook)
);
export const webHookIsFetchingData = createSelector(
   innerStateSelector,
   (state) => (state.isFetchingData)
);
export const webHookLogsSelector = createSelector(
   innerStateSelector,
   (state) => (state.webHookLogs)
);
