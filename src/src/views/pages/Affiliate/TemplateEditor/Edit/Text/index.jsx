import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Select from 'components/elements/SelectNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

const AffiliateEditText = ({
   props, changeProp, component, sectionIndex, handleDeleteComponent,
}) => {
   const {
      paddingTop, paddingBottom, paddingLeft, paddingRight, color,
      bgColor, width, fontSize, lineHeight, textAlign, isIconText, iconColor, availableDelete,
   } = props;
   const textAlignFlexOptions = [
      { label: 'Left', value: 'start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'end' },
   ];

   return (
      <div className='affiliate__edit__text'>
         {/* <Input
            value={ text }
            name='text'
            label='Text'
            onChange={ (name, value) => changeProp(value, name) }
         /> */}
         {isIconText && (
            <ColorInput
               label='Icon Color'
               name='iconColor'
               value={ iconColor }
               onChange={ (key, value) => changeProp(value, 'iconColor') }
               isPageBuilder={ true }
            />
         )}
         <ColorInput
            label='Text Color'
            name='color'
            value={ color }
            onChange={ (key, value) => changeProp(value, 'color') }
            isPageBuilder={ true }
         />
         <ColorInput
            label='Background Color'
            name='bgColor'
            value={ bgColor }
            onChange={ (key, value) => changeProp(value, 'bgColor') }
            isPageBuilder={ true }
         />
         <TextInputRange
            label='Width (%)'
            type='range'
            leftText={ width }
            min={ 0 }
            max={ 100 }
            name='width'
            value={ width }
            onChange={ (value, name) => { changeProp(value, name); } }
         />
         <TextInputRange
            label='Font Size'
            type='range'
            leftText={ fontSize }
            min={ 5 }
            max={ 35 }
            name='fontSize'
            value={ fontSize }
            onChange={ (value, name) => { changeProp(value, name); } }
         />
         <TextInputRange
            label='Line Height'
            type='range'
            leftText={ lineHeight }
            min={ 10 }
            max={ 200 }
            name='lineHeight'
            value={ lineHeight }
            onChange={ (value, name) => { changeProp(value, name); } }
         />
         {/* <TextInputRange
            label='Max Width (px)'
            type='range'
            leftText={ maxWidth }
            min={ 0 }
            max={ 650 }
            name='maxWidth'
            value={ maxWidth }
            onChange={ (value, name) => { changeProp(name, value); } }
         /> */}
         <Select
            label='Align Content'
            className=''
            heading=''
            type='select-medium'
            placeholder='Align Content'
            value={ textAlign || 'center' }
            onChange={ (name, value) => changeProp(value, 'textAlign') }
            options={ textAlignFlexOptions }
         />
         <Spacing
            changeProp={ (value, name) => changeProp(value, name) }
            left={ paddingLeft }
            right={ paddingRight }
            bottom={ paddingBottom }
            top={ paddingTop }
         />
         {availableDelete && (
            <Button
               theme={ themes.red }
               text='Delete Text'
               onClick={ () => handleDeleteComponent(component.slug, sectionIndex) }
            />
         )}
      </div>
   );
};

AffiliateEditText.propTypes = {
   props: PropTypes.object,
   color: PropTypes.string,
   changeProp: PropTypes.func,
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   bgColor: PropTypes.string,
   lineHeight: PropTypes.any,
   isIconText: PropTypes.bool,
   fontSize: PropTypes.any,
   iconColor: PropTypes.string,
   width: PropTypes.any,
   textAlign: PropTypes.string,
   sectionIndex: PropTypes.number,
   component: PropTypes.object,
   handleDeleteComponent: PropTypes.func,
   availableDelete: PropTypes.bool,
};

export default AffiliateEditText;
