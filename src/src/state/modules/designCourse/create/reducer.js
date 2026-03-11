import * as types from './types';
import {
   createReducer,
} from '../../../utils/reducerHelper';

import initialState from './initial-state';


const reducersMap = {
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value, target } } = action;

      return {
         ...state,
         [target]: {
            ...state[target],
            [key]: value,
         },
      };
   },
   [types.CREATE_SECTION_START]: (state) => {
      return {
         ...state,
         createSectionInProgress: true,
      };
   },
   [types.GET_AUTORESPONDERS_LISTS_COMPLETED]: (state, action) => {
      const { payload: { lists } } = action;
      const signUpCopy = JSON.parse(JSON.stringify(state.signUp));
      signUpCopy.advanced.lists = lists;

      return {
         ...state,
         signUp: signUpCopy,
      };
   },
   [types.CREATE_SECTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         createSectionInProgress: false,
      };
   },

   [types.CREATE_COURSE_START]: (state) => {
      return {
         ...state,
         createCourseInProgress: true,
      };
   },
   [types.CREATE_COURSE_COMPLETED]: (state) => {
      return {
         ...state,
         settings: { ...initialState.settings },
         createCourseInProgress: false,
      };
   },
   [types.CREATE_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         createCourseInProgress: false,
      };
   },

   [types.ADD_PLAN]: (state, action) => {
      const { payload: { type } } = action;

      return {
         ...state,
         plan: {
            ...state.plan,
            currentPricingType: type,
            addingFirstPlan: true,
         },
      };
   },

   [types.CREATE_PLAN_START]: (state) => {
      return {
         ...state,
         createPlanInProgress: true,
      };
   },
   [types.CREATE_PLAN_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         createPlanInProgress: false,
      };
   },

   [types.SET_SIGN_UP_INPUT]: (state, action) => {
      const {
         payload: {
            key, value, target, id,
         },
      } = action;
      let signUpinput = { ...state.signUp[target] };
      let newTestimonialInput = { ...state.signUp.newTestimonialInput };
      let newBulletInput = { ...state.signUp.newBulletInput };
      if (target === 'testimonials' || target === 'bullet-points') {
         signUpinput = '';
         if (id) {
            const currentIndex = state.signUp[target].findIndex(x => x.id === id);
            // eslint-disable-next-line no-param-reassign
            state.signUp[target][currentIndex] = { ...state.signUp[target][currentIndex], [key]: value };
         } else if (target === 'testimonials') {
            newTestimonialInput = { ...state.signUp.newTestimonialInput, [key]: value };
         } else if (target === 'bullet-points') {
            newBulletInput = { ...state.signUp.newBulletInput, [key]: value };
         }
      } else {
         signUpinput = { [target]: { ...state.signUp[target], [key]: value } };
      }
      return {
         ...state,
         signUp: {
            ...state.signUp,
            ...signUpinput,
            newTestimonialInput,
            newBulletInput,
         },
      };
   },

   [types.CREATE_SIGN_UP_START]: (state) => {
      return {
         ...state,
         createSignUpInProgress: true,
      };
   },
   [types.CREATE_SIGN_UP_COMPLETED]: (state) => {
      return {
         ...state,
         signUp: { ...initialState.signUp },
         createSignUpInProgress: false,
      };
   },
   [types.CREATE_SIGN_UP_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         createSignUpInProgress: false,
      };
   },
   [types.UPDATE_SETTINGS_COMPLETED]: (state, action) => {
      const {
         payload: {
            key, value,
         },
      } = action;
      return {
         ...state,
         settings: {
            ...state.settings,
            [key]: value,
         },
      };
   },
   [types.CREATE_PROGRAM_START]: (state) => {
      return {
         ...state,
         createProgramInProgress: true,
      };
   },
   [types.CREATE_PROGRAM_END]: (state) => {
      return {
         ...state,
         createProgramInProgress: false,
      };
   },

   [types.GENERATE_START]: (state) => {
      return {
         ...state,
         generateInprogress: true,
      };
   },
   [types.GENERATE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      const dataToArray = data.split('\n');
      const generatedArray = dataToArray.map(item => {
         const newItem = item.split(/\s(.+)/);
         if (newItem && newItem[1]) {
            return newItem[1];
         }
         return null;
      });


      return {
         ...state,
         generatedArray,
         generateInprogress: false,
      };
   },
   [types.GENERATE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         generateInprogress: false,
      };
   },

   [types.EMPTY_GENERATED_ARRAY]: (state) => {
      return {
         ...state,
         generatedArray: [],
      };
   },
};

export default createReducer(initialState)(reducersMap);
