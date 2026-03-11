/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import Select from 'components/elements/SelectNew';
import { getThemeFonts } from 'utils/StaticData';
import Switch from 'components/elements/switchNew';
import Input from 'components/elements/inputNew';
import './index.scss';
import InlineEditor from 'components/modules/InlineEditor';


const TextEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color, fontSize, text,
      index, paddingTop, paddingBottom, paddingLeft, paddingRight, fontFamily, lineHeight,
      width, maxWidth, justifyContent, textAlign, bgColor, course, visibility, isClassName,
      hideAlignments
   } = props;

   const endsWithTenNumbers = (text) => {
      if (/\d{10}$/.test(text)) {
         return text.slice(0, -10);
      }

      return text;
   };

   const [character, setCharecter] = useState(text || endsWithTenNumbers(course.name));

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   useEffect(() => {
      if (text || course.name) {
         setCharecter(text || endsWithTenNumbers(course.name));
      }
   }, [text, course.name]);

   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];

   const textAlignOptions = [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
   ];

   return (
      <div className='textEditable' data-slug={ slug }>
         {(index === 9 || index === 10) && (
            <div style={ { marginBottom: '16px' } }>
               <Switch
                  label='Show Text'
                  name='visibility'
                  value={ visibility === true || visibility === undefined }
                  size='medium'
                  positionText='left'
                  onChange={ () => changeProp(!(visibility === true || visibility === undefined), 'visibility', 'component', index) }
                  isCommentPage={ true }
                  switchOnOff={ true }
               />
            </div>
         )}
         <div>
            {!!isClassName && (
               <Input
                  isDiv={ true }
                  label='Text'
                  placeholder=''
                  id={ `text-${ slug }` }
                  name='text'
                  value={ character }
                  maxlength='190'
                  disabled={ true }  
                  onChange={ (key, value) => changeProp(value, 'text', 'component', index) }           
               />
            ) }
            {!isClassName && (
               <InlineEditor
                  text={ character }
                  slug={ slug }
                  changeProp={ changeProp }
                  index={ index }
                  fromEditable={ true }
               />
            )}
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
               onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
            />
         </div>
         <div>
            <Select
               label='Font Family'
               className=''
               heading=''
               type='select-medium'
               placeholder='Font Family'
               value={ fontFamily }
               onChange={ (name, value) => changeProp(value, 'fontFamily', 'component', index) }
               options={ getThemeFonts() }
               fontStyles={ true }
            />
         </div>
         <div>
            <TextInputRange
               label='Line Height'
               type='range'
               leftText={ parseFloat(lineHeight) < 1 ? 1 : lineHeight }
               id={ `line-${ slug }` }
               min={ 1 }
               max={ 6 }
               step='0.1'
               name='lineHeight'
               value={ parseFloat(lineHeight) < 1 ? 1 : lineHeight }
               onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
            />
         </div>
         <div>
            <TextInputRange
               label='Width (%)'
               type='range'
               leftText={ width }
               id={ `width-${ slug }` }
               min={ 20 }
               max={ 100 }
               name='width'
               value={ width }
               onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
            />
         </div>
         <div>
            <TextInputRange
               label='Max Width (px)'
               type='range'
               leftText={ maxWidth }
               id={ `maxwidth-${ slug }` }
               min={ 0 }
               max={ 650 }
               name='maxWidth'
               value={ maxWidth }
               onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
            />
         </div>
         {
            !hideAlignments && (
               <>
                  <div>
                     <Select
                        label='Align Content'
                        className=''
                        heading=''
                        placeholder='Align Content'
                        type='select-medium'
                        value={ justifyContent }
                        onChange={ (name, value) => changeProp(value, 'justifyContent', 'component', index) }
                        options={ textAlignFlexOptions }
                     />
                  </div>
                  <div className='m-t-m'>
                     <Select
                        label='Text Align'
                        className=''
                        heading=''
                        placeholder='Text Align'
                        type='select-medium'
                        value={ textAlign }
                        onChange={ (name, value) => changeProp(value, 'textAlign', 'component', index) }
                        options={ textAlignOptions }
                     />
                  </div>
               </>
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

TextEditable.defaultProps = {
   paddingLeft: '0',
   paddingRight: '0',
   paddingTop: '0',
   paddingBottom: '0',
   fontFamily: 'Avenir Next',
   lineHeight: '1',
   width: '100',
   maxWidth: 'initial',
   justifyContent: 'flex-start',
   textAlign: 'left',
   bgColor: 'transparent',
   hideAlignments: false,
};

TextEditable.propTypes = {
   fontSize: PropTypes.string,
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   text: PropTypes.string,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   fontFamily: PropTypes.string,
   lineHeight: PropTypes.string,
   width: PropTypes.string,
   maxWidth: PropTypes.string,
   justifyContent: PropTypes.string,
   textAlign: PropTypes.string,
   bgColor: PropTypes.string,
   course: PropTypes.object,
   visibility: PropTypes.bool,
   isClassName: PropTypes.bool,
   hideAlignments: PropTypes.bool,
};

export default TextEditable;
