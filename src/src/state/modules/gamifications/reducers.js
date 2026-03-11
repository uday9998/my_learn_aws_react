/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;

      return {
         ...state,
         currentBadge: {
            ...state.currentBadge,
            [key]: value,
         },
      };
   },
   [types.RESET_STATE_CHANGE_COMPLETED]: (state) => {
      return {
         ...state,
         currentBadge: {
            ...state.initialCurrentBudge,
         },
      };
   },

   [types.CHOOSE_BADGE_START]: (state, action) => {
      const { payload: { id } } = action;
      const { courses } = state;
      const selectedCourse = courses.find(course => course.id === id);
      const { lessons } = selectedCourse;
      const freeLessons = lessons.filter(lesson => lesson.lesson_badge !== null);

      return {
         ...state,
         selectedCourse,
         freeLessons,
         mobileShowCurrentBudge: false,
      };
   },

   [types.SWITCH_ADD_BADGE]: (state) => {
      return {
         ...state,
         addingBadge: true,
         currentBadge: {},
         chooseBadgeInProgress: false,
         mobileShowCurrentBudge: true,
      };
   },

   [types.CHOOSE_BADGE_START]: (state) => {
      return {
         ...state,
         chooseBadgeInProgress: true,
      };
   },

   [types.CHOOSE_BADGE_COMPLETED]: (state, action) => {
      const { payload: { badgeId } } = action;
      const { badges } = state;
      const currentBadge = badges.find((badge) => badge.id === badgeId);

      return {
         ...state,
         currentBadge,
         initialCurrentBudge: currentBadge,
         addingBadge: false,
         chooseBadgeInProgress: false,
         mobileShowCurrentBudge: true,
      };
   },

   [types.GET_GAMIFICATIONS_START]: (state) => {
      return {
         ...state,
         getBadgesInProgress: true,
      };
   },

   [types.GET_GAMIFICATIONS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const { badges, courses } = data;

      return {
         ...state,
         getBadgesInProgress: false,
         badges,
         courses,
         currentBadge: badges[0],
         initialCurrentBudge: badges[0],
      };
   },

   [types.GET_GAMIFICATIONS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getBadgesInProgress: false,
         errors,
      };
   },


   [types.CREATE_GAMIFICATIONS_START]: (state) => {
      return {
         ...state,
         createBadgeinProgress: true,
      };
   },

   [types.CREATE_GAMIFICATIONS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const newBadge = data[0];

      return {
         ...state,
         createBadgeinProgress: false,
         addingBadge: false,
         currentBadge: newBadge,
         initialCurrentBudge: newBadge,
         badges: [
            ...state.badges,
            newBadge,
         ],

      };
   },

   [types.CREATE_GAMIFICATIONS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         createBadgeinProgress: false,
         errors,
      };
   },

   [types.DELETE_GAMIFICATIONS_START]: (state) => {
      return {
         ...state,
         createBadgeinProgress: true,
         mobileShowCurrentBudge: false,
      };
   },

   [types.DELETE_GAMIFICATIONS_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      const { badges } = state;

      const newBadges = badges.filter(badge => badge.id !== id);

      return {
         ...state,
         mobileShowCurrentBudge: false,
         createBadgeinProgress: false,
         badges: newBadges,
         currentBadge: newBadges[0],
         initialCurrentBudge: newBadges[0],
      };
   },

   [types.DELETE_GAMIFICATIONS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         createBadgeinProgress: false,
         errors,
      };
   },

   [types.UPDATE_GAMIFICATIONS_START]: (state) => {
      return {
         ...state,
         getBadgesInProgress: true,
      };
   },

   [types.UPDATE_GAMIFICATIONS_COMPLETED]: (state, action) => {
      const { payload: { id, data } } = action;
      const newBadges = state.badges.map(badge => (badge.id === id ? data : badge));
      return {
         ...state,
         getBadgesInProgress: false,
         badges: newBadges,
      };
   },

   [types.UPDATE_GAMIFICATIONS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getBadgesInProgress: false,
         errors,
      };
   },
   [types.UPDATE_MOBILE_STATE_COMPLETED]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         mobileShowCurrentBudge: payload,
         addingBadge: payload,
      };
   },
};


export default createReducer(initialState)(reducersMap);
