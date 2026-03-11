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

const ForgotPassword = ({
   onChange, email, onSubmit, siteInfo,
}) => {
   useEffect(() => {
      document.body.style.setProperty('--button-color-text', activeSchoolRoomColor(siteInfo));
      document.body.style.setProperty('--school-font', siteInfo.active_school_room.school_font);
   }, [siteInfo]);
   const t = useTranslate();
   return (
      <>
         <div className='forget__container'>
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
                     <div className='logIn__account'>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           inner={ [t('already_have_an_account'), <Link to={ Router.route('LOGIN').getMask() }><span> { t('log_in') }</span>  </Link>] }
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
                        <div className='darkBlack_btn'>
                           <BaseButton
                              theme={ btnTheme.darkBlack }
                              size={ btnSize.full }
                              text={ t('send_password_reset_link') }
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

ForgotPassword.propTypes = {
   onChange: PropTypes.func,
   email: PropTypes.string,
   onSubmit: PropTypes.func,
   siteInfo: PropTypes.object,
};

export default ForgotPassword;
