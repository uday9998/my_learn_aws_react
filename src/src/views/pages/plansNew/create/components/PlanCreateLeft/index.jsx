import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import Tabs from 'components/elements/tabs';
import Button, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Upload from 'components/modules/uploadWithoutS3';
import GeneratorModal from 'components/elements/GeneratorModal';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';
import PricingItem from '../PricingItem';

const tabVariants = [
   { key: '1 Plan', value: 1 },
   { key: '3 Plans', value: 2 },
   { key: 'Custom', value: 0 },
];

const PlanCreateLeft = ({
   inputs, onChange, courses, handleCreatePlan,
   errorMessages, clearErrorMessages, removeErrorMessage, addTemporaryErrorMessage,
}) => {
   const newPlan = {
      currency: 'USD',
      name: '',
      price: '',
      'pricing_type': 2,
   };
   const [selectedVariant, setSelectedVariant] = useState(1);
   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });

   const handleChangeNumberCustom = (name, number) => {
      if (number > inputs.pricings.length) {
         onChange('pricings', [
            ...inputs.pricings,
            ...(Array(number - inputs.pricings.length).fill(newPlan)),
         ]);
         return;
      }
      onChange('pricings', inputs.pricings.slice(0, number));
   };

   const handleChangeTab = (step) => {
      setSelectedVariant(step);
      clearErrorMessages();
      switch (step) {
         case 1:
            onChange('pricings', [newPlan]);
            break;
         case 2:
            onChange('pricings', Array(3).fill(newPlan));
            break;
         default:
            onChange('pricings', Array(2).fill(newPlan));
      }
   };

   const handleChangeInputs = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      onChange(name, value);
   };

   const handleChangePlanInputs = (i, name, value, isMembership) => {
      const newPlans = inputs.pricings.map((e, index) => {
         if (index === i) {
            if (name === 'pricing_type') {
               const retrunValue = {
                  name: e.name,
                  pricing_type: value,
                  currency: 'USD',
               };
               if (value !== 3) {
                  retrunValue.currency = 'USD';
                  retrunValue.price = '';
               }
               if (isMembership && value === 2) {
                  retrunValue.number_of_payments = 1;
               }
               return retrunValue;
            } if (name === 'free_trial') {
               if (!!value && !e.trial_period) {
                  return {
                     ...e,
                     [name]: value,
                     trial_period: 7,
                  };
               }
            }
            return {
               ...e,
               [name]: value,
            };
         }
         return e;
      });

      const fieldName = `pricings.${i}.${name}`;
      if (errorMessages[fieldName]?.length) {
         removeErrorMessage(fieldName);
      }
      onChange('pricings', newPlans);
   };

   return (
      <div className='plan__create__left'>
         <div>
            <div>
               <Text
                  inner='New Bundle'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
            </div>
            <div>
               <Text
                  inner='Set up a new bundle for your offer. Define its pricing and select a payment type to streamline the setup process. '
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
            </div>
         </div>
         <div className='plan__create__left__inputs'>
            <Input
               errorMessages={ errorMessages.name }
               name='name'
               onChange={ handleChangeInputs }
               placeholder='Enter the name of your bundle'
               value={ inputs.name }
               withIcon={ true }
               iconName='Generator'
               setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
               IToolTipTextNew='AI Generator'
               label='Bundle Name'
               maxlength={ 30 }
               helpText={ `${ (inputs.name || '').length }/30` }
            />
            <ErrorMessageWrapper errorMessages={ errorMessages.course_id }>
               <Select
                  options={ courses }
                  value={ inputs.course_id }
                  name='course_id'
                  label='Product'
                  onChange={ handleChangeInputs }
                  placeholder='Select from list'
                  type='select-medium'
                  hasSearch
               />
            </ErrorMessageWrapper>
            <div className='plan__create__left__inputs__picture'>
               <Text
                  inner='Bundle Cover'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <Upload
                  fileLessonFormat='image'
                  isAmazonFile={ true }
                  isUpload={ true }
                  text='Image'
                  cropRatio='1920x1080'
                  onChange={ (value, name) => {
                     onChange('image', { name, value });
                  } }
               />
               <Text
                  className='upload__view__center__recomended'
                  inner='Recommended size 1920x1080'
                  type={ types.regularDefault }
                  style={ { color: '#727978', marginTop: '8px' } }
                  size={ sizes.small }
               />
            </div>
            <div className='plan__create__left__inputs__line' />
            <div className='plan__create__left__inputs__tab'>
               <Text
                  inner='Number of Plans'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <Tabs
                  variants={ tabVariants }
                  selectedVariant={ selectedVariant }
                  onSelect={ handleChangeTab }
               />
            </div>
            {selectedVariant === 0 && (
               <Input
                  type='number'
                  value={ inputs.pricings.length }
                  onChange={ handleChangeNumberCustom }
                  label='Custom Number of Plans'
                  minNumber={ 1 }
               />
            )}
            {inputs.pricings.map((e, index) => {
               return (
                  <PricingItem
                     e={ e }
                     index={ index }
                     handleChangePlanInputs={ handleChangePlanInputs }
                     errorMessages={ errorMessages }
                     addTemporaryErrorMessage={ addTemporaryErrorMessage }
                  />
               );
            })}
         </div>
         <div className='plan__create__left__buttons'>
            {/* <Button
               text='Cancel'
               theme={ btnThemes.secondary }
               onClick={ () => {} }
            /> */}
            <Button
               text='Create Bundle'
               onClick={ () => handleCreatePlan() }
            />
         </div>

         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               title='Plan'
               isQuiz={ true }
               setData={ onChange }
            />
         )}
      </div>
   );
};

PlanCreateLeft.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   courses: PropTypes.array,
   handleCreatePlan: PropTypes.func,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default PlanCreateLeft;
