import * as types from './types';

export const getStudentCertificatesStart = () => ({
   type: types.GET_STUDENTCERTIFICATES_START,
});

export const getStudentCertificatesCompleted = (data) => ({
   type: types.GET_STUDENTCERTIFICATES_COMPLETED,
   payload: data,
});

export const getStudentCertificatesFailed = (errors) => ({
   type: types.GET_STUDENTCERTIFICATES_FAILED,
   payload: errors,
});
