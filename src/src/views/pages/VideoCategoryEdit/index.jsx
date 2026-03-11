import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CategoriesVideoViewContentEdit from './CategoriesVideoViewContentEdit';

const VideoCategoryEdit = ({
   isProgressFiltering, data, onChange, rename, deleteCategory,
   getDettachedCourses, detachedCourses, attach, detach, isVideo, seo, setSeo, isProgressDetachedCourses,
   duplicatePlaylist,
}) => {
   return (
      <div className='videoEdit__categories__content'>
         {isProgressFiltering ? (
            <LoaderSpinner />
         ) : (
            <div className='videoEdit__categories__content__data'>
               <Text
                  inner={ `${ data[0]?.name } Category - Settings` }
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <div className='top'>
                  <CategoriesVideoViewContentEdit
                     getDettachedCourses={ getDettachedCourses }
                     deleteCategory={ deleteCategory }
                     rename={ rename }
                     onChange={ onChange }
                     attach={ attach }
                     detach={ detach }
                     data={ data }
                     detachedCourses={ detachedCourses }
                     isVideo={ isVideo }
                     iscategorySettings={ true }
                     seo={ seo }
                     isProgressDetachedCourses={ isProgressDetachedCourses }
                     setSeo={ setSeo }
                     duplicatePlaylist={ duplicatePlaylist }
                  />
               </div>
            </div>
         )}
      </div>
   );
};

VideoCategoryEdit.propTypes = {
   isProgressFiltering: PropTypes.bool,
   data: PropTypes.array,
   onChange: PropTypes.func,
   rename: PropTypes.func,
   deleteCategory: PropTypes.func,
   getDettachedCourses: PropTypes.func,
   detachedCourses: PropTypes.array,
   attach: PropTypes.func,
   detach: PropTypes.func,
   isVideo: PropTypes.bool,
   seo: PropTypes.object,
   setSeo: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   duplicatePlaylist: PropTypes.func,
};

export default VideoCategoryEdit;
