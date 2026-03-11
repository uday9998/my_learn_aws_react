import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.UPDATE_CURRENT_START]: (state) => {
      return {
         ...state,
         isNotificationInProgress: true,
      };
   },
   [types.UPDATE_CURRENT_FAILED]: (state) => {
      return {
         ...state,
         isNotificationInProgress: false,
      };
   },
   [types.UPDATE_CURRENT_COMPLETED]: (state, action) => {
      const { data, metaDataDefault } = action.payload;

      return {
         ...state,
         isNotificationInProgress: false,
         current: data,
         metaDataDefault,
      };
   },
   [types.SAVE_CURRENT_START]: (state) => ({
      ...state,
      isNotificationInProgress: true,
   }),
   [types.SAVE_CURRENT_FAILED]: (state) => ({
      ...state,
      isNotificationInProgress: false,
   }),
   [types.SAVE_CURRENT_COMPLETED]: (state) => ({
      ...state,
      isNotificationInProgress: false,
   }),
};

export default createReducer(initialState)(reducersMap);
