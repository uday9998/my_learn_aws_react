import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

import './index.scss';
import { DragHandle } from 'components/modules/SortableList';

const CategoryItem = forwardRef(({
   category = {}, disableSort = false, dragItem, placeholder, children, ...rest
}, ref) => {
   const {
      name,
   } = category;
   return (
      <div className='reorderCourses__categoryItem' ref={ ref } { ...rest }>
         <div className='reorderCourses__categoryItem__categoryName flex'>
            { disableSort === false && (dragItem || <DragHandle />)}
            <Text
               type={ TextType.demiBold }
               size={ TextSize.medium }
               inner={ name }
               className='m-l-exs'
            />
         </div>
         <div className='reorderCourses__categoryItem__courses'>{children}</div>
         {placeholder}
      </div>
   );
});

CategoryItem.propTypes = {
   category: PropTypes.object,
   children: PropTypes.node,
   disableSort: PropTypes.bool,
};

export default CategoryItem;
