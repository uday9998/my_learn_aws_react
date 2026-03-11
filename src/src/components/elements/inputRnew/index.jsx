/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import IconButton from '../buttons/IconButton';

const Input = function ({
   placeholder, value, onKeyPress,
   classI, name, type, disabled, id,
   onBlur, inputRef, maxlength,
   isCertificate, onSave, onclose,
}) {
   const dataRef = useRef(null);
   const [types, setTypes] = useState(type);
   const [classis, setClassis] = useState('');
   const [inputName, setInputName] = useState(value);
   const [isOpenCalendar, setIsOpenCalendar] = useState(false);
   useOutsideClickDetector(dataRef, () => setIsOpenCalendar(false));
   useEffect(() => {
      setTypes(type);
   }, [type]);

   useEffect(() => {
      if (isOpenCalendar && type === 'date' && isCertificate) {
         if (document.getElementsByClassName('modal__new__content') && document.getElementsByClassName('modal__new__content')[0]) {
            const el = document.getElementsByClassName('modal__new__content')[0];
            el.scrollTop = el.scrollHeight;
         }
      }
   }, [isOpenCalendar]);


   const onChangeTextInput = (e) => {
      const newValue = e.target.value;
      if (newValue.length <= Number(maxlength)) {
         setInputName(newValue);
      } else if (isPrint(`There is a limit of ${ maxlength } characters for you to write.`)) {
         toast.error(`There is a limit of ${ maxlength } characters for you to write.`);
      }
   };


   return (
      <div className={ `${ classI }` }>
         <div className={ `inputRnew inputRnew_${ classis } ${ disabled ? 'input_new_disabled' : '' }` }>
            <input
               id={ id }
               value={ inputName }
               name={ name }
               type={ types }
               disabled={ disabled }
               ref={ inputRef }
               onKeyPress={ onKeyPress }
               onFocus={ () => {
                  setClassis('focused');
               } }
               onBlur={ onBlur ? (e) => { setClassis(''); onBlur(e.target.name, e.target.value, e); } : () => setClassis('') }
               placeholder={ placeholder || '' }
               onChange={ (e) => { onChangeTextInput(e); } }
               className=' input_new'
            />
            <div className='inputEdit__btns'>
               <IconButton
                  onClick={ () => { onclose(); setInputName(''); } }
                  theme='light'
                  name='cancel'
               />
               {onSave && (
                  <IconButton
                     name='BulletCheck'
                     theme='primary'
                     onClick={ () => onSave(inputName) }
                  />
               )}
            </div>
         </div>
      </div>
   );
};

Input.defaultProps = {
   type: 'text',
   placeholder: '',
   value: '',
   name: '',
   classI: '',
   onKeyPress: () => {},
   onBlur: () => {},
   maxlength: 150,
};

Input.propTypes = {
   type: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.any,
   name: PropTypes.string,
   classI: PropTypes.string,
   disabled: PropTypes.bool,
   id: PropTypes.string,
   inputRef: PropTypes.object,
   onKeyPress: PropTypes.func,
   onBlur: PropTypes.func,
   maxlength: PropTypes.number,
   isCertificate: PropTypes.bool,
   onSave: PropTypes.func,
   onclose: PropTypes.func,
};

export default Input;
