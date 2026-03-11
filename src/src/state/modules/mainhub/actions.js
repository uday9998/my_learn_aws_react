import * as types from './types';


export const getCategoriesStart = (isInitialRequest) => ({
   type: types.GET_CATEGORIES_START,
   payload: {
      isInitialRequest,
   },
});

export const getCategoriesCompleted = (courses) => ({
   type: types.GET_CATEGORIES_COMPLETED,
   payload: {
      courses,
   },
});

export const getCoursesStart = () => ({
   type: types.GET_COURSES_START,
});

export const getCoursesCompleted = (courses, coursesAll) => ({
   type: types.GET_COURSES_COMPLETED,
   payload: {
      courses,
      coursesAll,
   },
});

export const getCoursesFailed = (errors) => ({
   type: types.GET_COURSES_FAILED,
   payload: {
      errors,
   },
});
export const getCoursesBySearchStart = () => ({
   type: types.GET_COURSES_BY_SEARCH_START,
});

export const getCoursesBySearchCompleted = (courses) => ({
   type: types.GET_COURSES_BY_SEARCH_COMPLETED,
   payload: {
      courses,

   },
});

export const getCoursesBySearchFailed = (errors) => ({
   type: types.GET_COURSES_BY_SEARCH_FAILED,
   payload: {
      errors,
   },
});


export const filteredCoursesStart = () => ({
   type: types.FILTERED_COURSES_START,
});

export const filteredCoursesCompleted = (courses) => ({
   type: types.FILTERED_COURSES_COMPLETED,
   payload: {
      courses,

   },
});

export const filteredCoursesFailed = (errors) => ({
   type: types.FILTERED_COURSES_FAILED,
   payload: {
      errors,
   },
});

export const exitViewAll = () => ({
   type: types.EXIT_VIEW_ALL,

});

export const getUncategorizedCoursesStart = () => ({
   type: types.GET_UNCATEGORIZED_COURSES_START,
});

export const getUncategorizedCoursesCompleted = courses => ({
   type: types.GET_UNCATEGORIZED_COURSES_COMPLETED,
   payload: {
      courses,
   },
});

export const loadMoreSliderCoursesStart = (categoryId) => ({
   type: types.LOAD_MORE_COURSES_START,
   payload: {
      categoryId,
   },
});

export const loadMoreSliderCoursesCompleted = (courses, categoryId, lastSlideIndex) => ({
   type: types.LOAD_MORE_COURSES_COMPLETED,
   payload: {
      courses,
      categoryId,
      lastSlideIndex,
   },
});

export const loadMoreCategoriesCompleted = (courses) => ({
   type: types.LOAD_MORE_CATEGORIES_COMPLETED,
   payload: {
      courses,
   },
});

export const searchCoursesStart = (search) => ({
   type: types.SEARCH_COURSES_START,
   payload: {
      search,
   },
});

export const searchCoursesCompleted = (data) => ({
   type: types.SEARCH_COURSES_COMPLETED,
   payload: {
      data,
   },
});

export const loadMoreSearchedCoursesStart = () => ({
   type: types.LOAD_MORE_SEARCHED_COURSES_START,
});

export const loadMoreSearchedCoursesCompleted = (data) => ({
   type: types.LOAD_MORE_SEARCHED_COURSES_COMPLETED,
   payload: {
      data,
   },
});

export const getFrontScriptsCompleted = (data, categories) => ({
   type: types.GET_FRONTSCRIPTS_COMPLETED,
   payload: {
      data,
      categories,
   },
});

export const getOffersStart = () => ({
   type: types.SEARCH_OFFERS_START,
});

export const getOffersCompleted = (data) => ({
   type: types.SEARCH_OFFERS_COMPLETED,
   payload: data,
});

export const getOffersFailed = () => ({
   type: types.SEARCH_COURSES_FAILED,
});

export const favoriteOfferCompleted = (offerId, userId, data) => ({
   type: types.FAVORITE_OFFER_COMPLETED,
   payload: [offerId, userId, data],
});
