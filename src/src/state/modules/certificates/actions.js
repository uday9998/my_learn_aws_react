import * as types from './types';

export const getCertificateStart = () => ({
   type: types.GET_CERTIFICATE_START,
});

export const getCertificateCompleted = (data) => ({
   type: types.GET_CERTIFICATE_COMPLETED,
   payload: {
      data, count: data.allCount,
   },
});

export const getCertificateFailed = (errors) => ({
   type: types.GET_CERTIFICATE_FAILED,
   payload: errors,
});

export const getCertificateByIdStart = (data) => ({
   type: types.GET_CERTIFICATEBYID_START,
   payload: data,
});

export const getCertificateByIdCompleted = (id, data) => ({
   type: types.GET_CERTIFICATEBYID_COMPLETED,
   payload: { id, data },
});

export const getCertificateByIdFailed = (data) => ({
   type: types.GET_CERTIFICATEBYID_FAILED,
   payload: data,
});

export const setCertificateMode = (data) => ({
   type: types.SET_CERTIFICATE_MODE,
   payload: data,
});

export const updateCertificateCompleted = (id, name) => ({
   type: types.UPDATE_CERTIFICATE_COMPLETED,
   payload: { id, name },
});


export const deleteCertificateStart = () => ({
   type: types.DELETE_CERTIFICATE_START,
});

export const deleteCertificateCompleted = (id, name) => ({
   type: types.DELETE_CERTIFICATE_COMPLETED,
   payload: { id, name },
});

export const deleteCertificateFailed = (errors) => ({
   type: types.DELETE_CERTIFICATE_FAILED,
   payload: errors,
});


export const updateCertificateFailed = () => ({
   type: types.UPDATE_CERTIFICATE_FAILED,
});

export const createCertificateCompleted = (data) => ({
   type: types.CREATE_CERTIFICATE_COMPLETED,
   payload: { data },
});

export const createCertificateFailed = (error) => ({
   type: types.CREATE_CERTIFICATE_FAILED,
   payload: { error },
});

export const getDefaultCertificateByIdStart = () => ({
   type: types.GET_DEFAULTCERTIFICATEBYID_START,
   payload: {
      title: 'Certificate of Graduation',
      belowTitle: 'This certifies is awarded to',
      note: 'has pursued studies and completed all the requirements',
      courseName: 'Student Name',
      dateIssued: 'your date Issued',
      expiryDescription: 'your expiry description',
      signatureImg: '',
      penColor: '#2155cd',
   },
});


export const setInput = (key, value, target) => {
   return {
      type: types.SET_INPUT,
      payload: {
         key,
         value,
         target,
      },
   };
};

export const getCoursesForCertificateStart = () => ({
   type: types.GET_COURSESFORCERTIFICATES_START,
});

export const getCoursesForCertificateCompleted = (data) => ({
   type: types.GET_COURSESFORCERTIFICATES_COMPLETED,
   payload: { data },
});

export const getCoursesForCertificateFailed = (errors) => ({
   type: types.GET_COURSESFORCERTIFICATES_FAILED,
   payload: errors,
});

export const deleteCertificatesStart = () => ({
   type: types.DELETE_CERTIFICATES_START,
});

export const deleteCertificatesFailed = () => ({
   type: types.DELETE_CERTIFICATES_FAILED,
});

export const deleteCertificatesCompleted = () => ({
   type: types.DELETE_CERTIFICATES_COMPLETED,
});

export const duplicateCertificateCompleted = (data) => ({
   type: types.DUPLICATE_CERTIFICATE_COMPLETED,
   payload: data,
});

export const statusChangeCertificate = (id) => ({
   type: types.STATUS_CHANGE_CERTIFICATE,
   payload: id,
});
