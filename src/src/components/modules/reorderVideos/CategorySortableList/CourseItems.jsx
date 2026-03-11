import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from 'components/elements/Icon';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import DeleteModal from 'components/elements/DeleteModal';
import IToolTipNew from 'components/elements/IToolTipNew';
import LessonRight from 'views/pages/DesignCourse/DesingCourseGeneral/DesignCourseGeneralComponents/VideoProgramMediaViewLessons/LessonRight';
import { videoAdminImg } from 'utils/videoImg';
import Playlist from 'components/modules/Playlist';
import IconButton from 'components/elements/buttons/IconButton';
import CategoryMobileMenu from './CategoryMobileMenu';

const getItemStyle = (_, draggableStyle, isAdminVideo) => ({
   userSelect: 'none',
   // styles we need to apply on draggables
   display: 'flex',
   alignItems: 'center',
   padding: isAdminVideo ? '2px 0px' : '12px 0px 12px 7px',
   paddingLeft: isAdminVideo ? '25px' : '0px',
   justifyContent: 'space-between',
   width: '100%',
   // borderTop: '1px solid #F0F2F2',
   ...draggableStyle,
});

const getListStyle = () => ({
   margin: '0.1px 0px',
   border: 'none',
});

export default function CategoryCourses({
   type, subItems, detach, categoryName, isAdminVideo, videoProps, setIsOpenDuplicate,
}) {
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
   const [selectedDeleteId, setSelectedDeleteId] = useState(null);
   const [showMenu, setShowMenu] = useState(false);
   const [menuInfo, setMenuInfo] = useState({});

   const handleChangeDeleteModal = () => {
      setIsOpenDeletePopup(true);
   };

   const handleSetSelectedDeleteId = (id, name) => {
      setSelectedDeleteId({ id, name });
   };

   const handleOpenMenu = (itemInfo) => {
      setShowMenu(prevState => !prevState);
      setMenuInfo(prevState => {
         return {
            ...prevState,
            allowDelete: itemInfo?.allowDelete ? itemInfo.allowDelete : null,
            id: itemInfo?.id ? itemInfo.id : null,
            name: itemInfo?.name ? itemInfo.name : null,
            allowDuplicate: !isAdminVideo && !!itemInfo?.is_playlist,
            isShow: !isAdminVideo,
         };
      });
   };

   return (
      <Droppable droppableId={ type } type='droppableSubItem'>
         {(provided, snapshot) => (

            <div
               ref={ provided.innerRef }
               style={ getListStyle(snapshot.isDraggingOver) }
            >
               {
                  showMenu && (
                     <CategoryMobileMenu
                        handleOpenMenu={ handleOpenMenu }
                        menuInfo={ menuInfo }
                        setIsOpenDuplicate={ setIsOpenDuplicate }
                        handleChangeDeleteModal={ handleChangeDeleteModal }
                        handleSetSelectedDeleteId={ handleSetSelectedDeleteId }
                     />
                  )
               }
               {isOpenDeletePopup && (
                  <DeleteModal
                     title={ `Are you sure you want to delete [${ selectedDeleteId.name }] from [${ categoryName }] category?` }
                     deleteText='Delete'
                     cancelBtnSize='large120'
                     onDelete={ () => {
                        detach(selectedDeleteId.id);
                        setIsOpenDeletePopup(false);
                     } }
                     onCancel={ () => setIsOpenDeletePopup(false) }
                  />
               )}
               {subItems && subItems.map((item, index) => (
                  <>
                     <Draggable key={ item.id } draggableId={ `${ type }_course_${ item.id }` } index={ index }>
                        {(p, s) => (
                           <div
                              style={ isAdminVideo ? { display: 'flex', position: 'relative', cursor: 'pointer' } : { display: 'flex', position: 'relative' } }
                              className={ isAdminVideo ? 'category__products category__products__video' : 'category__products' }
                              onClick={ isAdminVideo ? () => videoProps.goToLesson(item) : null }
                              role='presentation'
                           >
                              <div
                                 ref={ p.innerRef }
                                 { ...p.draggableProps }
                                 style={ getItemStyle(
                                    s.isDragging,
                                    p.draggableProps.style, isAdminVideo

                                 ) }
                                 className='categoryItem__courseItem'
                              >

                                 <div className={ isAdminVideo ? 'categoryItem__courseItem__left__hover' : 'categoryItem__courseItem__left' }>
                                    <span
                                       className='dragHandleIcon'
                                       { ...p.dragHandleProps }
                                    >
                                       <Icon name={ isAdminVideo ? 'Dragdrop' : 'Reorder' } color='#C2CEDB' />

                                    </span>
                                    {!isAdminVideo && <div className='categoryItem__courseItem__arrow'><IconNew name='ArrowM' /></div>}
                                    {!!isAdminVideo && <IconNew name='VideoM' />}
                                    {!isAdminVideo && !item.is_playlist && (
                                       <div style={ { height: '50px' } }>
                                          {((item.thumbnail_image && item.thumbnail_image.includes('/images/defaults/thumbnail.png') && item.picture_src) || (!item.thumbnail_image && !videoAdminImg(item))) ? (
                                             <IconNew name='DefaultImg' />
                                          ) : (
                                             <img src={ item.thumbnail_image || videoAdminImg(item) } className='categoryItem__courseItem__left__image' alt='' />
                                          )}
                                       </div>
                                    )}
                                    {!item.is_playlist && (
                                       <Text
                                          inner={ item.name }
                                          type={ types.regularDefault }
                                          size={ sizes.small_14 }
                                       />
                                    )}
                                    {!isAdminVideo && !!item.is_playlist
                                    && <Playlist playlist={ item } isListing={ true } /> }
                                 </div>
                                 <div className='menu__wrapper' role='presentation' onClick={ () => handleOpenMenu(item) }>
                                    <IconNew name='CategoryMenuEllips' />
                                 </div>
                                 <div className='videoCategory__right__with__duplicate categoryItem__courseItem__right__delete'>
                                    {!isAdminVideo && !!item.is_playlist
                                    && (
                                       <div>
                                          <IconButton
                                             name='AffiliateCopyM'
                                             theme='light'
                                             tooltip='Duplicate to another category'
                                             onClick={ () => setIsOpenDuplicate(item) }
                                          />
                                       </div>
                                    )
                                    }
                                    {!isAdminVideo && (
                                       <div
                                          role='presentation'
                                          onClick={ !item.allowDelete ? () => {} : () => {
                                             setIsOpenDeletePopup(true);
                                             setSelectedDeleteId({ id: item.id, name: item.name });
                                          } }
                                          className='categoryItem__courseItem__right__trash'
                                       >
                                          <IconNew
                                             name='TrashCategoryM'
                                             color={ !item.allowDelete ? 'grey' : '#D12D36' }
                                          />
                                          {!item.allowDelete && (
                                             <IToolTipNew
                                                tooltip='Cannot Delete. Videos and Playlists must always belong to at least one category.'
                                                iconName='ToolTipCategory'
                                                id={ `${ item.id }` } />
                                          )}
                                       </div>
                                    )}
                                 </div>
                                 {isAdminVideo
                                    && (
                                       <LessonRight
                                          lesson={ item }
                                          course={ videoProps.course }
                                          deleteLesson={ videoProps.deleteLesson }
                                          handleSaveLesson={ videoProps.handleSaveLesson }
                                          onSelectLessonSettings={ videoProps.onSelectLessonSettings }
                                          currentSection={ videoProps.currentSection }
                                       />
                                    )
                                 }
                              </div>
                              {p.placeholder}
                           </div>
                        )}
                     </Draggable>
                     {/* {(index !== subItems.length - 1 && subItems.length !== 1) && !isAdminVideo && ( */}
                     <div className='product__line__grey' />
                     {/* )} */}
                  </>
               ))}
               {provided.placeholder}
            </div>
         )}
      </Droppable>
   );
}

CategoryCourses.propTypes = {
   type: PropTypes.string,
   subItems: PropTypes.array,
   categoryName: PropTypes.string,
   detach: PropTypes.func,
   isAdminVideo: PropTypes.bool,
   videoProps: PropTypes.object,
   setIsOpenDuplicate: PropTypes.func,
};
