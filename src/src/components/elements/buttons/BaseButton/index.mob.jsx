import React from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const THEME = {
   lightGreen: 'lightGreen',
   darkGreen: 'darkGreen',
   grey: 'grey',
   blueBordered: 'blueBordered',
   lightBlue: 'lightBlue',
   darkBlue: 'darkBlue',
};

const BaseButton = ({
   theme, onClick, text, disabled, style,
}) => {
   return (
      <button
         type='button'
         style={ style }
         onClick={ disabled ? null : onClick }
         className={
            classNames(
               'mob-btnBasic',
               {
                  'mob-btnBasic_disable_true': disabled,
                  [`mob-btnBasic_theme_${ theme }`]: theme,
               })
         }
      >
         {text}
      </button>
   );
};

BaseButton.propTypes = {
   disabled: PropTypes.bool,
   theme: PropTypes.string,
   text: PropTypes.string,
   onClick: PropTypes.func,
   style: PropTypes.object,
};

BaseButton.defaultProps = {
   theme: 'darkGreen',
   text: 'button',
   disabled: false,
};

export default BaseButton;
