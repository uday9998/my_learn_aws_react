import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import Input from 'components/elements/inputNew';
// import Select from 'components/elements/SelectNew';
// import Tabs from 'components/elements/tabs';
import Button, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import Upload from 'components/modules/uploadWithoutS3';
import GeneratorModal from 'components/elements/GeneratorModal';
import PricingItem from '../PricingItem';
import PaymentBlock from '../PricingLeftMembership/blocks/PaymentBlock';

// const tabVariants = [
//    { key: '1 Plan', value: 1 },
//    { key: '3 Plans', value: 2 },
//    { key: 'Custom', value: 0 },
// ];

const MembershipCreateLeft = ({
   inputs, onChange, handleCreatePlan, integrations, goToIntegrations,
   errorMessages, clearErrorMessages, removeErrorMessage, addTemporaryErrorMessage,
   // courses
}) => {
   const getCheckedPayments = () => {
      let items = '';
      inputs.pricings.forEach(element => {
         if (element.payment_method) {
            items = element.payment_method;
         }
      });
      return items;
   };

   const newPlan = {
      currency: 'USD',
      name: '',
      price: '',
      'pricing_type': 2,
      number_of_payments: 1,
      payment_method: getCheckedPayments(),
   };
   // const [selectedVariant, setSelectedVariant] = useState(1);
   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });

   // const handleChangeNumberCustom = (name, number) => {
   //    if (number > inputs.pricings.length) {
   //       onChange('pricings', [
   //          ...inputs.pricings,
   //          ...(Array(number - inputs.pricings.length).fill(newPlan)),
   //       ]);
   //       return;
   //    }
   //    onChange('pricings', inputs.pricings.slice(0, number));
   // };


   // const handleChangeTab = (step) => {
   //    setSelectedVariant(step);
   //    switch (step) {
   //       case 1:
   //          onChange('pricings', [newPlan]);
   //          break;
   //       case 2:
   //          onChange('pricings', Array(3).fill(newPlan));
   //          break;
   //       default:
   //          onChange('pricings', Array(2).fill(newPlan));
   //    }
   // };

   const handleChangePlanInputs = (i, name, value, isMembership) => {
      const newPlans = inputs.pricings.map((e, index) => {
         if (index === i) {
            if (name === 'pricing_type') {
               const retrunValue = {
                  name: e.name,
                  pricing_type: value,
                  currency: 'USD',
                  payment_method: getCheckedPayments(),
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

   const handleAddNewPlan = () => {
      onChange('pricings', [
         ...inputs.pricings,
         {
            ...newPlan,
            payment_method: getCheckedPayments(),
         },
      ]);
   };

   const handleDeleteNewPlan = (indexToRemove) => {
      const newPricings = [...inputs.pricings];
      newPricings.splice(indexToRemove, 1);
      clearErrorMessages();
      onChange('pricings', newPricings);
   };

   return (
      <div className='plan__create__left'>
         <div>
            <div>
               <Text
                  inner='New Membership'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
            </div>
            <div>
               <Text
                  inner='Set up a new membership. Define its pricing and select a payment type to streamline the setup process. '
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
            </div>
         </div>
         <div className='plan__create__left__inputs'>
            {/* <Input
               name='name'
               onChange={ onChange }
               placeholder='Enter the name of your membership'
               maxlength={ 30 }
               value={ inputs.name }
               withIcon={ true }
               iconName='Generator'
               setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
               IToolTipTextNew='AI Generator'
               label='Membership Name'
               helpText={ `${ (inputs.name || '').length }/30` }
            /> */}
            {/* <Select
               options={ courses }
               value={ inputs.course_id }
               name='course_id'
               label='Product'
               onChange={ onChange }
               placeholder='Select from list'
               type='select-medium'
               hasSearch
            /> */}
            <div className='plan__create__left__inputs__picture'>
               <Text
                  inner='Membership Cover'
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
            {/* <div className='plan__create__left__inputs__tab'>
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
            </div> */}
            {/* {selectedVariant === 0 && ( */}
            {/* <Input
               type='number'
               value={ inputs.pricings.length }
               onChange={ handleChangeNumberCustom }
               label='Custom Number of Plans'
               minNumber={ 0 }
            /> */}
            {/* )} */}
            <div className='plan__create__left__plan__membership'>
               {inputs.pricings.map((e, index) => {
                  return (
                     <PricingItem
                        e={ e }
                        index={ index }
                        handleChangePlanInputs={ handleChangePlanInputs }
                        isMembership={ true }
                        handleDeleteNewPlan={ () => handleDeleteNewPlan(index) }
                        isFalseDelete={ inputs.pricings.length === 1 }
                        errorMessages={ errorMessages }
                        addTemporaryErrorMessage={ addTemporaryErrorMessage }
                     />
                  );
               })}
               <Button
                  theme={ btnTheme.tertiaryGreen }
                  size={ btnSize.medium44 }
                  text='Add New One'
                  style={ { width: '151px' } }
                  onClick={ handleAddNewPlan }
                  isIconRight={ true }
                  iconName='PlusM'
               />
            </div>
         </div>
         <PaymentBlock
            integrations={ integrations }
            pricings={ inputs.pricings }
            handleInputChange={ onChange }
            goToIntegrations={ goToIntegrations }
            getCheckedPayments={ getCheckedPayments }
            errorMessages={ errorMessages['pricings.0.payment_method'] }
         />
         <div className='plan__create__left__buttons'>
            {/* <Button
               text='Cancel'
               theme={ btnTheme.secondary }
               onClick={ () => {} }
            /> */}
            <Button
               text='Create Membership'
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

MembershipCreateLeft.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   // courses: PropTypes.array,
   handleCreatePlan: PropTypes.func,
   integrations: PropTypes.array,
   goToIntegrations: PropTypes.func,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default MembershipCreateLeft;
