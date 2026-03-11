import { createSelector } from 'reselect';

const innerStateSelector = state => state.studentCertificates;

export const studentCertificatesSelector = createSelector(
   innerStateSelector,
   (state) => (state.studentCertificates)
);

export const isFetchingDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.isFetchingData)
);
