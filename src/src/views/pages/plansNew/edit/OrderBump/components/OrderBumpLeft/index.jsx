import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import Line from 'components/elements/Line';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import { priceOption } from 'utils/getCurrencySymbol';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const OrderBumpLeft = ({
   inputs, onChange, goBack, onCreate, offers, pricingOptions, selectedPricing,
   errorMessages = {}
}) => {
   return (
      <div className='plan__order__bump__view__left'>
         <Text
            inner='Order Bump'
            type={ types.medium160 }
            size={ sizes.xlarge }
         />
         <Select
            label='Select Bundle'
            value={ inputs.offer }
            options={ offers }
            type='select-medium'
            name='offer'
            onChange={ onChange }
            placeholder='Select an Offer'
         />
         {inputs.offer && (
            <Select
               label='Select Pricing'
               value={ inputs.pricing }
               options={ pricingOptions }
               type='select-medium'
               name='pricing'
               onChange={ onChange }
               placeholder='Select a pricing'
            />
         )}
         <Input
            errorMessages={errorMessages.headline}
            placeholder='Enter headline'
            label='Headline'
            name='headline'
            maxlength={ 60 }
            value={ inputs.headline }
            onChange={ onChange }
         />
         <Input
            type='textarea'
            placeholder='Enter description'
            helpText='Optional'
            label='Description'
            value={ inputs.description }
            name='description'
            onChange={ onChange }
         />
         {selectedPricing && selectedPricing.pricing_type !== 0 && (
            <>
               <Line />
               <div className='plan__order__bump__view__left__block'>
                  <Text
                     inner='Price Point'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <div>
                     <Text
                        inner='You can have only one currency in one checkout. You can change it in'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                     <Text
                        inner='Payment Settings.'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#3060BD', textDecoration: 'underline', cursor: 'pointer' } }
                     />
                  </div>
               </div>
               <Text
                  inner='Discount Type'
                  type={ types.medium150 }
                  size={ sizes.medium }
               />
               <div className='plan__order__bump__view__left__types'>
                  <CheckboxCircle
                     isChecked={ inputs.type === 0 }
                     label='Percent Off'
                     onCheck={ () => onChange('type', 0) }
                  />
                  <CheckboxCircle
                     isChecked={ inputs.type === 1 }
                     label='Amount Off'
                     onCheck={ () => onChange('type', 1) }
                  />
               </div>
               {inputs.type === 1 && (
                  <div className='plan__order__bump__view__left__amount'>
                     <ErrorMessageWrapper errorMessages={errorMessages.price}>
                        <Input
                           value={ inputs.price }
                           type='number'
                           label='Amount'
                           maxNumber={ selectedPricing.price }
                           minNumber={ 0 }
                           name='price'
                           onChange={ (name, value) => onChange(name, value) }
                        />
                     </ErrorMessageWrapper>
                     <Select
                        options={ priceOption }
                        type='select-medium'
                        onChange={ (name, value) => onChange(name, value) }
                        name='currency'
                        value={ inputs.currency }
                        label='Currency'
                     />
                  </div>
               )}
               {inputs.type === 0 && (
                  <div className='plan__order__bump__view__left__amount'>
                     <ErrorMessageWrapper errorMessages={errorMessages.percent}>
                        <Input
                           label='Percent'
                           value={ inputs.percent }
                           type='number'
                           onChange={ onChange }
                           name='percent'
                           maxNumber={ 100 }
                           minNumber={ 0 }
                        />
                     </ErrorMessageWrapper>
                  </div>
               )}
            </>
         )}
         <div className='plan__order__bump__view__left__buttons'>
            <Button
               theme={ themes.secondary }
               onClick={ () => goBack() }
               text='Cancel'
            />
            <Button
               text={ inputs.id ? 'Update Order' : 'Create Order' }
               disabled={ !(selectedPricing && inputs.offer) }
               onClick={ () => onCreate() }
            />
         </div>
      </div>
   );
};

OrderBumpLeft.propTypes = {
   inputs: PropTypes.object,
   onCreate: PropTypes.func,
   goBack: PropTypes.func,
   onChange: PropTypes.func,
   offers: PropTypes.array,
   pricingOptions: PropTypes.array,
   selectedPricing: PropTypes.any,
   errorMessages: PropTypes.object,
};

export default OrderBumpLeft;
