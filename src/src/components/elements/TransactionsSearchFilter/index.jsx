import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = React.forwardRef(({ onClick, value, placeholder }) => (
   <input
      className='uk-input'
      placeholder={ placeholder }
      onClick={ onClick }
      value={ value }
      type='text'
      readOnly={ true }
   />
));


const SearchFilter = ({
   searchFrom, searchTo, handleInternalInputChange, handleSearch,
}) => {
   return (
      <div className='transaction__searchFilter'>

         <div className='searchFilter__inputs'>

            <div className=' m-r-m flex-1 searchFilter__input'>
               <DatePicker
                  selected={ searchFrom }
                  onChange={ date => handleInternalInputChange('searchFrom', date) }
                  selectsStart
                  startDate={ searchFrom }
                  endDate={ searchTo }
                  placeholderText='From'
                  customInput={ <CustomInput placeholder='From' /> }
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
                  customInput={ <CustomInput placeholder='To' /> }
               />
            </div>
         </div>
         <div className='m-l-m searchFilter__button'>
            <BaseButton
               theme={ btnTheme.lightBlue }
               size={ btnSizes.large }
               text='Search'
               style={ { fontSize: '14px' } }
               onClick={ () => handleSearch(searchFrom, searchTo) }
            />
         </div>
      </div>
   );
};

CustomInput.propTypes = {
   onClick: PropTypes.func,
   value: PropTypes.any,
   placeholder: PropTypes.string,
};


SearchFilter.propTypes = {
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
   handleInternalInputChange: PropTypes.func,
   handleSearch: PropTypes.func,
};

export default SearchFilter;
