import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children }) => {
   return (
      <>
         {children}
      </>
   );
};

Header.propTypes = {
   children: PropTypes.any,
};

export default Header;
