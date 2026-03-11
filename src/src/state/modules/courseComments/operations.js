/* eslint-disable no-unused-vars */
import {
   getCourseComments,
   createCourseComment,
   getCourseNewComments,
   deleteCourseComment,
   toggleLikeCourseComment,
} from 'api/AuthApi';
import * as action from 'state/modules/courseComments/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';


export const getCommentsOperation = (courseName, data) => {
   return (dispatch) => {
      dispatch(action.getCommentsStart());
      getCourseComments(courseName, data).then(response => {
         dispatch(action.getCommentsCompleted(response.data));
      }).catch(error => {
         dispatch(action.getCommentsFailed(error));
      });
   };
};

export const getNewCommentsOperation = (courseName, param) => {
   return (dispatch) => {
      dispatch(action.getNewCommentsStart());
      getCourseNewComments(courseName, param).then(response => {
         dispatch(action.getNewCommentsCompleted(response.data));
      }).catch(error => {
         dispatch(action.getNewCommentsFailed(error));
      });
   };
};

export const createCommentOperation = (data, adminMode = false) => {
   return (dispatch) => {
      dispatch(action.createCommentStart());
      createCourseComment(data).then(response => {
         dispatch(action.createCommentCompleted(response.data));
         if (adminMode) {
            if (isPrint('The comment has been published')) {
               toast.success('The comment has been published');
            }
         }
      }).catch(error => {
         dispatch(action.createCommentFailed(error));
         if (error.response.status !== 401) {
            if (isPrint('Please add a comment')) {
               toast.error('Please add a comment');
            }
         }
      });
   };
};

export const deleteCommentOperation = (courseName, id, parentId = null) => {
   return (dispatch) => {
      dispatch(action.deleteCommentStart());
      deleteCourseComment(courseName, id).then(response => {
         dispatch(action.deleteCommentCompleted(id, parentId));
      }).catch(error => {
         dispatch(action.deleteCommentFailed(error));
      });
   };
};

export const toggleLikeCommentOperation = (courseName, id, parentId = null) => {
   return (dispatch) => {
      dispatch(action.toggleLikeCommentStart());
      toggleLikeCourseComment(courseName, id).then(response => {
         dispatch(action.toggleLikeCommentCompleted(id, parentId));
      }).catch(error => {
         dispatch(action.toggleLikeCommentFailed(error));
      });
   };
};
