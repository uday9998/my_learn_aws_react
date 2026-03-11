import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Spacing from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Spacing';
import './index.scss';
import Switch from 'components/elements/switchNew';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Select from 'components/elements/SelectNew';


const ButtonEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, disabled, color, text,
      index, bgColor, visibility, href, blanked, fontSize,
      border, borderRadius, width, justifyContent, paddingTop, paddingRight, paddingLeft,
      paddingBottom, size, isBuyButton, isFilterButton, onlineCourseButton,
   } = props;

   const [charectersLimit, setCharectersLimit] = useState(text && text.length);

   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];

   const buttonBorder = [
      { label: 'Normal', value: 'none' },
      { label: 'Bordered', value: 'solid' },
      { label: 'Dotted', value: 'dotted' },
   ];

   const buttonSize = [
      { label: 'Extra Small', value: 'extsmall' },
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Medium-Large', value: 'medium-large' },
      { label: 'Large', value: 'large' },
   ];

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   if (isFilterButton) {
      return (
         <div className='buttonEditable' data-slug={ slug }>
            <div>
               <ColorInput
                  label='Text Color'
                  name='color'
                  value={ color }
                  onChange={ (key, value) => changeProp(value, 'color', 'component', index) }
                  isPageBuilder={ true }
               />
            </div>
            <div className='m-t-m'>
               <ColorInput
                  label='Background Color'
                  name='bgColor'
                  value={ bgColor }
                  onChange={ (key, value) => changeProp(value, 'bgColor', 'component', index) }
                  isPageBuilder={ true }
               />
            </div>
         </div>
      );
   }

   return (
      <div className='buttonEditable' data-slug={ slug }>
         {!isBuyButton && (
            <>
               <div>
                  <Switch
                     label='Show Button'
                     size='medium'
                     positionText='left'
                     value={ visibility === true }
                     name='visibility'
                     onChange={ (value) => changeProp(value, 'visibility', onlineCourseButton ? 'subcomponent' : 'component', index, 2) }
                  />
               </div>
               <div className='m-t-m'>
                  <Input
                     label='Custom URL'
                     placeholder='https://miestro.com'
                     id={ `custom-${ slug }` }
                     name='text'
                     value={ href }
                     onChange={ (key, value) => { changeProp(value, 'href', onlineCourseButton ? 'subcomponent' : 'component', index, 2); } }
                     maxLength='50'
                     inputTextColor='#131f1e'
                  />
               </div>
               <div className='buttonEditable-blanked'>
                  <CheckBox
                     label='Open in new window'
                     filled
                     onChange={ (name, value) => changeProp(value, 'blanked', onlineCourseButton ? 'subcomponent' : 'component', index, 2) }
                     name='blanked'
                     checked={ blanked }
                  />
               </div>
               <div className='m-t-m' />
            </>
         )}
         <div style={ { marginBottom: '12px' } }>
            <Input
               label='Text'
               placeholder=''
               id={ `text-${ slug }` }
               name='text'
               value={ text }
               onChange={ (key, value) => { changeProp(value, 'text', onlineCourseButton ? 'subcomponent' : 'component', index, 2); setCharectersLimit(value.length); } }
               disabled={ disabled }
               maxlength='30'
               rightLabel={ `${ charectersLimit }/30` }
               inputTextColor='#131f1e'
            />
         </div>
         <div>
            <ColorInput
               label='Text Color'
               name='color'
               value={ color }
               onChange={ (key, value) => changeProp(value, 'color', onlineCourseButton ? 'subcomponent' : 'component', index, 2) }
               isPageBuilder={ true }
            />
         </div>
         <div className='m-t-m'>
            <ColorInput
               label='Background Color'
               name='bgColor'
               value={ bgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', onlineCourseButton ? 'subcomponent' : 'component', index, 2) }
               isPageBuilder={ true }
            />
         </div>
         {!isBuyButton
         && (
            <>
               <div className='m-t-m'>
                  <Select
                     label='Button Size'
                     className=''
                     heading=''
                     type='select-medium'
                     placeholder='Button Size'
                     value={ size }
                     onChange={ (name, value) => changeProp(value, 'size', onlineCourseButton ? 'subcomponent' : 'component', index, 2) }
                     options={ buttonSize }
                  />
               </div>
               <div className='m-t-m'>
                  <Select
                     label='Button Border'
                     className=''
                     heading=''
                     placeholder='Button Border'
                     type='select-medium'
                     value={ border }
                     onChange={ (name, value) => changeProp(value, 'border', onlineCourseButton ? 'subcomponent' : 'component', index, 2) }
                     options={ buttonBorder }
                  />
               </div>
               <div>
                  <TextInputRange
                     label='Border Radius (px)'
                     type='range'
                     leftText={ borderRadius }
                     id={ `borderRadius-${ slug }` }
                     min={ 0 }
                     max={ 50 }
                     name='borderRadius'
                     value={ borderRadius }
                     onChange={ (value, name) => { changeProp(value, name, onlineCourseButton ? 'subcomponent' : 'component', index, 2); } }
                  />
               </div>
               <div>
                  <TextInputRange
                     label='Font Size'
                     type='range'
                     leftText={ fontSize }
                     id={ `font-${ slug }` }
                     min={ 5 }
                     max={ 60 }
                     name='fontSize'
                     value={ fontSize }
                     onChange={ (value, name) => { changeProp(value, name, onlineCourseButton ? 'subcomponent' : 'component', index, 2); } }
                  />
               </div>
               <div>
                  <TextInputRange
                     label='Width (px)'
                     type='range'
                     leftText={ width }
                     id={ `width-${ slug }` }
                     min={ 80 }
                     max={ 600 }
                     name='width'
                     value={ width }
                     onChange={ (value, name) => { changeProp(value, name, onlineCourseButton ? 'subcomponent' : 'component', index, 2); } }
                  />
               </div>
               <div>
                  {
                     !onlineCourseButton && (
                        <Select
                           label='Align Button'
                           className=''
                           type='select-medium'
                           heading=''
                           placeholder='Align Content'
                           value={ justifyContent }
                           onChange={ (name, value) => changeProp(value, 'justifyContent', 'component', index, 2) }
                           options={ textAlignFlexOptions }
                        />
                     )
                  }
               </div>
               <div className='m-t-m'>
                  <Spacing
                     top={ paddingTop }
                     bottom={ paddingBottom }
                     left={ paddingLeft }
                     right={ paddingRight }
                     changeProp={ onlineCourseButton ? (value, name) => changeProp(value, name, 'subcomponent', index, 2) : changeProp }
                     index={ index }
                     slug={ slug }
                  />
               </div>
            </>
         )}

      </div>
   );
};

ButtonEditable.defaultProps = {
   visibility: true,
   paddingTop: '0',
   paddingBottom: '0',
   paddingLeft: '0',
   paddingRight: '0',
   isBuyButton: false,
};

ButtonEditable.propTypes = {
   disabled: PropTypes.bool,
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   text: PropTypes.string,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   bgColor: PropTypes.string,
   blanked: PropTypes.bool,
   href: PropTypes.string,
   border: PropTypes.string,
   borderRadius: PropTypes.string,
   width: PropTypes.string,
   justifyContent: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   visibility: PropTypes.bool,
   size: PropTypes.string,
   fontSize: PropTypes.string,
   isBuyButton: PropTypes.bool,
   isFilterButton: PropTypes.bool,
   onlineCourseButton: PropTypes.bool,
};

export default ButtonEditable;
