import {
   getCertificatesData, getCertificatesByIdData, updateCertificate,
   createCertificate, deleteCertificate, getCoursesForNewCertificate,
   deleteCertificates,
   multiDuplicateCertificate,
   publishDraftCertificate,
   getCourses,
} from 'api/AuthApi';
import * as action from 'state/modules/certificates/actions';
import { toast } from 'react-toastify';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import isPrint from '../designCourse/edit/Error';

export const getCertificateOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.getCertificateStart());
      try {
         const {
            data,
         } = await getCertificatesData(params);
         dispatch(action.getCertificateCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getCertificateFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong')) {
                  toast.error('Something went wrong');
               }
            }
         }
      }
   };
};
export const getCertificateByIdOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.getCertificateByIdStart());
      try {
         const {
            data,
         } = await getCertificatesByIdData(id);
         dispatch(action.getCertificateByIdCompleted(id, data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getCertificateByIdFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong')) {
                  toast.error('Something went wrong');
               }
            }
         }
      }
   };
};

export const createCertificateOperation = (params) => {
   return async (dispatch) => {
      try {
         const {
            data,
         } = await createCertificate(params);
         dispatch(action.createCertificateCompleted(data));
         if (isPrint('Certificate created successfully.')) {
            toast.success('Certificate created successfully.');
         }
      } catch (error) {
         if (error.response && error.response.data && error.response.data.errors) {
            if (isPrint(error.response.data.errors.name[0])) {
               toast.error(error.response.data.errors.name[0]);
            }
            dispatch(action.createCertificateFailed(error.response.data));
         }
      }
   };
};


export const updateCertificateOperation = (id, params) => {
   document.querySelector('.ubdate-certificate').setAttribute('disabled', 'disabled');
   return async (dispatch) => {
      try {
         await updateCertificate(id, params);
         document.querySelector('.ubdate-certificate').removeAttribute('disabled');
         dispatch(action.updateCertificateCompleted(id, params));
         if (isPrint('Certificate updated successfully.')) {
            toast.success('Certificate updated successfully.');
         }
         dispatch(push(Router.route('ADMIN_CERTIFICATES').getCompiledPath()));
      } catch (error) {
         document.querySelector('.ubdate-certificate').removeAttribute('disabled');
         if (error.response) {
            dispatch(action.updateCertificateFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong')) {
                  toast.error('Something went wrong');
               }
            }
         }
      }
   };
};

export const getCoursesForNewCertificateOperation = () => {
   return async (dispatch) => {
      dispatch(action.getCoursesForCertificateStart());
      try {
         const {
            data,
         } = await getCoursesForNewCertificate();
         dispatch(action.getCoursesForCertificateCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getCoursesForCertificateFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong')) {
                  toast.error('Something went wrong');
               }
            }
         }
      }
   };
};

export const deleteCertificateOperation = (id, name) => {
   return async (dispatch) => {
      dispatch(action.deleteCertificateStart());
      try {
         await deleteCertificate(id);
         dispatch(action.deleteCertificateCompleted(id, name));
         await getCoursesForNewCertificateOperation()(dispatch);
         if (isPrint('Certificate deleted successfully.')) {
            toast.success('Certificate deleted successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteCertificateFailed(error.response && error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong')) {
                  toast.error('Something went wrong');
               }
            }
         }
      }
   };
};

export const deleteCertificatesOperation = (data) => {
   return async (dispatch) => {
      dispatch(action.deleteCertificatesStart());
      try {
         await deleteCertificates(data);
         await getCertificateOperation({ searchName: 'recently' })(dispatch);
         await getCoursesForNewCertificateOperation()(dispatch);
         dispatch(action.deleteCertificatesCompleted());
         const count = data.length === 1 ? 'Certificate' : 'Certificates';
         if (isPrint(`${ count } deleted successfully.`)) {
            toast.success(`${ count } deleted successfully.`);
         }
      } catch (error) {
         dispatch(action.deleteCertificatesFailed());
      }
   };
};

export const duplicateCertificateOperation = (ids) => {
   return async dispatch => {
      try {
         const { data } = await multiDuplicateCertificate(ids);
         if (isPrint('Certificate duplicated successfully.')) {
            toast.success('Certificate duplicated successfully.');
         }
         dispatch(action.duplicateCertificateCompleted(data));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong')) {
               toast.error('Something went wrong');
            }
         }
      }
   };
};


export const statusChangeCertificateOperation = (id, type) => {
   return async dispatch => {
      try {
         await publishDraftCertificate(id, type);
         if (isPrint('Certificate updated successfully.')) {
            toast.success('Certificate updated successfully.');
         }
         dispatch(action.statusChangeCertificate(id));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Certificate cannot be published.')) {
               toast.error('Certificate cannot be published.');
            }
         }
      }
   };
};
