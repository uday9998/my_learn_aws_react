import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import Tabs from 'components/elements/tabs';
import IconNew from 'components/elements/iconsSize';
import { getThemeFonts } from 'utils/StaticData';

const BlockSettingsButton = ({
   inputs, onChange, emailInputs, onGeneralSettingsChange,
}) => {
   const tabVariants = [
      { value: 'filled', key: 'Filled', iconName: '' },
      { value: 'outline', key: 'Outline', iconName: '' },
   ];

   return (
      <>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Button Style'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <Text
               inner='Style'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               // style={ { color: '#727978' } }
            />
            <Tabs
               variants={ tabVariants }
               selectedVariant={ inputs.style }
               isButton={ true }
               onSelect={ (value) => onChange('style', value) }
               hasIcon={ true }
            />
         </div>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Button Settings'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <Select
               iconName='ArrowSelectM'
               options={ getThemeFonts() }
               placeholder='Select Font'
               type='select-medium'
               label='Font'
               value={ inputs.fontFamily }
               name='fontFamily'
               onChange={ (name, value) => onChange(name, value) }
            />
            <Select
               iconName='ArrowSelectM'
               options={ [
                  { label: 'Regular', value: 400 },
                  { label: 'Medium', value: 500 },
                  { label: 'Bold', value: 700 },
               ] }
               placeholder='Select Font'
               type='select-medium'
               label=''
               value={ inputs.fontWeight }
               name='fontWeight'
               onChange={ (name, value) => onChange(name, value) }
            />
            <ColorInput
               label='Background Color'
               isPageBuilder={ true }
               placeholder='#FFFFFF'
               name='bg_color'
               value={ inputs.bg_color }
               onChange={ onChange }
            />
            <ColorInput
               label='Font Color'
               isPageBuilder={ true }
               placeholder='#FFFFFF'
               name='color'
               value={ inputs.color }
               onChange={ onChange }
            />
            <ColorInput
               label='Button Color'
               isPageBuilder={ true }
               placeholder='#FFFFFF'
               name='buttonColor'
               value={ inputs.buttonColor }
               onChange={ onChange }
            />
            <TextInputRange
               label='Corner Radius'
               type='range'
               leftText={ inputs.borderRadius }
               // id={ `font-${ slug }` }
               min={ 5 }
               max={ 60 }
               name='borderRadius'
               value={ inputs.borderRadius }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Number of buttons'
               type='range'
               leftText={ inputs.amount }
               // id={ `font-${ slug }` }
               min={ 1 }
               max={ 8 }
               name='amount'
               value={ inputs.amount }
               onChange={ (value, name) => { onChange(name, value); } }
            />
         </div>
         <div className='email__block__edit__left__background'>
            {emailInputs && emailInputs.links && !!emailInputs.links.length && emailInputs.links.map(((link, i) => {
               const newIndex = i + 1;
               return (
                  <div key={ newIndex } className='button_links'>
                     <Text
                        inner={ `Button ${ i + 1 }` }
                        size={ txtSizes.small }
                        type={ txtTypes.regularDefault }
                        style={ { color: '#727978' } }
                     />
                     <div>
                        <Input
                           id={ newIndex + 1 }
                           value={ link.text }
                           onChange={ (name, value) => onGeneralSettingsChange(name, value, false, true, i) }
                           name='text'
                           label='Text'
                        />
                     </div>
                     <div>
                        <Input
                           id={ newIndex }
                           value={ link.link }
                           onChange={ (name, value) => onGeneralSettingsChange(name, value, false, true, i) }
                           name='link'
                           label='Link'
                        />
                     </div>
                  </div>
               );
            }))

            }
         </div>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Size'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <TextInputRange
               label='Font Size'
               type='range'
               leftText={ inputs.fontSize }
               // id={ `font-${ slug }` }
               min={ 5 }
               max={ 60 }
               name='fontSize'
               value={ inputs.fontSize }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Button Height'
               type='range'
               leftText={ inputs.height }
               // id={ `font-${ slug }` }
               min={ 5 }
               max={ 60 }
               name='height'
               value={ inputs.height }
               onChange={ (value, name) => { onChange(name, value); } }
            />
         </div>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Alignment'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <div className='buttons_row'>
               <div onClick={ () => { onChange('justifyContent', 'left'); } } role='presentation'>
                  <IconNew name='ButtonLeftL' color={ inputs.justifyContent === 'left' ? 'rgba(54, 121, 111, 1)' : 'rgba(231, 233, 233, 1)' } />
               </div>
               <div onClick={ () => { onChange('justifyContent', 'center'); } } role='presentation'>
                  <IconNew name='ButtonCenterL' color={ inputs.justifyContent === 'center' ? 'rgba(54, 121, 111, 1)' : 'rgba(231, 233, 233, 1)' } />
               </div>
               <div onClick={ () => { onChange('justifyContent', 'right'); } } role='presentation'>
                  <IconNew name='ButtonRightL' color={ inputs.justifyContent === 'right' ? 'rgba(54, 121, 111, 1)' : 'rgba(231, 233, 233, 1)' } />
               </div>
            </div>

         </div>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Spacing'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            {/* <TextInputRange
               label='Line Height'
               type='range'
               leftText={ inputs.lineHeight }
               // id={ `font-${ slug }` }
               min={ 1 }
               max={ 60 }
               name='lineHeight'
               value={ inputs.lineHeight }
               onChange={ (value, name) => { onChange(name, value); } }
            /> */}
            <TextInputRange
               label='Letter Spacing'
               type='range'
               leftText={ inputs.letterSpacing }
               // id={ `font-${ slug }` }
               min={ 1 }
               max={ 20 }
               name='letterSpacing'
               value={ inputs.letterSpacing }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Top'
               type='range'
               leftText={ inputs.paddingTop }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingTop'
               value={ inputs.paddingTop }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Bottom'
               type='range'
               leftText={ inputs.paddingBottom }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingBottom'
               value={ inputs.paddingBottom }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Right'
               type='range'
               leftText={ inputs.paddingRight }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingRight'
               value={ inputs.paddingRight }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Left'
               type='range'
               leftText={ inputs.paddingLeft }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingLeft'
               value={ inputs.paddingLeft }
               onChange={ (value, name) => { onChange(name, value); } }
            />
         </div>
      </>
   );
};

BlockSettingsButton.defaultProps = {
   inputs: {},
   emailInputs: {},
};

BlockSettingsButton.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   emailInputs: PropTypes.object,
   onGeneralSettingsChange: PropTypes.func,
};

export default BlockSettingsButton;
