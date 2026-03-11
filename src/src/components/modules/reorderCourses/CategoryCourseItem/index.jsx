import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import { DragHandle } from 'components/modules/SortableList';

const CategoryCourseItem = forwardRef((props, ref) => {
   const {
      name, dragItem, placeholder, ...rest
   } = props;
   return (
      <div className='flex' ref={ ref } { ...rest }>
         {dragItem}
         <Text
            type={ TextType.demiBold }
            size={ TextSize.medium }
            inner={ name }
            className='m-l-exs'
         />
         {placeholder}
      </div>
   );
});

CategoryCourseItem.propTypes = {
   name: PropTypes.string,
};

export default CategoryCourseItem;
