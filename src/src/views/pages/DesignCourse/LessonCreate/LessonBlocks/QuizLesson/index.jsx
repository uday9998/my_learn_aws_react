import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import {
   WelcomeScreen, Single, MultipleChoice, Ending, slug, multiAnswers, answers, slugAnswer, slugAnswerMulti,
} from 'utils/questions';
import { cloneDeep } from 'lodash';
import QuizTemplate from './QuizTemplate/QuizView';
import QuestionTypesViews from './QuizTemplate/QuizView/QuestionTypesViews';

const QuizLesson = ({
   block, onChange, deleteQuestion, changeQuestionAnswer, handleElementOnDragEnd, blockIndex,
   lessonActionInProgress, handleDeleteAnswer, setHasError, quizTemplatesDesc, quizTemplatesAsc,
   chooseSavedTemplate,
}) => {
   let questions = [];
   if (block.quizzes && block.quizzes[0] && block.quizzes[0].questions.length) {
      questions = block.quizzes[0].questions;
   }

   const chooseQuestionType = (questionType, questionIndex) => {
      let question = {};
      let newMultiAnswers = [];
      let newAnswers = [];
      switch (questionType) {
         case 'welcome_screen': question = WelcomeScreen;
            break;
         case 'multiple_choice':
            question = { ...MultipleChoice };
            newMultiAnswers = cloneDeep(multiAnswers);
            newMultiAnswers[0].slug = slugAnswerMulti(new Date().getTime() + 7);
            newMultiAnswers[1].slug = slugAnswerMulti(new Date().getTime() + 8);
            newMultiAnswers[2].slug = slugAnswerMulti(new Date().getTime() + 9);
            question.answers = [...newMultiAnswers];
            break;
         case 'yes_no':
            question = { ...Single };
            newAnswers = cloneDeep(answers);
            newAnswers[0].slug = slugAnswer(new Date().getTime() + 10);
            newAnswers[1].slug = slugAnswer(new Date().getTime() + 11);
            question.answers = [...newAnswers];
            break;
         case 'ending': question = { ...Ending };
            break;
         default:
      }
      question.slug = slug(new Date().getTime());
      onChange(questionType, question, true, '', 'Quiz', questionIndex, '', false, true);
   };

   const changeQuestion = (name, value, originalName, file, questionType, questionIndex, isSettings) => {
      onChange(name, value, true, { originalName, file }, 'Quiz', questionIndex, questionType, isSettings);
   };

   return (
      <div className='quizBlock'>
         {!questions.length
          && (
             <QuizTemplate
                chooseQuestionType={ chooseQuestionType }
                setHasError={ setHasError }
                quizTemplatesAsc={ quizTemplatesAsc }
                quizTemplatesDesc={ quizTemplatesDesc }
                chooseSavedTemplate={ chooseSavedTemplate }
             />
          )}
         {!!questions.length && (
            <QuestionTypesViews
               block={ block }
               quizQuestions={ questions }
               chooseQuestionType={ chooseQuestionType }
               changeQuestion={ changeQuestion }
               handleElementOnDragEnd={ handleElementOnDragEnd }
               deleteQuestion={ deleteQuestion }
               changeQuestionAnswer={ changeQuestionAnswer }
               hasEnding={ !!questions.filter(quest => quest.type === 'ending').length }
               blockIndex={ blockIndex }
               lessonActionInProgress={ lessonActionInProgress }
               setHasError={ setHasError }
               handleDeleteAnswer={
                  (questionId, answer, questionIndex) => handleDeleteAnswer(questionId, answer, questionIndex) }
            />
         ) }
      </div>
   );
};

QuizLesson.propTypes = {
   block: PropTypes.object,
   onChange: PropTypes.func,
   deleteQuestion: PropTypes.func,
   changeQuestionAnswer: PropTypes.func,
   handleElementOnDragEnd: PropTypes.func,
   blockIndex: PropTypes.number,
   lessonActionInProgress: PropTypes.bool,
   handleDeleteAnswer: PropTypes.func,
   setHasError: PropTypes.func,
   quizTemplatesAsc: PropTypes.array,
   quizTemplatesDesc: PropTypes.array,
   chooseSavedTemplate: PropTypes.func,
};

export default QuizLesson;
