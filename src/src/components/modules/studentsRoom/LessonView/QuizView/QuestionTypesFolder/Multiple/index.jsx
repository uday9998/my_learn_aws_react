import React, { useState } from 'react';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/form/SwitchNew';
import Input from 'components/elements/inputNew';
import TextArea from 'components/elements/form/CustomTextArea';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import {
   slugAnswerMulti,
} from 'utils/questions';
import IconNew from 'components/elements/iconsSize';
import GeneratorModal from 'components/elements/GeneratorModal';
import Answers from './Answers';
import './index.scss';


const Multiple = ({
   question, changeQuestion, changeQuestionAnswer, handleDeleteAnswer, isRight, handleElementOnDragEnd,
   handleDuplicateAnswer, quiz, goToSettings, index,
}) => {
   const [isClosedInput, setIsClosedInput] = useState(true);

   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });

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

   const onChangeAnswer = (name, value, slug) => {
      const newAnswers = [...question.answers];
      let changedAnswer = {};
      let unChangedAnswer = {};
      newAnswers.forEach(answer => {
         if (name !== 'is_true' && answer.slug === slug) {
            changedAnswer = answer;
            changedAnswer[name] = value;
         } else if (name === 'is_true') {
            if (answer.slug === slug) {
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
      const newAnswer = {
         'description': 'Choice',
         'is_true': 0,
         'order': question.answers.length,
         slug: slugAnswerMulti(new Date().getTime() + 5345),
      };
      changeQuestionAnswer(question, newAnswer, true);
   };

   return (
      <div className='general__quiz__multiple'>
         <div className='general__quiz__multiple__content'>
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
            <div className='general__quiz__multiple__content__wrapper'>
               {!!question.image_status && (
                  <div>
                     <UploadMediaView
                        src={ question.image_src }
                        type='image'
                        buttonText='Image'
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
                           style={ { color: '#131f1e' } }
                        />
                        <IconNew name='ArrowRightS' />
                     </div>
                     <TextArea
                        title={ question.title || '' }
                        placeholder='Title'
                        name='title'
                        withIcon={ true }
                        iconName='Generator'
                        setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                        IToolTipTextNew='AI Generator'
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
                           withIcon={ true }
                           iconName='Generator'
                           setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                           IToolTipTextNew='AI Generator'
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
                        handleDeleteAnswer={ handleDeleteAnswer }
                        handleDuplicateAnswer={ handleDuplicateAnswer }
                        id={ question.slug }
                        checkedAnswers={ checkedAnswers }
                        handleElementOnDragEnd={ handleElementOnDragEnd }
                     />
                  )}

               </div>

            </div>
         </div>

      </div>
   );
};

Multiple.defultProps = {
   question: {},
   handleDeleteAnswer: () => {},
};

Multiple.propTypes = {
   question: PropTypes.object,
   changeQuestion: PropTypes.func,
   changeQuestionAnswer: PropTypes.func,
   handleDeleteAnswer: PropTypes.func,
   isRight: PropTypes.bool,
   handleElementOnDragEnd: PropTypes.func,
   handleDuplicateAnswer: PropTypes.func,
   quiz: PropTypes.object,
   goToSettings: PropTypes.func,
   index: PropTypes.number,
};

export default Multiple;
