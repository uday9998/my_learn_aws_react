/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {
   [types.GET_PLANS_START]: (state) => {
      return {
         ...state,
         getPlansInProgress: true,
      };
   },

   [types.GET_PLANS_COMPLETED]: (state, action) => {
      const { data, isPagination } = action.payload;
      if (isPagination) {
         return {
            ...state,
            getPlansInProgress: false,
            plans: data.data,
            lastPage: data.last_page,
         };
      }
      return {
         ...state,
         getPlansInProgress: false,
         plans: data,
      };
   },

   [types.GET_PLANS_FAILED]: (state) => {
      return {
         ...state,
         getPlansInProgress: false,
      };
   },

   [types.GET_PLANS_NEXT_PAGE_START]: (state) => {
      return {
         ...state,
         isFetchingNextPage: true,
      };
   },
   [types.GET_PLANS_NEXT_PAGE_COMPLETED]: (state, action) => {
      const data = action.payload;

      return {
         ...state,
         plans: [...state.plans, ...data.data],
         lastPage: data.last_page,
         isFetchingNextPage: false,
      };
   },
   [types.GET_PLANS_NEXT_PAGE_FAILED]: (state) => {
      return {
         ...state,
         isFetchingNextPage: false,
      };
   },
   [types.FILTER_PLANS_START]: (state) => {
      return {
         ...state,
         filterInProgress: true,
      };
   },

   [types.FILTER_PLANS_COMPLETED]: (state, action) => {
      const { payload: data } = action;
      return {
         ...state,
         filterInProgress: false,
         plans: data.data,
         lastPage: data.last_page,
      };
   },

   [types.FILTER_PLANS_FAILED]: (state) => {
      return {
         ...state,
         filterInProgress: false,
      };
   },
   [types.DELETE_PLANS_COMPLETED]: (state, action) => {
      const plans = state.plans.filter((e) => !action.payload.includes(e.id));
      return {
         ...state,
         plans: [
            ...plans,
         ],
      };
   },
   [types.PLAN_GET_START]: (state) => {
      return {
         ...state,
         planProgress: true,
      };
   },
   [types.PLAN_GET_FAILED]: (state) => {
      return {
         ...state,
         planProgress: false,
      };
   },
   [types.PLAN_GET_COMPLETED]: (state, action) => {
      return {
         ...state,
         planProgress: false,
         plan: action.payload,
         initial: action.payload,
      };
   },
   [types.PLAN_INPUT_CHANGE]: (state, action) => {
      const { name, value } = action.payload;
      if (name === 'picture_src' && value === null) {
         return {
            ...state,
            plan: {
               ...state.plan,
               [name]: value,
               file: {},
            },
         };
      }
      return {
         ...state,
         plan: {
            ...state.plan,
            [name]: value,
         },
      };
   },
   [types.PLAN_INTEGRATION_START]: (state) => {
      return {
         ...state,
         planProgress: true,
      };
   },
   [types.PLAN_INTEGRATION_FAILED]: (state) => {
      return {
         ...state,
         planProgress: false,
      };
   },
   [types.PLAN_INTEGRATION_COMPLETED]: (state, action) => {
      return {
         ...state,
         planProgress: false,
         plan: {
            ...state.plan,
            integrations: action.payload,
         },
      };
   },
   [types.PLAN_SAVE_START]: (state) => {
      return {
         ...state,
         planLoading: true,
      };
   },
   [types.PLAN_SAVE_FAILED]: (state) => {
      return {
         ...state,
         planLoading: false,
      };
   },
   [types.PLAN_SAVE_COMPLETED]: (state) => {
      return {
         ...state,
         planLoading: false,
      };
   },
   [types.PLAN_ADD_TAG_COMPLETED]: (state, action) => {
      return {
         ...state,
         plan: {
            ...state.plan,
            tags: [
               ...state.plan.tags,
               action.payload,
            ],
         },
      };
   },
   [types.PLAN_ORDER_BUMP_DELETE_COMPLETED]: (state, action) => {
      return {
         ...state,
         plan: {
            ...state.plan,
            order_bumps: state.plan.order_bumps.filter((e) => e.id !== action.payload),
         },
      };
   },
   [types.PLAN_CUSTOM_FIELDS_ADD_COMPLETED]: (state, action) => {
      return {
         ...state,
         plan: {
            ...state.plan,
            fields: [
               ...state.plan.fields,
               action.payload,
            ],
         },
      };
   },
   [types.PLAN_CUSTOM_FIELD_DELETE_COMPLETED]: (state, action) => {
      const ids = action.payload;
      return {
         ...state,
         plan: {
            ...state.plan,
            setting: {
               ...state.plan.setting,
               custom_fields: (state.plan.setting.custom_fields || []).filter((e) => !ids.includes(e)),

            },
            fields: state.plan.fields.filter((e) => !ids.includes(e.id)),
         },
      };
   },

   [types.AUTHORESPONDER_OPTIONS_LIST_START]: (state) => {
      return {
         ...state,
         authoresponderListOptionsInProgress: true,
      };
   },

   [types.AUTHORESPONDER_OPTIONS_LIST_COMPLETED]: (state, action) => {
      return {
         ...state,
         authoresponderListOptions: action.payload,
         authoresponderListOptionsInProgress: false,
      };
   },

   [types.AUTHORESPONDER_OPTIONS_LIST_FAILED]: (state) => {
      return {
         ...state,
         authoresponderListOptionsInProgress: false,
      };
   },

   [types.DELETE_UPSELL_COMPLETED]: (state, action) => {
      return {
         ...state,
         plan: {
            ...state.plan,
            upsells: state.plan.upsells.filter((e) => e.id !== action.payload),
         },
      };
   },
   [types.MAKE_ACTIVE_LANDING_COMPLETED]: (state, action) => {
      const newLadndings = state.plan.landings.map((e) => {
         return {
            ...e,
            is_active: e.id === action.payload ? 1 : 0,
         };
      });
      return {
         ...state,
         plan: {
            ...state.plan,
            landings: newLadndings,
         },
      };
   },
   [types.DELETE_DOWNSELL_COMPLETED]: (state, action) => {
      const newUpsells = state.plan.upsells.map((e) => {
         if (e.downsell && e.downsell.id === action.payload.downsellId) {
            return {
               ...e,
               downsell: null,
            };
         }
         return e;
      });
      return {
         ...state,
         plan: {
            ...state.plan,
            upsells: newUpsells,
         },
      };
   },
   [types.DOWNSEL_STATUS_CHANGE]: (state, action) => {
      const newUpsells = state.plan.upsells.map((e) => {
         if (e.downsell && e.downsell.id === action.payload.downsellId) {
            return {
               ...e,
               downsell: {
                  ...e.downsell,
                  active: e.downsell.active === 1 ? 0 : 1,
               },
            };
         }
         return e;
      });
      return {
         ...state,
         plan: {
            ...state.plan,
            upsells: newUpsells,
         },
      };
   },
   [types.RESET_STATE_TO_INITIAL]: (state) => {
      return {
         ...state,
         initialState,
      };
   },
};


export default createReducer(initialState)(reducersMap);
