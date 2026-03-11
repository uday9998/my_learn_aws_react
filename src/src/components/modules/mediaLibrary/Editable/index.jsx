import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import Icon from 'components/elements/Icon';

function Editable({
   value, onChange, onCancel, onSubmit, focused,
}) {
   const textareaRef = useRef(null);
   const submited = useRef(false);
   function handleSubmit(evt) {
      if (evt.which === 13) {
         evt.preventDefault();
         onSubmit();
         submited.current = true;
         evt.target.blur();
      }
   }

   function handleBlur() {
      if (!submited.current) {
         onCancel();
      }
   }

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.select();
      }
   }, [textareaRef]);

   return (
      <ClickOutside onClick={ (e) => handleBlur(e) }>
         <div className='editableItem'>
            <input
               onKeyPress={ handleSubmit }
               // onBlur={ handleBlur }
               className='editable___text'
               ref={ textareaRef }
               value={ value }
               // eslint-disable-next-line jsx-a11y/no-autofocus
               autoFocus={ focused }
               onChange={ (e) => onChange(e.target.value) }
            />
            <div
               role='presentation'
               onClick={ () => {
                  onSubmit();
               } }
               className='mediaLibrary__item__name__title__save'
            ><Icon name='save' />
            </div>
            <div
               role='presentation'
               onClick={ () => {
                  onCancel();
               } }
               className='mediaLibrary__item__name__title__cancel'
            ><Icon name='cancel' />
            </div>
         </div>
      </ClickOutside>
   );
}

Editable.propTypes = {
   value: PropTypes.string,
   onChange: PropTypes.func,
   onCancel: PropTypes.func,
   onSubmit: PropTypes.func,
   focused: PropTypes.any,
};

export default Editable;
