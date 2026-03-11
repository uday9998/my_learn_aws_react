import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
// import UploadInput from 'components/elements/form/UploadInput';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import { useTranslate } from 'react-polyglot';
import useS3Upload from 'components/modules/S3Upload';
import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';

const AccountInfo = ({
   accountStudent, onChange, handleCancelChanges,
   handleFormSubmit, siteInfo,
}) => {
   const t = useTranslate();
   const [isPasswordSectionOpen, setPasswordSectionOpen] = useState(false);

   const { progressEL, uploadButton } = useS3Upload(BaseButton, {
      buttonProps: {
         text: t('upload'),
         theme: btnTheme.lightBlue,
         size: btnSize.medium,
      },
      onChange: (src) => {
         onChange('picture_src', src);
      },
      fileLessonFormat: 'image',
   });

   return (
      <ItemWrapper>

         <div className='accountInfo'>
            <div className='accountTitle'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.large }
                  inner={ t('account_details') }
                  color='#333333'
               />
            </div>
            <div className='accountInfo__avatar'>
               <div>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.medium }
                     inner={ t('profile_picture') }
                     color='#555555'
                  />
               </div>
               <div className='accountInfo__image'>
                  <img src={ accountStudent.picture_src ? accountStudent.picture_src : accountStudent.picture_full_src } alt='upload-img' />
               </div>
               <div className='accountInfo__upload prog-upload m-t-m'>
                  {progressEL}
                  {uploadButton}
               </div>
               {/* <UploadInput defaultImg={ accountStudent.picture_full_src } /> */}
            </div>
            <div className='m-b-m'>
               <TextInput
                  placeholder={ t('full_name') }
                  label=''
                  type='text'
                  name='name'
                  id='fullName'
                  value={ accountStudent.name }
                  onChange={ onChange }
                  labelBottom={ true }
                  labelBottomText={ t('full_name') }
               />
            </div>
            <div className='m-b-exs'>
               <TextInput
                  placeholder={ t('email_address') }
                  label=''
                  name='email'
                  id='emailAdress'
                  value={ accountStudent.email }
                  onChange={ onChange }
                  labelBottom={ true }
                  labelBottomText={ t('email_address') }
               />
            </div>
            <div className='change_password' onClick={ () => setPasswordSectionOpen(!isPasswordSectionOpen) } role='presentation'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner={ t('change_password') }
                  color={ activeSchoolRoomColor(siteInfo) }
               />
            </div>
            { isPasswordSectionOpen && (
               <div className='password_content'>
                  {/* <div className='account__line' /> */}
                  <div className='m-b-m'>
                     <TextInput
                        placeholder={ t('current_password') }
                        label=''
                        type='password'
                        id='current_password'
                        name='current_password'
                        value={ accountStudent.current_password }
                        onChange={ onChange }
                        labelBottom={ true }
                        labelBottomText={ t('current_password') }
                     />
                  </div>
                  <div className='m-b-m'>
                     <TextInput
                        placeholder={ t('change_password__1') }
                        label=''
                        type='password'
                        name='password'
                        id='change_password'
                        value={ accountStudent.password }
                        onChange={ onChange }
                        labelBottom={ true }
                        labelBottomText={ t('change_password__1') }
                     />
                  </div>
                  <div className='m-b-m'>
                     <TextInput
                        placeholder={ t('retype_password') }
                        label=''
                        type='password'
                        name='password_confirmation'
                        id='password_confirmation'
                        value={ accountStudent.password_confirmation }
                        onChange={ onChange }
                        labelBottom={ true }
                        labelBottomText={ t('retype_password') }
                     />
                  </div>
               </div>
            )}
            <div className='accountInfo__btns'>
               <div>
                  <BaseButton
                     theme={ btnTheme.whiteBordered }
                     size={ btnSize.large }
                     text={ t('cancel') }
                     onClick={ () => handleCancelChanges('info') }
                  />
               </div>
               <div>

                  <BaseButton
                     theme={ btnTheme.darkBlack }
                     size={ btnSize.large }
                     text={ t('save') }
                     onClick={ () => handleFormSubmit(accountStudent.id, accountStudent) }
                  />
               </div>
            </div>
         </div>
      </ItemWrapper>
   );
};

AccountInfo.propTypes = {
   accountStudent: PropTypes.object,
   onChange: PropTypes.func,
   handleFormSubmit: PropTypes.func,
   handleCancelChanges: PropTypes.func,
   siteInfo: PropTypes.object,
};

export default AccountInfo;
