import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from 'components/elements/tabs';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import Input from 'components/elements/inputNew';
import { iframeValidation, urlValidation } from 'utils/validations';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { getYoutubeId, getWistiaEmbed, getVimeoEmbed } from 'utils/pageBuilder/video';


const VideoCode = ({ onSaveUrl, onSaveEmbed }) => {
   const variants = [
      { value: 'url', key: 'Video URL' },
      { value: 'ifrma', key: 'Embed Code / iframe' },
   ];
   const [selectedVariant, setSelectedVariant] = useState('url');
   const [value, setValue] = useState('');
   const handleChangeTab = (tab) => {
      setValue('');
      setSelectedVariant(tab);
   };
   const text1 = 'Only enter URLs from Wistia, Vimeo, YouTube';
   const text2 = 'We currently accept iFrame embed codes for this block';

   const url = () => {
      if (value.match(/vimeo.*(?:\/|clip_id=)([0-9a-z]*)/)) {
         let newValue = value;
         if (newValue[newValue.length - 1] === '/') {
            newValue = newValue.slice(0, newValue.length - 1);
         }
         onSaveUrl(getVimeoEmbed(value));
         return;
      } if (value.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)) {
         onSaveUrl(getYoutubeId(value));
         return;
      } if (value.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/(.*)/)) {
         onSaveUrl(getWistiaEmbed(value));
         return;
      }
      if (isPrint('Enter valid video URL of current Player !')) {
         toast.error('Enter valid video URL of current Player !');
      }
   };


   const handleFilterAndSave = () => {
      if (selectedVariant === 'url') {
         if (urlValidation(value)) {
            url();
            return;
         } if (isPrint('URL must be a valid URL.')) {
            toast.error('URL must be a valid URL.');
         }
         return;
      }
      if (iframeValidation(value)) {
         onSaveEmbed(value);
      } else if (isPrint('Code must be a valid code.')) {
         toast.error('Code must be a valid code.');
      }
   };

   return (
      <div className='video__code'>
         <Tab
            isButton={ true }
            selectedVariant={ selectedVariant }
            variants={ variants }
            onSelect={ handleChangeTab }
         />
         <div className='video__code__input'>
            {selectedVariant === 'url' ? (
               <Input
                  value={ value }
                  onChange={ (name, a) => setValue(a) }
                  placeholder='Video URL'
               />
            ) : (
               <Input
                  type='textarea'
                  value={ value }
                  onChange={ (name, code) => setValue(code) }
                  placeholder='Video Embed'
               />
            )}
            <Button
               text='Save'
               onClick={ () => handleFilterAndSave() }
            />
         </div>
         <Text
            inner={ selectedVariant === 'url' ? text1 : text2 }
            type={ types.regularDefault }
            size={ sizes.small }
            style={ { color: '#727978' } }
         />
      </div>
   );
};

VideoCode.propTypes = {
   onSaveEmbed: PropTypes.func,
   onSaveUrl: PropTypes.func,
};

export default VideoCode;
