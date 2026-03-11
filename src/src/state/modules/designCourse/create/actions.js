import * as types from './types';

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

export const createSectionStart = () => {
   return {
      type: types.CREATE_SECTION_START,
   };
};
export const createSectionFailed = (errors) => {
   return {
      type: types.CREATE_SECTION_FAILED,
      payload: {
         errors,
      },
   };
};

export const createCourseStart = () => {
   return {
      type: types.CREATE_COURSE_START,
   };
};

export const createCourseComplete = () => {
   return {
      type: types.CREATE_COURSE_COMPLETED,
   };
};

export const createCourseFailed = (errors) => {
   return {
      type: types.CREATE_COURSE_FAILED,
      payload: {
         errors,
      },
   };
};


export const createPlanStart = () => {
   return {
      type: types.CREATE_PLAN_START,
   };
};

export const createPlanFailed = (errors) => {
   return {
      type: types.CREATE_PLAN_FAILED,
      payload: {
         errors,
      },
   };
};

export const addPlan = (type) => {
   return {
      type: types.ADD_PLAN,
      payload: { type },
   };
};


export const createSignUpStart = () => {
   return {
      type: types.CREATE_SIGN_UP_START,
   };
};

export const createSignUpComplete = () => {
   return {
      type: types.CREATE_SIGN_UP_COMPLETED,
   };
};

export const createSignUpFailed = (errors) => {
   return {
      type: types.CREATE_SIGN_UP_FAILED,
      payload: {
         errors,
      },
   };
};

export const getAutoresponderListsCompleted = (lists) => {
   return {
      type: types.GET_AUTORESPONDERS_LISTS_COMPLETED,
      payload: {
         lists,
      },
   };
};


export const setSignUpInput = (key, value, target) => {
   return {
      type: types.SET_SIGN_UP_INPUT,
      payload: {
         key,
         value,
         target,
      },
   };
};
export const updateSettingsInput = (key, value) => {
   return {
      type: types.UPDATE_SETTINGS_COMPLETED,
      payload: {
         key,
         value,
      },
   };
};

export const createProgramStart = () => {
   return {
      type: types.CREATE_PROGRAM_START,
   };
};
export const createProgramEnd = () => {
   return {
      type: types.CREATE_PROGRAM_END,
   };
};

export const generateTitleDescStart = () => {
   return {
      type: types.GENERATE_START,
   };
};

export const generateTitleDescCompleted = (data) => {
   return {
      type: types.GENERATE_COMPLETED,
      payload: {
         data,
      },
   };
};

export const generateTitleDescFailed = (errors) => {
   return {
      type: types.GENERATE_FAILED,
      payload: {
         errors,
      },
   };
};

export const emptyGeneratedArray = () => {
   return {
      type: types.EMPTY_GENERATED_ARRAY,
   };
};
