import {
   getAllFrontCourses, getTags, getAutomations, saveTrigger, addTrigger,
   createDefaultAutomation, getAutomation, updateAutomation, deleteAutomation,
   addAction, saveAction, deleteAction, deleteTrigger, reorderAction, getAllMembers,
   getAllCoupons, getAllSortedCourses, getAllSortedMembers, getPublishedQuizzes,
} from 'api/AuthApi';
import * as action from 'state/modules/automation/actions';
import { toast } from 'react-toastify';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import isPrint from '../designCourse/edit/Error';

export const getAllFrontCoursesOperation = () => {
   return async (dispatch) => {
      dispatch(action.getAllFrontCoursesStart());
      try {
         const { data } = await getAllFrontCourses();
         dispatch(action.getAllFrontCoursesCompleted(data));
      } catch (error) {
         dispatch(action.getAllFrontCoursesFailed(error.response && error.response.data));
      }
   };
};

export const getAllSortedCoursesOperation = (isOnline) => {
   return async (dispatch) => {
      dispatch(action.getAllSortedCoursesStart());
      try {
         const { data } = await getAllSortedCourses(isOnline);
         dispatch(action.getAllsortedCoursesCompleted(data));
      } catch (error) {
         dispatch(action.getAllsortedCoursesFailed(error.response && error.response.data));
      }
   };
};

export const getAllMembersOperation = () => {
   return async (dispatch) => {
      dispatch(action.getAllMembersStart());
      try {
         const { data } = await getAllMembers();
         dispatch(action.getAllMembersCompleted(data));
      } catch (error) {
         dispatch(action.getAllMembersFailed(error.response && error.response.data));
      }
   };
};

export const getAllSortedMembersOperation = () => {
   return async (dispatch) => {
      dispatch(action.getAllSortedMembersStart());
      try {
         const { data } = await getAllSortedMembers();
         dispatch(action.getAllSortedMembersCompleted(data));
      } catch (error) {
         dispatch(action.getAllSortedMembersFailed(error.response && error.response.data));
      }
   };
};


export const getTagsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getTagsStart());
      try {
         const { data } = await getTags();
         dispatch(action.getTagsCompleted(data));
      } catch (error) {
         dispatch(action.getTagsFailed(error.response && error.response.data));
      }
   };
};

export const getAllCouponsOperation = () => {
   return async (dispatch) => {
      dispatch(action.getAllCouponsStart());
      try {
         const { data } = await getAllCoupons();
         dispatch(action.getAllCouponsCompleted(data));
      } catch (error) {
         dispatch(action.getAllCouponsFailed(error.response && error.response.data));
      }
   };
};

export const getAutomationsOperation = (params, isDidMount) => {
   return async (dispatch) => {
      dispatch(action.getAutomationsStart());
      try {
         const { data } = await getAutomations(params);
         dispatch(action.getAutomationsCompleted(data, isDidMount));
      } catch (error) {
         dispatch(action.getAutomationsFailed(error.response && error.response.data));
      }
   };
};


export const deleteAutomationOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.deleteAutomationStart(id));
      try {
         await deleteAutomation(id);
         if (isPrint('The automation is deleted successfully.')) {
            toast.success('The automation is deleted successfully.');
         }
         dispatch(action.deleteAutomationCompleted(id));
      } catch (error) {
         dispatch(action.deleteAutomationFailed(error.response && error.response.data));
      }
   };
};


export const createAutomationOperation = (title) => {
   return async (dispatch) => {
      try {
         const { data: { id } } = await createDefaultAutomation(title);
         dispatch(push(`${ Router.route('ADMIN_AUTOMATION_EDIT').getCompiledPath({ id }) }`));
         if (isPrint('Automation has been created.')) {
            toast.success('Automation has been created.');
         }
      } catch (error) {
         if (error?.response?.data) {
            return error.response.data;
            // ErrorPrinter(error.response);
         }
      }
   };
};


export const getAutomationOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.getAutomationStart());
      try {
         const { data } = await getAutomation(id);
         dispatch(action.getAutomationCompleted(data));
      } catch (error) {
         dispatch(action.getAutomationFailed(error.response && error.response.data));
      }
   };
};


