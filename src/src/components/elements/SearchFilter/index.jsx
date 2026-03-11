import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
// import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Select from 'components/elements/form/Select';

const SearchFilter = ({
   searchValue, searchFrom, searchTo, handleInternalInputChange, handleSearch, isFilterOpen, advancedFilterOption, advancedFilterName,
}) => {
   return (
      <div className='searchFilter'>
         {/* <div className='marginRight'>
            <Text
               type={ textType.normal }
               size={ textSizes.medium }
               inner='Filter'
            />
         </div> */}
         <div className='searchFilter__inputs'>
            <div className='flex-2 searchFilter__input'>
               <TextInput
                  placeholder='Find people by name or email'
                  id='nameOrEmail'
                  style={ { padding: '7px 16px' } }
                  name='searchValue'
                  value={ searchValue }
                  onChange={ (name, value) => handleInternalInputChange(name, value) }
                  onKeyPress={ event => {
                     if (event.key === 'Enter') {
                        if (!advancedFilterOption) {
                           if (!(searchValue && searchValue.trim && searchValue.trim().length === 0)) {
                              // eslint-disable-next-line max-len
                              handleSearch(searchValue, searchFrom, searchTo, advancedFilterOption, advancedFilterName, true);
                           }
                        }
                     }
                  } }
               />
            </div>
            {/* <div className='m-l-m flex-1 searchFilter__input'>
               <Select
                  style={ { height: '40px' } }
                  id='course'
                  placeholder='All Courses'
                  options={ coursesOption }
                  name='courseValue'
                  value={ courseValue }
                  onChange={ (name, value) => handleInternalInputChange(name, value) }
               />
            </div> */}
            {/* <div className='m-l-m m-r-m flex-1 searchFilter__input'>
               <DatePicker
                  selected={ searchFrom }
                  onChange={ date => handleInternalInputChange('searchFrom', date) }
                  selectsStart
                  startDate={ searchFrom }
                  endDate={ searchTo }
                  placeholderText='From'
               />
            </div>
            <div className='flex-1 searchFilter__input'>
               <DatePicker
                  selected={ searchTo }
                  onChange={ date => handleInternalInputChange('searchTo', date) }
                  selectsEnd
                  startDate={ searchFrom }
                  endDate={ searchTo }
                  minDate={ searchFrom }
                  placeholderText='To'
               />
            </div> */}
         </div>
         <div className='m-l-m searchFilter__button'>
            <BaseButton
               theme={ btnTheme.lightBlue }
               size={ btnSizes.large }
               text='Search'
               disabled={ searchValue && searchValue.trim && searchValue.trim().length === 0 }
               style={ { fontSize: '14px', visibility: isFilterOpen ? 'hidden' : 'visible' } }
               onClick={ () => handleSearch(searchValue) }
            />
         </div>
      </div>
   );
};

SearchFilter.propTypes = {
   searchValue: PropTypes.string,
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
   handleInternalInputChange: PropTypes.func,
   handleSearch: PropTypes.func,
   isFilterOpen: PropTypes.bool,
   advancedFilterOption: PropTypes.string,
   advancedFilterName: PropTypes.any,
};

export default SearchFilter;
