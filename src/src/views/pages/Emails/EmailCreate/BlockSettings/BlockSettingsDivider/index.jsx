import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
// import CssCustomSelector from 'components/elements/CssCustomSelector';
import TextInputRange from 'components/elements/form/TextInputRange';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Select from 'components/elements/SelectNew';
import TagSelect from 'components/elements/TagMultiSelect';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import Tabs from 'components/elements/tabs';
import IconNew from 'components/elements/iconsSize';

const BlockSettingsDivider = ({
   inputs, onChange,
}) => {
   const tabVariants = [
      { value: 'filled', key: 'Filled', iconName: '' },
      { value: 'outline', key: 'Outline', iconName: '' },
   ];
   return (
      <>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Divider Style'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <Select
               iconName='ArrowSelectM'
               options={ [
                  { label: '____________________________', value: 'solid' },
                  { label: '- - - - - - - - - - - - - - - - - - - - - - - -', value: 'dashed' },
                  { label: '. . . . . . . . . . . . . . . . . . . . . . . . .', value: 'dotted' },
               ] }
               placeholder='Select type'
               type='select-medium'
               label='Line Type'
               value={ inputs.borderStyle }
               name='borderStyle'
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
               label='Line Color'
               isPageBuilder={ true }
               placeholder='#A1A5A5'
               name='borderColor'
               value={ inputs.borderColor }
               onChange={ onChange }
            />
         </div>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Size'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <TextInputRange
               label='Line Thickness'
               type='range'
               leftText={ inputs.borderWidth }
               // id={ `font-${ slug }` }
               min={ 5 }
               max={ 60 }
               name='borderWidth'
               value={ inputs.borderWidth }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Line Width'
               type='range'
               leftText={ inputs.width }
               // id={ `font-${ slug }` }
               min={ 5 }
               max={ 500 }
               name='width'
               value={ inputs.width }
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
            <div className='divider_row'>
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
            <TextInputRange
               label='Padding Top'
               type='range'
               leftText={ inputs.paddingTop }
               // id={ `font-${ slug }` }
               min={ 5 }
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
               min={ 5 }
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
               min={ 5 }
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
               min={ 5 }
               max={ 60 }
               name='paddingLeft'
               value={ inputs.paddingLeft }
               onChange={ (value, name) => { onChange(name, value); } }
            />
         </div>
      </>
   );
};

BlockSettingsDivider.defaultProps = {
   inputs: {},
};

BlockSettingsDivider.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
};

export default BlockSettingsDivider;
