import React, { memo } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
import { schoolDefaultColor } from 'utils/pageBuilder/schoolRoomColor';
import Select from 'components/elements/SelectNew';
import Line from 'components/elements/Line';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';
import RadioButton from 'components/elements/RadioButton';

const SchoolRoomGeneralSettings = ({
   themeMode,
   inputs, 
   onChange, 
   fontSizeOptionForSelect, 
   handleChangeThemeMode, 
   modeTemplate, 
   hasCustomColors,
}) => {
   const getColorValue = (colorName, defaultValue) => {
      const inputValue = inputs[colorName];
      const templateValue = modeTemplate?.[colorName];
      
      if (inputValue && inputValue !== templateValue) {
         return inputValue;
      }
      
      if ((themeMode.darkMode || themeMode.lightMode) && templateValue) {
         return templateValue;
      }
      
      return inputValue || defaultValue;
   };

   return (
      <div className='general__settings'>
         <div className='general__settings__top'>
            <Text
               inner='Portal Branding'
               type={ types.medium150 }
               size={ sizes.medium }
            />
            <Text
               inner='Set the tone of your portal by selecting a primary color that aligns with your brand identity.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         </div>
         <div className='light__dark__wrapper'>
            <RadioButton 
               handleChangeThemeMode={ handleChangeThemeMode }
               themeMode={ themeMode }
            />
         </div>
         
         <ColorInput
            label='Primary Color'
            name='school_color'
            value={ getColorValue('school_color', schoolDefaultColor(inputs.school_room_theme_name)) }
            onChange={ (key, value) => onChange(key, value) }
            needHexFromPicker
         />
         
         {/* <ColorInput
            label='Offer Banner Text Color'
            name='school_color_2'
            value={ getColorValue('school_color_2', '#fff') }
            onChange={ (key, value) => onChange(key, value) }
            needHexFromPicker
         />
         
         <ColorInput
            label='Button Text Color'
            name='school_button_color'
            value={ getColorValue('school_button_color', '#fff') }
            onChange={ (key, value) => onChange(key, value) }
            needHexFromPicker
         /> */}
         
         <Select
            label='Choose Font'
            placeholder='Choose Font'
            type='select-medium'
            options={ fontSizeOptionForSelect }
            name='school_font'
            value={ inputs.school_font || 'Inter' }
            onChange={ (key, value) => onChange(key, value) }
         />
         
         <Line />
         
         <div className='general__settings__upload'>
            <Text
               inner='Favicon'
               type={ types.medium150 }
               size={ sizes.medium }
            />
            <UploadMediaImageView
               src={ inputs.favicon }
               type='image'
               buttonText='Image'
               iconName='ClearImageM'
               isRemove={ true }
               isHaveFileIcon={ true }
               generalButtonProps={
                  {
                     theme: 'primary',
                  }
               }
               uploadProps={ {
                  fileLessonFormat: 'image',
                  isAmazonFile: true,
                  cropRatio: '240x240',
                  onChange: (value) => onChange('favicon', value),
               } }
            />
         </div>
         
         <Line />
      </div>
   );
};

SchoolRoomGeneralSettings.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   fontSizeOptionForSelect: PropTypes.array,
   handleChangeThemeMode: PropTypes.func,
   modeTemplate: PropTypes.object,
   themeMode: PropTypes.object,
   hasCustomColors: PropTypes.bool,
};

export default memo(SchoolRoomGeneralSettings);