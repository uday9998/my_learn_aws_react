import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import TemplateLeft from './Components/TemplateLeft';
import TemplateRight from './Components/TemplateRight';

const SignUpTemplateSecond = ({
   generalProps,
   onSubmit,
   googleLogin,
}) => {
   return (
      <div
         className='signup__template2'
         style={ generalProps.backgroundImage ? {
            backgroundImage: `url(${ generalProps.backgroundImage })`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
         } : {
            backgroundColor: generalProps.background,
         } }
      >
         <div
            className='signup__template2__content'
         >
            <TemplateLeft
               generalProps={ generalProps }
               googleLogin={ googleLogin }
               onSubmit={ onSubmit }
            />
            <TemplateRight
               generalProps={ generalProps }
            />
         </div>
      </div>
   );
};

SignUpTemplateSecond.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   googleLogin: PropTypes.func,
};

export default SignUpTemplateSecond;
