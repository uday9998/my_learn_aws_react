/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import './index.scss';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import InlineEditor from 'components/modules/InlineEditor';

const QuestionEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color, fontSize, text,
      index, textAlign, bgColor, subIndex, subofSubIndex,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true, true);
      }
   }, [scroll]);
   const id = `${ Math.random().toString(16).slice(2) }`;
   const textAlignOptions = [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
   ];

   return (
      <div className='textEditable' data-slug={ slug }>
         <>
            <div>
               {/* <Input
                  label='Text'
                  placeholder=''
                  id={ `text-${ slug }` }
                  name='text'
                  value={ text }
                  onChange={ (key, value) => { changeProp(value, 'text', 'subOfSubComponent', index, subIndex, false, [], subofSubIndex); } }
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
                  isSubofSubcomponent={ true }
                  subIndex={ subIndex }
                  subofSubIndex={ subofSubIndex }
                  fromEditable={ true }
               />
            </div>
            <div className='m-t-m'>
               <ColorInput
                  label='Text Color'
                  name='color'
                  value={ color }
                  onChange={ (key, value) => { changeProp(value, 'color', 'subOfSubComponent', index, subIndex, false, [], subofSubIndex); } }
                  isPageBuilder={ true }
               />
            </div>
            <div className='m-t-m'>
               <ColorInput
                  label='Background Color'
                  name='bgColor'
                  value={ bgColor }
                  onChange={ (key, value) => changeProp(value, 'bgColor', 'subOfSubComponent', index, subIndex, false, [], subofSubIndex) }
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
                  onChange={ (value) => { changeProp(value, 'fontSize', 'subOfSubComponent', index, subIndex, false, [], subofSubIndex); } }
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
                  onChange={ (name, value) => changeProp(value, 'textAlign', 'subOfSubComponent', index, subIndex, false, [], subofSubIndex) }
                  options={ textAlignOptions }
                  id={ id }
               />
            </div>

         </>
      </div>

   );
};

QuestionEditable.defaultProps = {
   bgColor: 'transparent',
};

QuestionEditable.propTypes = {
   fontSize: PropTypes.string,
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   text: PropTypes.string,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   textAlign: PropTypes.string,
   bgColor: PropTypes.string,
   subIndex: PropTypes.number,
   subofSubIndex: PropTypes.number,
};

export default QuestionEditable;
