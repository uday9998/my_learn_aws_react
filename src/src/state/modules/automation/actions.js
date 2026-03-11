import * as types from './types';


export const getAllFrontCoursesStart = () => ({
   type: types.GET_COURSES_START,
});

export const getAllFrontCoursesCompleted = (data) => ({
   type: types.GET_COURSES_COMPLETED,
   payload: {
      data,
   },
});

export const getAllFrontCoursesFailed = (errors) => ({
   type: types.GET_COURSES_FAILED,
   payload: {
      errors,
   },
});

export const getAllSortedCoursesStart = () => ({
   type: types.GET_SORTED_COURSES_START,
});

export const getAllsortedCoursesCompleted = (data) => ({
   type: types.GET_SORTED_COURSES_COMPLETED,
   payload: {
      data,
   },
});

export const getAllsortedCoursesFailed = (errors) => ({
   type: types.GET_SORTED_COURSES_FAILED,
   payload: {
      errors,
   },
});

export const getAllCouponsStart = () => ({
   type: types.GET_ALLCOUPONS_START,
});

export const getAllCouponsCompleted = (data) => ({
   type: types.GET_ALLCOUPONS_COMPLETED,
   payload: {
      data,
   },
});

export const getAllCouponsFailed = (errors) => ({
   type: types.GET_ALLCOUPONS_FAILED,
   payload: {
      errors,
   },
});

export const getAllMembersStart = () => ({
   type: types.GET_ALLMEMBERS_START,
});

export const getAllMembersCompleted = (data) => ({
   type: types.GET_ALLMEMBERS_COMPLETED,
   payload: {
      data,
   },
});

export const getAllMembersFailed = (errors) => ({
   type: types.GET_ALLMEMBERS_FAILED,
   payload: {
      errors,
   },
});

export const getAllSortedMembersStart = () => ({
   type: types.GET_SORTED_ALL_MEMBERS_START,
});

export const getAllSortedMembersCompleted = (data) => ({
   type: types.GET_SORTED_ALL_MEMBERS_COMPLETED,
   payload: {
      data,
   },
});

export const getAllSortedMembersFailed = (errors) => ({
   type: types.GET_SORTED_ALL_MEMBERS_FAILED,
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

export const setInput = (key, value, target) => {
   return {
      type: types.SET_INPUT,
      payload: {
         key,
         value,
         target,
      },
   };
};

export const setConditionInput = (key, value, target) => {
   return {
      type: types.SET_CONDITION_INPUT,
      payload: {
         key,
         value,
         target,
      },
   };
};


export const getAutomationStart = () => ({
   type: types.GET_AUTOMATION_START,
});

export const getAutomationCompleted = (data) => ({
   type: types.GET_AUTOMATION_COMPLETED,
   payload: {
      data,
   },
});

export const getAutomationFailed = (errors) => ({
   type: types.GET_AUTOMATION_FAILED,
   payload: {
      errors,
   },
});

export const updateAutomationStart = () => ({
   type: types.UPDATE_AUTOMATION_START,
});

export const updateAutomationCompleted = (id, data) => ({
   type: types.UPDATE_AUTOMATION_COMPLETED,
   payload: {
      id,
      data,
   },
});

export const updateAutomationFailed = (errors) => ({
   type: types.UPDATE_AUTOMATION_FAILED,
   payload: {
      errors,
   },
});


export const getAutomationsStart = () => ({
   type: types.GET_AUTOMATIONS_START,
});

export const getAutomationsCompleted = (data, isDidMount) => ({
   type: types.GET_AUTOMATIONS_COMPLETED,
   payload: {
      data, isDidMount,
   },
});

export const getAutomationsFailed = (errors) => ({
   type: types.GET_AUTOMATIONS_FAILED,
   payload: {
      errors,
   },
});


export const deleteAutomationStart = () => ({
   type: types.DELETE_AUTOMATION_START,
});

export const deleteAutomationCompleted = (id) => ({
   type: types.DELETE_AUTOMATION_COMPLETED,
   payload: {
      id,
   },
});

export const deleteAutomationFailed = (errors) => ({
   type: types.DELETE_AUTOMATION_FAILED,
   payload: {
      errors,
   },
});

export const addTriggerStart = () => ({
   type: types.ADD_TRIGGER_START,
});

export const addTriggerCompleted = (data) => ({
   type: types.ADD_TRIGGER_COMPLETED,
   payload: {
      data,
   },
});

export const addTriggerFailed = (errors) => ({
   type: types.ADD_TRIGGER_FAILED,
   payload: {
      errors,
   },
});


export const saveTriggerStart = () => ({
   type: types.SAVE_TRIGGER_START,
});

export const saveTriggerCompleted = (id, data) => ({
   type: types.SAVE_TRIGGER_COMPLETED,
   payload: {
      id,
      data,
   },
});

export const saveTriggerFailed = (errors) => ({
   type: types.SAVE_TRIGGER_FAILED,
   payload: {
      errors,
   },
});

export const chooseTrigger = (id) => ({
   type: types.CHOOSE_TRIGGER,
   payload: {
      id,
   },
});

export const chooseAction = (id, actionId) => ({
   type: types.CHOOSE_ACTION,
   payload: {
      id,
      actionId,
   },
});


export const addActionStart = () => ({
   type: types.ADD_ACTION_START,
});

export const addActionCompleted = (data, actionIndex) => ({
   type: types.ADD_ACTION_COMPLETED,
   payload: {
      data,
      actionIndex,
   },
});

export const addActionFailed = (errors) => ({
   type: types.DELETE_ACTION_FAILED,
   payload: {
      errors,
   },
});

export const deleteActionStart = () => ({
   type: types.DELETE_ACTION_START,
});

export const deleteActionCompleted = (actionId) => ({
   type: types.DELETE_ACTION_COMPLETED,
   payload: {
      actionId,
   },
});

export const deleteActionFailed = (errors) => ({
   type: types.DELETE_TRIGGER_FAILED,
   payload: {
      errors,
   },
});

export const deleteTriggerStart = () => ({
   type: types.DELETE_TRIGGER_START,
});

export const deleteTriggerCompleted = (triggerId) => ({
   type: types.DELETE_TRIGGER_COMPLETED,
   payload: {
      triggerId,
   },
});

export const deleteTriggerFailed = (errors) => ({
   type: types.DELETE_TRIGGER_FAILED,
   payload: {
      errors,
   },
});


export const saveActionStart = () => ({
   type: types.SAVE_ACTION_START,
});

export const saveActionCompleted = (id, data, actionId, actionIndex, newAction) => ({
   type: types.SAVE_ACTION_COMPLETED,
   payload: {
      id,
      data,
      actionId,
      actionIndex,
      newAction,
   },
});

export const saveActionFailed = (errors) => ({
   type: types.SAVE_ACTION_FAILED,
   payload: {
      errors,
   },
});


export const addCondition = () => ({
   type: types.ADD_CONDITION,
});

export const deleteCondition = (id) => ({
   type: types.DELETE_CONDITION,
   payload: {
      id,
   },
});

export const changeCondition = (key, value, id) => ({
   type: types.CHANGE_CONDITION,
   payload: {
      key,
      value,
      id,
   },
});


export const getPublishedQuizzesStart = () => ({
   type: types.GET_QUIZZES_START,
});

export const getPublishedQuizzesCompleted = (data) => ({
   type: types.GET_QUIZZES_COMPLETED,
   payload: {
      data,
   },
});

export const getPublishedQuizzesFailed = (errors) => ({
   type: types.GET_QUIZZES_FAILED,
   payload: {
      errors,
   },
});
