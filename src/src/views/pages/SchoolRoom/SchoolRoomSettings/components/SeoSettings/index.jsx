import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Line from 'components/elements/Line';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';

const SchoolRoomSEOSettings = ({ inputs, onChange }) => {
   return (
      <div className='schoolroom__seo'>
         <div className='schoolroom__seo__block'>
            <Text
               inner='SEO Title'
               type={ types.medium150 }
               size={ sizes.medium }
            />
            <Text
               inner='Opt for a concise and clear title, ideally between 60-70 characters. Focus on relevance without including your brand or domain name, ensuring optimal SEO impact.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         </div>
         <Input
            label='Title'
            value={ inputs.seo_title || '' }
            placeholder='Input SEO-Friendly Title for Your Portal'
            name='seo_title'
            maxlength={ 70 }
            helpText={ `${ (inputs.seo_title || '').length }/70` }
            onChange={ onChange }
         />
         <Line />
         <div className='schoolroom__seo__block'>
            <Text
               inner='SEO Description'
               type={ types.medium150 }
               size={ sizes.medium }
            />
            <Text
               inner="Craft a clear and concise description of at least two sentences, ideally within 150-160 characters, to effectively summarize your page's content for SEO optimization."
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         </div>
         <Input
            label='Description'
            type='textarea'
            value={ inputs.description || '' }
            placeholder='Write a short SEO description highlighting the key focus of your page'
            name='description'
            maxLengthTextArea={ 160 }
            helpText={ `${ (inputs.description || '').length }/160` }
            onChange={ onChange }
         />
         <Line />
         <div className='schoolroom__seo__block'>
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
         <UploadMediaImageView
            src={ inputs.seo_image }
            type='image'
            iconName='ClearImageM'
            isRemove={ true }
            buttonText='Image'
            isHaveFileIcon={ true }
            generalButtonProps={
               {
                  theme: 'primary',
               }
            }
            uploadProps={ {
               fileLessonFormat: 'image',
               isAmazonFile: true,
               cropRatio: '1200x630',
               onChange: (value) => onChange('seo_image', value),
            } }
         />
      </div>
   );
};

SchoolRoomSEOSettings.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
};

export default SchoolRoomSEOSettings;
