import { createSelector } from 'reselect';

const innerStateSelector = state => state.studentsCourse;

export const getCourseInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getCourseInProgress)
);

export const getLessonInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getLessonInProgress)
);

export const courseSelector = createSelector(
   innerStateSelector,
   (state) => (state.course)
);

export const lessonsSelector = createSelector(
   innerStateSelector,
   (state) => (state.lessons)
);

export const sectionsSelector = createSelector(
   innerStateSelector,
   (state) => (state.sections)
);

export const lessonSelector = createSelector(
   innerStateSelector,
   (state) => (state.lesson)
);


export const defaultLessonIdSelector = createSelector(
   innerStateSelector,
   (state) => (state.defaultLessonId)
);


export const authorSelector = createSelector(
   innerStateSelector,
   (state) => (state.author)
);

export const courseComplatePercentSelector = createSelector(
   innerStateSelector,
   (state) => (state.courseComplatePercent)
);

export const defaultQuestionIdSelector = createSelector(
   innerStateSelector,
   (state) => (state.defaultQuestionId)
);
export const questionsSelector = createSelector(
   innerStateSelector,
   (state) => (state.questions)
);
export const isComplateSelector = createSelector(
   innerStateSelector,
   (state) => (state.isComplate)
);

export const hasCertificateSelector = createSelector(
   innerStateSelector,
   (state) => (state.hasCertificate)
);

export const prerequisiteLessonIndexSelector = createSelector(
   innerStateSelector,
   (state) => (state.prerequisiteLessonIndex)
);

export const getBookLoader = createSelector(
   innerStateSelector,
   (state) => (state.bookLoader)
);
