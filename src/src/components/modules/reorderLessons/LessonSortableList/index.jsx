/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const formatReorderData = lessons => lessons
   .reduce((result, section, index) => {
      result.push({
         id: section.id,
         order: index,
      });
      return result;
   }, []);

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);
   return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
   // some basic styles to make the items look a bit nicer
   // change background colour if dragging
   // styles we need to apply on draggables
   display: 'flex',
   alignItems: 'center',
   width: '100%',
   borderRadius: '12px',
   padding: '8px 10px',
   transition: '0.3s',
   justifyContent: 'space-between',
   ...draggableStyle,
});

const getListStyle = () => ({
   width: '100%',
});

function LessonSortableList({ lessons, onChange, children }) {
   function onDragEnd(result) {
      // dropped outside the list
      if (!result.destination) {
         return;
      }
      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;
      if (result.type === 'droppableItem') {
         const items = reorder(lessons, sourceIndex, destIndex);
         onChange(items, formatReorderData(items));
      } else if (result.type === 'droppableSubItem') {
         const itemSubItemMap = lessons.reduce((acc, item) => {
            acc[item.id] = item.lessons;
            return acc;
         }, {});

         const sourceParentId = +result.source.droppableId;
         const destParentId = +result.destination.droppableId;

         const sourceSubItems = itemSubItemMap[sourceParentId];
         const destSubItems = itemSubItemMap[destParentId];

         let newItems = [...lessons];

         /** In this case subItems are reOrdered inside same Parent */
         if (sourceParentId === destParentId) {
            const reorderedSubItems = reorder(
               sourceSubItems,
               sourceIndex,
               destIndex
            );
            newItems = newItems.map(item => {
               if (item.id === sourceParentId) {
                  item.lessons = reorderedSubItems;
               }
               return item;
            });
            onChange(newItems, formatReorderData(newItems));
         } else {
            const newSourceSubItems = [...sourceSubItems];
            const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

            const newDestSubItems = [...destSubItems];
            newDestSubItems.splice(destIndex, 0, draggedItem);
            newItems = newItems.map(item => {
               if (item.id === sourceParentId) {
                  item.lessons = newSourceSubItems;
               } else if (item.id === destParentId) {
                  item.lessons = newDestSubItems;
               }
               return item;
            });
            onChange(newItems, formatReorderData(newItems));
         }
      }
   }

   // Normally you would want to split things out into separate components.
   // But in this example everything is just done in one place for simplicity
   return (
      <DragDropContext onDragEnd={ onDragEnd }>
         <Droppable droppableId='droppable' type='droppableItem'>
            {(provided, snapshot) => (
               <div
                  ref={ provided.innerRef }
                  style={ getListStyle(snapshot.isDraggingOver) }
               >
                  {lessons.map((item, index) => (
                     <Draggable key={ item.id } draggableId={ String(item.id) } index={ index }>
                        {(p, s) => (
                           <div className='courseSectionWrap'>
                              {children(p, s, item, getItemStyle, index)}
                           </div>
                        )}
                     </Draggable>
                  ))}
                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </DragDropContext>
   );
}

LessonSortableList.propTypes = {
   lessons: PropTypes.array,
   onChange: PropTypes.func,
   children: PropTypes.node,
};


// Put the thing into the DOM!
export default LessonSortableList;
