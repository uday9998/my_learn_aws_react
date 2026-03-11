
import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Status from 'components/elements/statusNew';
import moment from 'moment';
import QuizAnswer from './QuizAnswer';
import './index.scss';


const QuizResults = ({
   quizResult,
}) => {
   const quiz = quizResult.data[0].quiz.quiz;
   const question = quizResult.data[0].quiz.quiz.questions[0];
   const quizResults = quizResult.data[0].quiz_result;
   const user = quizResult.data[0].quiz.user;
   const correctAnswersCount = quizResult.data[0].quiz.user_answers.filter(answ => answ.correct === true).length;
   const wrongAnswersCount = quizResult.data[0].quiz.user_answers.length - correctAnswersCount;
   const completedAt = quizResult.data[0].quiz.completed_at ? moment(quiz.completed_at).format('MMM DD, YYYY hh:mm A') : '-';

   const statusType = (status) => {
      let statusText = '';
      let type = '';
      switch (status) {
         case 0: statusText = 'Failed'; type = 'failed';
            break;
         case 1: statusText = 'Passed'; type = 'passed';
            break;
         default:
      }
      return { statusText, type };
   };
   return (
      <div className='quizResults'>
         <div className='quizResults__left'>
            {/* <div>
               <img src='dddd' alt='user_img' />
            </div>
            <div>
               <Text
                  inner='title'
                  txtTypes={ txttxtTypess.regularDefault }
                  size={ txtSizes.small }
               />
            </div>
            <div>
               <Text
                  inner='Description'
                  txtTypes={ txttxtTypess.regularDefault }
                  size={ txtSizes.small }
               />
            </div> */}
            <div className='user__quiz__welcome'>
               {question.type === 'welcome_screen' && !!question.image_status && question.image_src && <div><img src={ question.image_src } alt='user_img' /></div>}
               <div>
                  <Text
                     type={ txtTypes.bold }
                     inner={ quiz.name }
                     size={ txtSizes.large }
                  />
               </div>
               {quiz.description && (
                  <div>
                     <Text
                        type={ txtTypes.regularDefaultGrey145 }
                        inner={ quiz.description }
                        size={ txtSizes.medium }
                     />
                  </div>
               )}
               {!!quiz.passing_grade_status && (<div className='grey__line' />)}
               {!!quiz.passing_grade_status && (
                  <div className='passing__grade'>
                     <div>
                        <Text
                           type={ txtTypes.regularDefault }
                           inner='Passing Grade'
                           size={ txtSizes.medium }
                        />
                     </div>

                     <div>
                        <Text
                           type={ txtSizes.medium150 }
                           inner={ `${ quiz.passing_grade }%` }
                           size={ txtSizes.medium }
                           style={ { color: 'rgba(54, 121, 111, 1)' } }
                        />
                     </div>
                  </div>
               )}
            </div>
            <div className='quizResults__left__content'>
               <div>
                  <Text
                     type={ txtTypes.medium }
                     inner='Quiz Result'
                     size={ txtSizes.xxlarge }
                  />
               </div>
               {quizResults && !!quizResults.length && quizResults.map(((quiznew, i) => {
                  return (
                     <div key={ quiznew.question.id }>
                        <div className='quizResults__left__content__question'>
                           <div className='quizResults__left__content__number'>
                              <div style={ quiznew.status ? { backgroundColor: 'rgba(36, 85, 78, 1)' } : { backgroundColor: 'rgba(166, 28, 35, 1)' } }>
                                 <Text
                                    inner={ i + 1 }
                                    type={ txtTypes.medium150 }
                                    size={ txtSizes.xsmall }

                                 />
                              </div>
                           </div>
                           <div className='quizResults__left__content__answers'>
                              <div>
                                 <Text
                                    inner={ quiznew.question.title }
                                    type={ txtTypes.regularDefault }
                                    size={ txtSizes.small }
                                 />
                              </div>
                              {quiznew.user_answers && quiznew.user_answers.map((userAnswers) => {
                                 return (
                                    <QuizAnswer
                                       key={ userAnswers.id }
                                       index={ userAnswers.order }
                                       title='Student Answer'
                                       description={ userAnswers.description }
                                    />
                                 );
                              })}
                              { !quiznew.status && quiznew.correct_answers && quiznew.correct_answers.map((correctAnswers) => {
                                 return (
                                    <QuizAnswer
                                       key={ correctAnswers.id }
                                       index={ correctAnswers.order }
                                       description={ correctAnswers.description }
                                       title='Correct Answer'
                                    />
                                 );
                              })}

                           </div>
                        </div>
                     </div>
                  );
               })) }


            </div>
         </div>
         <div className='quizResults__right'>
            <div className='quizResults__right__user'>
               <div>
                  <img src={ user.picture_full_src } alt='user_img' />
               </div>
               <div>
                  <div>
                     <Text
                        inner={ user.name }
                        type={ txtTypes.regular148 }
                        size={ txtSizes.medium }
                     />
                  </div>
                  <div>
                     <Text
                        inner={ user.email }
                        type={ txtTypes.regularDefaultGrey145 }
                        size={ txtSizes.medium }
                     />
                  </div>
               </div>
            </div>
            <div className='quizResults__right__square'>
               <div>
                  <div>
                     <Text
                        inner='Questions'
                        type={ txtTypes.regular148 }
                        size={ txtSizes.xsmall }
                        style={ { color: 'rgba(68, 76, 75, 1)' } }
                     />
                  </div>
                  <div>
                     <Text
                        inner={ quiz.questions.filter(quest => quest.type !== 'welcome_screen' && quest.type !== 'ending').length }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge }
                        style={ { color: 'rgba(68, 76, 75, 1)' } }
                     />
                  </div>
               </div>
               <div>
                  <div>
                     <Text
                        inner='Status'
                        type={ txtTypes.regular148 }
                        size={ txtSizes.xsmall }
                        style={ { color: 'rgba(68, 76, 75, 1)' } }
                     />
                  </div>
                  <div>
                     <Status
                        text={ statusType(quizResult.data[0].quiz.status).statusText }
                        type={ statusType(quizResult.data[0].quiz.status).type }
                     />
                  </div>
               </div>
               <div>
                  <div>
                     <Text
                        inner='Results'
                        type={ txtTypes.regular148 }
                        size={ txtSizes.xsmall }
                        style={ { color: 'rgba(68, 76, 75, 1)' } }
                     />
                  </div>
                  <div>
                     <Text
                        inner={ `${ quizResult.data[0].quiz.percantage }%` }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge }
                        style={ { color: 'rgba(68, 76, 75, 1)' } }
                     />
                  </div>
               </div>
            </div>
            <div className='grey_line' />
            <div className='quizResults__right__answers'>
               <div>
                  <div>
                     <Text
                        inner='Correct answers'
                        type={ txtTypes.regular148 }
                        size={ txtSizes.medium }
                     />
                  </div>
                  <div className='quizResults__right__answers__correct'>
                     <Text
                        inner={ correctAnswersCount }
                        type={ txtTypes.regular148 }
                        size={ txtSizes.small }
                        style={ { color: 'rgba(36, 85, 78, 1)' } }
                     />
                  </div>
               </div>
               <div className='line' />
               <div>
                  <div>
                     <Text
                        inner='Wrong answers'
                        type={ txtTypes.regular148 }
                        size={ txtSizes.medium }
                     />
                  </div>
                  <div className='quizResults__right__answers__wrong'>
                     <Text
                        inner={ wrongAnswersCount }
                        type={ txtTypes.regular148 }
                        size={ txtSizes.small }
                        style={ { color: 'rgba(209, 45, 54, 1)' } }
                     />
                  </div>
               </div>
            </div>
            <div className='grey_line' />
            <div className='quizResults__right__answers__completed'>
               <div>
                  <Text
                     inner='Quiz was completed at:'
                     type={ txtTypes.regular148 }
                     size={ txtSizes.medium }
                  />
               </div>
               <div>
                  <Text
                     inner={ completedAt }
                     type={ txtTypes.regularDefaultGrey145 }
                     size={ txtSizes.medium }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

QuizResults.defaultProps = {
   quizResult: {},
};

QuizResults.propTypes = {
   quizResult: PropTypes.object,
};

export default QuizResults;
