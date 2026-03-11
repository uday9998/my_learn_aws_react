import { createSelector } from 'reselect';

const innerStateSelector = state => state.emailTemplates;

export const emailCoursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.courses)
);


export const getEmailTemplatesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getEmailTemplatesInProgress)
);


export const templateSelector = createSelector(
   innerStateSelector,
   (state) => (state.template)
);

export const getAutoemailsTemplates = createSelector(
   innerStateSelector,
   (state) => (state.autoEmails)
);

export const checkBoxValuesSelector = createSelector(
   innerStateSelector,
   (state) => (state.checkBoxValues)
);


export const getEmailTemplateInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getEmailTemplateInProgress)
);
