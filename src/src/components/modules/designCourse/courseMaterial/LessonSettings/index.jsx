/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
// import TextArea from 'components/elements/form/TextArea';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import CheckBox from 'components/elements/form/CheckBox';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Tooltip from 'components/elements/Tooltip';
import Switch from 'components/elements/form/Switch';
import RadioBox from 'components/elements/form/Radio';
import TooltipDrip from 'components/elements/members/Tooltip';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';

const CustomInput = React.forwardRef(({ placeholder, onClick, value }) => (
   <input
      className='uk-input'
      onClick={ onClick }
      value={ value }
      type='text'
      readOnly={ true }
   />
));
const LessonSettings = ({
   isOpen, currentLesson, handleSave, handleInputChange,
}) => {
   const [dripDate, setDripDate] = useState(currentLesson.drip_date);

   const limitandChangeNumbar = (name, value) => {
      let newValue = value.replace(/\D/, '');
      if (parseInt(value, 10) < 0) {
         newValue = 0;
      }
      handleInputChange(name, newValue, { name: 'lessonSettings' });
   };
   const removeDraft = (name, value) => {
      if (currentLesson.lesson_format === 'zoom' && currentLesson.zoom_meeting) {
         handleInputChange(name, value, { name: 'lessonSettings' });
      } else if (currentLesson.lesson_format !== 'zoom') {
         handleInputChange(name, value, { name: 'lessonSettings' });
      } else if (isPrint('You need to create a meeting to be able to publish the lesson.')) {
         toast.error('You need to create a meeting to be able to publish the lesson.');
      }
   };
   return (
      <DynamicWrapper
         isOpen={ isOpen }
         title='Settings'
         openedBackColor='#ffffff'
         openedHasShadow
      >
         <div className='m-t-l'>
            <CheckBox
               label='Save as a draft'
               name='draft'
               filled
               onChange={ (name, value) => removeDraft(name, value) }
               checked={ currentLesson.draft }
            />
         </div>
         <div className='m-t-l'>
            <CheckBox
               label='Make this a free preview lesson'
               name='is_free_lesson'
               filled
               onChange={ (name, value) => handleInputChange(name, value, { name: 'lessonSettings' }) }
               checked={ currentLesson.is_free_lesson }
            />
         </div>
         {(currentLesson.lesson_format !== 'zoom') && (
            <div className='m-t-l pre-draft'>
               <CheckBox
                  label='Prerequisite lesson'
                  name='prerequisite'
                  filled
                  onChange={ (name, value) => handleInputChange(name, value, { name: 'lessonSettings' }) }
                  checked={ currentLesson.prerequisite }
               />
               <div>
                  <Tooltip hintText='Students will be required to complete any lesson set as prerequisite before they can access the next chapter(s).' isLessonSettings={ true } />
               </div>
            </div>
         )}
         {(currentLesson.lesson_format !== 'zoom' && !currentLesson.prerequisite) && (
            <div className='m-t-l'>
               <CheckBox
                  label='Remove from Prerequisite'
                  name='is_inactive_prerequisite'
                  filled
                  onChange={ (name, value) => handleInputChange(name, value, { name: 'lessonSettings' }) }
                  checked={ currentLesson.is_inactive_prerequisite }
               />
            </div>
         )}
         {(currentLesson.lesson_format === 'audio' || currentLesson.lesson_format === 'video' || currentLesson.lesson_format === 'youtube' || currentLesson.lesson_format === 'vimeo' || currentLesson.lesson_format === 'wistia') && (
            <div className='m-t-l'>
               <CheckBox
                  label='Autoplay'
                  name='autoplay'
                  filled
                  onChange={ (name, value) => handleInputChange(name, value, { name: 'lessonSettings' }) }
                  checked={ currentLesson.autoplay }
               />
            </div>
         )}
         {!currentLesson.is_free_lesson && (
         <>
            <div className='m-t-l flex'>
               <div className='m-r-s'>
                  <Text
                     size={ textSize.extraSmall }
                     type={ textType.normal }
                     inner='Release by Specific Date or Days After Join'
                  />
               </div>
               <Switch
                  checked={ !!currentLesson.is_drip_turned_on }
                  name='is_drip_turned_on'
                  onChange={ (name, value) => handleInputChange(name, value, { name: 'lessonSettings' }) }
                  isCommentPage={ true }
               />
               <TooltipDrip
                  hintText='Choose when to release your course.'
                  style={ { top: '-3px' } }
                  hintStyle={ {
                     bottom: '22px', top: 'auto', left: 'auto', right: '10px',
                  } }
               />
            </div>
            {!!currentLesson.is_drip_turned_on
         && (
         <>
            <div className='lessonSettings__item flex'>
               <div className='drip__radio'>
                  <RadioBox
                     name='drip_days'
                     checked={ currentLesson.drip_type === 'days' }
                     onChange={ () => handleInputChange('drip_type', 'days', { name: 'lessonSettings' }) }
                     label='Drip Days'
                     className='drip_days'
                     color={ currentLesson.drip_type === 'days' ? '#7cb740' : '#c2cedb' }
                  />
                  <RadioBox
                     name='drip_date'
                     checked={ currentLesson.drip_type === 'date' }
                     onChange={ () => handleInputChange('drip_type', 'date', { name: 'lessonSettings' }) }
                     label='Drip Date'
                     className='drip_date'
                     color={ currentLesson.drip_type === 'date' ? '#7cb740' : '#c2cedb' }
                  />
               </div>
            </div>
            <div className='lessonSettings__item' style={ { marginTop: '12px' } }>
               { currentLesson.drip_type === 'days' ? (
                  <TextInput
                     label=''
                     placeholder='0'
                     id='dripDays'
                     name='drip_days'
                     min={ 0 }
                     max={ 1000 }
                     value={ currentLesson.drip_days }
                     type='number'
                     onChange={ (name, value) => {
                        limitandChangeNumbar(name, value);
                     } }
                  />
               ) : null }
               { currentLesson.drip_type === 'date' ? (
                  <div className=' m-r-m flex-1 searchFilter__input'>
                     <DatePicker
                        name='drip_date'
                        selected={ dripDate ? moment(dripDate).toDate() : null }
                        onChange={ (name) => {
                           setDripDate(moment(name).format('YYYY-MM-DD'));
                        } }
                        selectsStart
                        minDate={ moment().toDate() }
                        id='drip_date'
                        customInput={ <CustomInput placeholder='Select Date' /> }
                     />
                  </div>
               ) : null }
            </div>
         </>
         )}
         </>
         )}
         <div className='lessonSettings__buttons'>
            <BaseButton
               theme={ buttonTheme.darkGreen }
               size={ buttonSizes.large }
               text='Save Settings'
               className='save-settings'
               onClick={ () => {
                  handleSave(currentLesson.description ? {
                  // eslint-disable-next-line max-len
                     drip_days: currentLesson.drip_days === null || !currentLesson.drip_days || currentLesson.drip_days < 0 ? 0 : currentLesson.drip_days,
                     drip_date: dripDate || null,
                     draft: currentLesson.draft || false,
                     description: currentLesson.description || '',
                     autoplay: currentLesson.autoplay || false,
                     prerequisite: currentLesson.prerequisite || false,
                     is_drip_turned_on: currentLesson.is_drip_turned_on,
                     drip_type: currentLesson.drip_type,
                     is_free_lesson: currentLesson.is_free_lesson,
                     is_inactive_prerequisite: currentLesson.is_inactive_prerequisite,
                  } : {
                  // eslint-disable-next-line max-len
                     drip_days: currentLesson.drip_days === null || !currentLesson.drip_days || currentLesson.drip_days < 0 ? 0 : currentLesson.drip_days,
                     drip_date: dripDate || null,
                     draft: currentLesson.draft || false,
                     autoplay: currentLesson.autoplay || false,
                     prerequisite: currentLesson.prerequisite || false,
                     is_drip_turned_on: currentLesson.is_drip_turned_on,
                     drip_type: currentLesson.drip_type,
                     is_free_lesson: currentLesson.is_free_lesson,
                     is_inactive_prerequisite: currentLesson.is_inactive_prerequisite,
                  }
                  );
               } }
            />
         </div>
      </DynamicWrapper>
   );
};

LessonSettings.propTypes = {
   isOpen: PropTypes.bool,
   currentLesson: PropTypes.object,
   handleSave: PropTypes.func,
   handleInputChange: PropTypes.func,

};

LessonSettings.defaultProps = {
   isOpen: false,
   currentLesson: {},
};

export default LessonSettings;
