/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import useAutosizeTextArea from 'utils/useAutosizeTextArea.js';

const TextArea = ({
   name, placeholder, title, style,
   className, id, onBlur, onInputChange,
}) => {
   const textAreaRefTitle = useRef(null);

   useEffect(() => {
      if (textAreaRefTitle.current) {
         textAreaRefTitle.current.style.height = '0px';
         const scrollHeight = textAreaRefTitle.current.scrollHeight;
         textAreaRefTitle.current.style.height = `${ scrollHeight + 5 }px`;
      }
   }, [textAreaRefTitle.current, title]);
   return (
      <div className={ `custom__textArea ${ className }` }>
         <textarea
            style={ style }
            id={ id }
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={ true }
            ref={ textAreaRefTitle }
            value={ title }
            name={ name }
            onBlur={ onBlur ? (e) => {
               onBlur(e.target.name, e.target.value);
            } : () => {} }
            placeholder={ placeholder }
            onChange={ (e) => onInputChange(e.target.name, e.target.value) }
         />
      </div>

   );
};

TextArea.propTypes = {
   placeholder: PropTypes.string,
   onInputChange: PropTypes.func,
   name: PropTypes.string,
   style: PropTypes.object,
   title: PropTypes.string,
   className: PropTypes.string,
   id: PropTypes.string,
   onBlur: PropTypes.func,
};

TextArea.defaultProps = {
   placeholder: 'Type Something',
};

export default TextArea;
