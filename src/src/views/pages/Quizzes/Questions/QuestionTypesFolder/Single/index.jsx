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


   const onChangeQuestion = (name, value, originalName, file) => {
      changeQuestion(name, value, originalName, file);
   };

   const onChangeAnswer = (name, value, slug) => {
      const newAnswers = [...question.answers];
      let changedAnswer = {};
      let unChangedAnswer = {};
      newAnswers.forEach(answer => {
         if (answer.slug === slug) {
            changedAnswer = answer;
         } else {
            unChangedAnswer = answer;
         }
      });
      changedAnswer[name] = value;
      if (name === 'is_true') {
         unChangedAnswer[name] = !value;
      }
      changeQuestionAnswer({
         ...question,
         answers: newAnswers,
      });
   };

   return (
      <div className='general__quiz__single'>
         {!isRight && (
            <div className='general__quiz__single__content'>
               {!!quiz.passing_grade_status && (
                  <div className='answer_required'>
                     <IconNew name='InfoWhiteS' />
                     <Text
                        inner='Required'
                        type={ types.regular148 }
                        size={ sizes.xsmall }
                        style={ { color: '#fff' } }
                     />
                  </div>
               )}
               <div className='general__quiz__single__content__wrapper'>
                  {!!question.image_status && (
                     <div>
                        <UploadMediaView
                           src={ question.image_src }
                           type='image'
                           buttonText='Image'
                           quizz={ true }
                           uploadProps={ {
                              fileLessonFormat: 'image',
                              isAmazonFile: true,
                              cropRatio: '1124x630',
                              onChange: (value, originalName, file) => onChangeQuestion('image_src', value, originalName, file),
                           } }
                        />
                     </div>
                  )}
                  <div>
                     <div className='question__content__title'>
                        <div className='question__content__number'>
                           <Text
                              inner={ index }
                              type={ types.regular148 }
                              size={ sizes.xsmall }
                           />
                           <IconNew name='ArrowRightS' />
                        </div>
                        <TextArea
                           title={ question.title || '' }
                           placeholder='Title'
                           name='title'
                           onInputChange={ onChangeQuestion }
                           style={ {
                              fontSize: '20px',
                              color: '#131F1E',
                              fontWeight: '700',
                              lineHeight: '160%',
                              height: '29px',
                              textAlign: 'left',
                           } }
                        />
                     </div>
                     {(!question.subtitle && isClosedInput) && (
                        <TextWithIcon
                           inner='Add Subtitle'
                           iconName='PlusSupportM'
                           type={ types.regularDefaultSmallX }
                           size={ sizes.small }
                           style={ { color: '#24554E' } }
                           onClick={ () => setIsClosedInput(false) }
                        />
                     )}
                     {(!isClosedInput || question.subtitle) && (
                        <div>
                           <TextArea
                              title={ question.subtitle || '' }
                              placeholder='Subtitle'
                              className='custom__textArea__theme'
                              name='subtitle'
                              onInputChange={ onChangeQuestion }
                              style={ {
                                 fontSize: '16px',
                                 color: '#131F1E',
                                 fontWeight: '400',
                                 lineHeight: '148%',
                                 height: '29px',
                              } }
                           />
                        </div>
                     )}
                     {!!question && !!question.answers && (
                        <Answers
                           isSingle={ true }
                           questionAnswers={ question.answers }
                           onChangeAnswer={ onChangeAnswer }
                           id={ question.slug }
                           handleElementOnDragEnd={ handleElementOnDragEnd }
                        />
                     )}
                  </div>
               </div>
            </div>
         )}
         {isRight
            && (
               <div className='general__quiz__single__contentRigth'>
                  <div>
                     <Text
                        inner='Settings'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </div>
                  <div className='general__quiz__single__contentRigth__img'>
                     <Switch
                        label='Required'
                        checked={ quiz.passing_grade_status ? true : !!question.required }
                        name='required'
                        goToSettings={ goToSettings }
                        space={ !quiz.passing_grade_status ? 'regular' : 'regularDisabled' }
                        onChange={ (name, value) => {
                           onChangeQuestion(name, value);
                        } }
                     />
                  </div>
                  <div className='grey__line' />
                  <div className='general__quiz__single__contentRigth__img'>
                     <Switch
                        label='Image'
                        checked={ !!question.image_status }
                        name='image_status'
                        space='space'
                        onChange={ (name, value) => {
                           onChangeQuestion(name, value);
                        } }
                     />
                  </div>
               </div>
            )
         }
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
