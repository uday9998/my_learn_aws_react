import { createSelector } from 'reselect';

const innerStateSelector = state => state.create;

export const courseMaterialSelector = createSelector(
   innerStateSelector,
   (state) => (state.courseMaterial)
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

export const programProgressSelector = createSelector(
   innerStateSelector,
   (state) => state.createProgramInProgress
);


export const generatedArraySelector = createSelector(
   innerStateSelector,
   (state) => state.generatedArray
);

export const generateInprogressSelector = createSelector(
   innerStateSelector,
   (state) => state.generateInprogress
);
