import React from 'react';
import './index.scss';
import Input from 'components/elements/inputNew';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import categoryImg from 'assets/images/category/category.png';
import CategoriesView from './CategoriesView';

const Categories = ({
   search, setSearch, isProgressFiltering, data, onAdd, onChange, rename, deleteCategory,
   getDettachedCourses, detachedCourses, attach, detach, isVideo,
}) => {
   return (
      <div className='categories__content'>
         {isProgressFiltering ? (
            <LoaderSpinner />
         ) : (
            <>
               <div className='categories__content__data'>
                  <Text
                     inner='Category Information'
                     type={ types.medium160 }
                     size={ sizes.xlarge }
                  />
                  <Input
                     name='search'
                     type='search'
                     onChange={ (name, value) => setSearch(value) }
                     value={ search }
                     placeholder='Search Category Here'
                  />
                  <div className='top'>
                     <div className='top__header'>
                        <Text
                           inner={ `${ data.length } Categories` }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                        <div>
                           <Button
                              iconName='plusNew'
                              theme='primary'
                              size='small14'
                              text='Add New Category'
                              isIconRight={ true }
                              isHidenDiv={ true }
                              onClick={ () => onAdd() }
                              iconColor='#fff'
                           />
                        </div>
                     </div>
                     <CategoriesView
                        getDettachedCourses={ getDettachedCourses }
                        deleteCategory={ deleteCategory }
                        rename={ rename }
                        onChange={ onChange }
                        attach={ attach }
                        detach={ detach }
                        data={ data }
                        detachedCourses={ detachedCourses }
                        isVideo={ isVideo }
                     />
                  </div>
               </div>
               <div className='categories__content__right'>
                  <Text
                     inner='Preview'
                     type={ types.medium160 }
                     size={ sizes.xlarge }
                  />
                  <img src={ categoryImg } alt='' />
               </div>
            </>
         )}
      </div>
   );
};

Categories.propTypes = {
   search: PropTypes.string,
   setSearch: PropTypes.func,
   isProgressFiltering: PropTypes.bool,
   data: PropTypes.array,
   onChange: PropTypes.func,
   rename: PropTypes.func,
   onAdd: PropTypes.func,
   deleteCategory: PropTypes.func,
   getDettachedCourses: PropTypes.func,
   detachedCourses: PropTypes.array,
   attach: PropTypes.func,
   detach: PropTypes.func,
   isVideo: PropTypes.bool,
};

export default Categories;
