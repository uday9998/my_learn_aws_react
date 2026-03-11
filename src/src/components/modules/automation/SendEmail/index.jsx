import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import QuillEditor from 'components/modules/Editors/QuillEditor';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Tooltip from 'components/elements/members/Tooltip';
import Input from 'components/elements/inputNew';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const checkMailContent = /<[^>]+>\s*(?!<br>\s*$)[^<>\s]+/;

const SendEmail = ({
   onClose, currentAction, saveAction, handleInputChange, position, fromEmail,
}) => {
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const saveActionFunc = () => {
      const newErrors = {};

      if (!currentAction.payload.subject?.trim()) {
         newErrors.subject = ['The email subject field is required.'];
      }
      if (!currentAction.payload.body || !checkMailContent.test(currentAction.payload.body)) {
         newErrors.body = ['The email content field is required.'];
      }

      if (Object.keys(newErrors).length) {
         addErrorMessages(newErrors);
         return;
      }

      if (position) {
         saveAction({ subject: currentAction.payload.subject, body: currentAction.payload.body });
      } else {
         saveAction({
            type: 'email', id: currentAction.id, payload: { subject: currentAction.payload.subject, body: currentAction.payload.body },
         });
      }
   };

   const changeInput = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      handleInputChange(name, value, 'currentAction');
   };

   return (
      <div className='SendEmail'>
         <div className='SendEmail__title'>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='Send Email'
            />
            <Tooltip
               hintText='To change the email of the sender to yours, please go to the Email Settings. For this please make sure the email settings link is included.'
               hintStyle={ { bottom: 'auto', top: '12px', left: '-109px' } }
               isAutomation={ true }
            />
         </div>
         <div className='SendEmail__content'>
            <Input
               value={ `${ fromEmail }` }
               disabled={ true }
               label='From'
            />
            <Input
               errorMessages={ errorMessages.subject }
               helpText={ `${ currentAction.payload.subject ? currentAction.payload.subject.length : 0 }/250` }
               label='Subject Line'
               placeholder='Something to share!'
               name='subject'
               value={ currentAction.payload.subject }
               onChange={ changeInput }
               maxlength={ 250 }
            />
            <div className='SendEmail_textcontent'>
               <ErrorMessageWrapper errorMessages={ errorMessages.body }>
                  <QuillEditor
                     text={ currentAction.payload.body }
                     onChange={ (value) => changeInput('body', value) }
                     title=''
                     withoutBorder={ true }
                  />
               </ErrorMessageWrapper>
            </div>
            {/* <div className='SendEmail__btns'>
               <div className='SendEmail__btn'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Preview in Browser'
                     style={ styles.preview }
                     //  onClick={ backStepClick }
                  />
               </div>
               <div className='SendEmail__btn'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Send Test Email'
                     style={ styles.test }
                     //  onClick={ backStepClick }
                  />
               </div>
            </div> */}
            <div className='SendEmail__btns'>
               <div className='SendEmail__btn'>
                  <BaseButton
                     theme={ btnThemes.secondary }
                     text='Cancel'
                     onClick={ onClose }
                  />
               </div>
               <div className='SendEmail__btn'>
                  <BaseButton
                     text='Save'
                     onClick={ saveActionFunc }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

SendEmail.propTypes = {
   onClose: PropTypes.func,
   saveAction: PropTypes.func,
   currentAction: PropTypes.object,
   handleInputChange: PropTypes.func,
   position: PropTypes.string,
   fromEmail: PropTypes.string,
};

export default SendEmail;
