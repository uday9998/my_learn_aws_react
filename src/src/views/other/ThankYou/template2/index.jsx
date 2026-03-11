import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import TemplateLeft from './Components/templateLeft';
import TemplateRight from './Components/templateRight';

const ThankYouTemplate2 = ({
   generalProps,
   onSubmit,
   email,
}) => {
   return (
      <div
         className='thankyou__template2'
         style={ generalProps.backgroundImage ? {
            backgroundImage: `url(${ generalProps.backgroundImage })`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
         } : {
            backgroundColor: generalProps.background,
         } }
      >
         <div
            className='thankyou__template2__content'
         >
            <TemplateLeft
               email={ email }
               generalProps={ generalProps }
               onSubmit={ onSubmit }
            />
            <TemplateRight
               generalProps={ generalProps }
            />
         </div>
      </div>
   );
};

ThankYouTemplate2.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   email: PropTypes.string,
};

export default ThankYouTemplate2;
