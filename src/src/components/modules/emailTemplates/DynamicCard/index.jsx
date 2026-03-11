import React, { useRef } from 'react';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import EditorConvertToHTML from 'components/modules/editor';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';


const DynamicCard = ({
   isOpen, title, handleInputChange, subject, body, subjectValue, bodyValue,
   saveButtonClick, isModified, handleRevertAutoEmail, templateId, hasEmailToolTip,
   emailTooltipText, notifyName, notifyEnrollment,
}) => {
   const editorRef = useRef(null);
   return (
      <DynamicWrapper
         isOpen={ isOpen }
         title={ title }
         borderColor='#cddaf1'
         openedBackColor='#fbfdff'
         hasEmailToolTip={ hasEmailToolTip }
         emailTooltipText={ emailTooltipText }
         notifyName={ notifyName }
         notifyEnrollment={ notifyEnrollment }
         handleInputChange={ handleInputChange }
      >
         <div className='dynamicCard m-t-m'>
            <TextInput
               placeholder='Type something'
               label='Email Subject'
               rightLabel={ `${ subjectValue.length }/150` }
               onChange={ (name, value) => {
                  if (value.length <= 150) {
                     handleInputChange(name, value);
                  } else if (isPrint('You are reached the character limit')) {
                     toast.error('You are reached the character limit');
                  }
               } }
               name={ subject }
               value={ subjectValue }
            />
            <div className='m-t-exl' />
            <EditorConvertToHTML
               description={ bodyValue || '' }
               ref={ editorRef }
               onChange={ (data) => {
                  handleInputChange(body, data);
               } }
            />
            <div className='dynamicCard__btn'>
               { isModified ? (
                  <BaseButton
                     size={ btnSize.large }
                     text='Revert'
                     onClick={ () => {
                        handleRevertAutoEmail(templateId);
                     } }
                     style={ { marginRight: '5px' } }
                  />
               ) : null }
               <BaseButton
                  size={ btnSize.large }
                  text='Save'
                  className='email-save'
                  onClick={ () => saveButtonClick() }
               />
            </div>
         </div>

      </DynamicWrapper>
   );
};

DynamicCard.propTypes = {
   isOpen: PropTypes.bool,
   isModified: PropTypes.bool,
   title: PropTypes.string,
   handleInputChange: PropTypes.func,
   saveButtonClick: PropTypes.func,
   handleRevertAutoEmail: PropTypes.func,
   subject: PropTypes.string,
   body: PropTypes.string,
   subjectValue: PropTypes.string,
   bodyValue: PropTypes.string,
   templateId: PropTypes.string,
   notifyName: PropTypes.string,
   notifyEnrollment: PropTypes.number,
   hasEmailToolTip: PropTypes.bool,
   emailTooltipText: PropTypes.string,
};

DynamicCard.defaultProps = {
   isOpen: true,
   title: 'Title',
};

export default DynamicCard;
