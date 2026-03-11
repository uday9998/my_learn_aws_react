import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Days } from './components/Days';
import { months, Navigation } from './components/Navigation';
import './index.scss';
import { Years } from './components/Years';

export function Calendar({
   value, onChange, min, from, to, dates = [], isCalendar, onSelectCalendarDate, isHiddenOldDays,
}) {
   const [date, setDate] = useState({
      year: from ? from.getFullYear() : value.getFullYear(),
      day: from ? from.getDate() : value.getDate(),
      secondDay: to ? { day: to.getDate(), month: months[to.getMonth()] } : '',
      month: from ? months[from.getMonth()] : months[value.getMonth()],
      min: min || new Date().getFullYear() - 1,
   });
   const [isOpenDays, setIsOpenDays] = useState(true);
   useEffect(() => {
      setDate({
         ...date,
         year: from ? from.getFullYear() : value.getFullYear(),
         day: from ? from.getDate() : value.getDate(),
         secondDay: to ? { day: to.getDate(), month: months[to.getMonth()] } : '',
         month: from ? months[from.getMonth()] : months[value.getMonth()],
         min: min || new Date().getFullYear() - 1,
      });
   }, [value]);
   const dayer = {
      January: 31,
      February: date.year % 4 === 0 ? 29 : 28,
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
      <div className='colendar'>
         <Navigation
            min={ date.min }
            setIsOpenDays={ setIsOpenDays }
            isOpenDays={ isOpenDays }
            data={ date }
            isHiddenOldDays={ isHiddenOldDays }
            onChange={ (dateNew) => {
               const newDate = new Date(
                  dateNew.year,
                  months.indexOf(dateNew.month),
                  dateNew.day > dayer[dateNew.month] ? dayer[dateNew.month] : dateNew.day);
               onChange(newDate, 'navigate');
            } }
         />
         {isOpenDays
            ? (
               <Days
                  onSelectCalendarDate={ onSelectCalendarDate }
                  data={ date }
                  min={ date.min }
                  isHiddenOldDays={ isHiddenOldDays }
                  isCalendar={ isCalendar }
                  dates={ dates }
                  onPrevSelect={ (prev, day, year) => {
                     const newDate = new Date(year, months.indexOf(prev), day);
                     onChange(newDate, 'prev-select');
                  } }
                  onSelect={ (day) => {
                     const newDate = new Date(date.year, months.indexOf(date.month), day);
                     onChange(newDate, 'prev-select');
                  } }
               />
            )
            : (
               <Years
                  data={ date }
                  isOpenDays={ isOpenDays }
                  min={ date.min }
                  setIsOpenDays={ setIsOpenDays }
                  onChange={ (dateNew) => {
                     const newDate = new Date(
                        dateNew.year,
                        months.indexOf(dateNew.month),
                        dateNew.day > dayer[dateNew.month] ? dayer[dateNew.month] : dateNew.day);
                     onChange(newDate, 'year-select');
                  } }
               />
            )}
      </div>
   );
}
Calendar.propTypes = {
   value: PropTypes.object,
   onChange: PropTypes.func,
   min: PropTypes.number,
   from: PropTypes.any,
   to: PropTypes.any,
   dates: PropTypes.array,
   isCalendar: PropTypes.bool,
   onSelectCalendarDate: PropTypes.func,
   isHiddenOldDays: PropTypes.bool,
};
