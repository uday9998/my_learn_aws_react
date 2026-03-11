/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {

   // GET COMMENTS
   [types.GET_COMMENTS_START]: (state) => {
      return {
         ...state,
         fetchData: true,
      };
   },

   [types.GET_COMMENTS_COMPLETED]: (state, action) => {
      const res = action.payload;
      return {
         ...state,
         commentsData: {
            ...res,
            data: res.data,
         },
         fetchData: false,
      };
   },

   [types.GET_COMMENTS_FAILED]: (state) => {
      return {
         ...state,
         fetchData: false,
      };
   },

   // GET NEW COMMENTS
   [types.GET_NEW_COMMENTS_START]: (state) => {
      return {
         ...state,
         fetchNewData: true,
      };
   },

   [types.GET_NEW_COMMENTS_COMPLETED]: (state, action) => {
      const res = action.payload;
      return {
         ...state,
         commentsData: {
            ...res,
            data: [...state.commentsData.data, ...res.data],
         },
         fetchNewData: false,
      };
   },

   [types.GET_COMMENTS_FAILED]: (state) => {
      return {
         ...state,
         fetchNewData: false,
      };
   },

   // CREATE NEW COMMENT
   [types.CREATE_COMMENT_START]: (state) => {
      return {
         ...state,
      };
   },
   [types.CREATE_COMMENT_COMPLETED]: (state, action) => {
      let newComments = [];
      const newComment = action.payload;
      newComment.new = true;
      if (newComment.parent_id) {
         newComments = state.commentsData.data.map(comment => {
            if (comment.id === newComment.parent_id) {
               return {
                  ...comment,
                  childs: [
                     newComment,
                     ...comment.childs,
                  ],
               };
            }
            return comment;
         });
      } else {
         newComments = [newComment, ...state.commentsData.data];
      }
      return {
         ...state,
         commentsData: {
            ...state.commentsData,
            data: newComments,
         },
      };
   },
   [types.CREATE_COMMENT_FAILED]: (state) => {
      return {
         ...state,
      };
   },

   // DELETE COMMENT
   [types.DELETE_COMMENT_START]: (state) => {
      return {
         ...state,
      };
   },
   [types.DELETE_COMMENT_COMPLETED]: (state, action) => {
      const { id, parentId } = action.payload;
      let newComments = [];
      if (parentId) {
         newComments = state.commentsData.data.map(comment => {
            if (comment.id === parentId) {
               const childs = comment.childs.filter(child => child.id != id);
               return {
                  ...comment,
                  childs,
               };
            }
            return comment;
         });
      } else {
         newComments = state.commentsData.data.filter(comment => {
            return comment.id != id;
         });
      }
      return {
         ...state,
         commentsData: {
            ...state.commentsData,
            data: newComments,
         },
      };
   },
   [types.DELETE_COMMENT_FAILED]: (state) => {
      return {
         ...state,
      };
   },

   // TOGGLE LIKE COMMENT
   [types.TOGGLE_LIKE_COMMENT_START]: (state) => {
      return {
         ...state,
      };
   },
   [types.TOGGLE_LIKE_COMMENT_COMPLETED]: (state, action) => {
      const { id, parentId } = action.payload;
      let newComments = [];
      if (parentId) {
         newComments = state.commentsData.data.map(comment => {
            if (comment.id === parentId) {
               const childs = comment.childs.map(child => {
                  let likesCount = child.likes_count;
                  if (child.id === id) {
                     likesCount = child.liked ? child.likes_count - 1 : child.likes_count + 1;
                  }
                  return {
                     ...child,
                     liked: child.id === id ? !child.liked : child.liked,
                     likes_count: likesCount,
                  };
               });
               return {
                  ...comment,
                  childs,
               };
            }
            return comment;
         });
      } else {
         newComments = state.commentsData.data.map(comment => {
            let likesCount = comment.likes_count;
            if (comment.id === id) {
               likesCount = comment.liked ? comment.likes_count - 1 : comment.likes_count + 1;
            }
            return {
               ...comment,
               liked: comment.id === id ? !comment.liked : comment.liked,
               likes_count: likesCount,
            };
         });
      }
      return {
         ...state,
         commentsData: {
            ...state.commentsData,
            data: newComments,
         },
      };
   },
   [types.TOGGLE_LIKE_COMMENT_FAILED]: (state) => {
      return {
         ...state,
      };
   },

   // SOCKET ACTIONS
   // CREATE
   [types.SEND_COMMENT]: (state, action) => {
      let newComments = [];
      const newComment = action.payload;
      newComment.new = true;
      if (newComment.parent_id) {
         newComments = state.commentsData.data.map(comment => {
            if (comment.id === newComment.parent_id) {
               return {
                  ...comment,
                  childs: [
                     ...comment.childs,
                     newComment,
                  ],
               };
            }
            return comment;
         });
      } else {
         newComments = [newComment, ...state.commentsData.data];
      }
      return {
         ...state,
         commentsData: {
            ...state.commentsData,
            data: newComments,
         },
      };
   },
   // DELETE
   [types.DELETE_COMMENT]: (state, action) => {
      const { id, parentId } = action.payload;
      let newComments = [];
      if (parentId) {
         newComments = state.commentsData.data.map(comment => {
            if (comment.id === parentId) {
               const childs = comment.childs.filter(child => child.id != id);
               return {
                  ...comment,
                  childs,
               };
            }
            return comment;
         });
      } else {
         newComments = state.commentsData.data.filter(comment => {
            return comment.id != id;
         });
      }
      return {
         ...state,
         commentsData: {
            ...state.commentsData,
            data: newComments,
         },
      };
   },
   // LIKE COMMENT
   [types.LIKE_COMMENT]: (state, action) => {
      const { id, parentId, likesCount } = action.payload;
      let newComments = [];
      if (parentId) {
         newComments = state.commentsData.data.map(comment => {
            if (comment.id === parentId) {
               const childs = comment.childs.map(child => {
                  return {
                     ...child,
                     likes_count: child.id == id ? likesCount : child.likes_count,
                  };
               });
               return {
                  ...comment,
                  childs,
               };
            }
            return comment;
         });
      } else {
         newComments = state.commentsData.data.map(comment => {
            if (comment.id === id) {
               return {
                  ...comment,
                  likes_count: likesCount,
               };
            }
            return comment;
         });
      }
      return {
         ...state,
         commentsData: {
            ...state.commentsData,
            data: newComments,
         },
      };
   },
   //

   // RESET
   [types.RESET_COMMENTS_NEW_FIELD]: (state) => {
      const newComments = state.commentsData.data.map(comment => {
         const childs = comment.childs.map(child => {
            return {
               ...child,
               new: false,
            };
         });
         return {
            ...comment,
            childs,
            new: false,
         };
      });
      return {
         ...state,
         commentsData: {
            ...state.commentsData,
            data: newComments,
         },
      };
   },

   [types.SET_DELETED_STATUS]: (state, action) => {
      const id = action.payload;
      const newComments = state.commentsData.data.map(comment => {
         if (comment.id == id) {
            const childs = comment.childs.map(child => {
               return {
                  ...child,
                  delete: true,
               };
            });
            return {
               ...comment,
               childs,
               delete: true,
            };
         }
         const childs = comment.childs.map(child => {
            if (child.id == id) {
               return {
                  ...child,
                  delete: true,
               };
            }
            return child;
         });
         return {
            ...comment,
            childs,
         };
      });

      return {
         ...state,
         commentsData: {
            ...state.commentsData,
            data: newComments,
         },
      };
   },
};

export default createReducer(initialState)(reducersMap);
