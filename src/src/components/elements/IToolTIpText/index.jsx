import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ReactTooltip from 'react-tooltip';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

const IToolTipText = ({
   tooltip, title, children, isStatus,
}) => {
   return (
      <div className={ !isStatus ? 'tooltip__with__text' : '' }>
         {tooltip.length && (
            <div className='tooltip' data-tip={ tooltip }>
               {/* <Icon name={ iconName || 'ToolTipI' }
               style={ { marginTop: '10px' } } className='backIcon' color={ color } /> */}
               {children || (
                  <Text
                     size={ sizes.xx_small }
                     type={ types.medium140 }
                     inner={ title }
                     style={ { color: '#fff' } }
                  />
               )
               }

               <ReactTooltip />
            </div>
         )}
      </div>
   );
};

IToolTipText.propTypes = {
   tooltip: PropTypes.string,
   title: PropTypes.string,
   children: PropTypes.any,
   isStatus: PropTypes.bool,
};

export default IToolTipText;
