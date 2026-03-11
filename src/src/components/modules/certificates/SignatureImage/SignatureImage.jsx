import React, {
   useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.scss';
import { SignatureHeights } from '../constants';
import useImageWidthByTemplate from '../useImageWidthByTemplate';

const SignatureImage = ({ src = '', template, onUpdateSignatureSize, }) => {
   const isUploaded = src && src.startsWith('https://');
   const { ref, size } = useImageWidthByTemplate(SignatureHeights, template, src);
   const changeSignatureImageSize = useCallback((w, h) => {
      if (typeof onUpdateSignatureSize === 'function') {
         onUpdateSignatureSize(w, h);
      }
   }, [size, src]);
   useEffect(() => {
      changeSignatureImageSize(size.width, size.height);
   }, [changeSignatureImageSize, size]);

   return (
      <>
         <img
            ref={ ref }
            src={ src }
            width={ size.width }
            height={ size.height }
            className={ cx('certificateSign signatureImage', { hide: !isUploaded }) }
            alt='signature'
         />
         <div
            className={ cx('certificateSign certificateSign--custom', { hide: isUploaded }) }
            style={ {
               height: '70px',
               width: '240px',
               backgroundRepeat: 'no-repeat',
               background: `url(${ src })`,
               backgroundSize: 'cover',
            } }
         />
      </>
   );
};

SignatureImage.propTypes = {
   src: PropTypes.string,
   onUpdateSignatureSize: PropTypes.func,
   template: PropTypes.string,
};

export default SignatureImage;
