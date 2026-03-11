import * as types from './types';

export const getTransactionsStart = () => ({
   type: types.GET_TRANSACTIONS_START,
});
export const getTransactionsCompleted = (data) => ({
   type: types.GET_TRANSACTIONS_COMPLETED,
   payload: {
      data,
   },
});
export const getTransactionsFailed = (errors) => ({
   type: types.GET_TRANSACTIONS_FAILED,
   payload: {
      errors,
   },
});

export const searchTransactionsStart = () => ({
   type: types.SEARCH_TRANSACTIONS_START,
});
export const searchTransactionsCompleted = (data) => ({
   type: types.SEARCH_TRANSACTIONS_COMPLETED,
   payload: {
      data,
   },
});
export const searchTransactionsFailed = (errors) => ({
   type: types.SEARCH_TRANSACTIONS_FAILED,
   payload: {
      errors,
   },
});


export const getTransactionsPaginationStart = () => ({
   type: types.GET_TRANSACTIONS_PAGINATION_START,
});
export const getTransactionsPaginationCompleted = (data) => ({
   type: types.GET_TRANSACTIONS_PAGINATION_COMPLETED,
   payload: {
      data,
   },
});
export const getTransactionsPaginationFailed = (errors) => ({
   type: types.GET_TRANSACTIONS_PAGINATION_FAILED,
   payload: {
      errors,
   },
});
