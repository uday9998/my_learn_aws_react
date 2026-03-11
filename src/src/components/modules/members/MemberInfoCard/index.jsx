import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import MultiSelect from 'components/elements/form/MultiSelect';
import UploadImg from 'components/elements/settings/UploadImg';
import memberDefImg from 'assets/images/profile-photo.png';
import Tooltip from 'components/elements/members/Tooltip';

const MemberInfoCard = ({
   newMember, handleNewMemberInputChange, handleAddMember, chooseCourses, onAddValue, onRemoveValue,
   selectedFilters, removeFile,
}) => {
   const [isChecked, setIsChecked] = useState(newMember.role === 0 ? 1 : newMember.role);
   const members = [
      {
         title: 'Member',
         content: 'A member has access to class and offers assigned to them.',
      },
      {
         title: 'Administrator',
         content: 'An administrator has access to everything except the payment/financial connections.',
      },
      {
         title: 'Assistant',
         content: 'An assistant only has access to delete and modify the contents on the website except the payment/financial connections.',
      },
      {
         title: 'Support Specialist',
         content: 'A support Specialist only has access to moderate comments and manage people.',
      },
   ];
   const chooseCoursesOptions = chooseCourses.map(option => (option.name));
   return (
      <ItemWrapper>
         <div className='memberInfoCard'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='Member Info'
            />
            <div className='m-t-exl'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.extraSmall }
                  inner='Profile Picture'
               />
               <div className='m-t-exs' />
               <UploadImg
                  title=''
                  height='75px'
                  width='75px'
                  size=''
                  img={ newMember.picture_src ? newMember.picture_src : memberDefImg }
                  isMemberPic={ true }
                  removeFile={ (uuid) => removeFile(uuid) }
                  onChange={ (value) => handleNewMemberInputChange('picture_src', value) }
               />
            </div>
            <div className='memberInfoCard__form m-t-exl m-b-exl'>
               <TextInput
                  placeholder='Enter your name here'
                  label='Full Name'
                  name='name'
                  value={ newMember.name }
                  onChange={ handleNewMemberInputChange }
               />
               <div className='m-b-l' />
               <TextInput
                  placeholder='Enter your email here'
                  label='Email Address'
                  name='email'
                  value={ newMember.email }
                  onChange={ handleNewMemberInputChange }
               />
               <div className='m-b-l' />
               <TextInput
                  placeholder='Enter your password here'
                  label='Password'
                  name='password'
                  value={ newMember.password }
                  onChange={ handleNewMemberInputChange }
               />
               <div className='m-b-l' />
               <TextInput
                  placeholder='Re enter the password here'
                  label='Password Confirmation'
                  name='password_confirmation'
                  value={ newMember.password_confirmation }
                  onChange={ handleNewMemberInputChange }
               />
            </div>
            <div className='memberInfoCard__assignment flex'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.extraSmall }
                  inner='Roles'
               />
               <Tooltip
                  hintText='Assign roles to your members.'
                  isLessonSettings={ true }
                  isComment={ true }
               />

            </div>
            <div className='member__roles'>
               {members.map((member, i) => {
                  const n = i;
                  return (
                     <div className={ isChecked === i + 1 ? 'settingPermission settingPermission__checked' : 'settingPermission' } key={ n } onClick={ () => { setIsChecked(i + 1); handleNewMemberInputChange('role', i === 0 ? 0 : i + 1); } } role='presentation'>
                        <div className='settingPermission__left'>
                           <div className={ isChecked === i + 1 ? 'circle__checked' : 'circle' }>
                              {isChecked && <div className='green__circle' />}
                           </div>
                        </div>
                        <div className='settingPermission__right'>
                           <div>
                              <Text
                                 type={ TextType.bold }
                                 size={ TextSize.medium }
                                 inner={ member.title }
                              />
                           </div>
                           <div>
                              <Text
                                 type={ TextType.normal }
                                 size={ TextSize.extraSmall }
                                 color='#8a94a2'
                                 inner={ member.content }
                              />
                           </div>
                        </div>
                        <div />
                     </div>
                  );
               })}
               <div style={ { marginTop: '18px' } } />
            </div>
            <div className='m-b-exl'>
               <MultiSelect
                  placeholder='Current Class'
                  label='Add To Class Below'
                  iconColor='rgb(63, 79, 101)'
                  onAddValue={ onAddValue }
                  onRemoveValue={ onRemoveValue }
                  selectedValues={ selectedFilters }
                  options={ chooseCoursesOptions }
               />
            </div>
            <div className='flex justify-end p-t-exs'>
               <div className='memberInfoCard__btn'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.large }
                     text='Save'
                     onClick={ () => handleAddMember() }
                  />
               </div>
            </div>
         </div>
      </ItemWrapper>
   );
};

MemberInfoCard.propTypes = {
   newMember: PropTypes.object,
   handleNewMemberInputChange: PropTypes.func,
   handleAddMember: PropTypes.func,
   chooseCourses: PropTypes.array,
   onAddValue: PropTypes.func,
   onRemoveValue: PropTypes.func,
   selectedFilters: PropTypes.array,
   removeFile: PropTypes.func,
};

export default MemberInfoCard;
