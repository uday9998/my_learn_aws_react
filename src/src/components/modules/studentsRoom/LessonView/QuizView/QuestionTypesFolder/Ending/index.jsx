import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import IconNew from 'components/elements/iconsSize';
import './index.scss';


const Ending = ({
   question, quiz, yourResult, loading,
}) => {
   let passingGrade = quiz.passing_grade;
   if (!quiz.passing_grade_status) {
      passingGrade = 100;
   }

   let currentResult = {
      user_answers: [],
   };
   if (yourResult) {
      currentResult = yourResult;
   } else if (quiz.last_user_quiz) {
      currentResult = quiz.last_user_quiz;
   }

   return (
      <div className='lesson__quiz__ending'>
         {!!loading && <LoaderSpinner width={ 150 } heigth={ 150 } />}
         <div className='lesson__quiz__ending__content'>
            <div className='lesson__quiz__ending__content__box'>
               <div className='lesson__quiz__ending__content__box__wrapper'>
                  {!!question.image_status && question.image_src && <div><img src={ question.image_src } alt='welcome_img' /></div>}
                  {!!question.image_status && question.image_src && <div className='grey__line' />}
                  <div>
                     {!!quiz.passing_grade_status && quiz.passing_grade > currentResult.percantage
                     && question.fail_message && (
                        <div>
                           <Text
                              type={ types.regularDefault }
                              inner={ question.fail_message }
                              size={ sizes.medium }
                              style={ { color: '#131F1E' } }
                           />
                        </div>
                     )}
                     {!!quiz.passing_grade_status && quiz.passing_grade <= currentResult.percantage
                     && question.passed_message && (
                        <div>
                           <Text
                              type={ types.regularDefault }
                              inner={ question.passed_message }
                              size={ sizes.medium }
                              style={ { color: '#131F1E' } }
                           />
                        </div>
                     )}
                     {/* <div>
                        <Text
                           type={ types.medium160 }
                           inner={ question.passed_message }
                           size={ sizes.xlarge }
                        />
                     </div> */}
                  </div>
                  <div className='grey__line' />
                  {!!quiz.passing_grade_status && (
                     <div>
                        <div>
                           <Text
                              type={ types.regularDefaultGrey145 }
                              inner='Passing Grade'
                              size={ sizes.medium }
                              style={ { color: '#727978' } }
                           />
                        </div>

                        <div>
                           <Text
                              type={ types.regularDefaultGrey145 }
                              inner={ `${ quiz.passing_grade }%` }
                              size={ sizes.medium }
                              style={ { color: '#727978' } }
                           />
                        </div>
                     </div>
                  )}
                  <div>
                     <div>
                        <Text
                           type={ types.regularDefault }
                           inner='Your Result'
                           size={ sizes.medium }
                           style={ { color: '#131F1E' } }
                        />
                     </div>

                     {!loading && (
                        <div>
                           <Text
                              type={ types.medium150 }
                              inner={ `${ currentResult.percantage }%` }
                              size={ sizes.medium }
                              style={ passingGrade <= currentResult.percantage ? { color: 'var(--activeColor)' } : { color: 'rgba(209, 45, 54, 1)' } }
                           />
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <div className='quiz_result'>
               {currentResult && !!currentResult.user_answers && !!currentResult.user_answers.length
               && currentResult.user_answers.map((userAnswer) => {
                  if (userAnswer.correct) {
                     return (
                        <div key={ userAnswer.id }>
                           <div>
                              <Text
                                 type={ types.medium150 }
                                 inner={ quiz.questions.findIndex((questionn) => {
                                    return questionn.id === userAnswer.question_id;
                                 }) }
                                 size={ sizes.xlarge }
                                 style={ { color: '#24554E' } }
                              />
                           </div>
                           <div> <IconNew name='RightAnswerL' /></div>
                        </div>
                     );
                  }
                  return null;
               })}

            </div>
         </div>
      </div>
   );
};

Ending.propTypes = {
   question: PropTypes.object,
   quiz: PropTypes.object,
   yourResult: PropTypes.any,
   loading: PropTypes.bool,
};


export default Ending;
