import * as types from './types';

export const getVideosStart = () => ({
   type: types.GET_VIDEOS_START,
});

export const getVideosCompleted = (data) => ({
   type: types.GET_VIDEOS_COMPLETED,
   payload: data,

});

export const getVideosFailed = (errors) => ({
   type: types.GET_VIDEOS_FAILED,
   payload: errors,
});
export const deleteVideoStart = () => ({
   type: types.DELETE_VIDEOS_START,
});

export const deleteVideoCompleted = (data) => ({
   type: types.DELETE_VIDEOS_COMPLETED,
   payload: data,

});

export const deleteVideoFailed = (errors) => ({
   type: types.DELETE_VIDEOS_FAILED,
   payload: errors,
});
export const fetchDataByFilterStart = () => ({
   type: types.FETCH_BY_FILTER_START,
});

export const fetchDataByFilterCompleted = (data) => ({
   type: types.FETCH_BY_FILTER_COMPLETED,
   payload: data,

});

export const fetchDataByFilterFailed = (errors) => ({
   type: types.FETCH_BY_FILTER_FAILED,
   payload: errors,
});