export const updateAutomationOperation = (id, inputs) => {
   return async (dispatch) => {
      dispatch(action.updateAutomationStart());
      try {
         await updateAutomation(id, inputs);
         if (isPrint('Automation has been updated.')) {
            toast.success('Automation has been updated.');
         }
         dispatch(action.updateAutomationCompleted(id, inputs));
      } catch (error) {
         dispatch(action.updateAutomationFailed(error.response && error.response.data));
         if (error.response && error.response.data && error.response.data.errors && error.response.data.errors) {
            const errorName = error.response.data.errors;
            if (error.response.status !== 401) {
               if (errorName.name && errorName.name[1]) {
                  if (isPrint(errorName.name[1])) {
                     toast.error(errorName.name[1]);
                  }
               }
               if (errorName.name && errorName.name[0]) {
                  if (isPrint(errorName.name[0])) {
                     toast.error(errorName.name[0]);
                  }
               }
            }
         }
      }
   };
};

export const addTriggerOperation = (id, inputs, callback) => {
   return async (dispatch) => {
      dispatch(action.addTriggerStart());
      try {
         const { data } = await addTrigger(id, inputs);
         if (isPrint('Trigger has been added.')) {
            toast.success('Trigger has been added.');
         }
         dispatch(action.addTriggerCompleted(data));
         if (callback) {
            callback(data);
         }
      } catch (error) {
         dispatch(action.addTriggerFailed(error.response && error.response.data));
      }
   };
};


export const saveTriggerOperation = (id, inputs) => {
   return async (dispatch) => {
      dispatch(action.saveTriggerStart());
      try {
         await saveTrigger(id, inputs);
         if (isPrint('Trigger has been saved.')) {
            toast.success('Trigger has been saved.');
         }
         dispatch(action.saveTriggerCompleted(inputs.id, inputs));
      } catch (error) {
         dispatch(action.saveTriggerFailed(error.response && error.response.data));
      }
   };
};


export const addActionOperation = (id, inputs, actionIds, actionIndex) => {
   return async (dispatch) => {
      dispatch(action.addActionStart());
      try {
         const { data } = await addAction(id, inputs);
         const reorderedActionIds = [
            ...actionIds.slice(0, actionIndex + 1),
            data.id,
            ...actionIds.slice(actionIndex + 1),
         ];
         await reorderAction(id, reorderedActionIds);
         dispatch(action.addActionCompleted(data, actionIndex));
      } catch (error) {
         dispatch(action.addActionFailed(error.response && error.response.data));
      }
   };
};

export const deleteActionOperation = (id, actionId) => {
   return async (dispatch) => {
      dispatch(action.deleteActionStart());
      try {
         await deleteAction(id, actionId);
         if (isPrint('Action has been deleted.')) {
            toast.success('Action has been deleted.');
         }
         dispatch(action.deleteActionCompleted(actionId));
      } catch (error) {
         dispatch(action.deleteActionFailed(error.response && error.response.data));
      }
   };
};

export const deleteTriggerOperation = (id, triggerId) => {
   return async (dispatch) => {
      dispatch(action.deleteTriggerStart());
      try {
         await deleteTrigger(id, triggerId);
         if (isPrint('Trigger has been deleted.')) {
            toast.success('Trigger has been deleted.');
         }
         dispatch(action.deleteTriggerCompleted(triggerId));
      } catch (error) {
         dispatch(action.deleteTriggerFailed(error.response && error.response.data));
      }
   };
};


export const saveActionOperation = (id, inputs, actionId, isDelete, actionIds, actionIndex, newAction) => {
   return async (dispatch) => {
      dispatch(action.saveActionStart());
      try {
         const { data } = await saveAction(id, inputs);
         if (isDelete) {
            if (isPrint('Action has been deleted.')) {
               toast.success('Action has been deleted.');
            }
         } else if (isPrint('Action has been saved.')) {
            toast.success('Action has been saved.');
         }
         const reorderedActionIds = [
            ...actionIds.slice(0, actionIndex + 1),
            data.id,
            ...actionIds.slice(actionIndex + 1),
         ];
         await reorderAction(id, reorderedActionIds);
         dispatch(action.saveActionCompleted(inputs.id, inputs, actionId, actionIndex, newAction));
      } catch (error) {
         dispatch(action.saveActionFailed(error.response && error.response.data));
      }
   };
};


export const getAllQuizzesOperation = () => {
   return async (dispatch) => {
      dispatch(action.getPublishedQuizzesStart());
      try {
         const { data } = await getPublishedQuizzes();
         dispatch(action.getPublishedQuizzesCompleted(data));
      } catch (error) {
         dispatch(action.getPublishedQuizzesFailed(error.response && error.response.data));
      }
   };
};
