import React from 'react';
import PropTypes from 'prop-types';

export const ProgressIcon = ({ className }) => {
   return (
      <svg className={ className } xmlns='http://www.w3.org/2000/svg' width='120.024' height='120.024' viewBox='0 0 120.024194 120.024194'>
         <g fill='#7CB740' fillRule='nonzero'>
            <path d='M60.012 120.024c33.144 0 60.012-26.868 60.012-60.012C120.024 26.868 93.156 0 60.012 0 26.868 0 0 26.868 0 60.012c0 33.144 26.868 60.012 60.012 60.012zm0-11.903c-26.57 0-48.109-21.54-48.109-48.109 0-26.57 21.54-48.109 48.11-48.109 26.569 0 48.108 21.54 48.108 48.11 0 26.569-21.54 48.108-48.109 48.108z' opacity='.199' />
            {/*  <path d='M32.986 113.445c8.363
             4.303 17.648 6.58 27.246 6.58 33.028 0 59.792-26.875 59.792
             -60.013S93.26 0 60.232 0a5.952 5.952 0 1 0 0 11.903c26.443 0 47.8
             89 21.534 47.889 48.11 0 26.574-21.446 48.108-47.89 48.108-7.69 0
             -15.11-1.819-21.798-5.26a5.952 5.952 0 1 0-5.447 10.584z' /> */}
         </g>
      </svg>
   );
};

export const CircleGraphIcon = ({ style }) => {
   return (
      <svg xmlns='http://www.w3.org/2000/svg' width='44px' height='44px' style={ style } viewBox='0 0 44 44' version='1.1'>
         <defs>
            <polygon id='path-1' points='0 32.9053349 22.5834201 21.4569063 22.5834201 -0.0361328125 44 -0.0361328125 44 43.9638672 0 43.9638672' />
         </defs>
         <g id='14.-Members' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <g id='Artboard'>
               <g id='Circle-Graph'>
                  <circle id='Oval-2' stroke='#E8E8E8' strokeWidth='5' cx='23' cy='22' r='14.5' />
                  <mask id='mask-2' fill='white'>
                     <use xlinkHref='#path-1' />
                  </mask>
                  <g id='Rectangle-3' />
                  <circle id='Oval-2' stroke='#006DFF' strokeWidth='5' mask='url(#mask-2)' cx='23' cy='22' r='14.5' />
               </g>
            </g>
         </g>
      </svg>
   );
};

// Prop Types
ProgressIcon.propTypes = {
   className: PropTypes.string,
};

CircleGraphIcon.propTypes = {
   style: PropTypes.object,
};
