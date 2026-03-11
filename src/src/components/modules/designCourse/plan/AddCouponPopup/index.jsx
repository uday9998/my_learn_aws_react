import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import Switch from 'components/elements/form/Switch';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import MaterialModal from 'components/elements/MaterialModal';
import Icon from 'components/elements/Icon';
import NumberInput from 'components/elements/form/NumberInput';
import Select from 'components/elements/form/Select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const CustomInput = React.forwardRef(({ onClick, value }) => (
   <input
      className='uk-input'
      onClick={ onClick }
      value={ value }
      type='text'
      readOnly={ true }
   />
));

const AddCouponPopup = ({
   handleShowCouponPopup,
   handleInputCouponChange,
   couponInputs,
   handleCouponSave,
   pricingType,
}) => {
   const couponTypes = [
      { value: 'percentage', label: 'Percentage' },
      { value: 'flate_rate', label: 'Flat Rate' },
   ];

   const couponDurations = [
      { value: 'once', label: 'Once' },
      { value: 'repeating', label: 'Multi-month' },
      { value: 'forever', label: 'Forever' },
   ];

   const CloseModal = () => {
      const names = ['coupon_code', 'coupon_type', 'coupon_percentage', 'coupon_amount', 'coupon_limit', 'usage_limit', 'stripe_duration', 'duration_in_months', 'coupon_expire_time'];
      for (let i = 0; i < names.length; i++) {
         handleInputCouponChange(names[i], null);
      }
      handleShowCouponPopup(false);
   };

   return (
      <MaterialModal

         onClose={ CloseModal }
         open
         className='couponModal'
      >
         <div style={ { backgroundColor: '#fff' } } className='addCouponPopup noFocus'>
            <div
               className='addCoupon__close'
               role='presentation'
               onClick={ CloseModal }
            >
               <Icon name='CloseXNew' />
            </div>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner='New Coupon'
               style={ {
                  textAlign: 'center',
                  width: '100%',
                  display: 'inline-block',
               } }
            />
            <div className='m-t-exl'>
               <TextInput
                  placeholder='NEWCOUPON'
                  label='Coupon Code'
                  name='coupon_code'
                  rightLabel={ `${ couponInputs.coupon_code ? couponInputs.coupon_code.length : 0 }/150` }
                  value={ couponInputs.coupon_code }
                  onChange={ (key, value) => {
                     if (value.length < 151) {
                        handleInputCouponChange(key, value);
                     } else if (isPrint('You have reached the character limitation')) {
                        toast.error('You have reached the character limitation');
                     }
                  } }
               />
            </div>
            <div className='addCouponPopup_price'>
               <div className='addCouponPopup_flat_rate'>
                  <Select
                     label='Value Type'
                     placeholder='Select'
                     options={ couponTypes }
                     name='coupon_type'
                     value={ couponInputs.coupon_type }
                     onChange={ (name, value) => handleInputCouponChange(name, value) }
                     iconColor='#3f4f65'
                     icon='TriangleDown'
                     style={ { height: '48px' } }
                  />
               </div>
               <div className='addCouponPopup_amount'>
                  {couponInputs.coupon_type === 'percentage'

                        && (
                           <TextInput
                              placeholder='Add Percentage'
                              type='number'
                              name='coupon_percentage'
                              min={ 1 }
                              value={ couponInputs.coupon_percentage }
                              onChange={ handleInputCouponChange }
                           />
                        )
                  }
                  {couponInputs.coupon_type === 'flate_rate'
                     && (
                        <TextInput
                           placeholder='Add Amount'
                           type='number'
                           name='coupon_amount'
                           min={ 1 }
                           value={ couponInputs.coupon_amount }
                           onChange={ handleInputCouponChange }
                        />
                     )
                  }
               </div>
            </div>
            <div className='addCouponPopup_switch'>
               <div className='addCouponPopup_switch_title'><span>Limitation</span></div>
               <div className='addCouponPopup_switch_value'>
                  <Switch
                     name='coupon_limit'
                     checked={ couponInputs.coupon_limit }
                     onChange={ handleInputCouponChange }
                     isCommentPage={ true }
                  />
                  <span>{ couponInputs.coupon_limit ? 'Yes' : 'No' }</span>
               </div>
            </div>
            {
               couponInputs.coupon_limit && (
                  <div className='m-t-exl'>
                     <NumberInput
                        placeholder='Type here'
                        type='number'
                        label='Number of Users'
                        name='usage_limit'
                        min='0'
                        value={ couponInputs.usage_limit }
                        onChange={ handleInputCouponChange }
                     />
                  </div>
               )
            }
            <div className='addCouponPopup_duration m-t-m'>
               {/* <div className='hint-block'>
                  <div className='m-l-exs hint-icon'>
                     <Icon name='Hint' />
                  </div>
                  {tooltip && (
                     <div className='hint-text'>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.extraSmall }
                           inner={ tooltip }
                        />
                     </div>
                  )}
               </div> */}
               {pricingType === 2
                && (
                   <Select
                      label='Duration'
                      placeholder='Select'
                      options={ couponDurations }
                      name='stripe_duration'
                      value={ couponInputs.stripe_duration }
                      onChange={ (name, value) => handleInputCouponChange(name, value) }
                      iconColor='#3f4f65'
                      icon='TriangleDown'
                      style={ { height: '48px' } }
                   />

                )}
            </div>
            <div className='addCouponPopup_duration m-t-m'>
               {pricingType === 2 && couponInputs.stripe_duration === 'repeating'
                && (
                   <NumberInput
                      placeholder='Type here'
                      type='number'
                      min={ 1 }
                      label='Timeframe (in Months)'
                      name='duration_in_months'
                      value={ couponInputs.duration_in_months }
                      onChange={ handleInputCouponChange }
                   />
                )
               }
            </div>
            <div className='addCouponPopup_expire m-t-m'>
               <div>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.extraSmall }
                     inner='Expire on'
                  />
               </div>
               <DatePicker
                  selected={ couponInputs.coupon_expire_time }
                  onChange={ date => handleInputCouponChange('coupon_expire_time', date) }
                  selectsStart
                  minDate={ new Date() }
                  placeholderText='Select'
                  customInput={ <CustomInput /> }
               />
               <span className='CalendarCoupon'>
                  <Icon name='CalendarCoupon' />
               </span>
            </div>
            <div className='addCouponPopup__btns m-t-exl'>
               <div>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Cancel'
                     onClick={ () => handleShowCouponPopup(false) }
                  />
               </div>
               <div className='m-l-m'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Add'
                     onClick={ handleCouponSave }
                  />
               </div>
            </div>
         </div>
      </MaterialModal>
   );
};


AddCouponPopup.propTypes = {
   handleShowCouponPopup: PropTypes.func,
   handleInputCouponChange: PropTypes.func,
   couponInputs: PropTypes.object,
   handleCouponSave: PropTypes.func,
   pricingType: PropTypes.number,
};

CustomInput.propTypes = {
   onClick: PropTypes.func,
   value: PropTypes.any,
};

export default AddCouponPopup;
