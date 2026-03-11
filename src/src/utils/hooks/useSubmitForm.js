import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';

function isClientError(status) {
   return status > 399 && status < 500;
}

function showErrorFromApiResponse(errorsInput) {
   const errors = errorsInput || {};
   let textArray = '';
   Object.values(errors).forEach(error => {
      if (error && error[0]) {
         textArray += `${ error[0] }<br>`;
      }
      if (typeof error === 'string' && !textArray && isPrint(error)) {
         toast.warn(error);
      } else if (!textArray && isPrint(error.join(' '))) {
         toast.warn(error.join(' '));
      }
   });
   if (textArray && isPrint(`<div>${ textArray }</div>`)) {
      // eslint-disable-next-line react/no-danger
      toast.warn(<div dangerouslySetInnerHTML={ { __html: textArray } } />);
   }
}
let isSuccess = true;
export const useSubmitForm = (action, optinons = {}, classButton) => {
   const [loading, setLoading] = useState(false);

   // eslint-disable-next-line consistent-return
   const submit = useCallback(async (data, onSuccess = () => {}, onError = () => {}) => {
      if (document.querySelector(classButton)) {
         document.querySelector(classButton).setAttribute('disabled', 'disabled');
      }
      const {
         successMessage, unHundleedErrorMessage = 'Something Went Wrong',
      } = optinons;
      try {
         setLoading(true);
         const { data: responseData } = await action(data);
         if (document.querySelector(classButton)) {
            document.querySelector(classButton).removeAttribute('disabled');
         }
         if (responseData && responseData.original) {
            if (isPrint(responseData.original)) {
               toast.warn(responseData.original);
            }
         } else if (successMessage) {
            if (successMessage === 'isPublished') {
               if (data.isPublished) {
                  if (isPrint('Landing has been published.')) {
                     toast.success('Landing has been published.');
                  }
               } else if (isPrint('Landing has been unpublished.')) {
                  toast.success('Landing has been unpublished.');
               }
            } else if (isSuccess) {
               if (isPrint(successMessage)) {
                  toast.success(successMessage);
               }
               isSuccess = !isSuccess;
               setTimeout(() => {
                  isSuccess = !isSuccess;
               }, 6500);
            }
         }
         onSuccess(responseData);
         setLoading(false);
      } catch (err) {
         if (err.response && err.response.data && err.response.data.hasOwnProperty('author')) {
            return toast.warn(err.response.data.author[0]);
         }

         if (document.querySelector(classButton)) {
            document.querySelector(classButton).removeAttribute('disabled');
         }
         setLoading(false);
         if (err.response && isClientError(err.response.status)) {
            const showErrorsWithoutToast = onError(err.response);
            if (showErrorsWithoutToast) return err.response;

            const { response: { data: responseData } = {} } = err;

            if (typeof responseData === 'object' && responseData.error) {
               if (isPrint(responseData.error)) {
                  return toast.warn(responseData.error);
               }
            }

            if (typeof responseData === 'object' && responseData.errors) {
               return showErrorFromApiResponse(responseData.errors);
            }
            return toast.warn(responseData);
         }
         if (err.response && !isClientError(err.response.status)) {
            return toast.warn(unHundleedErrorMessage);
         }
      }
   }, [action, setLoading, optinons]);

   return [submit, { loading }];
};
