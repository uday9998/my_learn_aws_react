import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const ArrowButton = ({ direction, onClick, className }) => {
   return (
      <button type='button' className={ `${ className } arrowButton` } onClick={ onClick }>
         <i className={ `arrow ${ direction }` } />
      </button>
   );
};

ArrowButton.propTypes = {
   direction: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
};

export default ArrowButton;
