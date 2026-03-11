import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ErrorMessageWrapper from '../errorMessageWrapper';

const TextArea = ({
   width,
   placeholderText,
   labelText,
   color,
   value,
   name,
   onChange,
   maxLength,
}) => {
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const changeText = (e) => {
      if (e.target.value.length > Number(maxLength)) {
         const errorMessage = `There is a limit of ${ maxLength } characters for you to write.`;

         if (localErrorMessages.includes(errorMessage)) return;

         setLocalErrorMessages(prev => [...prev, errorMessage]);

         setTimeout(() => {
            setLocalErrorMessages(prev => prev.filter(message => message !== errorMessage));
         }, 1000);
         return;
      }

      onChange(e);
   };

   return (
      <div className='textarea__wrapper'>
         <span>{labelText}</span>
         <ErrorMessageWrapper errorMessages={ localErrorMessages }>
            <textarea
               className='textarea_component'
               value={ value }
               // maxLength={ maxLength }
               style={ {
                  width,
                  color,
               } }
               name={ name }
               placeholder={ placeholderText }
               onChange={ changeText }
            />
         </ErrorMessageWrapper>
      </div>
   );
};

TextArea.propTypes = {
   width: PropTypes.string,
   placeholderText: PropTypes.string,
   labelText: PropTypes.string,
   color: PropTypes.string,
   value: PropTypes.string,
   name: PropTypes.string,
   onChange: PropTypes.func,
   maxLength: PropTypes.number,
};

export default TextArea;
