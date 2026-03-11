import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import classNames from 'classnames';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import ReactTooltip from 'react-tooltip';

export const THEMES = {
   light: 'light',
   delete: 'delete',
   primary: 'primary',
   inherit: 'inherit',
   white: 'white',
};

const IconButton = ({
   name, theme, wBorder, onClick, className, disabled, title, tooltip, color, style,
}) => {
   const tooltipRef = React.useRef(null);
   return (
      <button
         type='button'
         title={ title }
         style={ style }
         data-tip={ tooltip }
         onClick={ disabled ? () => {} : onClick }
         className={
            classNames(
               'iconButton',
               className,
               {
                  [`iconButton__${ theme }`]: theme && !disabled,
                  [`iconButton__${ theme }__border`]: wBorder && theme && !disabled,
                  'iconButton__disabled': disabled,
               }
            )
         }
      >
         <Icon name={ name } color={ color } />
         <IconNew name={ name } color={ color } />
         {tooltip && (
            <ReactTooltip
               borderColor='#E7E9E9'
               border='1px solid #E7E9E9'
               ref={ tooltipRef }
               className='iconButton__tooltip'
               backgroundColor='#FFFFFF'
               textColor='#131F1E'
            />
         )}

      </button>
   );
};

IconButton.propTypes = {
   name: PropTypes.string,
   onClick: PropTypes.func,
   theme: PropTypes.string,
   wBorder: PropTypes.bool,
   className: PropTypes.string,
   disabled: PropTypes.bool,
   tooltip: PropTypes.string,
   title: PropTypes.string,
   color: PropTypes.string,
   style: PropTypes.object,
};

export default IconButton;
