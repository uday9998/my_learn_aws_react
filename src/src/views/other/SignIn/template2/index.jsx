import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import SignInTemplateSecondLeft from './Components/TemplateLeft';
import SignInTemplateSecondRight from './Components/TemplateRight';

const SignInTemplateSecond = ({
   generalProps,
   onSubmit,
   googleLogin,
}) => {
   return (
      <div
         className='signin__template__template2'
         style={ generalProps.backgroundImage ? {
            backgroundImage: `url(${ generalProps.backgroundImage })`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
         } : {
            backgroundColor: generalProps.background,
         } }
      >
         <div
            className='signin__template__template2__content'
         >
            <SignInTemplateSecondLeft
               generalProps={ generalProps }
               onSubmit={ onSubmit }
               googleLogin={ googleLogin }
            />
            <SignInTemplateSecondRight
               generalProps={ generalProps }
            />
         </div>
      </div>
   );
};


SignInTemplateSecond.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   googleLogin: PropTypes.func,
};

export default SignInTemplateSecond;
