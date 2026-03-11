import React from 'react';
import PropTypes from 'prop-types';
import './Navigation.scss';
import Icon from 'components/elements/Icon';
import moment from 'moment';

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function Navigation({
   isOpenDays, setIsOpenDays, data, onChange, min = 2000, isHiddenOldDays,
}) {
   const isHiddenBeforeButton = () => {
      // const currentDate = new Date();
      const month = months.indexOf(data.month) === 0 ? 11 : months.indexOf(data.month) - 1;
      const currentDate = new Date(data.year, month, data.day);
      const isHidden = moment().isAfter(currentDate);
      return isHiddenOldDays && isHidden;
   };

   const after = () => {
      if (months.indexOf(data.month) === months.length - 1) {
         const newDate = {
            ...data,
            year: data.year + 1,
            month: months[0],
         };
         onChange(newDate);
      } else {
         const newDate = {
            ...data,
            month: months[months.indexOf(data.month) + 1],
         };
         onChange(newDate);
      }
   };
   const before = () => {
      if (data.year > min) {
         if (months.indexOf(data.month) !== 0) {
            const newDate = {
               ...data,
               month: months[months.indexOf(data.month) - 1],
            };
            onChange(newDate);
         } else {
            const newDate = {
               ...data,
               month: months[months.length - 1],
               year: data.year - 1,
            };
            onChange(newDate);
         }
      }
      if (months[months.indexOf]) {
         if (months.indexOf(data.month) !== 0) {
            const newDate = {
               ...data,
               month: months[months.indexOf(data.month) - 1],
            };
            onChange(newDate);
         } else {
            const newDate = {
               ...data,
               month: months[11],
               year: data.year - 1,
            };
            onChange(newDate);
         }
      }
      // if (data.day === 1) {
      //    if (months.indexOf(data.month) !== 0) {
      //       const newDate = {
      //          ...data,
      //          day: dayer[months[months.indexOf(data.month) - 1]],
      //          month: months[months.indexOf(data.month) - 1],
      //       };
      //       onChange(newDate);
      //    } else {
      //       const newDate = {
      //          ...data,
      //          day: dayer[months[0]],
      //          year: data.year - 1,
      //          month: months[11],
      //       };
      //       onChange(newDate);
      //    }
      // } else {
      //    const newDate = {
      //       ...data,
      //       day: data.day - 1,
      //    };
      //    onChange(newDate);
      // }
   };
   const isDisabledBeforeButton = isHiddenBeforeButton();
   return (
      <div className='calendar_navigation'>
         <div
            role='presentation'
            className={ `left ${ !isOpenDays ? 'left_active' : '' }` }
            onClick={ () => {
               if (!isHiddenOldDays) {
                  setIsOpenDays(!isOpenDays);
               }
            } }
         >{`${ data.month } ${ data.year } `}
            {!isHiddenOldDays && (
               <Icon name='ArrowRight' color={ isOpenDays ? '#131F1E' : '#24554E' } />
            )}
         </div>
         <div className='right' style={ { display: !isOpenDays ? 'none' : '' } }>
            <button type='button' onClick={ isDisabledBeforeButton ? () => {} : () => before() }><Icon name='ArrowLeft' color={ isDisabledBeforeButton ? '#A1A5A5' : null } /></button>
            <button type='button' onClick={ () => after() }><Icon name='ArrowRight' /></button>
         </div>
      </div>
   );
}

Navigation.propTypes = {
   data: PropTypes.object,
   onChange: PropTypes.func,
   isOpenDays: PropTypes.bool,
   setIsOpenDays: PropTypes.func,
   isHiddenOldDays: PropTypes.bool,
   min: PropTypes.number,
};
