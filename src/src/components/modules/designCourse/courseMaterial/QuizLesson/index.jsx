import React, { useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import CreateOrEditQuiz from 'components/elements/designCourse/courseMaterial/CreateOrEditQuiz';
import ShowQuiz from 'components/elements/designCourse/courseMaterial/ShowQuiz';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';

const QuizLesson = ({
   title, questions, addQuestion, updateQuestion, deleteQuestion, isQuestionSaved, addQuestionAction, setActiveName,
   handleSave,
}) => {
   const [quizTitle, setQuizTitle] = useState(title);
   const [newQuestion, setNewQuestion] = useState('');
   const [editableId, setEditableId] = useState(null);
   const [newAnswers, setNewAnswers] = useState([
      {
         id: 1,
         description: '',
         is_true: 0,
      },
      {
         id: 2,
         description: '',
         is_true: 0,
      },
   ]);
   const [charectersLimit, setCharectersLimit] = useState(10);

   const getCharectersLength = (l) => setCharectersLimit(l);

   const resetState = () => {
      addQuestionAction(false);
      setNewQuestion('');
      setNewAnswers([
         {
            id: 1,
            description: '',
            is_true: 0,
         },
         {
            id: 2,
            description: '',
            is_true: 0,
         },
      ]);
      setEditableId(null);
   };

   useEffect(() => {
      setQuizTitle(title);
      setActiveName(title);
      return () => {
         resetState();
      };
   }, [title]);


   const handleSwitchToEdit = (question) => {
      setEditableId(question.id);
      setNewQuestion(question.description);
      setNewAnswers(question.answers);
   };

   const handleOnCancel = () => {
      resetState();
   };

   const handleOnUpdate = () => {
      const orderedData = [...newAnswers].map(item => {
         return item.id;
      });
      const notEmptyAnswers = newAnswers.filter(newAnswer => (newAnswer.description !== ''));
      const params = {
         question: newQuestion,
         answer: notEmptyAnswers.reduce((obj, answer) => {
            return {
               ...obj,
               [answer.id]: answer.description,
            };
         }, {}),
         order: orderedData,
         answer_check: notEmptyAnswers.reduce((obj, answer) => {
            return {
               ...obj,
               [answer.id]: Number(answer.is_true),
            };
         }, {}),
      };

      if (Object.keys(params.answer).length < 2) {
         if (isPrint('Question should have at least two answers.')) {
            toast.error('Question should have at least two answers.');
         }
      } else if (!Object.values(params.answer_check).includes(1)) {
         if (isPrint('Please check at least one correct answer.')) {
            toast.error('Please check at least one correct answer.');
         }
      } else {
         updateQuestion(editableId, params);
         resetState();
      }
   };

   const maxId = () => {
      let max = newAnswers[0].id;
      for (let i = 1; i < newAnswers.length; ++i) {
         if (newAnswers[i].id > max) {
            max = newAnswers[i].id;
         }
      }
      return max;
   };

   return (
      <ItemWrapper>
         <div className='quizLesson'>
            <div className='quizLesson__fields'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ quizTitle }
                  style={ { marginBottom: '36px' } }
               />
               <TextInput
                  placeholder='Quiz Title'
                  label='Name of Your Quiz'
                  rightLabel={ `${ charectersLimit }/150` }
                  id='quizTitle'
                  name='quizTitle'
                  value={ quizTitle || '' }
                  onChange={ (name, value) => {
                     if (value.length <= 150) {
                        setQuizTitle(value);
                        setActiveName(value);
                        getCharectersLength(value.length);
                     } else if (isPrint('You have reached the character limitation')) {
                        toast.error('You have reached the character limitation');
                     }
                  } }
               />
               {
                  !!Array.isArray(questions) && questions && questions.map((question, id) => (
                     <div className='m-t-exl quizLesson__question' key={ question.id }>
                        {
                           editableId === question.id ? (
                              <CreateOrEditQuiz
                                 mode='edit'
                                 number={ id + 1 }
                                 question={ newQuestion }
                                 answers={ newAnswers }
                                 onChangeQuestion={ (value) => setNewQuestion(value) }
                                 handleDeleteAnswer={
                                    (index) => {
                                       if (newAnswers.length <= 2) {
                                          if (isPrint('Question should have at least two answers.')) {
                                             toast.error('Question should have at least two answers.');
                                          }
                                       } else {
                                          newAnswers.splice(index, 1);
                                          setNewAnswers([...newAnswers]);
                                       }
                                    }
                                 }
                                 onChangeAnswer={
                                    (index, name, value) => {
                                       const copyNewAnswer = newAnswers.map((answer, i) => (
                                          i === index ? { ...answer, [name]: value } : answer
                                       ));
                                       setNewAnswers(copyNewAnswer);
                                    }
                                 }
                                 addAnswer={ () => setNewAnswers(
                                    [
                                       ...newAnswers,
                                       {
                                          id: maxId() + 1,
                                          description: '',
                                          is_true: 0,
                                       },
                                    ]
                                 ) }
                                 onCancel={ () => handleOnCancel() }
                                 onUpdate={ () => handleOnUpdate() }
                                 setNewAnswers={ setNewAnswers }
                              />
                           ) : (
                              <ShowQuiz
                                 number={ id + 1 }
                                 question={ question.description }
                                 answers={ question.answers }
                                 switchToEdit={ () => handleSwitchToEdit(question) }
                                 onDelete={ () => deleteQuestion(question.id) }
                              />
                           )
                        }
                     </div>
                  ))
               }
               <div className='quizLesson__question'>
                  {
                     !editableId
                     && (isQuestionSaved || questions.length === undefined || questions.length === 0) && (
                        <>
                           <CreateOrEditQuiz
                              number={ questions ? questions.length + 1 : 1 }
                              question={ newQuestion }
                              answers={ newAnswers }
                              onChangeQuestion={ (value) => setNewQuestion(value) }
                              handleDeleteAnswer={
                                 (index) => {
                                    newAnswers.splice(index, 1);
                                    setNewAnswers([...newAnswers]);
                                 }
                              }
                              onChangeAnswer={
                                 (index, name, value) => {
                                    const copyNewAnswer = newAnswers.map((answer, i) => (
                                       i === index ? { ...answer, [name]: value } : answer
                                    ));
                                    setNewAnswers(copyNewAnswer);
                                 }
                              }
                              addAnswer={ () => setNewAnswers(
                                 [
                                    ...newAnswers,
                                    {
                                       description: '',
                                       is_true: 0,
                                    },
                                 ]
                              ) }
                              setNewAnswers={ setNewAnswers }
                           />
                           <div className='quizLesson__buttons'>
                              <BaseButton
                                 theme={ buttonTheme.grey }
                                 size={ buttonSizes.large }
                                 text='Cancel'
                                 margin
                                 onClick={ () => {
                                    resetState();
                                    setQuizTitle(title);
                                 } }
                              />
                              <BaseButton
                                 theme={ buttonTheme.darkGreen }
                                 size={ buttonSizes.large }
                                 text='Save'
                                 className='save-quize save-lesson'
                                 onClick={ () => {
                                    const notEmptyAnswers = newAnswers.filter(newAnswer => (newAnswer.description !== ''));
                                    addQuestion({
                                       question: newQuestion,
                                       answer: notEmptyAnswers.map(answer => answer.description),
                                       answer_check: notEmptyAnswers.map(answer => Number(answer.is_true)),
                                       name: quizTitle || 'Quiz Title',
                                    });
                                 } }
                              />
                           </div>
                        </>
                     )
                  }
               </div>
            </div>

            {
               !isQuestionSaved && questions.length !== undefined && questions.length !== 0 && (
                  <div className='quizLesson__addQuiestion'>
                     <BaseButton
                        theme={ buttonTheme.blueBordered }
                        size={ buttonSizes.full }
                        text='Add Question'
                        margin
                        style={ { height: '40px' } }
                        onClick={ () => {
                           resetState(); addQuestionAction(true);
                        } }
                     />
                  </div>
               )
            }
            { !isQuestionSaved && questions.length !== undefined && questions.length !== 0
                 && (
                    <div className='quizLesson__buttons'>
                       <div className='m-r-exl'>
                          {(quizTitle === title) ? null : (
                             <BaseButton
                                theme={ buttonTheme.grey }
                                size={ buttonSizes.large }
                                text='Cancel'
                                onClick={ () => {
                                   setQuizTitle(title);
                                } }
                             />
                          )}

                       </div>

                       <BaseButton
                          theme={ buttonTheme.darkGreen }
                          size={ buttonSizes.large }
                          text='Save'
                          className='save-lesson'
                          onClick={ () => handleSave({
                             name: quizTitle || 'Quiz Title',
                          }) }
                       />
                    </div>
                 )

            }
         </div>
      </ItemWrapper>
   );
};

QuizLesson.propTypes = {
   title: PropTypes.string,
   questions: PropTypes.any,
   handleSave: PropTypes.func,
   addQuestion: PropTypes.func,
   updateQuestion: PropTypes.func,
   deleteQuestion: PropTypes.func,
   isQuestionSaved: PropTypes.bool,
   addQuestionAction: PropTypes.func,
   setActiveName: PropTypes.func,
};

export default QuizLesson;
