
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const MemberContainer = ({ children }) => {
   return (
      <div className='member-container'>
         <div className='member-container-wrapper'>
            {children}
         </div>
      </div>
   );
};

export const MemberContainerFilter = ({ children }) => {
   return (
      <div className='member-container-filter'>
         {children}
      </div>
   );
};
MemberContainerFilter.propTypes = {
   children: PropTypes.any,
};

MemberContainer.propTypes = {
   children: PropTypes.any,
};

export default MemberContainer;
