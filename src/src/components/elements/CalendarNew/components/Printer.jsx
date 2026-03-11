/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { months } from './Navigation';

export function Printer({
   days, onSelect, data, onPrevSelect, dates, isCalendar, onSelectCalendarDate, isHiddenOldDays,
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
   const [monther, setMonther] = useState([]);
   const thisStartWeek = new Date(data.year, months.indexOf(data.month), 1);
   const options = { weekday: 'long' };
   const toStartLength = monthsValues[new Intl.DateTimeFormat('en-US', options).format(thisStartWeek)];

   const getIsBeforeToday = (e, month) => {
      //  - 1 }-${ e }`));
      return isHiddenOldDays && !(moment().isBefore(new Date(data.year, month !== undefined ? month : months.indexOf(data.month), e)));
   };

   if (monther.length < 20) {
      let isDayOf = 0;
      if (months.indexOf(data.month) !== 0) {
         const prevDays = dayer[months[months.indexOf(data.month) - 1]];
         for (let i = prevDays; i >= prevDays - toStartLength + 2; i--) {
            isDayOf++;
            monther.unshift({
               day: i,
               isDayOf: false,
               isUnselectDate: getIsBeforeToday(i, months.indexOf(data.month) - 1),
               isSelected: i === data.secondDay.day && months[months.indexOf(data.month) - 1] === data.secondDay.month,
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
               isUnselectDate: getIsBeforeToday(i, months[11]),
               isSelected: i === data.secondDay.day && months[months.indexOf(data.month) - 1] === data.secondDay.month,
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
                  isUnselectDate: getIsBeforeToday(i + 1),
                  isSelected: i === data.day - 1 || (i === data.secondDay.day - 1 && months[months.indexOf(data.month)] === data.secondDay.month) || (i < data.secondDay.day - 1 && i > data.day - 1),
               });
            } else {
               monther.push({
                  day: i + 1,
                  isDayOf: true,
                  isUnselectDate: getIsBeforeToday(i + 1),
                  isSelected: i === data.day - 1 || (i === data.secondDay.day - 1 && months[months.indexOf(data.month)] === data.secondDay.month),
               });
            }
         } else if (data.secondDay) {
            monther.push({
               day: i + 1,
               isDayOf: false,
               isUnselectDate: getIsBeforeToday(i + 1),
               isSelected: i === data.day - 1 || (i === data.secondDay.day - 1 && months[months.indexOf(data.month)] === data.secondDay.month) || (i < data.secondDay.day - 1 && i > data.day - 1),
            });
         } else {
            monther.push({
               day: i + 1,
               isDayOf: false,
               isUnselectDate: getIsBeforeToday(i + 1),
               isSelected: i === data.day - 1 || (i === data.secondDay.day - 1 && months[months.indexOf(data.month)] === data.secondDay.month),
            });
         }
      }
   } else {
      setMonther([]);
   }
   const isIcludesAnyDate = (day) => {
      let isIncluding = false;
      dates.forEach(element => {
         const i = new Date(element);
         if (day.isPrev) {
            if (i.getDate() === day.day && months[i.getMonth()] === day.month && i.getFullYear() === day.year) {
               isIncluding = true;
            }
            return;
         }
         if (i.getDate() === day.day && months[i.getMonth()] === data.month && i.getFullYear() === data.year) {
            isIncluding = true;
         }
      });
      if (isIncluding) {
         return 'day_selected ';
      }
      return '';
   };

   const getCalendarDate = (day) => {
      let toViewDate = false;
      dates.forEach(element => {
         const i = new Date(element);
         if (day.isPrev) {
            if (i.getDate() === day.day && months[i.getMonth()] === day.month && i.getFullYear() === day.year) {
               toViewDate = i;
            }
            return;
         }
         if (i.getDate() === day.day && months[i.getMonth()] === data.month && i.getFullYear() === data.year) {
            toViewDate = i;
         }
      });
      return toViewDate;
   };

   const onClick = (e) => {
      if (isIcludesAnyDate(e)) {
         onSelectCalendarDate(getCalendarDate(e));
      }
      if (e.isPrev) {
         onPrevSelect(e.month, e.day, e.year);
         return;
      }

      const currentDate = new Date().getDay();

      if (e.day >= currentDate) {
         onSelect(e.day);
      }
   };
   return (
      <div className='area'>
         {monther.map((e) => {
            if (!e.isPrev) {
               return (
                  <div
                     role='presentation'
                     onClick={ e.isUnselectDate ? () => {} : () => onClick(e) }
                     className={ `${ isIcludesAnyDate(e) }day${ e.isDayOf || e.isUnselectDate || e.day < new Date().getDay() ? ' day_of' : '' } ${ e.isSelected && !isCalendar ? ' day_selected' : '' }` }
                     key={ uuidv4() }
                  >
                     {e.day}
                  </div>
               );
            }
            return (
               <div
                  role='presentation'
                  onClick={ e.isUnselectDate ? () => {} : () => { onClick(e); setMonther([]); } }
                  className={ `${ isIcludesAnyDate(e) }day ${ e.isDayOf || e.isUnselectDate ? 'day_of' : '' } ${ e.isSelected && !isCalendar ? 'day_selected' : '' }` }
                  key={ uuidv4() }
               >
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
   dates: PropTypes.array,
   data: PropTypes.object,
   isCalendar: PropTypes.bool,
   onPrevSelect: PropTypes.func,
   isHiddenOldDays: PropTypes.bool,
   onSelectCalendarDate: PropTypes.func,
};
