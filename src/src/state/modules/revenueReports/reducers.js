import {
   createReducer,
} from '../../utils/reducerHelper';
import * as types from './types';

import initialState from './initial-state';

const reducersMap = {
   [types.GET_REVENUE_STATISTIC_START]: (state) => {
      return {
         ...state,
         fetchData: true,
      };
   },
   [types.GET_REVENUE_FILTER_STATISTIC_START]: (state) => {
      return {
         ...state,
         fetchFilterData: true,
      };
   },
   [types.GET_REVENUE_STATISTIC_COMPLETED]: (state, action) => {
      const { data } = action.payload;

      return {
         ...state,
         fetchData: false,
         fetchFilterData: false,
         reports: {
            ...state.reports,
            courses: data.courses,
            sales: data.sales,
            members_count: data.members_count,
            course_completitions: data.course_completitions,
         },
      };
   },
   [types.GET_REVENUE_STATISTIC_FAILED]: (state, action) => {
      const { errors } = action.payload;
      return {
         ...state,
         errors,
         fetchData: false,
         fetchFilterData: false,
      };
   },

   [types.GET_GHOST_START]: (state) => {
      return {
         ...state,
         fetchGhostData: true,
      };
   },
   [types.GET_GHOST_FAILED]: (state) => {
      return {
         ...state,
         fetchGhostData: false,
      };
   },
   [types.GET_GHOST_COMPLETED]: (state, action) => {
      const { payload } = action;

      return {
         ...state,
         fetchGhostData: false,
         ghost: payload.posts,
      };
   },
   [types.GET_STEPS_START]: (state) => {
      return {
         ...state,
         fetchStepsData: true,
      };
   },
   [types.GET_STEPS_FAILED]: (state) => {
      return {
         ...state,
         fetchStepsData: false,
      };
   },
   [types.GET_STEPS_COMPLETED]: (state, action) => {
      const { payload } = action;

      return {
         ...state,
         fetchStepsData: false,
         steps: payload,
      };
   },
};

export default createReducer(initialState)(reducersMap);
