import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const CustomInput = ({
   placeholder, type, labelColor, labelText, 
}) => {
   return (
      <>
         <span style={ { color: labelColor } }>{ labelText }</span>
         <input style={ { color: labelColor } } className='custom__input' type={ type } placeholder={ placeholder } />
      </>
   );
};

CustomInput.propTypes = {
   placeholder: PropTypes.string,
   type: PropTypes.string,
   labelColor: PropTypes.string,
   labelText: PropTypes.string,
};

export default CustomInput;