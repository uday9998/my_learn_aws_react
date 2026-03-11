import * as AuthApi from 'api/AuthApi';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';
import * as action from './actions';


export const getRevenueStatisticOperation = (courseId) => {
   return async (dispatch) => {
      dispatch(action.getRevenueStatisticStart());
      try {
         const { data } = await AuthApi.getRevenueStatistic(courseId);
         dispatch(action.getRevenueStatisticCompleted(data));
      } catch (error) {
         dispatch(action.getRevenueStatisticFailed(error.response && error.response.data));
         if (error.response && error.response.status && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const getGhostOperation = () => {
   return async (dispatch) => {
      dispatch(action.getGhostStart());
      try {
         const { data } = await AuthApi.getGhost();
         dispatch(action.getGhostCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getGhostFailed(error.response.data));
         }
      }
   };
};
export const getStepsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getStepsStart());
      try {
         const { data } = await AuthApi.getSteps();
         dispatch(action.getStepsCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getStepsFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getRevenueFilterStatisticOperation = (courseId) => {
   return async (dispatch) => {
      dispatch(action.getRevenueFilterStatisticStart());
      try {
         const { data } = await AuthApi.getRevenueStatistic(courseId);
         dispatch(action.getRevenueStatisticCompleted(data));
      } catch (error) {
         dispatch(action.getRevenueStatisticFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
