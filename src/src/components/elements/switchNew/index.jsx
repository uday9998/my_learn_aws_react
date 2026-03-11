/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Icon from '../Icon';


export const SIZES = {
   big: 'big',
   medium: 'medium',
   small: 'small',
};

const Switch = ({
   label = false, value, onChange, disabled = false, size = 'big', tooltip, iconName, positionText,
}) => {
   return (
      <div className={ `switch switch__${ SIZES[size] }` }>

         <label
            className='toggle'
            role='presentation'
            onClick={ (e) => {
               e.preventDefault();
               e.stopPropagation();
               onChange(!value);
            } }
         >
            {positionText === 'left' && label && (
               <div className='switch_text'>{label}</div>
            )}
            <input
               className={ `toggle-checkbox ${ disabled ? `toggle_checkbox_${ value }` : '' }` }
               disabled={ disabled }
               type='checkbox'
               checked={ value }
               onChange={ (e) => {
                  onChange(e.target.checked);
               } }
            />
            <div className={ `toggle-switch${ value ? '  toggle-switch-active ' : '' }${ disabled ? ` toggle_disabled_${ value }` : '' }` } />
         </label>
         {positionText === 'right' && label && (
            <div className='switch_text'>{label}</div>
         )}
         {tooltip && (
            <div className='tooltip switch_tooltip' data-tip={ tooltip }>
               <Icon name={ iconName || 'ToolTipI' } style={ { marginTop: '10px' } } className='backIcon' />
               <ReactTooltip />
            </div>
         )}
      </div>
   );
};

Switch.propTypes = {
   label: PropTypes.string,
   onChange: PropTypes.func,
   value: PropTypes.bool,
   disabled: PropTypes.bool,
   size: PropTypes.string,
   tooltip: PropTypes.string,
   positionText: PropTypes.string,
   iconName: PropTypes.string,
};

export default Switch;
