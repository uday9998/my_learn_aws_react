import { useState } from 'react';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import Auth from 'utils/Auth';


export const useApiLazyQuery = (query, {
   onSuccess, successMessage, onError, errorMessage,
} = {}) => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [data, setData] = useState();
   const [status, setStatus] = useState();
   const invokeQuery = (...args) => {
      query(...args)
         .then(response => {
            setData(response.data);
            setStatus(response.status);
            setLoading(false);
            if (typeof onSuccess === 'function') {
               onSuccess(response);
            } else if (successMessage && isPrint(successMessage)) {
               toast.success(successMessage);
            }
         })
         .catch(err => {
            setError(err);
            if (typeof onError === 'function') {
               onError(error);
            } else {
               let message = errorMessage || 'Something Went Wrong!';
               if (err.response) {
                  if (error.response.status === 401) {
                     Auth.logout();
                     window.location.href = '/portal/membership';
                  } else if (error.response.data) {
                     message = error.response.data.message;
                  }
               }
               if (isPrint(message)) {
                  toast.error(message);
               }
            }
         });
   };
   return [
      invokeQuery, {
         data, loading, status, error,
      },
   ];
};
