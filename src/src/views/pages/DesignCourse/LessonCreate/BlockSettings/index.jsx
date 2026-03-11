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
import CheckBox from 'components/elements/form/CheckBoxNew';
import Select from 'components/elements/SelectNew';
import UploadImage from 'components/modules/uploadImage';

const BlockSettings = ({
   inputs, onSettingsChange, onClose, type, openQuizSettings,
   quiz, onQuizSettingsChange, isVideo,
}) => {
   return (
      <div className='block__edit__left'>
         <div
            className='block__edit__left__cancel'
            role='presentation'
            onClick={ onClose }
         >
            <Text
               inner='Close'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
            />
         </div>
         {!!openQuizSettings && type === 'Quiz'
         && (
            <div className='block__edit__left__settings'>
               <Text
                  inner='Quiz Settings'
                  size={ txtSizes.small }
                  type={ txtTypes.regularDefault }
                  style={ { color: '#727978' } }
               />
               <Input
                  helpText=''
                  value={ quiz.name || '' }
                  onChange={ onQuizSettingsChange }
                  name='name'
                  label='Quiz Name'
               />
               <Input
                  helpText='optional'
                  value={ quiz.description || '' }
                  onChange={ onQuizSettingsChange }
                  name='description'
                  type='textarea'
                  label='Quiz Description'
               />
               <div className='grey__line' />
               <div>
                  <div>
                     <CheckBox
                        checked={ quiz.passing_grade_status === 1 }
                        onChange={ (name, val) => onQuizSettingsChange('passing_grade_status', val ? 1 : 0) }
                        label='Automatically grade quiz'
                     />
                  </div>
               </div>
               {!!quiz.passing_grade_status && (
                  <div>
                     <Input
                        helpText=''
                        value={ quiz.passing_grade }
                        max={ 100 }
                        min={ 0 }
                        onChange={ (name, value) => {
                           const re = /^[0-9\b]+$/;
                           if ((value === '' || re.test(value)) && value < 101) {
                              onQuizSettingsChange(name, value);
                           }
                        } }
                        name='passing_grade'
                        label='Passing Grade'
                        withIcon={ true }
                        iconName='ProcentM'
                     />
                  </div>
               )}
               <div>
                  <Select
                     iconName='ArrowSelectM'
                     options={ [
                        { label: 'Always show assessment results breakdown', value: 1 },
                        { label: 'Hide assessment results', value: 0 }] }
                     placeholder=''
                     type='select-medium'
                     value={ quiz.resault_breakdown }
                     name='resault_breakdown'
                     onChange={ (name, value) => onQuizSettingsChange(name, value) }
                  />
               </div>
            </div>
         )
         }
         { !openQuizSettings
         && (
            <div className='block__edit__left__settings'>
               {type === 'Video' || type === 'Video-embed' || type === 'Video-url' ? (
                  <>
                     <div className='block__edit__left__background'>
                        <Text
                           inner='Video Settings'
                           size={ txtSizes.small }
                           type={ txtTypes.regularDefault }
                           style={ { color: '#727978', fontWeight: '600', fontSize: '18px' } }
                        />
                        <div className='settings-options-container'>
                           <div className='settings-option'>
                              <CheckBox
                                 checked={ inputs.subtitle === 1 }
                                 onChange={ (name, val) => onSettingsChange('subtitle', val ? 1 : 0) }
                                 label='Generate Subtitles'
                                 textSize='small'
                              />
                              <p className="settings-description">
                                 Automatically create captions for your video to improve accessibility
                              </p>
                           </div>
                           <div className='settings-option'>
                              <CheckBox
                                 checked={ inputs.downloadable === 1 }
                                 onChange={ (name, val) => onSettingsChange('downloadable', val ? 1 : 0) }
                                 label='Downloadable'
                                 textSize='small'
                              />
                              <p className="settings-description">
                                 Allow members to download this video for offline viewing
                              </p>
                           </div>
                           <div className='settings-option'>
                              <CheckBox
                                 checked={ inputs.autoplay === 1 }
                                 onChange={ (name, val) => onSettingsChange('autoplay', val ? 1 : 0) }
                                 label='Autoplay'
                                 textSize='small'
                              />
                              <p className="settings-description">
                                 Start playing video automatically when page loads
                              </p>
                           </div>
                           <div className='settings-option'>
                              <CheckBox
                                 checked={ inputs.loop === 1 }
                                 onChange={ (name, val) => onSettingsChange('loop', val ? 1 : 0) }
                                 label='Loop Video'
                                 textSize='small'
                              />
                              <p className="settings-description">
                                 Continuously replay video after it ends
                              </p>
                           </div>
                           <div className='settings-option'>
                              <CheckBox
                                 checked={ inputs.comments === 1 }
                                 onChange={ (name, val) => onSettingsChange('comments', val ? 1 : 0) }
                                 label='Enable Comments'
                                 textSize='small'
                              />
                              <p className="settings-description">
                                 Allow viewers to leave comments on this video
                              </p>
                           </div>
                        </div>
                     </div>
                     
                     <div className='block__edit__left__background'>
                        <Text
                           inner='Video Thumbnail'
                           size={ txtSizes.small }
                           type={ txtTypes.regularDefault }
                           style={ { color: '#727978', fontWeight: '600', fontSize: '18px' } }
                        />
                        <UploadImage
                           label='Upload Thumbnail'
                           onChange={ (name, img, file) => onSettingsChange(name, img, file && file.name, file) }
                           src={ inputs.image_src || '' }
                           name='image_src'
                           cropRatio='1920x1080'
                           isHaveRecomenededText={ true }
                           isImageUpload={ true }
                           uploadButtonText='Upload Thumbnail'
                        />
                        <p className="thumbnail-recommendation">Recommended size: 1920×1080px</p>
                     </div>
                  </>
               ) : (
                  <>
                     <div className='block__edit__left__background'>
                        <Text
                           inner='Global Settings'
                           size={ txtSizes.small }
                           type={ txtTypes.regularDefault }
                           style={ { color: '#727978' } }
                        />
                        {!isVideo && (
                           <ColorInput
                              label='Background Color'
                              isPageBuilder={ true }
                              placeholder='#3F4F65'
                              name='bg_color'
                              value={ inputs.bg_color }
                              onChange={ onSettingsChange }
                           />
                        )}
                     </div>
                     {type === 'Text'
                     && (
                        <div className='block__edit__left__background'>
                           <Text
                              inner='Spacing'
                              size={ txtSizes.small }
                              type={ txtTypes.regularDefault }
                              style={ { color: '#727978' } }
                           />
                           <TextInputRange
                              label='Letter spacing'
                              type='range'
                              leftText={ inputs.letterSpacing }
                              min={ 1 }
                              max={ 5 }
                              name='letterSpacing'
                              value={ inputs.letterSpacing }
                              onChange={ (value, name) => { onSettingsChange(name, value); } }
                              showResetButton
                           />
                        </div>
                     )}
                     {!isVideo && (
                        <div className='block__edit__left__background'>
                           <Text
                              inner='Distances'
                              size={ txtSizes.small }
                              type={ txtTypes.regularDefault }
                              style={ { color: '#727978' } }
                           />
                           <TextInputRange
                              label='Padding Top'
                              type='range'
                              leftText={ inputs.paddingTop }
                              min={ 0 }
                              max={ 60 }
                              name='paddingTop'
                              value={ inputs.paddingTop }
                              onChange={ (value, name) => { onSettingsChange(name, value); } }
                              showResetButton
                           />
                           <TextInputRange
                              label='Padding Bottom'
                              type='range'
                              leftText={ inputs.paddingBottom }
                              min={ 0 }
                              max={ 60 }
                              name='paddingBottom'
                              value={ inputs.paddingBottom }
                              onChange={ (value, name) => { onSettingsChange(name, value); } }
                              showResetButton
                           />
                        </div>
                     )}
                     {type === 'Image' && (
                        <div className='block__edit__left__background'>
                           <Text
                              inner='Size'
                              size={ txtSizes.small }
                              type={ txtTypes.regularDefault }
                              style={ { color: '#727978' } }
                           />
                           <TextInputRange
                              label='Width'
                              type='range'
                              leftText={ inputs.width }
                              min={ 0 }
                              max={ 720 }
                              name='width'
                              value={ inputs.width }
                              onChange={ (value, name) => { onSettingsChange(name, value); } }
                              showResetButton
                           />
                           <TextInputRange
                              label='Height'
                              type='range'
                              leftText={ inputs.height }
                              min={ 0 }
                              max={ 2000 }
                              name='height'
                              value={ inputs.height }
                              onChange={ (value, name) => { onSettingsChange(name, value); } }
                              showResetButton
                           />
                        </div>
                     )}
                     {(type === 'Video-embed' || type === 'Video-url') 
                      && (
                         <div className='block__edit__left__background' style={ { paddingRight: '60px' } }>
                            <div>
                               <Select
                                  iconName='ArrowSelectM'
                                  options={ [
                                     { label: 'Small', value: 1 },
                                     { label: 'Medium', value: 2 },
                                     { label: 'Full Width', value: 0 }] }
                                  placeholder=''
                                  type='select-medium'
                                  label='Video Width'
                                  value={ inputs.width || 0 }
                                  name='width'
                                  onChange={ (name, value) => onSettingsChange(name, value) }
                               />
                            </div>
                         </div>
                      )
                     }
                  </>
               )}
            </div>
         )}
      </div>
   );
};

BlockSettings.defaultProps = {
   inputs: {},
};

BlockSettings.propTypes = {
   inputs: PropTypes.object,
   onSettingsChange: PropTypes.func,
   onClose: PropTypes.func,
   type: PropTypes.string,
   openQuizSettings: PropTypes.any,
   quiz: PropTypes.object,
   onQuizSettingsChange: PropTypes.func,
   isVideo: PropTypes.bool,
};

export default BlockSettings;