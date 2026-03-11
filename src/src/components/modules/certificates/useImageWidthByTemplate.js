import {
   useCallback, useEffect, useRef, useState,
} from 'react';

const useImageWidthByTemplate = (heights, template, src) => {
   const [size, setSize] = useState({});
   const ref = useRef(null);
   const imageLoaded = useRef(false);

   const calculate = useCallback((img) => {
      if (!img) return;
      const [imgWidth, imgHeight] = [img.naturalWidth, img.naturalHeight];
      const maxHeight = heights[template];
      if (imgHeight > maxHeight) {
         setSize({ width: maxHeight * imgWidth / imgHeight, height: maxHeight });
      } else {
         setSize({ width: imgWidth, height: imgHeight });
      }
   }, [template, src, heights, imageLoaded.current]);
   useEffect(() => {
      calculate(ref.current);
   }, [template, calculate, src, ref.current]);
   useEffect(() => {
      function loadHandler({ target }) {
         calculate(target);
      }
      if (ref.current) {
         imageLoaded.current = true;
         ref.current.addEventListener('load', loadHandler);
      }
      const image = ref.current;
      return () => {
         image.removeEventListener('load', loadHandler);
      };
   }, [calculate]);
   return { size, ref };
};

export default useImageWidthByTemplate;
