import { createSelector } from 'reselect';

const innerStateSelector = state => state.transactions;


export const transactionsSelector = createSelector(
   innerStateSelector,
   (state) => (state.transactions)
);

export const getTransactionsInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getTransactionsInProgress)
);

export const totalSelector = createSelector(
   innerStateSelector,
   (state) => (state.total)
);


export const getTransactionsPaginationInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getTransactionsPaginationInProgress)
);
