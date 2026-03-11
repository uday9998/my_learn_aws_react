import { useState } from 'react';

export function useMutliSelect(items) {
   const [state, setState] = useState([]);
   const handleCheck = (itemValue) => {
      if (state.includes(itemValue)) {
         setState(state.filter((e) => e !== itemValue));
         return;
      }
      setState([...state,
         itemValue]);
   };
   const handleSelectAll = () => {
      if (state.length < items.length) {
         setState(items.map((e) => e.id));
         return;
      }
      setState([]);
   };
   return [state, handleCheck, handleSelectAll, setState];
}
