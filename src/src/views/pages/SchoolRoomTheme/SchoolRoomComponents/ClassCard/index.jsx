import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.css';

const ClassCard = (props) => {
   const {
      slug, className, children, item, onClick, isPreview,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   const style = { backgroundColor: item.props.bgColor };
   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'classCard': !active || isPreview,
            'classCard mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => {
            onClick(e);
         } }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ style }
      >
         {children}
      </div>
   );
};


ClassCard.defaultProps = {
};

ClassCard.propTypes = {
   className: PropTypes.string,
   item: PropTypes.object,
   children: PropTypes.any,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   slug: PropTypes.string,
};

export default ClassCard;
