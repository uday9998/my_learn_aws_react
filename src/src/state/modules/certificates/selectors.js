import { createSelector } from 'reselect';

const innerStateSelector = state => state.certificates;

export const isFetchingDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.isFetchingData)
);

export const certificatesSelector = createSelector(
   innerStateSelector,
   (state) => (state.certificates)
);

export const certificatesCoursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.courses)
);

export const certifacteTempSelector = createSelector(
   innerStateSelector,
   (state) => (state.certifacteTemp)
);

export const certificateSelector = createSelector(
   innerStateSelector,
   (state) => (state.certificate)
);

export const coursesForCertificateSelector = createSelector(
   innerStateSelector,
   (state) => (state.coursesForCertificate)
);
