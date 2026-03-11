import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.COMMENTS_GET_START]: (state) => {
      return {
         ...state,
         isLoading: true,
      };
   },
   [types.COMMENTS_GET_FAILED]: (state) => {
      return {
         ...state,
         isLoading: false,
      };
   },
   [types.COMMENTS_GET_COMPLETED]: (state, action) => {
      return {
         ...state,
         isLoading: false,
         comments: action.payload.data,
         sortingVersion: action.payload.newSortVersion,
         // commentsInitialLength: action.payload.length,
      };
   },
   [types.COMMENTS_SEARCH_START]: (state) => {
      return {
         ...state,
         isSearching: true,
      };
   },
   [types.COMMENTS_SEARCH_FAILED]: (state) => {
      return {
         ...state,
         isSearching: false,
      };
   },
   [types.COMMENTS_SEARCH_COMPLETED]: (state, action) => {
      return {
         ...state,
         isSearching: false,
         searchData: action.payload,
      };
   },
   [types.COMMENTS_CHANGES_START]: (state) => {
      return {
         ...state,
         isProgressComment: true,
      };
   },
   [types.COMMENTS_CHANGES_COMPLETED]: (state) => {
      return {
         ...state,
         isProgressComment: false,
      };
   },
   [types.COMMENTS_CHANGES_FAILED]: (state) => {
      return {
         ...state,
         isProgressComment: false,
      };
   },
   [types.GET_REPLY_START]: (state) => {
      return {
         ...state,
         replieProgress: true,
      };
   },
   [types.GET_REPLY_FAILED]: (state) => {
      return {
         ...state,
         replieProgress: false,
      };
   },
   [types.GET_REPLY_COMPLETED]: (state, action) => {
      return {
         ...state,
         replieProgress: false,
         comment: action.payload,
      };
   },
   [types.REPLY_COMMENT_START]: (state) => {
      return {
         ...state,
         replieProgress: false,
         isProgressComment: true,
      };
   },
   [types.REPLY_COMMENT_COMPLETED]: (state, action) => {
      return {
         ...state,
         replieProgress: false,
         isProgressComment: false,
         comment: state.comment ? {
            ...state.comment,
            childs: [
               ...state.comment.childs,
            //    action.payload,
            ],
         } : null,
      };
   },
   [types.REPLY_COMMENT_FAILED]: (state) => {
      return {
         ...state,
         isProgressComment: false,
         replieProgress: false,
      };
   },
   [types.SOCKET_ADD_COMMENT]: (state, action) => {
      const comment = action.payload.comment;
      if (!action.payload.isFromFeed) {
         const allComments = state.comments.all_comments.map((all) => {
            if (comment.parent_id === all.id) {
               return {
                  ...all,
                  childs_count: all.childs_count + 1,
               };
            }
            return all;
         });
         const sectionComments = state.comments.sections.map((sec) => {
            const secLessons = sec.lessons.map((les) => {
               const newComments = les.lessonComments.map((com) => {
                  if (com.id === comment.parent_id) {
                     return {
                        ...com,
                        childs_count: com.childs_count + 1,
                     };
                  }
                  return com;
               });
               return {
                  ...les,
                  lessonComments: newComments,
               };
            });
            return {
               ...sec,
               lesons: secLessons,
            };
         });
         return {
            ...state,
            comments: {
               ...state.comments,
               all_comments: allComments,
               sections: sectionComments,
            },
         };
      }
      const initialFeed = {
         ...state.comment,
         childs: [
            ...state.comment.childs,
            action.payload.comment,
         ],
      };
      return {
         ...state,
         comment: initialFeed,
      };
   },
};

export default createReducer(initialState)(reducersMap);
