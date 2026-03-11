/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/elements/switchNew';
import Input from 'components/elements/inputNew';
import UploadImage from 'components/modules/uploadImage';
import MultiSelect from 'components/elements/multiSelectNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { isEqual } from 'lodash';
import LinkViewWithEditOneLine from 'components/modules/LinkViewWithEditOneLine';
import CommunitySettingsWrapper from '../CommunitySettingsWrapper';

const CommunitySettingsGeneral = ({
   settings, onSave, community, courses,
}) => {
   const [innerInputs, setInnerInputs] = useState({
      automatically_add_member: !!settings.automatically_add_member,
      name: community.name,
      description: community.description,
      picture_src: community.picture_src,
      allow_create_room: !!community.allow_create_room,
      allow_global_branding: !!community.allow_global_branding,
      course_id: community.community_courses.map(e => e.id),
   });
   const [options, setOptions] = useState([]);
   useEffect(() => {
      const op = courses
         .filter(course => {
            if (!course.community_id) return true;
            if (Number(course.community_id) !== community.id) return true;
            return false;
         })
         .map(el => ({ label: el.name, value: el.id }));
      setOptions(op);
   }, [courses]);
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
      // ;
      // if (name !== 'description') {
      //    if (value.length <= 50) {
      //       setInnerInputs({
      //          ...innerInputs,
      //          [name]: value,
      //       });
      //    } else {
      //       toast.error('There is a limit of 50 characters for you ro write');
      //    }
      // } else if (value.length <= 500) {
      //    setInnerInputs({
      //       ...innerInputs,
      //       [name]: value,
      //    });
      // } else {
      //    toast.error('There is a limit of 500 characters for you ro write');
      // }
   };
   const isDisabledButton = () => {
      const inputs = {
         name: community.name,
         description: community.description,
         automatically_add_member: !!settings.automatically_add_member,
         picture_src: community.picture_src,
         allow_create_room: !!community.allow_create_room,
         allow_global_branding: !!community.allow_global_branding,
         course_id: community.community_courses.map(e => e.id),
      };
      return isEqual(inputs, innerInputs);
   };

   const handleSaveSettings = () => {
      const inputs = {
         automatically_add_member: !!innerInputs.automatically_add_member,
         community: {
            name: innerInputs.name,
            description: innerInputs.description,
            picture_src: innerInputs.picture_src,
            allow_create_room: !!innerInputs.allow_create_room,
            allow_global_branding: !!innerInputs.allow_global_branding,
            course_id: innerInputs.course_id,
         },
      };
      onSave(inputs);
   };
   return (
      <CommunitySettingsWrapper
         title='General Settings'
         isDisabled={ isDisabledButton() }
         tooltip='text'
         onSave={ () => handleSaveSettings() }
      >
         <div>
            <LinkViewWithEditOneLine
               label='Community Page Links'
               copyUrl={ `${ window.location.origin }/portal/community/${ community.id }` }
               isValid={ true }
               constantUrlStart={ `${ window.location.origin }/portal/community/` }
               editableLink={ community.id }
               constantUrlEnd=''
               disableEdit={ true }
            />
            <LinkViewWithEditOneLine
               label=''
               copyUrl={ `${ window.location.origin }/bridge/${ community.owner_course.id }` }
               isValid={ true }
               constantUrlStart={ `${ window.location.origin }/bridge/` }
               editableLink={ community.owner_course.id }
               constantUrlEnd=''
               disableEdit={ true }
            />
         </div>
         <Switch
            size='medium'
            value={ innerInputs.automatically_add_member }
            positionText='right'
            onChange={ (val) => setInnerInputs({ ...innerInputs, automatically_add_member: val ? 1 : 0 }) }
            label='Automatically add members from a class to the community assigned to set class'
         />
         <Input
            value={ innerInputs.name }
            label='Community Name'
            type='text'
            maxlength={ 50 }
            characterLimit='50'
            name='name'
            onChange={ handleInputChange }
         />
         <Input
            value={ innerInputs.description }
            label='Community Description'
            type='text'
            maxlength={ 500 }
            characterLimit='500'
            name='description'
            onChange={ handleInputChange }
         />
         <UploadImage
            label='Community Cover'
            name='picture_src'
            onChange={ handleInputChange }
            isOptional={ true }
            src={ innerInputs.picture_src }
            otherProps={ {
               cropRatio: '1920x1080',
               generalButtonProps: {
                  isIconRight: true,
                  iconName: 'DefaultUpload',
               },
            } }
            size='full'
            recomendation='1920x1080'
            isImageUpload={ true }
         />
         <Switch
            label='Allow members to create rooms'
            value={ innerInputs.allow_create_room }
            positionText='left'
            size='medium'
            onChange={ (value) => handleInputChange('allow_create_room', value) }
         />
         {/* <Switch
            label='Apply a global branding to this community'
            value={ innerInputs.allow_global_branding }
            positionText='left'
            size='medium'
            onChange={ (value) => handleInputChange('allow_global_branding', value) }
         /> */}
         <div className='community__settings__mulit'>
            <Text
               inner='Combine communities with specific products (Optional)'
               type={ types.regularDefault }
               size={ sizes.small }
            />
            <MultiSelect
               values={ innerInputs.course_id }
               options={ options }
               placeholder='Select product'
               onRemove={ (value) => handleInputChange('course_id', (innerInputs.course_id.filter((classId) => classId !== value))) }
               onAdd={ (value) => handleInputChange('course_id', ([...(innerInputs.course_id || []), value])) }
               hasSearch
            />
         </div>
      </CommunitySettingsWrapper>
   );
};

CommunitySettingsGeneral.propTypes = {
   settings: PropTypes.object,
   onSave: PropTypes.func,
   community: PropTypes.object,
   courses: PropTypes.array,
};

export default CommunitySettingsGeneral;
