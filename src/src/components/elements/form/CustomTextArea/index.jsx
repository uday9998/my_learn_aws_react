/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import useAutosizeTextArea from 'utils/useAutosizeTextArea.js';
import IToolTipNew from 'components/elements/IToolTipNew';
import IconNew from 'components/elements/iconsSize';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const TextArea = ({
   onInputChange, name, placeholder, title, style,
   className, id, onBlur,
   withIcon,
   iconName,
   setOpenModal,
   IToolTipTextNew, maxLength = 2000, setClassis,
   addErrorMessage,
}) => {
   const textAreaRefTitle = useRef(null);
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   // useAutosizeTextArea(textAreaRefTitle && textAreaRefTitle.current, title);
   useEffect(() => {
      if (textAreaRefTitle.current) {
         textAreaRefTitle.current.style.height = '0px';
         const scrollHeight = textAreaRefTitle.current.scrollHeight;
         textAreaRefTitle.current.style.height = `${ scrollHeight + 5 }px`;
      }
   }, [textAreaRefTitle.current, title]);

   const addLocalErrorMessage = (message) => {
      if (addErrorMessage) {
         addErrorMessage(message);
         return;
      }

      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);

         setTimeout(() => {
            setLocalErrorMessages(prev => prev.filter(msg => msg !== message));
         }, 1500);
      }
   };

   const changeText = (e) => {
      const { value, name } = e.target;

      if (value.length > Number(maxLength)) {
         addLocalErrorMessage(`There is a limit of ${ maxLength } characters for you to write.`);
         return;
      }

      onInputChange(name, value);
   };

   return (
      <ErrorMessageWrapper errorMessages={ localErrorMessages }>
         <div className={ `custom__textArea ${ className }` }>
            <textarea
               style={ style }
               id={ id }
               // maxLength={ maxLength }
               ref={ textAreaRefTitle }
               onFocus={ () => setClassis('focused') }
               value={ title }
               name={ name }
               onBlur={ onBlur ? (e) => {
                  onBlur(e.target.name, e.target.value); setClassis('');
               } : () => { setClassis(''); } }
               placeholder={ placeholder }
               onChange={ changeText }
            />
            {withIcon && (
               <div className='textarea__inputNew__icon' onClick={ () => setOpenModal(name, title) } role='presentation'>
                  {!IToolTipTextNew && <IconNew name={ iconName } />}
                  {IToolTipTextNew && <IToolTipNew tooltip={ IToolTipTextNew } iconName={ iconName } id='tooltip1' />}
               </div>
            )}
         </div>
      </ErrorMessageWrapper>
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
   setOpenModal: PropTypes.func,
   IToolTipTextNew: PropTypes.string,
   withIcon: PropTypes.bool,
   iconName: PropTypes.string,
   maxLength: PropTypes.number,
   setClassis: PropTypes.func,
   addErrorMessage: PropTypes.func,
};

TextArea.defaultProps = {
   placeholder: 'Type Something',
   setClassis: () => {},
};

export default TextArea;
