import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CategorySortableList from 'components/modules/reorderCourses/CategorySortableList';

const CategoriesView = ({
   data, onChange, rename, deleteCategory, getDettachedCourses, detachedCourses,
   attach, detach, isVideo,
}) => {
   return (
      <div className='categories__view'>
         <div className='categories__view__top'>
            <Text
               inner='Name'
               type={ types.mediumLarge }
               size={ sizes.small }
            />
         </div>
         <CategorySortableList
            categoryProps={ {
               attach,
               detach,
               rename,
               deleteCategory,
               getDettachedCourses,
               detachedCourses,
            } }
            categories={ data }
            onChange={ onChange }
            isVideo={ isVideo }
         />
      </div>
   );
};

CategoriesView.propTypes = {
   onChange: PropTypes.func,
   data: PropTypes.array,
   rename: PropTypes.func,
   getDettachedCourses: PropTypes.func,
   deleteCategory: PropTypes.func,
   detachedCourses: PropTypes.array,
   detach: PropTypes.func,
   attach: PropTypes.func,
   isVideo: PropTypes.bool,
};

export default CategoriesView;
