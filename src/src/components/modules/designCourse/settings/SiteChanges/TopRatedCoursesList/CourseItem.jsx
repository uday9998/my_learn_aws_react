import React from 'react';
import PropTypes from 'prop-types';
import {
   SortableElement,
   sortableHandle,
} from 'react-sortable-hoc';
import Text, { SIZES as TextSize, TYPE as TextType } from 'components/elements/Text';
import Icon from 'components/elements/Icon';


const DragHandle = sortableHandle(() => (
   <Icon name='Dragdrop' />
));


function CourseItem({ course, onDeleteStart }) {
   return (
      <div className='topped_course_container'>
         <div className='topped_course_item'>
            <DragHandle />
            <div>
               <Text inner={ course } size={ TextSize.extraSmall } type={ TextType.regular } />
            </div>
         </div>
         <div
            role='presentation'
            className='delete_course_from_topped'
            onClick={ (e) => {
               e.stopPropagation();
               onDeleteStart();
            } }
         >
            <Icon name='Close' />
         </div>
      </div>
   );
}

CourseItem.propTypes = {
   course: PropTypes.string,
   onDeleteStart: PropTypes.func,
};

export default SortableElement((...props) => {
   return <CourseItem { ...props[0] } />;
});
