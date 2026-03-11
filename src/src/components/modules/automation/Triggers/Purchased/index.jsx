import { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const Purchased = ({
   onClose, courses, handleInputChange, currentTrigger, saveTrigger,
}) => {
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);
      }
   };

   const coursesForSelectOption = courses.map(course => ({ label: course.name, value: course.id }));
   const saveTriggerFunc = () => {
      if (!currentTrigger.course_id) {
         addLocalErrorMessage('The class field is required.');
         return;
      }

      saveTrigger({ type: 'purchase', course_id: currentTrigger.course_id, id: currentTrigger.id });
   };

   const changeInput = (name, value) => {
      if (localErrorMessages.length) {
         setLocalErrorMessages([]);
      }

      handleInputChange(name, value, 'currentTrigger');
   };

   return (
      <div className='trigger-purchased'>
         <div className='trigger-card-title'>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='Purchased'
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
                        label='Select Product'
                        style={ { height: '48px' } }
                        id='emailto'
                        placeholder='Select Product'
                        type='select-medium'
                        options={ coursesForSelectOption }
                        name='course_id'
                        value={ currentTrigger.course_id }
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

Purchased.propTypes = {
   onClose: PropTypes.func,
   courses: PropTypes.array,
   handleInputChange: PropTypes.func,
   currentTrigger: PropTypes.object,
   saveTrigger: PropTypes.func,
};

export default Purchased;
