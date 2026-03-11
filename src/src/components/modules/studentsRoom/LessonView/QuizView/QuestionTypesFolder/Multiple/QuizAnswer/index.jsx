/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import TextInput from 'components/elements/form/TextInput';
// import CheckBox from 'components/elements/form/CheckBox';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import TextArea from 'components/elements/form/CustomTextArea';
import IconNew from 'components/elements/iconsSize';
import GeneratorModal from 'components/elements/GeneratorModal';
import classnames from 'classnames';


const QuizAnswer = ({
   index, description, isTrue, onChange, handleDeleteAnswer, drag, answersLength,
   checkedAnswers, handleDuplicateAnswer,
}) => {
   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });
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
      <div className={ classnames('quizItem__answer', {
         'quizItem__answer__active': isTrue,
         'quizItem__answer__inActive': !isTrue,
      }) }
      >
         <div
            className='quizItem_bar answerDragHandleIcon'
            { ...drag }
         >
            <IconNew name='DragQuizS' />
         </div>
         <div className={ description ? 'quizItem_number quizItem_number_filled' : 'quizItem_number' } role='presentation' onClick={ () => onChange('is_true', !isTrue) }>
            <Text
               inner={
                  generateAlphabets[index]
               }
               size={ sizes.small }
               type={ types.regularDefault }
               style={ isTrue ? { color: ' #fff' } : description ? { color: '#131F1E' } : { color: ' #A1A5A5' } }
            />
         </div>
         <div className='quizItem_form'>

            <div className='quizItem_input'>
               <TextArea
                  title={ description || '' }
                  placeholder='Choice'
                  className='custom__textArea__theme__grey'
                  withIcon={ true }
                  iconName='Generator'
                  setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                  IToolTipTextNew='AI Generator'
                  name='description'
                  onInputChange={ (name, value) => onChange(name, value) }
                  style={ {
                     fontSize: '14px',
                     color: '#131F1E',
                     fontWeight: '400',
                     lineHeight: '168%',
                     height: '24px',
                  } }
               />
            </div>
         </div>
         <div className='quizItem_answers_actions'>
            <div className='mark_correct' role='presentation' onClick={ () => onChange('is_true', !isTrue) }>
               <IconNew name='CheckM' />
               <Text
                  inner={ isTrue ? 'Mark as Incorrect' : 'Mark as Correct' }
                  size={ sizes.xsmall }
                  type={ types.regularDefaultSmallX }
                  style={ isTrue ? { color: ' #fff' } : { color: '#131F1E' } }
               />
            </div>

            <div className='answer_actions'>
               <div className='grey_divider' />
               <div onClick={ (e) => { e.stopPropagation(); handleDuplicateAnswer(); } } role='presentation'><IconNew name='DuplicateMediaM' /></div>
               {((answersLength > 2 && checkedAnswers.length !== 1)
          || (answersLength > 2 && (checkedAnswers.length === 1 && !isTrue)))
               && (
                  <div className='quizItem_delete' role='presentation' onClick={ handleDeleteAnswer }>
                     <IconNew name='CertificatesDeleteS' />
                  </div>
               )}
            </div>
         </div>
         {!!isTrue && (
            <div className='correct_answer'>
               <Text
                  inner='Correct Answer'
                  size={ sizes.xsmall }
                  type={ types.regular148 }
                  style={ { color: '#24554E' } }
               />
            </div>
         )}
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               title='Answer'
               isQuiz={ true }
               setData={ onChange }
            />
         )}
      </div>
   );
};

QuizAnswer.propTypes = {
   index: PropTypes.number,
   description: PropTypes.string,
   isTrue: PropTypes.any,
   onChange: PropTypes.func,
   handleDeleteAnswer: PropTypes.func,
   drag: PropTypes.any,
   answersLength: PropTypes.number,
   checkedAnswers: PropTypes.array,
   handleDuplicateAnswer: PropTypes.func,
};

export default QuizAnswer;
