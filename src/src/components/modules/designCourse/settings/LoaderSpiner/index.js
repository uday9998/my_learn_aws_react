import React, { useRef } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import gif from './loader.gif';
import OldGif from './oldLoader.gif';

const LoaderSpinner = ({
   width = 300, heigth = 300,
}) => {
   const isAdminPage = !!window.location.href.includes('admin');
   const el = useRef();

   return (
      <div ref={ el } className='loading__SpinnerContainer'>
         <img src={ isAdminPage ? gif : OldGif } width={ width } height={ heigth } alt='loader' />
      </div>
   );
};

LoaderSpinner.propTypes = {
   width: PropTypes.number,
   heigth: PropTypes.number,
};

export default LoaderSpinner;
