/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import AddQuestionBtn from 'views/pages/Quizzes/Questions/AddQuestionBtn';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import IconNew from 'components/elements/iconsSize';
import useDraggableInPortal from 'utils/pageBuilder/useDraggableInPortal';
import Ending from './QuestionTypesFolder/Ending';
import Multiple from './QuestionTypesFolder/Multiple';
import Single from './QuestionTypesFolder/Single';
import Welcome from './QuestionTypesFolder/Welcome';


const Questions = ({
   quiz, chooseQuestionType, hasEnding, hasStart, questionContent, setQuestionContent,
   handleChangeQuiz, setHasStart, setHasEnding, changeQuestionAnswer,
   handleElementOnDragEnd, handleDeleteQuestion, handleDuplicateQuestion, handleDeleteAnswer,
   handleDuplicateAnswer, goToSettings,
}) => {
   const renderDraggable = useDraggableInPortal();
   let questions = [];
   const [barsState, setBarsState] = useState({
      left: false,
      right: false,
   });

   if (quiz && quiz.questions && !!quiz.questions.length) {
      questions = quiz.questions.sort((a, b) => {
         return a.order - b.order;
      });
   }


   useEffect(() => {
      setHasStart((questions && questions[0] && questions[0].type === 'welcome_screen'));
      setHasEnding((questions && questions[questions.length - 1] && questions[questions.length - 1].type === 'ending'));
      if (questions.length) {
         setQuestionContent({ question: questions[0], index: 0, indexWithoutZero: questions[0].type === 'welcome_screen' ? 0 : 1 });
      }
   }, []);

   const setQuestionIcon = (questionType) => {
      let iconName = '';
      switch (questionType) {
         case 'welcome_screen': iconName = 'WelcomeAM';
            break;
         case 'multiple_choice':
            iconName = 'MultiM';
            break;
         case 'yes_no':
            iconName = 'SingleM';
            break;
         case 'ending': iconName = 'EndingAM';
            break;
         default:
      }
      return iconName;
   };


   const questionContentFunc = (isRight) => {
      let questionType = '';
      if (questionContent.index !== undefined && questions[questionContent.index]) {
         questionType = questions[questionContent.index].type;
      }

      let questionSingleContent = '';
      switch (questionType) {
         case 'welcome_screen': questionSingleContent = (
            <Welcome
               question={ questions[questionContent.index] }
               quizzes={ quiz }
               isRight={ isRight }
               changeQuestion={ (name, value, originalName, file) => handleChangeQuiz(
                  name, value, originalName, file, questionContent.index) }
               changeSettingsQuestion={ (name, value, originalName, file) => handleChangeQuiz(
                  name, value, originalName, file, questionContent.index, true) }
            />
         );
            break;
         case 'multiple_choice':
            questionSingleContent = (
               <Multiple
                  question={ questions[questionContent.index] }
                  index={ questionContent.indexWithoutZero }
                  isRight={ isRight }
                  quiz={ quiz }
                  handleElementOnDragEnd={ handleElementOnDragEnd }
                  changeQuestionAnswer={ changeQuestionAnswer }
                  handleDeleteAnswer={ handleDeleteAnswer }
                  handleDuplicateAnswer={ handleDuplicateAnswer }
                  goToSettings={ goToSettings }
                  changeQuestion={ (name, value, originalName, file) => handleChangeQuiz(
                     name, value, originalName, file, questionContent.index) }
               />
            );
            break;
         case 'yes_no':
            questionSingleContent = (
               <Single
                  question={ questions[questionContent.index] }
                  index={ questionContent.indexWithoutZero }
                  isRight={ isRight }
                  goToSettings={ goToSettings }
                  quiz={ quiz }
                  handleElementOnDragEnd={ handleElementOnDragEnd }
                  changeQuestionAnswer={ changeQuestionAnswer }
                  changeQuestion={ (name, value, originalName, file) => handleChangeQuiz(
                     name, value, originalName, file, questionContent.index) }
               />
            );
            break;
         case 'ending': questionSingleContent = (
            <Ending
               question={ questions[questionContent.index] }
               isRight={ isRight }
               changeQuestion={ (name, value, originalName, file) => handleChangeQuiz(
                  name, value, originalName, file, questionContent.index) }
            />
         );
            break;
         default:
      }
      return questionSingleContent;
   };


   const chooseQuestion = (question, index, indexWithoutZero) => {
      setQuestionContent({ question, index, indexWithoutZero });
   };


   return (
      <div className='quizQuestions'>
         <div
            className={ `quizQuestions_left ${ barsState.left ? 'opened' : 'closed' }` }
         >
            <div className='quizQuestions_left_addQuestion'>
               <div>
                  <Text
                     inner='Content'
                     type={ types.mediumLarge }
                     size={ sizes.small }
                  />
               </div>
               <AddQuestionBtn
                  withoutText={ true }
                  disabled={ false }
                  hasEnding={ hasEnding }
                  hasStart={ hasStart }
                  chooseQuestionType={ chooseQuestionType }
               />
               <div
                  className='quizQuestions_bar_switcher'
                  role='presentation'
                  onClick={ () => setBarsState({ left: !barsState.left, right: false }) }
               >
                  <IconNew name='ChevronLeftL' style={ !barsState.left ? { transform: 'rotate(180deg)' } : {} } />
               </div>
            </div>
            {!questions.length && (
               <div className='empty__quiz__info'>
                  <div><IconNew name='InfoQuizM' /></div>
                  <Text
                     inner='To add a new question, press the “+” button'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
            )}
            <div>
               <DragDropContext onDragEnd={ (result) => handleElementOnDragEnd(result) }>
                  <div>
                     { questions[0] && questions[0].type === 'welcome_screen'
               && (
                  <div
                     key={ questions[0].slug }
                     className={ questionContent.question.slug === questions[0].slug ? 'question_header question_header_active' : 'question_header' }
                     onClick={ () => chooseQuestion(questions[0], 0) }
                     role='presentation'
                  >
                     <IconNew name={ setQuestionIcon(questions[0].type) } />
                     <Text
                        inner={ questions[0].title }
                        type={ types.regular148 }
                        size={ sizes.small }
                     />
                     <div className='question_actions'>
                        <div onClick={ (e) => { e.stopPropagation(); handleDeleteQuestion(questions[0].id, 0, questions[0].slug, questions[0].type); } } role='presentation'><IconNew name='DeleteMediaM' /></div>
                     </div>
                  </div>
               )
                     }
                     <Droppable
                        key={ quiz.id }
                        droppableId={ `${ quiz.id }` }
                        type='questions'
                     >
                        {
                           (sectionProvided, snapshot) => (
                              <>
                                 <div
                                    { ...sectionProvided.droppableProps }
                                    ref={ sectionProvided.innerRef }
                                    style={ snapshot.isDraggingOver
                                       ? { ...sectionProvided.droppableProps.style, backgroundColor: 'rgb(217 255 210 / 50%)' }
                                       : { ...sectionProvided.droppableProps.style } }
                                 >
                                    {questions.map((question, i) => {
                                       const key = i + 1;
                                       let j = i + 1;
                                       if (question.type === 'welcome_screen' || question.type === 'ending') {
                                          return null;
                                       }
                                       if (questions[0] && questions[0].type === 'welcome_screen') {
                                          j = i;
                                       }

                                       return (
                                          <Draggable
                                             draggableId={ `${ question.slug }` }
                                             index={ i }
                                             key={ question.id || key }
                                          >
                                             {renderDraggable((sectionDragProvided) => {
                                                return (
                                                   <div
                                                      ref={ sectionDragProvided.innerRef }
                                                      { ...sectionDragProvided.draggableProps }
                                                      style={ { ...sectionDragProvided.draggableProps.style } }
                                                      key={ question.slug }
                                                      className={ questionContent.question.slug === question.slug ? 'question_header question_header_active' : 'question_header' }
                                                      onClick={ () => chooseQuestion(question, i, j) }
                                                      role='presentation'
                                                   >
                                                      <div
                                                         className='questionDragHandleIcon'
                                                         { ...sectionDragProvided.dragHandleProps }
                                                      >
                                                         <IconNew name='DragQuizS' />
                                                      </div>
                                                      <div className={ `${ question.type }` }><IconNew name={ setQuestionIcon(question.type) } />
                                                         <Text
                                                            inner={ j }
                                                            type={ types.regularDefault }
                                                            size={ sizes.small }
                                                            style={ { color: '#fff' } }
                                                         />
                                                      </div>
                                                      <div className='header_text'>
                                                         <Text
                                                            inner={ question.title }
                                                            type={ types.regular148 }
                                                            size={ sizes.small }
                                                         />
                                                      </div>


                                                      <div className='question_actions'>
                                                         <div onClick={ (e) => { e.stopPropagation(); handleDuplicateQuestion(question, i); } } role='presentation'><IconNew name='DuplicateMediaM' /></div>
                                                         <div onClick={ (e) => { e.stopPropagation(); handleDeleteQuestion(question.id, i, question.slug); } } role='presentation'><IconNew name='DeleteMediaM' /></div>
                                                      </div>

                                                   </div>
                                                );
                                             })}
                                          </Draggable>

                                       );
                                    })}

                                 </div>
                                 {sectionProvided.placeholder}
                              </>
                           )}
                     </Droppable>
                     { questions[questions.length - 1] && questions[questions.length - 1].type === 'ending'
               && (
                  <div
                     key={ questions[questions.length - 1].slug }
                     className={ questionContent.question.slug === questions[questions.length - 1].slug ? 'question_header question_header_end question_header_active' : 'question_header question_header_end' }
                     onClick={ () => chooseQuestion(questions[questions.length - 1], questions.length - 1) }
                     role='presentation'
                  >
                     <IconNew name={ setQuestionIcon(questions[questions.length - 1].type) } />
                     <Text
                        inner='Ending Screen'
                        type={ types.regular148 }
                        size={ sizes.small }
                     />
                     <div className='question_actions'>
                        <div
                           onClick={ (e) => {
                              e.stopPropagation();
                              handleDeleteQuestion(questions[questions.length - 1].id, questions.length - 1, questions[questions.length - 1].slug, questions[questions.length - 1].type);
                           } }
                           role='presentation'
                        ><IconNew name='DeleteMediaM' />
                        </div>
                     </div>

                  </div>
               )
                     }
                  </div>
               </DragDropContext>
            </div>
         </div>
         <div className='quizQuestions_content'>
            {questionContent.index > -1 && questionContentFunc()}
            {!questions.length && (
               <div className='empty__quiz'>
                  <IconNew name='HandL' />
                  <Text
                     inner='Welcome to Quiz Creation'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Text
                     inner='On the sidebar panel, press the "+" button to add a new quiz screen'
                     type={ types.regularDefaultSmall }
                     size={ sizes.size_28 }
                  />
               </div>
            )}
         </div>
         <div
            // className='quizQuestions_right'
            className={ `quizQuestions_right ${ barsState.right ? 'opened' : 'closed' }` }
         >
            <div
               className='quizQuestions_bar_switcher'
               role='presentation'
               onClick={ () => setBarsState({ right: !barsState.right, left: false }) }
            >
               <IconNew name='ChevronLeftL' style={ barsState.right ? { transform: 'rotate(180deg)' } : {} } />
            </div>
            {questionContent.index > -1 && questionContentFunc(true)}
         </div>
      </div>
   );
};

Questions.defaultProps = {
   quiz: {},
   questionContent: {
      question: {},
   },
};

Questions.propTypes = {
   quiz: PropTypes.object,
   chooseQuestionType: PropTypes.func,
   hasEnding: PropTypes.bool,
   hasStart: PropTypes.bool,
   questionContent: PropTypes.any,
   setQuestionContent: PropTypes.func,
   handleElementOnDragEnd: PropTypes.func,
   handleChangeQuiz: PropTypes.func,
   setHasStart: PropTypes.func,
   setHasEnding: PropTypes.func,
   changeQuestionAnswer: PropTypes.func,
   handleDeleteQuestion: PropTypes.func,
   handleDuplicateQuestion: PropTypes.func,
   handleDeleteAnswer: PropTypes.func,
   handleDuplicateAnswer: PropTypes.func,
   goToSettings: PropTypes.func,
};

export default Questions;
