import React from 'react';
import './index.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TYPE = {
   normal: 'normal',
   medium: 'medium',
   bold: 'bold',
   regular: 'regular',
   heavy: 'heavy',
   demiBold: 'demiBold',
   black: 'black',
   robotoNormal: 'robot_normal',
   robotoBold: 'robot_bold',
   robotoRegular: 'robot_regular',
   robotoHeavy: 'robot_heavy',
   robotoDemiBold: 'robot_demiBold',
   robotoBlack: 'robot_black',
   SourceSansProMedium: 'SourceSansProMedium',
   OpenSansMedium: 'OpenSansMedium',
   OpenSans: 'OpenSans',
   latoRegular: 'lato_regular',
   latoMedium: 'lato_medium',
   latoSemiBold: 'lato_semiBold',
   latoBold: 'lato_bold',
   latoHeavy: 'lato_heavy',
};

export const SIZES = {
   megaSmall: 'megaSmall',
   extraSmall: 'extraSmall',
   small: 'small',
   medium: 'medium',
   base: 'base',
   base21: 'base21',
   large: 'large',
   extraLarge: 'extraLarge',
   extraLarge40: 'extraLarge40',
   extraLarge48: 'extraLarge48',
   extraLarge56: 'extraLarge56',
   robotoMedium: 'robot_medium',
   robotoBase: 'robot_base',
   robotoLarge: 'robot_large',
   robotoExtraLarge: 'robot_extraLarge',

};

const Text = ({
   className, inner, type, size, color, bold, style, line24, line21,
}) => {
   return (
      <span
         style={ Object.assign({ color: `${ color }` }, style) }
         className={
            classNames(
               className,
               'textBasic',
               'dont-break-out',
               {
                  'text-bold': bold,
                  'line-24': line24,
                  'line-21': line21,
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
            ) : inner
         }
      </span>
   );
};

Text.propTypes = {
   size: PropTypes.string,
   type: PropTypes.string,
   inner: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
      PropTypes.node,
   ]),
   color: PropTypes.string,
   bold: PropTypes.bool,
   line24: PropTypes.bool,
   style: PropTypes.any,
   className: PropTypes.string,
   line21: PropTypes.bool,
};

Text.defaultProps = {
   type: 'normal',
   size: 'large',
   inner: 'Text',
   color: '#3f4f65',
   bold: false,
};

export default Text;
