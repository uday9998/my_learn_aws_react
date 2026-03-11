import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import Input from '../inputNew';

export const Options = ({
   OptionsMap = [],
   onSelect,
   name,
   hasSearch,
   onSearch,
}) => {
   const [searchValue, setSearchValue] = useState('');
   const [localOptions, setLocalOptions] = useState(OptionsMap);

   useEffect(() => {
      setLocalOptions(OptionsMap);
   }, [OptionsMap]);

   const handleSearch = (value) => {
      setSearchValue(value);
      setLocalOptions(OptionsMap.filter(opt => opt.label.includes(value.trim())));
   };

   return (
      <div
         className='SelectItem__options__wrapper'
      >
         {
            hasSearch && OptionsMap.length > 0 && (
               <Input
                  type='search'
                  value={ searchValue }
                  name='searchValue'
                  onChange={ (n, value) => {
                     if (onSearch) {
                        onSearch(value);
                     } else {
                        handleSearch(value);
                     }
                  } }
                  placeholder='Select a Product'
               />
            )
         }
         <div className='SelectItem__options'>
            {localOptions.map((e) => {
               return (
                  <div className='SelectItem__item' onClick={ () => onSelect(e.value) } key={ uuidv4() } role='presentation'>
                     <Text
                        type={ txtTypes.regular }
                        size={ txtSizes.small14 }
                        style={ name === 'emailCodes' ? { } : { userSelect: 'none' } }
                        inner={ e.label }
                     />
                  </div>
               );
            })}
            {localOptions.length === 0 && (
               <div className='SelectItem__item' style={ { textAlign: 'center' } }>
                  <Text
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                     style={ name === 'emailCodes' ? { color: 'rgb(114, 121, 120)' } : { color: 'rgb(114, 121, 120)', userSelect: 'none' } }
                     inner='No item to select'
                  />
               </div>
            ) }
         </div>
      </div>
   );
};

Options.propTypes = {
   OptionsMap: PropTypes.array,
   onSelect: PropTypes.func,
   name: PropTypes.string,
   hasSearch: PropTypes.bool,
   onSearch: PropTypes.func,
};
