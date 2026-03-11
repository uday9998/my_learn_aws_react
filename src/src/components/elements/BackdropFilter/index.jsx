import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const BackdropFilter = ({ children, active, fixed }) => {
   return (
      active ? (
         <div className={ classnames('backdropFilterWrapper', { 'backdropFixed': fixed }) }>
            <div className='backdropFilter'>
               {children[0]}
            </div>
            <div className='popupContainer'>
               {children[1]}
            </div>
         </div>
      ) : <>{children[0]}</>
   );
};

BackdropFilter.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]).isRequired,
   active: PropTypes.bool,
   fixed: PropTypes.bool,
};

BackdropFilter.defaultProps = {
   active: false,
   fixed: true,
};

export default BackdropFilter;
