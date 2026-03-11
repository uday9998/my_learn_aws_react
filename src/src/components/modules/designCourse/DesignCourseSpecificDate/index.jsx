import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import './index.scss';
import moment from 'moment';

const DesignCourseSpecificDate = ({
   date, time, setIsOnSelectCustomDate, timeType, label, placeholder,
}) => {
   return (
      <div className='design__course__specific__date'>
         <div className='design__course__specific__date__input'>
            <div className='top'>
               <Text
                  inner={ label || 'Specific Release Date' }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
            <div className='bottom'>
               {date ? (
                  <Text
                     inner={ `${ moment(date).format('MMMM DD, YYYY') || Date.now(date) }${ time ? `  ${ time } ${ timeType || '' }` : '' }` }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               ) : (
                  <Text
                     inner={ placeholder || 'Select release date' }
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               )}
               <div
                  className={ `bottom__button${ date ? ' bottom__button__active' : '' }` }
                  role='presentation'
                  onClick={ () => setIsOnSelectCustomDate(true) }
               >
                  <IconNew name='CalendarProgramM' />
               </div>
            </div>
         </div>
      </div>
   );
};

DesignCourseSpecificDate.propTypes = {
   setIsOnSelectCustomDate: PropTypes.func,
   timeType: PropTypes.string,
   date: PropTypes.any,
   time: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
};

export default DesignCourseSpecificDate;
