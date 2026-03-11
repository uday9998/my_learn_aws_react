const authUserSelector = (state) => {
   return state.common.authUser;
};

const authMetasSelector = (state) => {
   return state.common.metas;
};

const appSelector = (state) => {
   return state.common.app;
};

const mainAppSelector = (state) => {
   return state.common.mainApp;
};

const authUserRoleSelector = (state) => {
   if (state.common.authUser) {
      switch (parseInt(state.common.authUser.role, 10)) {
         case 0:
            return 'member';
         case 1:
            return 'admin';
         case 2:
            return 'sub-admin';
         case 3:
            return 'assistant';
         case 4:
            return 'support';
         default:
            break;
      }
   }
   return null;
};

const isSiteInitedSelector = (state) => {
   return state.common.isSiteInited;
};
const siteInfoSelector = (state) => {
   return state.common.siteInfo;
};

const onlineUsersSelector = (state) => {
   return state.common.onlineUsers;
};

const uncheckedStepsSelector = (state) => {
   return state.common.uncheckedSteps;
};

const isOnboardingLoadingSelector = (state) => {
   return state.common.isOnboardingLoading;
};

const screenWidthSelector = (state) => {
   return state.common.screenWidth;
};

export {
   authUserSelector,
   authUserRoleSelector,
   isSiteInitedSelector,
   siteInfoSelector,
   appSelector,
   mainAppSelector,
   authMetasSelector,
   onlineUsersSelector,
   uncheckedStepsSelector,
   isOnboardingLoadingSelector,
   screenWidthSelector,
};
