import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CategorySortableList from 'components/modules/reorderVideos/CategorySortableList';

const CategoriesVideoViewContent = ({
   data, onChange, rename, deleteCategory, getDettachedCourses, detachedCourses,
   attach, detach, isVideo, removeCategory, duplicatePlaylist,
}) => {
   return (
      <div className='video__categories__view'>
         <div className='video__categories__view__top'>
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
            removeCategory={ removeCategory }
            duplicatePlaylist={ duplicatePlaylist }
         />
      </div>
   );
};

CategoriesVideoViewContent.propTypes = {
   onChange: PropTypes.func,
   data: PropTypes.array,
   rename: PropTypes.func,
   getDettachedCourses: PropTypes.func,
   deleteCategory: PropTypes.func,
   detachedCourses: PropTypes.array,
   detach: PropTypes.func,
   attach: PropTypes.func,
   isVideo: PropTypes.bool,
   removeCategory: PropTypes.func,
   duplicatePlaylist: PropTypes.func,
};

export default CategoriesVideoViewContent;
