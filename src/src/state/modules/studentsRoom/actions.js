import * as types from './types';


export const getCourseStart = () => ({
   type: types.GET_COURSE_START,
});

export const getCourseCompleted = (data, preview, isMembership, isPlaylist) => ({
   type: (isMembership || isPlaylist) ? types.GET_VIDEOCOURSE_COMPLETED : types.GET_COURSE_COMPLETED,
   payload: {
      data,
      preview,
      isMembership,
      isPlaylist,
   },
});

export const getCourseFailed = (errors) => ({
   type: types.GET_COURSE_FAILED,
   payload: {
      errors,
   },
});

export const changeZoomSettingsComplete = (data) => {
   return {
      type: types.SET_ZOOM_SETTINGS_COMPLETE,
      payload: {
         data,
      },
   };
};

export const getLessonStart = () => ({
   type: types.GET_LESSON_START,
});

export const getLessonCompleted = (data, isPlaylist) => ({
   type: isPlaylist ? types.GET_VIDEO_COMPLETED : types.GET_LESSON_COMPLETED,
   payload: {
      data,
      isPlaylist,
   },
});

export const getLessonFailed = (errors) => ({
   type: types.GET_LESSON_FAILED,
   payload: {
      errors,
   },
});

export const setLessonComplete = (lessonId) => ({
   type: types.SET_LESSON_COMPLATE,
   payload: {
      lessonId,
   },
});
export const setIsComplateCompleted = (bool) => ({
   type: types.SET_IS_COMPLATE_COMPLATE,
   payload: bool,
});

export const courseFinishedComplated = (payload) => ({
   type: types.COURSE_FINISHED_COMPLATED,
   payload,
});

export const meetingBookStart = () => ({
   type: types.MEETING__BOOK__START,
});

export const meetingBookCompleted = (lessonId, meetingId) => ({
   type: types.MEETING__BOOK__COMPLETED,
   payload: {
      blockId: lessonId,
      meetingId,
   },
});
export const meetingBookEnd = () => ({
   type: types.MEETING__BOOK__END,
});
