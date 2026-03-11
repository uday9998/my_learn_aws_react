import * as types from './types';

export const setInput = (key, value, isCustomField) => ({
   type: types.SET_INPUT,
   payload: {
      key,
      value,
      isCustomField,
   },
});

export const getMembersStart = () => ({
   type: types.GET_MEMBERS_START,
});

export const getMembersCompleted = (data, tags) => ({
   type: types.GET_MEMBERS_COMPLETED,
   payload: {
      data,
      tags,
   },
});

export const getMembersFailed = (errors) => ({
   type: types.GET_MEMBERS_FAILED,
   payload: {
      errors,
   },
});

export const getCurrentMemberStart = () => ({
   type: types.GET_CURRENT_MEMBER_START,
});

export const getCurrentMemberCompleted = (data) => ({
   type: types.GET_CURRENT_MEMBER_COMPLETED,
   payload: {
      data,
   },
});

export const getCurrentMemberFailed = (errors) => ({
   type: types.GET_CURRENT_MEMBER_FAILED,
   payload: {
      errors,
   },
});

export const getMemberTransactionsStart = () => ({
   type: types.GET_MEMBER_TRANSACTION_START,
});

export const getMemberTransactionsCompleted = (data) => ({
   type: types.GET_MEMBER_TRANSACTION_COMPLETED,
   payload: {
      data,
   },
});

export const getMemberTransactionsFailed = (errors) => ({
   type: types.GET_MEMBER_TRANSACTION_FAILED,
   payload: {
      errors,
   },
});

export const getMemberNotesStart = () => ({
   type: types.GET_MEMBER_NOTES_START,
});

export const getMemberNotesCompleted = (data) => ({
   type: types.GET_MEMBER_NOTES_COMPLETED,
   payload: {
      data,
   },
});

export const getMemberNotesFailed = (errors) => ({
   type: types.GET_MEMBER_NOTES_FAILED,
   payload: {
      errors,
   },
});

export const putCurrentMemberStart = () => ({
   type: types.PUT_CURRENT_MEMBER_START,
});

export const putCurrentMemberCompleted = (id, inputs) => ({
   type: types.PUT_CURRENT_MEMBER_COMPLETED,
   payload: {
      id,
      inputs,
   },
});

export const putCurrentMemberFailed = (errors) => ({
   type: types.PUT_CURRENT_MEMBER_FAILED,
   payload: {
      errors,
   },
});

export const sendPasswordStart = () => ({
   type: types.SEND_PASSWORD_START,
});

export const sendPasswordCompleted = () => ({
   type: types.SEND_PASSWORD_COMPLETED,
});

export const sendPasswordFailed = (errors) => ({
   type: types.SEND_PASSWORD_FAILED,
   payload: {
      errors,
   },
});

export const createNoteStart = () => ({
   type: types.CREATE_NOTE_START,
});

export const createNoteCompleted = (data) => ({
   type: types.CREATE_NOTE_COMPLETED,
   payload: {
      data,
   },
});

export const createNoteFailed = (errors) => ({
   type: types.CREATE_NOTE_FAILED,
   payload: {
      errors,
   },
});

export const deleteNoteStart = () => ({
   type: types.DELETE_NOTE_START,
});

export const deleteNoteCompleted = (id) => ({
   type: types.DELETE_NOTE_COMPLETED,
   payload: {
      id,
   },
});

export const deleteNoteFailed = (errors) => ({
   type: types.DELETE_NOTE_FAILED,
   payload: {
      errors,
   },
});

export const getTagsStart = () => ({
   type: types.GET_TAGS_START,
});

export const getTagsCompleted = (data) => ({
   type: types.GET_TAGS_COMPLETED,
   payload: {
      data,
   },
});

export const getTagsFailed = (errors) => ({
   type: types.GET_TAGS_FAILED,
   payload: {
      errors,
   },
});

export const addTagStart = () => ({
   type: types.ADD_TAG_START,
});

export const addTagCompleted = (data) => ({
   type: types.ADD_TAG_COMPLETED,
   payload: {
      data,
   },
});

export const detachTagCompleted = (data) => ({
   type: types.DETACH_TAG_COMPLETED,
   payload: {
      data,
   },
});

export const atachTagCompleted = (data) => ({
   type: types.ATACH_TAG_COMPLETED,
   payload: {
      data,
   },
});

export const addTagFailed = (errors) => ({
   type: types.ADD_TAG_FAILED,
   payload: {
      errors,
   },
});

export const searchMemberStart = () => ({
   type: types.SEARCH_MEMBER_START,
});

export const searchMemberCompleted = (data) => ({
   type: types.SEARCH_MEMBER_COMPLETED,
   payload: {
      data,
   },
});

export const searchMemberFailed = (errors) => ({
   type: types.SEARCH_MEMBER_FAILED,
   payload: {
      errors,
   },
});

export const addMemberStart = () => ({
   type: types.ADD_MEMBER_START,
});

export const addMemberCompleted = (data) => ({
   type: types.ADD_MEMBER_COMPLETED,
   payload: {
      data,
   },
});

export const addMemberFailed = (errors, inputs) => ({
   type: types.ADD_MEMBER_FAILED,
   payload: {
      errors,
      memberFieldValues: inputs,
   },
});


export const pauseCurrentMemberCourseStart = () => ({
   type: types.PAUSE_COURSE_START,
});

