
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
   certificateFont,
   primaryTextColor,
   secondaryTextColor,
   tertiaryTextColor,
   logo,
   backgroundImage,
   penColor,
   changeCertificateFont,
   changePrimaryTextColor,
   changeSecondaryTextColor,
   changeTertiaryTextColor,
   changeBackgroundImage,
   changeLogo,
   changeSignaturesPenColor,
   thumbnails,
}) => {
   const certificateType = thumbnails.filter(thumbnail => thumbnail.selected === true)
   && thumbnails.filter(thumbnail => thumbnail.selected === true)[0];
   return (
      <div className='design'>
         {/* <div className='designRectangle'> */}
         <div style={ { width: '104%' } }>
            <Select
               label='Font'
               placeholder='Choose Font'
               options={ fontSizeOptionForSelect }
               iconColor='#3f4f65'
               name='theme_font'
               value={ certificateFont }
               onChange={ (key, value) => changeCertificateFont(value) }
               fontStyles={ true }
            />
         </div>
         <div>
            <ColorInput
               label='Primary Text Color'
               name='item_bg_color'
               value={ primaryTextColor }
               onChange={ (key, value) => changePrimaryTextColor(value) }
               withIcon
               left={ true }
            />
         </div>
         <div>
            <ColorInput
               label='Secondary Text Color'
               name='item_bg_color'
               value={ secondaryTextColor }
               onChange={ (key, value) => changeSecondaryTextColor(value) }
               withIcon
               left={ true }
            />
         </div>
         <div>
            <ColorInput
               label='Tertiary Text Color'
               name='item_bg_color'
               value={ tertiaryTextColor }
               onChange={ (key, value) => changeTertiaryTextColor(value) }
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
               onChange={ (value) => changeBackgroundImage(value) }
               isThumbnail={ true }
               style={ { borderRadius: '0px' } }
               removLogo={ true }
               removeTitle='Remove Background'
               img={ backgroundImage || places }
            />
         </div>
         {certificateType.name !== 'bookTemplate' && (
            <div>
               <UploadImg
               // img={ mainhubSettings.logo }
                  title='Logo'
                  size=''
                  imgSize={ true }
                  img={ logo || places }
                  // removeFile={ (uuid) => removeFile(uuid) }
                  onChange={ (value) => changeLogo(value) }
                  isThumbnail={ true }
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
   certificateFont: PropTypes.string,
   primaryTextColor: PropTypes.string,
   secondaryTextColor: PropTypes.string,
   tertiaryTextColor: PropTypes.string,
   logo: PropTypes.string,
   penColor: PropTypes.string,
   changeCertificateFont: PropTypes.func,
   changePrimaryTextColor: PropTypes.func,
   changeSecondaryTextColor: PropTypes.func,
   changeTertiaryTextColor: PropTypes.func,
   changeBackgroundImage: PropTypes.func,
   changeLogo: PropTypes.func,
   changeSignaturesPenColor: PropTypes.func,
   thumbnails: PropTypes.array,
};

export default Design;
