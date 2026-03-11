/* eslint-disable max-len */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useDraggableInPortal from 'utils/pageBuilder/useDraggableInPortal';
import AddQuestionBtn from '../AddQuestionBtn';
import Welcome from '../QuestionTypesFolder/Welcome';
import Multiple from '../QuestionTypesFolder/Multiple';
import Single from '../QuestionTypesFolder/Single';
import Ending from '../QuestionTypesFolder/Ending';


const QuestionTypesViews = ({
   chooseQuestionType, quizQuestions, hasEnding, block, changeQuestion, deleteQuestion, changeQuestionAnswer,
   handleElementOnDragEnd, blockIndex, lessonActionInProgress, handleDeleteAnswer, setHasError,
}) => {
   const renderDraggable = useDraggableInPortal();
   const questions = quizQuestions.sort((a, b) => {
      return a.order - b.order;
   });

   const showQuestionTypes = (question, index) => {
      let questionName;
      switch (question.type) {
         case 'welcome_screen': questionName = (
            <Welcome
               question={ question }
               quizzes={ block.quizzes[0] }
               changeQuestion={ (name, value, originalName, file) => changeQuestion(name, value, originalName, file, question.type, index) }
               changeSettingsQuestion={ (name, value, originalName, file) => changeQuestion(name, value, originalName, file, question.type, index, 'true') }
            />
         );
            break;
         case 'multiple_choice': questionName = (
            <Multiple
               question={ question }
               changeQuestion={ (name, value, originalName, file) => changeQuestion(name, value, originalName, file, question.type, index) }
               changeQuestionAnswer={ (newQuestion, isSave) => changeQuestionAnswer(newQuestion, isSave, index) }
               blockIndex={ blockIndex }
               lessonActionInProgress={ lessonActionInProgress }
               handleDeleteAnswer={ (questionId, answer) => handleDeleteAnswer(questionId, answer, index) }
               setHasError={ setHasError }
            />
         );
            break;
         case 'yes_no': questionName = (
            <Single
               question={ question }
               changeQuestion={ (name, value, originalName, file) => changeQuestion(name, value, originalName, file, question.type, index) }
               changeQuestionAnswer={ (newQuestion, isSave) => changeQuestionAnswer(newQuestion, isSave, index) }
               blockIndex={ blockIndex }
            />
         );
            break;
         case 'ending': questionName = (
            <Ending
               question={ question }
               changeQuestion={ (name, value, originalName, file) => changeQuestion(name, value, originalName, file, question.type, index) }
            />
         );
            break;
         default:
      }
      return questionName;
   };


   return (
      <DragDropContext onDragEnd={ (result) => handleElementOnDragEnd(result, blockIndex) }>
         <div className='questionTypesViews'>
            { questions[0].type === 'welcome_screen'
               && (
                  <div
                     className='questionTypeViews'
                  >
                     {showQuestionTypes(questions[0], 0)}
                     <div
                        className='questionDelete'
                        onClick={ () => deleteQuestion(block.quizzes[0].id, questions[0], questions[0].slug) }
                        role='presentation'
                        title='delete'
                     ><IconNew name='DeleteMediaM' />
                     </div>
                     <AddQuestionBtn
                        chooseQuestionType={ (type) => chooseQuestionType(type, 0) }
                        hasEnding={ hasEnding }
                     />
                     <div className='grey__line' />
                  </div>
               )
            }
            <Droppable
               key={ block.quizzes[0].id }
               droppableId={ `${blockIndex}` }
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
                              if (question.type === 'welcome_screen' || question.type === 'ending') {
                                 return null;
                              }
                              return (
                                 <Draggable
                                    draggableId={ `${question.slug}` }
                                    index={ i }
                                    key={ question.slug || key }
                                 // isDragDisabled={ !!question.isNotDraggables }
                                 >
                                    {renderDraggable((sectionDragProvided) => {
                                       return (
                                          <>
                                             {/* {sectionDragProvided.draggableProps.style.position !== 'fixed' && sectionDragProvided.draggableProps.style.transform !== null && <section className='drop_element_here'>DROP ELEMENT HERE</section> } */}
                                             <div
                                                ref={ sectionDragProvided.innerRef }
                                                { ...sectionDragProvided.draggableProps }
                                                //  { ...sectionDragProvided.dragHandleProps }
                                                style={ { ...sectionDragProvided.draggableProps.style } }
                                                className='draggable_component questionTypeViews'
                                             >
                                                {showQuestionTypes(question, i)}
                                                <div
                                                   className='questionDelete'
                                                   onClick={ () => deleteQuestion(block.quizzes[0].id, question, question.slug) }
                                                   role='presentation'
                                                   title='delete'
                                                ><IconNew name='DeleteMediaM' />
                                                </div>
                                                <>
                                                   <AddQuestionBtn
                                                      chooseQuestionType={ (type) => chooseQuestionType(type, i) }
                                                      hasEnding={ hasEnding }
                                                   />
                                                   <div className='grey__line' />
                                                </>
                                                <div
                                                   className='questionDragHandleIcon'
                                                   { ...sectionDragProvided.dragHandleProps }
                                                >
                                                   <IconNew name='DragQuestionM' />
                                                </div>
                                             </div>
                                          </>
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
            { questions[questions.length - 1].type === 'ending'
               && (
                  <div
                     className='questionTypeViews'
                  >
                     {showQuestionTypes(questions[questions.length - 1], questions.length - 1)}
                     <div
                        className='questionDelete'
                        onClick={ () => deleteQuestion(block.quizzes[0].id, questions[questions.length - 1], questions[questions.length - 1].slug) }
                        role='presentation'
                        title='delete'
                     ><IconNew name='DeleteMediaM' />
                     </div>
                  </div>
               )
            }
         </div>
      </DragDropContext>
   );
};

QuestionTypesViews.propTypes = {
   chooseQuestionType: PropTypes.func,
   quizQuestions: PropTypes.array,
   hasEnding: PropTypes.bool,
   block: PropTypes.object,
   changeQuestion: PropTypes.func,
   deleteQuestion: PropTypes.func,
   changeQuestionAnswer: PropTypes.func,
   handleElementOnDragEnd: PropTypes.func,
   blockIndex: PropTypes.number,
   lessonActionInProgress: PropTypes.bool,
   handleDeleteAnswer: PropTypes.func,
   setHasError: PropTypes.func,
};

export default QuestionTypesViews;
