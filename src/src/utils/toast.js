import React from 'react';
import { toast, cssTransition } from 'react-toastify';
import { css } from 'glamor';

let toastId = null;
export default {
   info(text, top) {
      const Slide = cssTransition({
         enter: 'zoomIn',
         exit: 'zoomOut',
         appendPosition: false,
      });
      const TextSection = () => {
         return (
            <React.Fragment>
               <div className='toaster-filter' />
               <div className='success_section'>
                  {text}
               </div>
            </React.Fragment>
         );
      };
      if (!toast.isActive(toastId)) {
         toastId = toast(TextSection, {
            position: toast.POSITION.TOP_CENTER,
            transition: Slide,
            className: css({
               top,
               backgroundColor: 'transparent !important',
               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12) !important',
               minHeight: ' 32px !important',
            }),
            bodyClassName: 'toast-body toast-body-info',
            progressClassName: 'toast-progress-bar toast-progress-bar-success',
            closeButton: true,
         });
      }
   },
   success(text, top) {
      const Slide = cssTransition({
         enter: 'zoomIn',
         exit: 'zoomOut',
         appendPosition: false,
      });
      const TextSection = () => {
         return (
            <React.Fragment>
               <div className='toaster-filter' />
               <div className='success_section'>
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                     <path d='M8 0.5C3.875 0.5 0.5 3.875 0.5 8C0.5 12.125 3.875 15.5 8 15.5C12.125 15.5 15.5 12.125 15.5 8C15.5 3.875 12.125 0.5 8 0.5ZM5.975 11.225L3.275 8.525C2.975 8.225 2.975 7.775 3.275 7.475C3.575 7.175 4.025 7.175 4.325 7.475L6.5 9.65L11.675 4.475C11.975 4.175 12.425 4.175 12.725 4.475C13.025 4.775 13.025 5.225 12.725 5.525L7.025 11.225C6.725 11.525 6.275 11.525 5.975 11.225Z' fill='white' />
                  </svg>
                  {text}
               </div>
            </React.Fragment>
         );
      };
      if (!toast.isActive(toastId)) {
         toastId = toast(TextSection, {
            position: toast.POSITION.TOP_CENTER,
            className: css({
               top,
               backgroundColor: 'transparent !important',
               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)!important',
               minHeight: ' 32px !important',
            }),
            bodyClassName: 'toast-body toast-body-success',
            style: '{top:top}',
            transition: Slide,
            progressClassName: 'toast-progress-bar toast-progress-bar-success',
            closeButton: false,
         });
      }
   },
   error(top) {
      const Slide = cssTransition({
         enter: 'zoomIn',
         exit: 'zoomOut',
         appendPosition: false,
      });
      const TextSection = () => {
         return (
            <React.Fragment>
               <div className='toaster-filter error' />
               <div className='success_section'>
                  Something went wrong!
               </div>
            </React.Fragment>
         );
      };
      if (!toast.isActive(toastId)) {
         toastId = toast(TextSection, {
            position: toast.POSITION.TOP_CENTER,
            className: css({
               top,
               backgroundColor: 'transparent !important',
               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)!important',
               minHeight: ' 32px !important',
            }),
            bodyClassName: 'toast-body toast-body-success',
            style: '{top:top}',
            transition: Slide,
            progressClassName: 'toast-progress-bar toast-progress-bar-success',
            closeButton: false,
         });
      }
   },
   info1(text, top) {
      const Slide = cssTransition({
         enter: 'zoomIn',
         exit: 'zoomOut',
         appendPosition: false,
      });
      const TextSection = () => {
         return (
            <React.Fragment>
               <div className='toaster-filter info1' />
               <div className='success_section'>
                  {text}
               </div>
            </React.Fragment>
         );
      };
      if (!toast.isActive(toastId)) {
         toastId = toast(TextSection, {
            position: toast.POSITION.TOP_CENTER,
            transition: Slide,
            className: css({
               top,
               backgroundColor: 'transparent !important',
               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)!important',
               minHeight: ' 32px !important',
            }),
            bodyClassName: 'toast-body toast-body-info',
            progressClassName: 'toast-progress-bar toast-progress-bar-success',
            closeButton: false,
         });
      }
   },
};
