import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import ColorInput from 'components/elements/form/ColorInput';
import UploadImage from 'components/modules/uploadImage';
import './index.scss';


const General = ({
   globalBranding, saveGeneral, onChange, isChanged,
}) => {
   return (
      <div className='general'>
         <div className='general-logo'>
            <UploadImage isImageUpload={ true } label='Add Logo' src={ globalBranding.school_logo } onChange={ onChange } name='school_logo' />
         </div>
         {/* <div className='general-favicon'>
            <UploadImage label='Add Favicon' src={ globalBranding.favicon } onChange={ onChange } name='favicon' />
            <div className='optional-text'>
               <Text
                  type={ TextType.regularDefaultGrey }
                  size={ TextSize.xsmall }
                  inner='Your picture should be 260x260 or more for optimal results'
               />
            </div>
         </div>
         <div className='general-brand'>
            <div className='general-brand-title'>
               <Text
                  type={ TextType.mediumSmall }
                  size={ TextSize.medium }
                  inner='Brand Color'
               />
            </div>
            <div className='general-brand-subtitle'>
               <Text
                  type={ TextType.regularDefaultGrey }
                  size={ TextSize.small }
                  inner='Add your brand colors. These will be the default colors for all your designs'
               />
            </div>
            <div className='general-brandcolor'>
               <div>
                  <ColorInput
                     label='Heading Color'
                     subLabel=''
                     icon='TriangleDown'
                     name='heading_color'
                     value={ globalBranding.global_branding_brand_color.heading_color }
                     onChange={ (name, value) => onChange(name, value, 'global_branding_brand_color') }

                  />
               </div>
               <div>
                  <ColorInput
                     label='Text Color'
                     subLabel=''
                     icon='TriangleDown'
                     name='text_color'
                     value={ globalBranding.global_branding_brand_color.text_color }
                     onChange={ (name, value) => onChange(name, value, 'global_branding_brand_color') }
                  />
               </div>
               <div>
                  <ColorInput
                     label='Primary Button Color'
                     subLabel=''
                     icon='TriangleDown'
                     name='primary_button_color'
                     value={ globalBranding.global_branding_brand_color.primary_button_color }
                     onChange={ (name, value) => onChange(name, value, 'global_branding_brand_color') }
                  />
               </div>
               <div>
                  <ColorInput
                     label='Secondary Button Color'
                     subLabel=''
                     icon='TriangleDown'
                     name='secondary_button_color'
                     value={ globalBranding.global_branding_brand_color.secondary_button_color }
                     onChange={ (name, value) => onChange(name, value, 'global_branding_brand_color') }
                  />
               </div>

            </div>

         </div>
         <div className='general-preview'>
            <div className='general-preview-title'>
               <Text
                  type={ TextType.mediumSmall }
                  size={ TextSize.medium }
                  inner='Preview'
               />
            </div>
            <div className='general-preview-content'>
               {!globalBranding.school_logo ? (
                  <div className='preview-logo'>
                     <Text
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.xlarge }
                        style={ { color: '#A1A5A5' } }
                        inner='Logo'
                     />
                  </div>
               ) : <div className='preview-logo-img'><img src={ globalBranding.school_logo } alt='logo' /></div>}
               <div className='preview-title'>
                  <Text
                     type={ TextType.mediumSmall }
                     size={ TextSize.xxlarge }
                     style={ { color: globalBranding.global_branding_brand_color.heading_color } }
                     inner='Example of a short headline'
                  />
               </div>
               <div className='preview-subtitle'>
                  <Text
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.small }
                     style={ { color: globalBranding.global_branding_brand_color.text_color } }
                     inner='An example of a very long text to see what it would look like'
                  />
               </div>
               <div className='preview-btn'>
                  <BaseButton
                     theme={ btnTheme.primary }
                     size={ btnSize.large }
                     style={ { background: globalBranding.global_branding_brand_color.primary_button_color } }
                     text='Primary Button'
                  />
                  <BaseButton
                     theme={ btnTheme.secondary }
                     size={ btnSize.large }
                     style={ {
                        color: globalBranding.global_branding_brand_color.secondary_button_color,
                        borderColor: globalBranding.global_branding_brand_color.secondary_button_color,
                     } }
                     text='Secondary Button'
                     //   onClick={ () => saveReceipt() }
                  />
               </div>
            </div>
         </div> */}
         <div className='general-btn'>
            <BaseButton
               theme={ btnTheme.primary }
               size={ btnSize.large }
               text='Save Changes'
               onClick={ () => saveGeneral(globalBranding) }
               disabled={ !isChanged }
            />
         </div>
      </div>
   );
};

General.propTypes = {
   globalBranding: PropTypes.object,
   saveGeneral: PropTypes.func,
   onChange: PropTypes.func,
   isChanged: PropTypes.bool,
};

export default General;
