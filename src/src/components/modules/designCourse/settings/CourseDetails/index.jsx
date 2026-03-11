import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import RadioBox from 'components/elements/form/Radio';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import coverImg from 'assets/images/thumbnail.png';
import courseLogo from 'assets/images/course-logo.png';
import Icon from 'components/elements/Icon';
import { isLocalhost } from 'utils/Helpers';
import UploadImg from 'components/modules/designCourse/settings/CourseDetails/UploadImg';
import CategoriesEngine from 'components/modules/categoryTagEngine/CategoryEngineContainer';
import { useParams } from 'react-router';
import useS3Upload from 'components/modules/S3Upload';
import { fileToDataUrl } from 'utils/mediaLibrary';

const CourseDetails = ({
   handleInternalInputChange,
   handleSettingsSave,
   settingsData,
   addCategory,
   attachCategories,
   detachCategories,
   categories,
   attachedCategories,
}) => {
   const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;
   const [copyView, setCopyView] = useState(null);
   const [disableChanges, setDisableChanges] = useState(false);
   const [charectersLimit, setCharectersLimit] = useState(settingsData.description && settingsData.description.length);
   const [imageDataUrl, setImageDataUrl] = useState('');
   const { id } = useParams();
   const course = attachedCategories ? { id, attachedCategories } : {};

   const getCharectersLength = (l) => setCharectersLimit(l);
   // if (settingsData.id) {
   //    getCourseUpdate(settingsData.id);
   // }
   const { progressEL, uploadButton } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Change Cover',
         theme: btnType.blueBordered,
         size: btnSize.full,
      },
      onChange: async (src, _, file) => {
         const dataUrl = await fileToDataUrl(file);
         setImageDataUrl(dataUrl);
         handleInternalInputChange('thumbnail_image', src);
      },
      fileLessonFormat: 'image',
      cropRatio: '600x400',
   });


   function copyCodeToClipboard(text, customId, isRedirect = false) {
      const el = document.createElement('textarea');
      el.value = `${ apiUrl }/${ text }`;
      if (isRedirect) {
         el.value = text;
      }
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setTimeout(
         () => setCopyView(customId),
         0
      );
      setTimeout(
         () => setCopyView(null),
         800
      );
   }
   const thumbnailImage = imageDataUrl || settingsData.thumbnail_image;

   return (
      <ItemWrapper>
         <div className='courseDetails'>
            <div className='w-full'>
               <TextInput
                  label='Name Of Class'
                  placeholder='Test Class'
                  rightLabel={ `${ settingsData.name ? settingsData.name.length : 0 }/60` }
                  maxlength='60'
                  name='name'
                  value={ settingsData.name }
                  onChange={ (key, value) => handleInternalInputChange(key, value) }
               />
            </div>
            <div className='m-t-m w-full'>
               <TextInput
                  label='Class Subtitle'
                  placeholder='Demo Subtitle'
                  name='subtitle'
                  maxlength='50'
                  rightLabel={ `${ settingsData.subtitle ? settingsData.subtitle.length : 0 }/50` }
                  value={ settingsData.subtitle }
                  onChange={ (key, value) => handleInternalInputChange(key, value) }
               />
            </div>
            <div className='m-t-m w-full'>
               <TextArea
                  label='Class Description'
                  placeholder='Enter Class Description'
                  name='description'
                  value={ settingsData.description }
                  rightLabel={ `${ charectersLimit || 0 }/150` }
                  maxLength={ 150 }
                  onChange={ (key, value) => {
                     return (
                        handleInternalInputChange(key, value),
                        getCharectersLength(value.length)

                     );
                  } }
               />
            </div>

            <div className='redirect_landing_url'>
               <RadioBox
                  name='custom'
                  checked={ !!settingsData.is_custom_url }
                  onChange={ () => handleInternalInputChange('is_custom_url', true) }
                  label='Use Custom URL'
                  className='course_custom_url'
                  color={ settingsData.is_custom_url ? '#7cb740' : '#c2cedb' }
               />
               <RadioBox
                  name='system'
                  checked={ !settingsData.is_custom_url }
                  onChange={ () => handleInternalInputChange('is_custom_url', false) }
                  label='Use System URL'
                  className='course_system_url'
                  color={ !settingsData.is_custom_url ? '#7cb740' : '#c2cedb' }
                  hasTooltip
               />
            </div>
            {
               !!settingsData.is_custom_url && (
                  <div className='redirect_url m-t-m w-full elipses'>
                     <TextInput
                        label='Redirect URL'
                        placeholder='Put your custom landing page link here'
                        name='landing_custom_url'
                        value={ settingsData.landing_custom_url }
                        onChange={ (key, value) => handleInternalInputChange(key, value) }
                     />
                     <div className='copy-button' title='copy' role='presentation' onClick={ () => copyCodeToClipboard(`${ settingsData.landing_custom_url }`, 'landing_custom_url', true) }>
                        <Icon name='Copy' />
                     </div>
                     { copyView === 'landing_custom_url'
                        && <div className='copiedText'>Copied</div>
                     }
                  </div>
               )}
            <div className='m-t-m w-full elipses'>
               <TextInput
                  label='Class URL'
                  placeholder=''
                  leftText={ `${ apiUrl }/programs` }
                  name='url'
                  value={ settingsData.url }
                  onChange={ !disableChanges ? (key, value) => handleInternalInputChange(key, value) : () => {} }
                  onKeyPress={ (e) => {
                     if ((e.charCode > 64 && e.charCode < 91)
                              || (e.charCode > 96 && e.charCode < 123) || e.charCode === 8
                              || ((e.charCode >= 48 && e.charCode <= 57) || e.charCode === 45
                              || e.charCode === 189 || e.charCode === 95)) {
                        setDisableChanges(false);
                     } else {
                        setDisableChanges(true);
                     }
                  } }
               />
               <div className='copy-button' title='copy' role='presentation' onClick={ () => copyCodeToClipboard(`programs/${ settingsData.url }`, 'url') }>
                  <Icon name='Copy' />
               </div>
               { copyView === 'url'
                    && <div className='copiedText'>Copied</div>
               }
            </div>
            <CategoriesEngine
               attachedValues={ attachedCategories }
               onCreate={ addCategory }
               options={ categories }
               onAttach={ attachCategories }
               onDetach={ detachCategories }
               course={ course }
            />
            <div className='m-t-m coverImg'>
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.normal }
                  inner='Class Cover Image'
               />
               <div className='coverImg__req m-t-exs'>
                  <Text
                     size={ txtSizes.extraSmall }
                     type={ txtType.regular }
                     inner='Recommended Size 600x400'
                     color='#8a94a2'
                     bold
                  />
               </div>
               <img
                  src={ thumbnailImage || coverImg }
                  alt='cover'
                  className='coverImg__img'
               />
               {progressEL}
               <div className='m-t-exl'>
                  {uploadButton}
                  <BaseButton
                     theme={ btnType.grey }
                     size={ btnSize.full }
                     text='Remove Class Cover Image'
                     style={ {
                        marginTop: '10px',
                     } }
                     onClick={ () => { setImageDataUrl(coverImg); handleInternalInputChange('thumbnail_image', null); } }
                  />
               </div>
            </div>

            <div className='m-t-m courseLogoImg'>
               <UploadImg
                  title='Class Logo'
                  size='250x60'
                  crop='250x60'
                  img={ settingsData.logo ? settingsData.logo : courseLogo }
                  isCoursePic={ true }
                  onChange={ (value) => handleInternalInputChange('logo', value) }
                  removeLogo={ true }
                  hasTooltip={ true }
               />
            </div>


            <div className='courseDetailsSaveBtn w-full m-t-exl'>
               <BaseButton
                  theme={ btnType.darkGreen }
                  size={ btnSize.large }
                  text='Save'
                  className='save-detalis'
                  onClick={ () => handleSettingsSave('course-details') }
               />
            </div>
         </div>
      </ItemWrapper>

   );
};

CourseDetails.propTypes = {
   handleInternalInputChange: PropTypes.func,
   handleSettingsSave: PropTypes.func,
   settingsData: PropTypes.object,
   addCategory: PropTypes.func,
   attachCategories: PropTypes.func,
   detachCategories: PropTypes.func,
   categories: PropTypes.array,
   attachedCategories: PropTypes.array,
};

export default CourseDetails;
