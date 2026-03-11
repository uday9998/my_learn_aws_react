import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.TAGS_INIT_START]: (state) => {
      return {
         ...state,
         tagsIsFetching: true,
      };
   },
   [types.TAGS_INIT_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         tags: data.data,
         tagsIsFetching: false,
      };
   },
   [types.TAGS_INIT_FAILED]: (state) => {
      return {
         ...state,
         tagsIsFetching: false,
      };
   },

   [types.TAGS_CREATE_COMPLETED]: (state, action) => {
      const { payload: { tag } } = action;
      return {
         ...state,
         tags: [...state.tags, tag],
      };
   },

   [types.UPDATE_TAGS_COMLETED]: (state, payload) => {
      const { payload: { id: tagId, data: { name } } } = payload;

      return {
         ...state,
         tags: state.tags.map((t) => {
            if (t.id !== tagId) return t;
            return { ...t, name };
         }),
      };
   },

   [types.REMOVE_TAGS_COMLETED]: (state, payload) => {
      const { payload: { id: tagId } } = payload;

      return {
         ...state,
         tags: state.tags.filter(({ id }) => tagId !== id),
      };
   },
};

export default createReducer(initialState)(reducersMap);
