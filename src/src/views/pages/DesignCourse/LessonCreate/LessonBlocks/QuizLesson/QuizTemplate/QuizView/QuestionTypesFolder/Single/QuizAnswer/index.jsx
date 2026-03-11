import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import TextInput from 'components/elements/form/TextInput';
// import CheckBox from 'components/elements/form/CheckBox';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import TextArea from 'components/elements/form/CustomTextArea';
import IconNew from 'components/elements/iconsSize';
import classnames from 'classnames';


const QuizAnswer = ({
   index, description, isTrue, onChange, handleDeleteAnswer,
   drag,
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
         <div className='quizItem_number' role='presentation' onClick={ () => onChange('is_true', !isTrue) }>
            <Text
               inner={
                  generateAlphabets[index]
               }
               size={ sizes.small }
               type={ types.regularDefault }
               style={ isTrue ? { color: ' #fff' } : { color: ' #A1A5A5' } }
            />
         </div>
         <div className='quizItem_form'>
            <div className='quizItem_input'>
               <TextArea
                  title={ description }
                  placeholder='Choice'
                  className='custom__textArea__theme__grey'
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
               {/* <TextInput
                  placeholder='Type your answer choice'
                  id='quizAnswer'
                  label=''
                  name='description'
                  value={ description }
                  onChange={ onChange }
               /> */}
               {false && (
                  <div className='quizItem_delete' role='presentation' onClick={ handleDeleteAnswer }>
                     <IconNew name='CertificatesDeleteS' />
                  </div>
               )}

            </div>
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
   drag: PropTypes.any,
};

export default QuizAnswer;
