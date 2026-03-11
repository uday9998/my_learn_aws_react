import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';


export default function AddButton({ onClick }) {
   return (
      <button
         onClick={ onClick }
         type='button'
      >
         <Icon name='Add' color='#d8d8d8' />
      </button>
   );
}

AddButton.propTypes = {
   onClick: PropTypes.func,
};
