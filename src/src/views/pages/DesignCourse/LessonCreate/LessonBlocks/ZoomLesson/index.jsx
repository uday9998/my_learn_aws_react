/* eslint-disable max-len */
import React, {
   useState, useEffect, useRef,
} from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
// import EditorConvertToHTML from 'components/modules/editor';
// import isPrint from 'state/modules/designCourse/edit/Error';
// import { toast } from 'react-toastify';
// import LoaderSpinner from 'components/elements/LoaderSpiner';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import TextInput from 'components/elements/inputNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import * as operations from 'state/modules/settings/operations';
// import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/settings/selectors';
import withLoading from 'utils/withLoading';
import TextArea from 'components/elements/form/CustomTextArea';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import SimpleStatus from 'components/elements/SimpleStatus';
// import { Calendar } from 'components/elements/CalendarNew';
import TimerDesign from 'components/elements/Timer';
import GoogleCalendarButton from 'components/elements/buttons/GoogleCalendarButton';
import ChangeButton from 'components/elements/buttons/ChangeButton';
// import momentTimezone from 'moment-timezone';
import ZoomLessonSettings from './ZoomLessonSettings';

const ZoomLoading = withLoading('div');

const ZoomLesson = ({
   zoomSettings = {}, zoomLoader,
   onChange, block,
   getSettings, integrationSettings, getSettingsInProgress, firstZoomLesson, addIntegration, saveZoomSettings,
   saveLesson,
}) => {
   const [zoomKeys, setZoomKeys] = useState({ api_key: '', secret_key: '' });
   const [changeLiveLesson, setChangeLiveLesson] = useState(!!zoomSettings.id);
   useEffect(() => {
      if (Object.keys(integrationSettings).length === 0 && !getSettingsInProgress
      && firstZoomLesson.min === firstZoomLesson.index) {
         getSettings();
      }
   }, []);
   // const [zoomTitle, setZoomTitle] = useState(title);
   // const [zoomDescription, setZoomDescription] = useState(description);
   // const [charectersLimit, setCharectersLimit] = useState(11);
   // const [copyView, setCopyView] = useState(null);
   // const [isCancel, setIsCancel] = useState(false);
   // const [isOpenSettings, setIsOpenSettings] = useState(false);
   const [isCreated, setIsCreated] = useState(!!zoomSettings.id);

   const FormatStarTime = (startTime) => {
      return `${moment(startTime).format('dddd, DD MMMM YYYY, hh:mm A')} GMT(${moment(startTime).format('Z')})`;
   };
   // function copyCodeToClipboard(text, id) {
   //    const el = document.createElement('textarea');
   //    el.value = text;
   //    document.body.appendChild(el);
   //    el.select();
   //    document.execCommand('copy');
   //    document.body.removeChild(el);
   //    setTimeout(
   //       () => setCopyView(id),
   //       0
   //    );
   //    setTimeout(
   //       () => setCopyView(null),
   //       800
   //    );
   // }
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
            start_time: zoomSettings.start_time ? moment(zoomSettings.start_time).format('YYYY-MM-DDTHH:mm:ss') : moment().format('YYYY-MM-DDTHH:mm:ss'),
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
            password_protection: !!zoomSettings.password_protection,
            password: zoomSettings.password ? zoomSettings.password : '',
         });
      }
   }
   // const getCharectersLength = (l) => setCharectersLimit(l);
   // useEffect(() => {
   //    setZoomTitle(title);
   //    setActiveName(title);
   // }, [title, src]);
   useEffect(() => {
      DefaultData();
   }, []);

   // const inputRef = useRef(null);

   // const onClick = () => {
   //    if (inputRef && inputRef.current) {
   //       setZoomDescription(inputRef.current.initialValue);
   //       inputRef.current.reload();
   //    }
   // };

   // const saveLesson = () => {
   //    if (inputRef && inputRef.current) {
   //       inputRef.current.initialValue = zoomDescription;
   //    }
   //    handleSave({
   //       name: zoomTitle || 'Live Lesson Title',
   //       description: zoomDescription || '<p></p>',
   //       draft: !zoomSettings.id,
   //       lesson_visiblity: 1,
   //    });
   // };

   const changeLesson = (name, value, originalName, file = {}) => {
      onChange(name, value, true, originalName, file.type);
   };

   const wrapperRef = useRef(null);
   // useOutsideClickDetector(wrapperRef, zoomSettings.id ? () => setChangeLiveLesson(true) : () => {});

   return (
      <ZoomLoading isLoading={ getSettingsInProgress } className='zoom__block'>
         {!getSettingsInProgress && !integrationSettings.zoom_account_id && (
            <div className='zoom__integration'>
               <div className='zoom__integration__main__icon'>
                  <IconNew name='LiveM' />
               </div>
               <div className='zoom__integration__icon'>
                  <IconNew name='ZoomL' />
               </div>
               <Text
                  inner='Please connect your Zoom account to edit this lesson!'
                  type={ txtTypes.regularDefaultGrey }
                  size={ txtSizes.small }
               />
               <div className='zoom__integration__connect'>
                  <div>
                     <TextInput
                        name='api_key'
                        id='api_key'
                        placeholder='Zoom API Key'
                        value={ zoomKeys.api_key }
                        onChange={ (name, value) => setZoomKeys({ ...zoomKeys, [name]: value }) }
                     />
                  </div>
                  <div>
                     <TextInput
                        name='secret_key'
                        id='secret_key'
                        placeholder='Secret Code'
                        value={ zoomKeys.secret_key }
                        onChange={ (name, value) => setZoomKeys({ ...zoomKeys, [name]: value }) }
                     />
                  </div>
                  <div>
                     <BaseButton
                        theme={ btnTheme.lightBlue }
                        size={ btnSize.medium }
                        text='Connect'
                        disabled={ !((zoomKeys.api_key && zoomKeys.secret_key)) }
                        onClick={ () => addIntegration('zoom', zoomKeys) }
                     />
                  </div>
               </div>
               <Text
                  type={ txtTypes.regularDefaultGrey }
                  size={ txtSizes.small }
                  inner={ [
                     'You can find your API Key and Secret Code in your Zoom account',
                     <br />,
                     <a href='https://zoom.us/' rel='noopener noreferrer' target='_blank'> <span className='upload__link'>More info</span></a>,
                  ] }
                  color='#8a94a2'
                  className='zoom__block__desc'
               />
            </div>
         )}
         {!!integrationSettings.zoom_account_id && !changeLiveLesson && (
            <div className='live__lesson' ref={ wrapperRef }>
               <div className='live__lesson__header'>
                  <Text
                     inner='Live Lesson Information'
                     type={ txtTypes.medium }
                     size={ txtSizes.xxlarge }
                  />
               </div>
               <TextInput
                  label='Live Lesson Title'
                  name='name'
                  id='zoom_name'
                  placeholder=''
                  value={ block.name }
                  onChange={ (name, value) => changeLesson(name, value) }
               />
               <div className='text__with__label'>
                  <Text
                     inner='Live Lesson Description'
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
                  <TextArea
                     label='Live Lesson Description'
                     title={ block.description || '' }
                     placeholder='Tell a little bit about this living class'
                     name='description'
                     onInputChange={ (name, value) => changeLesson(name, value) }
                     style={ {
                        fontSize: '14px',
                        color: '#131F1E',
                        fontWeight: '400',
                        lineHeight: '168%',
                     } }
                  />
               </div>
               <div className='text__with__label'>
                  <Text
                     inner='Live Lesson Cover'
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
                  <UploadMediaView
                     src={ block.picture_src }
                     style={ block.css_attributes || {} }
                     type='image'
                     buttonText='Image'
                     uploadProps={ {
                        fileLessonFormat: 'image',
                        isAmazonFile: true,
                        cropRatio: '610x350',
                        onChange: (value, originalName, file) => changeLesson('picture_src', value, originalName, file),
                     } }
                  />
               </div>
               <ZoomLessonSettings
                  zoomSettings={ zoomSettings }
                  DefaultData={ DefaultData }
                  //   isBussines={ userZoomType !== '1' }
                  data={ data }
                  setData={ setData }
                  zoomLoader={ zoomLoader }
                  changeLiveLesson={ setChangeLiveLesson }
                  id={ block.id }
                  setIsCreated={ setIsCreated }
                  isCreated={ isCreated }
                  saveZoomSettings={ (inputs) => saveZoomSettings(inputs) }
                  saveLesson={ saveLesson }
               //   setIsOpenSettings={ setIsOpenSettings }
               />
            </div>

         )}
         {(changeLiveLesson) && (
            <div className='zoom__block__view'>
               <ChangeButton
                  text='Edit Live Lesson'
                  iconName='ChangeImageM'
                  onClick={ () => setChangeLiveLesson(false) }
                  withText={ true }
               />
               <div>
                  <Text
                     inner={ block.name }
                     type={ txtTypes.mediumXSmall }
                     size={ txtSizes.xxlarge }

                  />
               </div>
               <div className='zoom__block__view__subtitle'>
                  <Text
                     inner={ block.description }
                     type={ txtTypes.regularDefaultGrey }
                     size={ txtSizes.small }
                  />
               </div>
               {block.picture_src && (
                  <div>
                     <img src={ block.picture_src } alt='zoom' />
                  </div>
               )}
               <div className='zoom__block__view__icons'>
                  <SimpleStatus
                     color='lightPink'
                     iconName='LocationTypeCommunityS'
                     text=' Meeting'
                  />
                  <SimpleStatus
                     color='grey'
                     iconName='DateTypeCommunityS'
                     text={ (zoomSettings.settings && zoomSettings.settings.recurrence && zoomSettings.settings.occurrences && zoomSettings.settings.occurrences[0])
                        ? FormatStarTime(zoomSettings.settings.occurrences[0].start_time)
                        : FormatStarTime(zoomSettings.start_time) }
                  />
                  <SimpleStatus
                     color='green'
                     iconName='TimerS'
                     text={ `${data.duration} min` }
                  />
                  {data.password_protection && (
                     <SimpleStatus
                        color='red'
                        iconName='TimerS'
                        text='Password locked'
                     />
                  )}
               </div>
               <div className='grey__line' />

               <div className='zoom__block__view__right'>
                  <div className='zoom__block__view__right__top'>
                     {!zoomLoader && (
                        <TimerDesign
                           timerTitle='The meeting starts in'
                           time={ (zoomSettings.settings && zoomSettings.settings.recurrence && zoomSettings.settings.occurrences && zoomSettings.settings.occurrences[0])
                              ? moment(zoomSettings.settings.occurrences[0].start_time)
                              : moment(zoomSettings.start_time) }
                           theme='second'
                           onExpire={ () => {} }
                        />
                     )}
                     <GoogleCalendarButton
                        description={ block.description }
                        name={ block.name }
                        duration={ data.duration }
                        date={ (zoomSettings.settings && zoomSettings.settings.recurrence && zoomSettings.settings.occurrences && zoomSettings.settings.occurrences[0])
                           ? FormatStarTime(zoomSettings.settings.occurrences[0].start_time)
                           : FormatStarTime(zoomSettings.start_time) }
                     />
                  </div>
               </div>
            </div>
         )}

      </ZoomLoading>
      // <ItemWrapper>
      //    {isOpenSettings && (
      //       <ZoomLessonSettings
      //          zoomSettings={ zoomSettings }
      //          DefaultData={ DefaultData }
      //          isBussines={ userZoomType !== '1' }
      //          data={ data }
      //          setData={ setData }
      //          zoomLoader={ zoomLoader }
      //          setIsCreated={ setIsCreated }
      //          isCreated={ isCreated }
      //          handleZoomSettingsSave={ (inputs) => handleZoomSettingsSave(
      //             inputs,
      //             {
      //                name: zoomTitle || 'Live Lesson Title',
      //                description: zoomDescription || '<p></p>',
      //                draft: !zoomSettings.id,
      //                lesson_visiblity: 1,
      //             })
      //          }
      //          setIsOpenSettings={ setIsOpenSettings }
      //       />
      //    )}
      //    <div className='zoomLesson'>
      //       {zoomLoader && (<LoaderSpinner />)}
      //       <div className='zoomLesson__fields'>
      //          <Text
      //             type={ textType.bold }
      //             size={ textSize.medium }
      //             inner={ zoomTitle }
      //             style={ { marginBottom: '36px' } }
      //          />
      //          <div className='zoom-title'>
      //             <TextInput
      //                placeholder='Live Lesson Title'
      //                label='Live Lesson Title'
      //                rightLabel={ `${ charectersLimit }/150` }
      //                id='zoomTitle'
      //                name='zoomTitle'
      //                value={ zoomTitle }
      //                onChange={ (name, value) => {
      //                   if (value.length < 151) {
      //                      setZoomTitle(value);
      //                      setActiveName(value);
      //                      getCharectersLength(value.length);
      //                   } else if (isPrint('You have reached the character limitation')) {
      //                      toast.error('You have reached the character limitation');
      //                   }
      //                } }
      //             />
      //          </div>
      //          <DynamicWrapper
      //             isOpen={ false }
      //             title={ ['Live Lesson Content', <span style={ { color: '#a3a3a3', paddingLeft: '5px', fontStyle: 'italic' } }> optional  </span>] }
      //             borderColor='#cddaf1'
      //             style={ { marginTop: '24px' } }
      //          >
      //             <div className='zoom_fieldsDescription'>
      //                <EditorConvertToHTML
      //                   onClick={ () => onClick() }
      //                   ref={ inputRef }
      //                   description={ description }
      //                   data={ zoomDescription || '' }
      //                   isCancel={ isCancel }
      //                   initial={ description }
      //                   onChange={ (descriptionDatat) => {
      //                      setZoomDescription(descriptionDatat);
      //                   } }
      //                />
      //             </div>
      //          </DynamicWrapper>

   //       </div>
   //       {isCreated && !(zoomSettings.settings.recurrence && !zoomSettings.settings.occurrences.length) && (
   //          <div className='zoom-item-content'>
   //             <div className='zoom-item-content-left'>
   //                <Text
   //                   type={ textType.bold }
   //                   size={ textSize.small }
   //                   inner={
   //                      zoomSettings.settings.recurrence
   //                         ? FormatStarTime(zoomSettings.settings.occurrences[0].start_time)
   //                         : FormatStarTime(zoomSettings.start_time)
   //                   }
   //                   style={ { marginBottom: '36px' } }
   //                />
   //             </div>
   //             <div className='zoom-item-content-rigth'>
   //                <BaseButton
   //                   theme={ buttonTheme.lightGreen }
   //                   size={ buttonSizes.large }
   //                   text='Copy Link'
   //                   onClick={ () => {
   //                      copyCodeToClipboard(zoomSettings.join_url, 'JoinUrl');
   //                   } }
   //                />
   //                { copyView === 'JoinUrl'
   //                && <div className='copiedText'>Copied</div>
   //                }
   //                <BaseButton
   //                   theme={ buttonTheme.darkGreen }
   //                   size={ buttonSizes.large }
   //                   text='Start Meeting'
   //                   className='save-lesson'
   //                   onClick={ () => window.open(zoomSettings.start_url, '_blank') }
   //                />
   //             </div>
   //          </div>
   //       )}
   //       <div className='zoomLesson__buttons'>
   //          <div className='m-r-m cancel__btn'>
   //             {((((zoomDescription && zoomDescription.replace(/(\r\n|\n|\r)/gm, '')) === description) || !zoomDescription) && zoomTitle === title) ? null : (
   //                <BaseButton
   //                   theme={ buttonTheme.grey }
   //                   size={ buttonSizes.large }
   //                   text='Cancel'
   //                   onClick={ () => {
   //                      setZoomTitle(title);
   //                      setIsCancel(!isCancel);
   //                      onClick();
   //                   } }
   //                />
   //             )}

   //          </div>

   //          <div className='m-r-m m-l-m'>
   //             <BaseButton
   //                theme={ buttonTheme.lightGreen }
   //                size={ buttonSizes.large }
   //                text='Zoom Settings'
   //                onClick={ () => {
   //                   setIsOpenSettings(true);
   //                } }
   //             />
   //          </div>

   //          <div className='save__cancel__btns'>
   //             <BaseButton
   //                theme={ buttonTheme.darkGreen }
   //                size={ buttonSizes.large }
   //                // disabled={ uploadedProgress !== 1 }
   //                text='Save'
   //                className='save-lesson'
   //                onClick={ () => saveLesson() }
   //             />
   //          </div>
   //       </div>
   //    </div>
   // </ItemWrapper>
   );
};

