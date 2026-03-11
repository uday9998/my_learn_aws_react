import React, { useState } from 'react';
import IconNew from 'components/elements/iconsSize';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/form/SwitchNew';
import Input from 'components/elements/inputNew';
import TextArea from 'components/elements/form/CustomTextArea';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import { slug } from 'views/pages/DesignCourse/LessonCreate/BlockComponent';
import Answers from './Answers';
import './index.scss';


const Multiple = ({
   question, changeQuestion, changeQuestionAnswer, handleDeleteAnswer,
}) => {
   const [isClosedInput, setIsClosedInput] = useState(true);
   const checkedAnswers = question && question.answers && !!question.answers.length && question.answers.filter(
      answer => (answer.is_true === 1 || answer.is_true === true));
   const onChangeQuestion = (name, value, originalName, file) => {
      if (originalName) {
         changeQuestion(name, value, originalName, file);
      } else if (name === 'multiple_status') {
         if (!value) {
            if (checkedAnswers.length !== 1) {
               if (isPrint('Checked answers count must be 1')) {
                  toast.error('Checked answers count must be 1');
               }
            } else {
               changeQuestion(name, value, originalName, file);
            }
         } else {
            changeQuestion(name, value, originalName, file);
         }
      } else {
         changeQuestion(name, value, originalName, file);
      }
      // if (name === 'multiple_value') {
      //    if (value !== checkedAnswers.length) {
      //       setHasError({ questionId: question.id, hasError: true });
      //    } else {
      //       setHasError({ questionId: question.id, hasError: false });
      //    }
      // }
   };

   const onChangeAnswer = (name, value, answerSlug) => {
      const newAnswers = [...question.answers];
      let changedAnswer = {};
      let unChangedAnswer = {};
      newAnswers.forEach(answer => {
         if (name !== 'is_true' && answer.slug === answerSlug) {
            changedAnswer = answer;
            changedAnswer[name] = value;
         } else if (name === 'is_true') {
            if (answer.slug === answerSlug) {
               changedAnswer = answer;
               if (checkedAnswers.length < 2 && !value) {
                  if (isPrint('One checked answer is required')) {
                     toast.error('One checked answer is required');
                  }
               } else {
                  changedAnswer[name] = value;
               }
            } else {
               unChangedAnswer = answer;
               if (!question.multiple_status && value) {
                  unChangedAnswer[name] = !value;
               }
            }
         }
      });
      changeQuestionAnswer({
         ...question,
         answers: newAnswers,
      });
   };


   const addChoice = () => {
      const newAnswers = [...question.answers];
      const newAnswer = {
         'description': 'Choice',
         'is_true': 0,
         'order': question.answers.length,
         slug: slug(),
      };
      newAnswers.push(newAnswer);
      changeQuestionAnswer({
         question,
         newAnswer,
      }, true);
   };

   return (
      <div className='quiz__multiple'>
         <div className='quiz__multiple__header'>
            <div className='quiz__multiple__title'>
               <div className='quiz__multiple__title__left'>
                  <div><IconNew name='MultiQuizM' /></div>
                  <div>
                     <Text
                        type={ types.regularDefault }
                        size={ sizes.small }
                        inner='Multiple Choice'
                     />
                  </div>
               </div>
               <div className='quiz__multiple__title__right'>
                  <IconNew name='SelectButtonPersonalL' />
               </div>
            </div>
         </div>
         <div className='quiz__multiple__content'>
            <div className='quiz__multiple__content__img'>
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
            {!!question.image_status && (
               <div>
                  <UploadMediaView
                     src={ question.image_src }
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
            <div className='quiz__multiple__content__img'>
               <Switch
                  label='Required'
                  checked={ !!question.required }
                  name='required'
                  space='space'
                  onChange={ (name, value) => {
                     onChangeQuestion(name, value);
                  } }
               />
            </div>
            <div className='quiz__multiple__content__img'>
               <Switch
                  label='Multiple selection'
                  checked={ !!question.multiple_status }
                  name='multiple_status'
                  space='space'
                  onChange={ (name, value) => {
                     onChangeQuestion(name, value);
                  } }
               />
            </div>
            {!!question.multiple_status && (
               <div>
                  <Input
                     helpText=''
                     value={ question.multiple_value }
                     onChange={ (name, value) => {
                        const re = /^[0-9\b]+$/;
                        if ((value === '' || re.test(value)) && value < 11) {
                           onChangeQuestion(name, value);
                        }
                     } }
                     name='multiple_value'
                     type='text'
                     label='Number of correct answers'
                  />
               </div>
            )}

            <div>
               <div>
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
                     questionAnswers={ question.answers }
                     onChangeAnswer={ onChangeAnswer }
                     addChoice={ addChoice }
                     handleDeleteAnswer={ (answer) => handleDeleteAnswer(question.id, answer) }
                     id={ question.slug }
                     checkedAnswers={ checkedAnswers }
                  />
               )}

            </div>

         </div>
      </div>
   );
};

Multiple.propTypes = {
   question: PropTypes.object,
   changeQuestion: PropTypes.func,
   changeQuestionAnswer: PropTypes.func,
   handleDeleteAnswer: PropTypes.func,
   // setHasError: PropTypes.func,
};

export default Multiple;
