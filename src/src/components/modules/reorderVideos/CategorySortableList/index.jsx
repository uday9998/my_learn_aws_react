import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.scss';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import CategoryItem from './CategoryItem';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);

   return result;
};

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
   // some basic styles to make the items look a bit nicer
   display: 'flex',
   flexDirection: 'column',
   // styles we need to apply on draggables
   ...draggableStyle,
});

const getListStyle = () => ({
   width: '100%',
   padding: grid,
});

const CategorySortableList = ({
   categories, onChange, categoryProps, isVideo, isAdminVideo, videoProps, isCategorySettings,
   seo, setSeo, removeCategory, isProgressDetachedCourses, duplicatePlaylist,
}) => {
   let courses = 'courses';
   if (isVideo) {
      courses = 'lessons';
   }
   const onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) {
         if (isPrint("The element can't be added in this area.")) {
            toast.error("The element can't be added in this area.");
         }
         return;
      }
      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;
      if (result.type === 'droppableItem') {
         const items = reorder(categories, sourceIndex, destIndex);

         onChange(items);
      } else if (result.type === 'droppableSubItem') {
         const itemSubItemMap = categories.reduce((acc, item) => {
            acc[item.id] = item[courses];
            return acc;
         }, {});

         const sourceParentId = +result.source.droppableId;
         const destParentId = +result.destination.droppableId;

         const sourceSubItems = itemSubItemMap[sourceParentId];
         const destSubItems = itemSubItemMap[destParentId];

         let newItems = [...categories];

         /** In this case subItems are reOrdered inside same Parent */
         if (sourceParentId === destParentId) {
            const reorderedSubItems = reorder(
               sourceSubItems,
               sourceIndex,
               destIndex
            );
            newItems = newItems.map(item => {
               const itemVariable = item;
               if (item.id === sourceParentId) {
                  itemVariable[courses] = reorderedSubItems;
               }
               return item;
            });
            onChange(newItems);
         } else if (sourceParentId !== destParentId) {
            const newSourceSubItems = [...sourceSubItems];
            const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

            const newDestSubItems = [...destSubItems];
            if (newDestSubItems.filter(subitem => subitem.id === draggedItem.id)
            && !!newDestSubItems.filter(subitem => subitem.id === draggedItem.id).length) {
               if (isPrint("The element can't be added in this area.")) {
                  toast.error("The element can't be added in this area.");
               }
               return;
            }
            newDestSubItems.splice(destIndex, 0, draggedItem);
            newItems = newItems.map(item => {
               const itemVariable = item;
               if (item.id === sourceParentId) {
                  itemVariable[courses] = newSourceSubItems;
               } else if (item.id === destParentId) {
                  itemVariable[courses] = newDestSubItems;
               }
               return item;
            });
            onChange(newItems);
         }
      }
   };
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
                  {categories.map((item, index) => (
                     <Draggable key={ item.id } draggableId={ String(item.id) } index={ index }>
                        {(p, s) => (
                           <div>
                              <CategoryItem
                                 provided={ p }
                                 snapshot={ s }
                                 isCategorySettings={ isCategorySettings }
                                 courses={ courses }
                                 isAdminVideo={ isAdminVideo }
                                 isProgressDetachedCourses={ isProgressDetachedCourses }
                                 videoProps={ videoProps }
                                 categories={ categories }
                                 isVideo={ courses === 'lessons' }
                                 getItemStyle={ getItemStyle }
                                 item={ item }
                                 removeCategory={ removeCategory }
                                 seo={ seo }
                                 setSeo={ setSeo }
                                 duplicatePlaylist={ duplicatePlaylist }
                                 { ...categoryProps }
                              />
                              {p.placeholder}
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
};

CategorySortableList.propTypes = {
   categories: PropTypes.array,
   categoryProps: PropTypes.object,
   onChange: PropTypes.func,
   isVideo: PropTypes.bool,
   isAdminVideo: PropTypes.bool,
   videoProps: PropTypes.object,
   isCategorySettings: PropTypes.bool,
   seo: PropTypes.object,
   setSeo: PropTypes.func,
   removeCategory: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   duplicatePlaylist: PropTypes.func,
};


// Put the thing into the DOM!
export default CategorySortableList;