ZoomLesson.propTypes = {
   // title: PropTypes.string,
   // src: PropTypes.string,
   saveZoomSettings: PropTypes.func,
   description: PropTypes.string,
   // handleZoomSettingsSave: PropTypes.func,
   onChange: PropTypes.func,
   zoomLoader: PropTypes.bool,
   zoomSettings: PropTypes.object,
   // userZoomType: PropTypes.string,
   firstZoomLesson: PropTypes.object,
   integrationSettings: PropTypes.object,
   getSettings: PropTypes.func,
   getSettingsInProgress: PropTypes.bool,
   addIntegration: PropTypes.func,
   block: PropTypes.object,
   saveLesson: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      integrationSettings: selectors.integrationSettingsSelector(state),
      dataIsFetching: selectors.dataIsFetchingSelector(state),
      getSettingsInProgress: selectors.getSettingsInProgressSelector(state),
      putSettingsInProgress: selectors.putSettingsInProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getSettings: async () => {
         await dispatch(operations.settingsGetOperation('integrations'));
      },
      addIntegration: async (integration, data) => {
         await dispatch(operations.addIntegrationOperation(integration, data));
      },

      putSettings: (inputs, formName) => {
         dispatch(operations.settingsPutOperation(inputs, formName));
      },
      // getSettingsAction: () => {
      //    dispatch(getSettingsCompleted());
      // },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoomLesson);
