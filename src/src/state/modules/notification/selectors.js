import { createSelector } from 'reselect';

const innerStateSelector = state => state.notification;

export const notificationSelector = createSelector(
   innerStateSelector,
   (state) => (state.current)
);

export const notificationProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.isNotificationInProgress)
);

export const metaDataDefaultSelector = createSelector(
   innerStateSelector,
   (state) => (state.metaDataDefault)
);
