import { answerOnboardingQuestion, initSiteDetails, updateGoogleVerifyId } from 'api/AuthApi';
import { getSiteBuilderInfo, resendCode } from 'api/GuestApi';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { toast } from 'react-toastify';
import { ErrorPrinter } from 'utils/error';
import { setPrimaryColors } from 'utils/pageBuilder/schoolRoomColor';
import {
   siteDetailsInitStart,
   siteDetailsInitCompleted,
   changeAuth,
   updateGoogleId,
   answerOnboardingQuestionStart,
   answerOnboardingQuestionCompleted,
   answerOnboardingQuestionFailed,
} from './actions';
import isPrint from '../designCourse/edit/Error';

export const siteDetailsInitOperation = (callback) => {
   // eslint-disable-next-line consistent-return
   return async (dispatch) => {
      dispatch(siteDetailsInitStart());
      if (!Auth.isTokenExists()) {
         try {
            const { data } = await getSiteBuilderInfo();
            document.title = data.title;
            setPrimaryColors(data);
            setTimeout(() => {
               dispatch(siteDetailsInitCompleted({
                  user: null,
                  siteInfo: data,
               }));
            });
         } catch ({ response }) {
            if (response?.data && response?.data['ip-blocked']) {
               dispatch(push({
                  pathname: Router.route('BLOCKED_IP').getMask(),
               }));
               return null;
            }
            const { data } = await getSiteBuilderInfo();
            setPrimaryColors(data);
            return dispatch(siteDetailsInitCompleted({
               user: null,
               siteInfo: data,
            }));
         }
      } else {
         try {
            const {
               data: {
                  user,
                  app,
                  // eslint-disable-next-line camelcase
                  main_app,
                  metas,
                  // eslint-disable-next-line camelcase
                  unchecked_steps,
               },
            } = await initSiteDetails();
            const { data } = await getSiteBuilderInfo();
            setPrimaryColors(data);
            document.title = data.title;
            if (callback) {
               callback(user);
            }
            return dispatch(siteDetailsInitCompleted({
               user,
               app,
               mainApp: main_app,
               siteInfo: data,
               metas,
               uncheckedSteps: unchecked_steps,
            }));
         } catch ({ response }) {
            if (response && response.data && response.data['ip-blocked']) {
               dispatch(push({
                  pathname: Router.route('BLOCKED_IP').getMask(),
               }));
               return null;
            }
            const { data } = await getSiteBuilderInfo();
            setPrimaryColors(data);
            return dispatch(siteDetailsInitCompleted({
               user: null,
               siteInfo: data,
            }));
         }
      }
   };
};


export const changeAuthFromMyAccount = (data) => {
   return (dispatch) => {
      dispatch(changeAuth(data));
   };
};

export const updateGoogleVerificationAccount = (id) => {
   return async (dispatch) => {
      try {
         await updateGoogleVerifyId(id);
         dispatch(updateGoogleId(id));
         if (isPrint('Changes saved successfuly.')) {
            toast.success('Changes saved successfuly.');
         }
      } catch (error) {
         ErrorPrinter(error.response);
      }
   };
};

export const answerOnboardingQuestionOperation = (data, callback, isLast = false) => {
   return async dispatch => {
      try {
         dispatch(answerOnboardingQuestionStart());
         await answerOnboardingQuestion(data);
         if (callback) {
            callback();
         }
         dispatch(answerOnboardingQuestionCompleted(isLast));
      } catch (error) {
         ErrorPrinter(error.response);
         dispatch(answerOnboardingQuestionFailed());
      }
   };
};

export const resendCodeOperation = (data, callback) => {
   return async () => {
      try {
         await resendCode(data);
         if (callback) {
            callback();
         }
         if (isPrint('Email has been sent.')) {
            toast.success('Email has been sent.');
         }
      } catch (error) {
         ErrorPrinter(error.response);
      }
   };
};
