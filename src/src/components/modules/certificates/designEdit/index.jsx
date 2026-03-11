import React from 'react';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';

import Select from 'components/elements/form/Select';

import UploadImg from 'components/elements/settings/UploadImg';
// import places from 'src/assets/images/places.png';
import places from 'assets/images/places.png';
import { getThemeFonts } from 'utils/StaticData';
import './index.scss';

const fontSizeOptionForSelect = getThemeFonts().map(option => ({ label: option.label, value: option.value }));

const Design = ({
   certificate,
   handleInputChange,
}) => {
   const {
      metas: {
         font, ptxtcolor: primaryTextColor, stxtcolor: secondaryTextColor, ttxtcolor: tertiaryTextColor,
         bg_image: bgImg, logo,
      },
   } = certificate;

   return (
      <div className='design'>
         {/* <div className='designRectangle'> */}
         <div>
            <Select
               label='Font'
               placeholder='Choose Font'
               options={ fontSizeOptionForSelect }
               iconColor='#3f4f65'
               name='font'
               value={ font }
               onChange={ (name, value) => handleInputChange(name, value, 'metas') }
               fontStyles={ true }
            />
         </div>
         <div>
            <ColorInput
               label='Primary Text Color'
               name='ptxtcolor'
               value={ primaryTextColor }
               onChange={ (name, value) => handleInputChange(name, value, 'metas') }
               withIcon
               left={ true }
            />
         </div>
         <div>
            <ColorInput
               label='Secondary Text Color'
               name='stxtcolor'
               value={ secondaryTextColor }
               onChange={ (name, value) => handleInputChange(name, value, 'metas') }
               withIcon
               left={ true }
            />
         </div>
         <div>
            <ColorInput
               label='Tertiary Text Color'
               name='ttxtcolor'
               value={ tertiaryTextColor }
               onChange={ (name, value) => handleInputChange(name, value, 'metas') }
               withIcon
               left={ true }
            />
         </div>
         <div style={ {
            marginBottom: '24px',
            marginTop: '24px',
         } }
         >
            <UploadImg
               title='Background Image'
               size=''
               crop='776x548'
               // removeFile={ (uuid) => removeFile(uuid) }
               onChange={ (value) => handleInputChange('bg_image', value, 'metas') }
               isThumbnail={ true }
               style={ { borderRadius: '0px' } }
               name='bg_image'
               removLogo={ true }
               removeTitle='Remove Background'
               img={ bgImg || places }
            />
         </div>
         {certificate.certificate.template_slug !== 'bookTemplate' && (
            <div style={ { marginBottom: '40px' } }>
               <UploadImg
               // img={ mainhubSettings.logo }
                  title='Logo'
                  size=''
                  img={ logo || places }
                  imgSize={ true }
                  // removeFile={ (uuid) => removeFile(uuid) }
                  onChange={ (value) => handleInputChange('logo', value, 'metas') }
                  isThumbnail={ true }
                  name='logo'
                  removLogo={ true }
                  removeTitle='Remove Logo'
                  style={ { borderRadius: '0px' } }
               />
            </div>
         )}

      </div>
      // </div>
   );
};

Design.propTypes = {
   handleInputChange: PropTypes.func,
   certificate: PropTypes.object,
};

export default Design;
