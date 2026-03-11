import React, { useState } from 'react';
import IconNew from 'components/elements/iconsSize';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/form/SwitchNew';
import TextArea from 'components/elements/form/CustomTextArea';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import PropTypes from 'prop-types';
import Answers from './Answers';
import './index.scss';


const Single = ({
   question, changeQuestion, changeQuestionAnswer, blockIndex,
}) => {
   const [isClosedInput, setIsClosedInput] = useState(true);
   const [newQuestion, setNewQuestion] = useState(question);

   const onChangeQuestion = (name, value, originalName, file) => {
      if (originalName) {
         setNewQuestion({
            ...newQuestion, [name]: value, original_name: originalName, file,
         });
      } else {
         setNewQuestion({ ...newQuestion, [name]: value });
      }
      changeQuestion(name, value, originalName, file);
   };

   const onChangeAnswer = (name, value, slug) => {
      const newAnswers = [...newQuestion.answers];
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
      setNewQuestion({
         ...newQuestion,
         answers: newAnswers,
      });
      changeQuestionAnswer({
         ...newQuestion,
         answers: newAnswers,
      });
   };

   return (
      <div className='quiz__single'>
         <div className='quiz__single__header'>
            <div className='quiz__single__title'>
               <div className='quiz__single__title__left'>
                  <div><IconNew name='YesNoQuizM' /></div>
                  <div>
                     <Text
                        type={ types.regularDefault }
                        size={ sizes.small }
                        inner='Yes/No'
                     />
                  </div>
               </div>
               <div className='quiz__single__title__right'>
                  <IconNew name='SelectButtonPersonalL' />
               </div>
            </div>
         </div>
         <div className='quiz__single__content'>
            <div className='quiz__single__content__img'>
               <Switch
                  label='Image'
                  checked={ !!newQuestion.image_status }
                  name='image_status'
                  space='space'
                  onChange={ (name, value) => {
                     onChangeQuestion(name, value);
                  } }
               />
            </div>
            {!!newQuestion.image_status && (
               <div>
                  <UploadMediaView
                     src={ newQuestion.image_src }
                     type='image'
                     buttonText='Image'
                     uploadProps={ {
                        fileLessonFormat: 'image',
                        isAmazonFile: true,
                        cropRatio: '490x226',
                        onChange: (value, originalName, file) => onChangeQuestion('image_src', value, originalName, file),
                     } }
                  />
               </div>
            )}
            <div className='quiz__single__content__img'>
               <Switch
                  label='Required'
                  checked={ !!newQuestion.required }
                  name='required'
                  space='space'
                  onChange={ (name, value) => {
                     onChangeQuestion(name, value);
                  } }

               />
            </div>
            <div>
               <div>
                  <TextArea
                     title={ newQuestion.title || '' }
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
               {(!newQuestion.subtitle && isClosedInput) && (
                  <TextWithIcon
                     inner='Add Subtitle'
                     iconName='PlusSupportM'
                     type={ types.regularDefaultSmallX }
                     size={ sizes.small }
                     style={ { color: '#24554E' } }
                     onClick={ () => setIsClosedInput(false) }
                  />
               )}
               {(!isClosedInput || newQuestion.subtitle) && (
                  <div>
                     <TextArea
                        title={ newQuestion.subtitle || '' }
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
                     blockIndex={ blockIndex }
                     id={ question.slug }
                  />
               )}
            </div>

         </div>
      </div>
   );
};

Single.propTypes = {
   question: PropTypes.object,
   changeQuestion: PropTypes.func,
   changeQuestionAnswer: PropTypes.func,
   blockIndex: PropTypes.number,
};

export default Single;
