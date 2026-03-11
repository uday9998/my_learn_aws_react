import React, { useEffect } from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import { useTranslate } from 'react-polyglot';
import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';
// import loginImg from 'assets/images/login.png';


const SignUpStudent = ({
   // eslint-disable-next-line camelcase
   onChange, emailregister, passwordregister, onSubmit, nameregister, password_confirmationregister, googleLogin,
   siteInfo,
}) => {
   const iOSDevice = !!navigator.platform.match(/iPhone|iPod|iPad/);
   useEffect(() => {
      document.body.style.setProperty('--button-color-text', activeSchoolRoomColor(siteInfo));
      document.body.style.setProperty('--school-font', siteInfo.active_school_room.school_font);
   }, [siteInfo]);
   const t = useTranslate();
   return (
      <>
         <div className='singUp__container'>
            {/* <div
               className='login__img'
               style={ coverImg ? {
                  backgroundImage: `url(${ coverImg })`,
               } : { backgroundImage: `url(${ loginImg })`, border: 'dashed 2px #006dff', width: '619px' } }
            >
               {!!Number(showStudentTitle) && (
                  <div className='logIn__title__courses m-b-m'>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.large }
                        inner={ mainHubTitle || 'Courses by Miestro' }
                        color={ mainHubTitleColor || '#2a36b1' }
                     />
                  </div>
               )}
            </div> */}
            <ItemWrapper style={ { border: 'solid 1px #dfe5eb', boxShadow: '0 2px 40px 0 rgba(63, 79, 101, 0.09)' } }>
               <div className='logIn'>
                  <div className='w-full'>
                     <div className='logIn__title'>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.large }
                           inner={ t('create_your_account') }
                        />
                     </div>
                     <div className='logIn__account'>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           inner={ [t('already_have_an_account'), <Link to={ Router.route('LOGIN').getMask() }><span> { t('log_in') }</span>  </Link>] }
                        />

                     </div>
                     <div className='logIn__form'>
                        <TextInput
                           name='emailregister'
                           type='email'
                           placeholder='example@domain.com'
                           label=''
                           value={ emailregister }
                           onChange={ onChange }
                           autocomplate={ !!iOSDevice }
                           labelBottom={ true }
                           labelBottomText={ t('email') }
                           id='Email'
                        />
                        <div className='m-t-m' />
                        <TextInput
                           name='nameregister'
                           type='text'
                           placeholder='Name'
                           label=''
                           value={ nameregister }
                           onChange={ onChange }
                           autoComplate={ false }
                           labelBottom={ true }
                           labelBottomText={ t('name') }
                           id='Name'
                        />
                        <div className='m-t-m' />

                        <TextInput
                           placeholder='*********'
                           label=''
                           name='passwordregister'
                           type='password'
                           value={ passwordregister }
                           onChange={ onChange }
                           autoComplate={ false }
                           labelBottom={ true }
                           labelBottomText={ t('password') }
                           id='Password'
                        />
                        <div className='m-t-m' />
                        <TextInput
                           placeholder='*********'
                           label=''
                           name='password_confirmationregister'
                           type='password'
                           // eslint-disable-next-line camelcase
                           value={ password_confirmationregister }
                           onChange={ onChange }
                           autoComplate={ false }
                           labelBottom={ true }
                           labelBottomText={ t('confirm_password') }
                           id='ConfirmPassword'
                        />
                        <div className='darkBlack_btn'>
                           <BaseButton
                              theme={ btnTheme.darkBlack }
                              size={ btnSize.full }
                              text={ t('create_account') }
                              onClick={ onSubmit }
                           />
                           <div role='presentation' type='button' className='login-with-google-btn' onClick={ () => googleLogin() }>
                              Sign in with Google
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
            </ItemWrapper>
         </div>

      </>
   );
};

SignUpStudent.propTypes = {
   onChange: PropTypes.func,
   emailregister: PropTypes.string,
   passwordregister: PropTypes.string,
   nameregister: PropTypes.string,
   password_confirmationregister: PropTypes.string,
   onSubmit: PropTypes.func,
   siteInfo: PropTypes.object,
   googleLogin: PropTypes.func,
};


export default SignUpStudent;
