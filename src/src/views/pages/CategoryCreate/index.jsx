import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import IconNew from 'components/elements/iconsSize';
import AttachCourse from 'components/modules/reorderCourses/CategorySortableList/AttachCourse';
import categoryImg from 'assets/images/category/category.png';
import categoryDefault from 'assets/images/category/categoryDefault.png';

const CategoryCreate = ({
   categories,
   getDettachedCourses, handleGetAllFrontCourses,
   detachedCourses, setCourses,
   attach, onCreate, isProgressDetachedCourses, isVideo,
}) => {
   const [addNewCategory, setAddNewCategory] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState({});

   const [name, setName] = useState('');
   const [coursesIds, setCoursesIds] = useState([]);
   const handleInputChange = (value) => {
      setName(value);
   };
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);

         setTimeout(() => {
            setLocalErrorMessages(prev => prev.filter(msg => msg !== message));
         }, 1500);
      }
   };

   const onCancel = () => {
      setAddNewCategory(false);
      setName('');
      setCourses([]);
      setSelectedCategory({});
   };

   const handleAddNewCategory = () => {
      setAddNewCategory(true);
      setCoursesIds([]);
      handleGetAllFrontCourses();
   };

   const handleOncreate = async (coursesIds) => {
      const { data: { errors = {} } = {} } = await onCreate({ name, course_ids: coursesIds }) || {};

      const { 0: linkErrMessage = [] } = Object.values(errors);

      if (linkErrMessage.length) {
         addLocalErrorMessage(linkErrMessage[0]);
         return true;
      }
   };

   const setSelectedCategoryFunc = (category) => {
      setSelectedCategory(category);
      const element = document.getElementById('categoryItem__attach__modal__create');
      const elementEmpty = document.getElementById('categoryItem__attach__modal__create__empty');
      setTimeout(() => {
         if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
         } else if (elementEmpty) {
            elementEmpty.scrollIntoView({ behavior: 'smooth' });
         }
      }, 0);
   };

   return (
      <div className='category_creation__form'>
         <div className='category_creation__form__left'>
            <Text
               inner='Category Information'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            {(addNewCategory && (
               <>
                  <Input
                     errorMessages={ localErrorMessages }
                     label='Category Name'
                     name='name'
                     value={ name }
                     onChange={ (name, value) => handleInputChange(value) }
                     placeholder='Enter Category Name'
                  />
               </>
            )
            )}
            {(!addNewCategory && (
               <div className='category_creation__form__types'>
                  <Text
                     inner='Select from the list or create your own category'
                     type={ types.regularDefault }
                     size={ sizes.small14 }
                  />
                  <div className='category_creation__form__types__content'>
                     <div
                        className='category_creation__form__types__content__single__plus'
                        onClick={ () => handleAddNewCategory() }
                        role='presentation'
                     >
                        <IconNew name='plusL' />
                        <Text
                           inner='Create New Category'
                           type={ types.medium150 }
                           size={ sizes.xsmall }
                        />
                     </div>
                     {categories && !!categories.length && categories.map((category) => {
                        return (
                           <div
                              className='category_creation__form__types__content__single'
                              key={ category.id }
                              onClick={ () => {
                                 getDettachedCourses(category.id);
                                 setSelectedCategoryFunc(category);
                              } }
                              role='presentation'
                              style={ category.id === selectedCategory.id ? { background: 'rgb(232, 242, 241)' } : {} }
                           >
                              {!!category.is_default && <IconNew name={ `${ category.picture_src }L` } />}
                              {!category.is_default && <img src={ categoryDefault } alt='categoryDefault' />}
                              <Text
                                 inner={ category.name }
                                 type={ types.medium150 }
                                 size={ sizes.xsmall }
                              />
                           </div>
                        );
                     })

                     }

                  </div>

               </div>
            ))}
            {(selectedCategory.id || addNewCategory) && (
               <AttachCourse
                  item={ selectedCategory }
                  setSelectedCategory={ setSelectedCategory }
                  attach={ attach }
                  onCreate={ handleOncreate }
                  setInputs={ handleInputChange }
                  isProgressDetachedCourses={ isProgressDetachedCourses }
                  detachedCourses={ detachedCourses }
                  setIsOpenAttachPopup={ () => {} }
                  coursesIds={ coursesIds }
                  setCoursesIds={ setCoursesIds }
                  isCreate={ true }
                  onCancel={ onCancel }
                  isCreateCategory={ addNewCategory }
                  isSelectedCategory={ !!selectedCategory.id && !addNewCategory }
                  isVideo={ isVideo }
               />
            )}
            {!addNewCategory && (<div id='categoryItem__attach__modal__create__empty' />)}
         </div>
         <div className='category_creation__form__right'>
            <Text
               inner='Preview'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <img src={ categoryImg } alt='' />
         </div>
      </div>
   );
};

CategoryCreate.propTypes = {
   categories: PropTypes.array,
   getDettachedCourses: PropTypes.func,
   handleGetAllFrontCourses: PropTypes.func,
   detachedCourses: PropTypes.array,
   setCourses: PropTypes.func,
   attach: PropTypes.func,
   onCreate: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   isVideo: PropTypes.bool,
};

export default CategoryCreate;
