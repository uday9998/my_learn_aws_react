import { createSelector } from 'reselect';

const innerStateSelector = state => state.gamifications;

export const getBadgeInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getBadgesInProgress)
);

export const coursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.courses)
);

export const bagdesSelector = createSelector(
   innerStateSelector,
   (state) => (state.badges)
);

export const currentBadgeSelector = createSelector(
   innerStateSelector,
   (state) => (state.currentBadge)
);

export const createBadgeinProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.createBadgeinProgress)
);

export const chooseBadgeInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.chooseBadgeInProgress)
);

export const addingBadgeSelector = createSelector(
   innerStateSelector,
   (state) => (state.addingBadge)
);
export const mobileShowCurrentBudgeSelector = createSelector(
   innerStateSelector,
   (state) => (state.mobileShowCurrentBudge)
);
