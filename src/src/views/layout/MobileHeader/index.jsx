import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const MobileHeader = ({ children }) => {
   return (
      <div className='mobileHeader'>
         {children}
      </div>
   );
};

export default MobileHeader;

MobileHeader.propTypes = {
   children: PropTypes.any,
};