export const pauseCurrentMemberCourseCompleted = (memeberId, courseId) => ({
   type: types.PAUSE_COURSE_COMPLETED,
   payload: {
      courseId,
   },
});

export const pauseCurrentMemberCourseFailed = (errors) => ({
   type: types.PAUSE_COURSE_FAILED,
   payload: {
      errors,
   },
});


export const deleteCurrentMemberCourseStart = () => ({
   type: types.DELETE_COURSE_START,
});

export const deleteCurrentMemberCourseCompleted = (memeberId, courseId) => ({
   type: types.DELETE_COURSE_COMPLETED,
   payload: {
      courseId,
   },
});

export const deleteCurrentMemberCourseFailed = (errors) => ({
   type: types.DELETE_COURSE_FAILED,
   payload: {
      errors,
   },
});


export const deleteMemberStart = () => ({
   type: types.DELETE_MEMBER_START,
});

export const deleteMemberCompleted = (id, isFiltered) => ({
   type: types.DELETE_MEMBER_COMPLETED,
   payload: {
      id,
      isFiltered,
   },
});

export const deleteMemberFailed = (errors) => ({
   type: types.DELETE_MEMBER_FAILED,
   payload: {
      errors,
   },
});

export const setFilterOptions = (courses) => ({
   type: types.CHOOSE_COURSES_OPTIONS,
   payload: { courses },
});


export const addFilterOption = (option) => ({
   type: types.ADD_FILTER_OPTION,
   payload: { option },
});

export const removeFilterOption = (option) => ({
   type: types.REMOVE_FILTER_OPTION,
   payload: { option },
});
export const unsubscribeEmailStart = () => ({
   type: types.UNSUBSCRIBE_EMAIL_START,
});

export const unsubscribeEmailCompleted = () => ({
   type: types.UNSUBSCRIBE_EMAIL_COMPLETED,
});

export const unsubscribeEmailFailed = () => ({
   type: types.CHANGE_PAGE_FAILED,
});

export const changeMembersPageStart = () => ({
   type: types.CHANGE_PAGE_START,
});

export const changeMembersPageCompleted = (data) => ({
   type: types.CHANGE_PAGE_COMPLETED,
   payload: data,
});

export const changeMembersPageFailed = () => ({
   type: types.CHANGE_PAGE_FAILED,
});


export const chooseNoteAction = (id) => {
   return {
      type: types.CHOOSE_NOTE,
      payload: {
         id,
      },
   };
};

export const setNoteInputAction = (key, value) => ({
   type: types.SET_NOTE_INPUT,
   payload: {
      key,
      value,
   },
});

export const updateNoteStart = () => ({
   type: types.UPDATE_NOTE_START,
});

export const updateNoteCompleted = (id, inputs) => ({
   type: types.UPDATE_NOTE_COMPLETED,
   payload: {
      id,
      inputs,
   },
});

export const updateNoteFailed = (errors) => ({
   type: types.UPDATE_NOTE_FAILED,
   payload: {
      errors,
   },
});


export const emptyCourseFilterAction = () => ({
   type: types.EMPTY_COURSE_FILTER,
});

export const updateCurrentMemberTags = (tags) => ({
   type: types.UPDATE_CURRENT_MEMBERS_TAGS,
   payload: { tags },
});

export const memberFilterStart = () => ({
   type: types.FILTER_MEMBER_START,
});

export const memberFilterCompleted = (data, sort) => ({
   type: types.FILTER_MEMBER_COMPLETED,
   payload: { data, sort },
});

export const memberFilterFailed = () => ({
   type: types.FILTER_MEMBER_FAILED,
});

export const clearCurrentMemberCompleted = () => ({
   type: types.CLEAR_CURRENT_MEMBER,
});

export const currentMemberAddCourseStart = () => ({
   type: types.ADD_CURREMT_MEMBER_COURSE_START,
});


export const currentMemberAddCourseCompleted = () => ({
   type: types.ADD_CURREMT_MEMBER_COURSE_COMPLETED,
});

export const currentMemberAddCourseFailed = () => ({
   type: types.ADD_CURREMT_MEMBER_COURSE_FAIL,
});

export const popupChangeStart = () => ({
   type: types.MEMBER_POPUP_CHANGE_START,
});


export const popupChangeFail = () => ({
   type: types.MEMBER_POPUP_CHANGE_FAIL,
});

export const popupChangeCompleted = (data) => ({
   type: types.MEMBER_POPUP_CHANGE_COMPLETED,
   payload: { data },
});

export const memberTransactionFilterCompleted = (data) => ({
   type: types.MEMBER_TRANSACTIONS_FILTER_COMPLETED,
   payload: data,
});

export const getMemberCommunityMoreInfoStart = () => ({
   type: types.GET_MEMBER_COMMUNITY_MORE_INFO_START,
});

export const getMemberCommunityMoreInfoFailed = () => ({
   type: types.GET_MEMBER_COMMUNITY_MORE_INFO_FAILED,
});

export const getMemberCommunityMoreInfoCompleted = (data) => ({
   type: types.GET_MEMBER_COMMUNITY_MORE_INFO_COMPLETED,
   payload: data,
});

export const resetCommunity = () => ({
   type: types.RESET_COMMUNITY,
});

export const deleteMembersCompleted = (ids) => ({
   type: types.BULK_DELETE_MEMBER_COMPLETED,
   payload: ids,
});
