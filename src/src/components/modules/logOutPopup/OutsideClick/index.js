import React, { useEffect } from 'react';

const ClickOutside = ({ children, onClick }) => {
   const refs = React.Children.map(children, () => React.createRef());
   const handleClick = e => {
      const isOutside = refs.every(ref => {
         if (ref.current !== null) {
            return !ref.current.contains(e.target);
         }
         return null;
      });
      if (isOutside) {
         onClick(e);
      }
   };

   useEffect(() => {
      setTimeout(() => {
         document.addEventListener('click', handleClick);
      });

      return function () {
         document.removeEventListener('click', handleClick);
      };
   }, [handleClick]);

   return React.Children.map(children, (element, idx) => React.cloneElement(element, { ref: refs[idx] }));
};


export default ClickOutside;
