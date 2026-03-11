import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const LoaderMini = ({ color }) => {
   const styles = {
      borderColor: `${ color } transparent transparent transparent`,
   };
   return (
      <div className='lds-ring'><div style={ styles } /><div style={ styles } /><div style={ styles } /><div style={ styles } /></div>
   );
};

LoaderMini.propTypes = {
   color: PropTypes.string,
};

export default LoaderMini;
