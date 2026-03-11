import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';


const Seo = ({ handleInternalInputChange, handleSettingsSave, settingsData }) => {
   return (
      <ItemWrapper>
         <div className='seo'>
            <div className='w-full'>
               <TextInput
                  label='SEO Class Title'
                  subLabel='Enter title as you want it shown in browsers'
                  placeholder='Enter Seo Title'
                  name='seo_title'
                  value={ settingsData.seo_title }
                  onChange={ (key, value) => handleInternalInputChange(key, value) }
               />
            </div>
            <div className='w-full m-t-m'>
               <TextInput
                  label='SEO Class Keywords'
                  subLabel='Enter seo keywords seperated by commas'
                  placeholder='Example: class, main, title etc'
                  name='seo_keywords'
                  value={ settingsData.seo_keywords }
                  onChange={ (key, value) => handleInternalInputChange(key, value) }
               />
            </div>
            <div className='w-full m-t-m'>
               <TextArea
                  label='SEO Description'
                  subLabel='Enter class description below'
                  placeholder='Enter Description text'
                  name='seo_description'
                  value={ settingsData.seo_description }
                  onChange={ (key, value) => handleInternalInputChange(key, value) }
               />
            </div>
            <div className='seoBtn w-full m-t-exl'>
               <BaseButton
                  theme={ btnType.darkGreen }
                  size={ btnSize.large }
                  text='Save'
                  onClick={ () => handleSettingsSave('seo') }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

Seo.propTypes = {
   handleInternalInputChange: PropTypes.func,
   handleSettingsSave: PropTypes.func,
   settingsData: PropTypes.object,
};

export default Seo;
