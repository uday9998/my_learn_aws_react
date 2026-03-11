import { createSelector } from 'reselect';

const innerStateSelector = state => state.settings;

export const integrationSettingsSelector = createSelector(
   innerStateSelector,
   (state) => (state.integrations)
);

export const emailsSettingsSelector = (state) => {
   return state.settings.emails;
};

export const dataIsFetchingSelector = (state) => {
   return state.settings.dataIsFetching;
};

export const mainhubSettingsSelector = createSelector(
   innerStateSelector,
   (state) => (state.mainhub)
);

export const accountSettingsSelector = createSelector(
   innerStateSelector,
   (state) => (state.account)
);

export const getSettingsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getSettingsInProgress)
);

export const fromEmailSelector = createSelector(
   innerStateSelector,
   (state) => ({ loading: state.fromEmailLoading, data: state.emails || {}, dnsSettingsOpen: state.dnsSettingsOpen })
);

export const videoAnalyticsSelector = createSelector(
   innerStateSelector,
   (state) => (state.videoanalytics)
);

export const videoSelector = createSelector(
   innerStateSelector,
   (state) => (state.video)
);

export const getVideoInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getVideoInProgress)
);

export const getAllSettingsSelector = (createSelector(
   innerStateSelector,
   (state) => (state)
));

export const tabNameSelector = createSelector(
   innerStateSelector,
   (state) => (state.tabName)
);

export const userChangedDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.userChangedData)
);


export const errorSelector = createSelector(
   innerStateSelector,
   (state) => (state.errors)
);

export const createLinkInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.createLinkInProgress)
);

export const createLinkModalOpenSelector = createSelector(
   innerStateSelector,
   (state) => (state.createLinkModalOpen)
);

export const getFileSizeSelector = createSelector(
   innerStateSelector,
   (state) => (state.fileSizeInfo)
);

export const customLinksButtonDisabledSelector = createSelector(
   innerStateSelector,
   (state) => (state.isCustomLinksButtonDisabled)
);


export const apiDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.apiData)
);

export const getApiKeyInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getApiKeyInProgress)
);

export const allCoursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.allCourses)
);

export const languagesSelector = createSelector(
   innerStateSelector,
   (state) => (state.language)
);

export const putSettingsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.putSettingsInProgress)
);

export const getScriptsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getScriptsInProgress)
);

export const scriptsSelector = createSelector(
   innerStateSelector,
   (state) => (state.scripts)
);

export const currentScriptSelector = createSelector(
   innerStateSelector,
   (state) => (state.currentScript)
);

export const newScriptSelector = createSelector(
   innerStateSelector,
   (state) => (state.newScript)
);

export const disableDisconnectSelector = createSelector(
   innerStateSelector,
   (state) => (state.disableDisconnectIntegration)
);


export const settingsErrorSelector = createSelector(
   innerStateSelector,
   (state) => (state.settingsError)
);

export const notificationsSelector = createSelector(
   innerStateSelector,
   (state) => (state.notifications)
);


export const notificationsFetchingSelector = createSelector(
   innerStateSelector,
   (state) => (state.isNotificationsFetching)
);

export const initialNotificationsSelector = createSelector(
   innerStateSelector,
   (state) => (state.initialNotifications)
);

export const codesSelector = createSelector(
   innerStateSelector,
   (state) => (state.codes)
);
