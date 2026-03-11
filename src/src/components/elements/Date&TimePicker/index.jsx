import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import TimePicker from 'components/modules/TimePicker';
import { Calendar } from '../CalendarNew';

const DateTimePicker = ({ date, time, onChange }) => {
   return (
      <div className='date__time__picker'>
         <Calendar
            value={ date || new Date(Date.now() + (3600 * 1000 * 24))
            }
            // isHiddenOldDays={ true }
            onChange={ (value) => {
               onChange('date', value);
            } }
            // min={ min }
         />
         <TimePicker
            value={ time }
            onChange={ (value, variant) => onChange('time', value, variant) }
         />
      </div>
   );
};

DateTimePicker.propTypes = {
   date: PropTypes.any,
   time: PropTypes.string,
   onChange: PropTypes.func,
};

export default DateTimePicker;
