import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const QuizCompleted = ({
   onClose, quizzes, handleInputChange, saveTrigger, currentTrigger,
}) => {
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);
      }
   };

   const quizzesForSelectOption = quizzes.map(quiz => ({ label: quiz.name, value: quiz.id }));
   const saveTriggerFunc = () => {
      if (!currentTrigger.quiz_id) {
         addLocalErrorMessage('The quiz field is required.');
         return;
      }

      saveTrigger({ type: 'quiz_completed', quiz_id: currentTrigger.quiz_id, id: currentTrigger.id });
   };

   const changeInput = (name, value) => {
      if (localErrorMessages.length) {
         setLocalErrorMessages([]);
      }

      handleInputChange(name, value, 'currentTrigger');
   };

   return (
      <div className='trigger-completed'>
         <div className='trigger-card-title'>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='Quiz Completed'
            />
            <Text
               type={ TextType.regularDefault }
               size={ TextSize.small }
               style={ { color: '#727978' } }
               inner='Choose The  Quiz For This Trigger.'
            />
         </div>
         <div className='trigger-card-content'>
            <div className='trigger-card-form'>
               <div className='trigger-card-form-select'>
                  <ErrorMessageWrapper errorMessages={ localErrorMessages }>
                     <Select
                        label='Select Quiz'
                        style={ { height: '48px' } }
                        id='emailto'
                        placeholder='Select Quiz'
                        type='select-medium'
                        options={ quizzesForSelectOption }
                        name='quiz_id'
                        value={ currentTrigger.quiz_id }
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

QuizCompleted.propTypes = {
   onClose: PropTypes.func,
   quizzes: PropTypes.array,
   handleInputChange: PropTypes.func,
   currentTrigger: PropTypes.object,
   saveTrigger: PropTypes.func,
};

export default QuizCompleted;
