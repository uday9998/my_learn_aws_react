import { setPrimaryColors } from 'utils/pageBuilder/schoolRoomColor';
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.SITE_DETAILS_INIT_START]: (state) => {
      return {
         ...state,
         authUser: null,
         isSiteInited: false,
      };
   },
   [types.SITE_DETAILS_INIT_COMPLETED]: (state, action) => {
      const {
         payload: {
            user,
            app,
            mainApp,
            siteInfo,
            metas,
            uncheckedSteps,
         },
      } = action;
      if (window.location.pathname.indexOf('admin') === -1) {
         document.querySelector('html').style.setProperty('background-color', '#FBFAFF');
      }
      let formatedCustomLinks = [];
      if (siteInfo.custom_links && siteInfo.custom_links.items) {
         const { custom_links: { items: customLinks = [] } = {} } = siteInfo || { items: [] };
         formatedCustomLinks = customLinks.map(link => {
            if (link.href && !link.href.startsWith('http://') && !link.href.startsWith('https://')) {
               return { ...link, href: `https://${ link.href }` };
            }
            return link;
         });
      }

      return {
         ...state,
         isSiteInited: true,
         authUser: user,
         app,
         metas,
         mainApp,
         uncheckedSteps,
         siteInfo: { ...siteInfo, custom_links: { items: formatedCustomLinks }, ...window.previewData },
      };
   },
   [types.SITE_DETAILS_INIT_FAILED]: (state) => {
      return {
         ...state,
         isSiteInited: true,
      };
   },
   [types.RESET_COMMON_DETAILS]: (state) => {
      if (state.socket && state.socket.id) {
         state.socket.emit('offline', { 'user': state.authUser });
         state.socket.disconnect();
      }
      return {
         ...initialState,
      };
   },
   [types.CHANGE_AUTH_INFORMATION]: (state, action) => {
      return {
         ...state,
         authUser: {
            ...state.authUser,
            ...action.payload,
         },
      };
   },

   [types.GOOGLE_ID_UPDATE_COMPLETED]: (state, action) => {
      return {
         ...state,
         siteInfo: {
            ...state.siteInfo,
            google_site_verify_id: action.payload,
         },
      };
   },
   [types.UPDATE_USER_SOCKET]: (state, action) => {
      return {
         ...state,
         socket: action.payload,
      };
   },
   [types.UPDATE_ONLINE_LIST]: (state, action) => {
      return {
         ...state,
         onlineUsers: action.payload,
      };
   },
   [types.ANSWER_ONBOARDING_QUESTION_START]: (state) => {
      return {
         ...state,
         isOnboardingLoading: true,
      };
   },
   [types.ANSWER_ONBOARDING_QUESTION_COMPLETED]: (state, action) => {
      const isLast = action.payload;
      return {
         ...state,
         isOnboardingLoading: false,
         app: {
            ...state.app,
            checked_steps: isLast ? 1 : 0,
         },
      };
   },
   [types.ANSWER_ONBOARDING_QUESTION_FAILED]: (state) => {
      return {
         ...state,
         isOnboardingLoading: false,
      };
   },
   [types.ALL_QUESTIONS_ANSWERED]: (state) => {
      return {
         ...state,
         app: {
            ...state.app,
            checked_steps: 1,
         },
      };
   },
   [types.SCREEN_RESIZE]: (state, action) => {
      return {
         ...state,
         screenWidth: action.payload.screenWidth,
      };
   },
   [types.MAKE_SITE_NOT_INITED]: (state) => {
      return {
         ...state,
         isSiteInited: false,
      };
   },
   [types.UPDATE_SITE_INFO_ACTIVE_SCHOOL_ROOM]: (state, action) => {
      let newSiteInfo = null;

      if (state.siteInfo.active_school_room.id === action.payload.id) {
         newSiteInfo = {
            ...state.siteInfo,
            active_school_room: {
               ...state.siteInfo.active_school_room,
               ...action.payload,
            },
         };

         setPrimaryColors(newSiteInfo);
      }
      

      const newAllSchoolRoom = state.siteInfo.all_school_room.map(temp => {
         if (temp.id === action.payload.id) {
            return {
               ...temp,
               ...action.payload,
            };
         }

         return temp;
      });

      return {
         ...state,
         siteInfo: {
            ...state.siteInfo,
            active_school_room: newSiteInfo ? newSiteInfo.active_school_room : state.siteInfo.active_school_room,
            all_school_room: newAllSchoolRoom,
         },
      };
   },

   [types.UPDATE_PORTAL_SECTIONS]: (state, action) => {
      return {
         ...state,
         siteInfo: {
            ...state.siteInfo,
            landing_data: [...action.payload.sections],
         },
      };
   },

   [types.UPDATE_PORTAL_SETTINGS_SECTIONS]: (state, action) => {
      let newSiteInfo = null;
      if (action.payload.school_room_landing.id === state.siteInfo.active_school_room.id) {
         newSiteInfo = {
            ...state.siteInfo,
            active_school_room: {
               ...state.siteInfo.active_school_room,
               ...action.payload.school_room_landing,
            },
         };

         setPrimaryColors(newSiteInfo);
      }
      
      const newAllSchoolRoom = state.siteInfo.all_school_room.map(el => {
         if (el.id === action.payload.school_room_landing.id) {
            return {
               ...el,
               ...action.payload.school_room_landing,
            };
         }

         return el;
      });

      return {
         ...state,
         siteInfo: {
            ...state.siteInfo,
            active_school_room: newSiteInfo ? newSiteInfo.active_school_room : state.siteInfo.active_school_room,
            all_school_room: newAllSchoolRoom,
            landing_data: [...action.payload.sections],
         },
      };
   },
};

export default createReducer(initialState)(reducersMap);
