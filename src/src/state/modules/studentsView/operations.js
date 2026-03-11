import { getCourseCheckout } from 'api/AuthApi';
import * as action from 'state/modules/studentsView/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';


export const getCourseCheckoutOperation = (courseId) => {
   return async (dispatch) => {
      dispatch(action.getCourseCheckoutStart());
      try {
         const {
            data,
         } = await getCourseCheckout(courseId);

         dispatch(action.getCourseCheckoutCompleted(data));
      } catch (error) {
         dispatch(action.getCourseCheckoutFailed(error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
