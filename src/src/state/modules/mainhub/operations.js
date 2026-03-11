import {
   getStudentCourses, courseWebSession, getStudentCategories, searchSchoolCourses, getFrontScripts,
   getOffers,
   favoriteOffer,
   getAllCategories,
   enrollMemberToFreeOffer,
} from 'api/AuthApi';
import * as action from 'state/modules/mainhub/actions';
import { toast } from 'react-toastify';
import { applyScripts } from 'containers/pages/mixed/offers';
import isPrint from '../designCourse/edit/Error';

export const getCategoriesOperation = (page, count, isInitialRequest) => {
   return async (dispatch) => {
      dispatch(action.getCategoriesStart(isInitialRequest));
      try {
         const {
            data,
         } = await getStudentCategories(page, count);
         if (!isInitialRequest) {
            dispatch(action.loadMoreCategoriesCompleted(data));
         } else {
            dispatch(action.getCategoriesCompleted(data));
         }
      } catch (error) {
         if (error.response && error.response.status === 401) {
            window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const getCoursesOperation = (pageNum, count, param) => {
   return async (dispatch) => {
      dispatch(action.getCoursesStart());
      try {
         const {
            data,
         } = await getStudentCourses(pageNum, count, param);
         const coursesAll = await getStudentCourses(pageNum, 'all', param);
         dispatch(action.getCoursesCompleted(data.courses, coursesAll));
      } catch (error) {
         if (error.response && error.response.status === 401) {
            window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const getUnCategorizedCoursesOperation = () => {
   return async (dispatch) => {
      try {
         const {
            data,
         } = await getStudentCourses(1, 4, { category_id: 'null' });
         dispatch(action.getUncategorizedCoursesCompleted(data.courses));
      } catch (error) {
         if (error.response) {
            // dispatch(action.getCoursesFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const filteredCoursesOperation = (pageNum, category, param) => {
   return async (dispatch) => {
      dispatch(action.filteredCoursesStart());
      try {
         const {
            data,
         } = await getStudentCourses(pageNum, category, param);
         dispatch(action.filteredCoursesCompleted(data.courses));
      } catch (error) {
         if (error.response) {
            dispatch(action.filteredCoursesFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const courseWebSessionOperation = (courseId) => {
   return async () => {
      try {
         await courseWebSession(courseId);
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const freeCourseOperation = (planId) => {
   return async () => {
      try {
         await enrollMemberToFreeOffer(planId);
         // window.location.replace(data.redirect_url);
      } catch (error) {
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const loadMoreSliderCoursesOperation = (categoryId, pageNum, count, lastSlideIndex) => {
   return async (dispatch) => {
      dispatch(action.loadMoreSliderCoursesStart(categoryId));
      try {
         const {
            data,
         } = await getStudentCourses(pageNum, count, { category_id: categoryId === 0 ? 'null' : categoryId });
         dispatch(action.loadMoreSliderCoursesCompleted(data.courses, categoryId, lastSlideIndex));
      } catch (error) {
         if (error.response && error.response.status === 401) {
            window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const searchCoursesOperation = (search) => {
   return async (dispatch) => {
      dispatch(action.searchCoursesStart(search));
      try {
         const {
            data,
         } = await searchSchoolCourses(search, 1);
         dispatch(action.searchCoursesCompleted(data));
      } catch (error) {
         if (error.response && error.response.status === 401) {
            window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const loadMoreSearchedCoursesOperation = (search, currentPage) => {
   return async (dispatch) => {
      dispatch(action.loadMoreSearchedCoursesStart());
      try {
         const {
            data,
         } = await searchSchoolCourses(search, currentPage);
         dispatch(action.loadMoreSearchedCoursesCompleted(data));
      } catch (error) {
         if (error.response && error.response.status === 401) {
            window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getFrontScriptsOperation = () => {
   return async (dispatch) => {
      try {
         const {
            data,
         } = await getFrontScripts();
         // const categories = await getAllCategories();
         dispatch(action.getFrontScriptsCompleted(data));
         applyScripts(data);
      } catch (error) {
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getOffersWithFilter = (query) => {
   return async (dispatch) => {
      try {
         dispatch(action.getOffersStart());
         const { data } = await getOffers(query);
         dispatch(action.getOffersCompleted(data));
      } catch (error) {
         dispatch(action.getOffersFailed());
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const offerFavorite = (offerId, authUser) => {
   return async (dispatch) => {
      if (!authUser) {
         return;
      }
      try {
         const { data } = await favoriteOffer(offerId);
         dispatch(action.favoriteOfferCompleted(offerId, authUser.id, data));
      } catch (error) {
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
