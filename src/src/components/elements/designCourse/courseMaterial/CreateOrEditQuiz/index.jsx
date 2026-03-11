import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import QuizAnswer from 'components/elements/designCourse/courseMaterial/QuizAnswer';
import {
   sortableContainer,
   sortableElement,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableList = sortableElement(({
   number, description, isTrue, onChange, handleDeleteAnswer, answer,
}) => {
   return (
      <QuizAnswer
         index={ number }
         answer={ answer }
         description={ description }
         isTrue={ isTrue }
         onChange={ onChange }
         handleDeleteAnswer={ handleDeleteAnswer }
      />
   );
});


const SortableContainer = sortableContainer(({ children }) => {
   return <>{children}</>;
});


const CreateOrEditQuiz = ({
   number, question, answers, onChangeQuestion, onChangeAnswer, addAnswer, mode, onCancel, onUpdate, handleDeleteAnswer,
   setNewAnswers,
}) => {
   function onSortEnd({ oldIndex, newIndex }) {
      if (oldIndex !== newIndex) {
         const newData = arrayMove(answers, oldIndex, newIndex);
         setNewAnswers(newData);
      }
   }
   return (
      <div className='createOrEditQuiz'>
         <div className='createOrEditQuiz__question'>
            <TextInput
               label={ `Question ${ number || 1 }` }
               placeholder='Type your question'
               id='quizQuestion'
               name='quizQuestion'
               value={ question }
               onChange={ (name, value) => onChangeQuestion(value) }
            />
         </div>
         <SortableContainer onSortEnd={ onSortEnd } helperClass='sortableHelper' useDragHandle>
            <div className='createOrEditQuiz__answers'>
               {
                  answers.map((answer, i) => (

                     <div key={ i.toString() }>
                        <SortableList
                           index={ i }
                           number={ i }
                           answer={ answer }
                           description={ answer.description }
                           isTrue={ answer.is_true }
                           onChange={ (name, value) => onChangeAnswer(i, name, value) }
                           handleDeleteAnswer={ () => handleDeleteAnswer(i) }
                        />
                     </div>
                  ))
               }
            </div>
         </SortableContainer>
         <div className='createOrEditQuiz__button'>
            <BaseButton
               theme={ buttonTheme.lightGreen }
               size={ buttonSizes.full }
               text='Add Answer'
               onClick={ () => addAnswer() }
            />
         </div>
         {
            mode === 'edit' && (
               <div className='m-t-exl flex justify-end align-center'>
                  <div className='m-r-m'>
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.large }
                        text='Cancel'
                        onClick={ () => onCancel() }
                     />
                  </div>
                  <div>
                     <BaseButton
                        theme={ buttonTheme.darkGreen }
                        size={ buttonSizes.large }
                        text='Save'
                        onClick={ () => onUpdate() }
                     />
                  </div>
               </div>
            )
         }
      </div>
   );
};

CreateOrEditQuiz.propTypes = {
   number: PropTypes.number,
   question: PropTypes.string,
   onChangeQuestion: PropTypes.func,
   onChangeAnswer: PropTypes.func,
   addAnswer: PropTypes.func,
   answers: PropTypes.array,
   mode: PropTypes.string,
   onCancel: PropTypes.func,
   onUpdate: PropTypes.func,
   handleDeleteAnswer: PropTypes.func,
   setNewAnswers: PropTypes.func,
};

CreateOrEditQuiz.defaultProps = {
   setNewAnswers: () => {},
};

export default CreateOrEditQuiz;
