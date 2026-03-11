import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
// import CssCustomSelector from 'components/elements/CssCustomSelector';
import TextInputRange from 'components/elements/form/TextInputRange';
import Input from 'components/elements/inputNew';
// import CheckBox from 'components/elements/form/CheckBoxNew';
// import Select from 'components/elements/SelectNew';
// import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import IconNew from 'components/elements/iconsSize';
import TagSelect from './TagMultiSelect';


const BlockSettingsSocial = ({
   inputs, onChange, emailInputs, onGeneralSettingsChange,
}) => {
   const socialIcons = inputs.links;
   const attachedValues = emailInputs.links;


   const onRemove = (text, id, index) => {
      // const attachedValuesNew = attachedValues.filter(attachedValue => attachedValue.text !== id);
      attachedValues.splice(index, 1);
      onGeneralSettingsChange('links', { id, value: [...attachedValues] });
   };

   const onAdd = (tag) => {
      onGeneralSettingsChange('links', { value: [...attachedValues, tag] });
   };

   const onAttachTag = (tag) => {
      if (tag.label) {
         onChange('links', [...socialIcons, { value: { link: '', text: tag.label } }]);
         onGeneralSettingsChange('links', { value: [...attachedValues, { link: '', text: tag.label }] });
      }
   };


   return (
      <>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Add your social accounts'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <TagSelect
               isHaveDetach={ true }
               isNotTag={ true }
               onDetach={ (text, id, index) => onRemove(text, id, index) }
               atachTag={ (id, tag) => onAdd(tag) }
               onAttachTag={ (inputsd) => onAttachTag({ label: inputsd.name }) }
               values={ attachedValues }
               options={ socialIcons }
               placeholder='Select a Section'
            />
         </div>

         {attachedValues.length > 0
         && (
            <>
               <div className='email__block__edit__left__background'>
                  <Text
                     inner='Link'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                     style={ { color: '#727978' } }
                  />
                  {emailInputs && emailInputs.links && !!emailInputs.links.length && emailInputs.links.map(((link, i) => {
                     const newIndex = i + 1;
                     return (
                        <div key={ newIndex } className='button_links'>
                           <div>
                              <Input
                                 id={ newIndex }
                                 value={ link.link }
                                 onChange={ (name, value) => onGeneralSettingsChange(name, value, false, true, i) }
                                 name='link'
                                 label={ link.text }
                              />
                           </div>
                        </div>
                     );
                  }))

                  }
               </div>
               <div className='email__block__edit__left__background'>
                  <Text
                     inner='Icon Settings'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                     style={ { color: '#727978' } }
                  />
                  {/* <ColorInput
                  label='Icon Color'
                  isPageBuilder={ true }
                  placeholder='#131F1E'
                  name='icon_color'
                  value={ inputs.icon_color }
                  onChange={ onChange }
               /> */}
               </div>
               <div className='email__block__edit__left__background'>
                  <Text
                     inner='Block Settings'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                     style={ { color: '#727978' } }
                  />
                  <ColorInput
                     label='Background Color'
                     isPageBuilder={ true }
                     placeholder='#FFFFFF'
                     name='bg_color'
                     value={ inputs.bg_color }
                     onChange={ onChange }
                  />
               </div>
               {/* <div className='email__block__edit__left__background'>
               <Text
                  inner='Size'
                  size={ txtSizes.small }
                  type={ txtTypes.regularDefault }
                  style={ { color: '#727978' } }
               />
               <TextInputRange
                  label='Icon Size'
                  type='range'
                  leftText={ inputs.fontSize }
                  // id={ `font-${ slug }` }
                  min={ 5 }
                  max={ 60 }
                  name='fontSize'
                  value={ inputs.fontSize }
                  onChange={ (value, name) => { onChange(name, value); } }
               />
            </div> */}
               <div className='email__block__edit__left__background'>
                  <Text
                     inner='Alignment'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                     style={ { color: '#727978' } }
                  />
                  <div className='buttons_row'>
                     <div onClick={ () => { onChange('justifyContent', 'left'); } } role='presentation'>
                        <IconNew name='ButtonLeftL' color={ inputs.justifyContent === 'left' ? 'rgba(54, 121, 111, 1)' : 'rgba(231, 233, 233, 1)' } />
                     </div>
                     <div onClick={ () => { onChange('justifyContent', 'center'); } } role='presentation'>
                        <IconNew name='ButtonCenterL' color={ inputs.justifyContent === 'center' ? 'rgba(54, 121, 111, 1)' : 'rgba(231, 233, 233, 1)' } />
                     </div>
                     <div onClick={ () => { onChange('justifyContent', 'right'); } } role='presentation'>
                        <IconNew name='ButtonRightL' color={ inputs.justifyContent === 'right' ? 'rgba(54, 121, 111, 1)' : 'rgba(231, 233, 233, 1)' } />
                     </div>
                  </div>

               </div>
               <div className='email__block__edit__left__background'>
                  <Text
                     inner='Spacing'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                     style={ { color: '#727978' } }
                  />
                  <TextInputRange
                     label='Padding Top'
                     type='range'
                     leftText={ inputs.paddingTop }
                     // id={ `font-${ slug }` }
                     min={ 0 }
                     max={ 60 }
                     name='paddingTop'
                     value={ inputs.paddingTop }
                     onChange={ (value, name) => { onChange(name, value); } }
                  />
                  <TextInputRange
                     label='Padding Bottom'
                     type='range'
                     leftText={ inputs.paddingBottom }
                     // id={ `font-${ slug }` }
                     min={ 0 }
                     max={ 60 }
                     name='paddingBottom'
                     value={ inputs.paddingBottom }
                     onChange={ (value, name) => { onChange(name, value); } }
                  />
                  <TextInputRange
                     label='Between Icons'
                     type='range'
                     leftText={ inputs.gap }
                     // id={ `font-${ slug }` }
                     min={ 0 }
                     max={ 60 }
                     name='gap'
                     value={ inputs.gap }
                     onChange={ (value, name) => { onChange(name, value); } }
                  />
               </div>
            </>
         )}
      </>
   );
};

BlockSettingsSocial.defaultProps = {
   inputs: {},
   emailInputs: {},
};

BlockSettingsSocial.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   emailInputs: PropTypes.object,
   onGeneralSettingsChange: PropTypes.func,
};

export default BlockSettingsSocial;
