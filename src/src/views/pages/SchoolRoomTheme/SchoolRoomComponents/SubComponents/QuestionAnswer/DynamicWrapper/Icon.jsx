import React from 'react';
import PropTypes from 'prop-types';

const TriangleSvgIcon = ({ isOpen, style }) => {
   return (
      <svg style={ style || {} } className={ `triangleSvg_isOpen_${isOpen}` } xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
         <g fill='none' fillRule='evenodd'>
            <path d='M0 0h24v24H0z' />
            <path fill='#3F4F65' fillRule='nonzero' d='M8.667 17.714V6.286L15.333 12z' />
         </g>
      </svg>
   );
};

TriangleSvgIcon.propTypes = {
   isOpen: PropTypes.bool,
   style: PropTypes.object,
};

export default TriangleSvgIcon;
