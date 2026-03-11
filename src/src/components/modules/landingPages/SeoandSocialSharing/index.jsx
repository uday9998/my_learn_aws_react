import React, { useState } from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import DragAndDropUploadImage from 'components/modules/dragAndDropUploadImage';
import TextInput from 'components/elements/form/TextInput';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';


const SeoandSharing = ({ settings, updateLandingDetailsHandler }) => {
   const [landingSettings, setLandingSettings] = useState({
      seo: {
         seo_description: settings.metas.seo_description || '',
         seo_title: settings.metas.seo_title || '',
         seo_image: settings.metas.seo_image ? settings.metas.seo_image : '',
      },
   });

   return (
      <ItemWrapper>
         <div className='landingSeo__settings'>
            <div>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='SEO and Social Sharing'
               />
            </div>
            <div className='m-t-exl' />
            <TextInput
               label='Page Title'
               placeholder=''
               name='seo_title'
               max='150'
               rightLabel={ `${ landingSettings.seo.seo_title.length }/150` }
               value={ landingSettings.seo.seo_title }
               onChange={ (name, value) => {
                  if (value.length <= 150) {
                     setLandingSettings({
                        seo: {
                           seo_description: landingSettings.seo.seo_description,
                           seo_title: value,
                           seo_image: landingSettings.seo.seo_image,
                        },
                     });
                  } else if (isPrint('You have reached the character limitation')) {
                     toast.error('You have reached the character limitation');
                  }
               } }
            />
            <div className='m-t-exl' />
            <TextInput
               label='Page Description'
               placeholder=''
               name='seo_description'
               max='250'
               rightLabel={ `${ landingSettings.seo.seo_description.length }/250` }
               value={ landingSettings.seo.seo_description }
               onChange={ (name, value) => {
                  if (value.length <= 250) {
                     setLandingSettings({
                        seo: {
                           seo_description: value,
                           seo_title: landingSettings.seo.seo_title,
                           seo_image: landingSettings.seo.seo_image,
                        },
                     });
                  } else if (isPrint('You have reached the character limitation')) {
                     toast.error('You have reached the character limitation');
                  }
               } }
            />
            <div className='m-t-exl' />
            <div className='seoImage'>
               <Text
                  type={ TextType.demiBold }
                  size={ TextSize.small }
                  inner='Page Image'
                  className='text-center'
                  color='#3f4f65'
               />
               <DragAndDropUploadImage
                  onChange={ (img) => setLandingSettings({
                     seo: {
                        seo_description: landingSettings.seo.seo_description,
                        seo_title: landingSettings.seo.seo_title,
                        seo_image: img,
                     },
                  }) }
                  src={ landingSettings.seo.seo_image }
                  crop='1280x720'
                  btnText='Select Image'
                  recText='Recomended dimensions of'
               />

            </div>
            <div className='landingSeo__settings__save'>
               <BaseButton
                  theme={ btnTheme.grey }
                  size={ btnSizes.large }
                  text='Cancel'
                  onClick={ () => setLandingSettings({
                     seo: {
                        seo_description: settings.metas.seo_description,
                        seo_title: settings.metas.seo_title,
                        seo_image: settings.metas.seo_image ? settings.metas.seo_image : '',
                     },
                  }) }
               />
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.large }
                  text='Save'
                  onClick={ () => updateLandingDetailsHandler(landingSettings) }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

SeoandSharing.propTypes = {
   settings: PropTypes.object,
   updateLandingDetailsHandler: PropTypes.func,
};

export default SeoandSharing;
