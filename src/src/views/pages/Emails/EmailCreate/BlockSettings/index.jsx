import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';
import Input from 'components/elements/inputNew';
import UploadImage from 'components/modules/uploadImage';
import UploadWithMedia from 'components/elements/UploadWithMedia';
import BlockSettingsButton from './BlockSettingsButton';
import BlockSettingsDivider from './BlockSettingsDivider';
import BlockSettingsEmpty from './BlockSettingsEmpty';
import BlockSettingsAddress from './BlockSettingsAddress';
import BlockSettingsLink from './BlockSettingsLink';
import BlockSettingsSocial from './BlockSettingsSocial';

const BlockSettings = ({
   inputs, onChange, type,
   onGeneralSettingsChange, emailInputs, onClose,
   onGeneralCssChange, generalCss,
}) => {
   return (
      <div className='email__block__edit__left'>
         <div
            className='email__block__edit__left__cancel'
            role='presentation'
            onClick={ onClose }
         >
            <Text
               inner='Close'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
            />
         </div>
         <div className='email__block__edit__left__settings'>
            {(!type || type === 'Global') && (
               <div className='email__block__edit__left__background'>
                  <Text
                     inner={ type ? `${ type } Settings` : 'Global Settings' }
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                     style={ { color: '#727978' } }
                  />
                  <ColorInput
                     label='Background Color'
                     isPageBuilder={ true }
                     placeholder='#3F4F65'
                     name='bg_color'
                     value={ generalCss.bg_color }
                     onChange={ onGeneralCssChange }
                  />
                  {/* <ColorInput
                     label='Brand Color'
                     isPageBuilder={ true }
                     placeholder='#3F4F65'
                     name='brand_color'
                     value={ generalCss.brand_color }
                     onChange={ onGeneralCssChange }
                  /> */}
                  <TextInputRange
                     label='Padding Top'
                     type='range'
                     leftText={ generalCss.paddingTop }
                     // id={ `font-${ slug }` }
                     min={ 0 }
                     max={ 80 }
                     name='paddingTop'
                     value={ generalCss.paddingTop }
                     onChange={ (value, name) => { onGeneralCssChange(name, value); } }
                  />
                  <TextInputRange
                     label='Padding Bottom'
                     type='range'
                     leftText={ generalCss.paddingBottom }
                     // id={ `font-${ slug }` }
                     min={ 0 }
                     max={ 80 }
                     name='paddingBottom'
                     value={ generalCss.paddingBottom }
                     onChange={ (value, name) => { onGeneralCssChange(name, value); } }
                  />
                  <TextInputRange
                     label='Padding Right'
                     type='range'
                     leftText={ generalCss.paddingRight }
                     // id={ `font-${ slug }` }
                     min={ 0 }
                     max={ 80 }
                     name='paddingRight'
                     value={ generalCss.paddingRight }
                     onChange={ (value, name) => { onGeneralCssChange(name, value); } }
                  />
                  <TextInputRange
                     label='Padding Left'
                     type='range'
                     leftText={ generalCss.paddingLeft }
                     // id={ `font-${ slug }` }
                     min={ 0 }
                     max={ 80 }
                     name='paddingLeft'
                     value={ generalCss.paddingLeft }
                     onChange={ (value, name) => { onGeneralCssChange(name, value); } }
                  />
               </div>
            )}
            { (type === 'Image' || type === 'Logo') && (
               <>
                  <Text
                     inner={ type }
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                     style={ { color: '#727978' } }
                  />
                  <UploadImage
                     isPageBuilder={ true }
                     src={ emailInputs.email_files && emailInputs.email_files[emailInputs.email_files.length - 1]
                        && emailInputs.email_files[emailInputs.email_files.length - 1].src }
                     onChange={ (file, value) => onGeneralSettingsChange('src', value, file, false, false, true) }
                     name='src'
                     isImageUpload={ true }
                  />
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
                        placeholder='#3F4F65'
                        name='bg_color'
                        value={ inputs.bg_color }
                        onChange={ onChange }
                     />
                  </div>
                  <div className='email__block__edit__left__background'>
                     <Text
                        inner={ `${ type } Size` }
                        size={ txtSizes.small }
                        type={ txtTypes.regularDefault }
                        style={ { color: '#727978' } }
                     />
                     <TextInputRange
                        label='Image Width'
                        type='range'
                        leftText={ inputs.width }
                        // id={ `font-${ slug }` }
                        min={ 0 }
                        max={ 600 }
                        name='width'
                        value={ inputs.width }
                        onChange={ (value, name) => { onChange(name, value); } }
                     />
                  </div>
                  <div className='email__block__edit__left__background'>
                     <Text
                        inner='Link'
                        size={ txtSizes.small }
                        type={ txtTypes.regularDefault }
                        style={ { color: '#727978' } }
                     />
                     <Input
                        helpText='optional'
                        value={ inputs.image_link || '' }
                        onChange={ onChange }
                        name='image_link'
                        label='Image Link'
                     />
                  </div>
               </>
            )}
            { type === 'AttachedFile' && (
               <>
                  <div className='email__block__edit__left__background'>
                     <Text
                        inner='Attached file'
                        size={ txtSizes.small }
                        type={ txtTypes.regularDefault }
                        style={ { color: '#727978' } }
                     />
                     <UploadWithMedia
                        isHaveFileIcon={ true }
                        isBulk={ true }
                        generalButtonProps={ {
                        //  theme: themes.primary,
                           text: 'Upload Files',
                        } }
                        uploadProps={ {
                           fileLessonFormat: 'media',
                           isAmazonFile: true,
                           onChange: (value, originalName, file) => { onGeneralSettingsChange('src', value, file); },
                        } }
                     />
                     <Text
                        inner='Attached files will be displayed at the bottom of the email '
                        size={ txtSizes.small }
                        type={ txtTypes.regularDefault }
                        style={ { color: '#727978' } }
                     />
                  </div>
               </>
            )}
            <div className='email__block__edit__left__background'>
               {(type === 'Text' || type === 'Image')
               && (
                  <Text
                     inner='Spacing'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                     style={ { color: '#727978' } }
                  />
               )}
               {(type === 'Text')
               && (
                  <>
                     <ColorInput
                        label='Background Color'
                        isPageBuilder={ true }
                        placeholder='#3F4F65'
                        name='bg_color'
                        value={ inputs.bg_color }
                        onChange={ onChange }
                     />
                     <TextInputRange
                        label='Letter spacing'
                        type='range'
                        leftText={ inputs.letterSpacing }
                        // id={ `font-${ slug }` }
                        min={ 1 }
                        max={ 5 }
                        name='letterSpacing'
                        value={ inputs.letterSpacing }
                        onChange={ (value, name) => { onChange(name, value); } }
                     />
                  </>
               )}
               { (type === 'Text' || type === 'Image' || type === 'Logo')
                && (
               // Stex
                   <>
                     
                      <TextInputRange
                         label='Padding Top'
                         type='range'
                         leftText={ inputs.paddingTop }
                         // id={ `font-${ slug }` }
                         min={ 0 }
                         max={ 80 }
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
                         max={ 80 }
                         name='paddingBottom'
                         value={ inputs.paddingBottom }
                         onChange={ (value, name) => { onChange(name, value); } }
                      />
                      <TextInputRange
                         label='Padding Left'
                         type='range'
                         leftText={ inputs.paddingLeft }
                         // id={ `font-${ slug }` }
                         min={ 0 }
                         max={ 80 }
                         name='paddingLeft'
                         value={ inputs.paddingLeft }
                         onChange={ (value, name) => { onChange(name, value); } }
                      />
                      <TextInputRange
                         label='Padding Right'
                         type='range'
                         leftText={ inputs.paddingRight }
                         // id={ `font-${ slug }` }
                         min={ 0 }
                         max={ 80 }
                         name='paddingRight'
                         value={ inputs.paddingRight }
                         onChange={ (value, name) => { onChange(name, value); } }
                      />
                   </>
                )}
            </div>
            {(type === 'Button')
               && (
                  <BlockSettingsButton
                     onChange={ onChange }
                     inputs={ inputs }
                     emailInputs={ emailInputs }
                     onGeneralSettingsChange={ onGeneralSettingsChange }
                  />
               )}
            {(type === 'Divider')
               && (
                  <BlockSettingsDivider onChange={ onChange } inputs={ inputs } />
               )}
            {(type === 'EmptyBlock')
               && (
                  <BlockSettingsEmpty onChange={ onChange } inputs={ inputs } />
               )}
            {(type === 'Address')
               && (
                  <BlockSettingsAddress onChange={ onChange } inputs={ inputs } />
               )}
            {(type === 'SocialMedia')
               && (
                  <BlockSettingsSocial
                     onChange={ onChange }
                     inputs={ inputs }
                     emailInputs={ emailInputs }
                     onGeneralSettingsChange={ onGeneralSettingsChange }
                  />
               )}
            {(type === 'LinkBlock')
               && (
                  <BlockSettingsLink
                     onChange={ onChange }
                     inputs={ inputs }
                     emailInputs={ emailInputs }
                     onGeneralSettingsChange={ onGeneralSettingsChange }
                  />
               )}
         </div>
      </div>

   );
};

BlockSettings.defaultProps = {
   inputs: {},
   type: 'Global',
};

BlockSettings.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   onClose: PropTypes.func,
   type: PropTypes.string,
   onGeneralSettingsChange: PropTypes.func,
   emailInputs: PropTypes.object,
   onGeneralCssChange: PropTypes.func,
   generalCss: PropTypes.object,
};

export default BlockSettings;
