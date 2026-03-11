import TYPES from './types';

export default {
   [TYPES.GENERATE_INITIAL_STATE]: (_, action) => {
      const { payload: { forms } } = action;
      const initialState = forms.reduce((result, form) => {
         // eslint-disable-next-line no-param-reassign
         result[form.key] = {
            loading: false,
            fetchAction: form.fetchAction,
            inited: false,
            data: {},
         };
         return result;
      }, {});
      return { ...initialState, stateReady: true };
   },
   [TYPES.INPUT_CHANGE]: (state, action) => {
      const { payload: { target, key, value } } = action;
      const targetObject = state[target] || { data: {} };
      return {
         ...state,
         [target]: {
            ...targetObject,
            data: {
               ...targetObject.data,
               [key]: value,
            },
         },
      };
   },
   [TYPES.FORM_REQUEST_START]: (state, action) => {
      const { payload: { form } } = action;
      return {
         ...state,
         [form]: {
            ...state[form],
            loading: true,
         },
      };
   },
   [TYPES.FORM_REQUEST_SUCCESS]: (state, action) => {
      const { payload: { form, data } } = action;
      return {
         ...state,
         [form]: {
            ...state[form],
            loading: false,
            inited: true,
            data,
            cachedData: data,
         },
      };
   },
   [TYPES.FORM_REQUEST_FAIL]: (state, action) => {
      const { payload: { form } } = action;
      return {
         ...state,
         [form]: {
            ...state[form],
            loading: false,
            data: {},
         },
      };
   },
   [TYPES.CANCEL_CHANGES]: (state, action) => {
      const { payload: { form } } = action;
      return {
         ...state,
         [form]: {
            ...state[form],
            loading: false,
            data: { ...state[form].cachedData },
         },
      };
   },
   [TYPES.SAVE_FORM_STATE_TO_CACHE]: (state, action) => {
      const { payload: { form } } = action;
      return {
         ...state,
         [form]: {
            ...state[form],
            loading: false,
            cachedData: { ...state[form].data },
         },
      };
   },
};
