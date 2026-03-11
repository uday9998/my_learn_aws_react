/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import CheckBox from 'components/elements/form/CheckBox';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import { useTranslate } from 'react-polyglot';
import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { confirmEmail, resendCode } from 'api/GuestApi';
// import loginImg from 'assets/images/login.png';


const LogInStudent = ({
   onChange, email, password, onSubmit, rememberMeChecked, handleCheckedChange,
   siteInfo, error, googleLogin,
}) => {
   const [verifyCode, setVerifyCode] = useState('');
   const [counter, setCounter] = React.useState(0);
   const [confirmEmailFunc] = useSubmitForm(confirmEmail);
   const [resendCodeFunc] = useSubmitForm(resendCode, {
      successMessage: 'Code sent to email successfully',
   });
   // useEffect(() => {
   //    document.body.style.setProperty('--button-color-text', activeSchoolRoomColor(siteInfo));
   //    document.body.style.setProperty('--school-font', siteInfo.active_school_room.school_font);
   // }, [siteInfo]);
   const t = useTranslate();
   const confirmEmailVerification = () => {
      confirmEmailFunc({ email, verify_code: verifyCode }, (res) => {
         window.location = res.url;
      });
   };

   const handleResendCode = () => {
      resendCodeFunc({ email }, () => {
         setCounter(30);
      });
   };


   useEffect(() => {
      if (counter > 0) {
         setTimeout(() => setCounter(counter - 1), 1000);
      }
   }, [counter]);

   return (
      <>
         <div className='logIn__container'>
            <ItemWrapper style={ { border: 'solid 1px #dfe5eb', boxShadow: '0 2px 40px 0 rgba(63, 79, 101, 0.09)' } }>
               <div className='logIn'>
                  {error !== true && (
                     <div className='w-full'>
                        <div className='logIn__title'>
                           <Text
                              type={ TextType.normal }
                              size={ TextSize.large }
                              inner={ t('log_in') }
                           />
                        </div>
                        <div className='logIn__account'>
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.extraSmall }
                              inner={ [t('need_an_account'), <Link to={ Router.route('SIGNUP_STUDENT').getMask() }><span> { t('sign_up') }</span>  </Link>] }
                           />
                        </div>
                        <div className='logIn__form'>
                           <form>
                              <TextInput
                                 name='email'
                                 type='email'
                                 placeholder='example@domain.com'
                                 label=''
                                 value={ email }
                                 onChange={ onChange }
                                 labelBottom={ true }
                                 labelBottomText={ t('email') }
                                 id='email'
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
                                 id='password'
                              />
                              <div className='logIn__rememberMe'>
                                 <div>
                                    <CheckBox
                                       label={ t('remember_me') }
                                       name='rememberMeChecked'
                                       filled
                                       onChange={ (name, value) => handleCheckedChange(name, value) }
                                       checked={ rememberMeChecked }
                                       color='#949bbf'
                                    />
                                 </div>
                                 <div>
                                    <Link to={ Router.route('FORGOT_PASSWORD').getMask() }>
                                       <Text
                                          type={ TextType.regular }
                                          size={ TextSize.medium }
                                          inner={ t('forgot_your_password') }
                                          color='#555555'
                                       />
                                    </Link>
                                 </div>
                              </div>
                           </form>
                           <div className='darkBlack_btn'>
                              <BaseButton
                                 theme={ btnTheme.darkBlack }
                                 size={ btnSize.full }
                                 text={ t('log_in') }
                                 onClick={ onSubmit }
                                 type='submit'
                              />
                              <div role='presentation' type='button' className='login-with-google-btn' onClick={ () => googleLogin() }>
                                 Sign in with Google
                              </div>
                           </div>
                        </div>
                     </div>
                  )}


                  {error === true && (
                     <div className='w-full verification-content'>
                        <div className='logIn__title'>
                           <Text
                              type={ TextType.normal }
                              size={ TextSize.large }
                              inner='Email Verification'
                           />
                        </div>
                        <div className='logIn__title m-t-m'>
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.small }
                              inner='Please insert the verification code to activate the account.'
                           />
                        </div>
                        <div className='logIn__form'>
                           <form>
                              <TextInput
                                 name='verify_code'
                                 type='text'
                                 placeholder='example@domain.com'
                                 label=''
                                 value={ verifyCode }
                                 onChange={ (name, value) => setVerifyCode(value) }
                                 labelBottom={ true }
                                 labelBottomText='Verification Code'
                                 id='verify_cide'
                              />
                           </form>
                           <div className='m-t-m' />
                           <div
                              onClick={ counter > 1 ? () => {} : () => handleResendCode() }
                              role='presentation'
                              className='resend-code'
                              style={ counter > 1 ? {} : { cursor: 'pointer' } }
                           >
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner='Resend Code'
                                 color={ counter > 1 ? 'grey' : 'blue' }
                              />
                              {counter > 1 && (
                                 <Text
                                    type={ TextType.regular }
                                    size={ TextSize.small }
                                    inner={ counter }
                                    color='grey'
                                 />
                              )}
                           </div>


                           <div className='darkBlack_btn m-t-m'>
                              <BaseButton
                                 theme={ btnTheme.darkBlack }
                                 size={ btnSize.full }
                                 text='CONFIRM'
                                 onClick={ confirmEmailVerification }
                                 type='submit'
                              />
                           </div>
                        </div>
                     </div>
                  )}

               </div>
            </ItemWrapper>
         </div>

      </>
   );
};

LogInStudent.propTypes = {
   onChange: PropTypes.func,
   email: PropTypes.string,
   password: PropTypes.string,
   onSubmit: PropTypes.func,
   rememberMeChecked: PropTypes.bool,
   handleCheckedChange: PropTypes.func,
   siteInfo: PropTypes.object,
   error: PropTypes.bool,
   googleLogin: PropTypes.func,
};

LogInStudent.defaultProps = {
   rememberMeChecked: false,
   siteInfo: {},
};

export default LogInStudent;
