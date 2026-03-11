import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import getDeff from 'utils/getDeff';
import Input from 'components/elements/inputNew';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';
import CommunitySettingsWrapper from '../CommunitySettingsWrapper';
import './index.scss';

const CommunitySettingsSeo = ({ settings, onSave }) => {
   const [innerInputs, setInnerInputs] = useState({
      ...settings,
   });

   useEffect(() => {
      setInnerInputs({
         ...innerInputs,
      });
   }, [settings]);

   const handleInnerInputChannge = (name, value) => {
      setInnerInputs({
         ...innerInputs,
         [name]: value,
      });
   };

   const isDisabledButton = () => {
      const deff = getDeff(settings, innerInputs);
      return Object.keys(deff).length === 0;
   };

   return (
      <CommunitySettingsWrapper
         title='SEO'
         isDisabled={ isDisabledButton() }
         onSave={ () => onSave(innerInputs) }
         tooltip='text'
      >
         <div className='community__settings__seo'>
            <Input
               value={ innerInputs.title }
               name='title'
               bottomText='A clear title without branding or mentoring the domain itself, Best between 60-70 characters long'
               label='SEO Title'
               onChange={ handleInnerInputChannge }
               placeholder='Craft a concise SEO-friendly title for your page'
            />
            <Input
               value={ innerInputs.description }
               name='description'
               bottomText='A clear description, at least two sentences long. Best between 150-160 characters long'
               label='SEO Description'
               type='textarea'
               maxLengthTextArea={ 160 }
               placeholder='Write a short SEO description highlighting the key focus of your page'
               onChange={ handleInnerInputChannge }
            />
            <div className='community__settings__seo__image'>
               <Text
                  inner='SEO Image'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <UploadMediaImageView
                  src={ innerInputs.picture_src }
                  type='image'
                  buttonText='Image'
                  iconName='ClearImageM'
                  isRemove={ true }
                  uploadProps={ {
                     fileLessonFormat: 'image',
                     isAmazonFile: true,
                     cropRatio: '1920x1080',
                     onChange: (value) => handleInnerInputChannge('picture_src', value),
                  } }
               />
            </div>
         </div>
      </CommunitySettingsWrapper>
   );
};

CommunitySettingsSeo.propTypes = {
   settings: PropTypes.object,
   onSave: PropTypes.func,
};

export default CommunitySettingsSeo;
