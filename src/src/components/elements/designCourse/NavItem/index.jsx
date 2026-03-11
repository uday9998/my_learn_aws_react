import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';

const NavItem = ({
   text, style, active, tabId, switchTab, primaryTheme, color, activeColor,
}) => {
   return (
      <div
         style={ style }
         className={ `${ tabId } navItem` }
         role='presentation'
         onClick={ () => {
            switchTab(tabId);
         } }
      >
         <div
            className={ cx(
               'navItem__link',
               {
                  'navItem__link_active': active,
               }
            ) }
            style={ { '--active-color': activeColor } }
         >
            <Text
               type={ textType.normal }
               size={ textSize.extraSmall }
               inner={ text }
               style={ { fontFamily: primaryTheme, color } }
            />
         </div>
      </div>
   );
};

export default NavItem;

NavItem.propTypes = {
   text: PropTypes.string,
   style: PropTypes.object,
   active: PropTypes.bool,
   tabId: PropTypes.any,
   switchTab: PropTypes.func,
   primaryTheme: PropTypes.string,
   color: PropTypes.string,
   activeColor: PropTypes.string,
};

NavItem.defaultProps = {
   text: 'Class Material',
   activeColor: '#006dff',
};
