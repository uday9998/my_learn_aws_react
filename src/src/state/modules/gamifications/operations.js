/* eslint-disable no-lonely-if */
import {
   getGamifications, createGamifications, deleteGamifications, updateGamifications,
} from 'api/AuthApi';
import * as action from 'state/modules/gamifications/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';


export const getGamificationsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getGamificationsActionStart());
      try {
         const {
            data,
         } = await getGamifications();
         dispatch(action.getGamificationsActionCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getGamificationsActionFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const createGamificationsOperation = (inputs) => {
   document.querySelector('.badge-save').setAttribute('disabled', 'disabled');
   return async (dispatch) => {
      dispatch(action.createGamificationsActionStart());
      try {
         const {
            data,
         } = await createGamifications(inputs);
         document.querySelector('.badge-save').removeAttribute('disabled');
         dispatch(action.createGamificationsActionCompleted(data));
         if (isPrint('A badge has been created')) {
            toast.success('A badge has been created');
         }
      } catch (error) {
         document.querySelector('.badge-save').removeAttribute('disabled');
         dispatch(action.createGamificationsActionFailed(error.response && error.response.data));
         if (error.response) {
            if (error.response.status !== 401) {
               if (isPrint('Please add all the fields')) {
                  toast.error('Please add all the fields');
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const updateGamificationsOperation = (id, inputs) => {
   return async (dispatch) => {
      dispatch(action.updateGamificationsStart());
      try {
         const { data } = await updateGamifications(id, inputs);
         dispatch(action.updateGamificationsCompleted(id, data[0]));
         if (isPrint('A badge has been updated')) {
            toast.success('A badge has been updated');
         }
      } catch (error) {
         dispatch(action.updateGamificationsFailed(error.response && error.response.data));
         if (error.response) {
            if (error.response.status !== 401) {
               if (isPrint('Please add all the fields')) {
                  toast.error('Please add all the fields');
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const deleteGamificationsOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.deleteGamificationsActionStart());
      try {
         await deleteGamifications(id);
         dispatch(action.deleteGamificationsActionCompleted(id));
         if (isPrint('Badge has been deleted')) {
            toast.success('Badge has been deleted');
         }
      } catch (error) {
         dispatch(action.deleteGamificationsActionFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
