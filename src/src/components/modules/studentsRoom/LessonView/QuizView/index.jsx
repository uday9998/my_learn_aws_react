/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import './index.scss';
import Text, { SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
// import Icon from 'components/elements/Icon';
// import classnames from 'classnames';
import finish from 'assets/images/studentsRoom/finish.png';
import start from 'assets/images/studentsRoom/wave.png';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   usersAnswersQuiz,
} from 'api/AuthApi';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import Ending from './QuestionTypesFolder/Ending';
import Single from './QuestionTypesFolder/Single';
import Welcome from './QuestionTypesFolder/Welcome';

const QuizView = ({
   questionsUnorder, quiz,
   course, lesson,
}) => {
   const questions = questionsUnorder.sort((a, b) => {
      return a.order - b.order;
   });
   const [activeCurrentQuestion, setActiveCureentQuestion] = useState(quiz.last_user_quiz ? (questions[questions.length - 1].type === 'ending' ? questions.length - 1 : questions.length) : (questions[0].id ? 0 : 1));
   const [yourResult, setYourResult] = useState(0);

   const [usersAnswersQuizFunc, { loading }] = useSubmitForm(usersAnswersQuiz);

   const onFinish = () => {
      if (quiz.passing_grade_status || !!questions[activeCurrentQuestion].required) {
         if (questions[activeCurrentQuestion].answers.filter(answ => answ.is_true_choice === true).length) {
            setActiveCureentQuestion(activeCurrentQuestion + 1);
            const user_answers = [];
            questions.forEach(questionSingle => {
               const answer_ids = [];
               if (questionSingle && questionSingle.answers) {
                  questionSingle.answers.forEach(answ => {
                     if (answ.is_true_choice === true) {
                        answer_ids.push(answ.id);
                     }
                  });
               }
               // && answer_ids.length !== 0
               if (questionSingle.type !== 'welcome_screen' && questionSingle.type !== 'ending' && !!questionSingle.id) {
                  user_answers.push({
                     question_id: questionSingle.id,
                     answer_ids,
                  });
               }
            });
            usersAnswersQuizFunc({
               courseId: course && course.id,
               lessonId: lesson && lesson.id,
               answers: {
                  quiz_id: quiz.id,
                  user_answers,
               },
            }, (res) => {
               setYourResult(res);
            });
         } else if (isPrint('Answer is required')) {
            toast.error('Answer is required');
         }
      } else {
         setActiveCureentQuestion(activeCurrentQuestion + 1);
         const user_answers = [];
         questions.forEach(questionSingle => {
            const answer_ids = [];
            if (questionSingle && questionSingle.answers) {
               questionSingle.answers.forEach(answ => {
                  if (answ.is_true_choice === true) {
                     answer_ids.push(answ.id);
                  }
               });
            }
            // && answer_ids.length !== 0
            if (questionSingle.type !== 'welcome_screen' && questionSingle.type !== 'ending' && !!questionSingle.id) {
               user_answers.push({
                  question_id: questionSingle.id,
                  answer_ids,
               });
            }
         });
         usersAnswersQuizFunc({
            courseId: course && course.id,
            lessonId: lesson && lesson.id,
            answers: {
               quiz_id: quiz.id,
               user_answers,
            },
         }, (res) => {
            setYourResult(res);
         });
      }
   };

   const onNext = (value) => {
      if (quiz.passing_grade_status || !!questions[value - 1].required) {
         if (questions[value - 1].answers.filter(answ => answ.is_true_choice === true).length) {
            setActiveCureentQuestion(value);
         } else if (isPrint('Answer is required')) {
            toast.error('Answer is required');
         }
      } else {
         setActiveCureentQuestion(value);
      }
   };

   const questionContentFunc = (question, index) => {
      const questionType = question.type;
      let questionSingleContent = '';
      switch (questionType) {
         case 'welcome_screen': questionSingleContent = (
            <Welcome
               question={ question }
               quiz={ quiz }
               isRight={ true }
               key={ question.id }
            />
         );
            break;
         case 'multiple_choice':
            questionSingleContent = (
               <Single
                  question={ question }
                  index={ index }
                  quiz={ quiz }
                  course={ course }
                  lesson={ lesson }
                  key={ question.id }
               />
            );
            break;
         case 'yes_no':
            questionSingleContent = (
               <Single
                  question={ question }
                  index={ index }
                  isRight={ true }
                  quiz={ quiz }
                  key={ question.id }
               />
            );
            break;
         case 'ending': questionSingleContent = (
            <Ending
               question={ question }
               quiz={ quiz }
               yourResult={ yourResult }
               loading={ loading }
               key={ question.id }
            />
         );
            break;
         default:
      }
      return questionSingleContent;
   };
   return (
      <div className='LessonQuiz'>
         <div className='LessonQuiz__numbers'>
            {questions.map((question, i) => {
               if (!question.id) {
                  return null;
               }
               return (
                  <div
                     key={ question.id }
                     // onClick={ question.type !== 'ending' ? () => setActiveCureentQuestion(i) : () => {} }
                     role='presentation'
                  >
                     <div className={ i !== activeCurrentQuestion ? 'LessonQuiz__numbers__single' : 'LessonQuiz__numbers__single__active' }>
                        {question.type === 'welcome_screen'
                     && <img src={ start } alt='start' />
                        }
                        {!(question.type === 'ending' || question.type === 'welcome_screen') && (
                           <Text
                              type={ textType.mediumLargeGrey }
                              inner={ i }
                              size={ textSize.small }
                              style={ { color: '#131F1E' } }
                           />
                        )}
                        {(question.type === 'ending')
                     && <img src={ finish } alt='finish' />
                        }
                     </div>
                     <div className={ i !== activeCurrentQuestion ? '' : 'LessonQuiz__numbers__point' } />
                     {i < activeCurrentQuestion && <div className='LessonQuiz__numbers__check'><IconNew name='CheckPurpleS' /></div>}
                  </div>
               );
            })}
            {questions[questions.length - 1] && questions[questions.length - 1].type !== 'ending'
                     && (
                        <div>
                           <div className={ questions.length !== activeCurrentQuestion ? 'LessonQuiz__numbers__single' : 'LessonQuiz__numbers__single__active' }>
                              <img src={ finish } alt='finish' />
                           </div>
                           <div className={ questions.length !== activeCurrentQuestion ? '' : 'LessonQuiz__numbers__point' } />
                        </div>
                     )
            }

         </div>
         <div className='LessonQuiz__content'>
            {questions.map((question, i) => {
               if (activeCurrentQuestion === i && question.id) {
                  return (
                     questionContentFunc(question, i)
                  );
               }
               return null;
            })}
            {activeCurrentQuestion === questions.length && questions[questions.length - 1] && questions[questions.length - 1].type !== 'ending' && questionContentFunc({ type: 'ending' })}
         </div>

         { !(questions[0].type === 'welcome_screen' && activeCurrentQuestion === 0) && !((questions[questions.length - 1].type !== 'ending'
             && activeCurrentQuestion === questions.length) || (
            (questions[questions.length - 1].type === 'ending'
               && activeCurrentQuestion === questions.length - 1)
         ))
             && (
                <div className='LessonQuiz__btn'>
                   <div>
                      <BaseButton
                         size={ btnSize.largeDefault }
                         text='Back'
                         theme={ btnTheme.lightPurple }
                         disabled={ activeCurrentQuestion === 0 }
                         onClick={ () => setActiveCureentQuestion(activeCurrentQuestion - 1) }
                         style={ { background: 'var(--secondaryButtonBgcolor)', borderColor: 'var(--buttonBgcolor)', color: 'var(--secondaryTextColor)' } }
                      />
                   </div>
                   <div>
                      <BaseButton
                         size={ btnSize.largeDefault }
                         text='Next'
                         theme={ btnTheme.purple }
                         disabled={ questions[questions.length - 1].type !== 'ending' ? activeCurrentQuestion === questions.length : activeCurrentQuestion === questions.length - 1 }
                         onClick={
                            ((questions[questions.length - 1].type !== 'ending'
             && activeCurrentQuestion === questions.length - 1) || (
                               (questions[questions.length - 1].type === 'ending'
               && activeCurrentQuestion === questions.length - 2)
                            )) ? () => onFinish()
                               : () => onNext(activeCurrentQuestion + 1) }
                         style={ { background: 'var(--buttonBgcolor)', borderColor: 'var(--buttonBgcolor)', color: 'var(--textColor)' } }
                      />
                   </div>
                </div>
             )}


         { ((questions[questions.length - 1].type !== 'ending'
             && activeCurrentQuestion === questions.length) || (
            (questions[questions.length - 1].type === 'ending'
               && activeCurrentQuestion === questions.length - 1)
         ))
             && (
                <div className='LessonQuiz__btn__result'>
                   <BaseButton
                      size={ btnSize.largeDefault }
                      text='Take Quiz Again'
                      theme={ btnTheme.purple }
                      onClick={ () => setActiveCureentQuestion(questions[0].id ? 0 : 1) }
                      style={ { background: 'var(--buttonBgcolor)', borderColor: 'var(--buttonBgcolor)', color: 'var(--textColor)' } }
                   />
                </div>
             )
         }


         { questions[0].type === 'welcome_screen' && activeCurrentQuestion === 0
                && (
                   <div className='LessonQuiz__btn__result'>
                      <BaseButton
                         size={ btnSize.largeDefault }
                         text='Start Quiz'
                         theme={ btnTheme.purple }
                         onClick={ () => setActiveCureentQuestion(1) }
                         style={ { background: 'var(--buttonBgcolor)', borderColor: 'var(--buttonBgcolor)', color: 'var(--textColor)' } }
                      />
                   </div>
                )
         }

      </div>
   );
};
QuizView.propTypes = {
   course: PropTypes.object,
   lesson: PropTypes.object,
   quiz: PropTypes.object,
   questionsUnorder: PropTypes.array,
};


export default QuizView;
