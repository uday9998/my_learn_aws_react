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
      width, maxWidth, justifyContent, bgColor, hasVisibility, visibility, subIndex,
   } = props;

   const id = `${ Math.random().toString(16).slice(2) }`;
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
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
                  label='Show Text'
                  value={ visibility === true }
                  positionText='left'
                  name='visibility'
                  onChange={ (value) => changeProp(value, 'visibility', 'subcomponent', index, subIndex) }
                  isCommentPage={ true }
                  switchOnOff={ true }
               />
            </div>
         )}

         <div>
            {/* <Input
               label='Text'
               placeholder=''
               type='textarea'
               id={ `text-${ slug }` }
               name='text'
               value={ text }
               onChange={ (key, value) => { changeProp(value, 'text', 'subcomponent', index, subIndex); } }
               disabled={ true }
               isDiv={ true }
               // maxlength='190'
               // rightLabel={ `${ charectersLimit }/190` }
            /> */}
            <InlineEditor
               text={ text }
               slug={ slug }
               changeProp={ changeProp }
               index={ index }
               subIndex={ subIndex }
               isSubcomponent={ true }
               fromEditable={ true }
            />
         </div>
         <div className='m-t-m'>
            <ColorInput
               label='Text Color'
               name='color'
               value={ color }
               onChange={ (key, value) => changeProp(value, 'color', 'subcomponent', index, subIndex) }
               isPageBuilder={ true }
            />
         </div>
         <div className='m-t-m'>
            <ColorInput
               label='Background Color'
               name='bgColor'
               value={ bgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', 'subcomponent', index, subIndex) }
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
               onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
            />
         </div>
         <div className='m-t-m'>
            <Select
               label='Text Align'
               className=''
               type='select-medium'
               heading=''
               placeholder='Text Align'
               value={ textAlign }
               onChange={ (name, value) => changeProp(value, 'textAlign', 'subcomponent', index, subIndex) }
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
               onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
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
               onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
            />
         </div>
         <div>
            <TextInputRange
               label='Max Width (px)'
               type='range'
               leftText={ maxWidth }
               id={ `maxwidth-${ slug }` }
               showResetButton={ true }
               min={ 0 }
               max={ 650 }
               name='maxWidth'
               value={ maxWidth }
               onChange={ (value, name) => { changeProp(value, name, 'subcomponent', index, subIndex); } }
            />
         </div>
         {maxWidth !== 'initial'
         && (
            <div>
               <Select
                  label='Align Content'
                  className=''
                  heading=''
                  type='select-medium'
                  placeholder='Align Content'
                  value={ justifyContent }
                  onChange={ (name, value) => changeProp(value, 'justifyContent', 'subcomponent', index, subIndex) }
                  options={ textAlignFlexOptions }
               />
            </div>
         )}
         <div className='m-t-m'>
            <Spacing
               top={ paddingTop }
               bottom={ paddingBottom }
               left={ paddingLeft }
               right={ paddingRight }
               changeProp={ changeProp }
               index={ index }
               subIndex={ subIndex }
               slug={ slug }
               componentType='subcomponent'
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
   textAlign: 'left',
   lineHeight: '1',
   width: '100',
   maxWidth: 'initial',
   justifyContent: 'flex-start',
   bgColor: 'transparent',
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
   subIndex: PropTypes.number,
};

export default TextEditable;
