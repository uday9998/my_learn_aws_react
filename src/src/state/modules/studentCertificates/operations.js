import { getStudentCertificatesData } from 'api/AuthApi';
import * as action from 'state/modules/studentCertificates/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';

export const getStudentCertificatesOperation = () => {
   return async (dispatch) => {
      dispatch(action.getStudentCertificatesStart());
      try {
         const {
            data,
         } = await getStudentCertificatesData();
         dispatch(action.getStudentCertificatesCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getStudentCertificatesFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};
