/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import ColorInput from 'components/elements/form/ColorInput';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import './index.scss';
import UploadImage from 'components/modules/uploadImage';
import CheckboxCircle from 'components/elements/CheckboxCircle';


const SectionEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, background_type, bgImgSrc, bgColor, duplicated,
   } = props;
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   return (
      <div
         className='sectionEditable'
         data-slug={ slug }
      >
         {duplicated !== 'payment_section'
         && (
            <div>
               <CheckboxCircle
                  label='Background Image'
                  onCheck={ () => changeProp('image', 'background_type', 'section') }
                  isChecked={
                     background_type
               === 'image'
                  }
               />
               <div className='m-b-m'>
                  <UploadImage
                     label='Upload Image'
                     onChange={ (name, img) => changeProp(img, 'bgImgSrc', 'section') }
                     src={ bgImgSrc || '' }
                     otherProps={ {
                        cropRatio: duplicated === 'main_background' ? '1920x1080' : '',
                     } }
                     recomendation='1920x800'
                     isImageUpload={ true }
                  />
               </div>
               <CheckboxCircle
                  label='Background Color'
                  onCheck={ () => changeProp('color', 'background_type', 'section') }
                  isChecked={
                     background_type
               === 'color'
                  }
               />
               <ColorInput
                  label='Background Color'
                  name='bgColor'
                  value={ bgColor }
                  onChange={ (key, value) => changeProp(value, 'bgColor', 'section') }
                  isPageBuilder={ true }
               />
            </div>
         )
         }
         {duplicated === 'payment_section'
         && (
            <div>
               <ColorInput
                  label='Background Color'
                  name='bgColor'
                  value={ bgColor }
                  onChange={ (key, value) => changeProp(value, 'bgColor', 'section') }
                  isPageBuilder={ true }
               />
            </div>
         )}
      </div>
   );
};

SectionEditable.defaultProps = {
};

SectionEditable.propTypes = {
   background_type: PropTypes.string,
   slug: PropTypes.string,
   bgColor: PropTypes.string,
   changeProp: PropTypes.func,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   bgImgSrc: PropTypes.string,
   duplicated: PropTypes.string,
};

export default SectionEditable;
