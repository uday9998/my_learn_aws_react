import {
   addTag,
   attachTagToMember,
   removeTag,
   updateTag,
   getTags,
} from 'api/AuthApi';
import * as action from 'state/modules/tags/actions';
import { updateCurrentMemberTags } from 'state/modules/members/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';

export const getTagsOperation = () => {
   return async (dispatch) => {
      dispatch(action.tagsInitStart());
      try {
         const data = await getTags();
         dispatch(action.tagsInitCompleted(data));
      } catch (error) {
         dispatch(action.tagsInitFailed());
      }
   };
};

export const addTagOperation = (data, cb) => {
   return async (dispatch) => {
      try {
         const newData = await addTag(data);
         dispatch(action.tagsCreateCompleted(newData.data));
         if (cb) {
            await cb(newData.data, dispatch);
         }
         if (isPrint('Tag has been created.')) {
            toast.success('Tag has been created.');
         }
      } catch (error) {
         if (error.response && error.response.status === 422) {
            const { data: { errors: { name } = [] } = {} } = error.response;
            if (isPrint(name.join(' '))) {
               toast.error(name.join(' '));
            }
         }
      }
   };
};

export const updateTagOperation = (id, data) => {
   return async (dispatch) => {
      try {
         await updateTag(id, data);
         dispatch(action.updateTagCompleted(id, data));
         if (isPrint('Tag updated successfully')) {
            toast.success('Tag updated successfully');
         }
      } catch (error) {
         if (error.response && error.response.status === 422) {
            const { data: { errors: { name } = [] } = {} } = error.response;
            if (isPrint(name.join(' '))) {
               toast.error(name.join(' '));
            }
         }
      }
   };
};

export const removeTagOperation = (id, attachedTags, cb) => {
   return async (dispatch) => {
      try {
         await removeTag(id);
         dispatch(action.removeTagCompleted(id));
         if (typeof cb === 'function') {
            await cb(id);
         }
         if (isPrint('Tag removed successfully')) {
            toast.success('Tag removed successfully');
         }
      } catch (error) {
         if (error.response && error.response.status === 422) {
            if (isPrint('The categories field is required.')) {
               toast.error('The categories field is required.');
            }
         }
      }
   };
};
