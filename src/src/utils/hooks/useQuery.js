import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import Auth from 'utils/Auth';

export const useApiQuery = (query, params, { onError, errorMessage, callback } = {}) => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [data, setData] = useState();
   const [status, setStatus] = useState();
   
   useEffect(() => {
      // Don't make API call if no query provided (for auth guards)
      if (!query) {
         setLoading(false);
         return;
      }

      query.apply(this, params)
         .then(response => {
            setData(response.data);
            if (callback) {
               callback(response.data);
            }
            setStatus(response.status);
            setLoading(false);
         })
         .catch(err => {
            setError(err);
            setLoading(false);
            if (typeof onError === 'function') {
               onError(err); // Fixed: use err instead of error
            } else {
               let message = errorMessage || 'Something Went Wrong!';
               if (err.response) {
                  // Fixed: use err instead of error
                  if (err.response && err.response.status === 401) {
                     // Don't show toast for 401 errors - interceptor handles logout
                     Auth.logout();
                     window.location.href = '/portal/membership';
                     return; // Exit early, don't show toast
                  } else if (err.response && err.response.data) {
                     message = err.response.data.message;
                  }
               }
               // Only show toast for non-401 errors
               if (isPrint(message)) {
                  toast.error(message);
               }
            }
         });
   }, []);
   
   return {
      data, loading, status, error, setData,
   };
};