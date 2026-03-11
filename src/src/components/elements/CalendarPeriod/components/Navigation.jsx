import React from 'react';
import PropTypes from 'prop-types';
import './Navigation.scss';
import Icon from 'components/elements/Icon';


export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function Navigation({
   isOpenDays, setIsOpenDays, data, onChange, min = 2000,
}) {
   const after = () => {
      if (months.indexOf(data.month) === months.length - 1) {
         const newDate = {
            ...data,
            month: months[0],
            year: data.year + 1,
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
      if (months.indexOf(data.month) !== 0) {
         const newDate = {
            ...data,
            month: months[months.indexOf(data.month) - 1],
         };
         onChange(newDate);
      } else if (data.year > min) {
         const newDate = {
            ...data,
            month: months[11],
            year: data.year - 1,
         };
         onChange(newDate);
      }
   };
   return (
      <div className='calendar_navigation'>
         <div
            role='presentation'
            className={ `left ${ !isOpenDays ? 'left_active' : '' }` }
            onClick={ () => {
               setIsOpenDays(!isOpenDays);
            } }
         >{`${ data.month } ${ data.year } `}<Icon name='ArrowRight' color={ isOpenDays ? '#131F1E' : '#24554E' } />
         </div>
         <div className='right' style={ { display: !isOpenDays ? 'none' : '' } }>
            <button type='button' onClick={ () => before() }><Icon name='ArrowLeft' /></button>
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
   min: PropTypes.number,
};
