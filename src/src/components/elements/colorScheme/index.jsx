import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const ColorScheme = ({
   value = '#fff', onChange, name, colorsArray,
}) => {
   return (
      <div className='color__scheme'>
         {colorsArray.map((color) => {
            return (
               <div role='presentation' key={ color } onClick={ () => onChange(name, color) } className={ `color${ value === color ? ' color__selected' : '' }` }>
                  <div className='color__background' style={ { backgroundColor: color, border: color === '#fff' ? '1px solid #E7E9E9' : '' } } />
               </div>
            );
         })}
      </div>
   );
};

ColorScheme.propTypes = {
   value: PropTypes.string,
   onChange: PropTypes.func,
   name: PropTypes.string,
   colorsArray: PropTypes.array,
};

export default ColorScheme;
