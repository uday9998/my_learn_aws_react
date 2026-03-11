import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from 'components/elements/Icon';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';

const Elements = () => {
   const elements = [
      { id: 'Text', name: 'Text', icon: <Icon name='TextNew' /> },
      { id: 'Image', name: 'Image', icon: <Icon name='ImageNew' /> },
      { id: 'Button', name: 'Call to Action', icon: <Icon name='Button' /> },
   ];
   return (
      <div className='upsell-elements'>
         <Droppable
            droppableId='newElements'
            direction='vertical'
            type='element'
         >
            {
               (provided) => {
                  return (
                     <div
                        { ...provided.droppableProps }
                        className='elements_content'
                        ref={ provided.innerRef }
                     >
                        {elements.map((element, index) => (
                           <Draggable
                              key={ element.id }
                              draggableId={ element.id }
                              index={ index }
                              disableInteractiveElementBlocking
                           >
                              {(dragProvided, snapshot) => (
                                 <div>
                                    <div
                                       key={ element.id }
                                       ref={ dragProvided.innerRef }
                                       { ...dragProvided.draggableProps }
                                       { ...dragProvided.dragHandleProps }
                                       style={ dragProvided.draggableProps.style.position === 'fixed' ? { ...dragProvided.draggableProps.style } : {
                                          ...dragProvided.draggableProps.style, transform: 'none', top: 'auto', left: 'auto',
                                       } }
                                       className='element_content'
                                    >
                                       <div className='elementIcon'>{element.icon}</div>
                                       <Text
                                          inner={ element.name }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                    </div>
                                    {snapshot.isDragging
                                             && (
                                                <div className='element_content'>
                                                   <div className='elementIcon'>{element.icon}</div>
                                                   <div className='elementName'>{element.name}</div>
                                                </div>
                                             )
                                    }
                                 </div>
                              )}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </div>
                  );
               }
            }
         </Droppable>
      </div>
   );
};

export default Elements;
