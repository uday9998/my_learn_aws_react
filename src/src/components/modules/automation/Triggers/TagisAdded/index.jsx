import { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';


const TagisAdded = ({
   onClose, tags, saveTrigger, currentTrigger, handleInputChange,
}) => {
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);
      }
   };

   const tagsForSelectOption = tags.map(tag => ({ label: tag.name, value: tag.id }));
   const saveTriggerFunc = () => {
      if (!currentTrigger.tag_id) {
         addLocalErrorMessage('The tag field is required.');
         return;
      }

      saveTrigger({ type: 'tag', tag_id: currentTrigger.tag_id, id: currentTrigger.id });
   };

   const changeInput = (name, value) => {
      if (localErrorMessages.length) {
         setLocalErrorMessages([]);
      }

      handleInputChange(name, value, 'currentTrigger');
   };

   return (
      <div className='trigger-tag'>
         <div className='trigger-card-title'>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='Tag Is Added'
            />
            <Text
               type={ TextType.regularDefault }
               size={ TextSize.small }
               style={ { color: '#727978' } }
               inner='Choose The Product For This Trigger.'
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
                        value={ currentTrigger.tag_id }
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
                  onClick={ saveTriggerFunc }
               />
            </div>
         </div>
      </div>
   );
};

TagisAdded.propTypes = {
   onClose: PropTypes.func,
   tags: PropTypes.array,
   handleInputChange: PropTypes.func,
   currentTrigger: PropTypes.object,
   saveTrigger: PropTypes.func,
};

export default TagisAdded;
