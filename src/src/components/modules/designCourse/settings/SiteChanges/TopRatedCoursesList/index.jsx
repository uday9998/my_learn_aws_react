import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import CourseItem from './CourseItem';

function TopRatedCourseList({ items, onDeleteStart }) {
   return (
      <div
         onClick={ (e) => e.stopPropagation() }
         role='presentation'
         className='addedLessons'
      >
         {
            items.map(({ course, id }, index) => {
               return (
                  <CourseItem key={ course } index={ index } course={ course } onDeleteStart={ () => onDeleteStart(id) } />
               );
            })
         }
      </div>
   );
}

TopRatedCourseList.propTypes = {
   items: PropTypes.array,
   onDeleteStart: PropTypes.func,
};

export const TopRatedCourseListContainer = SortableContainer(({ children }) => (<>{children}</>));

export default TopRatedCourseList;
