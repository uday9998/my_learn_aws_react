import { createSelector } from 'reselect';

const innerStateSelector = state => {
   return state.affiliate;
};


export const dataSelector = createSelector(
   innerStateSelector,
   (state) => (state.data)
);

export const affiliatesLoadingSelector = createSelector(
   innerStateSelector,
   (state) => (state.loading)
);

// CREATE PAGE
export const affiliatesOffersSelector = createSelector(
   innerStateSelector,
   (state) => (state.offers)
);

export const affiliatesOffersLoadingSelector = createSelector(
   innerStateSelector,
   (state) => (state.offersLoading)
);

export const affiliateCreateLoadingSelector = createSelector(
   innerStateSelector,
   (state) => state.createLoading
);
// END CREATE PAGE

export const affiliateMainInfoSelector = createSelector(
   innerStateSelector,
   (state) => state.mainInfo
);

export const affiliateMainLoadingSelector = createSelector(
   innerStateSelector,
   state => state.mainLoading
);

export const affiliateUserPageLoadingSelector = createSelector(
   innerStateSelector,
   (state) => state.userPageLoading
);

export const affiliateUserDataSelector = createSelector(
   innerStateSelector,
   (state) => state.user
);

export const affiliateSettingsSelector = createSelector(
   innerStateSelector,
   (state) => state.settings
);

export const affiliateSettingsLoadingSelector = createSelector(
   innerStateSelector,
   (state) => state.settingsLoading
);

export const affiliateEditLoaderSelector = createSelector(
   innerStateSelector,
   (state) => state.editLoader
);

export const affiliateInputsSelector = createSelector(
   innerStateSelector,
   (state) => state.inputs
);
