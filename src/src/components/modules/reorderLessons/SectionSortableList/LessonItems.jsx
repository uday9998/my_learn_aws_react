import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';


const getItemStyle = (_, draggableStyle) => ({
   userSelect: 'none',
   display: 'inline-flex',
   width: '100%',
   backgroundColor: '#fff',
   borderRadius: '4px',
   // styles we need to apply on draggables
   ...draggableStyle,
});

const getListStyle = () => ({
   margin: '24px 0',
});

export default function CategoryCourses({ type, subItems, children }) {
   return (
      <Droppable droppableId={ type } type='droppableSubItem'>
         {(provided, snapshot) => (
            <div
               ref={ provided.innerRef }
               style={ getListStyle(snapshot.isDraggingOver) }
            >
               {subItems.map((item, index) => (
                  <Draggable key={ item.id } draggableId={ `course_${ item.id }` } index={ index }>
                     {(p, s) => (
                        <div>
                           <div
                              ref={ p.innerRef }
                              { ...p.draggableProps }
                              style={ getItemStyle(
                                 s.isDragging,
                                 p.draggableProps.style
                              ) }
                           >
                              {children(item, p)}
                           </div>
                           {p.placeholder}
                        </div>
                     )}
                  </Draggable>
               ))}
               {provided.placeholder}
            </div>
         )}
      </Droppable>
   );
}

CategoryCourses.propTypes = {
   type: PropTypes.string,
   subItems: PropTypes.array,
   children: PropTypes.node,
};
