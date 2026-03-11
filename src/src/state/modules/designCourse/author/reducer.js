import * as types from './types';
import {
   createReducer,
} from '../../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.GET_AUTHORS_START]: (state) => {
      return {
         ...state,
         isFetcheAuthors: true,
      };
   },
   [types.GET_AUTHORS_COMPLETE]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         authors: data,
         isFetcheAuthors: false,
      };
   },
   [types.GET_AUTHORS_FAILED]: (state) => {
      return {
         ...state,
         isFetcheAuthors: false,
      };
   },

   [types.CREATE_AUTHOR_START]: (state) => {
      return {
         ...state,
         isOpenAuthorPopup: true,
      };
   },
   [types.CREATE_AUTHOR_COMPLETE]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         authors: [
            data,
            ...state.authors,
         ],
         isOpenAuthorPopup: false,
      };
   },
   [types.CREATE_AUTHOR_FAILED]: (state) => {
      return {
         ...state,
         isOpenAuthorPopup: true,
      };
   },

   [types.SAVE_AUTHOR_START]: (state) => {
      return {
         ...state,
      };
   },
   [types.SAVE_AUTHOR_COMPLETE]: (state, action) => {
      const { payload: { authorId, data } } = action;
      const author = state.authors.filter(el => el.id === authorId)
      && state.authors.filter(el => el.id === authorId)[0];
      author.description = data.description;
      author.picture_src = data.picture_src;
      return {
         ...state,
      };
   },
   [types.SAVE_AUTHOR_FAILED]: (state) => {
      return {
         ...state,
      };
   },

   [types.DELETE_AUTHOR_START]: (state) => {
      return {
         ...state,
         isOpenDeleteAuthorPopup: true,
      };
   },
   [types.DELETE_AUTHOR_COMPLETE]: (state, action) => {
      const { payload: { id } } = action;
      const authors = state.authors.filter(el => el.id !== id);
      return {
         ...state,
         isOpenDeleteAuthorPopup: false,
         authors,
      };
   },
   [types.DELETE_AUTHOR_FAILED]: (state) => {
      return {
         ...state,
         isOpenDeleteAuthorPopup: false,
      };
   },

   [types.OPEN_AUTHOR_POPUP]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         isOpenAuthorPopup: data,
      };
   },

   [types.OPEN_DELETE_AUTHOR_POPUP]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         isOpenDeleteAuthorPopup: data,
      };
   },
};

export default createReducer(initialState)(reducersMap);
