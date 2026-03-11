/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import './index.scss';
import Input from 'components/elements/inputNew';
import InlineEditor from 'components/modules/InlineEditor';

const TestimonialsEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color, text, fontSize, bgColor, index,
      paddingTop, paddingRight, paddingLeft, paddingBottom, templateName,
   } = props;

   const [charectersLimit, setCharectersLimit] = useState(text && text.length);

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);
   return (
      <div className='testimonialsEditable' data-slug={ slug }>
         <div className='m-b-m'>
            <ColorInput
               label="Slider's Background color"
               name='testimonialBgColor'
               value={ bgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', 'component', index) }
               isPageBuilder={ true }
            />
         </div>
         {
            ['template1', 'template2', 'template3'].includes(templateName) && (
               <>
                  <div>
                     {/* <Input
                        label='Header'
                        placeholder=''
                        id={ `header-${ slug }` }
                        name='text'
                        value={ text }
                        onChange={ (key, value) => { changeProp(value, 'text', 'component', index); setCharectersLimit(value.length); } }
                        maxlength='190'
                        disabled={ true }
                        isDiv={ true }
                     /> */}
                     <InlineEditor
                        text={ text }
                        slug={ slug }
                        changeProp={ changeProp }
                        index={ index }
                        fromEditable={ true }
                     />
                  </div>
                  <div>
                     <ColorInput
                        label='Header color'
                        name='color'
                        value={ color }
                        onChange={ (key, value) => changeProp(value, 'color', 'component', index) }
                        isPageBuilder={ true }
                     />
                  </div>
                  <div>
                     <TextInputRange
                        label='Header Font Size'
                        type='range'
                        leftText={ fontSize }
                        id={ `font-${ slug }` }
                        min={ 5 }
                        max={ 60 }
                        name='fontSize'
                        value={ fontSize }
                        onChange={ (value) => { changeProp(value, 'fontSize', 'component', index); } }
                     />
                  </div>
               </>
            )
         }
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
   );
};


TestimonialsEditable.propTypes = {
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   text: PropTypes.string,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   fontSize: PropTypes.string,
   bgColor: PropTypes.string,
   index: PropTypes.number,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   templateName: PropTypes.string,
};

export default TestimonialsEditable;
