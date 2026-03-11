import React from 'react';
import './index.scss';
import Icon from 'components/elements/Icon';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PopupWrapper = ({
   children, close, hasShadow, style, closeClick,
}) => {
   return (
      <div className={ classnames('popupWrapper', { 'popupWithShadow': hasShadow }) } style={ style }>
         { children }
         { close && (
            <div className='closeIcon' role='presentation' onClick={ closeClick }>
               <Icon name='CloseX' />
            </div>
         ) }
      </div>
   );
};

PopupWrapper.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]).isRequired,
   close: PropTypes.bool,
   hasShadow: PropTypes.bool,
   style: PropTypes.object,
   closeClick: PropTypes.func,
};

PopupWrapper.defaultProps = {
   close: true,
   hasShadow: false,
};

export default PopupWrapper;
