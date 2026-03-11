import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';
import Tabs from 'components/elements/tabs';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import Info from 'components/elements/messages/info';
import moment from 'moment';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const EventCreateInputs = ({
   inputs, onChange, options, courseId,
}) => {
   const [time, setTime] = useState('');
   const [sendedTime, setSendedTime] = useState('');
   const accessVariants = [
      { value: 'open', key: 'Open' },
      { value: 'private', key: 'Private' },
      { value: 'secret', key: 'Secret' },
   ];
   const locationVariants = [
      { value: 'virtual', key: 'Virtual' },
      { value: 'local', key: 'Local' },
      { value: 'tbd', key: 'TBD' },
   ];
   const platformVariants = [
      { value: 'youtube', key: 'Youtube' },
      { value: 'zoom', key: 'Zoom' },
      { value: 'mmet', key: 'Meet' },
      { value: 'other', key: 'Other' },
   ];
   const repeatVariants = [
      { value: 1, label: 'Yes' },
      { value: 0, label: 'No' },
   ];

   const handleChangeTime = (timeObj, timeStr) => {
      setTime(timeObj);
      setSendedTime(timeStr);
   };

   useEffect(() => { 
      if (sendedTime) {
         onChange('time', sendedTime);
      } else if (inputs.time) {
         const today = moment().format('YYYY-MM-DD');
         const utcDateTime = moment.utc(`${ today } ${ inputs.time }`, 'YYYY-MM-DD HH:mm:ss');
         setTime(utcDateTime.local());
      } else {
         const currentTime = dayjs();
         const timeAfterTwoHours = currentTime.add(2, 'hour');
         setTime(timeAfterTwoHours);
      }
   }, [sendedTime]);

   const disabledHours = () => {
      const currentHour = dayjs().hour();
      return Array.from({ length: currentHour }, (_, i) => i);
   };

   const disabledMinutes = (selectedHour) => {
      if (selectedHour === dayjs().hour()) {
         const currentMinute = dayjs().minute();
         return Array.from({ length: currentMinute }, (_, i) => i);
      }
      return [];
   };

   return (
      <div className='event__create__inputs'>
         {/* <div className='event__create__inputs__tab'>
            <Text
               inner='Event Access'
               type={ types.regularDefault }
               size={ sizes.small }
            />
            <Tabs
               variants={ accessVariants }
               selectedVariant={ inputs.access }
               onSelect={ (value) => onChange('access', value) }
            />
         </div> */}
         <Input
            value={ inputs.date }
            type='date'
            min={ new Date() }
            onChange={ (name, value) => {
               if (!moment().isAfter(value)) {
                  onChange(name, value);
                  return;
               }
               if (isPrint('You cant create a event with this date.')) {
                  toast.error('You cant create a event with this date.');
               }
            } }
            label='Event Date'
            name='date'
         />
         <div className='time__picker__field__wrapper'>
            <Text 
               inner='Event Time'
               style={ {
                  fontSize: '16px',
               } }
            />
            <TimePicker
               style={ {
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '12px',
               } }
               value={ time }
               onChange={ handleChangeTime } 
               disabledHours={ disabledHours }
               disabledMinutes={ disabledMinutes }
            />
         </div>
         <div className='event__create__inputs__selectors'>
            <Input
               label='Event Duration (Hourly)'
               type='number'
               minNumber={ 0 }
               value={ inputs.duration }
               onChange={ onChange }
               name='duration'
            />
            <Select
               options={ repeatVariants }
               value={ inputs.repeat_event_status }
               onChange={ onChange }
               name='repeat_event_status'
               type='select-medium'
               label='Repeat Event Weekly'
            />
         </div>
         <div className='event__create__inputs__tab'>
            <Text
               inner='Location type'
               type={ types.regularDefault }
               size={ sizes.small }
            />
            <Tabs
               variants={ locationVariants }
               selectedVariant={ inputs.location_type }
               onSelect={ (value) => onChange('location_type', value) }
            />
         </div>
         <div className='event__create__inputs__line' />
         {inputs.location_type === 'virtual' && (
            <div className='event__create__inputs__virtual'>
               <div className='event__create__inputs__tab'>
                  <Text
                     inner='Location type'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Tabs
                     variants={ platformVariants }
                     selectedVariant={ inputs.platform }
                     onSelect={ (value) => onChange('platform', value) }
                  />
               </div>
               <Input
                  label='Link'
                  value={ inputs.link }
                  onChange={ onChange }
                  name='link'
                  isHaveCopyButton={ true }
               />
            </div>
         )}
         {inputs.location_type === 'local' && (
            <div className='event__create__inputs__virtual'>
               <Input
                  label='Address'
                  value={ inputs.address }
                  onChange={ onChange }
                  name='address'
               />
               <Input
                  label='Phone'
                  value={ inputs.phone }
                  onChange={ onChange }
                  placeholder='+1'
                  name='phone'
                  helpText='Optional'
               />
            </div>
         )}
         {inputs.location_type === 'tbd' && (
            <div className='event__create__inputs__virtual'>
               <Info
                  title='You can change this status at any time.'
                  isHaveCancel={ false }
               />
            </div>
         )}
         {/* <div className='event__create__inputs__line' />
         {!isOpenMembers ? (
            <TextWithIcon
               iconName='plusSelectorM'
               inner='Add members (Optional)'
               type={ types.regularDefaultSmall }
               size={ sizes.small }
               style={ { color: '#24554E' } }
               onClick={ () => {
                  onChange('course_id', courseId);
                  setIsOpenMembers(true);
               } }
               generalStyles={ {
                  cursor: 'pointer',
               } }
            />
         ) : (
            <div className='room__types__member'>
               <Select
                  type='select-large'
                  label='Add members'
                  placeholder='Select product'
                  value={ inputs.course_id }
                  name='course_id'
                  onChange={ onChange }
                  options={ options }
               />
               <div className='room__types__member__or'>
                  <div className='room__types__member__or__line' />
                  <Text
                     inner='or'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
                  <div className='room__types__member__or__line' />
               </div>
               <Input
                  value={ inputs.email }
                  onChange={ onChange }
                  name='email'
                  label='Enter email address'
               />
            </div>
         )} */}
      </div>
   );
};

EventCreateInputs.propTypes = {
   onChange: PropTypes.func,
   inputs: PropTypes.object,
   courseId: PropTypes.any,
   options: PropTypes.array,
};

export default EventCreateInputs;
