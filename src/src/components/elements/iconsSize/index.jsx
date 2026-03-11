import React from 'react';
import PropTypes from 'prop-types';
import * as icons from 'assets/iconsNew';

const IconNew = ({
   name, className, color, isOpen, style, progressBarData, backColor,
   width, height, onClick,
}) => {
   const IconSvg = icons[`${ name }Icon`];
   
   if (!IconSvg) {
      return null;
   }

   return (
      <IconSvg
         className={ className }
         color={ color }
         backColor={ backColor }
         isOpen={ isOpen }
         onClick={ onClick }
         style={ style }
         data={ progressBarData }
         width={ width }
         height={ height }
      />
   );
};

IconNew.propTypes = {
   name: PropTypes.string.isRequired,
   className: PropTypes.string,
   color: PropTypes.string,
   isOpen: PropTypes.bool,
   onClick: PropTypes.func,
   style: PropTypes.object,
   progressBarData: PropTypes.object,
   backColor: PropTypes.string,
   width: PropTypes.string,
   height: PropTypes.string,
};

IconNew.defaultProps = {
   isOpen: false,
};

export default IconNew;
