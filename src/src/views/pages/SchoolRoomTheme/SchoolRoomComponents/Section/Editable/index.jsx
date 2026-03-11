/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import ColorInput from 'components/elements/form/ColorInput';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import TextInputRange from 'components/elements/form/TextInputRange';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import UploadImage from 'components/modules/uploadImage';
import Switch from 'components/elements/switchNew';
import Select from 'components/elements/SelectNew';
import UploadWithMedia from 'components/elements/UploadWithMedia';


const SectionEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, background_type, bgImgSrc, bgColor, duplicated,
      school_header_opacity, slider, color, school_slider_height, opacity, globalBranding, logoHeigth, school_logo,
      landing,
      // opacity_color, school_slider_status,
   } = props;

   useEffect(() => {
      if (scroll) {
         if (duplicated === 'hero') {
            highlightSidebar(slider.slug, toggleSidebar, menuVisible);
         } else {
            highlightSidebar(slug, toggleSidebar, menuVisible);
         }
      }
   }, [scroll]);

   const SliderHeightOptions = [
      { label: 'Small', value: '459px' },
      { label: 'Medium', value: '549px' },
      { label: 'Large', value: '649px' },
      { label: 'Extra large', value: 'calc(100vh - 64px)' },
   ];

   const showSliderHeight = slider.subcomponent.some(subcomponent => subcomponent.props.classType === slider.props.school_class_type);

   return (
      <div
         className='sectionEditable'
         data-slug={ slug }
      >
         {duplicated !== 'hero' && duplicated !== 'content' && duplicated !== 'header' && duplicated !== 'filter'
         && (
            <div className='main_background_section_wrapper'>
               {
                  duplicated !== 'main_background' && (
                     <>
                        <CheckboxCircle
                           isChecked={ background_type
                     === 'image' }
                           label='Background Image'
                           onCheck={ () => changeProp('image', 'background_type', 'section') }
                        />
                        <div className='m-b-m'>
                           <UploadImage
                              onChange={ (name, img) => changeProp(img, 'bgImgSrc', 'section') }
                              src={ bgImgSrc || '' }
                              otherProps={ duplicated === 'footer' ? {
                                 cropRatio: '1920x68',
                              } : {} }
                              size='full'
                              recomendation={ duplicated === 'footer' ? '1920x68' : null }
                              cropRatio={ duplicated === 'footer' ? 'free' : null }
                              isImageUpload={ true }
                           />
                        </div>
                     </>
                  )
               }
               <CheckboxCircle
                  isChecked={ background_type
                     === 'color' }
                  label='Background Color'
                  onCheck={ () => changeProp('color', 'background_type', 'section') }
               />
               <ColorInput
                  label=''
                  name='bgColor'
                  value={ bgColor || landing.school_bg_color }
                  onChange={ (key, value) => changeProp(value, 'bgColor', 'section') }
                  isPageBuilder={ true }
               />
            </div>
         )
         }
         {/* {(duplicated === 'header')
         && (
            <div className='m-b-m'>
               <Text
                  type={ TextType.regular160 }
                  size={ TextSize.small }
                  inner='Header is visible when the slider is turned OFF'
                  style={ { color: '#727978' } }
               />
            </div>
         )
         } */}
         {(duplicated === 'content' || duplicated === 'header' || duplicated === 'filter')
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
         {(duplicated === 'header')
         && (
            <>
               {/* <div className='m-t-m'>
                  <ColorInput
                     label='Text Color'
                     name='color'
                     value={ color }
                     onChange={ (key, value) => changeProp(value, 'color', 'section') }
                     isPageBuilder={ true }
                  />
               </div> */}
               <div className='m-t-l'>
                  <UploadImage
                     label='Logo'
                     onChange={ (name, img) => changeProp(img, 'school_logo', 'section') }
                     src={ globalBranding.school_logo || '' }
                     otherProps={ {
                        cropRatio: '60x30',
                     } }
                     size='full'
                     recomendation='60x30'
                     cropRatio='free'
                     isImageUpload={ true }
                  />
               </div>
               <div className='m-t-l'>
                  <TextInputRange
                     label='Logo Height'
                     type='range'
                     leftText={ logoHeigth }
                     id={ `logoHeigth-${ slug }` }
                     min={ 10 }
                     max={ 150 }
                     name='logoHeigth'
                     step='1'
                     value={ logoHeigth }
                     onChange={ (value, name) => { changeProp(value, name, 'section'); } }
                  />
               </div>
            </>
         )}
         {duplicated === 'hero'
         && (
            <>
               <div className='m-t-m'>
                  <Switch
                     label='Show Opacity On Header'
                     size='medium'
                     positionText='left'
                     value={ school_header_opacity === true }
                     name='school_header_opacity'
                     onChange={ (value) => changeProp(value, 'school_header_opacity', 'section') }
                  />
               </div>
               {school_header_opacity && (
                  <>
                     {/* <div>
                     <ColorInput
                        label='Opacity Color'
                        name='opacity_color'
                        value={ opacity_color }
                        onChange={ (key, value) => changeProp(value, 'opacity_color', 'section') }
                        isPageBuilder={ true }
                     />
                  </div> */}
                     <div>
                        <TextInputRange
                           label='Opacity'
                           type='range'
                           leftText={ opacity }
                           id={ `opacity-${ slug }` }
                           min={ 0 }
                           max={ 1 }
                           name='opacity'
                           step='0.1'
                           value={ opacity }
                           onChange={ (value, name) => { changeProp(value, name, 'section'); } }
                        />
                     </div>
                  </>
               )}
               {
                  showSliderHeight ? (
                     <div className='m-t-m'>
                        <Select
                           label='Slider Height'
                           className=''
                           heading=''
                           type='select-medium'
                           placeholder='Choose size'
                           value={ school_slider_height }
                           onChange={ (name, value) => changeProp(value, 'school_slider_height', 'section') }
                           options={ SliderHeightOptions }
                        />
                     </div>
                  ) : null
               }
            </>
         )}
      </div>
   );
};

SectionEditable.defaultProps = {
   color: '#ffffff',
   logoHeigth: 30,
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
   school_header_opacity: PropTypes.bool,
   // opacity_color: PropTypes.string,
   globalBranding: PropTypes.object,
   opacity: PropTypes.string,
   slider: PropTypes.object,
   color: PropTypes.string,
   school_slider_height: PropTypes.string,
   logoHeigth: PropTypes.number,
   school_logo: PropTypes.string,
   landing: PropTypes.object,
};

export default SectionEditable;
