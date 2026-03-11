import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import './index.scss';
import moment from 'moment';
import BaseButton, { THEMES as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import timezoneZoom from 'utils/timezoneZoom.json';
import recuringRepeatTypes from 'utils/recuringRepeatDate.json';
import montlyDaysType from 'utils/montlyDaysType.json';
import weekDaysTypes from 'utils/weekDaysTypes.json';
import ZoomMonths from 'utils/ZoomMonths.json';
// import Icon from 'components/elements/Icon';
import Switch from 'components/elements/form/SwitchNew';
import TextInput from 'components/elements/inputNew';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
// import Tooltip from 'components/elements/Tooltip';
import RadioBox from 'components/elements/form/RadioNew';
import { uniqueId } from 'lodash';
import CheckBox from 'components/elements/form/CheckBoxNew';
import DesignCourseDripDate from './DesignCourseDripDate';


const times = [
   { label: 30, value: 30 },
   { label: 60, value: 60 },
   { label: 90, value: 90 },
   { label: 120, value: 120 },
];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function ZoomLessonSettings({
   data, setData, saveZoomSettings,
   id, changeLiveLesson, zoomSettings,
   // saveLesson,
}) {
   const [dateRepeat, setDateRepeat] = useState([]);
   const [isVisiblePassword, setIsVisiblePassword] = useState(false);
   useEffect(() => {
      const nums = [];
      switch (data.recurring_repeat_type) {
         case 1:
            for (let i = 1; i <= 15; i++) {
               nums.push({ label: i, value: i });
            }
            break;
         case 2:
            for (let i = 1; i <= 3; i++) {
               nums.push({ label: i, value: i });
            }
            break;
         default:
            for (let i = 1; i <= 12; i++) {
               nums.push({ label: i, value: i });
            }
            break;
      }
      setDateRepeat(nums);
   }, []);
   const handleChangeInput = (name, value) => {
      setData({
         ...data,
         [name]: value,
      });
      if (name === 'recurring_repeat_type') {
         const nums = [];
         switch (value) {
            case 1:
               for (let i = 1; i <= 15; i++) {
                  nums.push({ label: i, value: i });
               }
               break;
            case 2:
               for (let i = 1; i <= 3; i++) {
                  nums.push({ label: i, value: i });
               }
               break;
            default:
               for (let i = 1; i <= 12; i++) {
                  nums.push({ label: i, value: i });
               }
               break;
         }
         setDateRepeat(nums);
      }
   };
   const handleSetWeekDay = (e) => {
      if (data.weekly_days.includes(weekDays.indexOf(e) + 1)) {
         setData({
            ...data,
            weekly_days: data.weekly_days.filter((item) => item !== weekDays.indexOf(e) + 1),
         });
      } else {
         setData({
            ...data,
            weekly_days: [...data.weekly_days, weekDays.indexOf(e) + 1],
         });
      }
   };

   return (
      <div className='zoomSettings'>
         <div className='zoomSettings__header'>
            <div>
               <Text
                  inner='Zoom Settings'
                  type={ textType.medium }
                  size={ textSize.xxlarge }
               />
            </div>
         </div>
         <div className='zoomSettings__body'>

            {/* <div className='zoom-radios'>
                  <div className='zoom-radios-item'>
                     <RadioBox
                        name='is_webinar'
                        checked={ !data.is_webinar }
                        labelNode={ true }
                        onChange={ (name) => { handleChangeInput(name, false); } }
                        color={ !data.is_webinar ? '#7cb740' : '#c2cedb' }
                     />
                     <Text inner='Meeting' type={ textType.robot_normal } size={ textSize.extraSmall } />
                  </div>
                  <div className='zoom-radios-item'>
                     <RadioBox
                        name='is_webinar'
                        checked={ !!data.is_webinar }
                        labelNode={ true }
                        disabled={ !isBussines }
                        onChange={ (name) => { handleChangeInput(name, true); } }
                        color={ data.is_webinar ? '#7cb740' : '#c2cedb' }
                     />
                     <Text inner='Webinar' type={ textType.robot_normal } size={ textSize.extraSmall } />
                     <Tooltip hineText='Webinar is for Zoom Pro accounts' />
                  </div>
               </div> */}
            <div className='zoom-time'>
               <Text inner='When' type={ textType.robot_normal } size={ textSize.medium } />
               <div className='zoom-time-inputs'>
                  <DesignCourseDripDate
                  //   onCancel={ () => setIsOpenDripModal(false) }
                     date={ new Date(data.start_time) }
                     time={ moment(data.start_time).format('hh:mm A') }
                     onSave={ (newData) => {
                        handleChangeInput('start_time', `${ moment(newData.date).format('YYYY-MM-DD') } ${ newData.time }`);
                        //       setIsOpenDripModal(false);
                     } }
                  />
                  {/* <input type='datetime-local' name='start_time'
                  min={ moment().format('YYYY-MM-DDTHH:mm:ss') } className='zoom-time-input'
                  value={ data.start_time } onChange={ (e) => handleChangeInput(e.target.name, e.target.value) } /> */}
                  <Select
                     placeholder='UTC/GMT + 00:00 Africa/Dakar'
                     iconColor='#3f4f65'
                     label='Time Zone'
                     name='timezone'
                     type='select-medium'
                     value={ data.timezone !== null ? data.timezone : 'Pacific/Midway' }
                     options={ timezoneZoom }
                     onChange={ (name, value) => handleChangeInput(name, value) }
                  />
               </div>
            </div>
            <div className='zoom-time'>
               <Select
                  iconColor='#3f4f65'
                  label='Duration'
                  name='duration'
                  value={ data.duration }
                  options={ times }
                  type='select-medium'
                  onChange={ (name, value) => handleChangeInput(name, value) }
                  helpText='Minutes'
               />
            </div>
            <div className='zoom-recuring'>
               <div className='zoom-recuring-checkbox'>
                  <Switch
                     checked={ !!data.recurring }
                     name='recurring'
                     label='Recurring'
                     onChange={ (name, value) => handleChangeInput(name, value) }
                     isCommentPage={ true }
                  />
               </div>
               {data.recurring && (
                  <div className='zoom-recuring-data'>
                     <Text inner='Repeat Every' className='repeat-text' type={ textType.robot_normal } size={ textSize.medium } />
                     <div className='selects'>
                        {dateRepeat && !!dateRepeat.length && (
                           <Select
                              iconColor='#3f4f65'
                              name='recurring_repeat'
                              value={ data.recurring_repeat }
                              options={ dateRepeat }
                              type='select-medium'
                              onChange={ (name, value) => handleChangeInput(name, value) }
                           />
                        )}
                        <Select
                           iconColor='#3f4f65'
                           name='recurring_repeat_type'
                           value={ data.recurring_repeat_type }
                           options={ recuringRepeatTypes }
                           type='select-medium'
                           onChange={ (name, value) => handleChangeInput(name, value) }
                        />
                     </div>
                     {data.recurring_repeat_type === 2 && (
                        <div className='recuring-occurs-week'>
                           <Text inner='Occurs on' className='recuring-occurs-week-title' type={ textType.robot_normal } size={ textSize.medium } />
                           <div className='recuring-occurs-week-select'>
                              {weekDays.map((e) => {
                                 return (
                                    <div className='recuring-occurs-week-checkbox' key={ uniqueId() }>
                                       <Text
                                          inner={ e }
                                          type={ textType.robot_normal }
                                          size={ textSize.medium }
                                       />
                                       <CheckBox
                                          checked={ data.weekly_days.includes(weekDays.indexOf(e) + 1) }
                                          onChange={ () => handleSetWeekDay(e) }
                                       />
                                       {/* <input type='checkbox'
                                       onChange={ () => handleSetWeekDay(e) }
                                       checked={ data.weekly_days.includes(weekDays.indexOf(e) + 1) } /> */}
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     )}
                     {data.recurring_repeat_type === 3 && (
                        <div className='recuring-occurs-montly'>
                           <Text inner='Occurs on' className='repeat-text' type={ textType.robot_normal } size={ textSize.extraSmall } />
                           <div className='recuring-occurs-montly-days'>
                              <RadioBox
                                 name='monthly_daye_choose'
                                 label='Day of the month'
                                 checked={ !!data.monthly_daye_choose }
                                 labelNode={ true }
                                 onChange={ (name) => { handleChangeInput(name, true); } }
                                 color={ data.monthly_daye_choose ? '#7cb740' : '#c2cedb' }
                              />

                              <Select
                                 iconColor='#3f4f65'
                                 name='monthly_day'
                                 disabled={ !data.monthly_daye_choose }
                                 value={ data.monthly_day }
                                 options={ montlyDaysType }
                                 type='select-medium'
                                 onChange={ (name, value) => handleChangeInput(name, value) }
                              />
                           </div>
                           <div className='recuring-occurs-montly-week-days'>
                              <RadioBox
                                 label='Day of the month'
                                 name='monthly_daye_choose'
                                 checked={ !data.monthly_daye_choose }
                                 onChange={ (name) => { handleChangeInput(name, false); } }
                                 labelNode={ true }
                                 color={ !data.monthly_daye_choose ? '#7cb740' : '#c2cedb' }
                              />
                              <Select
                                 iconColor='#3f4f65'
                                 name='monthly_week'
                                 value={ data.monthly_week }
                                 options={ ZoomMonths }
                                 disabled={ data.monthly_daye_choose }
                                 type='select-medium'
                                 onChange={ (name, value) => handleChangeInput(name, value) }
                              />
                              <Select
                                 iconColor='#3f4f65'
                                 name='monthly_week_day'
                                 disabled={ data.monthly_daye_choose }
                                 value={ data.monthly_week_day }
                                 options={ weekDaysTypes }
                                 type='select-medium'
                                 onChange={ (name, value) => handleChangeInput(name, value) }
                              />
                           </div>
                        </div>
                     )}
                     <div className='end-input'>
                        <TextInput
                           classI='transactions-filter-input'
                           type='date'
                           name='recurring_end_date'
                           value={ new Date(data.recurring_end_date) }
                           onChange={ handleChangeInput }
                           label='End date'
                           isPeriod={ true }
                           min={ moment().add(2, 'days').format('YYYY-MM-DD') }
                           placeholder='Select Date'
                        />
                        {/* <TextInput type='date'
                         name='recurring_end_date' min={ moment().add(2, 'days').format('YYYY-MM-DD') }
                         value={ data.recurring_end_date }
                         onChange={ (e) => handleChangeInput(e.target.name, e.target.value) } /> */}
                     </div>
                  </div>
               )}
            </div>

            <div className='grey__line' />
            <div className='zoom-security'>
               <Text inner='Security' className='repeat-text' type={ textType.robot_normal } size={ textSize.medium } />
               <div className='zoom-security-protection'>
                  <Switch
                     label='Built In Password Protection'
                     checked={ !!data.password_protection }
                     name='password_protection'
                     onChange={ (name, value) => {
                        handleChangeInput(name, value);
                     } }
                     isCommentPage={ true }
                  />
                  {data.password_protection && (
                     <div className='password-input-zoom'>
                        <TextInput
                           type='password'
                           isPassword={ true }
                           placeholder='Type your password'
                           label='Password'
                           name='password'
                           value={ data.password }
                           onChange={ (name, value) => {
                              if (value.length < 191) {
                                 handleChangeInput(name, value);
                              } else if (isPrint('You reached maximum value')) {
                                 toast.error('You reached maximum value');
                              }
                           } }
                        />
                        {/* <div className='password-input-zoom-visiblity' role='presentation' onClick={ () => setIsVisiblePassword(!isVisiblePassword) }>
                           {isVisiblePassword ? <Icon name='PasswordVisible' /> : <Icon name='PasswordHidden' />}
                        </div> */}
                     </div>
                  )}
               </div>
            </div>

            <div className='zoom-buttons'>
               {/* <BaseButton
                  theme={ buttonTheme.grey }
                  size={ buttonSizes.large }
                  text='Cancel'
                  onClick={ () => {
                     DefaultData();
                  } }

               /> */}
               {!id && <div> <Text inner='Save Lesson before creating Live Lesson' className='repeat-text' type={ textType.regularDefaultGrey } size={ textSize.small } /></div>}
               <div>
                  <BaseButton
                     theme={ buttonTheme.darkGreen }
                     size={ buttonSizes.large }
                     // disabled={ uploadedProgress !== 1 }
                     text={ !zoomSettings.id ? 'Create Live Lesson' : 'Update Live Lesson' }
                     disabled={ !id }
                     className='save-zoom-settings'
                     onClick={ () => {
                        saveZoomSettings({ ...data, id, block_id: id });
                        changeLiveLesson(true);
                        //   setIsOpenSettings(false);
                     } }
                  />
               </div>

            </div>
         </div>
      </div>
   );
}

ZoomLessonSettings.propTypes = {
//   setIsOpenSettings: PropTypes.func,
   saveZoomSettings: PropTypes.func,
   // isCreated: PropTypes.bool,
   changeLiveLesson: PropTypes.func,
   data: PropTypes.object,
   // isBussines: PropTypes.bool,
   setData: PropTypes.func,
   id: PropTypes.number,
   zoomSettings: PropTypes.object,
};

export default ZoomLessonSettings;
