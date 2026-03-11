import React from 'react';
import PropTypes from 'prop-types';

import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import './index.scss';
import CategorySortableList from 'components/modules/reorderCourses/CategorySortableList';


function ReorderCourses({
   categories = [], onChange, onSave,
}) {
   return (
      <div className='reorderCoursesWrapper'>
         <div className='reorder-left'>
            <CategorySortableList categories={ categories } onChange={ onChange } />
         </div>
         <div className='reorder-right'>
            <BaseButton
               theme={ btnTheme.darkGreen }
               size={ btnSize.large }
               text='Save'
               onClick={ onSave }
            />
         </div>
      </div>
   );
}

ReorderCourses.propTypes = {
   categories: PropTypes.array,
   onChange: PropTypes.func,
   onSave: PropTypes.func,
};

export default ReorderCourses;
