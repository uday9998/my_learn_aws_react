import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Header from '../AdminHeader';


const AdminContentAlt = ({ children }) => {
   return (
      <div className='adminContentAlt'>
         {children}
      </div>
   );
};

AdminContentAlt.propTypes = {
   children: PropTypes.any,
};

AdminContentAlt.Header = Header;

export default AdminContentAlt;
