/* eslint-disable camelcase */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import CustomSwitch from 'components/elements/form/CustomSwitch';
import LevelIconsRow from 'components/elements/promotions/gamification/LevelIconsRow';
import UploadInput from 'components/elements/promotions/gamification/UploadInput';
import TextInput from 'components/elements/form/TextInput';
import Select from 'components/elements/form/Select';
import ColorInput from 'components/elements/form/ColorInput';
import TextArea from 'components/elements/form/TextArea';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import group from 'assets/images/promotions/group.png';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const AddBadgeCard = ({
   completed, checked, img, onSaveClick, handleUpdate, currentBadge, selectedCourseId,
   handleChange, onCancelClick, onPreviewClick, addingBadge, handleSelectCourse, courses, freeLessons, changeTab,
}) => {
   const {
      lesson, id, updated_at, ...inputs
   } = currentBadge;
   const coursesForSelectOption = courses.map(course => ({ label: course.name, value: course.id }));
   const freeLessonsForSelectOption = freeLessons.map(freeLesson => ({ label: freeLesson.name, value: freeLesson.id }));
   return (
      <SelectedWrapper>
         <div className='addBadgeCard'>
            <div className='addBadgeCard__header'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner='Choose your badge below'
               />
            </div>
            <CustomSwitch
               firstOption={ { inner: 'From Default', value: 1 } }
               secondOption={ { inner: 'From File', value: 2 } }
               checked={ checked }
               onClick={ changeTab }
               backgroundColor='#fff'
               checkedBackground='#7cb740'
               textColor='#3f4f65'
               checkedTextColor='#fff'
               name='file'
            />
            <div className='m-t-exl'>
               {
                  (checked === 2 && <UploadInput onChange={ handleChange } t img={ completed ? group : img } />)
                  || <LevelIconsRow selected={ currentBadge.badge_src } handleChange={ handleChange } />
               }
            </div>
            <div className='addBadgeCard__form m-t-exl'>
               <div className='addBadgeCard__input'>
                  <TextInput
                     placeholder=''
                     label='Badge Title'
                     name='title'
                     value={ currentBadge.title }
                     onChange={ (name, value) => {
                        if (value.length < 191) {
                           handleChange(name, value);
                        } else if (isPrint('You have reached the character limitation')) {
                           toast.error('You have reached the character limitation');
                        }
                     } }
                     rightLabel={ `${ currentBadge.title.length }/190` }
                     maxlength='191'
                  />
               </div>
               <div className='addBadgeCard__input'>
                  <Select
                     label='Choose Class'
                     icon='TriangleDown'
                     options={ coursesForSelectOption }
                     placeholder={ completed ? 'Choose the Product' : 'Choose the Product' }
                     iconColor='#3f4f65'
                     value={ !addingBadge ? currentBadge.lesson.section.course_id : selectedCourseId }
                     disabled={ !addingBadge }
                     name='course_id'
                     onChange={ (name, value) => handleSelectCourse(value) }
                  />
               </div>
               <div className='addBadgeCard__input'>
                  <Select
                     label='After Lesson'
                     icon='TriangleDown'
                     options={ freeLessonsForSelectOption }
                     placeholder='Choose the Lesson'
                     iconColor='#3f4f65'
                     value={ currentBadge.lesson_id }
                     name='lesson_id'
                     onChange={ handleChange }
                  />
               </div>
               <div className='addBadgeCard__input'>
                  <ColorInput
                     label='Completed Background Color'
                     subLabel=''
                     icon='TriangleDown'
                     name='badge_bg_color'
                     value={ currentBadge.badge_bg_color }
                     onChange={ handleChange }
                  />
               </div>
               <div className='addBadgeCard__input'>
                  <ColorInput
                     label='Completed Button Color'
                     subLabel=''
                     icon='TriangleDown'
                     name='badge_btn_color'
                     value={ currentBadge.badge_btn_color }
                     onChange={ handleChange }
                  />
               </div>
               <div className='addBadgeCard__input'>
                  <TextInput
                     placeholder=''
                     label='Completed Button Text'
                     name='badge_btn_text'
                     rightLabel={ `${ currentBadge.badge_btn_text.length }/190` }
                     value={ currentBadge.badge_btn_text }
                     onChange={ (name, value) => {
                        if (value.length < 191) {
                           handleChange(name, value);
                        } else if (isPrint('You have reached the character limitation')) {
                           toast.error('You have reached the character limitation');
                        }
                     } }
                     maxlength='191'
                  />
               </div>
               <div className='addBadgeCard__input'>
                  <ColorInput
                     label='Completed Button Text Color'
                     subLabel=''
                     icon='TriangleDown'
                     name='badge_btn_text_color'
                     value={ currentBadge.badge_btn_text_color }
                     onChange={ handleChange }
                  />
               </div>
               <div className='addBadgeCard__textarea'>
                  <TextArea
                     label='Success Message'
                     placeholder='Write a success message here'
                     value={ currentBadge.success_message }
                     onChange={ handleChange }
                     name='success_message'
                     maxLength='190'
                  />
               </div>
            </div>
            <div className='addBadgeCard__btnsBlock m-t-exl'>
               <div className='addBadgeCard__btn'>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Cancel'
                     onClick={ onCancelClick }
                  />
               </div>
               <div className='addBadgeCard__btn m-l-l m-r-l'>
                  <BaseButton
                     theme={ btnTheme.lightGreen }
                     size={ btnSize.large }
                     text='Preview'
                     onClick={ onPreviewClick }
                  />
               </div>
               <div className='addBadgeCard__btn btnWrapper'>
                  {addingBadge ? (
                     <BaseButton
                        theme={ btnTheme.darkGreen }
                        size={ btnSize.large }
                        text='Save'
                        className='badge-save'
                        onClick={ onSaveClick }
                     />

                  ) : (
                     <BaseButton
                        theme={ btnTheme.darkGreen }
                        size={ btnSize.large }
                        text='Update'
                        onClick={ () => handleUpdate(id, inputs) }
                     />
                  )

                  }
               </div>
            </div>
         </div>

      </SelectedWrapper>
   );
};

AddBadgeCard.propTypes = {
   completed: PropTypes.bool,
   checked: PropTypes.number,
   img: PropTypes.string,
   handleChange: PropTypes.func,
   onCancelClick: PropTypes.func,
   onPreviewClick: PropTypes.func,
   onSaveClick: PropTypes.func,
   handleUpdate: PropTypes.func,
   getCourses: PropTypes.func,
   getLessons: PropTypes.func,
   currentBadge: PropTypes.object,
   addingBadge: PropTypes.bool,
   handleSelectCourse: PropTypes.func,
   courses: PropTypes.array,
   freeLessons: PropTypes.array,
   selectedCourseId: PropTypes.any,
};

AddBadgeCard.defaultProps = {
   checked: 1,
   img: '',
   courses: [],
   freeLessons: [],
   handleChange: () => {},
   onCancelClick: () => {},
   onPreviewClick: () => {},
   onSaveClick: () => {},
   handleUpdate: () => {},
};

export default AddBadgeCard;
