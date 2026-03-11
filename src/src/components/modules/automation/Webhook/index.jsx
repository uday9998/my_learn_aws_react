import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Input from 'components/elements/inputNew';

const Webhook = ({
   onClose, currentAction, saveAction, handleInputChange, position,
}) => {
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);
      }
   };

   const saveActionFunc = () => {
      if (!currentAction.payload.url.trim()) {
         addLocalErrorMessage('The URL field is required.');
         return;
      }

      if (position) {
         saveAction({ url: currentAction.payload.url });
      } else {
         saveAction({
            type: 'webhook', id: currentAction.id, payload: { url: currentAction.payload.url },
         });
      }
   };

   const changeInput = (name, value) => {
      if (localErrorMessages.length) {
         setLocalErrorMessages([]);
      }

      handleInputChange(name, value, 'currentAction');
   };

   return (
      <div className='trigger-webhook'>
         <div className='trigger-card-title'>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='Send Webhook'
            />
            <Text
               type={ TextType.regularDefault }
               size={ TextSize.small }
               style={ { color: '#727978' } }
               inner='Enter The Webhook Link.'
            />
         </div>
         <div className='trigger-card-content'>
            <div className='trigger-card-form'>
               <Input
                  errorMessages={localErrorMessages}
                  placeholder='https://'
                  id='url'
                  label='Webhook URL'
                  name='url'
                  value={ currentAction.payload.url }
                  onChange={ changeInput }
               />
            </div>
         </div>
         <div className='trigger-card-btns'>
            <div className='trigger-card-btn'>
               <BaseButton
                  theme={ btnThemes.secondary }
                  text='Cancel'
                  onClick={ onClose }
               />
            </div>
            <div className='trigger-card-btn'>
               <BaseButton
                  text='Save'
                  onClick={ saveActionFunc }
               />
            </div>
         </div>
      </div>
   );
};

Webhook.propTypes = {
   onClose: PropTypes.func,
   saveAction: PropTypes.func,
   currentAction: PropTypes.object,
   handleInputChange: PropTypes.func,
   position: PropTypes.string,
};

export default Webhook;
