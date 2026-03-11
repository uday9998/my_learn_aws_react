import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {

   [types.GET_STUDENTCERTIFICATES_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.GET_STUDENTCERTIFICATES_COMPLETED]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         studentCertificates: payload,
         isFetchingData: false,
      };
   },

   [types.GET_STUDENTCERTIFICATES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },
};

export default createReducer(initialState)(reducersMap);
