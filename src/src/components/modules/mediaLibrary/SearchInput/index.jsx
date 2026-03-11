import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import SearchIcon from './search.svg';

function SearchInput({
   value, placeholder, onChange, name,
}) {
   function handleChange(e) {
      onChange(e.target.name, e.target.value);
   }
   return (
      <div className='custom__search__input'>
         <input
            type='text'
            className='custom__search__input__input'
            autoComplete='off'
            placeholder={ placeholder }
            onChange={ handleChange }
            name={ name }
            value={ value }
         />
         <button type='button' className='custom__search__input__icon'>
            <img src={ SearchIcon } alt='Search' />
         </button>

      </div>
   );
}

SearchInput.defaultProps = {
   value: '',
};

SearchInput.propTypes = {
   placeholder: PropTypes.string,
   name: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func,
};

export default SearchInput;
