import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Select from 'components/elements/SelectNew';
import Tabs from 'components/elements/tabs';
import Input from 'components/elements/inputNew';
import { copyToClipBoard } from 'utils/copy';
import Button from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import MultiSelect from 'components/elements/multiSelectNew';
import QueryParams from 'utils/QueryParams';

const CommunityInviteMember = ({ options, handleInviteMember, coursesOptions }) => {
   const [inputs, setInputs] = useState({
      email: '',
      course_id: [],
      member_type: 'member',
      name: '',
   });
   const { current: hash } = useRef(QueryParams.getHash());
   useEffect(() => {
      if (hash.length) {
         setInputs({
            ...inputs,
            room_id: Number(hash),
         });
      }
   }, []);
   const handleInputChange = (name, value) => setInputs({ ...inputs, [name]: value });
   const typeVariants = [
      { value: 'member', key: 'Member' },
      { value: 'admin', key: 'Admin' },
      // { value: 'moderator', key: 'Moderator' },
   ];
   return (
      <div className='community__invite__member'>
         <div className='community__invite__member__left'>
            <Text
               inner='Invite Members'
               type={ types.medium160 }
               size={ sizes.large }
            />
            {!!hash.length && (
               <Select
                  name='room_id'
                  value={ inputs.room_id }
                  type='select-medium'
                  placeholder='Select room'
                  onChange={ handleInputChange }
                  options={ options }
                  label='Add to Room'
               />
            )}
            <div className='community__settings__mulit'>
               <Text
                  inner='Select Product'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <MultiSelect
                  values={ inputs.course_id || [] }
                  options={ coursesOptions }
                  placeholder='Select product'
                  onRemove={ (value) => handleInputChange('course_id', (inputs.course_id.filter((classId) => classId !== value))) }
                  onAdd={ (value) => handleInputChange('course_id', ([...(inputs.course_id || []), value])) }
               />
            </div>
            <div className='community__invite__member__left__or'>
               <div className='community__invite__member__left__or__line' />
               <Text
                  inner='or'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
               <div className='community__invite__member__left__or__line' />
            </div>
            <div className='community__invite__member__left__tab'>
               <Text
                  inner='Type of Member'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <Tabs
                  variants={ typeVariants }
                  onSelect={ (variant) => handleInputChange('member_type', variant) }
                  selectedVariant={ inputs.member_type }
               />
            </div>
            <Input
               name='name'
               onChange={ handleInputChange }
               value={ inputs.name }
               label='Name'
               placeholder='Enter your name'
            /> 
            <Input
               name='email'
               onChange={ handleInputChange }
               value={ inputs.email }
               label='Email Address'
               placeholder='Enter your email address'
            /> 
            {/* <TextWithIcon
               iconName='CommunityCopyL'
               inner='Copy invite link'
               type={ types.regularDefault }
               generalStyles={ {
                  cursor: 'pointer',
               } }
               size={ sizes.small }
               onClick={ () => copyToClipBoard('link') }
            /> */}
            <div className='community__invite__member__left__button'>
               <Button
                  text='Invite'
                  onClick={ () => handleInviteMember(inputs) }
                  disabled={ inputs.email.length < 1 && inputs.course_id.length === 0 }
               />
            </div>
         </div>
         <div className='community__invite__member__right' />
      </div>
   );
};

CommunityInviteMember.propTypes = {
   handleInviteMember: PropTypes.func,
   coursesOptions: PropTypes.array,
   options: PropTypes.array,
};

export default CommunityInviteMember;
