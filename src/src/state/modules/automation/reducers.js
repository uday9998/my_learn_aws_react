/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value, target } } = action;
      if (target === 'currentAction') {
         return {
            ...state,
            currentAction: {
               ...state.currentAction,
               payload: {
                  ...state.currentAction.payload,
                  [key]: value,
               },
            },
         };
      }
      return {
         ...state,
         [target]: {
            ...state[target],
            [key]: value,
         },
      };
   },

   [types.SET_CONDITION_INPUT]: (state, action) => {
      const { payload: { key, value, target } } = action;
      return {
         ...state,
         currentAction: {
            ...state.currentAction,
            payload: {
               ...state.currentAction.payload,
               [key]: value,
            },
         },
      };
   },

   [types.GET_COURSES_START]: (state) => {
      return {
         ...state,
         getCoursesInProgress: true,
      };
   },

   [types.GET_COURSES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         courses: data.courses,
         getCoursesInProgress: false,
      };
   },

   [types.GET_COURSES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getCoursesInProgress: false,
      };
   },

   [types.GET_SORTED_COURSES_START]: (state) => {
      return {
         ...state,
         getCoursesInProgress: true,
      };
   },

   [types.GET_SORTED_COURSES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         courses: data,
         getCoursesInProgress: false,
      };
   },

   [types.GET_SORTED_COURSES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getCoursesInProgress: false,
      };
   },

   [types.GET_SORTED_ALL_MEMBERS_START]: (state) => {
      return {
         ...state,
         getallMembersInProgress: true,
      };
   },

   [types.GET_SORTED_ALL_MEMBERS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         members: data,
         getallMembersInProgress: false,
      };
   },

   [types.GET_SORTED_ALL_MEMBERS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getallMembersInProgress: false,
      };
   },

   [types.GET_ALLMEMBERS_START]: (state) => {
      return {
         ...state,
         getallMembersInProgress: true,
      };
   },

   [types.GET_ALLMEMBERS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         members: data,
         getallMembersInProgress: false,
      };
   },

   [types.GET_ALLMEMBERS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getallMembersInProgress: false,
      };
   },

   [types.GET_TAGS_START]: (state) => {
      return {
         ...state,
         getCoursesInProgress: true,
      };
   },

   [types.GET_TAGS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         tags: data,
         getCoursesInProgress: false,
      };
   },

   [types.GET_TAGS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getCoursesInProgress: false,
      };
   },

   [types.GET_ALLCOUPONS_START]: (state) => {
      return {
         ...state,
         getCoursesInProgress: true,
      };
   },

   [types.GET_ALLCOUPONS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         coupons: data,
         getCoursesInProgress: false,
      };
   },

   [types.GET_ALLCOUPONS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getCoursesInProgress: false,
      };
   },

   [types.GET_AUTOMATION_START]: (state) => {
      return {
         ...state,
         getAutomationInProgress: true,
      };
   },

   [types.GET_AUTOMATION_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      if (data.actions && data.actions[data.actions.length - 1] && data.actions[data.actions.length - 1].order) {
         data.actions.sort((a, b) => (a.oder > b.order));
      }
      const conditions = data.actions.filter(act => act.type === 'condition');
      if (conditions) {
         conditions.forEach((condition) => {
            if (condition) {
               const addIdCondition = (conditionObj) => {
                  if (conditionObj.yes_actions) {
                     conditionObj.yes_actions.map(yes_action => {
                        yes_action.id = new Date().getTime() + Math.floor(Math.random() * 10000);
                        if (yes_action.type === 'condition') {
                           return addIdCondition(yes_action.payload);
                        }
                        return (
                           yes_action
                        );
                     });
                  }
                  if (conditionObj.no_actions) {
                     conditionObj.no_actions.map(no_action => {
                        no_action.id = new Date().getTime() + Math.floor(Math.random() * 10000);
                        if (no_action.type === 'condition') {
                           return addIdCondition(no_action.payload);
                        }
                        return (
                           no_action
                        );
                     });
                  }
               };
               addIdCondition(condition.payload);
            }
         });
      }


      return {
         ...state,
         automation: data,
         getAutomationInProgress: false,
      };
   },

   [types.GET_AUTOMATION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getAutomationInProgress: false,
      };
   },

   [types.GET_AUTOMATIONS_START]: (state) => {
      return {
         ...state,
         getAutomationsInProgress: true,
      };
   },

   [types.GET_AUTOMATIONS_COMPLETED]: (state, action) => {
      const { payload: { data, isDidMount } } = action;
      return {
         ...state,
         automations: data,
         initialAutomationsLength: isDidMount ? data.length : state.initialAutomationsLength,
         getAutomationsInProgress: false,
      };
   },

   [types.GET_AUTOMATIONS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getAutomationsInProgress: false,
      };
   },

   [types.DELETE_AUTOMATION_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.DELETE_AUTOMATION_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      let automations = [...state.automations];
      automations = automations.filter(automation => automation.id !== id);
      return {
         ...state,
         automations,
         initialAutomationsLength: automations.length,
      };
   },

   [types.DELETE_AUTOMATION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },

   [types.UPDATE_AUTOMATION_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.UPDATE_AUTOMATION_COMPLETED]: (state, action) => {
      const { payload: { id, data } } = action;
      const automations = [...state.automations];
      const currentAutomation = automations.filter(automation => automation.id === id);
      if (data.status !== undefined && currentAutomation.length !== 0) {
         currentAutomation[0].status = data.status;
      }
      return {
         ...state,
         automations,
      };
   },

   [types.UPDATE_AUTOMATION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },

   [types.SAVE_TRIGGER_START]: (state) => {
      return {
         ...state,
         getTriggerInProgress: true,
      };
   },

   [types.SAVE_TRIGGER_COMPLETED]: (state, action) => {
      const { payload: { id, data } } = action;
      const triggers = [...state.automation.triggers];
      const currentTrigger = triggers.find(trigger => trigger.id === id);
      if (currentTrigger.type === 'enroll' || currentTrigger.type === 'purchase' || currentTrigger.type === 'course_complete') {
         currentTrigger.course_id = data.course_id;
      } else {
         currentTrigger.tag_id = data.tag_id;
      }
      return {
         ...state,
         automation: {
            ...state.automation,
            triggers,
         },
         getTriggerInProgress: false,
      };
   },

   [types.SAVE_TRIGGER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getTriggerInProgress: false,
      };
   },

   [types.ADD_TRIGGER_START]: (state) => {
      return {
         ...state,
         getTriggerInProgress: true,
      };
   },

   [types.ADD_TRIGGER_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         automation: {
            ...state.automation,
            triggers: [
               ...state.automation.triggers,
               data,
            ],
         },
         currentTrigger: data,
         getTriggerInProgress: false,
      };
   },

   [types.ADD_TRIGGER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getTriggerInProgress: false,
      };
   },

   [types.ADD_ACTION_START]: (state) => {
      return {
         ...state,
         getActionInProgress: true,
      };
   },

   [types.ADD_ACTION_COMPLETED]: (state, action) => {
      const { payload: { data, actionIndex } } = action;
      const actions = [...state.automation.actions];
      const reorderedActions = [
         ...actions.slice(0, actionIndex + 1),
         data,
         ...actions.slice(actionIndex + 1),
      ];
      return {
         ...state,
         automation: {
            ...state.automation,
            actions: reorderedActions,
         },
         currentAction: data,
         getActionInProgress: false,
      };
   },

   [types.ADD_ACTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getActionInProgress: false,
      };
   },

   [types.SAVE_ACTION_START]: (state) => {
      return {
         ...state,
         getActionInProgress: true,
      };
   },

   [types.SAVE_ACTION_COMPLETED]: (state, action) => {
      const {
         payload: {
            id, data, actionId, actionIndex, newAction,
         },
      } = action;
      let actions = [...state.automation.actions];
      if (actions && actions[actions.length - 1] && actions[actions.length - 1].order) {
         actions.sort((a, b) => (a.oder > b.order));
      }
      const currentAction = actions.find(act => act.id === id);
      if (currentAction.type === 'wait') {
         currentAction.payload.value = data.payload.value;
         currentAction.payload.type = data.payload.type;
      }
      if (currentAction.type === 'webhook') {
         currentAction.payload.url = data.payload.url;
      }
      if (currentAction.type === 'tag' || currentAction.type === 'remove_tag') {
         currentAction.payload.tag_id = data.payload.tag_id;
      }
      if (currentAction.type === 'enroll_in') {
         currentAction.payload.course_id = data.payload.course_id;
      }
      if (currentAction.type === 'email') {
         currentAction.payload.subject = data.payload.subject;
         currentAction.payload.body = data.payload.body;
      }
      if (currentAction.type === 'condition' && !actionId) {
         actions = actions.map((currAction) => {
            if (currAction.id === id) {
               return (
                  data
               );
            }
            return (
               currAction
            );
         });
      }
      const automation = { ...state.automation, actions };
      let currentNewAction = { ...currentAction };
      if (newAction) {
         currentNewAction = newAction;
      }
      // const conditions = automation.actions.filter(act => act.type === 'condition');
      // if (conditions) {
      //    conditions.forEach((condition) => {
      //       if (condition) {
      //          const addIdCondition = (conditionObj) => {
      //             if (conditionObj.yes_actions) {
      //                conditionObj.yes_actions.map(yes_action => {
      //                   if (newAction && (yes_action.id === newAction.id)) {
      //                      yes_action.id = newAction.id;
      //                   } else {
      //                      yes_action.id = new Date().getTime() + Math.floor(Math.random() * 10000);
      //                   }
      //                   if (yes_action.type === 'condition') {
      //                      return addIdCondition(yes_action.payload);
      //                   }
      //                   return (
      //                      yes_action
      //                   );
      //                });
      //             }
      //             if (conditionObj.no_actions) {
      //                conditionObj.no_actions.map(no_action => {
      //                   if (newAction && (no_action.id === newAction.id)) {
      //                      no_action.id = newAction.id;
      //                   } else {
      //                      no_action.id = new Date().getTime() + Math.floor(Math.random() * 10000);
      //                   }
      //                   if (no_action.type === 'condition') {
      //                      return addIdCondition(no_action.payload);
      //                   }
      //                   return (
      //                      no_action
      //                   );
      //                });
      //             }
      //          };
      //          addIdCondition(condition.payload);
      //       }
      //    });
      // }
      return {
         ...state,
         automation,
         getActionInProgress: false,
         currentAction: currentNewAction,
      };
   },

   [types.SAVE_ACTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getActionInProgress: false,
      };
   },

   [types.CHOOSE_TRIGGER]: (state, action) => {
      const { payload: { id } } = action;
      const currentTrigger = state.automation.triggers.find(trigger => trigger.id === id);
      return {
         ...state,
         currentTrigger,
      };
   },

   [types.CHOOSE_ACTION]: (state, action) => {
      const { payload: { id, actionId } } = action;
      const currentAction = state.automation.actions.find(data => data.id === id);
      let currentActionFiltered = currentAction;
      if (currentAction.type === 'condition' && actionId) {
         const addIdCondition = (conditionObj) => {
            if (conditionObj.yes_actions) {
               conditionObj.yes_actions.map(yes_action => {
                  if (yes_action.id === actionId) {
                     currentActionFiltered = yes_action;
                     return false;
                  }
                  return addIdCondition(yes_action.payload);
               });
            }
            if (conditionObj.no_actions) {
               conditionObj.no_actions.map(no_action => {
                  if (no_action.id === actionId) {
                     currentActionFiltered = no_action;
                     return false;
                  }
                  return addIdCondition(no_action.payload);
               });
            }
         };
         addIdCondition(currentAction.payload);
      }
      let conditions = [{
         id: new Date().getTime() + Math.floor(Math.random() * 10000),
         key: 'tag_name',
         match: 'is_exactly',
         value: '',
      }];
      if (currentActionFiltered.type === 'condition' && currentActionFiltered.payload.conditions && currentActionFiltered.payload.conditions.length > 0) {
         conditions = currentActionFiltered.payload.conditions.map(condition => {
            condition.id = new Date().getTime() + Math.floor(Math.random() * 10000);
            return (
               condition
            );
         });
      }
      return {
         ...state,
         currentAction: currentActionFiltered,
         conditions,
      };
   },

   [types.DELETE_ACTION_START]: (state) => {
      return {
         ...state,
         getAutomationInProgress: true,
      };
   },

   [types.DELETE_ACTION_COMPLETED]: (state, action) => {
      const { payload: { actionId } } = action;
      let actions = [...state.automation.actions];
      actions = actions.filter((act) => act.id !== actionId);
      if (actions && actions[actions.length - 1] && actions[actions.length - 1].order) {
         actions.sort((a, b) => (a.oder > b.order));
      }
      return {
         ...state,
         automation: {
            ...state.automation,
            actions,
         },
         getAutomationInProgress: false,
      };
   },

   [types.DELETE_ACTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getAutomationInProgress: false,
      };
   },

   [types.DELETE_TRIGGER_START]: (state) => {
      return {
         ...state,
         getTriggerInProgress: true,
      };
   },

   [types.DELETE_TRIGGER_COMPLETED]: (state, action) => {
      const { payload: { triggerId } } = action;
      let triggers = [...state.automation.triggers];
      triggers = triggers.filter((trigger) => trigger.id !== triggerId);
      return {
         ...state,
         automation: {
            ...state.automation,
            triggers,
         },
         getTriggerInProgress: false,
      };
   },

   [types.DELETE_TRIGGER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getTriggerInProgress: false,
      };
   },

   [types.ADD_CONDITION]: (state) => {
      const newCondition = {
         id: new Date().getTime() + Math.floor(Math.random() * 10000),
         key: 'tag_name',
         match: 'contain',
         value: '',
      };
      return {
         ...state,
         conditions: [
            ...state.conditions,
            newCondition,
         ],
      };
   },

   [types.DELETE_CONDITION]: (state, action) => {
      const { payload: { id } } = action;
      let conditions = [...state.conditions];
      conditions = conditions.filter(item => item.id !== id);
      return {
         ...state,
         conditions,
      };
   },

   [types.CHANGE_CONDITION]: (state, action) => {
      const { payload: { key, value, id } } = action;
      const newconditions = [...state.conditions];
      const condition = newconditions.find(cond => cond.id === id);
      condition[key] = value;
      // eslint-disable-next-line no-useless-escape
      // const dateReg = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
      if (key === 'key') {
         condition.value = '';
      }
      if (condition.key === 'subscription_date') {
         if (((condition.match !== 'before' && condition.match !== 'after') || condition.match === undefined)) {
            condition.match = 'before';
         }
      } else if (condition.key === 'used_coupon') {
         if (((condition.match !== 'yes' && condition.match !== 'no') || condition.match === undefined)) {
            condition.match = 'yes';
         }
      } else if (condition.key === 'course_completed') {
         if (key === 'key') {
            condition.match = undefined;
         }
      } else if (condition.key === 'member_last_login') {
         if (condition.match) {
            delete condition.match;
         }
      } else if (condition.key !== 'subscription_date' && condition.key !== 'member_last_login' && condition.key !== 'used_coupon' && condition.key !== 'course_completed') {
         if (((condition.match !== 'is_exactly' && condition.match !== 'is_not_exactly' && condition.match !== 'contain' && condition.match !== 'not_contain' && condition.match !== 'starts_with' && condition.match !== 'ends_with') || condition.match === undefined)) {
            condition.match = 'contain';
         }
      }

      return {
         ...state,
         conditions: newconditions,
      };
   },

   [types.GET_QUIZZES_START]: (state) => {
      return {
         ...state,
         getallQuizzesInProgress: true,
      };
   },

   [types.GET_QUIZZES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         quizzes: data,
         getallQuizzesInProgress: false,
      };
   },

   [types.GET_QUIZZES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getallQuizzesInProgress: false,
      };
   },


};

export default createReducer(initialState)(reducersMap);
