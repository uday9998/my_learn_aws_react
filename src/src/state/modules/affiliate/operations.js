
import {
   createAffiliate, deleteAffiliateProgram, getAffiliateEmailSettings,
   getAffiliateGeneralSettings,
   getAffiliateInfo, getAffiliateInputs, getAffiliates, getAffiliateSignInSettings,
   getAffiliatesOffers, getAffiliatesUsers,
   getAffiliateTransactions, getOverview,
   markAsPaidTransaction,
   updateAffiliate,
   updateAffiliateEmailSettings,
   updateAffiliateGeneralSettings,
} from 'api';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { ErrorPrinter } from 'utils/error';
import Router from 'routes/router';
import isPrint from '../designCourse/edit/Error';
import * as actions from './actions';

export const getAffiliateOperation = () => {
   return async dispatch => {
      try {
         dispatch(actions.affiliateInitStart());
         const { data } = await getAffiliates();
         dispatch(actions.affiliateInitEnd(data));
      } catch (error) {
         dispatch(actions.affiliateInitEnd([]));
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};
// CREATE PAGE
export const getAffiliateOffersOperation = () => {
   return async dispatch => {
      try {
         dispatch(actions.affiliateOffersGetStart());
         const { data } = await getAffiliatesOffers();
         dispatch(actions.affiliateOffersGetFinished(data));
      } catch (error) {
         dispatch(actions.affiliateOffersGetFinished([]));
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const createAffiliateOperation = (payload) => {
   return async dispatch => {
      try {
         dispatch(actions.affiliateCreateStart());
         const { data } = await createAffiliate(payload);
         if (isPrint('Affiliate created successfuly.')) {
            toast.success('Affiliate created successfuly.');
         }
         dispatch(push(Router.route('ADMIN_AFFILIATE').getCompiledPath()));
         dispatch(actions.affiliateCreateCompleted(data));
      } catch (error) {
         dispatch(actions.affiliateCreateFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};
// END CREATE PAGE

export const affiliateMainInit = (affiliateId) => {
   return async (dispatch) => {
      try {
         dispatch(actions.affiliateMainGetStart());
         const { data: transactions } = await getAffiliateTransactions(affiliateId);
         const { data: overview } = await getOverview(affiliateId);
         const { data: users } = await getAffiliatesUsers();
         dispatch(actions.affiliateMainGetEnd({
            overview, transactions, users,
         }));
      } catch (error) {
         dispatch(actions.affiliateMainGetEnd());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const affilaiteOverviewFilter = (affiliateId, filterType) => {
   return async (dispatch) => {
      try {
         const { data: overview } = await getOverview(affiliateId, filterType);
         dispatch(actions.affiliateFilterOverview(
            overview
         ));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const affiliateDeleteOperation = (id) => {
   return async (dispatch) => {
      try {
         await deleteAffiliateProgram(id);
         if (isPrint('Affiliate deleted successfuly.')) {
            toast.success('Affiliate deleted successfuly.');
         }
         dispatch(actions.deleteAffiliateProgram(id));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const markAsPaidOperation = (id, transactionId) => {
   return async (dispatch) => {
      try {
         await markAsPaidTransaction(id, transactionId);
         const { data } = await getAffiliateTransactions(id);
         dispatch(actions.markAsPaidAction(data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const userPageInit = (id, affiliateId, filterType, loader) => {
   return async (dispatch) => {
      try {
         if (loader) {
            dispatch(actions.AffiliateGetUserStart());
         }
         const { data } = await getAffiliateInfo(id, affiliateId, filterType);
         dispatch(actions.AffiliateGetUserEnd(data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const initAffiliateProgramSettings = (affiliateId) => {
   return async (dispatch) => {
      try {
         dispatch(actions.AffiliateGetSettingsStart());
         const { data: general } = await getAffiliateGeneralSettings(affiliateId);
         const { data: emailSettings } = await getAffiliateEmailSettings(affiliateId);
         const { data: templateSettings } = await getAffiliateSignInSettings(affiliateId);
         dispatch(actions.AffiliateGetSettingsEnd(
            { general: general[0], emailSettings: emailSettings[0], templateSettings }));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const updateAffiliateProgramSettings = (affiliateId, data) => {
   return async () => {
      try {
         await updateAffiliateEmailSettings(affiliateId, data.emailSettings.id, data.emailSettings);
         await updateAffiliateGeneralSettings(affiliateId, data.general.id, data.general);
         if (isPrint('Changes saved successfuly.')) {
            toast.success('Changes saved successfuly.');
         }
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const getAffiliateInputsOperation = (affiliateId, changeState) => {
   return async dispatch => {
      try {
         dispatch(actions.AffiliateInputsGetStart());
         const { data } = await getAffiliateInputs(affiliateId);
         changeState({
            commissions: data.program_offers,
            selectedOffers: data.program_offers.map((e) => e.plan_id),
         });
         dispatch(actions.AffiliateInputsGetEnd(data));
      } catch (error) {
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};

export const updateAffiliateOperation = (id, payload) => {
   return async dispatch => {
      try {
         dispatch(actions.AffiliateUpdateStart());
         const { data } = await updateAffiliate(id, payload);
         if (isPrint('Affiliate updated successfuly.')) {
            toast.success('Affiliate updated successfuly.');
         }
         // dispatch(push(Router.route('ADMIN_AFFILIATE').getCompiledPath()));
         dispatch(actions.AffiliateUpdateCompleted(data));
      } catch (error) {
         dispatch(actions.AffiliateUpdateFailed());
         if (error && error.response && error.response.data) {
            ErrorPrinter(error.response);
         }
      }
   };
};
