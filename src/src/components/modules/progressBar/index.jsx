import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = (props) => {
   const { bgcolor, completed } = props;
   const containerStyles = {
      height: 15,
      width: '90%',
      backgroundColor: '#e0e0de',
      margin: '0 auto',
   };

   const fillerStyles = {
      height: '100%',
      width: `${ completed }%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
   };

   return (
      <div style={ containerStyles }>
         <div style={ fillerStyles } />
      </div>
   );
};

ProgressBar.propTypes = {
   bgcolor: PropTypes.string,
   completed: PropTypes.number,
};

export default ProgressBar;
