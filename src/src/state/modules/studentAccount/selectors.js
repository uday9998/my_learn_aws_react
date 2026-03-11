import { createSelector } from 'reselect';

const innerStateSelector = state => state.studentAccount;


export const accountStudentSelector = createSelector(
   innerStateSelector,
   (state) => (state.account)
);

export const integrationSettingsSelector = createSelector(
   innerStateSelector,
   (state) => (state.integrations)
);

export const emailsSettingsSelector = (state) => {
   return state.settings.emails;
};

export const dataIsFetchingSelector = (state) => {
   return state.studentAccount.dataIsFetching;
};

export const mainhubSettingsSelector = createSelector(
   innerStateSelector,
   (state) => (state.mainhub)
);


export const getAccountInProgressSelector = createSelector(
   innerStateSelector,
   (state) => (state.getAccountInProgress)
);

export const getAllAccountSelector = (createSelector(
   innerStateSelector,
   (state) => (state)
));

export const getAccountCoursesSelector = (createSelector(
   innerStateSelector,
   (state) => (state.courses)
));

export const getOrdersSelector = (createSelector(
   innerStateSelector,
   (state) => (state.orders)
));

export const accountImgChangedSelector = (createSelector(
   innerStateSelector,
   (state) => (state.accountImgChanged)
));
