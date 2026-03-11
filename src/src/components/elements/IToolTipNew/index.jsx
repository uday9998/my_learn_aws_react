import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ReactTooltip from 'react-tooltip';
import IconNew from '../iconsSize';

const IToolTipNew = ({
   tooltip, iconName, color, id, className,
}) => {
   return (
      <div className='tooltipNew_container'>
         {tooltip.length && (
            <div className='tooltipNew' data-tip={ tooltip } data-for={ id }>
               <IconNew name={ iconName || 'ToolTipI' } style={ { marginTop: '10px' } } className='backIcon' color={ color } />
               <ReactTooltip id={ id } anchorId={ id } bottom={ true } className={ className } />
            </div>
         )}
      </div>
   );
};

IToolTipNew.propTypes = {
   tooltip: PropTypes.string,
   iconName: PropTypes.string,
   color: PropTypes.string,
   id: PropTypes.string,
   className: PropTypes.string,
};

export default IToolTipNew;
