/* eslint-disable max-len */
import React from 'react';
import { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import useDraggableInPortal from 'utils/pageBuilder/useDraggableInPortal';
import PropTypes from 'prop-types';
import QuizAnswer from '../QuizAnswer';
import './index.scss';

const Answers = ({
   questionAnswers, onChangeAnswer, addChoice, id, handleDeleteAnswer, handleElementOnDragEnd,
   checkedAnswers, handleDuplicateAnswer,
}) => {
   const renderDraggable = useDraggableInPortal();

   let answers = [];
   answers = questionAnswers && !!questionAnswers.length && questionAnswers.sort((a, b) => {
      return a.order - b.order;
   });

   return (
      <DragDropContext onDragEnd={ (result) => handleElementOnDragEnd(result) }>
         <div className='answers'>
            <Droppable
               key={ `${ id }` }
               droppableId={ `${ id }` }
               type='answers'
            >
               {
                  (sectionProvided, snapshot) => (
                     <>
                        <div
                           { ...sectionProvided.droppableProps }
                           ref={ sectionProvided.innerRef }
                           isdraggingover={ snapshot.isdraggingover }
                           className='answers_dropable'
                           style={ snapshot.isDraggingOver
                              ? { ...sectionProvided.droppableProps.style, backgroundColor: 'rgb(217 255 210 / 50%)' }
                              : { ...sectionProvided.droppableProps.style } }
                        >
                           {!!answers.length && answers.map((answer, i) => {
                              const key = i + 1;
                              return (
                                 <Draggable
                                    draggableId={ `${ answer.slug }` }
                                    index={ i }
                                    key={ answer.slug || key }
                                 >
                                    {renderDraggable((sectionDragProvided) => {
                                       return (
                                          <>
                                             <div
                                                ref={ sectionDragProvided.innerRef }
                                                { ...sectionDragProvided.draggableProps }
                                                style={ { ...sectionDragProvided.draggableProps.style } }
                                                className='draggable_component multiple_answer'
                                             >
                                                <QuizAnswer
                                                   key={ answer.id || key }
                                                   index={ i }
                                                   answersLength={ answers.length }
                                                   description={ answer.description }
                                                   isTrue={ answer.is_true }
                                                   checkedAnswers={ checkedAnswers }
                                                   onChange={ (name, value) => onChangeAnswer(name, value, answer.slug) }
                                                   drag={ sectionDragProvided.dragHandleProps }
                                                   handleDuplicateAnswer={ () => handleDuplicateAnswer(answer, i) }
                                                   handleDeleteAnswer={
                                                      () => handleDeleteAnswer(answer.id, answer.slug) }
                                                />
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
            {answers && answers.length < 15 && (
               <TextWithIcon
                  inner='Add Choice'
                  iconName='PlusSupportM'
                  type={ types.regularDefaultSmallX }
                  size={ sizes.small }
                  style={ { color: '#24554E' } }
                  onClick={ () => addChoice() }
               />
            )}
         </div>
      </DragDropContext>
   );
};

Answers.propTypes = {
   questionAnswers: PropTypes.array,
   onChangeAnswer: PropTypes.func,
   addChoice: PropTypes.func,
   id: PropTypes.string,
   handleDeleteAnswer: PropTypes.func,
   checkedAnswers: PropTypes.array,
   handleElementOnDragEnd: PropTypes.func,
   handleDuplicateAnswer: PropTypes.func,
};
export default Answers;
