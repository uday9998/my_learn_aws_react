import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/elements/switchNew';
import './index.scss';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';

const AffiliateEditButton = ({
   buttonProps, changeProp, component, sectionIndex, handleDeleteComponent,
}) => {
   const {
      isAction, isBlank, inner, background, color, paddingTop,
      paddingBottom, paddingLeft, paddingRight, width, justifyContent, visibility,
      url, availableDelete,
   } = buttonProps;
   const buttonFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];
   return (
      <div className='affiliate__edit__button'>
         {/* <Input
            type='text'
            maxlength={ 30 }
            value={ inner }
            name='inner'
            placeholder='Enter button text'
            label='Text'
            helpText={ `${ inner.length }/30` }
            onChange={ (name, value) => changeProp(value, name) }
         /> */}
         {isAction && (
         <>
            <Switch
               label={ !visibility ? 'Show Button' : 'Hide Button' }
               name='visibility'
               value={ visibility === true }
               size='medium'
               positionText='left'
               onChange={ () => changeProp(!(visibility === true), 'visibility') }
               isCommentPage={ true }
               switchOnOff={ true }
            />
            <div>
               <Input
                  type='text'
                  label='Custom URL'
                  placeholder='https://miestro.com/'
                  value={ url }
                  name='url'
                  onChange={ (name, value) => changeProp(value, name) }
               />
               <CheckBox
                  label='Open in new window'
                  labelPosition='right'
                  checked={ isBlank }
                  textProps={ { style: { whiteSpace: 'nowrap' } } }
                  onChange={ () => changeProp(!isBlank, 'isBlank') }
               />
            </div>
         </>
         )}
         <div>
            <ColorInput
               label='Text Color'
               name='color'
               value={ color }
               onChange={ (key, value) => changeProp(value, 'color') }
               isPageBuilder={ true }
            />
            <ColorInput
               label='Background Color'
               name='background'
               value={ background }
               onChange={ (key, value) => changeProp(value, 'background') }
               isPageBuilder={ true }
            />
         </div>
         <TextInputRange
            label='Width %'
            type='range'
            leftText={ width }
            min={ 30 }
            max={ 100 }
            name='width'
            value={ width }
            onChange={ (value, name) => { changeProp(value, name); } }
         />
         <Select
            label='Align Button'
            className=''
            heading=''
            type='select-medium'
            placeholder='Align Button'
            value={ justifyContent || 'center' }
            onChange={ (name, value) => changeProp(value, 'justifyContent') }
            options={ buttonFlexOptions }
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
               text='Delete Button'
               onClick={ () => handleDeleteComponent(component.slug, sectionIndex) }
            />
         )}
      </div>
   );
};

AffiliateEditButton.propTypes = {
   changeProp: PropTypes.func,
   buttonProps: PropTypes.object,
   sectionIndex: PropTypes.number,
   component: PropTypes.object,
   handleDeleteComponent: PropTypes.func,
};

export default AffiliateEditButton;
