import * as types from './types';

const siteDetailsInitStart = () => ({
   type: types.SITE_DETAILS_INIT_START,
});

const siteDetailsInitCompleted = ({
   user,
   app,
   mainApp,
   siteInfo,
   metas,
   uncheckedSteps,
}) => ({
   type: types.SITE_DETAILS_INIT_COMPLETED,
   payload: {
      user,
      app,
      mainApp,
      metas,
      siteInfo,
      uncheckedSteps,
   },
});

const siteDetailsInitFailed = () => ({
   type: types.SITE_DETAILS_INIT_FAILED,
});

const resetCommonDetails = () => ({
   type: types.RESET_COMMON_DETAILS,
});

const changeAuth = (data) => ({
   type: types.CHANGE_AUTH_INFORMATION,
   payload: data,
});

const updateGoogleId = (id) => ({
   type: types.GOOGLE_ID_UPDATE_COMPLETED,
   payload: id,
});

const updateUserSocket = (socket) => ({
   type: types.UPDATE_USER_SOCKET,
   payload: socket,
});

const updateOnlineList = (list) => ({
   type: types.UPDATE_ONLINE_LIST,
   payload: list,
});

const answerOnboardingQuestionStart = () => ({
   type: types.ANSWER_ONBOARDING_QUESTION_START,
});

const answerOnboardingQuestionCompleted = (isLast) => ({
   type: types.ANSWER_ONBOARDING_QUESTION_COMPLETED,
   payload: isLast,
});

const answerOnboardingQuestionFailed = () => ({
   type: types.ANSWER_ONBOARDING_QUESTION_FAILED,
});

const allQuestionsAnswered = () => ({
   type: types.ALL_QUESTIONS_ANSWERED,
});

const screenResize = (screenWidth) => ({
   type: types.SCREEN_RESIZE,
   payload: {
      screenWidth,
   },
});

const makeSiteNotInited = () => ({
   type: types.MAKE_SITE_NOT_INITED,
});

const updateSiteInfoActiveSchoolRoom = (data = {}) => ({
   type: types.UPDATE_SITE_INFO_ACTIVE_SCHOOL_ROOM,
   payload: data,
});

const updatePortalSections = (body) => {
   return {
      type: types.UPDATE_PORTAL_SECTIONS,
      payload: body,
   };
};

const updatePortalSettingsAndSections = (body) => {
   return {
      type: types.UPDATE_PORTAL_SETTINGS_SECTIONS,
      payload: body,
   };
};

export {
   siteDetailsInitStart,
   resetCommonDetails,
   siteDetailsInitCompleted,
   siteDetailsInitFailed,
   changeAuth,
   updateGoogleId,
   updateUserSocket,
   updateOnlineList,
   answerOnboardingQuestionStart,
   answerOnboardingQuestionCompleted,
   answerOnboardingQuestionFailed,
   allQuestionsAnswered,
   screenResize,
   makeSiteNotInited,
   updateSiteInfoActiveSchoolRoom,
   updatePortalSections,
   updatePortalSettingsAndSections,
};
