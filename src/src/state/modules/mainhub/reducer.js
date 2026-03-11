/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {
   [types.GET_CATEGORIES_START]: (state, action) => {
      const { payload: { isInitialRequest } } = action;
      return {
         ...state,
         getCoursesInProgress: isInitialRequest,
         categoryPagination: { ...state.categoryPagination, loadingMore: !isInitialRequest },
      };
   },

   [types.GET_CATEGORIES_COMPLETED]: (state, action) => {
      const { payload: { courses } = {} } = action;
      const finalData = courses.data.map(category => {
         const currentPage = 1;
         const lastPage = category.publish_courses_count <= 4 ? 1 : null;
         return {
            ...category, lastPage, currentPage, courses: Object.values(category.category_courses),
         };
      });

      return {
         ...state,
         coursesBycategories: {
            ...courses, data: finalData,
         },
         categoryPagination: { lastPage: courses.last_page, currentPage: courses.current_page, loadingMore: false },
         getCoursesInProgress: false,
      };
   },
   [types.LOAD_MORE_CATEGORIES_COMPLETED]: (state, action) => {
      const { payload: { courses } = {} } = action;
      const finalData = courses.data.map(category => {
         const currentPage = 1;
         const lastPage = category.publish_courses_count <= 4 ? 1 : null;
         return {
            ...category, lastPage, currentPage, courses: Object.values(category.category_courses),
         };
      });

      return {
         ...state,
         coursesBycategories: {
            ...state.coursesBycategories, ...courses, data: [...state.coursesBycategories.data, ...finalData],
         },
         categoryPagination: { lastPage: courses.last_page, currentPage: courses.current_page, loadingMore: false },
         getCoursesInProgress: false,
      };
   },
   [types.GET_COURSES_START]: (state) => {
      return {
         ...state,
         getCoursesInProgress: true,
      };
   },

   [types.GET_COURSES_COMPLETED]: (state, action) => {
      const { payload: { courses, coursesAll } } = action;

      return {
         ...state,
         getCoursesInProgress: false,
         courses: courses.data,
         coursesAll: coursesAll.data.courses,
         totalCourses: courses.total,
      };
   },

   [types.GET_COURSES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getCoursesInProgress: false,
      };
   },
   [types.GET_UNCATEGORIZED_COURSES_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.GET_UNCATEGORIZED_COURSES_COMPLETED]: (state, action) => {
      const { payload: { courses: { data, last_page: lastPage, current_page: currentPage } = {} } } = action;
      return {
         ...state,
         unCategorizedCourses: {
            loading: false, data, lastPage, currentPage,
         },
      };
   },

   [types.GET_COURSES_BY_SEARCH_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         getCoursesBySearchInProgress: false,
      };
   },

   [types.FILTERED_COURSES_START]: (state) => {
      return {
         ...state,
         filteredCoursesInProgress: true,
         paginationData: { ...state.paginationData, loadingMore: true },
      };
   },

   [types.FILTERED_COURSES_COMPLETED]: (state, action) => {
      const { payload: { courses } } = action;
      let newCourses;
      if (courses.current_page !== 1) {
         newCourses = [...state.courses, ...courses.data];
      } else {
         newCourses = [...courses.data];
      }

      return {
         ...state,
         filteredCoursesInProgress: false,
         courses: newCourses,
         paginationData: { lastPage: courses.last_page, currentPage: courses.current_page, loadingMore: false },
         totalCourses: courses.total,
      };
   },

   [types.FILTERED_COURSES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         felteredCoursesInProgress: false,
      };
   },
   [types.EXIT_VIEW_ALL]: (state) => {
      return {
         ...state,
         courses: [],
         paginationData: { currentPage: 1, loadingMore: false },
      };
   },
   [types.LOAD_MORE_COURSES_START]: (state, action) => {
      const { payload: { categoryId } } = action;
      return {
         ...state,
         loadingSliderCategories: [...state.loadingSliderCategories, categoryId],
      };
   },
   [types.LOAD_MORE_COURSES_COMPLETED]: (state, action) => {
      const { payload: { courses, categoryId, lastSlideIndex } } = action;
      if (categoryId !== 0) {
         const newCategories = {
            ...state.coursesBycategories,
            data: state.coursesBycategories.data.map(category => {
               if (category.id !== categoryId) return category;
               return {
                  ...category,
                  lastPage: courses.last_page,
                  lastSlideIndex,
                  currentPage: courses.current_page,
                  courses: [...category.courses, ...courses.data],
               };
            }),
         };
         return {
            ...state,
            coursesBycategories: newCategories,
            loadingSliderCategories: state.loadingSliderCategories.filter(id => categoryId !== id),
         };
      }
      return {
         ...state,
         unCategorizedCourses: {
            ...state.unCategorizedCourses,
            data: [...state.unCategorizedCourses.data, ...courses.data],
            lastPage: courses.last_page,
            lastSlideIndex,
            currentPage: courses.current_page,
         },
         loadingSliderCategories: state.loadingSliderCategories.filter(id => id !== 0),
      };
   },

   [types.SEARCH_COURSES_START]: (state, action) => {
      const { payload: { search } } = action;
      return {
         ...state,
         searchInProgress: true,
         search,

      };
   },

   [types.SEARCH_COURSES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const { courses: { data: coursesData, current_page: currentPage, last_page: lastPage } } = data;
      return {
         ...state,
         serachData: coursesData,
         searchInProgress: false,
         searchCurrentPage: currentPage,
         searchLastPage: lastPage,
      };
   },


   [types.LOAD_MORE_SEARCHED_COURSES_START]: (state) => {
      return {
         ...state,
         searchLoadingMore: true,
      };
   },

   [types.LOAD_MORE_SEARCHED_COURSES_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const { courses: { data: coursesData, current_page: currentPage, last_page: lastPage } } = data;
      return {
         ...state,
         serachData: [...state.serachData, ...coursesData],
         searchLoadingMore: false,
         searchCurrentPage: currentPage,
         searchLastPage: lastPage,
      };
   },

   [types.GET_FRONTSCRIPTS_COMPLETED]: (state, action) => {
      const { payload: { data, categories } } = action;
      return {
         ...state,
         frontScripts: data,
         categories: categories.data,
      };
   },

   [types.SEARCH_OFFERS_START]: (state) => {
      return {
         ...state,
         offersProgress: true,
      };
   },
   [types.SEARCH_OFFERS_COMPLETED]: (state, action) => {
      return {
         ...state,
         offersProgress: false,
         offers: action.payload,
      };
   },
   [types.SEARCH_OFFERS_FAILED]: (state) => {
      return {
         ...state,
         offersProgress: false,
      };
   },
   [types.FAVORITE_OFFER_COMPLETED]: (state, action) => {
      const [offerId, userId, data] = action.payload;
      return {
         ...state,
         offers: state.offers.map((e) => {
            if (e.id === offerId) {
               return {
                  ...e,
                  favorites: data === 1 ? e.favorites.filter((f) => f.user_id !== userId) : [...e.favorites, data],
               };
            }
            return e;
         }),
      };
   },
};


export default createReducer(initialState)(reducersMap);
