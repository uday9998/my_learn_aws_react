import React from 'react';
import PropTypes from 'prop-types';

const SocketLayout = ({ children }) => {
   return (
      <>
         {children}
      </>
   );
};


SocketLayout.propTypes = {
   children: PropTypes.any,
};
export default SocketLayout;
