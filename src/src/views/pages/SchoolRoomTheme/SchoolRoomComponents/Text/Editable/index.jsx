/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Spacing from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Spacing';
import './index.scss';
import Switch from 'components/elements/switchNew';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import InlineEditor from 'components/modules/InlineEditor';

const TextEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color, fontSize, text,
      index, paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign, lineHeight,
      width, maxWidth, justifyContent, bgColor, hasVisibility, visibility, isContent, isFooter,
      onlineCourseText, subIndex,
   } = props;
   const id = `${ Math.random().toString(16).slice(2) }`;
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   const textAlignOptions = [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
   ];

   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];

   return (
      <div className='textEditable' data-slug={ slug }>
         {hasVisibility && (
            <div className='m-b-m'>
               <Switch
                  value={ visibility === true }
                  label='Show Text'
                  positionText='left'
                  size='medium'
                  onChange={ (value) => changeProp(value, 'visibility', 'component', index) }
               />
            </div>
         )}
         {isContent && (
            <div>
               {/* <ColorInput
                  label='Text Color'
                  name='color'
                  value={ color }
                  onChange={ (key, value) => changeProp(value, 'color', 'component', index) }
                  isPageBuilder={ true }
               /> */}
            </div>
         )}
         { !isContent
         && (
            <>
               <div>
                  {/* <Input
                     label='Text'
                     placeholder=''
                     id={ `text-${ slug }` }
                     name='text'
                     value={ text }
                     onChange={ (key, value) => { changeProp(value, 'text', onlineCourseText ? 'subcomponent' : 'component', index, subIndex); } }
                     disabled={ !isFooter }
                     maxlength='190'
                     classI='textEditorColor'
                  // rightLabel={ `${ text.length }/190` }
                  /> */}
                  {
                     !onlineCourseText && (
                        <InlineEditor
                           text={ text }
                           slug={ slug }
                           changeProp={ changeProp }
                           index={ index }
                           fromEditable={ true }
                        />
                     )
                  }
               </div>
               <div className='m-t-m'>
                  <ColorInput
                     label='Text Color'
                     name='color'
                     value={ color }
                     onChange={ (key, value) => changeProp(value, 'color', onlineCourseText ? 'subcomponent' : 'component', index, subIndex) }
                     isPageBuilder={ true }
                  />
               </div>
               <div className='m-t-m'>
                  <ColorInput
                     label='Background Color'
                     name='bgColor'
                     value={ bgColor }
                     onChange={ (key, value) => changeProp(value, 'bgColor', onlineCourseText ? 'subcomponent' : 'component', index, subIndex) }
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
                     onChange={ (value, name) => { changeProp(value, name, onlineCourseText ? 'subcomponent' : 'component', index, subIndex); } }
                  />
               </div>
               {!isFooter
            && (
               <>
                  <div className='m-t-m'>
                     <Select
                        label='Text Align'
                        className=''
                        heading=''
                        placeholder='Text Align'
                        type='select-medium'
                        value={ textAlign }
                        onChange={ (name, value) => changeProp(value, 'textAlign', onlineCourseText ? 'subcomponent' : 'component', index, subIndex) }
                        options={ textAlignOptions }
                        id={ id }
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
                        onChange={ (value, name) => { changeProp(value, name, onlineCourseText ? 'subcomponent' : 'component', index, subIndex); } }
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
                        onChange={ (value, name) => { changeProp(value, name, onlineCourseText ? 'subcomponent' : 'component', index, subIndex); } }
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
                        showResetButton={ true }
                        name='maxWidth'
                        value={ maxWidth }
                        onChange={ (value, name) => { changeProp(value, name, onlineCourseText ? 'subcomponent' : 'component', index, subIndex); } }
                     />
                  </div>
                  {/* {maxWidth !== 'initial'
         && (
            <div>
               <Select
                  label='Align Content'
                  className=''
                  heading=''
                  type='select-medium'
                  placeholder='Align Content'
                  value={ justifyContent }
                  onChange={ (name, value) => changeProp(value, 'justifyContent', 'component', index) }
                  options={ textAlignFlexOptions }
               />
            </div>
         )} */}
                  {!onlineCourseText && (
                     <Select
                        label='Align Content'
                        className=''
                        heading=''
                        type='select-medium'
                        placeholder='Align Content'
                        value={ justifyContent }
                        onChange={ (name, value) => changeProp(value, 'justifyContent', onlineCourseText ? 'subcomponent' : 'component', index, subIndex) }
                        options={ textAlignFlexOptions }
                     />
                  )}
                  
                  <div className='m-t-m'>
                     <Spacing
                        top={ paddingTop }
                        bottom={ paddingBottom }
                        left={ paddingLeft }
                        right={ paddingRight }
                        changeProp={ onlineCourseText ? (value, name) => changeProp(value, name, 'subcomponent', index, subIndex) : changeProp }
                        index={ index }
                        slug={ slug }
                     />
                  </div>
               </>
            )}
            </>
         )}
      </div>

   );
};

TextEditable.defaultProps = {
   paddingLeft: '0',
   paddingRight: '0',
   paddingTop: '0',
   paddingBottom: '0',
   textAlign: 'left',
   lineHeight: '1',
   width: '100',
   maxWidth: 'initial',
   justifyContent: 'flex-start',
   bgColor: 'transparent',
   isFooter: false,
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
   textAlign: PropTypes.string,
   lineHeight: PropTypes.string,
   width: PropTypes.string,
   maxWidth: PropTypes.string,
   justifyContent: PropTypes.string,
   bgColor: PropTypes.string,
   hasVisibility: PropTypes.bool,
   visibility: PropTypes.bool,
   isContent: PropTypes.bool,
   isFooter: PropTypes.bool,
   onlineCourseText: PropTypes.bool,
   subIndex: PropTypes.number,
};

export default TextEditable;
