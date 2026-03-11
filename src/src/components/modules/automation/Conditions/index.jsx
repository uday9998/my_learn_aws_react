/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize, TextWithIcon } from 'components/elements/TextNew';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { SIZES as btnSize, THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from 'components/elements/inputNew';
import moment from 'moment';
import Select from 'components/elements/SelectNew';
import IconButton from 'components/elements/buttons/IconButton';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';


const styles = {
   add: {
      borderRadius: '4px',
      color: '#006dff',
      fontSize: '14px',
      backgroundColor: '#E4F0FE',
   },
   cancel: {
      borderRadius: '4px',
      color: '#3f4f65',
      backgroundColor: '#f0f4f7',
   },
   save: {
      borderRadius: '4px',
      color: '#fff',
      backgroundColor: '#7cb740',
   },
};

let options = [];
options = [
   { value: 'any', label: 'Any' },
   { value: 'all', label: 'All' },
];

const ConditionalCard = ({
   item, deleteCondition, changeCondition, courses, members,
   getallMembersInProgress, coupons,
}) => {
   const compaignActivity = [
      { value: 'member_email', label: 'Member Email' },
      { value: 'member_name', label: 'Member Name' },
      { value: 'subscription_date', label: 'Subscription Date' },
      { value: 'member_last_login', label: 'Member Inactive For' },
      { value: 'tag_name', label: 'Tag Name' },
      { value: 'course_name', label: 'Class Name' },
      { value: 'course_completed', label: '% Completed ' },
      { value: 'used_coupon', label: 'Used Coupon ' },
   ];

   const contain = [
      { value: 'is_exactly', label: 'Is Exactly' },
      { value: 'is_not_exactly', label: 'Is Not Exactly' },
      { value: 'contain', label: 'Contain' },
      { value: 'not_contain', label: 'Not Contain' },
      { value: 'starts_with', label: 'Starts With' },
      { value: 'ends_with', label: 'Ends With' },
   ];

   const subDate = [
      { value: 'before', label: 'Before' },
      { value: 'after', label: 'After' },
   ];

   const couponMatchData = [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
   ];

   const [disableChanges, setDisableChanges] = useState(false);

   const isNumber = (evt, itemKey) => {
      const evtn = (evt) || window.event;
      const charCode = (evtn.which) ? evtn.which : evtn.keyCode;
      if (itemKey === 'member_last_login') {
         if ((charCode >= 48 && charCode <= 57) || charCode === 46 || charCode === 8) {
            setDisableChanges(false);
         } else {
            setDisableChanges(true);
         }
      } else {
         setDisableChanges(false);
      }
   };
   const changeCoursePercent = (name, value, itemId) => {
      let newValue = value.replace(/\D/, '');
      if (parseInt(newValue, 10) > 100) {
         newValue = 100;
      } else if (parseInt(newValue, 10) < 0) {
         newValue = 0;
      }
      changeCondition(name, newValue, itemId);
   };
   const changeInactiveMember = (name, value, itemId) => {
      let newValue = value.replace(/\D/, '');
      if (parseInt(value, 10) <= 0) {
         newValue = 1;
      }
      changeCondition(name, newValue, itemId);
   };
   const coursesForSelectOption = courses.map(course => ({ label: course.name, value: course.name }));
   const membersForSelectOption = members.map(member => ({ label: member.name, value: member.name }));
   const membersEmailForSelectOption = members.map(member => ({ label: member.email, value: member.email }));
   const couponForSelectOption = coupons.map(coupon => ({ label: coupon.coupon_code, value: coupon.id }));
   const courseIdsForSelectOption = courses.map(course => ({ label: course.name, value: course.id }));
   return (
      <div className={ item.key === 'course_completed' ? 'select-content select-content-course' : item.key === 'member_last_login' ? 'select-content member-last-login' : 'select-content' }>
         <Select
            label=''
            type='select-medium'
            id='emailto'
            placeholder='Compaign Activity'
            options={ compaignActivity }
            name='key'
            value={ item.key }
            onChange={ (name, value) => changeCondition(name, value, item.id) }
            icon='TriangleDownBlack'
         />
         { item.key !== 'member_last_login' && item.key !== 'course_completed' && (
            <Select
               label=''
               type='select-medium'
               style={ { height: '48px' } }
               id='couponId'
               placeholder=''
               options={ item.key === 'subscription_date' ? subDate : item.key === 'used_coupon' ? couponMatchData : contain }
               name='match'
               value={ item.match }
               onChange={ (name, value) => changeCondition(name, value, item.id) }
               icon='TriangleDownBlack'
            />
         )}
         { item.key === 'course_completed' && (
            <Select
               label=''
               type='select-medium'
               style={ { height: '48px' } }
               id='courseIdsForSelectOption'
               placeholder='Select class'
               options={ courseIdsForSelectOption }
               name='match'
               value={ item.match }
               onChange={ (name, value) => changeCondition(name, value, item.id) }
               icon='TriangleDownBlack'
            />
         )}
         { item.key !== 'subscription_date' && item.key !== 'course_completed' ? (
            (item.key === 'course_name' || item.key === 'member_name' || item.key === 'member_email') && item.match === 'is_exactly' ? (
               item.key === 'course_name'
                  ? (
                     <Select
                        label=''
                        style={ { height: '48px' } }
                        id='isExactlyCourse'
                        type='select-medium'
                        placeholder='Select Class'
                        options={ coursesForSelectOption }
                        name='value'
                        value={ item.value }
                        onChange={ (name, value) => changeCondition(name, value, item.id) }
                        icon='TriangleDownBlack'
                     />
                  )
                  : (
                     !getallMembersInProgress && (
                        <Select
                           label=''
                           style={ { height: '48px' } }
                           id='isExactlyMember'
                           placeholder='Select Member'
                           options={ item.key === 'member_name' ? membersForSelectOption : membersEmailForSelectOption }
                           name='value'
                           type='select-medium'
                           value={ item.value }
                           onChange={ (name, value) => changeCondition(name, value, item.id) }
                           icon='TriangleDownBlack'
                        />
                     )
                  )
            ) : (
               item.key === 'used_coupon'
                  ? (
                     <Select
                        label=''
                        style={ { height: '48px' } }
                        id='isExactlyCoupon'
                        placeholder='Select Coupon'
                        options={ couponForSelectOption }
                        type='select-medium'
                        name='value'
                        value={ item.value }
                        onChange={ (name, value) => changeCondition(name, value, item.id) }
                        icon='TriangleDownBlack'
                     />
                  )
                  : (
                     <div className={ item.key === 'member_last_login' ? 'wait-card-form-input member-inactive-input' : 'wait-card-form-input' }>
                        <Input

                           label=''
                           placeholder={ item.key === 'member_last_login' ? '7' : '' }
                           name='value'
                           value={ item.key === 'member_last_login' ? Number.parseFloat(item.value) : item.value }
                           onChange={ !disableChanges && item.key === 'member_last_login' ? (name, value) => changeInactiveMember(name, `${ value }`, item.id) : item.key === 'member_last_login' ? () => {} : (name, value) => changeCondition(name, `${ value }`, item.id) }
                           onKeyDown={ item.key === 'member_last_login' ? (e) => {
                              if ((e.which >= 48 && e.which <= 57) || e.which === 46 || e.which === 8 || (e.which >= 96 && e.which <= 105)) {
                                 setDisableChanges(false);
                              } else {
                                 setDisableChanges(true);
                              }
                           } : (event) => isNumber(event, item.key) }
                           type={ item.key === 'member_last_login' ? 'number' : 'text' }
                           min={ item.key === 'member_last_login' ? 1 : '' }
                        />
                        {item.key === 'member_last_login' && (
                           <Text
                              type={ TextType.normal }
                              size={ TextSize.small }
                              inner='days'
                              color='#3f4f65'
                           />
                        )}
                     </div>
                  )
            )
         ) : (
            item.key !== 'course_completed' && (
               <div className='date__input wait-card-form-input'>
                  <Input
                     type='date'
                     value={ item.value ? moment(item.value).toDate() : null }
                     onChange={ (name, date) => changeCondition('value', moment(date).format('YYYY-MM-DD'), item.id) }
                  />
               </div>
            )
         ) }
         {item.key === 'course_completed' && (
            <div className='date__input wait-card-form-input'>
               <div className='wait-card-form-input member-inactive-input'>
                  <Input
                     label=''
                     placeholder='0'
                     name='value'
                     value={ Number.parseFloat(item.value) }
                     onChange={ !disableChanges ? (name, value) => changeCoursePercent(name, `${ value }`, item.id) : () => {} }
                     onKeyDown={ (e) => {
                        if ((e.which >= 48 && e.which <= 57) || e.which === 46 || e.which === 8 || (e.which >= 96 && e.which <= 105)) {
                           setDisableChanges(false);
                        } else {
                           setDisableChanges(true);
                        }
                     } }
                     type='number'
                     min='0'
                     max='100'
                  />
                  <Text
                     type={ TextType.regularDefault }
                     size={ TextSize.small }
                     inner='%'
                     color='#3f4f65'
                  />
               </div>
            </div>
         )}
         <IconButton name='AffiliateDeleteM' onClick={ () => deleteCondition(item.id) } />
      </div>
   );
};

const Conditions = ({
   closeCurrentScratch,
   saveAction,
   currentAction,
   handleConditionInputChange,
   conditions,
   addCondition,
   deleteCondition,
   changeCondition,
   position,
   courses,
   members,
   getallMembersInProgress,
   coupons,
}) => {
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (itemId, fieldName) => {
      let newErrors = {};

      if (fieldName) {
         const { [fieldName]: removedError, ...otherErrors } = errorMessages[itemId];

         newErrors = otherErrors;
      }

      setErrorMessages(prev => ({
         ...prev,
         [itemId]: newErrors
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const saveActionFunc = () => {
      let haveError = false;

      const newErrors = conditions.reduce((
         newErrors,
         {
            id, key, match, value
         }
      ) => {
         const currentErrorMessages = {};

         if (!value) {
            let errMessage = 'The value field is required.';

            if (key === 'member_last_login' && value === '') {
               errMessage = 'The value field must be positive number.';
            }

            if (key === 'subscription_date') {
               errMessage = 'The date field is required.';
            }

            haveError = true;
            currentErrorMessages.value = errMessage;
         }

         if (!match && key === 'course_completed') {
            haveError = true;
            currentErrorMessages.match = 'The class field is required.';
         }

         newErrors[id] = currentErrorMessages;
         return newErrors;
      }, {});

      if (haveError) {
         addErrorMessages(newErrors);
         return;
      }

      if (position) {
         saveAction({ match: currentAction.payload.match ? currentAction.payload.match : 'any', conditions });
      } else {
         saveAction({
            type: 'condition', id: currentAction.id, payload: { match: currentAction.payload.match ? currentAction.payload.match : 'any', conditions },
         });
      }
   };

   const changeConditionCard = (name, value, itemId) => {
      const currentCardErrors = errorMessages[itemId] || {};

      if (currentCardErrors[name]) {
         removeErrorMessage(itemId, name);
      } else if (name === 'key' && Object.keys(currentCardErrors).length) {
         removeErrorMessage(itemId);
      }

      changeCondition(name, value, itemId);
   };

   return (
      <div className='conditions-card'>
         <div className='conditions-card-title'>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='If / Else'
            />
         </div>
         <div className='conditions-card-description'>
            <Text
               type={ TextType.regularDefault }
               size={ TextSize.small }
               inner='Your contact will join the ‘’Yes’’ path if they meet your conditions. '
               style={ { color: '#727978', textTransform: 'capitalize' } }
            />
         </div>
         <div className='conditions-card-type'>
            <div className='conditions-card-description'>
               <Text
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
                  inner='Match'
               />
            </div>
            <Select
               label=''
               type='select-medium'
               id='any'
               placeholder='Any'
               options={ options }
               name='match'
               value={ currentAction.payload.match }
               onChange={ (name, value) => handleConditionInputChange(name, value, 'payload') }
               icon='TriangleDownBlack'
            />
            <div className='conditions-card-description'>
               <Text
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
                  inner='Of The Following Conditions:'
               />
            </div>
         </div>
         <div className='conditions-content-new'>
            {
               conditions.map((item, index) => (
                  <ErrorMessageWrapper errorMessages={ Object.values(errorMessages[item.id] || {}) } hideBorder key={ item.id }>
                     <div className='conditions-card-content'>
                        <div className='conditions-card-form' style={ { width: '100%' } }>
                           <div style={ { width: '100%' } }>
                              <ConditionalCard
                                 item={ item }
                                 deleteCondition={ deleteCondition }
                                 changeCondition={ changeConditionCard }
                                 courses={ courses }
                                 members={ members }
                                 getallMembersInProgress={ getallMembersInProgress }
                                 coupons={ coupons }
                              />
                           </div>
                        </div>
                     </div>
                  </ErrorMessageWrapper>
               ))
            }
         </div>
         <div className='conditions-add-footer'>
            <TextWithIcon
               iconName='AutomationPluseM'
               isIconRight={ false }
               inner='Add Condition'
               type={ TextType.regularDefaultSmall }
               size={ TextSize.small }
               style={ { color: '#24554E' } }
               generalStyles={ { cursor: 'pointer' } }
               onClick={ () => addCondition() }
            />
            <div className='conditions-card-btns'>
               <BaseButton
                  theme={ btnThemes.secondary }
                  text='Cancel'
                  onClick={ closeCurrentScratch }
               />
               <BaseButton
                  text='Save'
                  onClick={ () => saveActionFunc() }
               />
            </div>
         </div>
      </div>
   );
};


ConditionalCard.propTypes = {
   item: PropTypes.object,
   deleteCondition: PropTypes.func,
   changeCondition: PropTypes.func,
   courses: PropTypes.array,
   getallMembersInProgress: PropTypes.bool,
   members: PropTypes.any,
   coupons: PropTypes.array,
};

Conditions.propTypes = {
   deleteCondition: PropTypes.func,
   changeCondition: PropTypes.func,
   closeCurrentScratch: PropTypes.func,
   saveAction: PropTypes.func,
   currentAction: PropTypes.object,
   handleConditionInputChange: PropTypes.func,
   addCondition: PropTypes.func,
   conditions: PropTypes.array,
   position: PropTypes.string,
   courses: PropTypes.array,
   getallMembersInProgress: PropTypes.bool,
   members: PropTypes.any,
   coupons: PropTypes.array,
};

export default Conditions;
