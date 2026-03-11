import { createSelector } from 'reselect';

const innerStateSelector = state => state.edit;

export const initDataInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.initDataInProgress)
);

export const courseMaterialSelector = createSelector(
   innerStateSelector,
   (state) => (state.courseMaterial)
);

export const currentLessonSelector = createSelector(
   innerStateSelector,
   (state) => (state.courseMaterial.currentLesson)
);

export const courseLessonSelector = createSelector(
   innerStateSelector,
   (state) => (state.courseMaterial.course)
);


export const lessonResourcesSelector = createSelector(
   innerStateSelector,
   (state) => (state.courseMaterial.lessonResources)
);

export const lessonActionInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.lessonActionInProgress)
);

export const lessonResourceActionInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.courseMaterial.lessonResourceActionInProgress)
);

export const settingsActionInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.settingsActionInProgress)
);


export const currentSectionSelector = createSelector(
   innerStateSelector,
   (state) => (state.courseMaterial.currentSection)
);

export const currentResourceSelector = createSelector(
   innerStateSelector,
   (state) => (state.courseMaterial.currentResource)
);

export const settingsSelector = createSelector(
   innerStateSelector,
   (state) => (state.settings)
);

export const planSelector = createSelector(
   innerStateSelector,
   (state) => (state.plan)
);

export const signUpSelector = createSelector(
   innerStateSelector,
   (state) => (state.signUp)
);

export const integartionErrorSelector = createSelector(
   innerStateSelector,
   (state) => (state.integrationError)
);

export const currentTestimonialSelector = createSelector(
   innerStateSelector,
   (state) => (state.signUp.currentTestimonial)
);

export const currentBulletSelector = createSelector(
   innerStateSelector,
   (state) => (state.signUp.currentBullet)
);

export const updateSignUpInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.updateSignUpInProgress)
);

export const errorsSelector = createSelector(
   innerStateSelector,
   (state) => (state.errors)
);


export const chooseCoursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.chooseCourses)
);

export const selectedFiltersSelector = createSelector(
   innerStateSelector,
   (state) => (state.selectedFilters)
);

export const landingSelector = createSelector(
   innerStateSelector,
   (state) => (state.landing)
);

export const instructorDataInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.instructorDataInProgress)
);

export const planDrawerStateSelector = createSelector(
   innerStateSelector,
   (state) => (state.planDrawerState)
);

export const zoomLoaderSelector = createSelector(
   innerStateSelector,
   (state) => (state.zoomLoader)
);

export const generalProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.isLoadingGeneral)
);

export const allCoursesSelector = createSelector(
   innerStateSelector,
   (state) => (state.allCourses)
);

export const initialSectionsCountSelector = createSelector(
   innerStateSelector,
   (state) => (state.initialCountOfSections)
);

export const isFilteringSelector = createSelector(
   innerStateSelector,
   (state) => state.isFiltering
);

export const fetchingCourseUpdatesSelector = createSelector(
   innerStateSelector,
   state => state.updateCourseInProgress
);

export const ProductSettingsProgressSelector = createSelector(
   innerStateSelector,
   state => state.isPorgressProductSettings
);

export const QuizTemplatesDescSelector = createSelector(
   innerStateSelector,
   state => state.courseMaterial.quizTemplatesDesc
);

export const QuizTemplatesAscSelector = createSelector(
   innerStateSelector,
   state => state.courseMaterial.quizTemplatesAsc
);
