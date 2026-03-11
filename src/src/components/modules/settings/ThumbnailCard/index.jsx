import React, { useMemo } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
// import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Switch from 'components/elements/form/Switch-new';
import Router from 'routes/router';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Radio from 'components/elements/form/Radio';
import darkThemeThumbnail from 'assets/images/school_dark.png';
import lightThemeThumbnail from 'assets/images/school_light.png';
import ImageSwitch from 'components/modules/imageSwitch';
import { toast } from 'react-toastify';
import { getThemeFonts } from 'utils/StaticData';
import DragAndDropUploadImage from 'components/modules/dragAndDropUploadImage';
import Tooltip from 'components/elements/members/Tooltip';
import { portalId } from 'utils/constants';
import { getCoursesByIds } from 'api';
import isPrint from 'state/modules/designCourse/edit/Error';
import ClassSliderSettings from './ClassSliderSettings';

const fontSizeOptionForSelect = getThemeFonts().map(option => ({ label: option.label, value: option.value }));

const ThumbnailCard = ({
   mainhubSettings, onChange, handleFormSubmit, removeFile, allCourses, putSettingsInProgress,
}) => {
   const themeOptions = [
      { label: 'Light Mode', value: 'light', img: lightThemeThumbnail },
      { label: 'Dark Mode', value: 'dark', img: darkThemeThumbnail },
   ];


   function onRemoveSliderSetting(id) {
      const removeSliderSettings = mainhubSettings.removeSliderSettings || [];
      onChange('removeSliderSettings', [...removeSliderSettings, { type: 'delete', id }]);
   }

   function handlePreview() {
      const courses = mainhubSettings.class_data
         .filter(({ type, course_id: courseId, src }) => (type === mainhubSettings.school_class_type)
          && (courseId && src));
      const courseIds = courses.map(({ course_id: courseId }) => courseId);
      getCoursesByIds(courseIds.join(','))
         .then(({ data: coursesData }) => {
            const previewData = {
               ...mainhubSettings,
               slider_courses: courseIds.reduce((res, courseId) => {
                  const c = courses.find(({ course_id: cid }) => courseId === cid);
                  res.push({
                     course: coursesData.find(({ id }) => courseId === id),
                     src: c.src,
                  });
                  return res;
               }, []),
            };
            const win = window.open(Router.route('OFFERS').getCompiledPath(portalId), '_blank');
            win.previewData = previewData;
         });
   }

   const courses = useMemo(() => {
      return allCourses.map(({ id, name }) => ({ value: id, label: name }));
   }, [allCourses]);

   function handleSave() {
      let hasUnfilledCourse = false;
      let hasUnfilledImage = false;
      mainhubSettings.class_data.forEach(({ src, course_id: courseId }) => {
         if ((src && !courseId)) {
            hasUnfilledCourse = true;
            return true;
         } if (!src && courseId) {
            hasUnfilledImage = true;
         }
         return true;
      }
      );
      let needBannerUpload = false;
      if (mainhubSettings.school_show_banner === 'on' && !mainhubSettings.school_banner_src) {
         needBannerUpload = true;
      }
      if (hasUnfilledImage || hasUnfilledCourse || needBannerUpload) {
         if (hasUnfilledCourse) {
            if (isPrint('Please add a class to the added image')) {
               toast.error('Please add a class to the added image');
            }
         }
         if (hasUnfilledImage) {
            if (isPrint('Please add an image to the selected class')) {
               toast.error('Please add an image to the selected class');
            }
         }
         if (needBannerUpload) {
            if (isPrint('Please Upload An Image For Banner')) {
               toast.error('Please Upload An Image For Banner');
            }
         }
      } else {
         handleFormSubmit('thumbnail');
      }
   }

   return (
      <DynamicWrapper openedHasShadow backColor='#ffffff' openedBackColor='#ffffff' title='Choose theme' isOpen={ true }>
         <div className='thumbnailCard'>
            <ImageSwitch
               options={ themeOptions }
               name='school_theme_mode'
               value={ mainhubSettings.school_theme_mode === 'dark' ? 'dark' : 'light' }
               onChange={ (_, theme) => onChange('school_theme_mode', theme) }
               className='school-theme-switch'
            />
            <div className=' flex m-t-exl'>
               <Text
                  size={ textSize.extraSmall }
                  type={ textType.demiBold }
                  inner='Show Opacity On Header'
                  className='m-r-exs'
                  color='#3f4f65'
               />
               <Switch
                  checked={ mainhubSettings.school_header_opacity === 'on' }
                  onChange={ (name, value) => onChange('school_header_opacity', value ? 'on' : 'off') }
               />
               <Tooltip
                  hintText='This will make your banner darker and bring the title to the forefront.'
                  hintStyle={ { bottom: '26px', top: 'auto', left: '-110px' } }
               />
            </div>
            <div className=' flex m-t-exl'>
               <Text
                  size={ textSize.extraSmall }
                  type={ textType.demiBold }
                  inner='Show/Hide Slider'
                  className='m-r-exs'
                  color='#3f4f65'
               />
               <Switch
                  checked={ mainhubSettings.school_slider_status === 'on' }
                  onChange={ (name, value) => onChange('school_slider_status', value ? 'on' : 'off') }
               />
            </div>
            {mainhubSettings.school_slider_status === 'on'
            && (
               <div className='mainhub__banner' style={ { marginTop: '40px' } }>
                  <div>
                     <div>
                        <Text
                           size={ textSize.medium }
                           type={ textType.bold }
                           inner='Banner Settings'
                           color='#3f4f65'
                           line24
                        />
                     </div>
                     <div className='flex p-t-m'>
                        <div className='flex'>
                           <Text
                              size={ textSize.extraSmall }
                              type={ textType.demiBold }
                              inner='Show Banner'
                              className='m-r-exs'
                              color='#3f4f65'
                           />
                           <Switch
                              checked={ mainhubSettings.school_show_banner === 'on' }
                              onChange={ (name, value) => onChange('school_show_banner', value ? 'on' : 'off') }
                           />
                        </div>
                        {mainhubSettings.school_show_banner === 'on' && (
                           <div className='flex m-l-40'>
                              <Text
                                 size={ textSize.extraSmall }
                                 type={ textType.demiBold }
                                 inner='Show Title'
                                 className='m-r-exs'
                                 color='#3f4f65'
                              />
                              <Switch
                                 checked={ mainhubSettings.school_show_title === 'on' }
                                 onChange={ (name, value) => onChange('school_show_title', value ? 'on' : 'off') }
                              />
                           </div>
                        )}
                     </div>
                  </div>
                  {mainhubSettings.school_show_banner === 'on' && (
                     <div>
                        <DragAndDropUploadImage onChange={ img => onChange('school_banner_src', img) } src={ mainhubSettings.school_banner_src } crop='1920x1080' />
                     </div>
                  )}
                  <div className='m-t-40 flex'>
                     <Text
                        size={ textSize.medium }
                        type={ textType.bold }
                        inner='Choose Class'
                        color='#3f4f65'
                        line24
                     />
                     <Tooltip
                        hintText='Scrolling Banner.'
                        hintStyle={ { width: '120px' } }
                     />
                  </div>
                  <div className='m-t-m' style={ { display: 'flex', marginBottom: '20px' } }>
                     <div style={ { marginRight: '48px' } }>
                        <Radio
                           checked={ mainhubSettings.school_class_type === 'image' }
                           name='yes'
                           labelNode={
                              (
                                 <Text
                                    size={ textSize.extraSmall }
                                    type={ textType.demiBold }
                                    inner='Add 1 class'
                                    color='#3f4f65'
                                 />
                              )
                           }
                           onChange={ () => onChange('school_class_type', 'image') }
                           color={ mainhubSettings.school_class_type === 'image' ? '#7cb740' : '#3f4f65' }
                        />
                     </div>
                     <Radio
                        checked={ mainhubSettings.school_class_type === 'slider' }
                        name='no'
                        labelNode={
                           (
                              <Text
                                 size={ textSize.extraSmall }
                                 type={ textType.demiBold }
                                 inner='Add 4 Classes (Slider)'
                                 color='#3f4f65'
                              />
                           )
                        }
                        className='m-l-m'
                        onChange={ () => onChange('school_class_type', 'slider') }
                        color={ mainhubSettings.school_class_type === 'slider' ? '#7cb740' : '#3f4f65' }
                     />
                  </div>
                  {mainhubSettings.class_data && (
                     <ClassSliderSettings
                        initialClasses={ mainhubSettings.class_data }
                        allCourses={ courses }
                        classType={ mainhubSettings.school_class_type }
                        courseCount={ mainhubSettings.courseCount }
                        putSettingsInProgress={ putSettingsInProgress }
                        onChange={ data => {
                           onChange('class_data', data);
                        } }
                        onRemove={ onRemoveSliderSetting }
                     />
                  )}

               </div>
            )
            }

            {/* <div className='m-t-exs' />
            <ColorInput
               label='Text Color'
               subLabel='This color will be set as the text color for your entire site.'
               withHint
               name='text_color'
               value={ mainhubSettings.text_color }
               onChange={ onChange }
            />
            <div className='m-t-exs' />
            <ColorInput
               label='Header Background Color'
               subLabel='This color will be set as the header background color for your entire site.'
               withHint
               name='header_bg_color'
               value={ mainhubSettings.header_bg_color }
               onChange={ onChange }
            />
            <div className='m-t-exs' />
            <ColorInput
               label='Body Background Color'
               subLabel='This color will be set as the body background color for your entire site.'
               withHint
               name='body_bg_color'
               value={ mainhubSettings.body_bg_color }
               onChange={ onChange }
            />
            <div className='m-t-exs' />
            <ColorInput
               label='Item Background Color'
               subLabel='This color will be set as the item background color for your entire site.'
               withHint
               name='item_bg_color'
               value={ mainhubSettings.item_bg_color }
               onChange={ onChange }
            /> */}
            {/* <div className='m-t-m'>
               <CheckBox
                  filled
                  label={ [<span className='bolderLabel'>Show Thumbnail Image</span>] }
                  name='show_thumbnail_image'
                  onChange={ onChange }
                  checked={ Number(mainhubSettings.show_thumbnail_image) }
               />
            </div>
            { Number(mainhubSettings.show_thumbnail_image) ? (
               <div className='thumbnailImg'>
                  <UploadImg
                     size='1500x300'
                     img={ mainhubSettings.logo }
                     title='Thumbnail Image'
                     removeFile={ (uuid) => removeFile(uuid) }
                     onChange={ (value) => onChange('logo', value) }
                     isThumbnail={ true }
                  />
               </div>
            ) : null}
            <div className='uploadImgs'>
               <UploadImg
                  title='School Logo'
                  height='60px'
                  size='250x60'
                  img={ mainhubSettings.school_logo }
                  isSchoolLogo={ true }
                  removeFile={ (uuid) => removeFile(uuid) }
                  onChange={ (value) => onChange('school_logo', value) }
               />
               <UploadImg
                  title='Favicon'
                  size='60x60'
                  height='60px'
                  img={ mainhubSettings.favicon }
                  isFavicon={ true }
                  removeFile={ (uuid) => removeFile(uuid) }
                  onChange={ (value) => onChange('favicon', value) }
               />
            </div>
           */}
            <div className='m-t-exl'>
               <div className='btnWrapper'>
                  <BaseButton
                     className='siteChanges_preview_button'
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Preview'
                     onClick={ handlePreview }
                     margin
                     style={ { borderRadius: '4px' } }
                  />
               </div>
               <div className='btnWrapper'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Save'
                     onClick={ () => handleSave() }
                     style={ { borderRadius: '4px' } }
                  />
               </div>
            </div>
         </div>
      </DynamicWrapper>
   );
};

ThumbnailCard.propTypes = {
   mainhubSettings: PropTypes.object,
   onChange: PropTypes.func,
   handleFormSubmit: PropTypes.func,
   allCourses: PropTypes.array,
   removeFile: PropTypes.func,
   putSettingsInProgress: PropTypes.bool,
};


export default ThumbnailCard;
