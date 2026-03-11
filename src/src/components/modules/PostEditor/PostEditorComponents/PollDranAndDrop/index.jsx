import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.scss';
import useDraggableInPortal from 'utils/pageBuilder/useDraggableInPortal';
import PollDrangAndDropItem from '../PollDrangAndDropItem';

const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);

   return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
   // some basic styles to make the items look a bit nicer
   userSelect: 'none',
   background: '#FFFFFF',
   border: '1px solid #E7E9E9',
   borderRadius: '8px',
   gap: '8px',
   padding: '14px 8px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   minHeight: '61px',
   // change background colour if dragging

   // styles we need to apply on draggables
   ...draggableStyle,
});

const getListStyle = () => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   width: '100%',
});

const PollDrangAndDrop = ({
   options, setOptions, handleRemoveOption, onRename,
}) => {
   const onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) {
         return;
      }

      const i = reorder(
         options,
         result.source.index,
         result.destination.index
      );
      setOptions(i);
   };
   const renderDraggable = useDraggableInPortal();
   return (
      <DragDropContext onDragEnd={ onDragEnd }>
         <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
               <div
                  { ...provided.droppableProps }
                  ref={ provided.innerRef }
                  style={ getListStyle(snapshot.isDraggingOver) }
               >
                  {options.map((item, index) => (
                     <Draggable key={ item.id } draggableId={ item.id } index={ index }>
                        {renderDraggable((p, s) => (
                           <PollDrangAndDropItem
                              p={ p }
                              s={ s }
                              provided={ provided }
                              item={ item }
                              onRename={ onRename }
                              options={ options }
                              getItemStyle={ getItemStyle }
                              handleRemoveOption={ handleRemoveOption }
                           />
                        ))}
                     </Draggable>
                  ))}
                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </DragDropContext>
   );
};

PollDrangAndDrop.propTypes = {
   options: PropTypes.array,
   onRename: PropTypes.func,
   setOptions: PropTypes.func,
   handleRemoveOption: PropTypes.func,
};

export default PollDrangAndDrop;
