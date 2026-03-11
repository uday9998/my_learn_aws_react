import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TemplateRight = ({
   generalProps,
}) => {
   return (
      <div
         className='thankyou__template2__right'
         style={ {
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `url(${ generalProps.image })`,
         } }
      />
   );
};

TemplateRight.propTypes = {
   generalProps: PropTypes.object,
};

export default TemplateRight;
