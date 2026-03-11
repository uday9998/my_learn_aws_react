import { createSelector } from 'reselect';

const innerStateSelector = state => state.studentsView;


export const checkoutCourseSelector = createSelector(
   innerStateSelector,
   (state) => (state.checkoutCourse)
);

export const getCheckoutInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getCheckoutInProgress)
);

export const testimonialsSelector = createSelector(
   innerStateSelector,
   (state) => (state.testimonials)
);

export const offersSelector = createSelector(
   innerStateSelector,
   (state) => (state.offers)
);
