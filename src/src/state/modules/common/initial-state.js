const initialState = {
   isSiteInited: false,
   authUser: null,
   siteInfo: {},
   app: {},
   mainApp: {},
   metas: {},
   socket: {},
   onlineUsers: [],
   uncheckedSteps: [],
   isOnboardingLoading: false,
   screenWidth: typeof window === 'object' ? window.innerWidth : null,
};

export default initialState;
