import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import './index.scss';


const BlogFilter = ({
   searchValue, onClearSearch, setSearchValue,
}) => {
   return (
      <div className='blog__filter'>
         <Input
            value={ searchValue }
            // onKeyPress={ searchOnEnter }
            onClearSearchValue={ () => onClearSearch() }
            type='search'
            placeholder='What are you looking for?'
            onChange={ (name, value) => setSearchValue(value) }
         />
      </div>
   );
};


BlogFilter.propTypes = {
   setSearchValue: PropTypes.func,
   searchValue: PropTypes.string,
   onClearSearch: PropTypes.func,

};

export default BlogFilter;
