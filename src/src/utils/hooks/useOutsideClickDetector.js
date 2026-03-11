import { useEffect } from 'react';

const useOutsideClickDetector = (ref, handleOutsideClick, exceptionPart) => {
   function handleClickOutside(event) {
      if (exceptionPart) {
         if (ref && ref.current && ref.current.id && document.getElementById(ref.current.id) && !document.getElementById(ref.current.id).contains(event.target)) {
            handleOutsideClick();
         }
      } else if (ref.current && !ref.current.contains(event.target)) {
         if (exceptionPart) {
            if (!exceptionPart.current.contains(event.target)) {
               handleOutsideClick();
            }
         } else {
            handleOutsideClick();
         }
      }
   }


   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   });
};
export default useOutsideClickDetector;
