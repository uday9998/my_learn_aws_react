import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import DragAndDropUploadImage from 'components/modules/dragAndDropUploadImage';


const Seo = ({ handleInternalInputChange, handleSettingsSave, settingsData }) => {
   return (
      <div className='seoCheckout'>
         <div className='m-b-m'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='SEO Options'
               color='#3F4F65'
            />
            <div className='seo__info'>
               <Text
                  type={ TextType.medium }
                  size={ TextSize.small }
                  inner="Enhance your page's visibility on search engines and social networks like Facebook and Twitter with customizable SEO settings. If left blank, we automatically apply default settings for optimal performance."
                  className='text-center'
                  color='#8a94a2'
               />
            </div>
         </div>
         <div className='w-full'>
            <TextInput
               label='SEO Title'
               subLabel='Opt for a concise and clear title, ideally between 60-70 characters. Focus on relevance without including your brand or domain name, ensuring optimal SEO impact.'
               placeholder='Enter Seo Title'
               name='seo_title'
               value={ settingsData.seo_title }
               onChange={ (key, value) => handleInternalInputChange(key, value) }
            />
         </div>
         <div className='w-full m-t-m'>
            <TextArea
               label='SEO Description'
               subLabel="Craft a clear and concise description of at least two sentences, ideally within 150-160 characters, to effectively summarize your page's content for SEO optimization."
               placeholder='Enter Description text'
               name='seo_description'
               value={ settingsData.seo_description }
               onChange={ (key, value) => handleInternalInputChange(key, value) }
            />
         </div>
         <div className='m-t-m'>
            <Text
               type={ TextType.demiBold }
               size={ TextSize.extraSmall }
               inner='SEO Image'
               className='text-center'
               color='#3f4f65'
            />
            <DragAndDropUploadImage
               onChange={ img => handleInternalInputChange('seo_image', img) }
               src={ settingsData.seo_image }
               crop='1920x1080'
            />
         </div>
         <div className='seoBtn w-full m-t-exl'>
            <BaseButton
               theme={ btnType.darkGreen }
               size={ btnSize.extraLargeNarrow }
               text='Save'
               className='save-detalis'
               onClick={ () => handleSettingsSave('seo') }
            />
         </div>
      </div>
   );
};

Seo.propTypes = {
   handleInternalInputChange: PropTypes.func,
   handleSettingsSave: PropTypes.func,
   settingsData: PropTypes.object,
};

export default Seo;
