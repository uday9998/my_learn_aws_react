import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import InfiniteScrollPicker from 'components/elements/InfiniteScrolPicker';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

const TimePicker = ({ value, onChange }) => {
   const [data, setData] = useState({
      variant: 'AM',
   });
   useEffect(() => {
      if (value) {
         const counts = value ? value.split(':') : [9, 9];
         setData({
            ...data,
            hour: Number.parseFloat(counts[0]),
            time: Number.parseFloat(counts[1]),
         });
      }
   }, []);

   useEffect(() => {
      const { hour, time } = data;
      if (hour !== undefined && time !== undefined) {
         onChange(`${ hour < 10 ? '0' : '' }${ hour }:${ time < 10 ? '0' : '' }${ time }`, data.variant);
      }
   }, [data]);


   return (
      <div className='time__picker'>
         <InfiniteScrollPicker
            value={ data.hour }
            onSelect={ (v) => setData({ ...data, hour: v }) }
            // toNumber={ data.variant === 'AM' ? 12 : 24 }
            toNumber={ 12 }
         />
         <InfiniteScrollPicker
            value={ data.time }
            onSelect={ (v) => setData({ ...data, time: v }) }
            // toNumber={ 60 }
            toNumber={ 59 }
         />
         <div className='time__picker__right'>
            <div
               className='time__picker__variant'
               role='presentation'
               onClick={ () => setData({ ...data, variant: 'AM' }) }
               style={ { background: data.variant === 'AM' ? '#E8F2F1' : 'inherit' } }
            >
               <Text
                  inner='AM'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
            <div
               className='time__picker__variant'
               role='presentation'
               onClick={ () => setData({ ...data, variant: 'PM' }) }
               style={ { background: data.variant === 'PM' ? '#E8F2F1' : 'inherit' } }
            >
               <Text
                  inner='PM'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
         </div>
      </div>
   );
};

TimePicker.propTypes = {
   value: PropTypes.string,
   onChange: PropTypes.func,

};

export default TimePicker;
