import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import ColorInput from 'components/elements/form/ColorInput';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Switch from 'components/elements/form/Switch';
import TextInputRange from 'components/elements/form/TextInputRange';
import Select from 'components/elements/SelectNew';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import { getThemeFonts } from 'utils/StaticData';
import './index.scss';
import Input from 'components/elements/inputNew';


const ButtonEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, disabled, color, text, height,
      index, bgColor, visibility, href, blanked, fontFamily, fontSize,
      border, borderRadius, width, justifyContent, paddingTop, paddingRight, paddingLeft,
      paddingBottom, size, isBuyButton, isApplyButton,
   } = props;
   const [charectersLimit, setCharectersLimit] = useState(text && text.length);
   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];

   // const buttonBorder = [
   //    { label: 'Normal', value: 'none' },
   //    { label: 'Bordered', value: 'solid' },
   //    { label: 'Dotted', value: 'dotted' },
   // ];

   // const buttonSize = [
   //    { label: 'Extra Small', value: 'extsmall' },
   //    { label: 'Small', value: 'small' },
   //    { label: 'Medium', value: 'medium' },
   //    { label: 'Medium-Large', value: 'medium-large' },
   //    { label: 'Large', value: 'large' },
   // ];


   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   return (
      <div className='buttonEditable' data-slug={ slug }>
         {!isBuyButton && (
            <>
               {/* <div>
                  <Switch
                     label='Show Button'
                     checked={ visibility === true }
                     name='visibility'
                     onChange={ (name, value) => changeProp(value, 'visibility', 'component', index) }
                     isCommentPage={ true }
                     switchOnOff={ true }
                  />
               </div> */}
               <div>
                  <Input
                     label='Custom URL'
                     placeholder='https://miestro.com'
                     id={ `custom-${ slug }` }
                     name='text'
                     value={ href }
                     onChange={ (key, value) => { changeProp(value, 'href', 'component', index); } }
                     maxLength='50'
                  />
               </div>
               <div className='buttonEditable-blanked'>
                  <CheckBox
                     label='Open in new window'
                     filled
                     onChange={ (name, value) => changeProp(value, 'blanked', 'component', index) }
                     name='blanked'
                     checked={ blanked }
                  />
               </div>
               <div className='m-t-m' />
            </>
         )}
         <div>
            <Input
               label='Text'
               placeholder=''
               id={ `text-${ slug }` }
               name='text'
               value={ text }
               onChange={ (key, value) => { changeProp(value, 'text', 'component', index); setCharectersLimit(value.length); } }
               disabled={ disabled }
               maxlength='30'
               helpText={ `${ charectersLimit }/30` }
            />
         </div>
         <div>
            <ColorInput
               label='Text Color'
               name='color'
               value={ color }
               onChange={ (key, value) => changeProp(value, 'color', 'component', index) }
               isPageBuilder={ true }
            />
         </div>
         <div>
            <ColorInput
               label='Background Color'
               name='bgColor'
               value={ bgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', 'component', index) }
               isPageBuilder={ true }
            />
         </div>

         {isBuyButton
         && (
            <>
               <div className='m-t-m'>
                  <Select
                     label='Font Family'
                     className=''
                     heading=''
                     placeholder='Font Family'
                     value={ fontFamily }
                     type='select-medium'
                     onChange={ (name, value) => changeProp(value, 'fontFamily', 'component', index) }
                     options={ getThemeFonts() }
                     fontStyles={ true }
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
                     onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                  />
               </div>
               <div>
                  <TextInputRange
                     label='Font Size'
                     type='range'
                     leftText={ fontSize }
                     id={ `font-${ slug }` }
                     min={ 5 }
                     max={ 40 }
                     name='fontSize'
                     value={ fontSize }
                     onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
                  />
               </div>

            </>
         )}
         <div>
            <TextInputRange
               label='Width (px)'
               type='range'
               leftText={ width }
               id={ `width-${ slug }` }
               min={ 80 }
               max={ isApplyButton ? 300 : 600 }
               name='width'
               value={ width }
               onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
            />
         </div>
         <div>
            {!isApplyButton && (
               <TextInputRange
                  label='Height (px)'
                  type='range'
                  leftText={ height || 45 }
                  id={ `height-${ slug }` }
                  min={ 0 }
                  max={ 100 }
                  name='height'
                  value={ height || 45 }
                  onChange={ (value) => { changeProp(value, 'height', 'component', index); } }
               />
            )}
         </div>
         {!isApplyButton && !isBuyButton
         && (
            <div>
               <Select
                  label='Align Button'
                  className=''
                  heading=''
                  placeholder='Align Content'
                  type='select-medium'
                  value={ justifyContent }
                  onChange={ (name, value) => changeProp(value, 'justifyContent', 'component', index) }
                  options={ textAlignFlexOptions }
               />
            </div>
         )
         }
         <div className='m-t-m'>
            <Spacing
               top={ paddingTop }
               bottom={ paddingBottom }
               left={ paddingLeft }
               right={ paddingRight }
               changeProp={ changeProp }
               index={ index }
               slug={ slug }
            />
         </div>


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
   height: PropTypes.string,
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
   fontFamily: PropTypes.string,
   fontSize: PropTypes.string,
   isBuyButton: PropTypes.bool,
   isApplyButton: PropTypes.bool,
};

export default ButtonEditable;
