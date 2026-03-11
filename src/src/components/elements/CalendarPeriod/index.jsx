import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Days } from './components/Days';
import { months, Navigation } from './components/Navigation';
import './index.scss';
import { Years } from './components/Years';

export function ColendarPeriod({
   onChange, min, from, to,
}) {
   const [date, setDate] = useState({
      year: from ? from.getFullYear() : new Date(),
      day: to ? to.getDate() : from.getDate(),
      secondDay: to ? { day: to.getDate(), month: to.getMonth() } : new Date(),
      month: from ? months[from.getMonth()] : new Date(),
      min: min || 2000,
   });
   const [isOpenDays, setIsOpenDays] = useState(true);
   const [isSelectedFrom, setIsSelectedFrom] = useState(false);
   const [selectedDays, setSelectedDays] = useState([]);

   useEffect(() => {
      if (to) {
         setDate({
            year: to.getFullYear(),
            day: to.getDate(),
            secondDay: to.getDate(),
            month: months[to.getMonth()],
            min: min || 2000,
         });
      } else {
         setDate({
            year: from ? from.getFullYear() : null,
            day: from ? from.getDate() : null,
            secondDay: to ? to.getDate() : null,
            month: from ? months[from.getMonth()] : null,
            min: min || 2000,
         });
      }
   }, [from, to]);

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
            onChange={ (dateNew) => {
               const newDate = new Date(
                  dateNew.year,
                  months.indexOf(dateNew.month),
                  dateNew.day > dayer[dateNew.month] ? dayer[dateNew.month] : dateNew.day);
               setDate({
                  ...date,
                  year: dateNew.year,
                  month: months[newDate.getMonth()],
               });
            } }
         />
         {isOpenDays
            ? (
               <Days
                  data={ date }
                  min={ date.min }
                  selectedDays={ selectedDays }
                  onPrevSelect={ (prev, day, year) => {
                     const newDate = new Date(year, months.indexOf(prev), day);
                     if (isSelectedFrom) {
                        if (moment(from).isBefore(newDate)) {
                           onChange('to', newDate);
                           setIsSelectedFrom(false);
                           setSelectedDays([
                              ...selectedDays,
                              { date: newDate },
                           ]);
                        } else {
                           onChange('from', newDate);
                           setSelectedDays([
                              { date: newDate },
                           ]);
                        }
                     } else {
                        onChange('from', newDate);
                        setIsSelectedFrom(true);
                        setSelectedDays([
                           { date: newDate },
                        ]);
                     }
                  } }
                  onSelect={ (day) => {
                     const newDate = new Date(date.year, months.indexOf(date.month), day);
                     if (isSelectedFrom) {
                        if (moment(from).isBefore(newDate)) {
                           onChange('to', newDate);
                           setIsSelectedFrom(false);
                           setSelectedDays([
                              ...selectedDays,
                              { date: newDate },
                           ]);
                        } else {
                           onChange('from', newDate);
                           setSelectedDays([
                              { date: newDate },
                           ]);
                        }
                     } else {
                        onChange('from', newDate);
                        setIsSelectedFrom(true);
                        setSelectedDays([
                           { date: newDate },
                        ]);
                     }
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
                     setDate({
                        ...date,
                        year: dateNew.year,
                        month: months[newDate.getMonth()],
                     });
                  } }
               />
            )}
      </div>
   );
}
ColendarPeriod.propTypes = {
   onChange: PropTypes.func,
   min: PropTypes.number,
   from: PropTypes.any,
   to: PropTypes.any,
};
