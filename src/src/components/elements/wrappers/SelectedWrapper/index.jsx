import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SelectedWrapper = ({
   children, style, hasSelected, active, hasShadow,
}) => {
   return (
      <div className='selectedWrapper_container'>
         <div
            style={ style }
            className={ classNames(
               'selectedWrapper',
               {
                  'shadow': hasShadow,
                  'selected': hasSelected,
                  'active': active,
               }
            ) }
         >
            {children}
         </div>
      </div>
   );
};

SelectedWrapper.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]).isRequired,
   style: PropTypes.object,
   hasSelected: PropTypes.bool,
   active: PropTypes.bool,
   hasShadow: PropTypes.bool,
};

SelectedWrapper.defaultProps = {
   hasSelected: false,
   active: false,
   hasShadow: false,
};

export default SelectedWrapper;
