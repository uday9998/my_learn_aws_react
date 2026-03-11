import {
   getMediaLibraryData, updateMediaName, deleteMedia, createMedia, updateMediaResourceName, deleteMediaResourceName,
   getTags, addTag, getFolders, addFolder, MediaBulkDelete, duplicateFolderMedia, filterMedia, getLabels, createLabel,
   getFoldersByType,
   updateFolderName,
} from 'api/AuthApi';
import * as action from 'state/modules/mediaLibrary/actions';
import { toast } from 'react-toastify';
import { getFileSizeInfoOperation } from '../settings/operations';
import isPrint from '../designCourse/edit/Error';


export const getMedias = (params) => {
   return async (dispatch) => {
      dispatch(action.getMediasStart(params.isFilter));
      try {
         const {
            data,
         } = await getMediaLibraryData(params);
         dispatch(action.getMediasCompleted(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getMediasFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const updateMediaNameOperation = (params) => {
   return async (dispatch) => {
      try {
         if (params.isTitle) {
            await updateMediaResourceName(params);
            dispatch(action.updateMediaNameCompleted(params.src, params.title, 'title'));
         } else {
            await updateMediaName(params);
            dispatch(action.updateMediaNameCompleted(params.src, params.name, 'name'));
         }
         dispatch(action.setMediasMode({}));
      } catch (error) {
         if (error.response) {
            dispatch(action.updateMediaNameFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};
export function getFoldersData(type, callback) {
   return async (dispatch) => {
      dispatch(action.getFoldersStart());
      try {
         const { data } = type === 'all' ? await filterMedia('') : type ? await getFoldersByType(type) : await getFolders();
         dispatch(action.getFoldersCompleted(data, type));

         if (callback) {
            callback(type);
         }
      } catch (error) {
         if (error.response) {
            const { errors } = error.response.data;
            if (errors && errors.name && errors.name[0]) {
               if (isPrint(errors.name[0])) {
                  toast.error(errors.name[0]);
               }
            }
            dispatch(action.getFoldersFailed());
         } else if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
}
export function filterFolders(query) {
   return async (dispatch) => {
      dispatch(action.getFoldersStart());
      try {
         const res = await filterMedia(query);
         dispatch(action.filterCompleted(res.data));
      } catch ({ response }) {
         const { errors } = response.data;
         dispatch(action.getFoldersFailed());
         if (errors && errors.name && errors.name[0]) {
            if (isPrint(errors.name[0])) {
               toast.error(errors.name[0]);
            }
         }
      }
   };
}

export const CreateMediaOperation = (params, format, currentType) => {
   return async (dispatch) => {
      try {
         if (format !== 'video') {
            await createMedia(params);
         }
         let type = 'file';
         if (format === 'video') {
            type = 'video';
         }

         if (type === currentType || currentType === 'all') {
            await filterFolders(`?fileType=${ currentType }`)(dispatch);
         }

         //  dispatch(action.createMediaCompleted(data, format));
         dispatch(getFileSizeInfoOperation());
      } catch (error) {
         if (error.response) {
            dispatch(action.createMediaFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const deleteMediaOperation = (params) => {
   return async (dispatch) => {
      try {
         if (params.isTitle) {
            await deleteMediaResourceName(params);
            dispatch(action.deleteMediaCompleted(params.src, 'title'));
         } else {
            await deleteMedia(params);
            dispatch(action.deleteMediaCompleted(params.src, 'name'));
         }
         dispatch(action.setMediasMode({}));
      } catch (error) {
         if (error.response) {
            dispatch(action.getMediasFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const getTagsForMedia = () => {
   return async (dispatch) => {
      dispatch(action.getTagsStart());
      try {
         const { data } = await getTags();
         dispatch(action.getTagsCompleted(data));
      } catch (error) {
         dispatch(action.getTagsFailed());
      }
   };
};

export const addTagOperation = (name) => {
   return async (dispatch) => {
      dispatch(action.setTagsStart());
      try {
         const { data } = await addTag({ name });
         dispatch(action.setTagsCompleted(data));
         if (isPrint('The tag has been added.')) {
            toast.success('The tag has been added.');
         }
      } catch ({ response }) {
         const { errors } = response.data;
         if (errors && errors.name && errors.name[0]) {
            if (isPrint(errors.name[0])) {
               toast.error(errors.name[0]);
            }
         }
         dispatch(action.setTagsFailed());
      }
   };
};


export function addFolderOperation(inputs) {
   return async (dispatch) => {
      dispatch(action.addFolderStart());
      try {
         const { data } = await addFolder(inputs);
         // await getFoldersData()(dispatch);
         if (isPrint('The folder has been added.')) {
            toast.success('The folder has been added.');
         }
         dispatch(action.addFolderCompleted(data));
      } catch ({ response }) {
         dispatch(action.addFolderFailed());

         const { errors } = response.data;

         if (errors?.name.length) {
            return errors.name;
         }

         return '';
      }
   };
}

export function bulkDeleteMedia(folderIds, filesIds) {
   return async (dispatch) => {
      dispatch(action.bulkDeleteStart());
      try {
         const data = {
            folders_id: folderIds,
            files_id: filesIds && filesIds.id && filesIds.id.length === 0 ? [] : filesIds,
         };
         await MediaBulkDelete(data);
         if (isPrint('The selected items has been deleted.')) {
            toast.success('The selected items has been deleted.');
         }
         dispatch(action.bulkDeleteCompleted(data));
      } catch ({ response }) {
         const { errors } = response.data;
         if (errors && errors.name && errors.name[0]) {
            if (isPrint(errors.name[0])) {
               toast.error(errors.name[0]);
            }
         }
         dispatch(action.bulkDeleteFailed());
      }
   };
}

export function duplicateFolder(id) {
   return async (dispatch) => {
      dispatch(action.duplicateStart());
      try {
         await duplicateFolderMedia(id);
         const { data } = await getFolders();
         if (isPrint('Folder duplicated successfully.')) {
            toast.success('Folder duplicated successfully.');
         }
         dispatch(action.duplicateCompleted(data));
      } catch ({ response }) {
         const { errors } = response.data;
         if (errors && errors.name && errors.name[0]) {
            if (isPrint(errors.name[0])) {
               toast.error(errors.name[0]);
            }
         }
         dispatch(action.duplicateFailed());
      }
   };
}

export function getLabelsOperation() {
   return async (dispatch) => {
      dispatch(action.getLabelsStart());
      try {
         const { data } = await getLabels();
         dispatch(action.getLabelsCompleted(data));
      } catch ({ response }) {
         const { errors } = response.data;
         if (errors && errors.name && errors.name[0]) {
            if (isPrint(errors.name[0])) {
               toast.error(errors.name[0]);
            }
         }
         dispatch(action.getFoldersFailed());
      }
   };
}

export function createLabelOperation(name) {
   return async (dispatch) => {
      dispatch(action.createLabelStart());
      try {
         const { data } = await createLabel({ name });
         if (isPrint('The label has been added.')) {
            toast.success('The label has been added.');
         }
         dispatch(action.createLabelCompleted(data));
      } catch ({ response }) {
         const { errors } = response.data;
         if (errors && errors.name && errors.name[0]) {
            if (isPrint(errors.name[0])) {
               toast.error(errors.name[0]);
            }
         }
         dispatch(action.createLabelFailed());
      }
   };
}

export function updateFolderNameOperation(id, folderName, callback) {
   return async (dispatch) => {
      try {
         dispatch(action.updateFolderNameStart());
         await updateFolderName(id, { folderName });
         dispatch(action.updateFolderNameCompleted(id, folderName));
         if (callback) {
            callback();
         }
         toast.success('Folder has been renamed');
      } catch (error) {
         if (error.response.data.message) {
            toast.error(error.response.data.message);
         } else {
            toast.error('Something went wrong');
         }
      }
   };
}
