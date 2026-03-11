/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Switch from 'components/elements/switchNew';
// import Input from 'components/elements/inputNew';
import UploadImage from 'components/modules/uploadImage';
// import MultiSelect from 'components/elements/multiSelectNew';
// import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import { isEqual } from 'lodash';
import ColorInput from 'components/elements/form/ColorInput';
import communityLogo from 'assets/images/community/communityLogo.png';
import CommunitySettingsWrapper from '../CommunitySettingsWrapper';
import './index.scss';

const CommunitySettingsBranding = ({
   settings, onSave,
}) => {
   const [innerInputs, setInnerInputs] = useState({
      logo: settings.logo,
      color: settings.color,
      bg_color: settings.bg_color,
   });

   useEffect(() => {
      setInnerInputs({
         ...innerInputs,
      });
   }, [settings]);

   const handleInputChange = (name, value) => {
      setInnerInputs({
         ...innerInputs,
         [name]: value,
      });
   };
   // const isDisabledButton = () => {
   //    const inputs = {
   //       name: community.name,
   //       description: community.description,
   //       automatically_add_member: !!settings.automatically_add_member,
   //       picture_src: community.picture_src,
   //       allow_create_room: !!community.allow_create_room,
   //       allow_global_branding: !!community.allow_global_branding,
   //       course_id: community.community_courses.map(e => e.id),
   //    };
   //    return isEqual(inputs, innerInputs);
   // };

   const handleSaveSettings = () => {
      const inputs = {
         logo: innerInputs.logo,
         color: innerInputs.color,
         bg_color: innerInputs.bg_color,
      };
      onSave(inputs);
   };
   return (
      <CommunitySettingsWrapper
         title='Community Branding'
         // isDisabled={ isDisabledButton() }
         tooltip='text'
         onSave={ () => handleSaveSettings() }
      >
         <div className='communityBranding'>
            <UploadImage
               label='Add Logo'
               src={ innerInputs.logo || communityLogo }
               onChange={ handleInputChange }
               isImageUpload={ true }
               name='logo' />
            <ColorInput
               label='Button Background Color'
               name='bg_color'
               value={ 
                  innerInputs.bg_color || '#24554E'
               }
               onChange={ (key, value) => handleInputChange(key, value) }
               isPageBuilder={ true }
               needHexFromPicker
            />
            <ColorInput
               label='Button Color'
               name='color'
               value={ 
                  innerInputs.color || '#ffffff'
               }
               onChange={ (key, value) => handleInputChange(key, value) }
               isPageBuilder={ true }
               needHexFromPicker
            />
         </div>
      </CommunitySettingsWrapper>
   );
};

CommunitySettingsBranding.propTypes = {
   settings: PropTypes.object,
   onSave: PropTypes.func,
};

export default CommunitySettingsBranding;
