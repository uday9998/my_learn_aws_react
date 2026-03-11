import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { months } from './Navigation';

export function Printer({
   days, onSelect, data, onPrevSelect, selectedDays,
}) {
   const dayer = {
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

   const monthsValues = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
   };

   const isSelected = (day, month, year) => {
      const initialDay = new Date(year, month, day);
      const isSelectedDays = selectedDays.filter((e) => {
         return e.date.getDate() === day && e.date.getFullYear() === year && e.date.getMonth() === month;
      });
      if (isSelectedDays.length) {
         return true;
      }
      if (selectedDays.length === 2) {
         if (moment(initialDay).isBefore(selectedDays[1].date) && moment(selectedDays[0].date).isBefore(initialDay)) {
            return true;
         }
      }
      return false;
   };

   const [monther, setMonther] = useState([]);
   const thisStartWeek = new Date(data.year, months.indexOf(data.month), 1);
   const options = { weekday: 'long' };
   const toStartLength = monthsValues[new Intl.DateTimeFormat('en-US', options).format(thisStartWeek)];

   if (monther.length < 20) {
      let isDayOf = 0;
      if (months.indexOf(data.month) !== 0) {
         const prevDays = dayer[months[months.indexOf(data.month) - 1]];
         for (let i = prevDays; i >= prevDays - toStartLength + 2; i--) {
            isDayOf++;
            monther.unshift({
               day: i,
               isDayOf: false,
               isSelected: isSelected(i, months.indexOf(data.month) - 1, data.year),
               isPrev: true,
               month: months[months.indexOf(data.month) - 1],
               year: data.year,
            });
         }
      } else {
         const prevDays = dayer[months[11]];
         for (let i = prevDays; i >= prevDays - toStartLength + 2; i--) {
            isDayOf++;
            monther.unshift({
               day: i,
               isDayOf: false,
               isSelected: isSelected(i, 12, data.year),
               isPrev: true,
               month: months[11],
               year: data.year - 1,
            });
         }
      }
      for (let i = 0; i < days; i++) {
         isDayOf++;
         if (isDayOf > 5) {
            if (isDayOf === 6) {
               isDayOf = 6;
            } else {
               isDayOf = 0;
            }
            if (data.secondDay) {
               monther.push({
                  day: i + 1,
                  isDayOf: true,
                  isSelected: isSelected(i + 1, months.indexOf(data.month), data.year),
               });
            } else {
               monther.push({
                  day: i + 1,
                  isDayOf: true,
                  isSelected: isSelected(i + 1, months.indexOf(data.month), data.year),
               });
            }
         } else if (data.secondDay) {
            monther.push({
               day: i + 1,
               isDayOf: false,
               isSelected: isSelected(i + 1, months.indexOf(data.month), data.year),
            });
         } else {
            monther.push({
               day: i + 1,
               isDayOf: false,
               isSelected: isSelected(i + 1, months.indexOf(data.month), data.year),
            });
         }
      }
   } else {
      setMonther([]);
   }

   return (
      <div className='area'>
         {monther.map((e) => {
            if (!e.isPrev) {
               return (
                  <div
                     role='presentation'
                     onClick={ () => onSelect(e.day) }
                     className={ `day ${ e.isDayOf ? 'day_of' : '' } ${ e.isSelected ? 'day_selected' : '' }` }
                     key={ uuidv4() }
                  >
                     {e.day}
                  </div>
               );
            }
            return (
               <div role='presentation' onClick={ () => { onPrevSelect(e.month, e.day, e.year); setMonther([]); } } className={ `day ${ e.isDayOf ? 'day_of' : '' } ${ e.isSelected ? 'day_selected' : '' }` } key={ uuidv4() }>
                  {e.day}
               </div>
            );
         })}
      </div>
   );
}

Printer.propTypes = {
   days: PropTypes.number,
   onSelect: PropTypes.func,
   data: PropTypes.object,
   onPrevSelect: PropTypes.func,
   selectedDays: PropTypes.array,
};
