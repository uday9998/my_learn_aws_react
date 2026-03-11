import React, { useState } from 'react';
// import IconNew from 'components/elements/iconsSize';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/form/SwitchNew';
import TextArea from 'components/elements/form/CustomTextArea';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import IconNew from 'components/elements/iconsSize';

import PropTypes from 'prop-types';
import Answers from './Answers';
import './index.scss';


const Single = ({
   question, changeQuestion, changeQuestionAnswer, isRight, handleElementOnDragEnd,
   quiz, goToSettings, index,
}) => {
   const [isClosedInput, setIsClosedInput] = useState(true);
   const [currentQuestion, setCurrentQuestion] = useState(question);

   const onChangeQuestion = (name, value, originalName, file) => {
      changeQuestion(name, value, originalName, file);
   };

   const onChangeAnswer = (questionId, answerId, value) => {
      const newAnswers = [...question.answers];
      let changedAnswer = {};
      let unChangedAnswer = {};
      newAnswers.forEach(answer => {
         if (answer.id === answerId) {
            changedAnswer = answer;
         } else {
            unChangedAnswer = answer;
         }
      });
      changedAnswer.is_true_choice = value;
      setCurrentQuestion({
         ...currentQuestion,
         answers: newAnswers,
      });
      // if (question.type === 'yes_no') {
      //    unChangedAnswer.is_true_choice = !value;
      // }
      setCurrentQuestion({
         ...currentQuestion,
         answers: newAnswers,
      });
   };


   return (
      <div className='lesson__quiz__single'>
         <div className='lesson__quiz__single__content'>
            {/* {!!quiz.passing_grade_status && (
               <div className='answer_required'>
                  <IconNew name='InfoWhiteS' />
                  <Text
                     inner='Required'
                     type={ types.regular148 }
                     size={ sizes.xsmall }
                     style={ { color: '#fff' } }
                  />
               </div>
            )} */}
            <div className='lesson__quiz__single__content__wrapper'>
               {!!question.image_status && question.image_src && <div><img src={ question.image_src } alt='welcome_img' /></div>}
               <div>
                  <div className='question__content__title'>
                     <div className='question__content__number'>
                        <Text
                           inner={ index }
                           type={ types.regular148 }
                           size={ sizes.xsmall }
                           style={ { color: '#131F1E' } }
                        />
                        <IconNew name='ArrowRightS' />
                     </div>
                     <div>
                        <Text
                           type={ types.medium160 }
                           inner={ question.title }
                           size={ sizes.xlarge }
                           style={ { color: '#131F1E' } }
                        />
                     </div>
                     {question.subtitle && (
                        <div>
                           <Text
                              type={ types.regularDefaultGrey145 }
                              inner={ question.subtitle }
                              size={ sizes.medium }
                              style={ { color: '#727978' } }
                           />
                        </div>
                     )}
                  </div>
                  {!!question && !!question.answers && (
                     <Answers
                        isSingle={ true }
                        questionAnswers={ question.answers }
                        onChangeAnswer={ onChangeAnswer }
                        id={ question.id }
                        handleElementOnDragEnd={ handleElementOnDragEnd }
                     />
                  )}
               </div>
            </div>
         </div>


      </div>
   );
};

Single.propTypes = {
   question: PropTypes.object,
   changeQuestion: PropTypes.func,
   changeQuestionAnswer: PropTypes.func,
   isRight: PropTypes.bool,
   handleElementOnDragEnd: PropTypes.func,
   quiz: PropTypes.object,
   goToSettings: PropTypes.func,
   index: PropTypes.number,
};

export default Single;
