import { getMemberRole, getMemberSuspendedStatus } from 'utils/getMemberRoleCommunity';
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';
import { TOGGLE_COMMENT_SHOW_COMPLETED } from '../designCourse/edit/types';

const reducersMap = {
   [types.GET_COMMUNITY_START]: (state) => {
      return {
         ...state,
         progress: true,
      };
   },
   [types.GET_COMMUNITY_END]: (state) => {
      return {
         ...state,
         progress: false,
      };
   },
   [types.GET_COMMUNITY_COMPLETED]: (state, action) => {
      return {
         ...state,
         progress: false,
         community: {
            ...action.payload.data,
            userSuspended: getMemberSuspendedStatus(action.payload.data.community_member, action.payload.userId), 
         },
         role: getMemberRole(action.payload.data.community_member, action.payload.userId),
         
      };
   },
   [types.CREATE_ROOM_START]: (state) => {
      return {
         ...state,
         roomProgress: true,
      };
   },
   [types.CREATE_ROOM_END]: (state) => {
      return {
         ...state,
         roomProgress: false,
      };
   },
   [types.CREATE_ROOM_COMPLETED]: (state) => {
      return {
         ...state,
         roomProgress: false,
      };
   },
   [types.DELETE_ROOM_START]: (state) => {
      return {
         ...state,
         roomProgress: false,
      };
   },
   [types.DELETE_ROOM_FAILED]: (state) => {
      return {
         ...state,
         roomProgress: false,
      };
   },
   [types.DELETE_ROOM_COMPLETED]: (state, action) => {
      const newCommunity = state.community.rooms.filter((room) => room.id !== action.payload);
      return {
         ...state,
         roomProgress: false,
         selectedRoom: { name: 'Welcom', id: 'welcome' },
         selectedEvent: null,
         community: {
            ...state.community,
            rooms: newCommunity,
         },
      };
   },
   [types.CREATE_EVENT_START]: (state) => {
      return {
         ...state,
         eventProgress: true,
      };
   },
   [types.CREATE_EVENT_END]: (state) => {
      return {
         ...state,
         eventProgress: false,
      };
   },
   [types.CREATE_EVENT_COMPLETED]: (state, action) => {
      const { data } = action.payload;
      state.community.events.push(data);
      return {
         ...state,
         eventProgress: false,
      };
   },
   [types.EVENT_CHANGES_START]: (state) => {
      return {
         ...state,
         eventProgress: true,
      };
   },
   [types.EVENT_CHANGES_END]: (state) => {
      return {
         ...state,
         eventProgress: false,
      };
   },
   [types.EVENT_PIN_OR_UNPIN_COMPLETED]: (state, action) => {
      const { eventId, num } = action.payload;
      const newEvents = state.selectedRoom.events.map((ev) => {
         if (ev.id === eventId) {
            return {
               ...ev,
               pinned: num,
            };
         }
         return ev;
      });
      if (state.selectedEvent && state.selectedEvent.id === eventId) {
         return {
            ...state,
            eventProgress: false,
            selectedRoom: {
               ...state.selectedRoom,
               events: newEvents.sort((a, b) => b.pinned - a.pinned),
            },
            selectedEvent: {
               ...state.selectedEvent,
               pinned: num,
            },
         };
      }
      return {
         ...state,
         eventProgress: false,
         selectedRoom: {
            ...state.selectedRoom,
            events: newEvents.sort((a, b) => b.pinned - a.pinned),
         },
      };
   },


   [types.POST_CHANGES_START]: (state) => {
      return {
         ...state,
         eventProgress: true,
      };
   },
   [types.POST_CHANGES_END]: (state) => {
      return {
         ...state,
         eventProgress: false,
      };
   },
   [types.POST_PIN_OR_UNPIN_COMPLETED]: (state, action) => {
      const { postId, num } = action.payload;
      const newPosts = state.selectedRoom.posts.map((ev) => {
         if (ev.id === postId) {
            return {
               ...ev,
               is_pinned: num,
            };
         }
         return ev; 
      });
      return {
         ...state,
         eventProgress: false,
         selectedRoom: {
            ...state.selectedRoom,
            posts: newPosts,
         },
      };
   },

   [types.ARCHIVE_EVENT_COMPLETED]: (state, action) => {
      const ids = action.payload;
      const newEvents = state.community.events.filter((ev) => ev.id !== ids[0]);
      return {
         ...state,
         eventProgress: false,
         community: {
            ...state.community,
            events: newEvents,
         },
      };
   },
   [types.GET_ROOM_START]: (state) => {
      return {
         ...state,
         isFetchingRoom: true,
      };
   },
   [types.GET_ROOM_COMPLETED]: (state, action) => {
      if (action.payload.rooms.type === 'posts') {
         return {
            ...state,
            isFetchingRoom: false,
            selectedEvent: null,
            selectedRoom: action.payload.rooms,
            initialPostsLength: action.payload.rooms.posts.length,
            search: null,
         };
      }
      return {
         ...state,
         isFetchingRoom: false,
         selectedRoom: action.payload.rooms,
         selectedEvent: null,
         initialEventsLength: action.payload.rooms.events.length,
         initialEvents: action.payload.rooms.events,
         locationCounts: {
            local: action.payload.location_type.local,
            tbd: action.payload.location_type.tbd,
            virtual: action.payload.location_type.virtual,
         },
         accessCounts: {
            open: action.payload.access_count.open,
            private: action.payload.access_count.private,
            secret: action.payload.access_count.secret_counts,
         },
         search: null,
      };
   },
   [types.GET_ROOM_FAILED]: (state) => {
      return {
         ...state,
         isFetchingRoom: false,
         selectedRoom: { name: 'Welcom', id: 'welcome' },
      };
   },
   [types.CHANGE_SORT_OPTIONS]: (state, action) => {
      return {
         ...state,
         sortingOptions: {
            ...state.sortingOptions,
            ...action.payload,
         },
      };
   },
   [types.SELECT_EVENT_VIEW]: (state, action) => {
      return {
         ...state,
         selectedEvent: action.payload,
      };
   },
   [types.FILTER_ROOM_START]: (state) => {
      return {
         ...state,
         isFetchingRoom: true,
      };
   },
   [types.FILTER_ROOM_COMPLETED]: (state, action) => {
      if (action.payload.rooms.type === 'posts') {
         return {
            ...state,
            isFetchingRoom: false,
            selectedEvent: null,
            selectedRoom: action.payload.rooms,
         };
      }
      return {
         ...state,
         isFetchingRoom: false,
         selectedRoom: action.payload.rooms,
         selectedEvent: null,
         locationCounts: {
            local: action.payload.location_type.local,
            tbd: action.payload.location_type.tbd,
            virtual: action.payload.location_type.virtual,
         },
         accessCounts: {
            open: action.payload.access_count.open,
            private: action.payload.access_count.private,
            secret: action.payload.access_count.secret_counts,
         },
      };
   },
   [types.FILTER_ROOM_FAILED]: (state) => {
      return {
         ...state,
         isFetchingRoom: false,
         selectedRoom: { name: 'Welcom', id: 'welcome' },
      };
   },
   [types.EVENT_SETTINGS_GET_START]: (state) => {
      return {
         ...state,
         eventSettingsProgress: true,
      };
   },
   [types.EVENT_SETTINGS_GET_FAILED]: (state) => {
      return {
         ...state,
         eventSettingsProgress: false,
      };
   },
   [types.EVENT_SETTINGS_GET_COMPLETED]: (state, action) => {
      return {
         ...state,
         eventSettingsProgress: false,
         eventSettings: action.payload,
      };
   },
   [types.EVENT_SETTINGS_PUT_START]: (state) => {
      return {
         ...state,
         eventSettingsProgress: true,
      };
   },
   [types.EVENT_SETTINGS_PUT_FAILED]: (state) => {
      return {
         ...state,
         eventSettingsProgress: false,
      };
   },
   [types.EVENT_SETTINGS_PUT_COMPLETED]: (state, action) => {
      const events = state.community.events.map(ev => {
         if (ev.id === action.payload.id) {
            if (action.payload.picture_src) {
               return {
                  ...ev,
                  ...action.payload, 
                  files: { ...action.payload.files, src: action.payload.picture_src }, 
               }; 
            }
            return {
               ...ev,
               ...action.payload, 
            }; 
         }
         return ev; 
      });

      return {
         ...state,
         eventSettingsProgress: false,
         community: {
            ...state.community,
            events,
         },
         // eventSettings: {
         //    ...state.eventSettings,
         //    ...action.payload,
         // },
      };
   },
   [types.CREATE_POST_START]: (state) => {
      return {
         ...state,
         postCreateProgress: true,
      };
   },
   [types.CREATE_POST_FAILED]: (state) => {
      return {
         ...state,
         postCreateProgress: false,
      };
   },
   [types.CREATE_POST_COMPLETED]: (state) => {
      return {
         ...state,
         postCreateProgress: false,
      };
   },
   [types.INVITE_MEMBER_START]: (state) => {
      return {
         ...state,
         invitePorgress: true,
      };
   },
   [types.INVITE_MEMBER_COMPLETED]: (state) => {
      return {
         ...state,
         invitePorgress: false,
      };
   },
   [types.INVITE_MEMBER_FAILED]: (state) => {
      return {
         ...state,
         invitePorgress: false,
      };
   },
   [types.POST_COMMENT_COMPLETED]: (state, action) => {
      const { postId, comment } = action.payload;
      const filteredSelectedRoom = {
         ...state.selectedRoom,
      };
      filteredSelectedRoom.posts = state.selectedRoom.posts.map((p) => {
         if (p.id === postId) {
            return {
               ...p,
               comments: [
                  ...(p.comments || []),
                  comment,
               ],
            };
         }
         return p;
      });
      return {
         ...state,
         selectedRoom: filteredSelectedRoom,
      };
   },
   [types.EVENT_COMMENT_COMPLETED]: (state, action) => {
      const { eventId, comment } = action.payload;
      const filteredSelectedRoom = {
         ...state.selectedRoom,
      };
      filteredSelectedRoom.events = state.selectedRoom.events.map((e) => {
         if (e.id === eventId) {
            return {
               ...e,
               comments: [
                  ...(e.comments || []),
                  comment,
               ],
            };
         }
         return e;
      });
      return {
         ...state,
         selectedRoom: filteredSelectedRoom,
      };
   },
   [types.POST_REPLY_COMMENT_COMPLETED]: (state, action) => {
      const { postId, commentId, replyComment } = action.payload;
      const filteredSelectedRoom = {
         ...state.selectedRoom,
      };
      filteredSelectedRoom.posts = state.selectedRoom.posts.map((p) => {
         if (p.id === postId) {
            const toReturnComments = p.comments.map((i) => {
               if (i.id === commentId) {
                  return {
                     ...i,
                     childs: [
                        ...i.childs,
                        replyComment,
                     ],
                  };
               }
               return i;
            });
            return {
               ...p,
               comments: toReturnComments,
            };
         }
         return p;
      });
      return {
         ...state,
         selectedRoom: filteredSelectedRoom,
      };
   },
   [types.EVENT_REPLY_COMMENT_COMPLETED]: (state, action) => {
      const { eventId, commentId, replyComment } = action.payload;
      const filteredSelectedRoom = {
         ...state.selectedRoom,
      };
      filteredSelectedRoom.events = state.selectedRoom.events.map((e) => {
         if (e.id === eventId) {
            const toReturnComments = e.comments.map((i) => {
               if (i.id === commentId) {
                  return {
                     ...i,
                     childs: [
                        ...i.childs || [],
                        replyComment,
                     ],
                  };
               }
               return i;
            });
            return {
               ...e,
               comments: toReturnComments,
            };
         }
         return e;
      });
      return {
         ...state,
         selectedRoom: filteredSelectedRoom,
      };
   },
   [types.POST_LIKE_COMPLETED]: (state, action) => {
      const { postId, data } = action.payload;
      const newPosts = {
         ...state.selectedRoom,
      };
      newPosts.posts = state.selectedRoom.posts.map((p) => {
         if (p.id === postId) {
            if (p.liked) {
               return {
                  ...p,
                  liked: false,
                  likes: p.likes.slice(2, p.likes.length - 1),
               };
            }
            return {
               ...p,
               liked: true,
               likes: [
                  ...p.likes,
                  data,
               ],
            };
         }
         return p;
      });
      return {
         ...state,
         selectedRoom: newPosts,
      };
   },
   [types.POST_COMMENT_LIKE_COMPLETED]: (state, action) => {
      const { postId, commentId, parentId } = action.payload;
      const newRoom = { ...state.selectedRoom };
      newRoom.posts = newRoom.posts.map((i) => {
         if (i.id === postId) {
            const newPost = i.comments.map((e) => {
               if (parentId) {
                  if (e.id === parentId) {
                     return {
                        ...e,
                        childs: e.childs.map(child => {
                           if (child.id === commentId) {
                              return {
                                 ...child,
                                 liked_user: !child.liked_user,
                              };
                           }
                           return {
                              ...child,
                           };
                        }),
                     };
                  }
                  return e;
               }

               if (e.id === commentId) {
                  return {
                     ...e,
                     liked_user: !e.liked_user,
                  };
               }
               return e;
            });
            return {
               ...i,
               comments: newPost,
            };
         }
         return i;
      });
      return {
         ...state,
         selectedRoom: newRoom,
      };
   },
   [types.EVENT_COMMENT_LIKE_COMPLETED]: (state, action) => {
      const { eventId, commentId, parentId } = action.payload;
      const newRoom = { ...state.selectedRoom };
      newRoom.events = newRoom.events.map((i) => {
         if (i.id === eventId) {
            const newPost = i.comments.map((e) => {
               if (parentId) {
                  if (e.id === parentId) {
                     return {
                        ...e,
                        childs: e.childs.map(child => {
                           if (child.id === commentId) {
                              return {
                                 ...child,
                                 liked_user: !child.liked_user,
                              };
                           }
                           return {
                              ...child,
                           };
                        }),
                     };
                  }
                  return e;
               }
               if (e.id === commentId) {
                  return {
                     ...e,
                     liked_user: !e.liked_user,
                  };
               }
               return e;
            });
            return {
               ...i,
               comments: newPost,
            };
         }
         return i;
      });
      return {
         ...state,
         selectedRoom: newRoom,
      };
   },
   [types.POST_EXTERNAL_LINK_CREATE_COMPLETED]: (state, action) => {
      const newGroups = state.community.room_groups;
      newGroups[2].external_source = [
         ...newGroups[2].external_source,
         action.payload,
      ];
      return {
         ...state,
         community: {
            ...state.community,
            room_groups: newGroups,
         },
      };
   },
   [types.POST_EXTERNAL_LINK_DELETE_COMPLETED]: (state, action) => {
      const newGroups = state.community.room_groups;
      newGroups[2].external_source = newGroups[2].external_source.filter((e) => e.id !== action.payload);
      return {
         ...state,
         community: {
            ...state.community,
            room_groups: newGroups,
         },
      };
   },
   [types.EMAIL_NOTIFICATIONS_CHANGES_COMPLETED]: (state, action) => {
      return {
         ...state,
         selectedRoom: {
            ...state.selectedRoom,
            ...action.payload,
         },
      };
   },
   [types.COMMUNITY_SETTINGS_COMPLETED]: (state, action) => {
      const { parentKey, inputs, courses = [] } = action.payload;
      return {
         ...state,
         community: {
            ...state.community,
            community_settings: {
               ...state.community.community_settings,
               [parentKey]: inputs,
            },
            community_courses: inputs.community.course_id.map(id => courses.find(course => course.id === id)),
         },
      };
   },
   [types.USER_VOTE_COMPLETED]: (state, action) => {
      const newPosts = state.selectedRoom.posts.map((e) => {
         if (e.id === action.payload.postId) {
            const newPolls = e.posts_poll.map((i) => {
               if (i.id === action.payload.pollId) {
                  return action.payload.data;
               }
               return i;
            });
            return {
               ...e,
               posts_poll: newPolls,
            };
         }
         return e;
      });
      return {
         ...state,
         selectedRoom: {
            ...state.selectedRoom,
            posts: newPosts,
         },
      };
   },
   [types.USER_GET_START]: (state) => {
      return {
         ...state,
         memberProgress: true,
      };
   },
   [types.USER_GET_COMPLETED]: (state, action) => {
      return {
         ...state,
         member: action.payload,
         memberProgress: false,
      };
   },
   [types.USER_SUBSCRIBE_COMPLETED]: (state, action) => {
      return {
         ...state,
         member: action.payload,
      };
   },
   [types.GET_MEMBERS_PAGE_INFORMATION_START]: (state) => {
      return {
         ...state,
         membersPageProgress: true,
      };
   },
   [types.GET_MEMBERS_PAGE_INFORMATION_COMPLETED]: (state, action) => {
      const community = action.payload.community || state.community;
      return {
         ...state,
         membersPageProgress: false,
         community,
         membersPage: {
            ...state.membersPage,
            ...action.payload,
         },
         role: getMemberRole(community.community_member, community.user_id),
      };
   },
   [types.MEMBERS_LIST_SUBSCRIBE_COMPLETED]: (state, action) => {
      const { payload: user } = action;
      const newList = state.membersPage.members.data.map((e) => {
         if (e.id === user.id) {
            return user;
         }
         return e;
      });
      return {
         ...state,
         membersPage: {
            ...state.membersPage,
            members: {
               ...state.membersPage.members,
               data: newList,
            },
         },
      };
   },
   [types.MEMBERS_LIST_DELETE_COMPLETED]: (state, action) => {
      const { payload: id } = action;
      const newList = state.membersPage.members.data.filter((e) => e.id !== id);
      return {
         ...state,
         membersPage: {
            ...state.membersPage,
            members: {
               ...state.membersPage.members,
               data: newList,
            },
         },
      };
   },
   [types.NOTIFICATION_MARK_READ]: (state, action) => {
      const ids = action.payload;
      if (window.location.pathname.includes('calendar')) {
         const notifications = state.community.event_notifications.map((e) => {
            if (ids.includes(e.id)) {
               return {
                  ...e,
                  status: '1',
               };
            }
            return e;
         });
         return {
            ...state,
            community: {
               ...state.community,
               event_notifications: notifications,
            },
         };
      } 
      const notifications = state.selectedRoom.notifications.map((e) => {
         if (ids.includes(e.id)) {
            return {
               ...e,
               status: '1',
            };
         }
         return e;
      });
      return {
         ...state,
         selectedRoom: {
            ...state.selectedRoom,
            notifications,
         },
      };
   },
   [types.GET_MESSAGES_START]: (state) => {
      return {
         ...state,
         loadingMessages: true,
      };
   },
   [types.GET_MESSAGES_FAILED]: (state) => {
      return {
         ...state,
         loadingMessages: false,
      };
   },
   [types.GET_MESSAGES_COMPLETED]: (state, action) => {
      return {
         ...state,
         loadingMessages: false,
         messages: action.payload,
         initialMessagesCount: action.payload.length,
      };
   },
   [types.FILTER_MESSAGES_COMPLETED]: (state, action) => {
      return {
         ...state,
         messages: action.payload,
      };
   },
   [types.GET_MESSAGES_WITH_MEMBER_COMPLETED]: (state, action) => {
      return {
         ...state,
         messagesHistory: [...state.messagesHistory, action.payload],
      };
   },
   [types.UPDATE_MESSAGES_BY_SOCKET]: (state, action) => {
      return {
         ...state,
         messages: action.payload,
      };
   },
   [types.MESSENGER_CLEAR_CONVERSATION_COMPLETED]: (state, action) => {
      return {
         ...state,
         messages: state.messages.map((e) => {
            if (e.chat_room_id === action.payload) {
               return {
                  ...e,
                  last_message: {},
                  unread_messages_count: 0,
               };
            }
            return e;
         }),
      };
   },
   [types.UPDATE_UNREAD_MESSAGES_COUNT]: (state, action) => {
      return {
         ...state,
         community: {
            ...state.community,
            count_unread_messages: action.payload,
         },
      };
   },
   [types.UPDATE_SEARCH_INPUTS]: (state, action) => {
      return {
         ...state,
         search: action.payload,
      };
   },
   [types.POST_DELETE_COMPLETED]: (state, action) => {
      const {
         roomId, postId,
      } = action.payload;

      const filteredSelectedRoomPosts = state.selectedRoom.posts.filter(post => post.id !== postId);
      return {
         ...state,
         community: {
            ...state.community,
            rooms: state.community.rooms.map(room => {
               if (room.id === roomId) {
                  return {
                     ...room,
                     posts: room.posts.filter(post => post.id !== postId),
                  };
               }
               return room;
            }),
         },
         selectedRoom: {
            ...state.selectedRoom,
            posts: filteredSelectedRoomPosts,
         },
         initialPostsLength: filteredSelectedRoomPosts.length,
      };
   },
   [types.POST_COMMENT_DELETE_COMPLETED]: (state, action) => {
      const {
         postId, commentId, isReplay,
      } = action.payload;
      return {
         ...state,
         selectedRoom: {
            ...state.selectedRoom,
            posts: state.selectedRoom.posts.map(post => {
               if (post.id === postId) {
                  if (!isReplay) {
                     return {
                        ...post,
                        comments: post.comments.filter(com => com.id !== commentId),
                     };
                  }
                  return {
                     ...post,
                     comments: post.comments.map(com => ({
                        ...com,
                        childs: com.childs.filter(child => child.id !== commentId),
                     })),
                  };
               }
               return post;
            }),
         },
      };
   },
   [types.EVENT_COMMENT_DELETE_COMPLETED]: (state, action) => {
      const {
         eventId, commentId, isReplay,
      } = action.payload;
      return {
         ...state,
         selectedRoom: {
            ...state.selectedRoom,
            events: state.selectedRoom.events.map(event => {
               if (event.id === eventId) {
                  if (!isReplay) {
                     return {
                        ...event,
                        comments: event.comments.filter(com => com.id !== commentId),
                     };
                  }
                  return {
                     ...event,
                     comments: event.comments.map(com => ({
                        ...com,
                        childs: com.childs.filter(child => child.id !== commentId),
                     })),
                  };
               }
               return event;
            }),
         },
      };
   },
   [types.RESET_SELECTED_ROOM]: (state) => {
      return {
         ...state,
         selectedRoom: { name: 'Welcom', id: 'welcome' },
      };
   },

   [types.UPDATE_BANNER_START]: (state) => {
      return {
         ...state,
         bannerProgress: true,
      };
   },
   [types.UPDATE_BANNER_FAILED]: (state) => {
      return {
         ...state,
         bannerProgress: false,
      };
   },
   [types.UPDATE_BANNER_COMPLETED]: (state, action) => {
      const {
         bannerImage,
      } = action.payload;
      return {
         ...state,
         bannerProgress: false,
         community: {
            ...state.community,
            banner_image: bannerImage,
         }, 
      };
   },
   [types.CREATE_BRIDGE_START]: (state) => {
      return {
         ...state,
         progress: true,
      };
   },

   [types.CREATE_BRIDGE_FAILED]: (state) => {
      return {
         ...state,
         progress: false,
      };
   },

   [types.CREATE_BRIDGE_COMPLETED]: (state, action) => {
      const {
         data,
      } = action.payload;
      return {
         ...state,
         progress: false,
         community: {
            ...state.community,
            owner_course: {
               ...state.community.owner_course,
               bridge_page: data.inputs,
            },
         },
         
      };
   },

};

export default createReducer(initialState)(reducersMap);
