import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

const InfiniteScrollPicker = ({ toNumber, onSelect, value }) => {
   const [arrayToView, setArrayToView] = useState([]);
   const listInnerRef = useRef();

   const getForNumbers = () => {
      const data = [];
      let start = 1;
      if (toNumber === 59) {
         start = 0;
      }
      for (let index = start; index <= toNumber; index++) {
         data.push(index);
      }
      return data;
   };

   useEffect(() => {
      setArrayToView(getForNumbers());
   }, [toNumber]);

   const onScroll = () => {
      if (listInnerRef.current) {
         const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
         if (scrollTop + clientHeight === scrollHeight) {
            setArrayToView([...arrayToView, ...getForNumbers()]);
         }
      }
   };

   return (
      <div
         onScroll={ onScroll }
         ref={ listInnerRef }
         className='infinite__scroll__picker'
      >
         {arrayToView.map((item) => {
            return (
               <div
                  role='presentation'
                  key={ uniqueId() }
                  onClick={ () => {
                     onSelect(item);
                  } }
                  className={ `infinite__scroll__picker__item${ item === value ? ' infinite__scroll__picker__item__active' : '' }` }
               >
                  <Text
                     inner={ `${ item < 10 ? '0' : '' }${ item }` }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
            );
         })}
      </div>
   );
};

InfiniteScrollPicker.propTypes = {
   toNumber: PropTypes.number,
   onSelect: PropTypes.func,
   value: PropTypes.any,
};

export default InfiniteScrollPicker;
