import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/elements/form/Switch';
import './index.scss'
const SwitchInput = ({
   name, checked, onChange, label,
}) => {
   return (
      <div className='flex switchInput'>
         <Switch name={ name } checked={ checked } onChange={ onChange } />
         <div className='switchInput__label' role='presentation' onClick={ onChange }>{label}</div>
      </div>
   );
};

SwitchInput.propTypes = {
   name: PropTypes.string,
   checked: PropTypes.bool,
   onChange: PropTypes.func,
   label: PropTypes.string,
};

export default SwitchInput;
