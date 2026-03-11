import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Icon from 'components/elements/Icon';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import DeleteModal from 'components/elements/DeleteModal';
import ModalNew from 'components/elements/ModalNew';
import AttachCourse from 'components/modules/reorderCourses/CategorySortableList/AttachCourse';
import Button from 'components/elements/buttons/BaseButtonNew';
import CourseItems from './CourseItems';

const CategoryItem = ({
   provided, snapshot, getItemStyle, item, attach, detach, rename, deleteCategory, getDettachedCourses,
   detachedCourses, courses, isVideo, isAdminVideo, videoProps, index, showSearchBar, showHeader
}) => {
   const [isOpenCourses, setIsOpenCourses] = useState(true);
   const [isOpenRename, setIsOpenRename] = useState(false);
   const [newName, setNewName] = useState('');
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState();
   const [isOpenAttachPopup, setIsOpenAttachPopup] = useState(false);
   const [coursesIds, setCoursesIds] = useState([]);
   
   const isFirstCategory = index === 0;
   
   return (
      <div
         ref={ provided.innerRef }
         { ...provided.draggableProps }
         style={ getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
         ) }
         className='categoryItem'
      >
         {isOpenDeletePopup && (
            <DeleteModal
               title={ `Are you sure you want to delete the [${ item.name }] category?` }
               deleteText='Delete'
               cancelBtnSize='large120'
               onDelete={ () => {
                  deleteCategory(item.id);
                  setIsOpenDeletePopup(false);
               } }
               onCancel={ () => setIsOpenDeletePopup(false) }
            />
         )}
         {isOpenAttachPopup && (
            <ModalNew onCloseModal={ () => setIsOpenAttachPopup(false) }>
               <AttachCourse
                  item={ item }
                  attach={ attach }
                  coursesIds={ coursesIds }
                  setCoursesIds={ setCoursesIds }
                  detachedCourses={ detachedCourses }
                  setIsOpenAttachPopup={ setIsOpenAttachPopup }
                  isVideo={ isVideo }
               />
            </ModalNew>
         )}
         <div className={ isAdminVideo ? 'categoryItem__top categoryItem__top__video' : 'categoryItem__top' }>
            <div className='categoryItem__top__left'>
               {!isAdminVideo && (
                  <div
                     className='categoryItem__top__arrow'
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
               <div className='categoryItem__top__title'>
                  {isOpenRename ? (
                     <div className='categoryItem__top__title__rename'>
                        <IconNew name='RenameCategoryM' />
                        <input
                           className='categoryItem__top__title__input'
                           value={ newName }
                           onChange={ e => setNewName(e.target.value) }
                           placeholder={ item.name }
                        />
                     </div>
                  ) : (
                     <>
                        { !isAdminVideo && (
                           <span
                              className='dragHandleIcon'
                              { ...provided.dragHandleProps }
                           >
                              <Icon name='Reorder' />
                           </span>
                        )}
                        <Text
                           inner={ item.name }
                           size={ isAdminVideo ? sizes.small_14 : sizes.small }
                           type={ types.mediumLarge }

                        />
                     </>
                  )}
               </div>
            </div>
            {!isAdminVideo && (
               <div className='categoryItem__top__right'>
                  {isOpenRename ? (
                     <>
                        <div
                           className='categoryItem__top__right__block'
                           role='presentation'
                           onClick={ () => {
                              setIsOpenRename(false);
                              setNewName('');
                           } }
                        >
                           <IconNew name='CategoryDecline' />
                        </div>
                        <div
                           className='categoryItem__top__right__block'
                           role='presentation'
                           onClick={ () => {
                              if (newName !== item.name) {
                                 rename({
                                    name: newName,
                                    picture_src: item.picture_src,
                                    description: item.description,
                                 }, item.id);
                                 setNewName('');
                              }
                              setIsOpenRename(false);
                           } }
                        >
                           <IconNew name='CategoryAccept' />
                        </div>
                     </>
                  ) : (
                     <>
                        {!item.is_default && (
                           <>
                              <div
                                 className='categoryItem__top__right__block'
                                 role='presentation'
                                 onClick={ () => {
                                    setIsOpenRename(true);
                                    setNewName(item.name);
                                 } }
                              >
                                 <IconNew name='RenameCategoryM' />
                              </div>
                              <div
                                 className='categoryItem__top__right__block'
                                 role='presentation'
                                 onClick={ () => setIsOpenDeletePopup(true) }
                              >
                                 <IconNew name='TrashCategoryM' />
                              </div>
                           </>
                        )}
                     </>
                  )}
               </div>
            )}
         </div>
         <div className='categoryItem__bottom'>
            {isOpenCourses && (
               <CourseItems
                  subItems={ item[courses] }
                  categoryName={ item.name }
                  detach={ (id) => detach(item.id, [id]) }
                  type={ String(item.id) }
                  isAdminVideo={ isAdminVideo }
                  category={ item }
                  videoProps={ videoProps }
                  showSearchBar={showSearchBar !== undefined ? showSearchBar : isFirstCategory}
                  showHeader={showHeader !== undefined ? showHeader : index === 0}
               />
            )}
         </div>
         {!isAdminVideo && (
            <div
               className='categoryItem__add'
            >
               <Button
                  iconName='plusNew'
                  theme='tertiaryGreen'
                  size='xsmall'
                  text='Add Product'
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
   index: PropTypes.number,
   showSearchBar: PropTypes.bool,
   showHeader: PropTypes.bool
};

export default CategoryItem;