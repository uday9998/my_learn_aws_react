import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LogoHeights } from '../constants';
import useImageWidthByTemplate from '../useImageWidthByTemplate';
import './index.scss';

const CertificateLogo = ({
   className, src, isDefaultlogo, template, onUpdateSize,
}) => {
   const { ref, size } = useImageWidthByTemplate(LogoHeights, template, src);

   useEffect(() => {
      if (onUpdateSize) {
         onUpdateSize(size.width, size.height);
      }
   }, [size, src]);
   return (
      <img
         src={ src }
         alt='logo'
         ref={ ref }
         className={ className }
         style={ !isDefaultlogo ? {
            width: `${ size.width }px`,
            height: `${ size.height }px`,
         } : null }
      />
   );
};

CertificateLogo.propTypes = {
   className: PropTypes.string,
   src: PropTypes.string,
   template: PropTypes.string,
   isDefaultlogo: PropTypes.bool,
   onUpdateSize: PropTypes.func,
};

export default CertificateLogo;
