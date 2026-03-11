import React from 'react';
import './index.scss';
import Input from 'components/elements/inputNew';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { AffiliateFrontContext } from 'containers/pages/affiliate/login';

const SignInForm = () => {
   const { data, handleInputChange, onSubmit } = React.useContext(AffiliateFrontContext);
   return (
      <div className='affiliate__sign'>
         <Input
            type='text'
            value={ data.email }
            label='Email'
            placeholder='Enter your email'
            name='email'
            onChange={ handleInputChange }
            onKeyPress={ (e) => {
               if (e.keyCode === 13 || e.which === 13) {
                  onSubmit();
               }
            } }
         />
         <Input
            type='password'
            value={ data.password }
            label='Password'
            placeholder='Enter your password'
            name='password'
            onChange={ handleInputChange }
            onKeyPress={ (e) => {
               if (e.keyCode === 13 || e.which === 13) {
                  onSubmit();
               }
            } }
         />
         <div className='affiliate__sign__remember'>
            <CheckBox
               checked={ data.remember }
               label='Remember Me'
               onChange={ handleInputChange }
               name='remember'
            />
            <Link to={ Router.route('AFFILIATE_FRONT_PASSWORD_RESET').getMask() } style={ { textDecoration: 'none' } }>
               <Text
                  inner='Forgot password'
                  style={ { cursor: 'pointer' } }
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
            </Link>
         </div>
         {/* <Button
            style={ { marginTop: '20px' } }
            onClick={ () => {} }
            text='Sign In'
            disabled={ !data.password.length || !data.email.length }
         /> */}
      </div>
   );
};

SignInForm.propTypes = {

};

export default SignInForm;
