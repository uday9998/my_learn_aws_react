import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as textSize, TYPE as textType } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import ColorInput from 'components/elements/form/ColorInput';
import TextInput from 'components/elements/form/TextInput';
import Select from 'components/elements/form/Select';

const EmailsDesign = ({
   emailSettings, fonts, onChange, handleFormSubmit, handleCancelChanges,
}) => {
   const fontSizeOption = ['8px', '12px', '16px', '18px', '20px', '22px', '24px', '32px', '64px'];
   const fontSizeOptionForSelect = fontSizeOption.map(option => ({ label: option, value: option }));
   const fontOptionForSelect = fonts.map(font => ({ label: font, value: font }));

   return (
      <DynamicWrapper
         isOpen={ true }
         title='Design Email Template'
         openedHasShadow
         openedBackColor='#fff'
         backColor='#fff'
      >
         <div className='emailsDesign'>
            <div className='emailsDesign__headers'>
               <div>
                  <Text
                     size={ textSize.medium }
                     type={ textType.normal }
                     inner='Headers'
                  />
               </div>
               <div className='m-t-exl'>
                  <ColorInput
                     label='Header Background Color'
                     placeholder='#FFFFFF'
                     name='email_header_bg_color'
                     value={ emailSettings.email_header_bg_color }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-m'>
                  <ColorInput
                     label='Header Text Color'
                     placeholder='#3F4F65'
                     name='email_header_text_color'
                     value={ emailSettings.email_header_text_color }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-m'>
                  <Select
                     label='Header Font Size'
                     placeholder='16'
                     iconColor='#3f4f65'
                     name='email_header_font_size'
                     value={ emailSettings.email_header_font_size }
                     options={ fontSizeOptionForSelect }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-m'>
                  <Select
                     label='Email Font'
                     placeholder='Avenue Next'
                     iconColor='#3f4f65'
                     name='email_font'
                     value={ emailSettings.email_font }
                     options={ fontOptionForSelect }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-m'>
                  <ColorInput
                     label='Text Color'
                     placeholder='#3F4F65'
                     name='email_text_color'
                     value={ emailSettings.email_text_color }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-m'>
                  <ColorInput
                     label='Link Color'
                     placeholder='#3F4F65'
                     name='email_link_color'
                     value={ emailSettings.email_link_color }
                     onChange={ onChange }
                  />
               </div>
            </div>
            <div className='emailsDesign__footer'>
               <div>
                  <Text
                     size={ textSize.medium }
                     type={ textType.normal }
                     inner='Footers'
                  />
               </div>
               <div className='m-t-exl'>
                  <TextInput
                     label='Email Footer Text'
                     placeholder='Type Here'
                     type='text'
                     name='email_footer_text'
                     value={ emailSettings.email_footer_text || '' }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-exl'>
                  <ColorInput
                     label='Footer Text Color'
                     placeholder='#FFFFFF'
                     name='email_footer_text_color'
                     value={ emailSettings.email_footer_text_color }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-m'>
                  <ColorInput
                     label='Background Color'
                     placeholder='#3F4F65'
                     name='email_footer_background_color'
                     value={ emailSettings.email_footer_background_color }
                     onChange={ onChange }
                  />
               </div>
               <div className='m-t-m'>
                  <Select
                     label='Footer Font Size'
                     placeholder='16'
                     iconColor='#3f4f65'
                     name='email_footer_font_size'
                     value={ emailSettings.email_footer_font_size }
                     options={ fontSizeOptionForSelect }
                     onChange={ onChange }
                  />
               </div>
               <div className='emailsDesign__btns'>
                  <div>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.large }
                        text='Cancel'
                        onClick={ () => handleCancelChanges('template') }
                     />
                  </div>
                  <div>
                     <BaseButton
                        size={ btnSize.large }
                        text='Save'
                        onClick={ () => handleFormSubmit('template') }
                     />
                  </div>
               </div>
            </div>
         </div>
      </DynamicWrapper>
   );
};

EmailsDesign.propTypes = {
   emailSettings: PropTypes.object,
   onChange: PropTypes.func,
   fonts: PropTypes.array,
   handleFormSubmit: PropTypes.func,
   handleCancelChanges: PropTypes.func,
};

export default EmailsDesign;
