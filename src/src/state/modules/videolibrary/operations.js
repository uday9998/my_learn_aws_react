import {
   getVideosLibraryData,
   deleteVideo,
} from 'api/AuthApi';
import * as action from 'state/modules/videolibrary/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';


export const getVideosOperation = () => {
   return async (dispatch) => {
      dispatch(action.getVideosStart());
      try {
         const {
            data,
         } = await getVideosLibraryData();
         dispatch(action.getVideosCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getVideosFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const deleteVideoOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.deleteVideoStart());
      try {
         await deleteVideo(id);
         dispatch(action.deleteVideoCompleted(id));
         if (isPrint('Your Video has been deleted.')) {
            toast.success('Your Video has been deleted.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteVideoFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const onVideosByFilterOperation = (query) => {
   return async (dispatch) => {
      dispatch(action.fetchDataByFilterStart());
      try {
         const {
            data,
         } = await getVideosLibraryData(query);
         dispatch(action.fetchDataByFilterCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.fetchDataByFilterFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
