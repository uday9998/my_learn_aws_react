import * as AuthApi from 'api/AuthApi';
import { unsubscribeEmail } from 'api/GuestApi';
import * as action from 'state/modules/members/actions';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { ErrorPrinter } from 'utils/error';
import { portalId } from 'utils/constants';
import isPrint from '../designCourse/edit/Error';
import { getPlans } from '../plans/operations';

export const getMembersOperation = () => {
   return async (dispatch) => {
      dispatch(action.getMembersStart());
      try {
         const { data } = await AuthApi.getMembers({ count: 30 });
         await dispatch(getPlans(''));
         const tags = await AuthApi.getTags();
         dispatch(action.getMembersCompleted(data, tags.data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getMembersFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const getCurrentMemberOperation = (id, forUpdate) => {
   return async (dispatch) => {
      dispatch(action.getCurrentMemberStart());
      try {
         const {
            data,
         } = await AuthApi.getCurrentMember(id);
         if (!forUpdate) {
            await dispatch(getPlans(''));
         }

         dispatch(action.getCurrentMemberCompleted(data));
      } catch (error) {
         dispatch(action.getCurrentMemberFailed(error.response && error.response.data));
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const getMemberTransactionsOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.getMemberTransactionsStart());
      try {
         const {
            data,
         } = await AuthApi.getCurrentMemberTransactions(id);
         dispatch(action.getMemberTransactionsCompleted(data));
      } catch (error) {
         dispatch(action.getMemberTransactionsFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const attachManyTagsOperation = (memberId, tags) => {
   return async (dispatch) => {
      dispatch(action.popupChangeStart());
      try {
         await AuthApi.attachTagsToMember(memberId, tags);
         dispatch(action.popupChangeCompleted());
         getMembersOperation()(dispatch);
         if (isPrint('The member has been successfully updated.')) {
            toast.success('The member has been successfully updated.');
         }
      } catch (error) {
         dispatch(action.popupChangeFail());
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getMemberNotesOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.getMemberNotesStart());
      try {
         const {
            data,
         } = await AuthApi.getCurrentMemberNotes(id);
         dispatch(action.getMemberNotesCompleted(data));
      } catch (error) {
         dispatch(action.getMemberNotesFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const putCurrentMemberOperation = (id, inputs, courseArrays, fieldValues = '') => {
   document.querySelector('.user-save').setAttribute('disabled', 'disabled');
   return async (dispatch) => {
      dispatch(action.putCurrentMemberStart());
      try {
         const {
            status,
         } = await AuthApi.putCurrentMember(id, { ...inputs, tags: undefined });
         if (fieldValues.length) {
            await AuthApi.putCurrentMemberCustomField(fieldValues);
         }
         document.querySelector('.user-save').removeAttribute('disabled');

         if (status === 204) {
            dispatch(action.putCurrentMemberCompleted(id, inputs));
            if (isPrint('The member has been updated.')) {
               toast.success('The member has been updated.');
            }
         }
      } catch (error) {
         document.querySelector('.user-save').removeAttribute('disabled');
         dispatch(action.putCurrentMemberFailed(error.response && error.response.data));
         let errorMessage;
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               errorMessage = error.response.data.errors;
               if (errorMessage.name) {
                  if (isPrint(errorMessage.name[0])) {
                     toast.error(errorMessage.name[0]);
                  }
               }
               if (errorMessage.company_name) {
                  if (isPrint(errorMessage.company_name[0])) {
                     toast.error(errorMessage.company_name[0]);
                  }
               }
               if (errorMessage.email) {
                  if (isPrint(errorMessage.email[0])) {
                     toast.error(errorMessage.email[0]);
                  }
               }
               if (errorMessage.role) {
                  if (isPrint(errorMessage.role[0])) {
                     toast.error(errorMessage.role[0]);
                  }
               }
               if (errorMessage.password) {
                  if (isPrint(errorMessage.password[0])) {
                     toast.error(errorMessage.password[0]);
                  }
                  if (errorMessage.password[1]) {
                     if (isPrint(errorMessage.password[1])) {
                        toast.error(errorMessage.password[1]);
                     }
                  }
               }
            }
         } else {
            // eslint-disable-next-line no-lonely-if
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const sendPasswordOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.sendPasswordStart());
      try {
         const {
            status,
         } = await AuthApi.sendPassword(id);
         if (status === 204) {
            dispatch(action.popupChangeCompleted());
            if (isPrint('The password sent successfully.')) {
               toast.success('The password sent successfully.');
            }
         }
      } catch (error) {
         dispatch(action.sendPasswordFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const createNoteOperation = (id, inputs) => {
   return async (dispatch) => {
      dispatch(action.createNoteStart());
      try {
         const {
            data,
         } = await AuthApi.createNote(id, inputs);
         dispatch(action.createNoteCompleted(data));
         if (isPrint('The note has been added.')) {
            toast.success('The note has been added.');
         }
      } catch (error) {
         dispatch(action.createNoteFailed(error.response && error.response.data));
         if (error.response) {
            if (error.response.status !== 401 && error.response.data.errors) {
               return error.response.data.errors;
            }
         } else {
            // eslint-disable-next-line no-lonely-if
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const updateNoteOperation = (id, userId, inputs) => {
   return async (dispatch) => {
      dispatch(action.createNoteStart());
      try {
         await AuthApi.updateNote(id, userId, inputs);
         dispatch(action.updateNoteCompleted(id, inputs));
         if (isPrint('The note has been updated.')) {
            toast.success('The note has been updated.');
         }
      } catch (error) {
         dispatch(action.updateNoteFailed(error.response && error.response.data));
         if (error.response) {
            if (error.response.status !== 401 && error.response.data.errors) {
               return error.response.data.errors;
            }
         } else {
            // eslint-disable-next-line no-lonely-if
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const deleteNoteOperation = (userId, noteId) => {
   return async (dispatch) => {
      dispatch(action.deleteNoteStart());
      try {
         await AuthApi.deleteNote(userId, noteId);
         dispatch(action.deleteNoteCompleted(noteId));
         if (isPrint('The note has been deleted.')) {
            toast.success('The note has been deleted.');
         }
      } catch (error) {
         dispatch(action.deleteNoteFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const addTagOperation = (memberId, inputs) => {
   return async (dispatch) => {
      dispatch(action.addTagStart());
      try {
         const { data } = await AuthApi.addTag(inputs);
         await AuthApi.attachTagToMember(memberId, data.id);
         dispatch(action.addTagCompleted(data));
         //  getMembersOperation()(dispatch);
         if (isPrint('The tag has been added.')) {
            toast.success('The tag has been added.');
         }
      } catch (error) {
         dispatch(action.addTagFailed(error.response && error.response.data));

         if (error.response.data?.errors?.name) {
            return error.response.data.errors.name;
         }

         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const detachTagOperation = (memberId, tagId) => {
   return async (dispatch) => {
      dispatch(action.addTagStart());
      try {
         await AuthApi.detachMemberTag(memberId, tagId);
         dispatch(action.detachTagCompleted({
            memberId, tagId,
         }));
         if (isPrint('The tag has been deleted.')) {
            toast.success('The tag has been deleted.');
         }
      } catch (error) {
         dispatch(action.addTagFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const atachTagOperation = (memberId, tagId) => {
   return async (dispatch) => {
      dispatch(action.addTagStart());
      try {
         await AuthApi.attachTagToMember(memberId, tagId);
         dispatch(action.atachTagCompleted(tagId));
         if (isPrint('The tag has been added.')) {
            toast.success('The tag has been added.');
         }
      } catch (error) {
         dispatch(action.addTagFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const filterClassesOperation = (memberId, sort) => {
   return async (dispatch) => {
      dispatch(action.memberFilterStart());
      try {
         const { data } = await AuthApi.getFilteredClasses(memberId, sort);
         dispatch(action.memberFilterCompleted(data, sort));
      } catch (error) {
         dispatch(action.memberFilterFailed());
      }
   };
};

export const filteredTransactionsOperation = (memberId, courseId, from, to) => {
   return async (dispatch) => {
      dispatch(action.memberFilterStart());
      try {
         const { data } = await AuthApi.getFilteredTransactions(memberId, courseId, from, to);
         dispatch(action.memberTransactionFilterCompleted(data));
      } catch (error) {
         dispatch(action.memberFilterFailed());
      }
   };
};

export const searchMemberOperation = (params, sortBy) => {
   return async (dispatch) => {
      dispatch(action.searchMemberStart());
      try {
         const { data } = await AuthApi.getMembers(params, sortBy);
         dispatch(action.searchMemberCompleted(data));
      } catch (error) {
         dispatch(action.searchMemberFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const changeMembersPageOperation = (params) => {
   return async (dispatch) => {
      dispatch(action.changeMembersPageStart());
      try {
         const { data } = await AuthApi.getMembers(params);
         dispatch(action.changeMembersPageCompleted(data));
      } catch (error) {
         dispatch(action.changeMembersPageFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const addMemberOperation = (inputs) => {
   return async (dispatch) => {
      dispatch(action.addMemberStart());
      try {
         const { data } = await AuthApi.addMember(inputs);
         dispatch(action.addMemberCompleted(data));
         if (isPrint('The member has been created.')) {
            toast.success('The member has been created.');
         }
      } catch (error) {
         dispatch(action.addMemberFailed(error.response && error.response.data, inputs));

         if (!(error.response && error.response.data && error.response.data.errors)) {
            // eslint-disable-next-line no-lonely-if
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }

         // if (error.response && error.response.data && error.response.data.errors) {
         //    if (error.response.status !== 401) {
         //       const errorMessage = error.response.data.errors;
         //       if (errorMessage.name) {
         //          if (isPrint(errorMessage.name[0])) {
         //             toast.error(errorMessage.name[0]);
         //          }
         //       }
         //       if (errorMessage.company_name) {
         //          if (isPrint(errorMessage.company_name[0])) {
         //             toast.error(errorMessage.company_name[0]);
         //          }
         //       }
         //       if (errorMessage.email) {
         //          if (isPrint(errorMessage.email[0])) {
         //             toast.error(errorMessage.email[0]);
         //          }
         //       }
         //       if (errorMessage.role) {
         //          if (isPrint(errorMessage.role[0])) {
         //             toast.error(errorMessage.role[0]);
         //          }
         //       }
         //       if (errorMessage.password) {
         //          if (isPrint(errorMessage.password[0])) {
         //             toast.error(errorMessage.password[0]);
         //          }
         //          if (errorMessage.password[1]) {
         //             if (isPrint(errorMessage.password[1])) {
         //                toast.error(errorMessage.password[1]);
         //             }
         //          }
         //       }
         //    }
         // } else {
         //    // eslint-disable-next-line no-lonely-if
         //    if (error.response.status !== 401) {
         //       if (isPrint('Something went wrong.')) {
         //          toast.error('Something went wrong.');
         //       }
         //    }
         // }
      }
   };
};


export const pauseCurrentMemberCourseOperation = (memberId, courseId) => {
   return async (dispatch) => {
      dispatch(action.pauseCurrentMemberCourseStart());
      try {
         const data = await AuthApi.pauseCurrentMemberCourse(memberId, courseId);
         if (data.status === 204) {
            dispatch(action.pauseCurrentMemberCourseCompleted(memberId, courseId));
         //   toast.success('done');
         }
      } catch (error) {
         dispatch(action.pauseCurrentMemberCourseFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const addCurrentMemberCourseOperation = (memberId, courseId, planId, isSingleMember) => {
   return async (dispatch) => {
      dispatch(action.currentMemberAddCourseStart());
      try {
         if (!`${ courseId }` && (!planId || typeof planId !== 'number')) {
            if (isPrint('Please select an offer.')) {
               toast.error('Please select an offer.');
            }
            dispatch(action.currentMemberAddCourseFailed());
            return;
         }
         const body = {
            course_ids: courseId,
         };

         if (Boolean(planId) || typeof planId === 'number') {
            body.offers_id = planId;
         }

         await AuthApi.putCurrentMember(memberId, body);
         getMembersOperation()(dispatch);
         if (isSingleMember) {
            getCurrentMemberOperation(memberId, true)(dispatch);
         }
         dispatch(action.currentMemberAddCourseCompleted());
         if (isPrint('The member has been successfully added into the course.')) {
            toast.success('The member has been successfully added into the course.');
         }
      } catch (error) {
         dispatch(action.currentMemberAddCourseFailed());
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const assignRoleOperation = (memberId, role) => {
   return async (dispatch) => {
      dispatch(action.popupChangeStart());
      try {
         await AuthApi.putCurrentMember(memberId, {
            role,
         });
         getMembersOperation()(dispatch);
         dispatch(action.popupChangeCompleted(role));
         if (isPrint('The member has been successfully updated.')) {
            toast.success('The member has been successfully updated.');
         }
      } catch (error) {
         dispatch(action.popupChangeFail());
         let errorMessage;
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               errorMessage = error.response.data.errors;
               if (errorMessage.role) {
                  if (isPrint(errorMessage.role[0])) {
                     toast.error(errorMessage.role[0]);
                  }
               }
            }
         } else if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const deleteCurrentMemberCourseOperation = (memberId, courseId) => {
   return async (dispatch) => {
      dispatch(action.deleteCurrentMemberCourseStart());
      try {
         const data = await AuthApi.deleteCurrentMemberCourse(memberId, courseId);

         if (data.status === 204) {
            dispatch(action.deleteCurrentMemberCourseCompleted(memberId, courseId));
            // toast.success('Class removed');
         }
      } catch (error) {
         dispatch(action.deleteCurrentMemberCourseFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const clearCurrentMemberOperation = () => {
   return (dispatch) => {
      dispatch(action.clearCurrentMemberCompleted());
   };
};

export const deleteMemberOperation = (id, callBack, isFiltered) => {
   return async (dispatch) => {
      dispatch(action.deleteMemberStart());
      try {
         const data = await AuthApi.deleteMember(id);
         if (data.status === 204) {
            dispatch(action.deleteMemberCompleted(id, isFiltered));
            if (isPrint('The member has been deleted.')) {
               toast.success('The member has been deleted.');
            }
         }
         callBack();
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteMemberFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const importMembersOperation = (data) => {
   return async () => {
      try {
         const res = await AuthApi.importMembers(data);
         if (res.status === 204) {
            if (isPrint('Adding new member may take couple minutes, we will send an email as soon as it will be finished.')) {
               toast.success('Adding new member may take couple minutes, we will send an email as soon as it will be finished.');
            }
         }
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Please contact support to do a bulk import.')) {
               toast.error('Please contact support to do a bulk import.');
            }
         }
      }
   };
};


export const filterByCoursesOperation = () => {
   return async (dispatch) => {
      try {
         const {
            data,
         } = await AuthApi.getAllSortingCourses();
         dispatch(action.setFilterOptions(data));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const unsubscribeMemberEmailOperation = (uuid, id) => {
   return async (dispatch) => {
      dispatch(action.unsubscribeEmailStart());
      try {
         const { data } = await unsubscribeEmail(uuid, id);
         if (data.status.toString() === '0') {
            dispatch(push(`${ Router.route('OFFERS').getCompiledPath(portalId) }`));
         }
         if (data.status.toString() === '1') {
            dispatch(action.unsubscribeEmailCompleted());
         }
      } catch (error) {
         dispatch(action.unsubscribeEmailFailed());
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getCurrentMemberCommunityOperation = (id, communityId) => {
   return async dispatch => {
      dispatch(action.getMemberCommunityMoreInfoStart());
      try {
         const { data } = await AuthApi.getCurrentMemberCommunity(id, communityId);
         dispatch(action.getMemberCommunityMoreInfoCompleted(data));
      } catch (error) {
         dispatch(action.getMemberCommunityMoreInfoFailed());
      }
   };
};

export const bulkDeleteMemberOperation = (ids, callBack) => {
   return async dispatch => {
      try {
         await AuthApi.memberBulkDelete(ids);
         callBack();
         if (isPrint('Members delete successfuly.')) {
            toast.success('Members delete successfuly.');
         }
         dispatch(action.deleteMembersCompleted(ids));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};
