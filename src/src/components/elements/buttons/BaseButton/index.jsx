/* eslint-disable react/button-has-type */
import React from 'react';
import './index.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const THEME = {
   lightGreen: 'lightGreen',
   darkGreen: 'darkGreen',
   grey: 'grey',
   blueBordered: 'blueBordered',
   greenBordered: 'greenBordered',
   redBordered: 'redBordered',
   lightBlue: 'lightBlue',
   darkBlue: 'darkBlue',
   darkRed: 'darkRed',
   darkBlack: 'darkBlack',
   whiteBordered: 'whiteBordered',
   lightWhite: 'lightWhite',
   lightGrey: 'lightGrey',
   white: 'white',
   purple: 'purple',
   lightPurple: 'lightPurple',
};

export const SIZES = {
   small: 'small',
   medium: 'medium',
   large: 'large',
   extraLargeNarrow: 'extraLargeNarrow',
   extraLarge: 'extraLarge',
   full: 'full',

};

const BaseButton = ({
   text, onClick, theme, size, disabled, margin, style, type, id,
   className = '',
}) => {
   return (
      <button
         type={ type }
         id={ id }
         style={ style }
         onClick={ disabled ? null : (e) => onClick(e) }
         className={
            classNames(
               'btnBasic',
               `${ className }`,
               {
                  'm-r-m': margin,
                  'btnBasic_disable_true': disabled,
                  [`btnBasic_theme_${ theme }`]: theme,
                  [`btnBasic_size_${ size }`]: size,
               })
         }
      >
         {text}
      </button>
   );
};

BaseButton.propTypes = {
   disabled: PropTypes.any,
   size: PropTypes.string,
   theme: PropTypes.string,
   text: PropTypes.string,
   margin: PropTypes.bool,
   onClick: PropTypes.func,
   style: PropTypes.object,
   type: PropTypes.string,
   id: PropTypes.string,
   className: PropTypes.string,
};

BaseButton.defaultProps = {
   theme: 'darkGreen',
   size: 'large',
   text: 'button',
   disabled: false,
   onClick: () => {},
   type: 'button',
   id: '',
};

export default BaseButton;
