import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';

const ChangeButton = ({
   text, iconName, onClick, withText,
}) => {
   return (
      <button
         className='change__button'
         onClick={ onClick }
         type='button'
      >
         <IconNew name={ iconName } />
         {withText && text}
      </button>
   );
};

ChangeButton.propTypes = {
   text: PropTypes.string,
   iconName: PropTypes.string,
   onClick: PropTypes.func,
   withText: PropTypes.bool,
};

export default ChangeButton;
