import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import TextArea from 'components/elements/form/CustomTextArea';
import IconNew from '../iconsSize';
import ErrorMessageWrapper from '../errorMessageWrapper';

const LinkEdit = ({
   onClose, onSave, editableLink, constantUrlStart,
   maxLength, minLength, errorMessage, isTextarea, inputRef,
   allowSpacing, placeholder,
}) => {
   const [classis, setClassis] = useState('');
   const [link, setLink] = useState(editableLink ?? '');
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);

         setTimeout(() => {
            setLocalErrorMessages(prev => prev.filter(msg => msg !== message));
         }, 1500);
      }
   };

   const changeLink = (newValue) => {
      if (newValue.length > maxLength) {
         addErrorMessage(`The link max length is ${ maxLength } symbols`);
         return;
      }

      const regex = allowSpacing ? /^[^/\\]+$/ : /^[^\s/\\]+$/;

      if (newValue && !regex.test(newValue)) {
         addErrorMessage('Not valid symbols');
         return;
      }

      setLink(newValue);
   };

   const saveNewLink = async () => {
      const trimedLink = link.trim();
      if (editableLink === trimedLink) return;

      if (!isTextarea && trimedLink.length < minLength) {
         addErrorMessage(`The link min length is ${ minLength } symbols`);
         return;
      }

      // if (!isTextarea && !trimedLink) {
      //    addErrorMessage('The Link field is required.');
      //    return;
      // }

      const errMessage = await onSave(trimedLink, setLink, onClose) || {};

      const { 0: linkErrMessage = [] } = Object.values(errMessage);

      if (linkErrMessage.length) {
         addErrorMessage(linkErrMessage[0]);
      }
   };

   return (
      <>
         {constantUrlStart && (
            <div className='inputLink__constant'>
               <Text
                  inner={ constantUrlStart }
                  size={ txtSizes.small_14 }
                  type={ txtTypes.regularDefaultGrey150 }
               />
            </div>
         )}
         <ErrorMessageWrapper errorMessages={ localErrorMessages }>
            <div className={ `inputLink ${ classis }` }>
               <div className='inputLink__left'>
                  <div className='inputLink__left__editicon'>
                     <IconNew name='RenameCategoryM' />
                  </div>
                  {!isTextarea && (
                     <input
                        className='inputLink__title'
                        value={ link }
                        onFocus={ () => setClassis('linkFocused') }
                        onBlur={ () => setClassis('') }
                        onChange={ e => changeLink(e.target.value) }
                        placeholder={ placeholder || '' }
                        // maxLength={ maxLength }
                        // minLength={ minLength }
                        ref={ inputRef }
                     />
                  )}
                  {isTextarea && (
                     <TextArea
                        title={ link }
                        placeholder='Description'
                        name='description'
                        maxLength={ 2000 }
                        setClassis={ setClassis }
                        withIcon={ true }
                        onInputChange={ (_, value) => setLink(value) }
                        style={ {
                           fontSize: '14px', color: '#444C4B', fontWeight: '400', lineHeight: '148%', height: '20px',
                        } }
                        addErrorMessage={ addErrorMessage }
                     />
                  )}
               </div>
               <div className='inputLink__actions'>
                  <div
                     role='presentation'
                     onClick={ () => {
                        setLink('');
                        onClose();
                     } }
                  >
                     <IconNew name='CategoryDecline' />
                  </div>
                  <div
                     role='presentation'
                     onClick={ saveNewLink }
                  >
                     <IconNew name='CategoryAccept' />
                  </div>
               </div>
            </div>
         </ErrorMessageWrapper>
      </>
   );
};


LinkEdit.propTypes = {
   onClose: PropTypes.func,
   onSave: PropTypes.func,
   editableLink: PropTypes.string,
   constantUrlStart: PropTypes.string,
   minLength: PropTypes.number,
   maxLength: PropTypes.number,
   errorMessage: PropTypes.string,
   isTextarea: PropTypes.bool,
   inputRef: PropTypes.any,
   allowSpacing: PropTypes.bool,
   placeholder: PropTypes.string,
};

LinkEdit.defaultProps = {
   minLength: 4,
   maxLength: 60,
};

export default LinkEdit;
