import { createSelector } from 'reselect';

const innerStateSelector = state => state.community;


export const communitySelector = createSelector(
   innerStateSelector,
   (state) => (state.community)
);

export const selectLoginedUserRole = createSelector(
   innerStateSelector,
   (state) => state.role
);

export const communityProgressSelector = createSelector(
   innerStateSelector,
   state => state.progress
);

export const roomProgressSelector = createSelector(
   innerStateSelector,
   state => state.roomProgress
);

export const bannerProgressSelector = createSelector(
   innerStateSelector,
   state => state.bannerProgress
);

export const eventProgressSelector = createSelector(
   innerStateSelector,
   state => state.eventProgress
);

export const selectedRoomSelector = createSelector(
   innerStateSelector,
   state => state.selectedRoom
);

export const isFetchingRoomSelector = createSelector(
   innerStateSelector,
   state => state.isFetchingRoom
);

export const sortingOptionsSelector = createSelector(
   innerStateSelector,
   state => state.sortingOptions
);

export const selectedEventSelector = createSelector(
   innerStateSelector,
   state => state.selectedEvent
);

export const initialEventsLengthSelector = createSelector(
   innerStateSelector,
   state => state.initialEventsLength
);

export const eventSettingsSelector = createSelector(
   innerStateSelector,
   state => state.eventSettings
);

export const eventSettingsProgressSelector = createSelector(
   innerStateSelector,
   state => state.eventSettingsProgress
);

export const locationCountsStateSelector = createSelector(
   innerStateSelector,
   state => state.locationCounts
);

export const accessCountsStateSelector = createSelector(
   innerStateSelector,
   state => state.accessCounts
);

export const initialPostsLengthSelector = createSelector(
   innerStateSelector,
   state => state.initialPostsLength
);

export const initialEventsSelector = createSelector(
   innerStateSelector,
   state => state.initialEvents
);

export const postCreateProgressSelector = createSelector(
   innerStateSelector,
   state => state.postCreateProgress
);

export const invitePorgressSelector = createSelector(
   innerStateSelector,
   state => state.invitePorgress
);

export const memberSelector = createSelector(
   innerStateSelector,
   state => state.member
);

export const memberProgressSelector = createSelector(
   innerStateSelector,
   state => state.memberProgress
);

export const membersPageProgressSelector = createSelector(
   innerStateSelector,
   state => state.membersPageProgress
);

export const membersPageSelector = createSelector(
   innerStateSelector,
   state => state.membersPage
);

export const messagesSelector = createSelector(
   innerStateSelector,
   state => state.messages
);

export const messagesLoadingSelector = createSelector(
   innerStateSelector,
   state => state.loadingMessages
);

export const messagesInitialCountSelector = createSelector(
   innerStateSelector,
   state => state.initialMessagesCount
);

export const messagesHistorySelector = createSelector(
   innerStateSelector,
   state => state.messagesHistory
);

export const searchCommunitySelector = createSelector(
   innerStateSelector,
   state => state.search
);
