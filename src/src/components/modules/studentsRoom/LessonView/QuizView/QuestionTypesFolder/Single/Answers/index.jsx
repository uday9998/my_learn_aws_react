import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


import QuizAnswer from '../QuizAnswer';
import './index.scss';

const Answers = ({
   questionAnswers, onChangeAnswer, id,
}) => {
   const answers = questionAnswers.sort((a, b) => {
      return a.order - b.order;
   });

   return (
      <div className='single_answers'>
         <div>
            {answers.map((answer, i) => {
               const key = i + 1;
               return (
                  <div
                     key={ answer.slug || key }
                     className='draggable_component single_answer'
                  >
                     <QuizAnswer
                        key={ answer.slug || key }
                        index={ i }
                        description={ answer.description }
                        isTrue={ answer.is_true_choice }
                        id={ answer.id }
                        questionId={ id }
                        onChange={ (value) => onChangeAnswer(id, answer.id, value) }

                     />
                  </div>

               );
            })}


         </div>
      </div>
   );
};

Answers.defaultProps = {
   onChangeAnswer: PropTypes,
};

Answers.propTypes = {
   questionAnswers: PropTypes.array,
   onChangeAnswer: PropTypes.func,
   id: PropTypes.string,
};

export default Answers;
