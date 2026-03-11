/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import useAutosizeTextArea from 'utils/useAutosizeTextArea.js';
import IToolTipNew from 'components/elements/IToolTipNew';
import IconNew from 'components/elements/iconsSize';

const TextArea = ({
   name, placeholder, title, style,
   className, id, onBlur, onInputChange,
   withIcon,
   iconName,
   setOpenModal,
   IToolTipTextNew,
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
         {withIcon && (
            <div className='textarea__inputNew__icon' onClick={ () => setOpenModal(name, title) } role='presentation'>
               {!IToolTipTextNew && <IconNew name={ iconName } />}
               {IToolTipTextNew && <IToolTipNew tooltip={ IToolTipTextNew } iconName={ iconName } id='tooltip1' />}
            </div>
         )}
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
   setOpenModal: PropTypes.func,
   IToolTipTextNew: PropTypes.string,
   withIcon: PropTypes.bool,
   iconName: PropTypes.string,
};

TextArea.defaultProps = {
   placeholder: 'Type Something',
};

export default TextArea;
