import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import CheckBox from 'components/elements/form/CheckBox';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';
import artwork from 'assets/images/artwork.png';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const LogIn = ({
   hasImage, onChange, email, password, onSubmit,
}) => {
   return (
      <div className={ classnames('logIn__container', { 'logIn__withImage': hasImage }) }>
         <ItemWrapper style={ { border: 'solid 1px #dfe5eb', boxShadow: '0 2px 40px 0 rgba(63, 79, 101, 0.09)' } }>
            <div className='logIn'>
               <div className={ classnames('w-full', { 'logIn__main': hasImage }) }>
                  <div className='miestroLogo'>
                     <Icon name='Logo' />
                  </div>
                  <div className='logIn__title'>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.large }
                        inner='Log In'
                     />
                  </div>
                  <div className='m-t-m m-b-exl' style={ { textAlign: 'center' } }>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.medium }
                        inner={ ['Need an account?  ', <span style={ { color: '#006dff' } }>Get started!</span>] }
                     />
                  </div>
                  <div className='logIn__form'>
                     <TextInput
                        name='email'
                        type='email'
                        placeholder='example@domain.com'
                        label='Email'
                        value={ email }
                        onChange={ onChange }
                     />
                     <div className='m-t-m' />
                     <TextInput
                        placeholder='*********'
                        label='Password'
                        name='password'
                        type='password'
                        value={ password }
                        onChange={ onChange }
                     />
                     <div className='m-t-exl m-b-exl logIn__rememberMe'>
                        <CheckBox
                           label='Remember Me'
                        />
                     </div>
                     <BaseButton
                        size={ btnSize.full }
                        text='Log In'
                        onClick={ onSubmit }
                     />
                     <div className='m-t-m' style={ { textAlign: 'center' } }>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           inner='Forgot your password?'
                        />
                     </div>
                  </div>
               </div>
               {hasImage && (
                  <div className='logIn__artwork'>
                     <img src={ artwork } alt='' />
                  </div>
               )}
            </div>
         </ItemWrapper>
      </div>
   );
};

LogIn.propTypes = {
   hasImage: PropTypes.bool,
   onChange: PropTypes.func,
   email: PropTypes.string,
   password: PropTypes.string,
   onSubmit: PropTypes.func,
};

LogIn.defaultProps = {
   hasImage: false,
};

export default LogIn;
