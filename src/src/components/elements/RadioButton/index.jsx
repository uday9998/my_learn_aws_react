/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const RadioButton = ({
   handleChangeThemeMode, themeMode,
}) => {
   return (
      <div className='radio__container'>
         <div className='radio'>
            <input className='darkMode lightMode' onChange={ handleChangeThemeMode } id='radio-1' type='radio' checked={ themeMode.darkMode } />
            <label htmlFor='radio-1' className='radio-label'>Dark</label>
         </div>

         <div className='radio'>
            <input className='lightMode darkMode' onChange={ handleChangeThemeMode } id='radio-2' type='radio' checked={ themeMode.lightMode } />
            <label htmlFor='radio-2' className='radio-label'>Light</label>
         </div>
      </div>

   );
};

RadioButton.propTypes = {
   themeMode: PropTypes.object,
   handleChangeThemeMode: PropTypes.func,
};

export default RadioButton;