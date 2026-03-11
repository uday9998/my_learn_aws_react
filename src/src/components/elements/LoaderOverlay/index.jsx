import React, { useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const LoaderOverlay = () => {
   const [rootEl, setRootEl] = useState();
   
   useLayoutEffect(() => {
      const div = document.createElement('div');
      div.classList.add('loaderOverlay');
      document.body.insertBefore(div, document.body.firstChild);
      setRootEl(div);
      return () => {
         div.remove();
      };
   }, []);
   
   if (!rootEl) return null;
   
   return ReactDOM.createPortal(
      <div className="loader-container">
         <div className="circular-loader"></div>
      </div>, 
      rootEl
   );
};

export default LoaderOverlay;