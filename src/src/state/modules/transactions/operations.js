import { getTransactions } from 'api/AuthApi';
import * as action from 'state/modules/transactions/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';


export const getTransactionsOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.getTransactionsStart());
      try {
         const {
            data,
         } = await getTransactions(params);

         dispatch(action.getTransactionsCompleted(data));
      } catch (error) {
         dispatch(action.getTransactionsFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const searchTransactionsOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.searchTransactionsStart());
      try {
         const {
            data,
         } = await getTransactions(params);
         dispatch(action.searchTransactionsCompleted(data));
      } catch (error) {
         dispatch(action.searchTransactionsFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const getTransactionsPaginationOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.getTransactionsPaginationStart());
      try {
         const {
            data,
         } = await getTransactions(params);

         dispatch(action.getTransactionsPaginationCompleted(data));
      } catch (error) {
         dispatch(action.getTransactionsPaginationFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
