/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {

   [types.GET_MEDIAS_START]: (state, action) => {
      const { payload: { isFilter } } = action;
      return {
         ...state,
         isFetchingData: true,
         changePageInProgress: isFilter,
      };
   },

   [types.GET_MEDIAS_COMPLETED]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         medias: payload.data || payload,
         mediaTypes: ['video', 'image', 'pdf', 'ppt', 'audio'],
         pagination: { perPage: payload.per_page, total: payload.total },
         isFetchingData: false,
         changePageInProgress: false,


      };
   },

   [types.GET_MEDIAS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         isFetchingData: false,
         errors,
      };
   },

   [types.SET_MEDIAS_MODE]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         mode: payload,
      };
   },

   [types.UPDATE_MEDIA_NAME_COMPLETED]: (state, action) => {
      const { payload: { src, name, titleName } } = action;
      const newMedias = state.medias.map(media => {
         if (media.src !== src) {
            return media;
         } if (media.src === src && media[titleName] === undefined) {
            return media;
         }
         return { ...media, [titleName]: name };
      });
      return {
         ...state,
         medias: newMedias,
         mode: {},
      };
   },
   [types.UPDATE_MEDIA_NAME_FAILED]: (state) => {
      return {
         ...state,
         mode: {},
      };
   },

   [types.DELETE_MEDIA_COMPLETED]: (state, action) => {
      const { payload: { src, titleName } } = action;
      const newMedias = [];
      state.medias.forEach(media => {
         if (media.src !== src) {
            newMedias.push(media);
         } if (media.src === src && media[titleName] === undefined) {
            newMedias.push(media);
         }
      });
      return {
         ...state,
         medias: newMedias,
      };
   },
   [types.SET_ACTIVE_TAB]: (state, action) => {
      const { payload: { tab } } = action;
      return {
         ...state,
         activeTab: tab,
      };
   },

   [types.CREATE_MEDIA_COMPLETED]: (state, action) => {
      const { payload: { data, format } } = action;
      if (format !== state.activeTab) {
         return { ...state };
      }
      return {
         ...state,
         medias: [data, ...state.medias],
      };
   },
   [types.GET_TAGS_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },
   [types.GET_TAGS_COMPLTED]: (state, action) => {
      return {
         ...state,
         tags: action.payload,
         isFetchingData: false,
      };
   },
   [types.GET_TAGS_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.SET_TAGS_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },
   [types.SET_TAGS_COMPLETED]: (state, action) => {
      const { payload } = action;
      return {
         ...state,
         isFetchingData: false,
         tags: [
            ...state.tags,
            payload,
         ],
      };
   },
   [types.SET_TAGS_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
         getProgress: false,
      };
   },
   [types.GET_FOLDERS_START]: (state) => {
      return {
         ...state,
         getProgress: true,
         isFetchingData: true,
      };
   },
   [types.GET_FOLDERS_COMPLETED]: (state, action) => {
      if (action.payload.type) {
         const folderWithTypes = { ...state.folderWithTypes };
         folderWithTypes[action.payload.type] = action.payload.data;
         return {
            ...state,
            folderWithTypes,
            folders: action.payload.data,
            isFetchingData: false,
            getProgress: false,
            folderCount: action.payload.data.length,
         };
      }
      return {
         ...state,
         folders: action.payload.data,
         getProgress: false,
         isFetchingData: false,
         folderCount: action.payload.data.length,
      };
   },
   [types.GET_FOLDERS_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.ADD_FOLDER_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },
   [types.ADD_FOLDER_COMPLETED]: (state, action) => {
      return {
         ...state,
         isFetchingData: false,
         folders: [
            ...state.folders,
            action.payload,
         ],
      };
   },
   [types.ADD_FOLDER_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.BULK_DELETE_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },
   [types.BULK_DELETE_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.BULK_DELETE_COMPLETED]: (state, action) => {
      const data = action.payload;

      let newFolders = [...state.folders];

      if (data.folders_id && data.folders_id.length > 0) {
         newFolders = newFolders.filter(fold => !data.folders_id.includes(fold.id));
      }

      if (data.files_id && Array.isArray(data.files_id) && data.files_id.length > 0) {
         newFolders = newFolders.map(fold => {
            return {
               ...fold,
               files: fold.files ? fold.files.filter(file => !data.files_id.some(f => f.id === file.id)) : null,
               videos: fold.videos ? fold.videos.filter(file => !data.files_id.some(f => f.id === file.id)) : null,
            };
         });
      } else if (data.files_id && data.files_id.id) {
         newFolders = newFolders.map(fold => {
            return {
               ...fold,
               files: fold.files ? fold.files.filter(file => file.id !== data.files_id.id) : null,
               videos: fold.videos ? fold.videos.filter(file => file.id !== data.files_id.id) : null,
            };
         });
      }

      return {
         ...state,
         isFetchingData: false,
         folders: newFolders,
         folderCount: newFolders.length,
      };
   },
   [types.DUPLICATE_FOLDER_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },
   [types.DUPLICATE_FOLDER_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.DUPLICATE_FOLDER_COMPLETED]: (state, action) => {
      return {
         ...state,
         isFetchingData: false,
         folders: action.payload,
         folderCount: action.payload.length,
      };
   },
   [types.GET_FILTERED_FOLTER_COMPLETED]: (state, action) => {
      return {
         ...state,
         folders: action.payload,
         getProgress: false,
         isFetchingData: false,
      };
   },
   [types.GET_LABELS_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },
   [types.GET_LABELS_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.GET_LABELS_COMPLETED]: (state, action) => {
      return {
         ...state,
         labels: action.payload,
         isFetchingData: false,
      };
   },
   [types.CREATE_LABEL_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },
   [types.CREATE_LABEL_COMPLETED]: (state, action) => {
      return {
         ...state,
         isFetchingData: false,
         labels: [
            ...state.labels,
            action.payload,
         ],
      };
   },
   [types.CREATE_LABEL_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.UPDATE_FOLDER_NAME_START]: (state) => {
      return {
         ...state,
         isFetchingUpdateFolderName: true,
      };
   },
   [types.UPDATE_FOLDER_NAME_COMPLETED]: (state, action) => {
      const { id, folderName } = action.payload;

      const newFolders = state.folders.map(folder => {
         const newFolder = { ...folder };
         if (id === newFolder.id) {
            newFolder.name = folderName;
         }
         return newFolder;
      });
      return {
         ...state,
         folders: newFolders,
         isFetchingUpdateFolderName: false,
      };
   },
};


export default createReducer(initialState)(reducersMap);
