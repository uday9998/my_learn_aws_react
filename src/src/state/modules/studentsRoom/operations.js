import {
   getStudentsRoomCourse, getStudentsRoomLesson, setStudentsRoomLessonComplete, setCourseComplete, setZoomSpot,
   enrollMemberToFreeOffer,
} from 'api/AuthApi';
import * as action from 'state/modules/studentsRoom/actions';
import { toast } from 'react-toastify';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import { portalId } from 'utils/constants';
import isPrint from '../designCourse/edit/Error';

export const getCourseOperation = (courseName, preview, isMembership, isPlaylist, planId) => {
   return async (dispatch) => {
      dispatch(action.getCourseStart());
      try {
         if (planId) {
            await enrollMemberToFreeOffer(planId);
         }
         const { data } = await getStudentsRoomCourse(courseName, isMembership, isPlaylist);
         // if (data.landing_url && !data.pivot && !localStorage.authToken) {
         // const redirectUrl = `/p/${ data.landing_url }`;
         // window.location.href = redirectUrl;
         // }
         if (!data) {
            dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
         }
         if (data.pivot && data.pivot.status === 2) {
            dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
         } else {
            dispatch(action.getCourseCompleted(data, preview, isMembership, isPlaylist));
         }
         // if (callback) {
         //    const finalCourse = { ...data };
         //    if (preview === 'success' && finalCourse.theme && window.previewTheme) {
         //       finalCourse.is_rated_on = window.previewTheme.isRatedChecked;
         //       finalCourse.theme.name = window.previewTheme.themeName;
         //       finalCourse.theme.themesparts = window.previewTheme.themesParts;
         //       finalCourse.rated_courses = window.previewTheme.ratedCourses;
         //       delete window.previewTheme;
         //    }
         //    callback(finalCourse);
         // }
         return data;
      } catch (error) {
         if (error.response) {
            dispatch(action.getCourseFailed(error.response.data));
         }
         if (error.response && error.response.status === 401) {
            window.location.href = '/portal/membership';
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const getLessonOperation = (courseName, lessonId, isPlaylist) => {
   return async (dispatch) => {
      dispatch(action.getLessonStart());
      try {
         if (!isPlaylist) {
            const { data } = await getStudentsRoomLesson(courseName, lessonId);
            let newData = data;
            if (data && !data.id) {
               newData = { drip_days: data, is_driplesson: 1 };
            }
            dispatch(action.getLessonCompleted(newData));
         } else if (isPlaylist) {
            setTimeout(() => {
               dispatch(action.getLessonCompleted({ id: lessonId }, isPlaylist));
            }, 0);
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.getLessonFailed(error.response.data));
         }
         if (error.response.status === 401) {
            window.location.href = '/portal/membership';
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const setZoomSettings = (data) => {
   return (dispatch) => {
      dispatch(action.changeZoomSettingsComplete(data));
   };
};


export const setLessonCompleteOperation = (courseName, lessonId) => {
   return async (dispatch) => {
      try {
         await setStudentsRoomLessonComplete(courseName, lessonId);
         dispatch(action.setLessonComplete(lessonId));
         const { data } = await getStudentsRoomCourse(courseName);
         dispatch(action.getCourseCompleted(data));
      } catch (error) {
         if (error.response && error.response.data && error.response.data.error) {
            if (isPrint(error.response.data.error)) {
               toast.error(error.response.data.error);
            }
         } else if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};

export const setCourseCompleteOperation = (courseId) => {
   return async (dispatch) => {
      try {
         const { data } = await setCourseComplete(courseId);
         dispatch(action.courseFinishedComplated(data.hasCourseCertificate));
      } catch (error) {
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};

export const setBookedMeeting = (lessonId, meetingId) => {
   return async (dispatch) => {
      try {
         dispatch(action.meetingBookStart());
         await setZoomSpot(lessonId, meetingId);
         dispatch(action.meetingBookCompleted(lessonId, meetingId));
      } catch (error) {
         dispatch(action.meetingBookEnd());
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};
