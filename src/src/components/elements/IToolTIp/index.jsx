import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ReactTooltip from 'react-tooltip';
import Icon from 'components/elements/Icon';

const IToolTip = ({
   tooltip, iconName, color, id, children,
}) => {
   if (!tooltip) {
      return null;
   }
   return (
      <div className='page__title'>
         {tooltip.length && (
            <div className='tooltip' data-tip={ tooltip } data-for={ id }>
               {
                  children || <Icon name={ iconName || 'ToolTipI' } style={ { marginTop: '10px' } } className='backIcon' color={ color } />
               }
               <ReactTooltip id={ id } anchorId={ id } bottom={ true } />
            </div>
         )}
      </div>
   );
};

IToolTip.propTypes = {
   tooltip: PropTypes.string,
   iconName: PropTypes.string,
   color: PropTypes.string,
   id: PropTypes.string,
   children: PropTypes.any,
};

export default IToolTip;
