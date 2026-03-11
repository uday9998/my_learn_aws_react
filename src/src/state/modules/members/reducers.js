/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value, isCustomField } } = action;
      if (isCustomField) {
         const fieldValues = state.currentMember.field_values;
         fieldValues[key].value = value;
         return {
            ...state,
            currentMember: {
               ...state.currentMember,
               field_values: fieldValues,
            },
         };
      }
      return {
         ...state,
         currentMember: {
            ...state.currentMember,
            [key]: value,
         },
      };
   },

   [types.UPDATE_CURRENT_MEMBERS_TAGS]: (state, action) => {
      const { payload: { tags } } = action;

      return {
         ...state,
         currentMember: {
            ...state.currentMember,
            tags,
         },
      };
   },


   [types.GET_MEMBERS_START]: (state) => {
      return {
         ...state,
         dataIsFetching: true,
      };
   },
   [types.GET_MEMBERS_COMPLETED]: (state, action) => {
      const { payload: { data, tags } } = action;
      // data = [];
      // tags = [];
      return {
         ...state,
         dataIsFetching: false,
         members: data,
         tags,
         selectedFilters: [],
         initialLength: data.data.filter((e) => !e.is_affiliate).length,
         defaultMemberId: (data && data.data && data.data[0] && data.data[0].id),
      };
   },
   [types.GET_MEMBERS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         dataIsFetching: false,
         errors,
      };
   },

   [types.EMPTY_COURSE_FILTER]: (state) => {
      return {
         ...state,
         selectedFilters: [],
      };
   },

   [types.GET_CURRENT_MEMBER_START]: (state) => {
      return {
         ...state,
         innerActionInProgress: true,
      };
   },
   [types.GET_CURRENT_MEMBER_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      let dataCourses = data.courses;
      if (typeof dataCourses === 'object'
      && dataCourses !== null
      && !Array.isArray(dataCourses)) {
         dataCourses = Object.values(dataCourses);
      }
      const courrentMemberCourses = dataCourses.map(course => course.name);
      return {
         ...state,
         innerActionInProgress: false,
         currentMember: { ...data, tags: data.tags ? data.tags.map((tag) => tag) : undefined },
         currentMemberInitialData: data,
         courses: dataCourses,
         lastLogin: data.last_login_at,
         selectedCommunity: null,
         selectedFilters: courrentMemberCourses,
      };
   },
   [types.GET_CURRENT_MEMBER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         innerActionInProgress: false,
         errors,
      };
   },

   [types.GET_MEMBER_TRANSACTION_START]: (state) => {
      return {
         ...state,
         transactionsInProgress: true,
      };
   },
   [types.GET_MEMBER_TRANSACTION_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         transactionsInProgress: false,
         memberTransactions: data,
      };
   },
   [types.GET_MEMBER_TRANSACTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         transactionsInProgress: false,
         errors,
      };
   },

   [types.GET_MEMBER_NOTES_START]: (state) => {
      return {
         ...state,
         notesInProgress: true,
      };
   },
   [types.GET_MEMBER_NOTES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         notesInProgress: false,
         memberNotes: data,
      };
   },
   [types.GET_MEMBER_NOTES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         notesInProgress: false,
         errors,
      };
   },

   [types.PUT_CURRENT_MEMBER_START]: (state) => {
      return {
         ...state,
         //  innerActionInProgress: true,
         addMemberInProgress: true,
      };
   },
   [types.PUT_CURRENT_MEMBER_COMPLETED]: (state, action) => {
      const { payload: { id, inputs } } = action;
      const updatedMembers = [...state.members.data];
      if (inputs.name) {
         const updatedMember = updatedMembers.filter(member => member.id === id);
         updatedMember[0].name = inputs.name;
      }

      return {
         ...state,
         //  innerActionInProgress: false,
         addMemberInProgress: false,
         members: {
            ...state.members,
            data: updatedMembers,
         },
      };
   },
   [types.PUT_CURRENT_MEMBER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         //  innerActionInProgress: false,
         addMemberInProgress: true,
         errors,
      };
   },
   [types.SEND_PASSWORD_START]: (state) => {
      return {
         ...state,
         popupChangesProgress: true,
         // innerActionInProgress: true,
      };
   },
   [types.SEND_PASSWORD_COMPLETED]: (state) => {
      return {
         ...state,
         popupChangesProgress: false,
         //  innerActionInProgress: false,
      };
   },
   [types.SEND_PASSWORD_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         popupChangesProgress: false,
         //  innerActionInProgress: false,
         errors,
      };
   },

   [types.CREATE_NOTE_START]: (state) => {
      return {
         ...state,
         noteActionProgress: true,
         showFullScreenLoader: true,
      };
   },
   [types.CREATE_NOTE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const notes = state.currentMember.notes || [];
      return {
         ...state,
         noteActionProgress: false,
         showFullScreenLoader: false,
         currentMember: {
            ...state.currentMember,
            notes: [
               { ...data },
               ...notes,
            ],
         },
      };
   },
   [types.CREATE_NOTE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         noteActionProgress: true,
         showFullScreenLoader: false,
         errors,
      };
   },
   [types.MEMBER_TRANSACTIONS_FILTER_COMPLETED]: (state, action) => {
      return {
         ...state,
         currentMember: action.payload,
         isFilterAction: false,
      };
   },
   [types.DELETE_NOTE_START]: (state) => {
      return {
         ...state,
         noteActionProgress: true,
      };
   },
   [types.DELETE_NOTE_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      let { notes: memberNotes } = state.currentMember;
      memberNotes = memberNotes.filter(noteElem => noteElem.id !== id);

      return {
         ...state,
         noteActionProgress: false,
         currentMember: {
            ...state.currentMember,
            notes: [
               ...memberNotes,
            ],
         },
      };
   },
   [types.DELETE_NOTE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         noteActionProgress: false,
         errors,
      };
   },

   [types.GET_TAGS_START]: (state) => {
      return {
         ...state,
         notesInProgress: true,
      };
   },
   [types.GET_TAGS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         notesInProgress: false,
         memberNotes: data,
      };
   },
   [types.GET_TAGS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         notesInProgress: false,
         errors,
      };
   },

   [types.ADD_TAG_START]: (state) => {
      return {
         ...state,
         tagsActionProgress: true,
      };
   },
   [types.ADD_TAG_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      if (state.currentMember.id) {
         return {
            ...state,
            tagsActionProgress: false,
            currentMember: {
               ...state.currentMember,
               tags: [
                  ...state.currentMember.tags,
                  data,
               ],
            },
            tags: [
               ...state.tags,
               data,
            ],
         };
      }
      return {
         ...state,
         tagsActionProgress: false,
         tags: [
            ...state.tags,
            data,
         ],
      };
   },
   [types.ADD_TAG_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         tagsActionProgress: false,
         errors,
      };
   },
   [types.DETACH_TAG_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         tagsActionProgress: false,
         currentMember: {
            ...state.currentMember,
            tags: state.currentMember.tags.filter((tag) => tag.id !== data.tagId),
         },
      };
   },
   [types.ATACH_TAG_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const { allTags } = state.currentMember;
      const attachedTag = allTags.filter((tag) => tag.id === data);
      return {
         ...state,
         tagsActionProgress: false,
         currentMember: {
            ...state.currentMember,
            tags: [...state.currentMember.tags, attachedTag[0]],
         },
      };
   },
   [types.SEARCH_MEMBER_START]: (state) => {
      return {
         ...state,
         dataIsFetching: true,
      };
   },
   [types.SEARCH_MEMBER_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         dataIsFetching: false,
         members: {
            ...data,
         },
         defaultMemberId: (data && data.data && data.data[0] && data.data[0].id),
      };
   },
   [types.FILTER_MEMBER_START]: (state) => {
      return {
         ...state,
         isFilterAction: true,
      };
   },
   [types.FILTER_MEMBER_FAILED]: (state) => {
      return {
         ...state,
         isFilterAction: false,
      };
   },
   [types.FILTER_MEMBER_COMPLETED]: (state, action) => {
      return {
         ...state,
         isFilterAction: false,
         sortedClassVersion: action.payload.sort,
         currentMember: {
            ...action.payload.data,
         },
      };
   },
   [types.CLEAR_CURRENT_MEMBER]: (state) => {
      return {
         ...state,
         currentMember: {},
      };
   },
   [types.SEARCH_MEMBER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         dataIsFetching: false,
         errors,
      };
   },

   [types.ADD_MEMBER_START]: (state) => {
      return {
         ...state,
         showFullScreenLoader: true,
      };
   },
   [types.ADD_MEMBER_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      let newMembers = [data];
      if (state.members.data) {
         newMembers = [data, ...state.members.data];
      }
      const defaultMemberId = newMembers[0].id;

      return {
         ...state,
         showFullScreenLoader: false,
         errors: null,
         members: {
            ...state.members,
            //  data: state.members.data ? [data, ...state.members.data] : [data],
            data: newMembers,
         },
         selectedFilters: [],
         initialLength: newMembers.filter((e) => !e.is_affiliate).length,
         defaultMemberId,
      };
   },
   [types.ADD_MEMBER_FAILED]: (state, action) => {
      const { payload: { errors, memberFieldValues } } = action;

      return {
         ...state,
         showFullScreenLoader: false,
         errors: {
            ...errors,
            memberFieldValues,
         },
         // selectedFilters: [],
      };
   },

   [types.PAUSE_COURSE_START]: (state) => {
      return {
         ...state,
         pauseCourseInProgress: false,
      };
   },

   [types.PAUSE_COURSE_COMPLETED]: (state, action) => {
      const { payload: { courseId } } = action;
      const courses = [...state.courses];
      const selectedCourse = courses.find(course => course.id === courseId);
      if (selectedCourse.pivot.status === 2) {
         selectedCourse.pivot.status = 1;
      } else {
         selectedCourse.pivot.status = 2;
      }
      return {
         ...state,
         pauseCourseInProgress: true,
         courses,
      };
   },

   [types.PAUSE_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         pauseCourseInProgress: true,
         errors,
      };
   },

   [types.DELETE_COURSE_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.DELETE_COURSE_COMPLETED]: (state, action) => {
      const { payload: { courseId } } = action;
      let courses = [...state.courses];
      courses = courses.filter(course => course.id !== courseId);
      return {
         ...state,
         pauseCourseInProgress: true,
         courses,
         currentMember: {
            ...state.currentMember,
            courses,
         },
      };
   },

   [types.DELETE_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
      };
   },

   [types.DELETE_MEMBER_START]: (state) => {
      return {
         ...state,
         dataIsFetching: true,
      };
   },

   [types.DELETE_MEMBER_COMPLETED]: (state, action) => {
      const { payload: { id, isFiltered } } = action;
      let members = [...state.members.data];
      members = members.filter(member => member.id !== id);
      const defaultMemberIdAfterDelete = members && members[0] && members[0].id;
      return {
         ...state,
         members: {
            ...state.members,
            data: [...members],
         },
         initialLength: members.filter((e) => !e.is_affiliate).length,
         defaultMemberId: defaultMemberIdAfterDelete,
         dataIsFetching: false,
         isEmptyByFilter: members.filter((e) => !e.is_affiliate).length === 0 && isFiltered,
      };
   },

   [types.BULK_DELETE_MEMBER_COMPLETED]: (state, action) => {
      let members = [...state.members.data];
      const ids = action.payload;
      members = members.filter(member => !ids.includes(member.id));
      const defaultMemberIdAfterDelete = members && members[0] && members[0].id;
      return {
         ...state,
         members: {
            ...state.members,
            data: [...members],
         },
         initialLength: members.filter((e) => !e.is_affiliate).length,
         defaultMemberId: defaultMemberIdAfterDelete,
         dataIsFetching: false,
      };
   },

   [types.DELETE_MEMBER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         dataIsFetching: false,
      };
   },

   [types.CHOOSE_COURSES_OPTIONS]: (state, action) => {
      const { payload: { courses } } = action;
      const coursesPublished = courses.filter(course => course.is_published === 1);
      return {
         ...state,
         chooseCourses: coursesPublished,
      };
   },

   [types.ADD_FILTER_OPTION]: (state, action) => {
      const { payload: { option } } = action;
      return {
         ...state,
         selectedFilters: [...state.selectedFilters, option],
      };
   },
   [types.REMOVE_FILTER_OPTION]: (state, action) => {
      const { payload: { option } } = action;
      const newSelectedFilters = state.selectedFilters.filter(filter => filter !== option);
      return {
         ...state,
         selectedFilters: newSelectedFilters,
      };
   },

   [types.UNSUBSCRIBE_EMAIL_START]: (state) => {
      return {
         ...state,
         isUnsubscribeEmail: false,
      };
   },

   [types.UNSUBSCRIBE_EMAIL_COMPLETED]: (state) => {
      return {
         ...state,
         isUnsubscribeEmail: true,
      };
   },

   [types.UNSUBSCRIBE_EMAIL_FAILED]: (state) => {
      return {
         ...state,
         isUnsubscribeEmail: false,
      };
   },
   [types.CHANGE_PAGE_START]: (state) => {
      return {
         ...state,
         isFetchingPagination: true,
      };
   },

   [types.CHANGE_PAGE_COMPLETED]: (state, action) => {
      return {
         ...state,
         members: action.payload,
         isFetchingPagination: false,
      };
   },

   [types.CHANGE_PAGE_FAILED]: (state) => {
      return {
         ...state,
         isFetchingPagination: false,
      };
   },

   [types.CHOOSE_NOTE]: (state, action) => {
      const { payload: { id } } = action;
      const currentNote = state.memberNotes.find(memberNote => memberNote.id === id);

      return {
         ...state,
         currentNote,
      };
   },

   [types.SET_NOTE_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;

      return {
         ...state,
         currentNote: {
            ...state.currentNote,
            [key]: value,
         },
      };
   },

   [types.UPDATE_NOTE_START]: (state) => {
      return {
         ...state,
         noteActionProgress: true,
      };
   },
   [types.UPDATE_NOTE_COMPLETED]: (state, action) => {
      const { payload: { id, inputs } } = action;
      const memberNotes = [...state.currentMember.notes];
      const updatedNotes = memberNotes.map((note) => {
         if (note.id === id) {
            return {
               ...note,
               title: inputs.title,
               description: inputs.description,
            };
         }
         return { ...note };
      });
      return {
         ...state,
         noteActionProgress: false,
         currentMember: {
            ...state.currentMember,
            notes: [
               ...updatedNotes,
            ],
         },
      };
   },
   [types.UPDATE_NOTE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         noteActionProgress: false,
         errors,
      };
   },
   [types.ADD_CURREMT_MEMBER_COURSE_START]: (state) => {
      return {
         ...state,
         addCourseInProgress: true,
      };
   },
   [types.ADD_CURREMT_MEMBER_COURSE_COMPLETED]: (state) => {
      return {
         ...state,
         addCourseInProgress: false,
      };
   },
   [types.ADD_CURREMT_MEMBER_COURSE_FAIL]: (state) => {
      return {
         ...state,
         addCourseInProgress: false,
      };
   },
   [types.MEMBER_POPUP_CHANGE_START]: (state) => {
      return {
         ...state,
         popupChangesProgress: true,
      };
   },
   [types.MEMBER_POPUP_CHANGE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         popupChangesProgress: false,
         currentMember: {
            ...state.currentMember,
            role: data,
         },
      };
   },
   [types.MEMBER_POPUP_CHANGE_FAIL]: (state) => {
      return {
         ...state,
         popupChangesProgress: false,
      };
   },
   [types.GET_MEMBER_COMMUNITY_MORE_INFO_START]: (state) => {
      return {
         ...state,
         isLoadingCommunity: true,
      };
   },
   [types.GET_MEMBER_COMMUNITY_MORE_INFO_FAILED]: (state) => {
      return {
         ...state,
         isLoadingCommunity: false,
      };
   },
   [types.GET_MEMBER_COMMUNITY_MORE_INFO_COMPLETED]: (state, action) => {
      return {
         ...state,
         selectedCommunity: action.payload,
         isLoadingCommunity: false,
      };
   },
   [types.RESET_COMMUNITY]: (state) => {
      return {
         ...state,
         selectedCommunity: null,
      };
   },
};

export default createReducer(initialState)(reducersMap);
