import React from 'react';
import PropTypes from 'prop-types';
import { Printer } from './Printer';
import './Days.scss';

export const dayer = {
   January: 31,
   February: new Date().getFullYear() % 4 === 0 ? 29 : 28,
   March: 31,
   April: 30,
   May: 31,
   June: 30,
   July: 31,
   August: 31,
   September: 30,
   October: 31,
   November: 30,
   December: 31,
};
export function Days({
   data, onSelect, onPrevSelect, dates, isCalendar, onSelectCalendarDate, isHiddenOldDays,
}) {
   const dayerInner = {
      January: 31,
      February: data.year % 4 === 0 ? 29 : 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
   };
   return (
      <div className='days'>
         <div className='days__week'>
            <div className='week__day'>M</div>
            <div className='week__day'>T</div>
            <div className='week__day'>W</div>
            <div className='week__day'>T</div>
            <div className='week__day'>F</div>
            <div className='week__day'>S</div>
            <div className='week__day'>S</div>
         </div>
         <div className='days__area'>
            <Printer
               onSelectCalendarDate={ onSelectCalendarDate }
               days={ dayerInner[data.month] }
               onPrevSelect={ onPrevSelect }
               onSelect={ onSelect }
               data={ data }
               isHiddenOldDays={ isHiddenOldDays }
               isCalendar={ isCalendar }
               dates={ dates }
            />
         </div>
      </div>
   );
}

Days.propTypes = {
   data: PropTypes.object,
   onSelect: PropTypes.func,
   onPrevSelect: PropTypes.func,
   dates: PropTypes.array,
   isCalendar: PropTypes.bool,
   onSelectCalendarDate: PropTypes.func,
   isHiddenOldDays: PropTypes.bool,
};
