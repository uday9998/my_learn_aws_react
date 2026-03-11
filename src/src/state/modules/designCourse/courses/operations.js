import * as AuthApi from 'api/AuthApi';
import * as action from 'state/modules/designCourse/courses/actions';
import { toast } from 'react-toastify';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import { getFileSizeInfoOperation } from 'state/modules/settings/operations';
import momentTimezone from 'moment-timezone';
import isPrint from '../edit/Error';

export const getCoursesOperation = (pageNum, params, isByFilter, searchFunc) => {
   return async (dispatch) => {
      dispatch(action.getCoursesStart());
      try {
         const {
            data,
         } = await AuthApi.getCourses(pageNum, params);
         if (searchFunc && data && data.data && !data.data.length) {
            searchFunc();
         }
         if (Boolean(params) && (params.sort === 'most_members' || params.sort === 'least_members')) {
            const newData = data.data.sort((a, b) => {
               const first = a.communities ? a.communities.members_count : a.users_count;
               const second = b.communities ? b.communities.members_count : b.users_count;

               if (params.sort === 'most_members') {
                  return second - first;
               }
               return first - second;
            });
            data.data = [...newData];
         }
         dispatch(action.getCoursesCompleted(data, isByFilter));
      } catch (error) {
         if (error.response) {
            dispatch(action.getCoursesFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const filteredGetCoursesOperation = (pageNum, params, callback) => {
   return async (dispatch) => {
      dispatch(action.filteredCoursesStart());
      try {
         const {
            data,
         } = await AuthApi.getCourses(pageNum, params);
         dispatch(action.filteredCoursesCompleted(data));
         if (callback) {
            callback();
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.filteredCoursesFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const hideCourseOperation = (courseId, isPublished, inputs) => {
   return async (dispatch) => {
      dispatch(action.hideCourseStart());
      try {
         const params = { ...inputs };
         if (inputs && inputs.drip_days && inputs.drip_type === 'custom') {
            params.drip_type = 'custom';
            const userTimeZone = momentTimezone.tz.guess();
            const dateUserTimeZone = momentTimezone.tz(inputs.drip_days, userTimeZone);
            const dateUTC = dateUserTimeZone.utc().format('YYYY-MM-DD HH:mm:ss'); // 2013-11-18T03:55Z
            params.drip_days = dateUTC;
         }
         const data = await AuthApi.hideCourse(courseId, isPublished, params);
         dispatch(action.hideCourseCompleted(courseId, isPublished, data.data.publishing_date));
         if (isPrint('Changes saved successfully.')) {
            toast.success('Changes saved successfully.');
         }
         // if (data.status === 204) {
         //    if (isPublished === 1) {
         //       if (isPrint('Class is not available for new users.')) {
         //          toast.success('Class is not available for new users.');
         //       }
         //    } else if (isPublished === 3) {
         //       if (isPrint(`Class will be published for new users ${ publishDate } ${ publishTime }`)) {
         //          toast.success(`Class will be published for new users ${ publishDate } ${ publishTime }`);
         //       }
         //    } else if (isPrint('Class is  available for new users.')) {
         //       toast.success('Class is  available for new users.');
         //    }
         // }
      } catch (error) {
         if (error.response) {
            dispatch(action.hideCourseFailed(error.response.data));
            if (error.response.data && error.response.data.error) {
               if (error.response.status !== 401) {
                  if (isPrint(error.response.data.error)) {
                     toast.error(error.response.data.error);
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

export const showCourseOperation = (id, params) => {
   return async (dispatch) => {
      dispatch(action.showCourseStart());
      try {
         await AuthApi.updateCourse(id, params);
         if (params.show_course === 1) {
            if (isPrint('Class is available in the school room.')) {
               toast.success('Class is available in the school room.');
            }
         } else if (isPrint('Class is hidden in the school room.')) {
            toast.success('Class is hidden in the school room.');
         }
         dispatch(action.showCourseCompleted(id));
      } catch (error) {
         if (error.response) {
            dispatch(action.showCourseFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const duplicateCourseOperation = (courseId) => {
   return async (dispatch) => {
      dispatch(action.duplicateCourseStart());
      try {
         const data = await AuthApi.duplicateCourse(courseId);
         if (data.status === 200) {
            await getCoursesOperation(1)(dispatch);
            if (isPrint('The class has been successfully duplicated.')) {
               toast.success('The class has been successfully duplicated.');
            }
            dispatch(action.duplicateCourseCompleted(courseId, data.data));
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.duplicateCourseFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (error.response.data && error.response.data.course_limit && error.response.data.course_limit[0]) {
               if (isPrint(error.response.data.course_limit[0])) {
                  toast.error(error.response.data.course_limit[0]);
               }
            } else if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const deleteCourseOperation = (courseId, isFiltered) => {
   return async (dispatch) => {
      dispatch(action.deleteCourseStart());
      try {
         const data = await AuthApi.deleteAdminCourse(courseId);
         if (data.status === 204) {
            if (isPrint('The class has been successfully deleted.')) {
               toast.success('The class has been successfully deleted.');
            }
            dispatch(action.deleteCourseCompleted(courseId, isFiltered));
            dispatch(getFileSizeInfoOperation());
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.duplicateCourseFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const updateCourseLinkOperation = (courseId, inputs) => {
   return async (dispatch) => {
      dispatch(action.updateCourseLinkStart());
      try {
         const data = await AuthApi.updateCourse(courseId, inputs);
         if (data.status === 204) {
            if (isPrint('Changes has been saved.')) {
               toast.success('Changes has been saved.');
            }
            dispatch(action.updateCourseLinkCompleted(courseId, inputs));
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.updateCourseLinkFailed(error.response.data));
         }
         if (error.response && error.response.data && error.response.data.errors) {
            const errorName = error.response.data.errors;
            if (errorName.url) {
               if (error.response.status !== 401) {
                  if (isPrint(errorName.url[0])) {
                     toast.error(errorName.url[0]);
                  }
               }
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
export const getDefaultNamesOperation = () => {
   return async (dispatch) => {
      dispatch(action.getDefaultNamesStart(true));
      try {
         const { data } = await AuthApi.getDefaultCourseNames();
         dispatch(action.getDefaultNamesCompleted(data));
         dispatch(getFileSizeInfoOperation());
      } catch (error) {
         if (error.response) {
            dispatch(action.getDefaultNamesFailed());
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
let isError = true;
export const chooseDefaultNameOperation = (name, type) => {
   return async (dispatch) => {
      dispatch(action.getDefaultNamesStart(true));
      try {
         const initData = await AuthApi.initSiteDetails();
         if (initData.data && initData.data.user && initData.data.user.uuid) {
            window.dataLayer.push({
               'event': 'course created',
               'id': initData.data.user.uuid,
               'first time': initData.data.metas.is_course_created === '0' && initData.data.user.version === 1 ? 'yes' : 'no',
            });
         }
         let data = {};
         if (type) {
            data = await AuthApi.chooseDefaultCoursecCurse({ type, name });
         } else {
            data = await AuthApi.chooseDefaultCourseName({ name });
         }
         data = data.data;
         dispatch(action.getDefaultNamesStart(false));
         dispatch(getFileSizeInfoOperation());
         dispatch(push(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: data.id })));
      } catch (error) {
         dispatch(action.getDefaultNamesStart(false));
         if (error.response && error.response.data && error.response.data.errors) {
            const errorName = error.response.data.errors;
            if (errorName.name) {
               if (error.response.status !== 401 && isError) {
                  if (isPrint(errorName.name[0])) {
                     toast.error(errorName.name[0]);
                  }
                  isError = !isError;
                  setTimeout(() => {
                     isError = !isError;
                  }, 6500);
               }
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


export const deleteCoursesByIdsOperation = (data) => {
   return async (dispatch) => {
      dispatch(action.deleteCoursesMultipleStart());
      try {
         await AuthApi.deleteMultipleCourses(data);
         await getCoursesOperation(1)(dispatch);
         dispatch(action.deleteCoursesMultipleCompleted({ sortName: 'recently' }));
         const count = data.length === 1 ? 'Product' : 'Products';
         if (isPrint(`${ count } deleted successfully.`)) {
            toast.success(`${ count } deleted successfully.`);
         }
      } catch (error) {
         dispatch(action.deleteCoursesMultipleFailed());
         toast.error('Something went wrong!');
      }
   };
};

export const duplicateCoursesByIdsOperation = (data) => {
   return async (dispatch) => {
      dispatch(action.deleteCoursesMultipleStart());
      try {
         await AuthApi.duplicateMultipleCourses(data);
         await getCoursesOperation(1)(dispatch);
         dispatch(action.deleteCoursesMultipleCompleted({ sortName: 'recently' }));
         const count = data.length === 1 ? 'Product' : 'Products';
         if (isPrint(`${ count } duplicated successfully.`)) {
            toast.success(`${ count } duplicated successfully.`);
         }
      } catch (error) {
         dispatch(action.deleteCoursesMultipleFailed());
         toast.error('Something went wrong!');
      }
   };
};
