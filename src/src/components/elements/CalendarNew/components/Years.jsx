import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Year.scss';
import { v4 as uuidv4 } from 'uuid';

export function Years({
   data, setIsOpenDays, onChange, min = 2000,
}) {
   const [years, setYears] = useState([]);
   const [newDate, setNewDate] = useState(data);
   const year = new Date();
   function yearser() {
      const yearsNew = [];
      for (let i = year.getFullYear() + 3; i > min; i--) {
         yearsNew.push(i);
      }
      setYears([...yearsNew]);
   }
   useEffect(() => {
      yearser();
   }, []);
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   return (
      <div className='calendar_modal'>
         <div className='calendar_inner'>
            <div className='calendar_inner_months'>
               {months.map((e) => {
                  return (
                     <div
                        role='presentation'
                        key={ uuidv4() }
                        onClick={ () => {
                           setNewDate({ ...newDate, month: e });
                        }
                        }
                        className={ `calendar_month ${ e === newDate.month ? 'calendar_selected_month' : '' }` }
                     >{e}
                     </div>
                  );
               })}
            </div>
            <div className='calendar_inner_year'>
               {years.map((e) => {
                  return (
                     <div key={ uuidv4() } role='presentation' onClick={ () => { setNewDate({ ...newDate, year: e }); } } className={ `calendar_year ${ e === newDate.year ? 'calendar_selected_year' : '' }` }>{e}</div>
                  );
               })}
            </div>
         </div>
         <button
            type='button'
            onClick={ () => {
               onChange({
                  ...newDate,
               });
               setYears([]);
               setIsOpenDays(true);
            } }
            className='calendar_modal_done'
         >Done
         </button>
      </div>
   );
}

Years.propTypes = {
   data: PropTypes.object,
   onChange: PropTypes.func,
   min: PropTypes.number,
   setIsOpenDays: PropTypes.func,
};
