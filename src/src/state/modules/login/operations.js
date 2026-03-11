import {
   login, forgotPassword, resetPassword, registerStudent,
} from 'api/GuestApi';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { portalId } from 'utils/constants';
import { enrollMemberToFreeOffer } from 'api'; 
import {
   loginStart, loginCompleted, loginFailed, forgotPasswordStart, forgotPasswordCompleted, forgotPasswordFailed,
   resetPasswordStart, resetPasswordCompleted, resetPasswordFailed,
   registerStudentStart, registerStudentCompleted, registerStudentFailed,
} from './actions';
import isPrint from '../designCourse/edit/Error';
import { makeSiteNotInited } from '../common/actions';

const loginStartOperation = (inputs, path) => {
   return async (dispatch) => {
      dispatch(loginStart());
      try {
         const {
            data: {
               token,
               role,
               showIntroVideo,
               user,
            },
         } = await login(inputs);
         const courseId = localStorage.getItem('courseId');
         if (courseId) {
            enrollMemberToFreeOffer(courseId);
            localStorage.removeItem('courseId');
         }
         if (showIntroVideo) {
            window.showIntro = true;
         }
         Auth.setToken(token);
         dispatch(loginCompleted());
         dispatch(makeSiteNotInited());
         if (path && window.location.search.includes('community_id')) {
            dispatch(push(`${ Router.route('FRONT_COMMUNITY').getCompiledPath({ id: path }) }`));
            return;
         }
         if (user && user.is_affiliate && window.location.pathname === '/affiliate/login') {
            window.location = '/affiliate/dashboard';
            return;
         }
         switch (role) {
            case 'admin':
               dispatch(push({
                  pathname: Router.route('ADMIN_DASHBOARD').getMask(),
                  state: { role: 'admin' },
               }));
               break;
            case 'sub-admin':
            case 'assistant':
            case 'support':
               dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
               break;
            case 'member':
               if (path) {
                  dispatch(push(`/courses?course=${ path }`));
               } else {
                  const portalName = localStorage.getItem('isOnlineCourse');
                  if (portalName) {
                     dispatch(push(`portal/${ portalName }`));
                     localStorage.removeItem('isOnlineCourse');
                  } else {
                     dispatch(push(`${ Router.route('OFFERS').getCompiledPath(portalId) }`));
                  }
               }

               break;

            default:
               break;
         }
      } catch (error) {
         const errorData = error.response?.data;
         const errorMessage = errorData?.error;

         if (errorMessage && errorData.isVerify === false) {
            if (isPrint(errorMessage)) {
               toast.error(errorMessage);
            }

            dispatch(loginFailed(true));
            return;
         }

         if (errorMessage) {
            return { generalError: [errorMessage] };
         }

         const errorMessages = error.response?.data?.errors;
         dispatch(loginFailed({}));

         if (errorMessages) {
            return errorMessages;
         }

         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};

const forgotPasswordOperation = (email) => {
   return async (dispatch) => {
      dispatch(forgotPasswordStart());
      try {
         await forgotPassword(email);
         dispatch(forgotPasswordCompleted());
         dispatch(push(Router.route('LOGIN').getMask()));
         if (isPrint('We have e-mailed your password reset link.')) {
            toast.success('We have e-mailed your password reset link.');
         }
      } catch (error) {
         if (error.response) {
            if (error.response.data.errors && error.response.data.errors.email) {
               if (isPrint(error.response.data.errors.email[0])) {
                  toast.error(error.response.data.errors.email[0]);
               }
            }
         } else if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
         dispatch(forgotPasswordFailed({}));
      }
   };
};

const resetPasswordOperation = (data) => {
   return async (dispatch) => {
      dispatch(resetPasswordStart());
      try {
         await resetPassword(data);
         dispatch(resetPasswordCompleted());
         dispatch(push(Router.route('LOGIN').getMask()));
         if (isPrint('Your password changed successfully.')) {
            toast.success('Your password changed successfully.');
         }
      } catch (error) {
         if (error.response && error.response.data && error.response.data.errors) {
            const errorName = error.response.data.errors;
            if (errorName.email) {
               if (isPrint(errorName.email[0])) {
                  toast.error(errorName.email[0]);
               }
            }
            if (errorName.password) {
               if (isPrint(errorName.password[0])) {
                  toast.error(errorName.password[0]);
               }
               if ((errorName.password[1]) && isPrint(errorName.password[1])) {
                  toast.error(errorName.password[1]);
               }
            }
         } else if (error.response && error.response.data && error.response.data.email) {
            if (isPrint(error.response.data.email[0])) {
               toast.error(error.response.data.email[0]);
            }
         } else if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
         dispatch(resetPasswordFailed({}));
      }
   };
};

const registerStudentOperation = (data) => {
   return async (dispatch) => {
      dispatch(registerStudentStart());
      try {
         const query = queryString.parse(window.location.search.split('?')[1]);
         if (query.course && query.plan) {
            // eslint-disable-next-line no-param-reassign
            data = Object.assign(data, { course: query.course, plan: query.plan });
         }
         const res = await registerStudent(data);
         dispatch(registerStudentCompleted());
         if (res.data.checkout_url) {
            window.location.href = res.data.checkout_url;
            return;
         }
         dispatch(push({
            pathname: Router.route('LOGIN').getMask(),
            search: res.data.course_url && `course_url=${ res.data.course_url }`,
         }));
         if (isPrint('Account created successfully.')) {
            toast.success('Account created successfully.');
         }
      } catch (error) {
         dispatch(registerStudentFailed({}));
         const errorMessages = error.response?.data?.errors;

         if (errorMessages) {
            return errorMessages;
         }

         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};


export {
   loginStartOperation,
   forgotPasswordOperation,
   resetPasswordOperation,
   registerStudentOperation,
};
