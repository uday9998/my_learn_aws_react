import {
   getLessonComments,
   searchLessonComments,
   deleteComments,
   restoreComments,
   markComments,
   getCommentReplies,
   replyComment,
} from 'api/AuthApi';
import { toast } from 'react-toastify';
import * as actions from 'state/modules/comments/actions';
import { ErrorPrinter } from 'utils/error';
import { filterCourseComments } from 'utils/filterComments';
import isPrint from '../designCourse/edit/Error';


export const getCommentsOperation = (courseId, tab, sortingVersion, newSortVersion) => {
   return async (dispatch) => {
      dispatch(actions.getCommentsStart());
      try {
         const { data } = await getLessonComments(courseId, tab, sortingVersion);

         dispatch(actions.getCommentsCompleted(filterCourseComments(data), newSortVersion));
      } catch (error) {
         dispatch(actions.getCommentsFailed());
         ErrorPrinter(error.response);
      }
   };
};

export const searchCommentsOperation = (courseId, searchText, tab) => {
   return async dispatch => {
      dispatch(actions.searchCommentsStart());
      try {
         const { data } = await searchLessonComments(courseId, searchText, tab);
         dispatch(actions.searchCommentsCompleted(data));
      } catch (error) {
         ErrorPrinter(error.response);
         dispatch(actions.searchCommentsFailed());
      }
   };
};

export const commentChangesOperation = (changeType, ids, courseId, successMessage, refreshParams) => {
   return async dispatch => {
      dispatch(actions.commentChangesStart());
      try {
         switch (changeType) {
            case 'delete':
               await deleteComments(courseId, ids);
               break;
            case 'restore':
               await restoreComments(courseId, ids);
               break;
            case 'mark':
               await markComments(courseId, ids);
               break;
            default:
               return;
         }
         if (refreshParams.search.length > 0) {
            searchCommentsOperation(courseId, refreshParams.search, refreshParams.tab)(dispatch);
         } else {
            getCommentsOperation(courseId, refreshParams.tab, refreshParams.sort, refreshParams.newSort)(dispatch);
         }
         if (isPrint(successMessage)) {
            toast.success(successMessage);
         }
      } catch (error) {
         ErrorPrinter(error.response);
      }
   };
};

export const getCommentOperation = (courseId, id) => {
   return async dispatch => {
      dispatch(actions.getCommentStart());
      try {
         const { data } = await getCommentReplies(courseId, id);
         dispatch(actions.getCommentCompleted(data));
      } catch (error) {
         ErrorPrinter(error.response);
         dispatch(actions.getCommentFailed());
      }
   };
};

export const replyCommentOperation = (courseId, commentId, text) => {
   return async dispatch => {
      dispatch(actions.replyCommentStart());
      try {
         const { data } = await replyComment(courseId, commentId, text);
         // getCommentOperation(courseId, commentId)(dispatch);
         //  if (isPrint('Changes saved successfully.')) {
         //     toast.success('Changes saved successfully.');
         //  }
         dispatch(actions.replyCommentCompleted(data));
      } catch (error) {
         dispatch(actions.replyCommentFailed());
         ErrorPrinter(error.response);
      }
   };
};


export const replyCommentsOperation = (courseId, commentId, text, refreshParams) => {
   return async dispatch => {
      dispatch(actions.replyCommentStart());
      try {
         await replyComment(courseId, commentId, text);
         getCommentOperation(courseId, commentId)(dispatch);
         //  if (isPrint('Changes saved successfully.')) {
         //     toast.success('Changes saved successfully.');
         //  }
         if (refreshParams.search.length > 0) {
            searchCommentsOperation(courseId, refreshParams.search, refreshParams.tab)(dispatch);
         } else {
            getCommentsOperation(courseId, refreshParams.tab, refreshParams.sort, refreshParams.newSort)(dispatch);
         }
         dispatch(actions.replyCommentCompleted());
      } catch (error) {
         dispatch(actions.replyCommentFailed());
         ErrorPrinter(error.response);
      }
   };
};

export const socketAddCommentOperation = (data, isFromFeed) => {
   return dispatch => {
      dispatch(actions.socketAddComment(data, isFromFeed));
   };
};
