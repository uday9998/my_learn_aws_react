import React from 'react';
import './index.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import IToolTip from 'components/elements/IToolTIp';
import IconNew from 'components/elements/iconsSize';
import ReactTooltip from 'react-tooltip';

export const TYPES = {
   regular: 'regular',
   regularMin: 'regularMin',
   regularLarge: 'regularLarge',
   medium: 'medium',
   semiBold: 'semiBold',
   bold: 'bold',
   bold100: 'bold100',
   regularDefault: 'regularDefault',
   regularDefaultSmall: 'regularDefaultSmall',
   select: 'select',
   select_large: 'select_large',
   mediumLarge: 'mediumLarge',
   medium153: 'medium153',
   medium160: 'medium160',
   mediumLargeGrey: 'mediumLargeGrey',
   mediumSmall: 'mediumSmall',
   mediumSmallInter: 'mediumSmallInter',
   regularDefaultSmallX: 'regularDefaultSmallX',
   regular148: 'regular148',
   regular160: 'regular160',
   regularDefaultGrey: 'regularDefaultGrey',
   regularDefaultGrey145: 'regularDefaultGrey145',
   regularDefault145: 'regularDefault145',
   medium150: 'medium150',
   interNormal: 'interNormal',
   mediumXSmall: 'mediumXSmall',
   medium140: 'medium140',
   bold133: 'bold133',
   very_bold133: 'very_bold133',
   regularMinInter: 'regularMinInter',
   regularDefaultSmallInter: 'regularDefaultSmallInter',
   regularDefaultSmallXInter: 'regularDefaultSmallXInter',
   small_12_weight: 'small_12_weight',
   mediumTitle: 'mediumTitle',
   regularDefaultGrey150: 'regularDefaultGrey150',
   bold800: 'bold800',
   bold700: 'bold700',
   new__weight: 'new__weight',
   new__weight__second: 'new__weight__second',
};

export const SIZES = {
   xlarge: 'xlarge',
   xxlarge: 'xxlarge',
   'size_40': 'size_40',
   'size_32': 'size_32',
   'size_56': 'size_56',
   large: 'large',
   medium: 'medium',
   small: 'small',
   small14: 'small14',
   xsmall: 'xsmall',
   xx_small: 'xx_small',
   size_28: 'size_28',
   size_14: 'size_14',
   size_28_res: 'size_28_res',
   small_14: 'small_14',
   small_12: 'small_12',
   small14_500: 'small14_500',
   small_new: 'small_new',
   large_new: 'large_new',
   xlarge_new: 'xlarge_new',
   xxlarge_new: 'xxlarge_new',
   extraSmall: 'extraSmall',
   new_size_28: 'new_size_28',
   new_size_44: 'new_size_44',
   big54: 'big54',
   new36: 'new36',
   xlarge_new_24: 'xlarge_new_24',
};


export const TextWithIcon = ({
   className, inner, type, size, style, onClick, tooltipHelper,
   iconName, isWithoutIcon, iconGap, generalStyles, iconProps,
   isIconRight, iconColor, classNameActive,
}) => {
   return (
      <div
         role='presentation'
         onClick={ onClick }
         style={ { gap: iconGap || 11, ...generalStyles } }
         className={
            classNames(
               classNameActive,
               'text-with-icon'
            )
         }
      >
         {!isWithoutIcon && !isIconRight && (<IconNew color={ iconColor } name={ iconName || 'LeftArrowL' } { ...iconProps } />)}
         <span
            style={ style }
            className={
               classNames(
                  className,
                  'textBasic',
                  'dont-break-out',
                  {
                     [`textBasic_type_${ type }`]: type,
                     [`textBasic_size_${ size }`]: size,
                  })
            }
         >
            {inner}
         </span>
         {!isWithoutIcon && isIconRight && (<IconNew name={ iconName || 'LeftArrowL' } { ...iconProps } />)}
         {tooltipHelper && <IToolTip tooltip={ tooltipHelper } iconName='Help' />}
      </div>
   );
};


