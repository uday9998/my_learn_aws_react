import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { uniqueId } from 'lodash';
import { videoAdminImg } from 'utils/videoImg';
import IconNew from 'components/elements/iconsSize';

const AttachCourse = ({
   item, attach,
   detachedCourses, setIsOpenAttachPopup,
   isCreate, isSelectedCategory,
   setSelectedCategory, onCreate, onCancel,
   isCreateCategory, coursesIds, setCoursesIds,
   isProgressDetachedCourses, isVideo,
}) => {
   const [isSelectedAll, setIsSelectedAll] = useState(false);
   const handleCheck = (id) => {
      if (coursesIds.includes(id)) {
         setCoursesIds(coursesIds.filter((c) => c !== id));
         return;
      }
      setCoursesIds([...coursesIds, id]);
   };

   const handleSelectAll = () => {
      const detachedCoursesIds = detachedCourses.map(course => course.id);
      setCoursesIds([...detachedCoursesIds]);
      if (isSelectedAll) {
         setCoursesIds([]);
      }
      setIsSelectedAll(!isSelectedAll);
   };

   const handleAdd = async () => {
      if (isSelectedCategory || !isCreate) {
         attach(item.id, coursesIds);
      } else {
         const isHaveError = await onCreate(coursesIds);

         if (isHaveError) return;
      }

      setCoursesIds([]);
      setIsOpenAttachPopup(false);
      onCancel();
   };

   return (

      <div className={ isCreate ? 'categoryItem__attach__modal categoryItem__attach__modal__create' : 'categoryItem__attach__modal' } id={ isCreate ? 'categoryItem__attach__modal__create' : '' }>
         {!isCreate && (
            <div className='categoryItem__attach__modal__top'>
               <Text
                  inner={ `Add  ${ isVideo ? 'Video' : 'Product' } To Category` }
                  type={ types.medium }
                  size={ sizes.xxlarge }
               />
               <Text
                  inner={ `You can add same  ${ isVideo ? 'videos' : 'products' } to different categories` }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
            </div>
         )}
         {!!isCreate && (
            <div className='categoryItem__attach__modal__top__create'>
               <Text
                  inner={ `Select which  ${ isVideo ? 'videos' : 'products' } will be in this category` }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <div>
                  <BaseButton
                     iconName=''
                     theme='tertiaryGreen'
                     size='small'
                     text={ !isSelectedAll ? 'Select All' : 'Deselect All' }
                     isIconRight={ false }
                     isHidenDiv={ true }
                     onClick={ () => handleSelectAll() }
                  />
               </div>
            </div>
         )}
         {!isProgressDetachedCourses && (
            <div className='categoryItem__attach__modal__courses'>
               {
                  detachedCourses && detachedCourses.length > 0 ? (
                     detachedCourses.map((course) => {
                        return (
                           <div className='categoryItem__attach__modal__course' key={ uniqueId() }>
                              <CheckBox
                                 checked={ coursesIds.includes(course.id) }
                                 onChange={ () => handleCheck(course.id) }
                              />
                              <div className='categoryItem__attach__modal__course__right'>
                                 <div className='categoryItem__attach__modal__course__image'>
                                    {(!course.thumbnail_image && !videoAdminImg(course)) || course.thumbnail_image.includes('thumbnail.png') ? <IconNew name='DefaultImg' />
                                       : <img src={ course.thumbnail_image || videoAdminImg(course) } alt='' />}
                                 </div>
                                 <Text
                                    inner={ course.name }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                 />
                              </div>
                           </div>
                        );
                     })
                  ) : (
                     <Text
                        inner={ `You don't have any  ${ isVideo ? 'videos' : 'published products' } yet` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  )
               }
            </div>
         )}
         {(!isCreate || isSelectedCategory || isCreateCategory) && (
            <div className='categoryItem__attach__modal__bottom'>
               <BaseButton
                  text='Cancel'
                  theme={ themes.secondary }
                  size={ btnSizes.large120 }
                  onClick={ () => {
                     setCoursesIds([]);
                     setIsOpenAttachPopup(false);
                     setSelectedCategory({});
                     onCancel();
                  } }
               />
               <BaseButton
                  text={ (isSelectedCategory || isCreateCategory) ? 'Add Category' : 'Add' }
                  size={ btnSizes.large120 }
                  disabled={ isCreateCategory ? false : coursesIds.length === 0 }
                  onClick={ handleAdd }
               />
            </div>
         )}
      </div>

   );
};

AttachCourse.defaultProps = {
   setSelectedCategory: () => {},
   attach: () => {},
   setIsOpenAttachPopup: () => {},
   item: {},
   detachedCourses: [],
   isSelectedCategory: false,
   isCreate: false,
   onCreate: () => {},
   onCancel: () => {},
   isCreateCategory: false,
   coursesIds: [],
   setCoursesIds: () => {},
   isProgressDetachedCourses: false,
};

AttachCourse.propTypes = {
   item: PropTypes.object,
   setIsOpenAttachPopup: PropTypes.func,
   detachedCourses: PropTypes.array,
   attach: PropTypes.func,
   isCreate: PropTypes.bool,
   isSelectedCategory: PropTypes.bool,
   setSelectedCategory: PropTypes.func,
   onCreate: PropTypes.func,
   onCancel: PropTypes.func,
   isCreateCategory: PropTypes.bool,
   coursesIds: PropTypes.array,
   setCoursesIds: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   isVideo: PropTypes.bool,
};

export default AttachCourse;
