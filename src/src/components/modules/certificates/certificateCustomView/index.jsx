import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import UploadImage from 'components/modules/uploadImage';
import ColorInput from 'components/elements/form/ColorInput';
import ColorScheme from 'components/elements/colorScheme';
import TextInputRange from 'components/elements/form/TextInputRange';

const CertificateCustomView = ({ certificate, handleInputChange }) => {
   const {
      metas: {
         ptxtcolor: primaryTextColor, stxtcolor: secondaryTextColor, ttxtcolor: tertiaryTextColor,
         bg_image: bgImg, logo, titleSize, belowTitleSize, noteSize,
      },
   } = certificate;
   const colors = ['#fff', '#131F1E', '#987EDC', '#24554E', '#D12D36', '#BE960A', '#379552', '#3060BD'];

   const defColors = () => {
      let primary = '#373635';
      let secondary = '#373635';
      let tertiary = '#373635';
      switch (certificate.certificate.template_slug) {
         case 'certeficateBlackWhite':
            primary = '#373635';
            secondary = '#373635';
            tertiary = '#373635';
            break;
         case 'redWhite':
            primary = 'rgb(211, 85, 67)';
            secondary = 'rgb(0, 0, 51)';
            tertiary = 'rgb(0, 0, 51)';
            break;
         case 'yellowFloral':
            primary = 'rgb(29, 44, 62)';
            secondary = 'rgb(226, 149, 68)';
            tertiary = 'rgb(29, 44, 62)';
            break;
         case 'bookTemplate':
            primary = 'rgb(135, 119, 96)';
            secondary = 'rgb(226, 149, 68)';
            tertiary = '#373635';
            break;
         case 'triangles':
            primary = 'rgb(55, 54, 53)';
            secondary = 'rgb(204, 56, 56)';
            tertiary = 'rgb(55, 54, 53)';
            break;
         case 'blackBackground':
            primary = 'rgb(251, 251, 251)';
            secondary = 'rgb(225, 180, 87)';
            tertiary = 'rgb(251, 251, 251)';
            break;
         default:
      }
      return {
         primary,
         secondary,
         tertiary,
      };
   };

   return (
      <div className='certificate__custom__view'>
         <UploadImage
            label='Upload Your Background'
            name='bg_image'
            textsize='small14_500'
            isHaveRecomenededText={ true }
            recomenededText='728x548'
            src={ bgImg || null }
            onChange={ (name, value) => handleInputChange('bg_image', value, 'metas') }
            isImageUpload={ true }
         />

         <div className='certificate__custom__view__divider' />
         {certificate.certificate.template_slug !== 'bookTemplate' && (
            <UploadImage
               label='Upload Your Logo'
               src={ logo }
               isHaveRecomenededText={ true }
               recomenededText='1x1'
               textsize='small14_500'
               onChange={ (name, value) => handleInputChange('logo', value, 'metas') }
               name='logo'
               isImageUpload={ true }
            />
         )}
         <div className='certificate__custom__view__divider' />

         <div className='certificate__custom__view__picker'>
            <ColorInput
               label='Primary Text Color'
               name='ptxtcolor'
               size='small14_500'
               value={ primaryTextColor || defColors().primary }
               onChange={ (name, value) => handleInputChange(name, value, 'metas') }
               withIcon
               left={ true }
               isPageBuilder={ true }
            />
            <ColorScheme name='ptxtcolor' value={ primaryTextColor || defColors().primary } colorsArray={ colors } onChange={ (name, value) => handleInputChange(name, value, 'metas') } />
         </div>
         <div className='certificate__custom__view__divider' />
         <div className='certificate__custom__view__picker'>
            <ColorInput
               label='Secondary Text Color'
               name='stxtcolor'
               size='small14_500'
               value={ secondaryTextColor || defColors().secondary }
               onChange={ (name, value) => handleInputChange(name, value, 'metas') }
               withIcon
               left={ true }
               isPageBuilder={ true }
            />
            <ColorScheme name='stxtcolor' value={ secondaryTextColor || defColors().secondary } colorsArray={ colors } onChange={ (name, value) => handleInputChange(name, value, 'metas') } />
         </div>
         <div className='certificate__custom__view__divider' />
         <div className='certificate__custom__view__picker'>
            <ColorInput
               label='Tertiary Text Color'
               name='ttxtcolor'
               size='small14_500'
               value={ tertiaryTextColor || defColors().tertiary }
               onChange={ (name, value) => handleInputChange(name, value, 'metas') }
               withIcon
               left={ true }
               isPageBuilder={ true }
            />
            <ColorScheme name='ttxtcolor' value={ tertiaryTextColor || defColors().tertiary } colorsArray={ colors } onChange={ (name, value) => handleInputChange(name, value, 'metas') } />
         </div>
         <TextInputRange
            label='Title Font Size'
            type='range'
            leftText={ titleSize }
            size='small14_500'
            id='title_size'
            min={ 6 }
            max={ 34 }
            name='titleSize'
            step='1'
            value={ titleSize }
            onChange={ (value, name) => { handleInputChange(name, value, 'metas'); } }
         />
         <TextInputRange
            label='Below Title Font Size'
            type='range'
            size='small14_500'
            leftText={ belowTitleSize }
            id='title_size'
            min={ 6 }
            max={ 34 }
            name='belowTitleSize'
            step='1'
            value={ belowTitleSize }
            onChange={ (value, name) => { handleInputChange(name, value, 'metas'); } }
         />
         <TextInputRange
            label='Note Font Size'
            type='range'
            size='small14_500'
            leftText={ noteSize }
            id='title_size'
            min={ 6 }
            max={ 34 }
            name='noteSize'
            step='1'
            value={ noteSize }
            onChange={ (value, name) => { handleInputChange(name, value, 'metas'); } }
         />
      </div>
   );
};

CertificateCustomView.propTypes = {
   certificate: PropTypes.object,
   handleInputChange: PropTypes.func,
};

export default CertificateCustomView;
