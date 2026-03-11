import React, { useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import Input from 'components/elements/inputNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import GeneratorModal from 'components/elements/GeneratorModal';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';


const UpsellCreateLeft = ({
   inputs, offers, onChange, onCancel, onCreate, pricings, isDownSell, isEdit,
   errorMessages
}) => {
   const [openModal, setOpenModal] = useState({
      name: '',
      value: '',
      isOpen: false,
   });

   return (
      <div className='upsel__create__bottom__left'>
         {isEdit ? (
            <Text
               inner={ isDownSell ? 'Edit Downsell' : 'Edit Upsell' }
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
         ) : (
            <Text
               inner={ isDownSell ? 'Add Downsell' : 'Add Upsell' }
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
         )}
         <ErrorMessageWrapper errorMessages={errorMessages.offer_id}>
            <Select
               label='Select Bundle'
               type='select-medium'
               placeholder='Select from list'
               value={ inputs.offer_id }
               name='offer_id'
               isDisabled={ inputs.pricing_id && isEdit }
               onChange={ onChange }
               options={ offers }
            />
         </ErrorMessageWrapper>
         {inputs.offer_id && pricings.length > 1 && (
            <ErrorMessageWrapper errorMessages={errorMessages.pricing_id}>
               <Select
                  label='Select Pricing'
                  type='select-medium'
                  placeholder='Select a price from the list'
                  value={ inputs.pricing_id }
                  name='pricing_id'
                  onChange={ onChange }
                  options={ pricings }
               />
            </ErrorMessageWrapper>
         )}
         {inputs.pricing_id && (
            <Input
               label={ isDownSell ? 'Downsell Price' : 'Upsell Price' }
               disabled={ true }
               value={ pricings.find((e) => e.value === inputs.pricing_id)?.label || '$ -'}
            />
         )}
         <Input
            errorMessages={errorMessages.headline}
            label='Headline'
            value={ inputs.headline }
            onChange={ onChange }
            name='headline'
            withIcon={ true }
            maxlength={ 30 }
            helpText={ `${ (inputs.headline || '').length }/30` }
            iconName='Generator'
            setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
            IToolTipTextNew='AI Generator'
            placeholder='Enter Headline for Upsell'
         />
         <Input
            label='Description'
            value={ inputs.description }
            withIcon={ true }
            iconName='Generator'
            maxLengthTextArea={ 150 }
            setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
            IToolTipTextNew='AI Generator'
            placeholder='Describe the Upsell Offer'
            type='textarea'
            helpText='Optional'
            onChange={ onChange }
            name='description'
         />
         {/*       <div className='upsel__create__bottom__left__purchase'>
            <Input
               label='Purchase Button Text'
               value={ inputs.purchase_button }
               name='purchase_button'
               onChange={ onChange }
            />
            <Switch
               label='Automatically add a price to the buy button'
               checked={ inputs.autoText }
               name='autoText'
               onChange={ () => onChange('autoText', !inputs.autoText) }
            />
         </div> */}
         {/* <Input
            label='Cancel Button Text'
            value={ inputs.cancel_button }
            name='cancel_button'
            onChange={ onChange }
         /> */}
         <div className='upsel__create__bottom__left__buttons'>
            <Button
               theme={ themes.secondary }
               text='Cancel'
               onClick={ onCancel }
            />
            <Button
               theme={ themes.primary }
               text={ isDownSell ? 'Go to Customize Downsell Page' : 'Go to Customize Upsell Page' }
               onClick={ onCreate }
            />
         </div>
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               title='Upsell'
               isQuiz={ true }
               setData={ onChange }
            />
         )}
      </div>
   );
};

UpsellCreateLeft.propTypes = {
   inputs: PropTypes.object,
   offers: PropTypes.array,
   onChange: PropTypes.func,
   isDownSell: PropTypes.bool,
   isEdit: PropTypes.bool,
   onCancel: PropTypes.func,
   pricings: PropTypes.array,
   onCreate: PropTypes.func,
   errorMessages: PropTypes.object,
};

export default UpsellCreateLeft;
