import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import TextInput from 'components/elements/inputNew';
import { isLocalhost } from 'utils/Helpers';
import PropTypes from 'prop-types';
// import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import UploadImage from 'components/modules/uploadImage';
import Icon from 'components/elements/Icon';
// import Select from 'components/elements/form/Select';
// import ColorInput from 'components/elements/form/ColorInput';

const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

const SeoandSharing = ({ post, handleInputChange }) => {
   const [copyView, setCopyView] = useState(null);
   function copyCodeToClipboard(text, id) {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setTimeout(
         () => setCopyView(id),
         0
      );
      setTimeout(
         () => setCopyView(null),
         800
      );
   }

   return (
      <div className='seo__module'>
         <div>
            <div>
               <Text
                  type={ TextType.medium160 }
                  size={ TextSize.xlarge }
                  inner='SEO and Sharing'
               />
            </div>
            <div className='organization_subtitle'>
               <Text
                  type={ TextType.regularDefaultGrey }
                  size={ TextSize.small }
                  inner='Set up SEO and Sharing for this article'
               />
            </div>
         </div>
         <div className='custom_url'>
            <div className='custom_url_text'>
               <Text
                  size={ TextSize.small }
                  type={ TextType.regularDefaultGrey }
                  inner={ `${ apiUrl }/blog/` }
                  color='#8a94a2'
                  style={ { whiteSpace: 'nowrap' } }
               />
            </div>
            <TextInput
               label=''
               placeholder=''
               name='slug'
               value={ post.slug }
               onChange={ (name, value) => handleInputChange(name, value, 'post') }
            />
            <div className='copy_icon' onClick={ () => copyCodeToClipboard(`${ apiUrl }/blog/${ post.slug }`, 'customUrl') } role='presentation'>
               <Icon name='copyNew' color='#727978' />
               { copyView === 'customUrl'
                     && <div className='copiedText'>Copied</div>
               }
            </div>
            {/* <div className='copy_btn' onClick={ () => copyCodeToClipboard(`${ apiUrl }/blog/${ post.slug }`, 'customUrl') } role='presentation'>
                <BaseButton
                  text='Copy'
                  size={ btnSize.large }
                  theme={ btnTheme.secondary }
                  onClick={ () => {} }
               />

            </div> */}
         </div>
         <TextInput
            label='SEO Title'
            placeholder='seo title'
            name='seo_title'
            value={ post.seo_title }
            onChange={ (name, value) => {
               if (value.length < 151) {
                  handleInputChange(name, value, 'post');
               } else if (isPrint('You are reached character limit')) {
                  toast.error('You are reached character limit');
               }
            } }
         />
         <TextInput
            label='SEO Description'
            type='textarea'
            placeholder='Start typing...'
            value={ post.seo_description }
            name='seo_description'
            maxLengthTextArea={ 160 }
            onChange={ (name, value) => {
               if (value.length < 160) {
                  handleInputChange(name, value, 'post');
               } else if (isPrint('You are reached character limit')) {
                  toast.error('You are reached character limit');
               }
            } }
         />
         <div className='uploadImgs'>
            <UploadImage
               label='Featured Image'
               src={ post.seo_image ? post.seo_image : '' }
               cropRatio='1920x420'
               isHaveRecomenededText={ true }
               recomenededText='1920x420'
               isOptional={ true }
               size='full'
               onChange={ (name, value) => handleInputChange('seo_image', value, 'post') }
               isImageUpload={ true }
            />
         </div>
      </div>
   );
};

SeoandSharing.propTypes = {
   post: PropTypes.object,
   handleInputChange: PropTypes.func,
};

export default SeoandSharing;
