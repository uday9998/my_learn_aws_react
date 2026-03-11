// src/components/elements/form/Switch-new
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const Switch = ({
   name, checked, onChange,
}) => {
   return (
      <label className='switch_new'>
         <input type='checkbox' checked={ checked } onChange={ (e) => onChange(name, e.target.checked) } />
         <span className='slider-new round-new' />
      </label>
   );
};

export default Switch;

Switch.propTypes = {
   name: PropTypes.string,
   checked: PropTypes.bool,
   onChange: PropTypes.func,
};

Switch.defaultProps = {
   checked: false,
};
