import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.REORDER_CATEGORIES_COMLETED]: (state, payload) => {
      const { payload: { categoryIds } } = payload;
      const filteredCategories = state.categories.filter(({ id }) => categoryIds.includes(id));
      return {
         ...state,
         categories: categoryIds.map(id => filteredCategories.find(({ id: catId }) => id === catId)),
      };
   },
   [types.GET_CATEGORIES_START]: (state) => {
      return {
         ...state,
         isFetchingData: true,
      };
   },
   [types.GET_CATEGORIES_COMPLETED]: (state, action) => {
      return {
         ...state,
         categories: action.payload,
         categoriesInitialCount: action.payload.length,
         isFetchingData: false,
      };
   },
   [types.GET_CATEGORIES_END]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.CREATE_CATEGORY_START]: (state) => {
      return {
         ...state,
         isProcesingCourseOperation: true,
      };
   },
   [types.CREATE_CATEGORY_END]: (state) => {
      return {
         ...state,
         isProcesingCourseOperation: false,
      };
   },
   [types.CREATE_CATEGORY_COMPLETED]: (state, action) => {
      return {
         ...state,
         isProcesingCourseOperation: false,
         categoriesInitialCount: state.categories.length + 1,
         categories: [
            ...state.categories,
            {
               ...action.payload,
               courses: [],
            },
         ],
      };
   },
   [types.CATEGORIES_FILTER_START]: (state) => {
      return {
         ...state,
         isFiltering: false,
      };
   },
   [types.CATEGORIES_FILTER_END]: (state, action) => {
      return {
         ...state,
         categories: action.payload,
      };
   },
   [types.UPDATE_CATEGORY_START]: (state) => {
      return {
         ...state,
         updateProgress: true,
      };
   },
   [types.UPDATE_CATEGORY_COMPLETED]: (state, action) => {
      const newCategories = state.categories.map((category) => {
         if (category.id === parseInt(action.payload.id, 10)) {
            if (action.payload.seo_data) {
               return {
                  ...category,
                  seo_data: action.payload.seo_data,
               };
            }
            return {
               ...category,
               ...action.payload,
            };
         }
         return category;
      });
      return {
         ...state,
         updateProgress: false,
         categories: newCategories,
      };
   },
   [types.UPDATE_CATEGORY_FAILED]: (state) => {
      return {
         ...state,
         updateProgress: false,
      };
   },
   [types.REMOVE_CATEGORY_START]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.REMOVE_CATEGORY_COMPLETED]: (state, action) => {
      let newCategories;
      if (action.payload === 'remove') {
         newCategories = state.categories.filter((cat) => cat.id !== undefined);
      } else {
         newCategories = state.categories.filter((cat) => cat.id !== action.payload);
      }

      return {
         ...state,
         categories: newCategories,
         isFetchingData: false,
         categoriesInitialCount: newCategories.length,
      };
   },
   [types.REMOVE_CATEGORY_FAILED]: (state) => {
      return {
         ...state,
         isFetchingData: false,
      };
   },
   [types.GET_DETACHED_COURSES_START]: (state) => {
      return {
         ...state,
         isProgressDetachCourses: true,
      };
   },
   [types.GET_DETACHED_COURSES_END]: (state, action) => {
      return {
         ...state,
         isProgressDetachCourses: false,
         detachedCourses: action.payload,
      };
   },
   [types.ATTACH_DETACH_COURSE_START]: (state) => {
      return {
         ...state,
         isProcesingCourseOperation: true,
      };
   },
   [types.ATTACH_DETACH_COURSE_FAILED]: (state) => {
      return {
         ...state,
         isProcesingCourseOperation: false,
      };
   },
   [types.ATTACH_DETACH_COURSE_COMPLETED]: (state) => {
      return {
         ...state,
         isProcesingCourseOperation: false,
      };
   },
};

export default createReducer(initialState)(reducersMap);
