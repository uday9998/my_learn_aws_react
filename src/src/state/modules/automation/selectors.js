import { createSelector } from 'reselect';

const innerStateSelector = state => state.automation;


export const getCoursesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getCoursesInProgress)
);

export const getallMembersInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getallMembersInProgress)
);

export const coursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.courses)
);

export const membersSelector = createSelector(
   innerStateSelector,
   (state) => (state.members)
);

export const tagsSelector = createSelector(
   innerStateSelector,
   (state) => (state.tags)
);

export const couponsSelector = createSelector(
   innerStateSelector,
   (state) => (state.coupons)
);

export const triggersSelector = createSelector(
   innerStateSelector,
   (state) => (state.triggers)
);

export const conditionsSelector = createSelector(
   innerStateSelector,
   (state) => (state.conditions)
);

export const automationSelector = createSelector(
   innerStateSelector,
   (state) => (state.automation)
);

export const automationsSelector = createSelector(
   innerStateSelector,
   (state) => (state.automations)
);

export const getAutomationInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getAutomationInProgress)
);

export const getAutomationsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getAutomationsInProgress)
);

export const currentTriggerSelector = createSelector(
   innerStateSelector,
   (state) => (state.currentTrigger)
);

export const currentActionSelector = createSelector(
   innerStateSelector,
   (state) => (state.currentAction)
);

export const getActionInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getActionInProgress)
);

export const getTriggerInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getTriggerInProgress)
);

export const initialAutomationsLengthSelector = createSelector(
   innerStateSelector,
   (state) => state.initialAutomationsLength
);


export const getallQuizzesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getallQuizzesInProgress)
);

export const quizzesSelector = createSelector(
   innerStateSelector,
   (state) => (state.quizzes)
);
