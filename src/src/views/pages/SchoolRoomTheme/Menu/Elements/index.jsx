import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from 'components/elements/Icon';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Info from 'components/elements/messages/info';
import IconNew from 'components/elements/iconsSize';

const Elements = () => {
   const elements = [
      { id: 'Headline', name: 'Headline', icon: <Icon name='Headline' /> },
      { id: 'Subheadline', name: 'Subheadline', icon: <Icon name='Subheadline' /> },
      { id: 'Text', name: 'Text', icon: <Icon name='TextNew' /> },
      { id: 'Bullet', name: 'Bullet', icon: <Icon name='Bullet' /> },
      { id: 'Button', name: 'Button', icon: <Icon name='Button' /> },
      { id: 'Image', name: 'Image', icon: <Icon name='ImageNew' /> },
      { id: 'Video', name: 'Video', icon: <Icon name='VideoNew' /> },
      { id: 'Divider', name: 'Divider', icon: <Icon name='Divider' /> },
      { id: 'FAQ', name: 'FAQ', icon: <Icon name='FAQ' /> },
      { id: 'CallToAction', name: 'Call to Action', icon: <Icon name='CallToAction' /> },
      { id: 'CustomCode', name: 'Custom Code', icon: <Icon name='Code' /> },
      { id: 'Banner', name: 'Banner', icon: <Icon name='Banner' /> },
      { id: 'CountDown', name: 'Countdown Timer', icon: <Icon name='Timer' /> },
   ];
   const [isOpenImage, setIsOpenImage] = React.useState(true);
   return (
      <div className='schoolroom__elements'>
         <Info
            isHaveCancel={ false }
            title='Drag the item you want to add to where you want it'
         />
         {/* {isOpenImage && (
            <div className='schoolroom__elements__helper'>
               <IconNew name='SchoolRoomElementsM' />
               <div
                  className='schoolroom__elements__helper__close'
                  role='presentation'
                  onClick={ () => setIsOpenImage(false) }
               >
                  <IconNew name='SchoolRoomCloser' />
               </div>
            </div>
         )} */}
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
                                          size={ sizes.small14 }
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
