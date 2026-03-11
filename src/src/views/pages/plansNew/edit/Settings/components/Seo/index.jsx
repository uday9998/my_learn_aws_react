import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Line from 'components/elements/Line';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';

const AdvancedSeo = ({ settings, onChange }) => {
   return (
      <div className='plan__advanced__seo'>
         <div className='plan__advanced__seo__top'>
            <Text
               inner='SEO Options'
               type={ types.medium153 }
               size={ sizes.large }
            />
            {/* <Text
               inner='You can create tags to be added to your new members account automatically.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#444C4B' } }
            /> */}
         </div>
         <div className='plan__advanced__seo__bottom'>
            <div className='plan__advanced__seo__bottom__block'>
               <div className='top'>
                  <Text
                     inner='SEO Title'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <Text
                     inner='Choose a concise and relevant title, ideally between 60-70 characters. Avoid including branding or domain specifics to optimize search engine visibility.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
               <Input
                  value={ settings.seo_title }
                  name='seo_title'
                  maxlength={ 70 }
                  placeholder='Enter an SEO-friendly title here (60-70 characters)'
                  label='Title'
                  onChange={ onChange }
               />
            </div>
            <Line />
            <div className='plan__advanced__seo__bottom__block'>
               <div className='top'>
                  <Text
                     inner='SEO Description'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <Text
                     inner='Write a clear, engaging description, ideally two sentences and between 150-160 characters. '
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
               <Input
                  value={ settings.seo_description }
                  name='seo_description'
                  type='textarea'
                  maxLengthTextArea={ 160 }
                  placeholder='Enter a concise description here (150-160 characters)'
                  label='Description'
                  onChange={ onChange }
               />
            </div>
            <Line />
            <div className='plan__advanced__seo__bottom__block'>
               <div className='top'>
                  <Text
                     inner='SEO Image'
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  <Text
                     inner='Recommended Size 1200x630'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
               <div className='bottom'>
                  <UploadMediaImageView
                     src={ settings.seo_image }
                     type='image'
                     buttonText='Image'
                     iconName='ClearImageM'
                     isRemove={ true }
                     uploadProps={ {
                        fileLessonFormat: 'image',
                        isAmazonFile: true,
                        cropRatio: '1920x1080',
                        onChange: (value) => onChange('seo_image', value),
                     } }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

AdvancedSeo.propTypes = {
   settings: PropTypes.object,
   onChange: PropTypes.func,
};

export default AdvancedSeo;
