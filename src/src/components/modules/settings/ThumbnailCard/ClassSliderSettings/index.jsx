import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { updateArrayByObjectKey } from 'utils/arrays';
import arrayMove from 'array-move';
import DeleteDialog from 'components/modules/categoryTagEngine/modals/deleteDialog';
import ClassSliderSettingItem from './item';

const SortableItem = sortableElement((props) => <ClassSliderSettingItem { ...props } />);
const SortableContainer = sortableContainer(({ children }) => {
   return <div>{children}</div>;
});

function ClassSliderSettings({
   allCourses, initialClasses, classType, onChange, courseCount, onRemove, putSettingsInProgress,
}) {
   const [classImageData, setClassImageData] = useState(null);
   const [classSliderData, setClassSliderData] = useState(null);
   const [deletingItem, setDeletingItem] = useState(null);

   useEffect(() => {
      if (!putSettingsInProgress) {
         const oneImage = initialClasses.find(({ type }) => type === 'image');
         if (oneImage) {
            setClassImageData(oneImage);
         } else {
            setClassImageData({ type: 'image' });
         }
         const sliderItems = initialClasses
            .filter(({ type }) => type === 'slider');

         let neededItems = 4 - sliderItems.length;
         if (courseCount - sliderItems.length < neededItems) {
            neededItems = courseCount - sliderItems.length;
         }


         const unfilledItems = Array.from({ length: neededItems }, () => ({ type: 'slider' }));
         setClassSliderData([...sliderItems.concat(unfilledItems)].map((obj, index) => ({ ...obj, order: index + 1 })));
      }
   }, [putSettingsInProgress]);

   useEffect(() => {
      if (classImageData) {
         onChange(updateArrayByObjectKey((obj) => obj.type === 'image', initialClasses, classImageData));
      }
   }, [classImageData]);

   useEffect(() => {
      if (classSliderData) {
         const changedObject = classSliderData
            .filter(obj => obj.course_id || obj.src)
            .map((obj, index) => {
               return {
                  id: obj.id,
                  type: 'slider',
                  src: obj.src,
                  course_id: obj.course_id,
                  order: index + 1,
               };
            });
         const finalObject = [...initialClasses.filter(obj => obj.type !== 'slider'), ...changedObject];
         onChange(finalObject);
      }
   }, [classSliderData]);

   function onOneImageChange(key, value) {
      setClassImageData({ ...classImageData, [key]: value });
   }


   function onSliderImageChange(key, value, order) {
      const changedSlide = classSliderData.find(obj => obj.order === order);
      let classData = [...classSliderData];
      if (key === 'course_id') {
         classData = classData.map(slide => {
            if (slide.course_id === value) {
               return { ...slide, course_id: undefined };
            }
            return slide;
         });
         if (classImageData.course_id === value) {
            setClassImageData({ ...classImageData, course_id: undefined });
         }
      }
      setClassSliderData(updateArrayByObjectKey(
         (obj) => obj.order === order, classData, { ...changedSlide, [key]: value })
      );
   }

   function onSortEnd({ oldIndex, newIndex }) {
      const sliderDataClone = [...classSliderData];
      const oldOrder = sliderDataClone[oldIndex].order;
      sliderDataClone[oldIndex].order = sliderDataClone[newIndex].order;
      sliderDataClone[newIndex].order = oldOrder;
      const orderedItems = arrayMove(sliderDataClone, oldIndex, newIndex);
      setClassSliderData(orderedItems);
   }


   function handleRemoveSlide({ order, id }) {
      const Slides = classSliderData.map(slide => {
         if (slide.order !== order) return slide;
         return {
            course_id: undefined, src: undefined, order, type: 'slider',
         };
      });
      if (id) {
         onRemove(id);
      }
      setClassSliderData(Slides);
   }

   function handleRemoveImage() {
      if (classImageData.id) {
         onRemove(classImageData.id);
      }
      setClassImageData({ type: 'image', course_id: undefined, src: undefined });
   }

   function handleItemRemove() {
      if (deletingItem.type === 'slide') {
         handleRemoveSlide(deletingItem);
      } else {
         handleRemoveImage();
      }
   }


   if (!classSliderData || !classImageData) return null;
   const { label: selectedCourse } = allCourses.find(course => course.value === classImageData.course_id) || {};
   return (
      <>
         {classType === 'image' && (
            <ClassSliderSettingItem
               allCourses={ allCourses }
               src={ classImageData.src }
               selectedCourse={ selectedCourse }
               onChange={ onOneImageChange }
               onRemove={ () => setDeletingItem({ type: 'image' }) }
            />
         )}

         {classType === 'slider' && (
            <SortableContainer onSortEnd={ onSortEnd } useDragHandle>
               {
                  classSliderData.map(({
                     course_id: courseId, src, order, id,
                  }, index) => {
                     const { label: selectedSliderCourse } = allCourses.find(course => course.value === courseId) || {};
                     return (
                        <SortableItem
                           index={ index }
                           allCourses={
                              allCourses.filter(course => course.label !== selectedSliderCourse)
                           }
                           key={ order }
                           src={ src }
                           selectedCourse={ selectedSliderCourse }
                           onChange={ (key, value) => onSliderImageChange(key, value, order) }
                           onRemove={ () => setDeletingItem({
                              course_id: courseId, src, order, id, type: 'slide',
                           }) }
                        />
                     );
                  })
               }
            </SortableContainer>
         )}
         <DeleteDialog
            title='Are you sure you want to delete this item?'
            open={ !!deletingItem }
            onClose={ () => setDeletingItem(null) }
            onConfirm={ () => handleItemRemove() }
         />

      </>
   );
}

ClassSliderSettings.propTypes = {
   allCourses: PropTypes.array,
   initialClasses: PropTypes.func,
   onChange: PropTypes.func,
   classType: PropTypes.string,
   courseCount: PropTypes.number,
   onRemove: PropTypes.func,
   putSettingsInProgress: PropTypes.bool,
};

export default ClassSliderSettings;