export const TextWithTooltip = ({
   className, inner, type, size, style, onClick, tooltip, iconName, iconGap, generalStyles,
   isIconRigth, id, tooltipWithoutIcon, nameLength,
}) => {
   return (
      <div
         role='presentation'
         onClick={ onClick }
         className='text-with-icon'
         style={ { gap: iconGap || 11, ...generalStyles } }
         data-tip={ tooltipWithoutIcon && inner.length > nameLength ? tooltipWithoutIcon : '' }
      >
         {tooltip && !isIconRigth && <IToolTip tooltip={ tooltip } iconName={ iconName || 'Help' } id={ id } />}
         <span
            style={ style }
            className={
               classNames(
                  className,
                  'textBasic',
                  'dont-break-out',
                  {
                     [`textBasic_type_${ type }`]: type,
                     [`textBasic_size_${ size }`]: size,
                  })
            }
         >
            {inner}
         </span>
         {tooltipWithoutIcon && inner.length > nameLength && <ReactTooltip />}
         {tooltip && isIconRigth && <IToolTip tooltip={ tooltip } iconName={ iconName || 'Help' } id={ id } />}
      </div>
   );
};


const Text = ({
   className, inner, type, size, style, innerStyle, onClick, miniText, classNameActive,
   id,
}) => {
   return (
      <>
         <span
            id={ id }
            style={ style }
            role='presentation'
            onClick={ onClick }
            className={
               classNames(
                  className,
                  classNameActive,
                  'textBasic',
                  'dont-break-out',
                  {
                     [`textBasic_type_${ type }`]: type,
                     [`textBasic_size_${ size }`]: size,
                  })
            }
         >
            {
               Array.isArray(inner) ? (
                  inner.map((child, index) => {
                     if (typeof child === 'string') return child;
                     return React.cloneElement(child, { key: index.toString() });
                  })
               ) : (
                  <div
                     style={ { display: 'inline', ...innerStyle } }
                     dangerouslySetInnerHTML={ { __html: inner } }
                  />
               )
            }
            {!!`${ miniText }` && (
               <span className='mini-text'>{miniText}</span>
            )}
         </span>
         {/* {tooltip && <IToolTip tooltip={ tooltip } iconName='Help' />} */}
      </>
   );
};

export const TextColumn = ({
   texts, alignItems, ...props
}) => {
   return (
      <div className='text__column' style={ { alignItems: alignItems || 'center' } }>
         {texts.map((e) => {
            return (
               <Text
                  { ...props }
                  inner={ e }
               />
            );
         })}
      </div>
   );
};

TextColumn.propTypes = {
   texts: PropTypes.array,
   alignItems: PropTypes.string,
};

TextWithIcon.propTypes = {
   size: PropTypes.string,
   type: PropTypes.string,
   inner: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
      PropTypes.node,
   ]),
   style: PropTypes.any,
   className: PropTypes.string,
   onClick: PropTypes.func,
   tooltip: PropTypes.string,
   iconName: PropTypes.string,
   isWithoutIcon: PropTypes.bool,
   iconColor: PropTypes.string,
   iconGap: PropTypes.number,
   generalStyles: PropTypes.any,
   isIconRight: PropTypes.bool,
   iconProps: PropTypes.object,
   classNameActive: PropTypes.string,
   tooltipHelper: PropTypes.string,
};

TextWithIcon.defaultProps = {
   type: 'medium',
   size: 'large',
   inner: 'Text',
   onClick: () => {},
   isIconRight: false,
   iconProps: {},
};


Text.propTypes = {
   size: PropTypes.string,
   type: PropTypes.string,
   miniText: PropTypes.any,
   inner: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
      PropTypes.node,
   ]),
   style: PropTypes.any,
   innerStyle: PropTypes.any,
   className: PropTypes.string,
   onClick: PropTypes.func,
   classNameActive: PropTypes.string,
   id: PropTypes.string,
};

Text.defaultProps = {
   type: 'medium',
   size: 'large',
   inner: '',
   onClick: () => {},
};

TextWithTooltip.propTypes = {
   size: PropTypes.string,
   type: PropTypes.string,
   inner: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
      PropTypes.node,
   ]),
   style: PropTypes.any,
   className: PropTypes.string,
   onClick: PropTypes.func,
   tooltip: PropTypes.string,
   iconName: PropTypes.string,
   iconGap: PropTypes.number,
   generalStyles: PropTypes.any,
   isIconRigth: PropTypes.bool,
   id: PropTypes.any,
   tooltipWithoutIcon: PropTypes.string,
   nameLength: PropTypes.number,
};

export default Text;
