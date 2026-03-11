import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import ReactTooltip from 'react-tooltip';

const TruncateText = ({
   text,
   className,
   textClass,
   textSize,
   fontWeight,
   width,
   textStyle,
}) => {
   const ref = useRef(null);
   const [showTootltip, setShowTooltip] = useState(false);

   const onMouseOver = e => {
      if (ref.current) {
         const spanElement = document.createElement('span');
         spanElement.style.position = 'absolute';
         spanElement.style.whiteSpace = 'nowrap';
         spanElement.style.visibility = 'hidden';
         spanElement.style.top = '0';
         spanElement.style.left = '0';
         spanElement.style.height = '100%';
         spanElement.style.fontSize = textSize;
         spanElement.style.fontWeight = fontWeight;
         spanElement.innerHTML = text;
         ref.current.appendChild(spanElement);
         if (spanElement.offsetWidth > ref.current.offsetWidth) {
            setShowTooltip(true);
         } else {
            setShowTooltip(false);
         }
         ref.current.removeChild(spanElement);
      }
   };

   useEffect(() => {
      window.addEventListener('resize', onMouseOver);
      return () => {
         window.removeEventListener('resize', onMouseOver);
      };
   }, []);

   useEffect(() => {
      onMouseOver();
   }, [text, textSize]);
   return (
      <div
         data-tip={ showTootltip ? text : '' }
         style={ {
            maxWidth: width,
         } }
         ref={ ref }
         className={ `${className} truncate-text-content` }
         role='presentation'
         onMouseEnter={ onMouseOver }
      >
         <span
            className={ `truncate ${textClass}` }
            style={ textStyle }
         >
            {text}
         </span>
         {
            showTootltip && (
               <ReactTooltip />
            )
         }
      </div>
   );
};

TruncateText.propTypes = {
   text: PropTypes.string,
   className: PropTypes.string,
   textClass: PropTypes.string,
   textSize: PropTypes.string,
   fontWeight: PropTypes.string,
   width: PropTypes.string,
   textStyle: PropTypes.object,
};

export default TruncateText;
