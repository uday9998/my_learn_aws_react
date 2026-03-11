import { useEffect, useState } from 'react';
import { getWindowSize } from 'utils/getWindowSize';

export const useWindowSizeChange = () => {
   const [windowSize, setWindowSize] = useState(getWindowSize());

   useEffect(() => {
      function handleWindowResize() {
         setWindowSize(getWindowSize());
      }

      window.addEventListener('resize', handleWindowResize);

      return () => {
         window.removeEventListener('resize', handleWindowResize);
      };
   }, []);
   const isMobile = windowSize.innerWidth < 1024;
   return { ...windowSize, isMobile };
};
