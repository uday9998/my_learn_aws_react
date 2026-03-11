import React from 'react';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';

export const ErrorPrinter = ({ data }) => {
   if (data && data.errors) {
      const errors = data.errors || {};
      let textArray = '';
      Object.values(errors).forEach(error => {
         if (error && error[0]) {
            textArray += `${ error[0] }<br>`;
         }
         if (typeof error === 'string' && !textArray && isPrint(error)) {
            toast.error(error);
         } else if (!textArray && isPrint(error.join(' '))) {
            toast.error(error.join(' '));
         }
      });
      if (textArray && isPrint(`<div>${ textArray }</div>`)) {
         // eslint-disable-next-line react/no-danger
         toast.error(<div dangerouslySetInnerHTML={ { __html: textArray } } />);
      }
      // const keys = Object.keys(data.errors);
      // keys.forEach((item) => {
      //    const errors = data.errors[item];
      //    if (errors.length) {
      //       errors.forEach(element => {
      //          if (isPrint(element)) {
      //             toast.error(element);
      //          }
      //       });
      //    }
      // });
   }
};
