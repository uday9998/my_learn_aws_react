import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


const AdminHeader = ({ children }) => {
   return (
      <div className='adminHeader' id='adminHeader'>
         {children}
      </div>
   );
};

AdminHeader.propTypes = {
   children: PropTypes.any,
};

export default AdminHeader;
