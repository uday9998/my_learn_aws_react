import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import moment from 'moment';
import EditorConvertToHTML from 'components/modules/editor';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import ZoomLessonSettings from './ZoomLessonSettings';


const ZoomLesson = ({
   title, src, handleSave, description, setActiveName, handleZoomSettingsSave, zoomSettings, zoomLoader, userZoomType,
}) => {
   const [zoomTitle, setZoomTitle] = useState(title);
   const [zoomDescription, setZoomDescription] = useState(description);
   const [charectersLimit, setCharectersLimit] = useState(11);
   const [copyView, setCopyView] = useState(null);
   const [isCancel, setIsCancel] = useState(false);
   const [isOpenSettings, setIsOpenSettings] = useState(false);
   const [isCreated, setIsCreated] = useState(!!zoomSettings.id);
   useEffect(() => {
      setIsCreated(!!zoomSettings.id);
   }, [zoomSettings]);
   const FormatStarTime = (startTime) => {
      return `${ moment(startTime).format('dddd, DD MMMM YYYY, hh:mm A') } GMT(${ moment(startTime).format('Z') })`;
   };
   function copyCodeToClipboard(text, id) {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setTimeout(
         () => setCopyView(id),
         0
      );
      setTimeout(
         () => setCopyView(null),
         800
      );
   }
   const [data, setData] = useState({
      start_time: moment().format('YYYY-MM-DDTHH:mm:ss'),
      timezone: 'Pacific/Pago_Pago',
      recurring: false,
      recurring_repeat: 1,
      recurring_repeat_type: 1,
      recurring_end_date: moment().add(2, 'days').format('YYYY-MM-DD'),
      weekly_days: [1],
      monthly_day: 31,
      monthly_week_day: 2,
      monthly_week: -1,
      recurring_occurs_montly: 31,
      is_webinar: null,
      monthly_daye_choose: true,
      duration: 30,
      password_protection: false,
      password: '',
   });
   function DefaultData() {
      if (isCreated) {
         const isRecurenc = zoomSettings.settings.recurrence;
         const weekDaysSettings = isRecurenc && isRecurenc.weekly_days ? isRecurenc.weekly_days.split(',').map((e) => Number.parseFloat(e)) : [1];
         setData({
            start_time: zoomSettings.created_at ? moment(zoomSettings.created_at).format('YYYY-MM-DDTHH:mm:ss') : moment().format('YYYY-MM-DDTHH:mm:ss'),
            timezone: zoomSettings.timezone ? zoomSettings.timezone : 'Pacific/Pago_Pago',
            recurring: !!(isRecurenc),
            recurring_repeat: isRecurenc && isRecurenc.repeat_interval ? isRecurenc.repeat_interval : 1,
            recurring_repeat_type: isRecurenc ? isRecurenc.type : 1,
            recurring_end_date: isRecurenc ? moment(isRecurenc.end_date_time).format('YYYY-MM-DD') : moment().add(2, 'days').format('YYYY-MM-DD'),
            weekly_days: weekDaysSettings,
            is_webinar: null,
            monthly_day: isRecurenc && isRecurenc.monthly_day ? isRecurenc.monthly_day : 31,
            monthly_week_day: isRecurenc && isRecurenc.monthly_week_day ? isRecurenc.monthly_week_day : 2,
            monthly_week: isRecurenc && isRecurenc.monthly_week ? isRecurenc.monthly_week : -1,
            recurring_occurs_montly: 31,
            monthly_daye_choose: !!(isRecurenc && isRecurenc.monthly_day),
            duration: zoomSettings.duration ? Number.parseFloat(zoomSettings.duration) : 30,
            password_protection: !!zoomSettings.password,
            password: zoomSettings.password ? zoomSettings.password : '',
         });
      }
   }
   const getCharectersLength = (l) => setCharectersLimit(l);
   useEffect(() => {
      setZoomTitle(title);
      setActiveName(title);
   }, [title, src]);
   useEffect(() => {
      DefaultData();
   }, []);

   const inputRef = useRef(null);

   const onClick = () => {
      if (inputRef && inputRef.current) {
         setZoomDescription(inputRef.current.initialValue);
         inputRef.current.reload();
      }
   };

   const saveLesson = () => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = zoomDescription;
      }
      handleSave({
         name: zoomTitle || 'Live Lesson Title',
         description: zoomDescription || '<p></p>',
         draft: !zoomSettings.id,
         lesson_visiblity: 1,
      });
   };


   return (
      <ItemWrapper>
         {isOpenSettings && (
            <ZoomLessonSettings
               zoomSettings={ zoomSettings }
               DefaultData={ DefaultData }
               isBussines={ userZoomType !== '1' }
               data={ data }
               setData={ setData }
               zoomLoader={ zoomLoader }
               setIsCreated={ setIsCreated }
               isCreated={ isCreated }
               handleZoomSettingsSave={ (inputs) => handleZoomSettingsSave(
                  inputs,
                  {
                     name: zoomTitle || 'Live Lesson Title',
                     description: zoomDescription || '<p></p>',
                     draft: !zoomSettings.id,
                     lesson_visiblity: 1,
                  })
               }
               setIsOpenSettings={ setIsOpenSettings }
            />
         )}
         <div className='zoomLesson'>
            {zoomLoader && (<LoaderSpinner />)}
            <div className='zoomLesson__fields'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ zoomTitle }
                  style={ { marginBottom: '36px' } }
               />
               <div className='zoom-title'>
                  <TextInput
                     placeholder='Live Lesson Title'
                     label='Live Lesson Title'
                     rightLabel={ `${ charectersLimit }/150` }
                     id='zoomTitle'
                     name='zoomTitle'
                     value={ zoomTitle }
                     onChange={ (name, value) => {
                        if (value.length < 151) {
                           setZoomTitle(value);
                           setActiveName(value);
                           getCharectersLength(value.length);
                        } else if (isPrint('You have reached the character limitation')) {
                           toast.error('You have reached the character limitation');
                        }
                     } }
                  />
               </div>
               <DynamicWrapper
                  isOpen={ false }
                  title={ ['Live Lesson Content', <span style={ { color: '#a3a3a3', paddingLeft: '5px', fontStyle: 'italic' } }> optional  </span>] }
                  borderColor='#cddaf1'
                  style={ { marginTop: '24px' } }
               >
                  <div className='zoom_fieldsDescription'>
                     <EditorConvertToHTML
                        onClick={ () => onClick() }
                        ref={ inputRef }
                        description={ description }
                        data={ zoomDescription || '' }
                        isCancel={ isCancel }
                        initial={ description }
                        onChange={ (descriptionDatat) => {
                           setZoomDescription(descriptionDatat);
                        } }
                     />
                  </div>
               </DynamicWrapper>

            </div>
            {isCreated && !(zoomSettings.settings.recurrence && !zoomSettings.settings.occurrences.length) && (
               <div className='zoom-item-content'>
                  <div className='zoom-item-content-left'>
                     <Text
                        type={ textType.bold }
                        size={ textSize.small }
                        inner={
                           zoomSettings.settings.recurrence
                              ? FormatStarTime(zoomSettings.settings.occurrences[0].start_time)
                              : FormatStarTime(zoomSettings.start_time)
                        }
                        style={ { marginBottom: '36px' } }
                     />
                  </div>
                  <div className='zoom-item-content-rigth'>
                     <BaseButton
                        theme={ buttonTheme.lightGreen }
                        size={ buttonSizes.large }
                        text='Copy Link'
                        onClick={ () => {
                           copyCodeToClipboard(zoomSettings.join_url, 'JoinUrl');
                        } }
                     />
                     { copyView === 'JoinUrl'
                     && <div className='copiedText'>Copied</div>
                     }
                     <BaseButton
                        theme={ buttonTheme.darkGreen }
                        size={ buttonSizes.large }
                        text='Start Meeting'
                        className='save-lesson'
                        onClick={ () => window.open(zoomSettings.start_url, '_blank') }
                     />
                  </div>
               </div>
            )}
            <div className='zoomLesson__buttons'>
               <div className='m-r-m cancel__btn'>
                  {((((zoomDescription && zoomDescription.replace(/(\r\n|\n|\r)/gm, '')) === description) || !zoomDescription) && zoomTitle === title) ? null : (
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.large }
                        text='Cancel'
                        onClick={ () => {
                           setZoomTitle(title);
                           setIsCancel(!isCancel);
                           onClick();
                        } }
                     />
                  )}

               </div>

               <div className='m-r-m m-l-m'>
                  <BaseButton
                     theme={ buttonTheme.lightGreen }
                     size={ buttonSizes.large }
                     text='Zoom Settings'
                     onClick={ () => {
                        setIsOpenSettings(true);
                     } }
                  />
               </div>

               <div className='save__cancel__btns'>
                  <BaseButton
                     theme={ buttonTheme.darkGreen }
                     size={ buttonSizes.large }
                     // disabled={ uploadedProgress !== 1 }
                     text='Save'
                     className='save-lesson'
                     onClick={ () => saveLesson() }
                  />
               </div>
            </div>
         </div>
      </ItemWrapper>
   );
};

ZoomLesson.propTypes = {
   title: PropTypes.string,
   src: PropTypes.string,
   handleSave: PropTypes.func,
   description: PropTypes.string,
   handleZoomSettingsSave: PropTypes.func,
   setActiveName: PropTypes.func,
   zoomLoader: PropTypes.bool,
   zoomSettings: PropTypes.object,
   userZoomType: PropTypes.string,
};

export default ZoomLesson;
