import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import Switch from 'components/elements/switchNew';
import UploadImage from 'components/modules/uploadImage';
import Input from 'components/elements/inputNew';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';

const SignTemplateEditor = ({ handleChangeProp, generalProps, type }) => {
   const siteInfo = useSelector(siteInfoSelector);

   useEffect(() => {
      if (type === 'thank_you') {
         document.body.style.setProperty('--borderColor', '#e7e9e9');
         document.body.style.setProperty('--inputBg008', '#ffffff');
         document.body.style.setProperty('--inputMemberTextColor', 'var(--greyscale_90)');
      }
   }, [generalProps.showSocialLinks]);

   return (
      <>
         {/* <Switch
            label='Show/Hide Background image'
            size='medium'
            positionText='left'
            onChange={ () => handleChangeProp('isHaveBackground', !generalProps.isHaveBackground) }
            value={ generalProps.isHaveBackground }
         /> */}
         <ColorInput
            value={ generalProps.background }
            name='background'
            isPageBuilder={ true }
            onChange={ handleChangeProp }
            label='Background Color'
         />
         <UploadImage
            // isPageBuilder={ true }
            label='Background Image'
            src={ generalProps.backgroundImage }
            onChange={ (e, url) => handleChangeProp('backgroundImage', url) }
            name='backgroundImage'
            recomenededText='Recommended size'
            recomendation='1920x1080'
            isImageUpload={ true }
         />
         <ColorInput
            value={ generalProps.cardBackground || siteInfo.active_school_room.school_bg_color }
            name='cardBackground'
            isPageBuilder={ true }
            onChange={ handleChangeProp }
            label='Card Background'
         />
         <ColorInput
            value={ generalProps.textColor || siteInfo.active_school_room.school_text_color }
            name='textColor'
            isPageBuilder={ true }
            onChange={ handleChangeProp }
            label='Primary Text Color'
         />
         <ColorInput
            value={ generalProps.secondaryTextColor || '#444C4B' }
            name='secondaryTextColor'
            isPageBuilder={ true }
            onChange={ handleChangeProp }
            label='Secondary Text Color'
         />
         {type !== 'unsubscribe_success'
         && (
            <>
               <ColorInput
                  value={ generalProps.buttonColor || siteInfo.active_school_room.school_button_color }
                  name='buttonColor'
                  isPageBuilder={ true }
                  onChange={ handleChangeProp }
                  label='Button Text Color'
               />
               <ColorInput
                  value={ generalProps.buttonBackground || siteInfo.active_school_room.school_color }
                  name='buttonBackground'
                  isPageBuilder={ true }
                  onChange={ handleChangeProp }
                  label='Button Background Color'
               />
            </>
         )}
         {type === 'unsubscribe'
         && (
            <ColorInput
               value={ generalProps.secondaryButtonColor }
               name='secondaryButtonColor'
               isPageBuilder={ true }
               onChange={ handleChangeProp }
               label='Secondary Button Text Color'
            />
         )}
         <Switch
            label='Show/Hide Contact Section'
            size='medium'
            positionText='left'
            onChange={ () => handleChangeProp('contactSection', !generalProps.contactSection) }
            value={ generalProps.contactSection }
         />
         <UploadImage
            label='Your Logo'
            src={ generalProps.logo || siteInfo.school_logo }
            onChange={ (e, url) => handleChangeProp('logo', url) }
            name='logo'
            recomenededText='Recommended size'
            recomendation='400x400'
            isImageUpload={ true }
         />
         {
            generalProps.hasOwnProperty('image') && (
               <UploadImage
                  label='Right Image'
                  src={ generalProps.image }
                  onChange={ (e, url) => handleChangeProp('image', url) }
                  name='image'
                  isImageUpload={ true }
               />
            )
         }
         {type === 'thank_you' && (
            <React.Fragment>
               <Switch
                  label='Show Social Links'
                  size='medium'
                  positionText='left'
                  onChange={ () => handleChangeProp('showSocialLinks', !generalProps.showSocialLinks) }
                  value={ generalProps.showSocialLinks }
               />
               {
                  generalProps.showSocialLinks && (
                     <React.Fragment>
                        {/* <ColorInput
                           value={ generalProps.imageBackground }
                           name='imageBackground'
                           isPageBuilder={ true }
                           onChange={ handleChangeProp }
                           label='Righ Side Background'
                        /> */}
                        <Input
                           value={ generalProps.facebook }
                           name='facebook'
                           label='Facebook Link'
                           onChange={ handleChangeProp }
                           leftText='https://facebook.com/'
                        />
                        <Input
                           value={ generalProps.twitter }
                           name='twitter'
                           // placeholder='Facebook'
                           label='Twitter Link'
                           onChange={ handleChangeProp }
                           leftText='https://twitter.com/'
                        />
                        <Input
                           value={ generalProps.instagram }
                           name='instagram'
                           // placeholder='Facebook'
                           label='Instagram Link'
                           onChange={ handleChangeProp }
                           leftText='https://instagram.com/'
                        />
                        <Input
                           value={ generalProps.youtube }
                           name='youtube'
                           // placeholder='Facebook'
                           label='Youtube Link'
                           onChange={ handleChangeProp }
                           leftText='https://youtube.com/'
                        />
                     </React.Fragment>
                  )
               }
            </React.Fragment>
         )
         }
      </>


   );
};

SignTemplateEditor.propTypes = {
   handleChangeProp: PropTypes.func,
   generalProps: PropTypes.object,
   type: PropTypes.string,
};

export default SignTemplateEditor;
