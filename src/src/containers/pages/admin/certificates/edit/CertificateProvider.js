import React from 'react';
import PropTypes from 'prop-types';

export const CertificateContext = React.createContext({});

const CertificateProvider = ({ value, children }) => {
   return (
      <CertificateContext.Provider value={ value }>
         {children}
      </CertificateContext.Provider>
   );
};
CertificateProvider.propTypes = {
   value: PropTypes.any,
   children: PropTypes.node,
};

export default CertificateProvider;
