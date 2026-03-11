import React, { useState } from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import RadioBox from 'components/elements/form/Radio';
import { isLocalhost } from 'utils/Helpers';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

const GeneralSettings = ({ settings, updateLandingDetailsHandler }) => {
   const [copyView, setCopyView] = useState(null);
   const [landingSettings, setLandingSettings] = useState({
      name: settings.name,
      url: settings.url,
      is_published: settings.is_published,
   });
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
      <ItemWrapper>
         <div className='landingGeneral__settings'>
            <div>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='General Settings'
               />
            </div>
            <div className='m-t-exl' />
            <TextInput
               label='Title'
               placeholder=''
               name='name'
               max='150'
               rightLabel={ `${ landingSettings.name.length }/150` }
               value={ landingSettings.name }
               onChange={ (name, value) => {
                  if (value.length <= 150) {
                     setLandingSettings({
                        name: value,
                        url: landingSettings.url,
                        is_published: landingSettings.is_published,
                     });
                  } else if (isPrint('You have reached the character limitation')) {
                     toast.error('You have reached the character limitation');
                  }
               } }
            />
            <div className='custom_url m-t-m'>
               <div className='input_with_text'>
                  <Text
                     size={ TextSize.extraSmall }
                     type={ TextType.normal }
                     inner='URL'
                     style={ { margin: '0 8px' } }
                  />
                  <div className='input_with_text_content'>
                     <Text
                        size={ TextSize.extraSmall }
                        type={ TextType.normal }
                        inner={ `${ apiUrl }/p/` }
                        color='#006dff'
                     />
                     <TextInput
                        label=''
                        placeholder=''
                        name='url'
                        value={ landingSettings.url }
                        onChange={ (name, value) => setLandingSettings({
                           name: landingSettings.name,
                           url: value,
                           is_published: landingSettings.is_published,
                        }) }
                     />
                  </div>

               </div>
               <div className='copy_btn' onClick={ () => copyCodeToClipboard(`${ apiUrl }/p/${ landingSettings.url }`, 'url') } role='presentation'>
                  <Text
                     size={ TextSize.small }
                     type={ TextType.normal }
                     inner='Copy'
                     color='#fff'
                  />
                  { copyView === 'url'
                     && <div className='copiedText'>Copied</div>
                  }
               </div>
            </div>
            <div className='landingGeneral__settings__visibility'>
               <div>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.medium }
                     inner='Page Visibility'
                  />
               </div>
               <div className='published__radio'>
                  <div className='published__radioBox'>
                     <RadioBox
                        name='draft'
                        checked={ !landingSettings.is_published }
                        label='Draft'
                        className='unpublished'
                        color={ !landingSettings.is_published ? '#7cb740' : '#c2cedb' }
                        onChange={ () => setLandingSettings({
                           name: landingSettings.name,
                           url: landingSettings.url,
                           is_published: false,
                        }) }
                     />
                     <div className='visibility__info'>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.extraSmall }
                           inner='Only you can see this page'
                           color='#8a94a2'
                        />
                     </div>
                  </div>
                  <div className='published__radioBox'>
                     <RadioBox
                        name='published'
                        checked={ !!landingSettings.is_published }
                        label='Published'
                        className='published'
                        color={ landingSettings.is_published ? '#7cb740' : '#c2cedb' }
                        onChange={ () => setLandingSettings({
                           name: landingSettings.name,
                           url: landingSettings.url,
                           is_published: true,
                        }) }
                     />
                     <div className='visibility__info'>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.extraSmall }
                           inner='Anyone can see  this page'
                           color='#8a94a2'
                        />
                     </div>
                  </div>

               </div>
            </div>
            <div className='landingGeneral__settings__save'>
               <BaseButton
                  theme={ btnTheme.grey }
                  size={ btnSizes.large }
                  text='Cancel'
                  onClick={ () => setLandingSettings({
                     name: settings.name,
                     url: settings.url,
                     is_published: settings.is_published,
                  }) }
               />
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.large }
                  text='Save'
                  onClick={ () => updateLandingDetailsHandler(
                     landingSettings.url === settings.url ? {
                        name: landingSettings.name,
                        is_published: landingSettings.is_published ? 1 : 0,
                     } : {
                        name: landingSettings.name,
                        url: landingSettings.url,
                        is_published: landingSettings.is_published ? 1 : 0,
                     }) }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

GeneralSettings.propTypes = {
   settings: PropTypes.object,
   updateLandingDetailsHandler: PropTypes.func,
};

export default GeneralSettings;
