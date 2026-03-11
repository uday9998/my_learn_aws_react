import { createSelector } from 'reselect';

const innerStateSelector = state => state.mainhub;

export const coursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.courses)
);

export const coursesAllSelector = createSelector(
   innerStateSelector,
   (state) => (state.coursesAll)
);

export const getCoursesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getCoursesInProgress)
);

export const filteredCoursesInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.filteredCoursesInProgress)
);
export const getCoursesBySearchInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getCoursesBySearchInProgress)
);


export const totalCoursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.totalCourses)
);

export const categoriesSelector = createSelector(
   innerStateSelector,
   (state) => (state.coursesBycategories)
);

export const pagenationDataSelector = createSelector(
   innerStateSelector,
   (state) => (state.paginationData)
);
export const unCategorizedCourses = createSelector(
   innerStateSelector,
   (state) => (state.unCategorizedCourses)
);

export const categoryPaginationSelector = createSelector(
   innerStateSelector,
   (state) => (state.categoryPagination)
);

export const loadingSliderCategoriesSelector = createSelector(
   innerStateSelector,
   (state) => (state.loadingSliderCategories)
);

export const searchCoursesSelector = createSelector(
   innerStateSelector,
   (state) => ({
      data: state.serachData,
      search: state.search,
      loading: state.searchInProgress,
      currentPage: state.searchCurrentPage,
      lastPage: state.searchLastPage,
      loadingMore: state.searchLoadingMore,
   })
);

export const frontScriptsSelector = createSelector(
   innerStateSelector,
   (state) => (state.frontScripts)
);

export const offersSchoolRoomSelector = createSelector(
   innerStateSelector,
   (state) => state.offers
);

export const offersProgressSchoolRoomSelector = createSelector(
   innerStateSelector,
   (state) => state.offersProgress
);

export const categoriesListSelector = createSelector(
   innerStateSelector,
   (state) => state.categories
);
