import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Line from 'components/elements/Line';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import MultiSelectSearch from 'components/elements/MultiSelectSearch';
import { getPlansForSelect } from 'api';
import momentTimezone from 'moment-timezone';
import ApproveModal from 'components/elements/ApproveModal';
import currencyImg from 'assets/images/checkout/currency.png';

const CouponCreateLeft = ({
   inputs, onChange, onCancel, onCreate, options, generateCoupon, isCouponCodeGenerating,
}) => {
   const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const createCoupon = async () => {
      const { data: { errors } = {} } = await onCreate() || {};

      const finalErrors = {
         code: errors.coupon_code || [],
         percent: errors.coupon_percentage || [],
         amount: errors.coupon_amount || [],
         expiration_date: errors.expire_time || [],
         repetitions: errors.repeated_numbers || [],
      };

      addErrorMessages(finalErrors);
   };

   const changeCouponData = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      onChange(name, value);
   };

   const getAbbreviationForOffset = () => {
      const localTimezone = momentTimezone.tz.guess();
      const formatter = new Intl.DateTimeFormat('en-US', {
         timeZone: localTimezone,
         timeZoneName: 'short',
         hour12: false,
         hour: '2-digit',
         minute: '2-digit',
      });

      const currentTimeFormatted = formatter.format(new Date());
      const expDateText = `End date start from ${ currentTimeFormatted }`;

      return expDateText;
   };

   getAbbreviationForOffset();
   return (
      <div className='coupon__create__view__left'>
         <div className='coupon__create__view__left__top'>
            <Text
               inner='New Coupon'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <Text
               inner='Enter the details for your coupon. Please note that once created, these details cannot be altered.'
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </div>
         <div className='coupon__create__view__left__code'>
            <Input
               errorMessages={ errorMessages.code }
               label='Coupon Code'
               placeholder='Enter Coupon Code'
               onChange={ changeCouponData }
               value={ inputs.code }
               name='code'
            />
            <Button
               text='Generate'
               onClick={ () => generateCoupon() }
               disabled={ isCouponCodeGenerating }
            />
         </div>
         <MultiSelectSearch
            placeholder='Select from list'
            label='Plan'
            fullText='All Plans Connected'
            all={ options }
            query={ getPlansForSelect }
            values={ inputs.offer }
            onChange={ (value) => changeCouponData('offer', value) }
            helperText='Optional'
         />
         {/* <Select
            label='Plan'
            type='select-medium'
            placeholder='Select Plan'
            value={ inputs.offer }
            options={ options }
            onChange={ onChange }
            name='offer'
            helpText='Optional'
         /> */}
         <Line />
         <Text
            inner='Discount Type'
            type={ types.medium153 }
            size={ sizes.large }
         />
         <div className='coupon__create__view__left__switch'>
            <CheckboxCircle
               isChecked={ inputs.type === 0 }
               label='Percent Off'
               onCheck={ () => changeCouponData('type', 0) }
            />
            <CheckboxCircle
               label='Amount Off'
               isChecked={ inputs.type === 1 }
               onCheck={ () => { changeCouponData('type', 1); setIsOpenWarningModal(true); } }
            />
         </div>
         {inputs.type === 0 ? (
            <Input
               errorMessages={ errorMessages.percent }
               label='Percent Off'
               type='number'
               value={ inputs.percent }
               name='percent'
               maxNumber={ 100 }
               onChange={ changeCouponData }
               placeholder='Enter percentage'
               minNumber={ 0 }
               onKeyPress={ (event) => {
                  if (event.key === '-' || event.key === '+' || event.key === 'e') {
                     event.preventDefault();
                  }
               } }
            />
         ) : (
            <Input
               errorMessages={ errorMessages.amount }
               label='Amount Off'
               type='number'
               value={ inputs.amount }
               name='amount'
               onChange={ changeCouponData }
               placeholder='Enter amount'
               minNumber={ 0 }
               onKeyPress={ (event) => {
                  if (event.key === '-' || event.key === '+' || event.key === 'e') {
                     event.preventDefault();
                  }
               } }
            />
         )}
         <Line />
         <div className='coupon__create__view__left__duration'>
            <Text
               inner='Duration'
               type={ types.medium153 }
               size={ sizes.large }
            />
            <Text
               inner='Specify the number of months the coupon will remain active after application. This affects subscriptions and multi-payment offers.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         </div>
         <div className='coupon__create__view__left__switch'>
            <CheckboxCircle
               isChecked={ inputs.duration_type === 0 }
               label='Once'
               onCheck={ () => changeCouponData('duration_type', 0) }
            />
            <CheckboxCircle
               isChecked={ inputs.duration_type === 1 }
               label='Repeating'
               onCheck={ () => changeCouponData('duration_type', 1) }
            />
            {/* <CheckboxCircle
               isChecked={ inputs.duration_type === 2 }
               label='Between Dates'
               onCheck={ () => onChange('duration_type', 2) }
            />
            <CheckboxCircle
               isChecked={ inputs.duration_type === 3 }
               label='No Expiration Date'
               onCheck={ () => onChange('duration_type', 3) }
            /> */}
         </div>
         {inputs.duration_type === 1 && (
            <Input
               errorMessages={ errorMessages.repetitions }
               type='number'
               placeholder='Enter Number'
               label='Number of Repetitions'
               helpText='Times'
               value={ inputs.repetitions }
               onChange={ changeCouponData }
               name='repetitions'
            />
         )}
         <div className='coupon__create__view__left__duration'>
            <Text
               inner='Expiration Date'
               type={ types.medium153 }
               size={ sizes.large }
            />
            <Text
               inner='Set a specific expiration date for the coupon or leave it open-ended without a set end date.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         </div>
         <div className='coupon__create__view__left__switch'>
            <CheckboxCircle
               isChecked={ inputs.expiration_type === 0 }
               label='Expiration Date'
               onCheck={ () => changeCouponData('expiration_type', 0) }
            />
            <CheckboxCircle
               isChecked={ inputs.expiration_type === 1 }
               label='No Expiration Date'
               onCheck={ () => changeCouponData('expiration_type', 1) }
            />
            {/* <CheckboxCircle
               isChecked={ inputs.duration_type === 2 }
               label='Between Dates'
               onCheck={ () => onChange('duration_type', 2) }
            />
            <CheckboxCircle
               isChecked={ inputs.duration_type === 3 }
               label='No Expiration Date'
               onCheck={ () => onChange('duration_type', 3) }
            /> */}
         </div>
         {/* {inputs.duration_type === 2 && (
         <>
            <Input
               type='date'
               placeholder='Start Date'
               label='Start Date'
               helpText='Start date start from 00:00 PDT'
               value={ inputs.start_date }
               onChange={ onChange }
               name='start_date'
            />
            <Input
               type='date'
               placeholder='End Date'
               label='End Date'
               helpText='End date start from 00:00 PDT'
               value={ inputs.end_date }
               onChange={ onChange }
               name='end_date'
            />
         </>
         )} */}
         {inputs.expiration_type === 0 && (
            <Input
               errorMessages={ errorMessages.expiration_date }
               type='date'
               placeholder='Select Date'
               label='Expiration Date'
               helpText={ getAbbreviationForOffset() }
               value={ inputs.expiration_date }
               onChange={ changeCouponData }
               name='expiration_date'
            />
         )}
         <div className='coupon__create__view__left__buttons'>
            <Button
               text='Cancel'
               onClick={ () => onCancel() }
               theme={ themes.secondary }
            />
            <Button
               text='Create Coupon'
               onClick={ createCoupon }
            />
         </div>
         {
            isOpenWarningModal && (
               <ApproveModal
                  title='Warning'
                  btnText='Okay'
                  onApprove={ () => { setIsOpenWarningModal(false); } }
                  withoutCancel={ true }
                  onCancel={ () => {} }
                  titleImg={ currencyImg }
               >
                  <Text
                     inner='The coupon will work based on the product currency.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </ApproveModal>
            )
         }
      </div>
   );
};

CouponCreateLeft.propTypes = {
   options: PropTypes.array,
   inputs: PropTypes.object,
   onCancel: PropTypes.func,
   onCreate: PropTypes.func,
   onChange: PropTypes.func,
   generateCoupon: PropTypes.func,
   isCouponCodeGenerating: PropTypes.bool,
};

export default CouponCreateLeft;
