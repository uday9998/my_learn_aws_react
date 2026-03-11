import * as types from './types';

export const getMediasStart = (isFilter) => ({
   type: types.GET_MEDIAS_START,
   payload: { isFilter },
});

export const getMediasCompleted = (data) => ({
   type: types.GET_MEDIAS_COMPLETED,
   payload: data,

});

export const setMediasMode = (data) => ({
   type: types.SET_MEDIAS_MODE,
   payload: data,
});


export const getMediasFailed = (errors) => ({
   type: types.GET_MEDIAS_FAILED,
   payload: errors,
});

export const updateMediaNameCompleted = (src, name, titleName) => ({
   type: types.UPDATE_MEDIA_NAME_COMPLETED,
   payload: { src, name, titleName },
});

export const deleteMediaCompleted = (src, titleName) => ({
   type: types.DELETE_MEDIA_COMPLETED,
   payload: { src, titleName },
});

export const updateMediaNameFailed = () => ({
   type: types.UPDATE_MEDIA_NAME_FAILED,
});

export const changeActiveTab = (tab) => ({
   type: types.SET_ACTIVE_TAB,
   payload: { tab },
});

export const createMediaCompleted = (data, format) => ({
   type: types.CREATE_MEDIA_COMPLETED,
   payload: { data, format },
});

export const createMediaFailed = (data) => ({
   type: types.CREATE_MEDIA_FAILED,
   payload: { data },
});

export const getTagsStart = () => ({
   type: types.GET_TAGS_START,
});

export const getTagsCompleted = (data) => ({
   type: types.GET_TAGS_COMPLTED,
   payload: data,
});

export const getTagsFailed = () => ({
   type: types.GET_TAGS_FAILED,
});

export const setTagsStart = () => ({
   type: types.SET_TAGS_START,
});

export const setTagsCompleted = (data) => ({
   type: types.SET_TAGS_COMPLETED,
   payload: data,
});

export const setTagsFailed = () => ({
   type: types.SET_TAGS_FAILED,
});

export const getFoldersStart = () => ({
   type: types.GET_FOLDERS_START,
});

export const getFoldersCompleted = (data, type) => ({
   type: types.GET_FOLDERS_COMPLETED,
   payload: { data, type },
});

export const getFoldersFailed = () => ({
   type: types.GET_FOLDERS_FAILED,
});


export const addFolderStart = () => ({
   type: types.ADD_FOLDER_START,
});

export const addFolderCompleted = (data) => ({
   type: types.ADD_FOLDER_COMPLETED,
   payload: data,
});

export const addFolderFailed = () => ({
   type: types.ADD_FOLDER_FAILED,
});


export const bulkDeleteStart = () => ({
   type: types.BULK_DELETE_START,
});

export const bulkDeleteCompleted = (data) => ({
   type: types.BULK_DELETE_COMPLETED,
   payload: data,
});

export const bulkDeleteFailed = () => ({
   type: types.BULK_DELETE_FAILED,
});


export const duplicateStart = () => ({
   type: types.DUPLICATE_FOLDER_START,
});

export const duplicateFailed = () => ({
   type: types.DUPLICATE_FOLDER_FAILED,
});

export const duplicateCompleted = (data) => ({
   type: types.DUPLICATE_FOLDER_COMPLETED,
   payload: data,
});

export const filterCompleted = (data) => ({
   type: types.GET_FILTERED_FOLTER_COMPLETED,
   payload: data,
});

export const getLabelsStart = () => ({
   type: types.GET_LABELS_START,
});

export const getLabelsCompleted = (data) => ({
   type: types.GET_LABELS_COMPLETED,
   payload: data,
});

export const getLabelsFailed = () => ({
   type: types.GET_LABELS_FAILED,
});

export const createLabelStart = () => ({
   type: types.CREATE_LABEL_START,
});

export const createLabelCompleted = (data) => ({
   type: types.CREATE_LABEL_COMPLETED,
   payload: data,
});

export const createLabelFailed = () => ({
   type: types.CREATE_LABEL_FAILED,
});

export const updateFolderNameStart = () => ({
   type: types.UPDATE_FOLDER_NAME_START,
});

export const updateFolderNameCompleted = (id, folderName) => ({
   type: types.UPDATE_FOLDER_NAME_COMPLETED,
   payload: { id, folderName },
});
