import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


const ProgressChart = ({ type, prsent, classNme }) => {
   return (
      <div className={ `progress__chart progress__chart__${ type } ${ classNme }` }>
         <div className='progress__bar' style={ { width: `${ prsent }%` } } />
      </div>
   );
};


ProgressChart.propTypes = {
   type: PropTypes.string,
   prsent: PropTypes.any,
   classNme: PropTypes.string,
};


export default ProgressChart;
