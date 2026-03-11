import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Select from 'components/elements/form/Select';
import ColorInput from 'components/elements/form/ColorInput';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Radio from 'components/elements/form/Radio';
import Switch from 'components/elements/form/Switch-new';
import { getThemeFonts } from 'utils/StaticData';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';

import darkThemeThumbnail from 'assets/images/darkTheme.png';
import lightThemeThumbnail from 'assets/images/lightTheme.png';
import DeleteModalContent from 'views/pages/DesignCourse/courseMaterial/DeleteModalContent';
import Modal from 'components/elements/Modal';
import Tooltip from 'components/elements/members/Tooltip';

import { useParams } from 'react-router';
import TopRatedCourseList, { TopRatedCourseListContainer } from './TopRatedCoursesList';

const fontSizeOptionForSelect = getThemeFonts().map(option => ({ label: option.label, value: option.value }));

const SiteChanges = ({
   handleInternalInputChange, handleSettingsSave, settingsData, courseUrl, lessonId, courses,
}) => {
   const [topRatedCourses, setTopRatedCourses] = useState([]);
   const [courseOptions, setCourseOptions] = useState([]);
   const [deletingRatedCourseId, setDeletingRatedCourseId] = useState(null);
   const [isRatedOn, setIsRatedOn] = useState(settingsData.is_rated_on);

   const topRatedRootRef = useRef(null);
   const topRatedEl = topRatedRootRef && topRatedRootRef.current;
   const isDarkMode = settingsData.theme_name !== 'miestro_light';
   const { id: currentCourseId } = useParams('id');

   function handleAddCourseToTopRated(courseId) {
      const course = courses.find(({ id }) => id === courseId);
      setTopRatedCourses([{ course: course.name, id: course.id }, ...topRatedCourses]);
   }

   function handleRemoveCourseToTopRated(courseId) {
      setTopRatedCourses(topRatedCourses.filter(({ id }) => courseId !== id));
   }

   function handeSortEnd({ oldIndex, newIndex }) {
      const itemsClone = [...topRatedCourses];
      const oldItem = itemsClone[oldIndex];
      const newItem = itemsClone[newIndex];
      itemsClone[oldIndex] = newItem;
      itemsClone[newIndex] = oldItem;
      setTopRatedCourses(itemsClone);
   }

   function handleDeleteStart(id) {
      setDeletingRatedCourseId(id);
   }

   function handlePreview() {
      const win = window.open(`/programs/${ courseUrl }?lesson=${ lessonId }&preview=success`, '_blank');
      const themeName = settingsData.theme_name;
      const isRatedChecked = settingsData.is_rated_on;
      const themesParts = [
         {
            key: 'item_button_color',
            value: settingsData.item_button_color,
         },
         {
            key: 'theme_font',
            value: settingsData.theme_font,
         },
      ];
      const ratedCourses = courses
         .filter(({ id }) => settingsData.rated_ids.includes(id))
         .map(({
            id, description, name, picture_src: pictureSrc, thumbnail_image: thumbImage, url,
         }) => ({
            id, description, name, picture_src: pictureSrc, thumbnail_image: thumbImage, url,
         }));
      win.previewTheme = {
         themeName, themesParts, ratedCourses, isRatedChecked,
      };
   }

   useEffect(() => {
      if (!(!settingsData.rated_courses || !courses)) {
         setTopRatedCourses(settingsData.rated_courses.map(course => ({ id: course.id, course: course.name })));
         setCourseOptions(courses.filter(({ id }) => id !== +currentCourseId).map(({ id, name }) => ({ value: id, label: name })));
      }
   }, [settingsData.rated_courses, courses]);

   useEffect(() => {
      const ratedIdis = topRatedCourses.map(course => course.id);
      handleInternalInputChange('rated_ids', ratedIdis);
   }, [topRatedCourses]);

   useEffect(() => {
      handleInternalInputChange('is_rated_on', isRatedOn);
   }, [isRatedOn]);

   useEffect(() => {
      setIsRatedOn(!!settingsData.is_rated_on);
   }, [settingsData.is_rated_on]);


   return (
      <ItemWrapper>
         <div className='siteChanges'>
            <Text type={ txtType.bold } inner='Choose Theme' size={ txtSizes.medium } />
            <div className='flex justify-between m-t-m'>
               <div className='light_mode'>
                  <Radio
                     checked={ !isDarkMode }
                     name='miestro_theme_light'
                     className='theme_radio'
                     labelNode={
                        (
                           <Text
                              size={ txtSizes.extraSmall }
                              type={ txtType.demiBold }
                              inner='Light Mode'
                              color='#3f4f65'
                           />
                        )
                     }
                     color={ !isDarkMode ? '#7cb740' : '#3f4f65' }
                     onChange={ () => handleInternalInputChange('theme_name', 'miestro_light') }
                  />
                  <div
                     className='m-t-m'
                     role='presentation'
                     onClick={ () => {
                        handleInternalInputChange('theme_name', 'miestro_light');
                     } }
                  >
                     <img
                        src={ lightThemeThumbnail }
                        alt='miestro-light'
                        className='miestro_theme_preview_img'
                     />
                  </div>
               </div>
               <div className='dark_mode'>
                  <Radio
                     checked={ isDarkMode }
                     name='miestro_theme_dark'
                     className='theme_radio'
                     labelNode={
                        (
                           <Text
                              size={ txtSizes.extraSmall }
                              type={ txtType.demiBold }
                              inner='Dark Mode'
                              color='#3f4f65'
                           />
                        )
                     }
                     color={ isDarkMode ? '#7cb740' : '#3f4f65' }
                     onChange={ () => handleInternalInputChange('theme_name', 'miestro_dark') }
                  />
                  <div
                     className='m-t-m'
                     role='presentation'
                     onClick={ () => {
                        handleInternalInputChange('theme_name', 'miestro_dark');
                     } }
                  >
                     <img
                        src={ darkThemeThumbnail }
                        alt='miestro-dark'
                        className='miestro_theme_preview_img'
                     />
                  </div>
               </div>
            </div>

            <div className='w-full m-t-m siteChanges__input'>
               <ColorInput
                  label='Primary Color'
                  subLabel='This will be the primary brand color for your Watch Room.'
                  placeholder='#fffff'
                  name='item_button_color'
                  labelFont='demiBold'
                  value={ settingsData.item_button_color }
                  onChange={ (key, value) => handleInternalInputChange(key, value) }
                  hasTooltip
               />
            </div>
            <div className='w-full m-t-m'>
               <Select
                  label='Theme Font'
                  placeholder='Choose Font'
                  options={ fontSizeOptionForSelect }
                  iconColor='#3f4f65'
                  name='theme_font'
                  value={ settingsData.theme_font }
                  onChange={ (key, value) => handleInternalInputChange(key, value) }
                  fontStyles={ true }
               />
            </div>

            <div className=' flex m-t-exl'>
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.demiBold }
                  inner='Add Top Rated Section'
                  color='#3f4f65'
                  className='m-r-exs'
                  line24
               />
               <Switch
                  checked={ isRatedOn }
                  onChange={ () => setIsRatedOn(prev => !prev) }
               />
               <Tooltip
                  hintText='This will show a slider of Top Rated courses below the lessons in your Watch Room.'
                  hintStyle={ { bottom: '28px', top: 'auto', left: '-110px' } }
               />
            </div>
            {courseOptions && courseOptions.length > 0 && isRatedOn && (
               <div className='w-full m-t-m'>
                  <Select
                     label='Choose Class'
                     placeholder='Choose Class'
                     options={ courseOptions }
                     iconColor='#3f4f65'
                     color='#7cb740'
                     name='top-courses'
                     multiple
                     selectedValues={ settingsData.rated_ids }
                     onChange={ (key, value) => {
                        if (settingsData.rated_ids.includes(value)) {
                           handleRemoveCourseToTopRated(value);
                        } else {
                           handleAddCourseToTopRated(value);
                        }
                     } }
                  />
               </div>
            )}

            {isRatedOn && (
               <TopRatedCourseListContainer pressDelay={ 200 } helperClass='dragIten' helperContainer={ topRatedEl } onSortEnd={ handeSortEnd }>
                  <div ref={ topRatedRootRef }>
                     <TopRatedCourseList items={ topRatedCourses } onDeleteStart={ handleDeleteStart } />
                  </div>
               </TopRatedCourseListContainer>
            )}

            {/* <div className='w-full m-t-m siteChanges__input'>
               <ColorInput
                  label='Site color'
                  subLabel='This color will be set as the main color for your entire student room.'
                  placeholder='#fffff'
                  name='item_button_color'
                  value={ settingsData.item_button_color }
                  onChange={ (key, value) => handleInternalInputChange(key, value) }
               />
            </div> */}
            <div className='siteChanges__buttons m-t-exl w-full'>
               { courseUrl && lessonId && (
                  <BaseButton
                     className='siteChanges_preview_button'
                     theme={ btnType.grey }
                     size={ btnSize.large }
                     text='Preview'
                     onClick={ handlePreview }
                     margin
                  />
               ) }
               <BaseButton
                  theme={ btnType.darkGreen }
                  size={ btnSize.large }
                  text='Save'
                  className='save-detalis'
                  onClick={ () => handleSettingsSave('site-changes', topRatedCourses.map(course => course.id)) }
               />
            </div>
         </div>
         {deletingRatedCourseId && (
            <Modal
               blurColor='rgba(63, 79, 101, 0.6)'
               contentBgColor='#fff'
               contentPosition={ window.innerWidth < 1024 ? 'full-screen' : 'center' }
               closeOnClickOutside={ true }
               onClose={ () => setDeletingRatedCourseId(null) }
            >
               <DeleteModalContent
                  onDelete={ () => {
                     handleRemoveCourseToTopRated(deletingRatedCourseId);
                     setDeletingRatedCourseId(null);
                  } }
                  onCancel={ () => setDeletingRatedCourseId(null) }
                  title='Delete Lesson'
                  content='Are you sure you want to delete this lesson?'
                  acceptText='Yes'
                  cancelText='No'
               />
            </Modal>
         )}
      </ItemWrapper>
   );
};

SiteChanges.propTypes = {
   handleInternalInputChange: PropTypes.func,
   handleSettingsSave: PropTypes.func,
   settingsData: PropTypes.object,
   courseUrl: PropTypes.string,
   lessonId: PropTypes.number,
   courses: PropTypes.array,
};

export default SiteChanges;
