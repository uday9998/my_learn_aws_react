import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const RemoveTag = ({
   onClose, currentAction, saveAction, handleInputChange, tags, position,
}) => {
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);
      }
   };

   const tagsForSelectOption = tags.map(tag => ({ label: tag.name, value: tag.id }));
   const saveActionFunc = () => {
      if (!currentAction.payload.tag_id) {
         addLocalErrorMessage('The tag field is required.');
         return;
      }

      if (position) {
         saveAction({ tag_id: currentAction.payload.tag_id });
      } else {
         saveAction({
            type: 'remove_tag', id: currentAction.id, payload: { tag_id: currentAction.payload.tag_id },
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
      <div className='trigger-addtag'>
         <div className='trigger-card-title'>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='Remove Tag'
            />
            <Text
               type={ TextType.regularDefault }
               size={ TextSize.small }
               style={ { color: '#727978' } }
               inner='Choose The Tag For This Action.'
            />
         </div>
         <div className='trigger-card-content'>
            <div className='trigger-card-form'>
               <div className='trigger-card-form-select'>
                  <ErrorMessageWrapper errorMessages={ localErrorMessages }>
                     <Select
                        label='Select Tag'
                        style={ { height: '48px' } }
                        id='emailto'
                        placeholder='Select Tag'
                        type='select-medium'
                        options={ tagsForSelectOption }
                        name='tag_id'
                        value={ currentAction.payload.tag_id }
                        onChange={ changeInput }
                        icon='TriangleDownBlack'
                     />
                  </ErrorMessageWrapper>
               </div>
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

RemoveTag.propTypes = {
   tags: PropTypes.array,
   onClose: PropTypes.func,
   saveAction: PropTypes.func,
   currentAction: PropTypes.object,
   handleInputChange: PropTypes.func,
   position: PropTypes.string,
};

export default RemoveTag;
