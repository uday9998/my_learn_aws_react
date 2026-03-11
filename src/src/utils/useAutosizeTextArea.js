import { useEffect } from 'react';
import PropTypes from 'prop-types';

const useAutosizeTextArea = (
   textAreaRef,
   value
) => {
   useEffect(() => {
      if (textAreaRef) {
         textAreaRef.style.height = '0px';
         const scrollHeight = textAreaRef.scrollHeight;
         textAreaRef.style.height = `${ scrollHeight + 5 }px`;
      }
   }, [textAreaRef, value]);
   return () => {
      if (textAreaRef) {
         textAreaRef.style.height = '0px';
         const scrollHeight = textAreaRef.scrollHeight;
         textAreaRef.style.height = `${ scrollHeight + 5 }px`;
      }
   };
};

useAutosizeTextArea.propTypes = {
   textAreaRef: PropTypes.any,
};

export default useAutosizeTextArea;
