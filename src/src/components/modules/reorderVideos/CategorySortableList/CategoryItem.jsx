import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Icon from 'components/elements/Icon';

import DeleteModal from 'components/elements/DeleteModal';
import ModalNew from 'components/elements/ModalNew';
import AttachCourse from 'components/modules/reorderVideos/CategorySortableList/AttachCourse';
import Button from 'components/elements/buttons/BaseButtonNew';
import { useHistory } from 'react-router';
import VideoCategoryItem from '../VideoCategoryItem';
import CourseItems from './CourseItems';
import DuplicateCategory from './DuplicateCategory';

const CategoryItem = ({
   provided, snapshot, getItemStyle, item, attach, detach, rename, deleteCategory, getDettachedCourses,
   detachedCourses, courses, isVideo, isAdminVideo, videoProps, isCategorySettings, seo, setSeo,
   removeCategory, isProgressDetachedCourses, categories, duplicatePlaylist,
}) => {
   const [isOpenCourses, setIsOpenCourses] = useState(true);
   const [categoriesList, setCategoriesList] = useState(categories);
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState();
   const [isOpenAttachPopup, setIsOpenAttachPopup] = useState(false);
   const [isOpenDuplicate, setIsOpenDuplicate] = useState(false);
   const [coursesIds, setCoursesIds] = useState([]);
   const history = useHistory();

   const goToSettings = (id) => {
      history.push(`categories/${ id }/edit`);
   };

   const goToCategory = (link) => {
      history.push(`/portal/membership/${ link }`);
   };

   return (
      <div>
         <div
            ref={ provided.innerRef }
            { ...provided.draggableProps }
            style={ getItemStyle(
               snapshot.isDragging,
               provided.draggableProps.style
            ) }
            className='videoCategoryItem'
         >
            {isOpenDeletePopup && (
               <DeleteModal
                  title={ `Are you sure you want to delete the [${ item.name }] category?` }
                  description='Deleting this category will move its content to the "New Releases" category.'
                  deleteText='Delete'
                  cancelBtnSize='large120'
                  onDelete={ () => {
                     deleteCategory(item.id);
                     setIsOpenDeletePopup(false);
                  } }
                  onCancel={ () => setIsOpenDeletePopup(false) }
               />
            )}
            {isOpenDuplicate && (
               <ModalNew onCloseModal={ () => setIsOpenDuplicate(false) }>
                  <DuplicateCategory
                     item={ item }
                     categoriesList={ categoriesList }
                     coursesIds={ coursesIds }
                     setCoursesIds={ setCoursesIds }
                     setIsOpenDuplicate={ setIsOpenDuplicate }
                     isVideo={ isVideo }
                     currentPlaylist={ isOpenDuplicate }
                     duplicatePlaylist={ duplicatePlaylist }
                  />
               </ModalNew>
            )}
            {isOpenAttachPopup && (
               <ModalNew onCloseModal={ () => setIsOpenAttachPopup(false) }>
                  <AttachCourse
                     item={ item }
                     attach={ attach }
                     isProgressDetachedCourses={ isProgressDetachedCourses }
                     coursesIds={ coursesIds }
                     setCoursesIds={ setCoursesIds }
                     detachedCourses={ detachedCourses }
                     setIsOpenAttachPopup={ setIsOpenAttachPopup }
                     isVideo={ isVideo }
                  />
               </ModalNew>
            )}
            <div className={ isCategorySettings ? 'videoCategoryItem__top__cat' : 'videoCategoryItem__top' }>
               <div className='videoCategoryItem__top__left'>
                  {!isCategorySettings && (
                     <div
                        className='videoCategoryItem__top__arrow'
                        role='presentation'
                        onClick={ () => setIsOpenCourses(!isOpenCourses) }
                     >
                        <span
                           style={ { transform: `rotate(${ isOpenCourses ? '180' : '0' }deg)` } }
                        >
                           <IconNew name='ArrowBottomCategoryM' />
                        </span>
                     </div>
                  )}

                  <div className='videoCategoryItem__top__title'>
                     {!isCategorySettings && (
                        <span
                           className='dragHandleIcon'
                           { ...provided.dragHandleProps }
                        >
                           <Icon name='ReorderDark' />
                        </span>
                     )}
                     <VideoCategoryItem
                        rename={ rename }
                        isCategorySettings={ isCategorySettings }
                        item={ item }
                        goToSettings={ goToSettings }
                        setIsOpenDeletePopup={ setIsOpenDeletePopup }
                        seo={ seo }
                        setSeo={ setSeo }
                        goToCategory={ goToCategory }
                        removeCategory={ removeCategory }
                     />

                  </div>

               </div>

            </div>
            {!isCategorySettings && (
               <div className='videoCategoryItem__bottom'>
                  {isOpenCourses && (
                     <CourseItems
                        subItems={ item[courses] }
                        categoryName={ item.name }
                        detach={ (id) => detach(item.id, [id]) }
                        type={ String(item.id) }
                        isAdminVideo={ isAdminVideo }
                        videoProps={ videoProps }
                        setIsOpenDuplicate={ setIsOpenDuplicate }
                     />
                  )}
               </div>
            )}
         </div>
         {!isCategorySettings && (
            <div
               className='videoCategoryItem__add'
            >
               <Button
                  iconName='plusNew'
                  theme='tertiaryGreen'
                  size='xsmall'
                  text='Add Video Or Playlists'
                  isIconRight={ true }
                  isHidenDiv={ true }
                  onClick={ () => {
                     setIsOpenAttachPopup(true);
                     getDettachedCourses(item.id);
                  } }
                  iconColor='#24554E'
               />
            </div>
         )}
      </div>
   );
};

CategoryItem.propTypes = {
   provided: PropTypes.object,
   snapshot: PropTypes.object,
   item: PropTypes.object,
   getItemStyle: PropTypes.func,
   addProduct: PropTypes.func,
   removeProduct: PropTypes.func,
   rename: PropTypes.func,
   deleteCategory: PropTypes.func,
   getDettachedCourses: PropTypes.func,
   detachedCourses: PropTypes.array,
   attach: PropTypes.func,
   detach: PropTypes.func,
   courses: PropTypes.string,
   isVideo: PropTypes.bool,
   isAdminVideo: PropTypes.bool,
   videoProps: PropTypes.object,
   isCategorySettings: PropTypes.bool,
   seo: PropTypes.object,
   setSeo: PropTypes.func,
   removeCategory: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   categories: PropTypes.array,
   duplicatePlaylist: PropTypes.bool,
};

export default CategoryItem;
