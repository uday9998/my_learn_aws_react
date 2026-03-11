import React, { useEffect } from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';
import { useTranslate } from 'react-polyglot';

const ResetPassword = ({
   // eslint-disable-next-line camelcase
   onChange, email, password, onSubmit, password_confirmation, siteInfo,
}) => {
   useEffect(() => {
      document.body.style.setProperty('--button-color-text', activeSchoolRoomColor(siteInfo));
      document.body.style.setProperty('--school-font', siteInfo.active_school_room.school_font);
   }, [siteInfo]);
   const t = useTranslate();
   return (
      <>
         <div className='reset__container'>
            <ItemWrapper style={ { border: 'solid 1px #dfe5eb', boxShadow: '0 2px 40px 0 rgba(63, 79, 101, 0.09)' } }>
               <div className='logIn'>
                  <div className='w-full'>
                     <div className='logIn__title'>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.large }
                           inner={ t('reset_password') }
                        />
                     </div>
                     <div className='logIn__form'>
                        <TextInput
                           name='email'
                           type='email'
                           placeholder='example@domain.com'
                           label=''
                           value={ email }
                           onChange={ onChange }
                           labelBottom={ true }
                           labelBottomText={ t('email') }
                           id='Email'
                        />
                        <div className='m-t-m' />
                        <TextInput
                           placeholder='*********'
                           label=''
                           name='password'
                           type='password'
                           value={ password }
                           onChange={ onChange }
                           labelBottom={ true }
                           labelBottomText={ t('password') }
                           id='Password'
                        />
                        <div className='m-t-m' />
                        <TextInput
                           placeholder='*********'
                           label=''
                           name='password_confirmation'
                           type='password'
                           // eslint-disable-next-line camelcase
                           value={ password_confirmation }
                           onChange={ onChange }
                           labelBottom={ true }
                           labelBottomText={ t('confirm_password') }
                           id='ConfirmPassword'
                        />
                        <div className='darkBlack_btn'>
                           <BaseButton
                              theme={ btnTheme.darkBlack }
                              size={ btnSize.full }
                              text={ t('reset_password') }
                              onClick={ onSubmit }
                           />
                        </div>
                     </div>

                  </div>
               </div>
            </ItemWrapper>
         </div>

      </>
   );
};

ResetPassword.propTypes = {
   onChange: PropTypes.func,
   email: PropTypes.string,
   password: PropTypes.string,
   password_confirmation: PropTypes.string,
   onSubmit: PropTypes.func,
   siteInfo: PropTypes.object,
};

export default ResetPassword;
