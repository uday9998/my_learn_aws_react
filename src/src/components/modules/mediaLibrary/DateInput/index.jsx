/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import './index.scss';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import Tooltip from 'components/elements/members/Tooltip';
import DateIcon from './date.svg';

function DateInput({
   value = 'All time', from, to, onChange,
   focused, setFocused,
}) {
   const dateRef = useRef(null);
   function open() {
      setFocused(true);
   }

   function close() {
      setFocused(false);
   }
   useOutsideClickDetector(dateRef, close);
   const dateValue = (from && to) ? `${ moment(from).format('YYYY/MM/DD') } - ${ moment(to).format('YYYY/MM/DD') }` : null;
   return (
      <div className='custom_date_input_wrapper' ref={ dateRef } onClick={ open } role='presentation'>
         <div className='custom__search__input'>
            <span
               type='text'
               className='custom__search__input__input'
            >{ dateValue || value}
            </span>
            <button type='button' className='custom__search__input__icon'>
               <img src={ DateIcon } alt='Search' />
            </button>
            <Tooltip
               hintText='Customize your file search based on upload date.'
               style={ { marginLeft: '0' } }
               left={ true }
               hintStyle={ { bottom: 'auto', top: '18px' } }
            />
         </div>
         {focused && (
            <div className='custom_date_input_wrapper__date'>
               <DatePicker
                  selected={ from }
                  onChange={ onChange }
                  startDate={ from }
                  endDate={ to }
                  selectsRange
                  inline
               />
            </div>
         )}
      </div>
   );
}

DateInput.propTypes = {
   value: PropTypes.string,
   from: PropTypes.string,
   to: PropTypes.string,
   onChange: PropTypes.func,
   focused: PropTypes.bool,
   setFocused: PropTypes.func,
};

export default DateInput;
