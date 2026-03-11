
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const ReportsContainer = ({ children }) => {
   return (
      <div className='report-container'>
         {children}
      </div>
   );
};

export const ReportsContainerFilter = ({ children }) => {
   return (
      <div className='report-container-filter'>
         {children}
      </div>
   );
};
ReportsContainerFilter.propTypes = {
   children: PropTypes.any,
};

ReportsContainer.propTypes = {
   children: PropTypes.any,
};

export default ReportsContainer;
