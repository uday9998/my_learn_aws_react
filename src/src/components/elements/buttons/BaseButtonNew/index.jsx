/* eslint-disable react/button-has-type */
import React from 'react';
import './index.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import IconNew from 'components/elements/iconsSize';
import IToolTip from 'components/elements/IToolTIp';
import ReactTooltip from 'react-tooltip';

export const THEMES = {
   primary: 'primary',
   more: 'more',
   secondary: 'secondary',
   tertiary: 'tertiary',
   tertiaryGreen: 'tertiaryGreen',
   change: 'change',
   filter: 'filter',
   red: 'red',
   error: 'error',
   canva: 'canva',
   purple: 'purple',
   lightPurple: 'lightPurple',
   explore: 'explore',
   school: 'school',
   other: 'other',
   white: 'white',
   grey: 'grey',
   grey_white: 'grey_white',
   blue: 'blue',
   privacy: 'privacy',
   new_privacy: 'new_privacy',
};

export const SIZES = {
   xsmall: 'xsmall',
   small: 'small',
   medium: 'medium',
   large: 'large',
   large50: 'large50',
   small63: 'small63',
   large120: 'large120',
   largeDefault: 'largeDefault',
   largeFull: 'largeFull',
   small14: 'small14',
   medium44: 'medium44',
   new_small: 'new_small',
   full: 'full',
   large56: 'large56',
   new_small_weight: 'new_small_weight',
   new_small_weight44: 'new_small_weight44',
   xLarge: 'xLarge',
};

export const IconNames = {
   delete: 'delete',
   edit: 'edit',
   close: 'close',
   add: 'add',
   Sort: 'Sort',
   Plus: 'Plus',
};

const BaseButton = ({
   text, onClick, theme, size, disabled, style, type, id, isRotatedIcon,
   className, iconName, isOpen, isIconRight, isActiveFilterButton, secondIcon,
   isDropButton, isIconLeft, isHidenDiv, iconColor, btnTextClassName, isNewIcon,
   resetBorderColor, IToolTipText, isPricing, newTooltipText,
}) => {
   return (
      <>
         <button
            data-tip={ isPricing && newTooltipText && disabled ? newTooltipText : undefined }
            type={ type }
            id={ id }
            disabled={ disabled }
            style={ { border: `1px solid ${ resetBorderColor || style?.color }`, padding: window.location.pathname.includes('admin') ? (window.location.pathname.includes('members') ? '9px 16px' : '11px 16px') : {}, ...style } }
            onClick={ disabled ? () => {} : (e) => onClick(e) }
            className={
               classNames(
                  'btnBasic',
                  className,
                  {
                     [`btnBasic_theme_${ theme }`]: theme,
                     [`btnBasic_theme_${ theme }_${ isActiveFilterButton || '' }`]: theme,
                     [`btnBasic_size_${ size }`]: size,
                     [`btnBasic_theme_${ theme }_disabled`]: theme && disabled,
                     'btnBasic_size_mob': !!btnTextClassName,
                  })
            }
         >
            {/* <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } /> */}
            {!isIconRight && !!secondIcon && !isHidenDiv && (
               <IconNew color={ iconColor } isOpen={ isOpen } name={ secondIcon } />
            ) }
            {!isIconRight && !!secondIcon && !isHidenDiv && (
               <Icon
                  isOpen={ isOpen }
                  color={ iconColor }
                  name={ secondIcon }
               />
            ) }
            {isIconRight && !!iconName && isDropButton && !isHidenDiv && (
               <div style={ { transform: isRotatedIcon ? '90deg' : '0deg' } }>
                  <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } />
               </div>
            )}
            {isIconRight && !!iconName && !isDropButton && !isHidenDiv && (
               <div style={ { transform: isRotatedIcon ? '90deg' : '0deg' } }>
                  <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } />
               </div>
            )}
            {isIconRight && !!iconName && <Icon color={ iconColor } isOpen={ isOpen } name={ iconName } /> }
            {isIconRight && !!iconName && isNewIcon
            && <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } /> }
            {/* {isIconRight && !!iconName && <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } /> } */}
            {
               Boolean(text) && (
                  <span className={ btnTextClassName }>{text}</span>
               )
            }
            {!!iconName && !isIconRight && isDropButton && (
               <div style={ { transform: `rotate(${ isRotatedIcon ? '180deg' : '0deg' })` } }>
                  <IconNew isOpen={ isOpen } name={ iconName } />
               </div>
            )}
            {!!iconName && !!isIconLeft && <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } />}
            {!!iconName && !isIconRight && <Icon isOpen={ isOpen } name={ iconName } />}
            {isIconRight && !!secondIcon && <IconNew color={ iconColor } isOpen={ isOpen } name={ secondIcon } /> }
            {isIconRight && !!secondIcon && <Icon isOpen={ isOpen } name={ secondIcon } /> }
            {(isPricing && newTooltipText && disabled) && <ReactTooltip />}
         </button>
         {IToolTipText && <IToolTip tooltip={ IToolTipText } />}
      </>
   );
};

