import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from 'components/elements/Icon';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import DeleteModal from 'components/elements/DeleteModal';
import IToolTipNew from 'components/elements/IToolTipNew';
import LessonRight from 'views/pages/DesignCourse/DesingCourseGeneral/DesignCourseGeneralComponents/VideoProgramMediaViewLessons/LessonRight';
import { videoAdminImg } from 'utils/videoImg';

const getItemStyle = (_, draggableStyle, isAdminVideo) => ({
   userSelect: 'none',
   // styles we need to apply on draggables
   display: 'flex',
   alignItems: 'center',
   padding: isAdminVideo ? '2px 0px' : '12px 0px',
   paddingLeft: '8px',
   justifyContent: 'space-between',
   width: '100%',
   // borderTop: '1px solid #F0F2F2',
   ...draggableStyle,
});

const getListStyle = () => ({
   margin: '10px 0px',
   border: 'none',
});

export default function CategoryCourses({
   type, subItems, detach, categoryName, isAdminVideo, videoProps, category,
}) {
   const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
   const [selectedDeleteId, setSelectedDeleteId] = useState(null);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <Droppable droppableId={ type } type='droppableSubItem'>
         {(provided, snapshot) => (

            <div
               ref={ provided.innerRef }
               style={ getListStyle(snapshot.isDraggingOver) }
            >
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
               {subItems && subItems.map((item, index) => {
                  if (!item.is_playlist) {
                     return (
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
                                          <div>
                                             {!!isAdminVideo && <IconNew name='VideoM' />}
                                          </div>
                                          {!isAdminVideo && (
                                             <div style={ { height: '50px' } }>
                                                {((item.thumbnail_image && item.thumbnail_image.includes('/images/defaults/thumbnail.png') && item.picture_src) || (!item.thumbnail_image && !videoAdminImg(item))) ? (
                                                   <IconNew name='DefaultImg' />
                                                ) : (
                                                   <img src={ item.thumbnail_image || videoAdminImg(item) } className='categoryItem__courseItem__left__image' alt='' />
                                                )}
                                             </div>
                                          )}
                                          <div className='video__title__wrapper'>
                                             <Text
                                                inner={ item.name.length > 70 ? `${ item.name.slice(0, 70) }...` : item.name }
                                                type={ types.regularDefault }
                                                size={ isAdminVideo ? sizes.small_14 : sizes.small }
                                             />
                                          </div>
                                       </div>
                                       {!isAdminVideo && (
                                          <div
                                             role='presentation'
                                             onClick={ !item.allowDelete && categoryName === 'New Releases' ? () => {} : () => {
                                                setIsOpenDeletePopup(true);
                                                setSelectedDeleteId({ id: item.id, name: item.name });
                                             } }
                                             className='categoryItem__courseItem__right__trash'
                                          >
                                             <IconNew
                                                name='TrashCategoryM'
                                                color={ !item.allowDelete && categoryName === 'New Releases' ? 'grey' : '#D12D36' }
                                             />
                                             { categoryName === 'New Releases' && !item.allowDelete && (
                                                <IToolTipNew
                                                   tooltip='The course should be connected with at least one category'
                                                   iconName='ToolTipCategory'
                                                   id={ `${ item.id }` } />
                                             )}
                                          </div>
                                       )}
                                       {isAdminVideo
                                    && (
                                       <LessonRight
                                          lesson={ item }
                                          category={ category }
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
                           {
                           // (index !== subItems.length - 1 && subItems.length !== 1) &&
                              !isAdminVideo && (
                                 <div className='product__line__grey' />
                              )}
                        </>
                     );
                  }
                  return null;
               })}
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
   category: PropTypes.object,
};
