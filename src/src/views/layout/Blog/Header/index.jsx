import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Header = ({ children }) => {
   return (
      <div className='header' id='header'>
         {children}
      </div>
   );
};

Header.propTypes = {
   children: PropTypes.any,
};

export default Header;
