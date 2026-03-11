import TYPES from './types';

export default {
   generateInitialState: (forms) => ({
      type: TYPES.GENERATE_INITIAL_STATE,
      payload: { forms },
   }),
   inputChange: (target, key, value) => ({
      type: TYPES.INPUT_CHANGE,
      payload: { target, key, value },
   }),
   formRequestStart: (form) => ({
      type: TYPES.FORM_REQUEST_START,
      payload: { form },
   }),
   formRequestSuccess: (form, data) => ({
      type: TYPES.FORM_REQUEST_SUCCESS,
      payload: { form, data },
   }),
   formRequestFail: (form) => ({
      type: TYPES.FORM_REQUEST_FAIL,
      payload: { form },
   }),
   cancelChanges: (form) => ({
      type: TYPES.CANCEL_CHANGES,
      payload: { form },
   }),
   saveDataToCache: (form) => ({
      type: TYPES.SAVE_FORM_STATE_TO_CACHE,
      payload: { form },
   }),
};
