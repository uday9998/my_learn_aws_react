import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import CheckBox from 'components/elements/form/CheckBox';
import Icon from 'components/elements/Icon';
import { sortableHandle } from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => (
   <Icon name='Dragdrop' />
));

const QuizAnswer = ({
   index, description, isTrue, onChange, handleDeleteAnswer,
}) => {
   const generateAlphabets = (() => {
      const alphabets = [];
      const start = 'A'.charCodeAt(0);
      const last = 'Z'.charCodeAt(0);
      for (let i = start; i <= last; ++i) {
         alphabets.push(String.fromCharCode(i));
      }

      return alphabets.join('');
   })();

   return (
      <div className='quizItem__answer'>
         <div className='quizItem_number'>
            {
               generateAlphabets[index]
            }
         </div>
         <div className='quizItem_form'>
            <div className='quizItem_checkbox'>
               <CheckBox
                  label=''
                  filled
                  onChange={ onChange }
                  name='is_true'
                  checked={ Number(isTrue) }
               />
            </div>
            <div className='quizItem_input'>
               <TextInput
                  placeholder='Type your answer choice'
                  id='quizAnswer'
                  label=''
                  name='description'
                  value={ description }
                  onChange={ onChange }
               />
               <div className='quizItem_delete' role='presentation' onClick={ handleDeleteAnswer }>
                  <Icon name='Delete' />
               </div>

            </div>
         </div>
         <div className='quizItem_bar'>
            <DragHandle />
            {/* <Icon name='Dragdrop' /> */}
         </div>
      </div>
   );
};

QuizAnswer.propTypes = {
   index: PropTypes.number,
   description: PropTypes.string,
   isTrue: PropTypes.any,
   onChange: PropTypes.func,
   handleDeleteAnswer: PropTypes.func,
};

export default QuizAnswer;
