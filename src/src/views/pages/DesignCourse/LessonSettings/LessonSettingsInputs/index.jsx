import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TextWithTooltip, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
// import IToolTip from 'components/elements/IToolTIp';
import IToolTIpText from 'components/elements/IToolTIpText';
import StatusCheckList from 'components/modules/designCourse/StatusCheckList';
// import TimerDesign from 'components/elements/Timer';
import moment from 'moment';
import CheckList from 'components/elements/checkListNew';
import IconNew from 'components/elements/iconsSize';
import momentTimezone from 'moment-timezone';

const LessonSettingsInputs = ({
   inputs, onChange, course,
}) => {
   const handleChangeStatus = (type, date) => {
      if (date) {
         onChange('is_published', type, date);
         return;
      }
      onChange('is_published', type);
   };
   const commentsStatus = [
      { value: 1, key: 'Visible' },
      { value: 0, key: ' Hidden' },
      { value: 2, key: 'Locked' },
      // { value: 3, key: 'Off' },
   ];

   const userTimeZone = momentTimezone.tz.guess();
   const dateUserTimeZone = momentTimezone.utc(inputs.drip_date).tz(userTimeZone);
   const dateUserTimeZoneFormat = dateUserTimeZone.format('MMMM DD, YYYY h:mm A');

   const timeTypes = (type) => {
      if (type === 'month') {
         return moment(Date.now()).add(1, 'M').format('MMMM DD, YYYY h:mm A');
      } if (type === 'year') {
         return moment(Date.now()).add(1, 'Y').format('MMMM DD, YYYY h:mm A');
      } if (type === 'week') {
         return moment(Date.now()).add(1, 'W').format('MMMM DD, YYYY h:mm A');
      }
      return null;
   };

   return (
      <div className='lesson__settings__inputs'>
         <div className='lesson__settings__inputs__top'>
            <Text
               inner={ `${ course.type === '1' ? 'Video' : 'Lesson' } Settings` }
               type={ types.medium160 }
               size={ sizes.xxlarge }
            />
            {/* <Text
               inner='All changes are saved automatically'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            /> */}
         </div>
         <div className='lesson__settings__inputs__line' />
         <div className='lesson__settings__inputs__center'>
            <div className='lesson__settings__inputs__center__status'>
               <Text
                  inner='Status'
                  type={ types.mediumSmall }
                  size={ sizes.medium }
               />
               <StatusCheckList
                  status={ inputs.is_published }
                  onChangeStatus={ (val, date) => handleChangeStatus(val, date) }
               />

               {(!!inputs.is_published && (inputs.is_published === 3 || inputs.is_published === '3') && inputs.drip_date !== 'Invalid date') && (
                  <div className='drip_static'>
                     <Text
                        size={ sizes.small }
                        type={ types.regularDefault }
                        inner={ dateUserTimeZoneFormat }
                     />
                  </div>
               )}
               {(!!inputs.is_published && (inputs.is_published === 3 || inputs.is_published === '3') && inputs.drip_date === 'Invalid date') && (
                  <div className='drip_static'>
                     <Text
                        size={ sizes.small }
                        type={ types.regularDefault }
                        inner={ timeTypes(inputs.drip_day_type) }
                     />
                  </div>
               )}
            </div>
            <div className='lesson__settings__inputs__center__comments'>
               <Text
                  inner='Comments'
                  type={ types.mediumSmall }
                  size={ sizes.medium }
               />
               <CheckList
                  items={ commentsStatus }
                  values={ [inputs.comment_status] }
                  onChange={ (value) => onChange('comment_status', value) }
               />
               <div className='product__settings__inputs__center__comment' role='presentation' onClick={ () => window.open(`${ window.location.origin }/admin/programs/${ course.id }/comments#unread`, 'blank') }>
                  <IconNew name='LinkCommentsProgramM' />
               </div>
            </div>
         </div>
         <div className='lesson__settings__inputs__line' />
         <div className='lesson__settings__inputs__options'>
            <Text
               inner='More Options'
               type={ types.medium150 }
            />
            <div className='lesson__settings__inputs__options__flex'>
               <div className='lesson__settings__inputs__option'>
                  <div className='lesson__settings__inputs__option__left'>
                     <CheckBox
                        checked={ inputs.is_free_lesson === 1 }
                        onChange={ (name, val) => onChange('is_free_lesson', val ? 1 : 0) }
                        disabled={ inputs.is_published !== '1' }
                     />
                     <TextWithTooltip
                        inner={ `Make this ${ course.type === '1' ? 'video' : 'lesson' } free to all members` }
                        type={ types.regular148 }
                        size={ sizes.medium }
                        style={ { margin: '0px 8px 0px 16px' } }
                        tooltip={ inputs.is_published !== '1' ? 'Please publish the video first' : '' }
                        isIconRigth={ true }
                     />
                  </div>
                  {!!inputs.is_free_lesson && <IToolTIpText title='F' tooltip={ `Free ${ course.type === '1' ? 'video' : 'lesson' }` } />}
               </div>

               {course.type !== '1'
               && (
                  <>
                     <div className='lesson__settings__inputs__option'>
                        <div className='lesson__settings__inputs__option__left'>
                           <CheckBox
                              checked={ inputs.prerequisite === 1 }
                              onChange={ (name, val) => onChange('prerequisite', val ? 1 : 0) }
                           />
                           <Text
                              inner='Make this lesson prerequisite'
                              type={ types.regular148 }
                              size={ sizes.medium }
                              style={ { margin: '0px 8px 0px 16px' } }
                           />
                        </div>
                        {!!inputs.prerequisite && <IToolTIpText title='P' tooltip='Prerequisite' />}
                     </div>
                     {/* {!inputs.prerequisite && (
                        <div className='lesson__settings__inputs__option'>
                           <div className='lesson__settings__inputs__option__left'>
                              <CheckBox
                                 checked={ inputs.is_inactive_prerequisite === 1 }
                                 onChange={ (name, val) => onChange('is_inactive_prerequisite', val ? 1 : 0) }
                              />
                              <Text
                                 inner='Remove from Prerequisite'
                                 type={ types.regular148 }
                                 size={ sizes.medium }
                                 style={ { margin: '0px 8px 0px 16px' } }
                              />
                           </div>
                           {!!inputs.is_inactive_prerequisite && <IToolTIpText title='R' tooltip='Removed from Prerequisite' />}
                        </div>
                     )} */}
                  </>
               )}
               {/* <div className='lesson__settings__inputs__option'>
                  <div className='lesson__settings__inputs__option__left'>
                     <CheckBox
                        checked={ inputs.download === 1 }
                        onChange={ (name, val) => onChange('download', val ? 1 : 0) }
                     />
                     <Text
                        inner='Make this lesson downloadable'
                        type={ types.regular148 }
                        size={ sizes.medium }
                        style={ { margin: '0px 8px 0px 16px' } }
                     />
                     <IToolTip tooltip='text' />
                  </div>
               </div> */}
            </div>
         </div>
      </div>
   );
};

LessonSettingsInputs.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   // goToComments: PropTypes.func,
   course: PropTypes.object,
};

export default LessonSettingsInputs;
