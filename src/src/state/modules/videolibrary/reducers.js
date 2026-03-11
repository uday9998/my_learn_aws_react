/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {

   [types.GET_VIDEOS_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },

   [types.GET_VIDEOS_COMPLETED]: (state, action) => {
      const { payload } = action;
      if (payload.data.length) {
         payload.data = payload.data.filter(video => video.lesson_format !== 'youtube' && video.lesson_format !== 'wistia' && video.lesson_format !== 'vimeo');
         payload.data = payload.data.filter((video, index, self) => self.findIndex(v => v.src === video.src) === index);
         payload.total = payload.data.length;
      }

      return {
         ...state,
         videos: payload,
         isFetchingData: false,

      };
   },

   [types.GET_VIDEOS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },
   [types.FETCH_BY_FILTER_START]: (state) => {
      return {
         ...state,
         isFetchingDataByFilter: true,
      };
   },

   [types.FETCH_BY_FILTER_COMPLETED]: (state, action) => {
      const { payload } = action;
      if (payload.data.length) {
         payload.data = payload.data.filter(video => video.lesson_format !== 'youtube' && video.lesson_format !== 'wistia' && video.lesson_format !== 'vimeo');
         payload.data = payload.data.filter((video, index, self) => self.findIndex(v => v.src === video.src) === index);
         payload.total = payload.data.length;
      }


      return {
         ...state,
         videos: payload,
         isFetchingDataByFilter: false,

      };
   },

   [types.FETCH_BY_FILTER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingDataByFilter: false,
         errors,
      };
   },
   [types.DELETE_VIDEOS_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.DELETE_VIDEOS_COMPLETED]: (state, action) => {
      const { payload } = action;

      const data = state.videos.data.filter(element => element.id !== payload);
      return {
         ...state,
         videos: {
            ...state.videos,
            total: payload.total,
            data,
         },
      };
   },

   [types.DELETE_VIDEOS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },


};


export default createReducer(initialState)(reducersMap);
