import { createSelector } from 'reselect';

const innerStateSelector = state => state.emails;

export const emailsSelector = createSelector(
   innerStateSelector,
   (state) => (state.emails)
);

export const filterEmailsSelector = createSelector(
   innerStateSelector,
   (state) => (state.filterEmails)
);

export const selectedFiltersSelector = createSelector(
   innerStateSelector,
   (state) => (state.selectedFilters)
);

export const isEmailSentSelector = createSelector(
   innerStateSelector,
   (state) => (state.isEmailSent)
);


export const formDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.formData)
);

export const sendEmailInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.sendEmailInProgress)
);

export const filterOptionsSelector = createSelector(
   innerStateSelector,
   (state) => (state.filterOptions)
);

export const settingsEmailSelector = createSelector(
   innerStateSelector,
   (state) => ({ from: state.email, reply: state.replyEmail })
);

export const getEmailInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getEmailInProgress)
);

export const emailIdSelector = createSelector(
   innerStateSelector,
   (state) => (state.emailId)
);

export const emailStatusesSelector = createSelector(
   innerStateSelector,
   (state) => (state.emailStatuses)
);


export const getEmailStatusesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getEmailStatusesInProgress)
);


export const emailStatusesTotalSelector = createSelector(
   innerStateSelector,
   (state) => (state.emailStatusesTotal)
);

export const getFilterOptionsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getFilterOptionsInProgress)
);

export const getUsersEmailsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getUsersEmailsInProgress)
);

export const getAdminEmailsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getAdminEmailsInProgress)
);

export const initalEmailsLengthSelector = createSelector(
   innerStateSelector,
   (state) => state.initalEmailsLength
);

export const isEmptyByFilterSelector = createSelector(
   innerStateSelector,
   (state) => state.isEmptyByFilter
);

export const isLoadingActionSelector = createSelector(
   innerStateSelector,
   (state) => state.isLoadingAction
);
