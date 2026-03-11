import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CategorySortableList from 'components/modules/reorderVideos/CategorySortableList';
// import CategoryItem from 'components/modules/reorderVideos/CategorySortableList/CategoryItem';

const CategoriesVideoViewContentEdit = ({
   data, onChange, rename, deleteCategory, getDettachedCourses, detachedCourses, seo, setSeo,
   attach, detach, isVideo, isProgressDetachedCourses, duplicatePlaylist,
}) => {
   return (
      <div className='videoEdit__categories__view'>
         <div className='videoEdit__categories__view__top'>
            <Text
               inner='Category Name'
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
            isCategorySettings={ true }
            seo={ seo }
            setSeo={ setSeo }
            isProgressDetachedCourses={ isProgressDetachedCourses }
            duplicatePlaylist={ duplicatePlaylist }
         />

         {/* <CategoryItem
            isCategorySettings={ true }
            courses={ data[0]?.courses }
            isVideo={ true }
            getItemStyle={ {} }
            item={ data[0] }
            { ...{
               attach,
               detach,
               rename,
               deleteCategory,
               getDettachedCourses,
               detachedCourses,
            } }
         /> */}
      </div>
   );
};

CategoriesVideoViewContentEdit.propTypes = {
   onChange: PropTypes.func,
   data: PropTypes.array,
   rename: PropTypes.func,
   getDettachedCourses: PropTypes.func,
   deleteCategory: PropTypes.func,
   detachedCourses: PropTypes.array,
   detach: PropTypes.func,
   attach: PropTypes.func,
   isVideo: PropTypes.bool,
   seo: PropTypes.object,
   setSeo: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   duplicatePlaylist: PropTypes.func,
};

export default CategoriesVideoViewContentEdit;
