import { toast } from 'react-toastify';
import { getEmailTrackingData, filterEmailTrackingData, getEmailCSV } from 'api/AuthApi';
import * as actions from './actions';
import isPrint from '../designCourse/edit/Error';

export function GetEmailTrackingOperation() {
   return async (dispatch) => {
      dispatch(actions.getEmailDataStart());
      try {
         await getEmailTrackingData();
         dispatch(actions.getEmailDataCompleted({}));
      } catch (error) {
         dispatch(actions.getEmailDataFailed());
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
}

export function filterEmailTrackingOperation(inputs) {
   return async (dispatch) => {
      dispatch(actions.filterStart());
      try {
         const { data } = await filterEmailTrackingData({
            name: inputs.name,
            from_date: inputs.searchFrom,
            to_date: inputs.searchTo,
         });
         dispatch(actions.filterCompleted(data));
      } catch (error) {
         dispatch(actions.filterFailed());
      }
   };
}

export function exportCsvEmailOperation() {
   return async (dispatch) => {
      dispatch(actions.filterStart());
      try {
         const data = await getEmailCSV();
         dispatch(actions.filterFailed());
      } catch (error) {
         dispatch(actions.filterFailed());
      }
   };
}
