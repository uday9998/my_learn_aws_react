import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const ItemWrapper = ({
   children, isOpen, border, style, active, secondShadow,
}) => {
   return (
      <div
         style={ style }
         className={ classNames(
            'itemWrapper',
            `itemWrapper_isOpen_${ isOpen }`,
            {
               'border__old': border,
               'item-active': active,
               'secondShadow': secondShadow,
            }
         ) }
      >
         {children}
      </div>
   );
};

ItemWrapper.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]).isRequired,
   isOpen: PropTypes.bool,
   border: PropTypes.bool,
   active: PropTypes.bool,
   style: PropTypes.object,
   secondShadow: PropTypes.bool,
};

ItemWrapper.defaultProps = {
   isOpen: true,
   border: false,
   active: false,
   secondShadow: false,
};

export default ItemWrapper;
