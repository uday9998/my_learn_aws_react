import { useEffect } from 'react';

export const useSearch = (value, onSearch, isActive = true) => {
   useEffect(() => {
      if (isActive) {
         const delayDebounceFn = setTimeout(() => {
            onSearch(value);
         }, 500);

         return () => clearTimeout(delayDebounceFn);
      }
   }, [value]);
   return null;
};
