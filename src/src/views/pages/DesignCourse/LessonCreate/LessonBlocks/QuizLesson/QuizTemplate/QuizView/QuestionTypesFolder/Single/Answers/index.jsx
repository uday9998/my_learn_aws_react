import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useDraggableInPortal from 'utils/pageBuilder/useDraggableInPortal';
import QuizAnswer from '../QuizAnswer';
import './index.scss';

const Answers = ({
   questionAnswers, onChangeAnswer, id,
}) => {
   const renderDraggable = useDraggableInPortal();
   const answers = questionAnswers.sort((a, b) => {
      return a.order - b.order;
   });
   return (
      <div className='single_answers'>
         <Droppable
            key={ `${id}` }
            droppableId={ `${id}` }
            type='answers'
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
                        {answers.map((answer, i) => {
                           const key = i + 1;
                           return (
                              <Draggable
                                 draggableId={ `${answer.slug}` }
                                 index={ i }
                                 key={ answer.id || key }
                              >
                                 {renderDraggable((sectionDragProvided) => {
                                    return (
                                       <>
                                          <div
                                             ref={ sectionDragProvided.innerRef }
                                             { ...sectionDragProvided.draggableProps }
                                             style={ { ...sectionDragProvided.draggableProps.style } }
                                             className='draggable_component single_answer'
                                          >
                                             <QuizAnswer
                                                key={ answer.slug || key }
                                                index={ i }
                                                description={ answer.description }
                                                isTrue={ answer.is_true }
                                                onChange={ (name, value) => onChangeAnswer(name, value, answer.slug) }
                                                drag={ sectionDragProvided.dragHandleProps }
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
      </div>
   );
};

Answers.propTypes = {
   questionAnswers: PropTypes.array,
   onChangeAnswer: PropTypes.func,
   id: PropTypes.any,
};

export default Answers;
