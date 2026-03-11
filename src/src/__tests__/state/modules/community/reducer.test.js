import reducer from '../../../../state/modules/community/reducer';
import * as types from '../../../../state/modules/community/types';
import initialState from '../../../../state/modules/community/initial-state';

// Mock the utility functions
jest.mock('utils/getMemberRoleCommunity', () => ({
  getMemberRole: jest.fn(() => 'member'),
  getMemberSuspendedStatus: jest.fn(() => false),
}));

describe('Community Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('GET_COMMUNITY actions', () => {
    it('should handle GET_COMMUNITY_START', () => {
      const action = { type: types.GET_COMMUNITY_START };
      const state = reducer(initialState, action);

      expect(state.progress).toBe(true);
    });

    it('should handle GET_COMMUNITY_END', () => {
      const action = { type: types.GET_COMMUNITY_END };
      const state = reducer({ ...initialState, progress: true }, action);

      expect(state.progress).toBe(false);
    });

    it('should handle GET_COMMUNITY_COMPLETED', () => {
      const action = {
        type: types.GET_COMMUNITY_COMPLETED,
        payload: {
          data: {
            id: 1,
            name: 'Test Community',
            community_member: [],
          },
          userId: 123,
        },
      };

      const state = reducer(initialState, action);

      expect(state.progress).toBe(false);
      expect(state.community.id).toBe(1);
      expect(state.community.name).toBe('Test Community');
      expect(state.role).toBe('member');
      expect(state.community.userSuspended).toBe(false);
    });
  });

  describe('CREATE_ROOM actions', () => {
    it('should handle CREATE_ROOM_START', () => {
      const action = { type: types.CREATE_ROOM_START };
      const state = reducer(initialState, action);

      expect(state.roomProgress).toBe(true);
    });

    it('should handle CREATE_ROOM_END', () => {
      const action = { type: types.CREATE_ROOM_END };
      const state = reducer({ ...initialState, roomProgress: true }, action);

      expect(state.roomProgress).toBe(false);
    });

    it('should handle CREATE_ROOM_COMPLETED', () => {
      const action = { type: types.CREATE_ROOM_COMPLETED };
      const state = reducer({ ...initialState, roomProgress: true }, action);

      expect(state.roomProgress).toBe(false);
    });
  });

  describe('DELETE_ROOM actions', () => {
    it('should handle DELETE_ROOM_START', () => {
      const action = { type: types.DELETE_ROOM_START };
      const state = reducer(initialState, action);

      expect(state.roomProgress).toBe(false);
    });

    it('should handle DELETE_ROOM_FAILED', () => {
      const action = { type: types.DELETE_ROOM_FAILED };
      const state = reducer(initialState, action);

      expect(state.roomProgress).toBe(false);
    });

    it('should handle DELETE_ROOM_COMPLETED', () => {
      const rooms = [
        { id: 1, name: 'Room 1' },
        { id: 2, name: 'Room 2' },
        { id: 3, name: 'Room 3' },
      ];

      const stateWithRooms = {
        ...initialState,
        community: { rooms },
        selectedRoom: { id: 2, name: 'Room 2' },
      };

      const action = {
        type: types.DELETE_ROOM_COMPLETED,
        payload: 2,
      };

      const state = reducer(stateWithRooms, action);

      expect(state.roomProgress).toBe(false);
      expect(state.community.rooms).toHaveLength(2);
      expect(state.community.rooms.find(r => r.id === 2)).toBeUndefined();
      expect(state.selectedRoom).toEqual({ name: 'Welcom', id: 'welcome' });
      expect(state.selectedEvent).toBeNull();
    });
  });

  describe('CHANGE_SORT_OPTIONS', () => {
    it('should update sorting options', () => {
      const action = {
        type: types.CHANGE_SORT_OPTIONS,
        payload: {
          date: 'oldest',
          locationTypes: ['virtual'],
          eventAccess: ['open'],
        },
      };

      const state = reducer(initialState, action);

      expect(state.sortingOptions).toEqual({
        date: 'oldest',
        locationTypes: ['virtual'],
        eventAccess: ['open'],
      });
    });
  });

  describe('SELECT_EVENT_VIEW', () => {
    it('should set selected event', () => {
      const event = { id: 1, name: 'Test Event' };
      const action = {
        type: types.SELECT_EVENT_VIEW,
        payload: event,
      };

      const state = reducer(initialState, action);

      expect(state.selectedEvent).toEqual(event);
    });
  });

  describe('GET_ROOM actions', () => {
    it('should handle GET_ROOM_START', () => {
      const action = { type: types.GET_ROOM_START };
      const state = reducer(initialState, action);

      expect(state.isFetchingRoom).toBe(true);
    });

    it('should handle GET_ROOM_FAILED', () => {
      const action = { type: types.GET_ROOM_FAILED };
      const state = reducer({ ...initialState, isFetchingRoom: true }, action);

      expect(state.isFetchingRoom).toBe(false);
    });
  });

  describe('POST_LIKE_COMPLETED', () => {
    it('should update post like status', () => {
      const posts = [
        { id: 1, liked: false, likesCount: 5 },
        { id: 2, liked: false, likesCount: 3 },
      ];

      const stateWithPosts = {
        ...initialState,
        selectedRoom: { posts },
      };

      const action = {
        type: types.POST_LIKE_COMPLETED,
        payload: {
          postId: 1,
          liked: true,
          likesCount: 6,
        },
      };

      const state = reducer(stateWithPosts, action);

      const likedPost = state.selectedRoom.posts.find(p => p.id === 1);
      expect(likedPost.liked).toBe(true);
      expect(likedPost.likesCount).toBe(6);
    });
  });

  describe('RESET_SELECTED_ROOM', () => {
    it('should reset selected room to welcome', () => {
      const stateWithRoom = {
        ...initialState,
        selectedRoom: { id: 5, name: 'Custom Room' },
      };

      const action = { type: types.RESET_SELECTED_ROOM };
      const state = reducer(stateWithRoom, action);

      expect(state.selectedRoom).toEqual({ name: 'Welcom', id: 'welcome' });
    });
  });

  describe('UPDATE_SEARCH_INPUTS', () => {
    it('should update search value', () => {
      const action = {
        type: types.UPDATE_SEARCH_INPUTS,
        payload: 'test search query',
      };

      const state = reducer(initialState, action);

      expect(state.search).toBe('test search query');
    });

    it('should clear search value', () => {
      const stateWithSearch = {
        ...initialState,
        search: 'previous search',
      };

      const action = {
        type: types.UPDATE_SEARCH_INPUTS,
        payload: null,
      };

      const state = reducer(stateWithSearch, action);

      expect(state.search).toBeNull();
    });
  });

  describe('EVENT_SETTINGS actions', () => {
    it('should handle EVENT_SETTINGS_GET_START', () => {
      const action = { type: types.EVENT_SETTINGS_GET_START };
      const state = reducer(initialState, action);

      expect(state.eventSettingsProgress).toBe(true);
    });

    it('should handle EVENT_SETTINGS_GET_FAILED', () => {
      const action = { type: types.EVENT_SETTINGS_GET_FAILED };
      const state = reducer({ ...initialState, eventSettingsProgress: true }, action);

      expect(state.eventSettingsProgress).toBe(false);
    });

    it('should handle EVENT_SETTINGS_GET_COMPLETED', () => {
      const eventSettings = { id: 1, settings: { option: 'value' } };
      const action = {
        type: types.EVENT_SETTINGS_GET_COMPLETED,
        payload: eventSettings,
      };

      const state = reducer(initialState, action);

      expect(state.eventSettingsProgress).toBe(false);
      expect(state.eventSettings).toEqual(eventSettings);
    });
  });

  describe('INVITE_MEMBER actions', () => {
    it('should handle INVITE_MEMBER_START', () => {
      const action = { type: types.INVITE_MEMBER_START };
      const state = reducer(initialState, action);

      expect(state.invitePorgress).toBe(true);
    });

    it('should handle INVITE_MEMBER_COMPLETED', () => {
      const action = { type: types.INVITE_MEMBER_COMPLETED };
      const state = reducer({ ...initialState, invitePorgress: true }, action);

      expect(state.invitePorgress).toBe(false);
    });

    it('should handle INVITE_MEMBER_FAILED', () => {
      const action = { type: types.INVITE_MEMBER_FAILED };
      const state = reducer({ ...initialState, invitePorgress: true }, action);

      expect(state.invitePorgress).toBe(false);
    });
  });

  describe('CREATE_POST actions', () => {
    it('should handle CREATE_POST_START', () => {
      const action = { type: types.CREATE_POST_START };
      const state = reducer(initialState, action);

      expect(state.postCreateProgress).toBe(true);
    });

    it('should handle CREATE_POST_COMPLETED', () => {
      const action = { type: types.CREATE_POST_COMPLETED };
      const state = reducer({ ...initialState, postCreateProgress: true }, action);

      expect(state.postCreateProgress).toBe(false);
    });

    it('should handle CREATE_POST_FAILED', () => {
      const action = { type: types.CREATE_POST_FAILED };
      const state = reducer({ ...initialState, postCreateProgress: true }, action);

      expect(state.postCreateProgress).toBe(false);
    });
  });

  describe('GET_MEMBERS_PAGE_INFORMATION actions', () => {
    it('should handle GET_MEMBERS_PAGE_INFORMATION_START', () => {
      const action = { type: types.GET_MEMBERS_PAGE_INFORMATION_START };
      const state = reducer(initialState, action);

      expect(state.membersPageProgress).toBe(true);
    });

    it('should handle GET_MEMBERS_PAGE_INFORMATION_COMPLETED', () => {
      const membersData = { members: [], count: 0 };
      const action = {
        type: types.GET_MEMBERS_PAGE_INFORMATION_COMPLETED,
        payload: membersData,
      };

      const state = reducer(initialState, action);

      expect(state.membersPageProgress).toBe(false);
      expect(state.membersPage).toEqual(membersData);
    });
  });

  describe('GET_MESSAGES actions', () => {
    it('should handle GET_MESSAGES_START', () => {
      const action = { type: types.GET_MESSAGES_START };
      const state = reducer(initialState, action);

      expect(state.loadingMessages).toBe(true);
    });

    it('should handle GET_MESSAGES_COMPLETED', () => {
      const messages = [{ id: 1, text: 'Hello' }, { id: 2, text: 'World' }];
      const action = {
        type: types.GET_MESSAGES_COMPLETED,
        payload: messages,
      };

      const state = reducer(initialState, action);

      expect(state.loadingMessages).toBe(false);
      expect(state.messages).toEqual(messages);
      expect(state.initialMessagesCount).toBe(2);
    });

    it('should handle GET_MESSAGES_FAILED', () => {
      const action = { type: types.GET_MESSAGES_FAILED };
      const state = reducer({ ...initialState, loadingMessages: true }, action);

      expect(state.loadingMessages).toBe(false);
    });
  });
});
