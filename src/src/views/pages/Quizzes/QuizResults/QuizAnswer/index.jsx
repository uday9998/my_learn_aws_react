/* eslint-disable no-nested-ternary */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import classnames from 'classnames';


const QuizAnswer = ({
   index, description, title,
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
      <div className='quizItem__answer__content'>
         <div>
            <Text
               inner={ title || 'Student Answer' }
               size={ sizes.xsmall }
               type={ types.regularDefaultGrey145 }
            />
         </div>
         <div
            className={ classnames('quizItem__answer', {
               'quizItem__answer__inActive': true,
            }) }
         >
            <div className='quizItem_number quizItem_number_filled'>
               <Text
                  inner={
                     generateAlphabets[index]
                  }
                  size={ sizes.small }
                  type={ types.regularDefault }
               />
            </div>
            <div className='quizItem_form'>
               <div>
                  <Text
                     inner={ description }
                     size={ sizes.small }
                     className='custom__textArea__theme__grey'
                     type={ types.regularDefault }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

QuizAnswer.propTypes = {
   index: PropTypes.number,
   description: PropTypes.string,
   title: PropTypes.string,
};

export default QuizAnswer;
