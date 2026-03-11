import React from 'react';
import PropTypes from 'prop-types';

export const ToolTipIcon = ({ style }) => {
   return (
      <svg width='20' height='20' style={ style } viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <circle cx='9.99996' cy='10' r='8.33333' stroke='#131F1E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
         <ellipse cx='9.99996' cy='13.3333' rx='0.833333' ry='0.833333' fill='#131F1E' />
         <path d='M8.33337 8.75V8.33333C8.33337 7.41286 9.07957 6.66666 10 6.66666V6.66666V6.66666C10.9205 6.66666 11.6667 7.41286 11.6667 8.33333V8.43443C11.6667 8.90327 11.4805 9.35291 11.1489 9.68443L10 10.8333' stroke='#131F1E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
   );
};

export const ToolTipIIcon = () => {
   return (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <path fillRule='evenodd' clipRule='evenodd' d='M7.99992 1.83334C4.59416 1.83334 1.83325 4.59425 1.83325 8C1.83325 11.4058 4.59416 14.1667 7.99992 14.1667C11.4057 14.1667 14.1666 11.4058 14.1666 8C14.1666 4.59425 11.4057 1.83334 7.99992 1.83334ZM0.833252 8C0.833252 4.04196 4.04188 0.833336 7.99992 0.833336C11.958 0.833336 15.1666 4.04196 15.1666 8C15.1666 11.958 11.958 15.1667 7.99992 15.1667C4.04188 15.1667 0.833252 11.958 0.833252 8ZM7.99992 6.83334C8.27606 6.83334 8.49992 7.05719 8.49992 7.33334V10.6667C8.49992 10.9428 8.27606 11.1667 7.99992 11.1667C7.72378 11.1667 7.49992 10.9428 7.49992 10.6667V7.33334C7.49992 7.05719 7.72378 6.83334 7.99992 6.83334ZM7.99992 6C8.36811 6 8.66659 5.70153 8.66659 5.33334C8.66659 4.96515 8.36811 4.66667 7.99992 4.66667C7.63173 4.66667 7.33325 4.96515 7.33325 5.33334C7.33325 5.70153 7.63173 6 7.99992 6Z' fill='#131F1E' />
      </svg>
   );
};

export const AffiliateQuestionMIcon = () => {
   return (
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <circle cx='10.0003' cy='10.0003' r='8.33333' stroke='#131F1E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
         <ellipse cx='10.0003' cy='13.3333' rx='0.833333' ry='0.833333' fill='#131F1E' />
         <path d='M8.33301 8.75033V8.33366C8.33301 7.41318 9.0792 6.66699 9.99967 6.66699V6.66699V6.66699C10.9201 6.66699 11.6663 7.41318 11.6663 8.33366V8.43476C11.6663 8.9036 11.4801 9.35324 11.1486 9.68476L9.99967 10.8337' stroke='#131F1E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
   );
};


ToolTipIcon.propTypes = {
   style: PropTypes.object,
};
ToolTipIIcon.propTypes = {

};
AffiliateQuestionMIcon.propTypes = {

};