export const NewBaseButton = ({
   text, onClick, theme, size, disabled, style, type, id, isRotatedIcon,
   className, iconName, isOpen, isIconRight, isActiveFilterButton, secondIcon,
   isDropButton, isIconLeft, isHidenDiv, iconColor, btnTextClassName, isNewIcon,
   resetBorderColor,
}) => {
   return (
      <button
         type={ type }
         id={ id }
         style={ { border: `1px solid ${ resetBorderColor || style?.color }`, padding: window.location.pathname.includes('admin') ? (window.location.pathname.includes('members') ? '9px 16px' : '11px 16px') : {}, ...style } }
         onClick={ disabled ? () => {} : (e) => onClick(e) }
         className={
            classNames(
               'btnBasic',
               className,
               {
                  [`btnBasic_theme_${ theme }`]: theme,
                  [`btnBasic_theme_${ theme }_${ isActiveFilterButton || '' }`]: theme,
                  [`btnBasic_size_${ size }`]: size,
                  [`btnBasic_theme_${ theme }_disabled`]: theme && disabled,
                  'btnBasic_size_mob': !!btnTextClassName,
               })
         }
      >
         {/* <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } /> */}
         {!isIconRight && !!secondIcon && !isHidenDiv && (
            <IconNew color={ iconColor } isOpen={ isOpen } name={ secondIcon } />
         ) }
         {!isIconRight && !!secondIcon && !isHidenDiv && (
            <Icon
               isOpen={ isOpen }
               color={ iconColor }
               name={ secondIcon }
            />
         ) }
         {isIconRight && !!iconName && isDropButton && !isHidenDiv && (
            <div style={ { transform: isRotatedIcon ? '90deg' : '0deg' } }>
               <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } />
            </div>
         )}
         {isIconRight && !!iconName && !isDropButton && !isHidenDiv && (
            <div style={ { transform: isRotatedIcon ? '90deg' : '0deg' } }>
               <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } />
            </div>
         )}
         {isIconRight && !!iconName && <Icon color={ iconColor } isOpen={ isOpen } name={ iconName } /> }
         {isIconRight && !!iconName && isNewIcon
          && <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } /> }
         {/* {isIconRight && !!iconName && <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } /> } */}
         {!!iconName && !isIconRight && isDropButton && (
            <div style={ { transform: `rotate(${ isRotatedIcon ? '180deg' : '0deg' })` } }>
               <IconNew isOpen={ isOpen } name={ iconName } />
            </div>
         )}
         {!!iconName && !!isIconLeft && <IconNew color={ iconColor } isOpen={ isOpen } name={ iconName } />}
         {!!iconName && !isIconRight && <Icon isOpen={ isOpen } name={ iconName } />}
         {isIconRight && !!secondIcon && <IconNew color={ iconColor } isOpen={ isOpen } name={ secondIcon } /> }
         {isIconRight && !!secondIcon && <Icon isOpen={ isOpen } name={ secondIcon } /> }
      </button>
   );
};

NewBaseButton.propTypes = {
   disabled: PropTypes.any,
   size: PropTypes.string,
   isHidenDiv: PropTypes.bool,
   theme: PropTypes.string,
   isOpen: PropTypes.bool,
   text: PropTypes.string,
   onClick: PropTypes.func,
   style: PropTypes.object,
   type: PropTypes.string,
   id: PropTypes.string,
   className: PropTypes.string,
   isIconRight: PropTypes.bool,
   isRotatedIcon: PropTypes.bool,
   isDropButton: PropTypes.bool,
   isActiveFilterButton: PropTypes.bool,
   iconName: PropTypes.string,
   secondIcon: PropTypes.string,
   iconColor: PropTypes.string,
   isIconLeft: PropTypes.bool,
   btnTextClassName: PropTypes.string,
   isNewIcon: PropTypes.bool,
   resetBorderColor: PropTypes.string,
};

NewBaseButton.defaultProps = {
   theme: 'primary',
   size: 'large',
   text: 'primary',
   isIconRight: false,
   disabled: false,
   onClick: () => {},
   type: 'button',
   id: '',
   className: '',
   isRotatedIcon: null,
   iconName: '',
   btnTextClassName: '',
};

BaseButton.propTypes = {
   disabled: PropTypes.any,
   size: PropTypes.string,
   isHidenDiv: PropTypes.bool,
   theme: PropTypes.string,
   isOpen: PropTypes.bool,
   text: PropTypes.string,
   onClick: PropTypes.func,
   style: PropTypes.object,
   type: PropTypes.string,
   id: PropTypes.string,
   className: PropTypes.string,
   isIconRight: PropTypes.bool,
   isRotatedIcon: PropTypes.bool,
   isDropButton: PropTypes.bool,
   isActiveFilterButton: PropTypes.bool,
   isPricing: PropTypes.bool,
   iconName: PropTypes.string,
   secondIcon: PropTypes.string,
   iconColor: PropTypes.string,
   isIconLeft: PropTypes.bool,
   btnTextClassName: PropTypes.string,
   isNewIcon: PropTypes.bool,
   resetBorderColor: PropTypes.string,
   IToolTipText: PropTypes.string,
   newTooltipText: PropTypes.string,
};

BaseButton.defaultProps = {
   theme: 'primary',
   size: 'large',
   text: 'primary',
   isIconRight: false,
   disabled: false,
   onClick: () => {},
   type: 'button',
   id: '',
   className: '',
   isRotatedIcon: null,
   iconName: '',
   btnTextClassName: '',
};

export default BaseButton;
