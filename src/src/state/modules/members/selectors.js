import { createSelector } from 'reselect';

const innerStateSelector = state => state.members;

export const membersSelector = createSelector(
   innerStateSelector,
   (state) => (state.members)
);

export const currentMemberSelector = createSelector(
   innerStateSelector,
   (state) => (state.currentMember)
);

export const memberTransactionsSelector = createSelector(
   innerStateSelector,
   (state) => (state.memberTransactions)
);

export const transactionsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.transactionsInProgress)
);

export const memberNotesSelector = createSelector(
   innerStateSelector,
   (state) => (state.memberNotes)
);

export const NotesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.notesInProgress)
);

export const currentMemberInitialDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.currentMemberInitialData)
);

export const dataIsFetchingSelector = createSelector(
   innerStateSelector,
   (state) => (state.dataIsFetching)
);

export const innerActionInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.innerActionInProgress)
);

export const noteActionProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.noteActionProgress)
);

export const tagsSelector = createSelector(
   innerStateSelector,
   (state) => (state.tags)
);

export const tagsActionProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.tagsActionProgress)
);

export const currentMemberCoursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.courses)
);


export const currentMemberLastLoginSelector = createSelector(
   innerStateSelector,
   (state) => (state.lastLogin)
);

export const chooseCoursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.chooseCourses)
);

export const selectedFiltersSelector = createSelector(
   innerStateSelector,
   (state) => (state.selectedFilters)
);

export const defaultMemberIdSelector = createSelector(
   innerStateSelector,
   (state) => (state.defaultMemberId));

export const isUnsubscribeEmailSelector = createSelector(
   innerStateSelector,
   (state) => (state.isUnsubscribeEmail)
);

export const addMemberInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.addMemberInProgress)
);

export const currentNoteSelector = createSelector(
   innerStateSelector,
   (state) => (state.currentNote)
);

export const isProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.isFilterAction)
);

export const getSortedClassesVersion = createSelector(
   innerStateSelector,
   (state) => (state.sortedClassVersion)
);

export const getProgressAddCourse = createSelector(
   innerStateSelector,
   (state) => (state.addCourseInProgress)
);


export const getPopupChangesProgress = createSelector(
   innerStateSelector,
   (state) => (state.popupChangesProgress)
);

export const selectedCommunitySelector = createSelector(
   innerStateSelector,
   state => state.selectedCommunity
);

export const isLoadingCommunitySelector = createSelector(
   innerStateSelector,
   state => state.isLoadingCommunity
);

export const initialLengthSelector = createSelector(
   innerStateSelector,
   (state) => state.initialLength
);

export const isEmptyByFilterSelector = createSelector(
   innerStateSelector,
   (state) => state.isEmptyByFilter
);


export const errorsSelector = createSelector(
   innerStateSelector,
   (state) => state.errors
);

export const showFullScreenLoaderSelector = createSelector(
   innerStateSelector,
   (state) => state.showFullScreenLoader
);