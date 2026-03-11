import {
   getSites, addSite, deleteSite, updateSite, loginSite,
} from 'api/AuthApi';
import * as action from 'state/modules/sites/actions';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';


export const getSitesOperation = () => {
   return async (dispatch) => {
      dispatch(action.getSitesStart());
      try {
         const {
            data,
         } = await getSites();
         dispatch(action.getSitesCompleted(data));
      } catch (error) {
         if (error.response && error.response.status === 401) {
            window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const addSiteOperation = (inputs) => {
   return async (dispatch) => {
      dispatch(action.addSiteStart());
      try {
         const {
            data,
         } = await addSite(inputs);
         dispatch(action.addSiteCompleted(data));
         if (isPrint('The site has been added.')) {
            toast.success('The site has been added.');
         }
      } catch (error) {
         dispatch(action.addSiteFailed(error.response && error.response.data));
         let errorMessage;
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               errorMessage = error.response.data.errors;
               if (errorMessage.name) {
                  if (isPrint(errorMessage.name[0])) {
                     toast.error(errorMessage.name[0]);
                  }
               }
               if (errorMessage.subdomain) {
                  if (isPrint(errorMessage.subdomain[0])) {
                     toast.error(errorMessage.subdomain[0]);
                  }
               }
            }
         } else {
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
            if (error.response && error.response.status === 401) {
               window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
            }
         }
      }
   };
};


export const deleteSiteOperation = (id) => {
   return async (dispatch) => {
      dispatch(action.deleteSiteStart());
      try {
         await deleteSite(id);
         dispatch(action.deleteSiteCompleted(id));
         if (isPrint('The site deleted successfully.')) {
            toast.success('The site deleted successfully.');
         }
      } catch (error) {
         if (error.response && error.response.status === 401) {
            window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const updateSiteOperation = (id, inputs) => {
   return async (dispatch) => {
      dispatch(action.updateSiteStart());
      try {
         await updateSite(id, inputs);
         dispatch(action.updateSiteCompleted(id, inputs));
         if (isPrint('The site has been updated.')) {
            toast.success('The site has been updated');
         }
      } catch (error) {
         dispatch(action.updateSiteFailed(error.response && error.response.data));
         let errorMessage;
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               errorMessage = error.response.data.errors;
               if (errorMessage.name) {
                  if (isPrint(errorMessage.name[0])) {
                     toast.error(errorMessage.name[0]);
                  }
               }
               if (errorMessage.subdomain) {
                  if (isPrint(errorMessage.subdomain[0])) {
                     toast.error(errorMessage.subdomain[0]);
                  }
               }
            }
         } else {
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
            if (error.response && error.response.status === 401) {
               window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
            }
         }
      }
   };
};


export const loginSiteOperation = (id, subdomain) => {
   return async (dispatch) => {
      dispatch(action.loginSiteStart());
      try {
         const {
            data,
         } = await loginSite(id);
         if (data && data.token) {
            window.open(`${ process.env.REACT_APP_PROTOCOL }${ subdomain }.${ process.env.REACT_APP_MAIN_DOMAIN }?jwt-token=${ data.token }`, '_blank');
         }
         dispatch(action.loginSiteCompleted(id, data));
      } catch (error) {
         if (error.response && error.response.status === 401) {
            window.location.href = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
