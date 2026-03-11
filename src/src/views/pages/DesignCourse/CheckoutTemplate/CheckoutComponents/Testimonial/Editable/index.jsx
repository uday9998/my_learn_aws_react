/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
// import Input from 'components/elements/inputNew';
import UploadImage from 'components/modules/uploadImage';
import InlineEditor from 'components/modules/InlineEditor';

const TestimonialEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, color, text, author_name,
      index, picture_src, author_color, deleteTestimonial, subIndex,
      editableComponentSection,
   } = props;

   const [charectersLimitAuthor, setCharectersLimitAuthor] = useState(author_name && author_name.length);
   const [charectersLimit, setCharectersLimit] = useState(text && text.length);

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);
   return (
      <div className='testimonialEditable' data-slug={ slug }>
         <div>
            <div className='m-b-m'>
               <UploadImage
                  label='Upload Image'
                  onChange={ (name, img) => changeProp(img, 'picture_src', 'subcomponent', index, subIndex) }
                  src={ picture_src || '' }
                  recomendation='1920x1080'
                  isImageUpload={ true }
               />
            </div>
            <div className='m-b-m'>
               {/* <Input
                  label='Author'
                  placeholder=''
                  id={ `author-${ slug }` }
                  name='authorName'
                  value={ author_name }
                  onChange={ (key, value) => { changeProp(value, 'author_name', 'subcomponent', index, subIndex); setCharectersLimitAuthor(value.length); } }
                  disabled={ true }
                  maxlength='170'
                  isDiv={ true }
               /> */}
               <InlineEditor
                  text={ author_name }
                  slug={ slug }
                  changeProp={ changeProp }
                  index={ index }
                  subIndex={ subIndex }
                  isSubcomponent={ true }
                  propsName='author_name'
                  fromEditable={ true }
               />
            </div>
            <div className='m-b-m'>
               <ColorInput
                  label='Author Color'
                  name='color'
                  value={ author_color || editableComponentSection.authorColor }
                  onChange={ (key, value) => changeProp(value, 'author_color', 'subcomponent', index, subIndex) }
                  isPageBuilder={ true }
               />
            </div>
            <div>
               {/* <Input
                  label='Description'
                  placeholder=''
                  id={ `text-${ slug }` }
                  name='text'
                  value={ text }
                  onChange={ (key, value) => { changeProp(value, 'text', 'subcomponent', index, subIndex); setCharectersLimit(value.length); } }
                  disabled={ true }
                  maxlength='170'
                  isDiv={ true }
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
            <div>
               <ColorInput
                  label='Description Color'
                  name='color'
                  value={ color || editableComponentSection.descriptionColor }
                  onChange={ (key, value) => changeProp(value, 'color', 'subcomponent', index, subIndex) }
                  isPageBuilder={ true }
               />
            </div>
         </div>
         <div className='m-t-exl flex justify-center'>
            <BaseButton
               theme={ btnTheme.red }
               size={ btnSize.medium }
               style={ { marginBottom: '12px' } }
               text='Delete'
               onClick={ () => deleteTestimonial(index, subIndex) }
            />
         </div>
      </div>
   );
};


TestimonialEditable.propTypes = {
   color: PropTypes.string,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   text: PropTypes.string,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   picture_src: PropTypes.string,
   author_name: PropTypes.string,
   author_color: PropTypes.string,
   deleteTestimonial: PropTypes.func,
   editableComponentSection: PropTypes.object,
   subIndex: PropTypes.number,
};

export default TestimonialEditable;
