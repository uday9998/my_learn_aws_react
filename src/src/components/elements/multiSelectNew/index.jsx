import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import './index.scss';
import { Popover } from '@material-ui/core';
import Icon from '../Icon';
import Input from '../inputNew';


const MultiSelect = ({
   values = [], 
   options = [], 
   onAdd, 
   onRemove, 
   placeholder,
   hasSearch,
   onSearch,
}) => {
   const isTagAttached = (item) => {
      return values.filter((value) => value === item.value).length;
   };
   const [isOpen, setIsOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [width, setWidth] = useState('');

   const [filteredOptions, setFilteredOptions] = useState(options.filter((option) => isTagAttached(option)));
   const [searchValue, setSearchValue] = useState('');
   const [localOptions, setLocalOptions] = useState(filteredOptions);

   useEffect(() => {
      setFilteredOptions(options.filter((option) => !isTagAttached(option)));
   }, [values, options]);

   useEffect(() => {
      setLocalOptions(filteredOptions);
   }, [filteredOptions]);

   const onClose = () => {
      setIsOpen(false);
   };

   const onClickButton = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setWidth(e.currentTarget.clientWidth);
      setIsOpen(true);
      setAnchorEl(e.currentTarget);
   };

   const getValueName = (value) => {
      const find = options.filter((option) => option.value === value);
      if (find && find[0] && find[0].label) {
         return find[0].label;
      }
      return '';
   };

   const handleSearch = (value) => {
      setSearchValue(value);
      setLocalOptions(filteredOptions.filter(opt => opt.label.includes(value.trim())));
   };

   return (
      <div className='multi__select__item'>
         <div
            className='multi__input'
            role='presentation'
            onClick={ (e) => onClickButton(e) }
         >
            <div className='multi__input__left'>
               <div className='multi__select__flex'>
                  {values.length ? values.map((value) => {
                     return (
                        <div
                           key={ uniqueId() }
                           className='multi__select__value'
                           role='presentation'
                           onClick={ (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                           } }
                        >
                           <Text
                              inner={ getValueName(value) }
                              type={ txtTypes.regularDefaut }
                              size={ txtSizes.small }
                           />
                           <div className='multi__view__delete' role='presentation' onClick={ () => onRemove(value) }>
                              <Icon name='DeleteTag' />
                           </div>
                        </div>
                     );
                  }) : (
                     <Text
                        inner={ placeholder }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { color: '#727978', cursor: 'pointer' } }
                     />
                  )}
               </div>
            </div>
            <div className='multi__input__right'>
               <div
                  className='multi__icon'
                  role='presentation'
               >
                  <div
                     className='multi__icon__button'
                     style={ { transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' } }
                  >
                     <Icon name='DownNew' />
                  </div>
               </div>
            </div>
         </div>

         <Popover
            open={ isOpen }
            anchorEl={ anchorEl }
            onClose={ onClose }
            className='custom-popover'
            elevation={ 24 }
            anchorOrigin={ {
               vertical: 'bottom',
               horizontal: 'center',
            } }
            transformOrigin={ {
               vertical: 'top',
               horizontal: 'center',
            } }
         >
            <div
               className='multi__select__options__wrapper'
            >
               {
                  (hasSearch && options.length > 0 && options.length !== values.length) && (
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
                     />
                  )
               }
               <div
                  className='multi__select__options'
                  style={ { width: `${ width }px` } }
               >
                  {localOptions.length === 0 && (
                     <Text
                        inner='No more results'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        className='multi__select__option'
                        style={ { color: '#727978', cursor: 'default', justifyContent: 'center' } }
                     />
                  )}
                  {localOptions.map((option) => {
                     if (values.includes(option.value)) {
                        return null;
                     }
                     return (
                        <div
                           className='multi__select__option'
                           key={ uniqueId() }
                           role='presentation'
                           onClick={ () => {
                              onAdd(option.value);
                              onClose();
                           } }
                        >
                           <Text
                              inner={ option.label }
                              type={ txtTypes.regularDefaut }
                              size={ txtSizes.small }
                           />
                        </div>
                     );
                  })}
               </div>
            </div>
         </Popover>
      </div>
   );
};

MultiSelect.propTypes = {
   values: PropTypes.array,
   onAdd: PropTypes.func,
   options: PropTypes.array,
   placeholder: PropTypes.string,
   onRemove: PropTypes.func,
   hasSearch: PropTypes.bool,
   onSearch: PropTypes.func,
};

export default MultiSelect;
